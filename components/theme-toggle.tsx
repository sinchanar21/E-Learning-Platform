'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/providers';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-all duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <>
          <Sun size={18} className="text-yellow-500" />
          <span className="text-xs font-medium">Light</span>
        </>
      ) : (
        <>
          <Moon size={18} className="text-slate-400" />
          <span className="text-xs font-medium">Dark</span>
        </>
      )}
    </button>
  );
}
