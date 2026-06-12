import type { Chapter, ChapterTheme } from '../CourseViewer';
import { chapter1 } from './scenes/chapter_1';
import { chapter2 } from './scenes/chapter_2';

export const computerArchitectureChapters: Chapter[] = [
  chapter1,
  chapter2
];

export const computerArchitectureThemes: ChapterTheme[] = [
  {
    id: 1,
    primary: 'cyan-500',
    text: 'text-cyan-600',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(6, 182, 212, 0.2))',
    dotBg: 'bg-cyan-500',
    bgActive: 'bg-cyan-500 text-slate-900 hover:bg-cyan-600',
    hover: 'hover:bg-cyan-500/5 hover:text-cyan-600'
  },
  {
    id: 2,
    primary: 'violet-500',
    text: 'text-violet-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(139, 92, 246, 0.2))',
    dotBg: 'bg-violet-500',
    bgActive: 'bg-violet-500 text-white hover:bg-violet-600',
    hover: 'hover:bg-violet-500/5 hover:text-violet-600'
  }
];

export const computerArchitectureConfig = {
  courseName: "Computer Architecture Fundamentals",
  chapters: computerArchitectureChapters,
  themes: computerArchitectureThemes
};
