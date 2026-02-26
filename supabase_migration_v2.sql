-- 1. Enhance Courses Table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General Engineering';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- 2. Create Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- Clerk User ID
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- 3. Create Progress Table
CREATE TABLE IF NOT EXISTS progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- Clerk User ID
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- 4. Enable RLS
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Courses: Public read (Already done in previous migration, but ensuring here)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Courses are viewable by everyone') THEN
        CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (true);
    END IF;
END $$;

-- Enrollments: Users can only see and insert their own record
CREATE POLICY "Users can manage own enrollments" ON enrollments
  FOR ALL USING (user_id = auth.jwt() ->> 'sub'); -- sub in Clerk JWT is usually the user_id

-- Progress: Users can only see and manage their own progress
CREATE POLICY "Users can manage own progress" ON progress
  FOR ALL USING (user_id = auth.jwt() ->> 'sub');

-- 6. Initial Seed Data (High Quality Engineering Playlists)
INSERT INTO courses (title, description, thumbnail_url, instructor, category, level, youtube_url, youtube_playlist_id)
VALUES 
('Full Stack Web Development 2024', 'Complete roadmap for modern full stack development.', 'https://img.youtube.com/vi/zJSY8tJY_67/maxresdefault.jpg', 'FreeCodeCamp', 'Web Development', 'Beginner', 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnSe1qUNGi745qnLkoWahuL', 'PLWKjhJtqVAbnSe1qUNGi745qnLkoWahuL'),
('Advanced System Design', 'Master the architecture of large scale systems.', 'https://img.youtube.com/vi/m8Icp_Cid5o/maxresdefault.jpg', 'ByteByteGo', 'Architecture', 'Advanced', 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX', 'PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX'),
('Mastering React Patterns', 'In-depth guide to React design patterns and performance.', 'https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg', 'Jack Herrington', 'Frontend', 'Intermediate', 'https://www.youtube.com/playlist?list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n', 'PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n'),
('Backend Engineering - Node.js', 'Build scalable and robust backends with Node.', 'https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg', 'Hussein Nasser', 'Backend', 'Advanced', 'https://www.youtube.com/playlist?list=PLQnljOFTzeIWH7D_rYf3S7uL9-F1x0G-7', 'PLQnljOFTzeIWH7D_rYf3S7uL9-F1x0G-7'),
('DevOps Roadmap 2025', 'Master Docker, Kubernetes, and CI/CD.', 'https://img.youtube.com/vi/hQcFE0RD0cQ/maxresdefault.jpg', 'TechWorld with Nana', 'DevOps', 'Intermediate', 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFf6RlN2', 'PL4cUxeGkcC9jLYyp2Aoh6hcWuxFf6RlN2')
ON CONFLICT (youtube_playlist_id) DO NOTHING;
-- 7. Performance Indexes for Scale (300+ courses)
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_course_id ON progress(course_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
