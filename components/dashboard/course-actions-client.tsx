'use client';

import { useTransition } from 'react';
import { enrollInCourse, updateCourseProgress } from '@/lib/actions/course-actions';
import { Play, CheckCircle, Loader2, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CourseActionsClientProps {
    courseId: string;
    enrolled: boolean;
    completed: boolean;
}

export function CourseActionsClient({ courseId, enrolled, completed }: CourseActionsClientProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleEnroll = () => {
        startTransition(async () => {
            try {
                await enrollInCourse(courseId);
                router.refresh();
            } catch (err) {
                console.error(err);
            }
        });
    };

    const handleToggleComplete = () => {
        startTransition(async () => {
            try {
                await updateCourseProgress(courseId, !completed);
                router.refresh();
            } catch (err) {
                console.error(err);
            }
        });
    };

    if (!enrolled) {
        return (
            <button
                onClick={handleEnroll}
                disabled={isPending}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/20"
            >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
                Enroll in Course
            </button>
        );
    }

    return (
        <div className="space-y-4">
            <button
                onClick={handleToggleComplete}
                disabled={isPending}
                className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 border-2 ${completed
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                        : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                    }`}
            >
                {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : completed ? (
                    <CheckCircle className="w-5 h-5" />
                ) : (
                    <BookOpen className="w-5 h-5" />
                )}
                {completed ? 'Course Completed' : 'Mark as Completed'}
            </button>

            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <p className="text-sm font-bold text-white leading-tight">You are enrolled</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-0.5">Keep learning</p>
                </div>
            </div>
        </div>
    );
}
