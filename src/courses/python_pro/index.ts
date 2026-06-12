import type { Chapter, ChapterTheme } from '../CourseViewer';
import { chapter1 } from './scenes/chapter_1';
import { chapter2 } from './scenes/chapter_2';
import { chapter3 } from './scenes/chapter_3';
import { chapter4 } from './scenes/chapter_4';
import { chapter5 } from './scenes/chapter_5';
import { chapter6 } from './scenes/chapter_6';
import { PythonSandbox } from '../python/components/PythonSandbox';
import { Whiteboard } from '../ai/components/Whiteboard';

export const pythonProChapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
];

export const pythonProThemes: ChapterTheme[] = [
  {
    id: 1,
    primary: 'indigo-500',
    text: 'text-indigo-600',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(99, 102, 241, 0.2))',
    dotBg: 'bg-indigo-500',
    bgActive: 'bg-indigo-500 hover:bg-indigo-600',
    hover: 'hover:bg-indigo-500/5 hover:text-indigo-600',
  },
  {
    id: 2,
    primary: 'sky-500',
    text: 'text-sky-600',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(14, 165, 233, 0.2))',
    dotBg: 'bg-sky-500',
    bgActive: 'bg-sky-500 hover:bg-sky-600',
    hover: 'hover:bg-sky-50/5 hover:text-sky-600',
  },
  {
    id: 3,
    primary: 'emerald-500',
    text: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(16, 185, 129, 0.2))',
    dotBg: 'bg-emerald-500',
    bgActive: 'bg-emerald-500 hover:bg-emerald-600',
    hover: 'hover:bg-emerald-50/5 hover:text-emerald-600',
  },
  {
    id: 4,
    primary: 'violet-500',
    text: 'text-violet-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(139, 92, 246, 0.2))',
    dotBg: 'bg-violet-500',
    bgActive: 'bg-violet-500 hover:bg-violet-600',
    hover: 'hover:bg-violet-50/5 hover:text-violet-600',
  },
  {
    id: 5,
    primary: 'pink-500',
    text: 'text-pink-600',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(244, 63, 94, 0.2))',
    dotBg: 'bg-pink-500',
    bgActive: 'bg-pink-500 hover:bg-pink-600',
    hover: 'hover:bg-pink-50/5 hover:text-pink-600',
  },
  {
    id: 6,
    primary: 'amber-500',
    text: 'text-amber-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(245, 158, 11, 0.2))',
    dotBg: 'bg-amber-500',
    bgActive: 'bg-amber-500 hover:bg-amber-600',
    hover: 'hover:bg-amber-50/5 hover:text-amber-600',
  },
];

export const pythonProConfig = {
  courseName: 'Python Pro — Professional Curriculum',
  chapters: pythonProChapters,
  themes: pythonProThemes,
  hasSandbox: true,
  SandboxComponent: PythonSandbox,
  hasWhiteboard: true,
  WhiteboardComponent: Whiteboard,
};
