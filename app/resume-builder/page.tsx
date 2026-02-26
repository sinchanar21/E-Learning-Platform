'use client';

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from 'react';
import { Download, Eye, RotateCcw, Save, Sparkles, Loader2, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>;
  skills: string[];
}

const defaultResume: ResumeData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  summary: 'Write a brief professional summary...',
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      startDate: '2021',
      endDate: 'Present',
      description: 'Led development of microservices architecture serving 1M+ users',
    },
  ],
  education: [
    {
      id: '1',
      school: 'State University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      graduationDate: '2019',
    },
  ],
  skills: ['React', 'Node.js', 'TypeScript'],
};

export default function ResumeBuilderPage() {
  const { user, isLoaded } = useUser();
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [previewMode, setPreviewMode] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      setResume(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      }));
    }
  }, [user, isLoaded]);

  const handleAnalyzeResume = async () => {
    setIsAnalyzing(true);
    setAiFeedback(null);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Please analyze this resume data and provide constructive feedback on how to improve it for a Senior Software Engineering role. Focus on:
              1. Impact-driven descriptions
              2. Technical skill relevance
              3. Summary conciseness
              4. Formatting suggestions
              
              Resume Data: ${JSON.stringify(resume, null, 2)}`
            }
          ]
        })
      });

      if (!response.ok) throw new Error('Failed to analyze resume');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let feedback = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        feedback += decoder.decode(value, { stream: true });
        setAiFeedback(feedback);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setAiFeedback('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInputChange = (field: keyof ResumeData, value: any) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }));
  };

  const deleteExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-950/50 backdrop-blur-xl p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Resume Builder</h1>
            <p className="text-slate-400 mt-1">Create an ATS-optimized resume</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex md:hidden items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white font-medium transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleAnalyzeResume}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 glow-purple disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isAnalyzing ? 'Analyzing...' : 'AI Analyze'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg text-white font-medium transition-all duration-300">
              <Save className="w-5 h-5" />
              Save
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 glow-blue">
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* AI Feedback Section */}
        {aiFeedback && (
          <div className="glass-lg rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <Sparkles className="w-5 h-5" />
                AI Career Feedback
              </div>
              <button
                onClick={() => setAiFeedback(null)}
                className="p-1 hover:bg-white/10 rounded-full text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="prose prose-invert prose-purple prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {aiFeedback}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          {!previewMode && (
            <div className="lg:hidden space-y-6">
              <FormSection
                resume={resume}
                onInputChange={handleInputChange}
                onExperienceChange={handleExperienceChange}
                onAddExperience={addExperience}
                onRemoveExperience={deleteExperience}
              />
            </div>
          )}

          {previewMode && (
            <div className="lg:hidden">
              <ResumePreview resume={resume} />
            </div>
          )}

          {/* Desktop Form */}
          <div className="hidden lg:block space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <FormSection
              resume={resume}
              onInputChange={handleInputChange}
              onExperienceChange={handleExperienceChange}
              onAddExperience={addExperience}
              onRemoveExperience={deleteExperience}
            />
          </div>

          {/* Desktop Preview */}
          <div className="hidden lg:block sticky top-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormSection({
  resume,
  onInputChange,
  onExperienceChange,
  onAddExperience,
  onRemoveExperience,
}: {
  resume: ResumeData;
  onInputChange: (field: keyof ResumeData, value: any) => void;
  onExperienceChange: (id: string, field: string, value: string) => void;
  onAddExperience: () => void;
  onRemoveExperience: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <Section title="Personal Information">
        <FormField label="Full Name" value={resume.fullName} onChange={(val) => onInputChange('fullName', val)} />
        <FormField label="Email" value={resume.email} onChange={(val) => onInputChange('email', val)} />
        <FormField label="Phone" value={resume.phone} onChange={(val) => onInputChange('phone', val)} />
        <FormField label="Location" value={resume.location} onChange={(val) => onInputChange('location', val)} />
      </Section>

      {/* Summary */}
      <Section title="Professional Summary">
        <textarea
          value={resume.summary}
          onChange={(e) => onInputChange('summary', e.target.value)}
          className="w-full glass-sm px-4 py-3 text-white placeholder:text-slate-500 outline-none rounded-lg resize-none h-24"
          placeholder="Write a brief summary of your professional background..."
        />
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <div className="space-y-4">
          {resume.experience.map((exp) => (
            <div key={exp.id} className="glass p-4 rounded-lg space-y-3">
              <FormField label="Company" value={exp.company} onChange={(val) => onExperienceChange(exp.id, 'company', val)} />
              <FormField label="Position" value={exp.position} onChange={(val) => onExperienceChange(exp.id, 'position', val)} />
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Start Date" value={exp.startDate} onChange={(val) => onExperienceChange(exp.id, 'startDate', val)} />
                <FormField label="End Date" value={exp.endDate} onChange={(val) => onExperienceChange(exp.id, 'endDate', val)} />
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => onExperienceChange(exp.id, 'description', e.target.value)}
                className="w-full glass-sm px-4 py-2 text-white placeholder:text-slate-500 outline-none rounded-lg resize-none h-20"
                placeholder="Describe your responsibilities and achievements..."
              />
              <button
                onClick={() => onRemoveExperience(exp.id)}
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={onAddExperience}
            className="w-full py-2 border-2 border-dashed border-white/20 hover:border-white/40 text-slate-300 hover:text-white rounded-lg transition-colors"
          >
            + Add Experience
          </button>
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        {resume.education.map((edu) => (
          <div key={edu.id} className="glass p-4 rounded-lg space-y-3">
            <FormField label="School" value={edu.school} />
            <FormField label="Degree" value={edu.degree} />
            <FormField label="Field of Study" value={edu.field} />
            <FormField label="Graduation Date" value={edu.graduationDate} />
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 glass rounded-full text-sm text-slate-300"
            >
              {skill} ×
            </span>
          ))}
        </div>
        <input
          type="text"
          className="w-full glass-sm px-4 py-2 text-white placeholder:text-slate-500 outline-none rounded-lg mt-3"
          placeholder="Add skill and press Enter..."
        />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full glass-sm px-4 py-2 text-white placeholder:text-slate-500 outline-none rounded-lg"
      />
    </div>
  );
}

function ResumePreview({ resume }: { resume: ResumeData }) {
  return (
    <div className="glass-lg p-8 rounded-xl bg-white text-black space-y-6 sticky top-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{resume.fullName}</h1>
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <span>{resume.email}</span>
          <span>{resume.phone}</span>
          <span>{resume.location}</span>
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div>
          <h2 className="text-lg font-bold mb-2">Professional Summary</h2>
          <p className="text-sm text-gray-700">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Experience</h2>
          <div className="space-y-3">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Education</h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                </div>
                <p className="text-sm text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-600">{edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
