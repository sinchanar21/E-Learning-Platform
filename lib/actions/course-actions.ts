'use server';

import { createAdminClient } from '@/lib/supabase-server';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function enrollInCourse(courseId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    const supabase = await createAdminClient();

    const { error } = await supabase
        .from('enrollments')
        .upsert({ user_id: userId, course_id: courseId }, { onConflict: 'user_id,course_id' });

    if (error) {
        console.error('Enrollment error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
        });
        throw new Error(`Failed to enroll in course: ${error.message}`);
    }

    revalidatePath('/courses');
    revalidatePath(`/courses/${courseId}`);
    revalidatePath('/my-courses');
}

export async function updateCourseProgress(courseId: string, completed: boolean) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    const supabase = await createAdminClient();

    const { error } = await supabase
        .from('progress')
        .upsert({
            user_id: userId,
            course_id: courseId,
            completed,
            completed_at: completed ? new Date().toISOString() : null
        }, { onConflict: 'user_id,course_id' });

    if (error) {
        console.error('Progress update error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
        });
        throw new Error(`Failed to update progress: ${error.message}`);
    }

    revalidatePath('/courses');
    revalidatePath(`/courses/${courseId}`);
    revalidatePath('/my-courses');
}
