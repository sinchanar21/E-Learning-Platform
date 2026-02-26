'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

interface WelcomeCardProps {
  name?: string;
  completedCourses?: number;
  totalCourses?: number;
}

export function WelcomeCard({
  name = 'John',
  completedCourses = 8,
  totalCourses = 32,
}: WelcomeCardProps) {
  const progress = (completedCourses / totalCourses) * 100;

  return (
    <div className="card-elevated p-8 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 dark:from-primary/15 dark:to-secondary/15 dark:hover:from-primary/25 dark:hover:to-secondary/25">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="text-sm font-semibold text-secondary">Welcome back!</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Hey {name}, Ready to Level Up?
          </h2>
          <p className="text-muted-foreground mb-4">
            You're on a fantastic journey. Keep pushing towards your engineering goals!
          </p>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Course Progress
              </span>
              <span className="text-sm font-semibold text-primary">
                {completedCourses}/{totalCourses}
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 button-primary font-semibold transition-all duration-300 hover:shadow-md"
          >
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
          <div className="bg-card p-4 rounded-lg text-center border border-border dark:bg-white/5 dark:border-white/10">
            <div className="text-2xl font-bold text-primary">{completedCourses}</div>
            <div className="text-xs text-muted-foreground mt-1">Completed</div>
          </div>
          <div className="bg-card p-4 rounded-lg text-center border border-border dark:bg-white/5 dark:border-white/10">
            <div className="text-2xl font-bold text-primary">78</div>
            <div className="text-xs text-muted-foreground mt-1">Hours</div>
          </div>
          <div className="bg-card p-4 rounded-lg text-center border border-border dark:bg-white/5 dark:border-white/10">
            <div className="text-2xl font-bold text-primary">92%</div>
            <div className="text-xs text-muted-foreground mt-1">Placement Ready</div>
          </div>
        </div>
      </div>
    </div>
  );
}
