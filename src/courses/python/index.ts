import type { Chapter, ChapterTheme } from '../CourseViewer';
import { chapter1 } from './scenes/chapter_1';
import { PythonSandbox } from './components/PythonSandbox';
import { Whiteboard } from '../ai/components/Whiteboard';

export const pythonChapters: Chapter[] = [
  chapter1,
];

export const pythonThemes: ChapterTheme[] = [
  {
    id: 1,
    primary: 'amber-500',
    text: 'text-amber-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(245, 158, 11, 0.2))',
    dotBg: 'bg-amber-500',
    bgActive: 'bg-amber-500 hover:bg-amber-600',
    hover: 'hover:bg-amber-500/5 hover:text-amber-600',
  },
  // Chapter 2 — Control Flow
  {
    id: 2,
    primary: 'sky-500',
    text: 'text-sky-600',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(14, 165, 233, 0.2))',
    dotBg: 'bg-sky-500',
    bgActive: 'bg-sky-500 hover:bg-sky-600',
    hover: 'hover:bg-sky-500/5 hover:text-sky-600',
  },
  // Chapter 3 — Functions
  {
    id: 3,
    primary: 'emerald-500',
    text: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(16, 185, 129, 0.2))',
    dotBg: 'bg-emerald-500',
    bgActive: 'bg-emerald-500 hover:bg-emerald-600',
    hover: 'hover:bg-emerald-500/5 hover:text-emerald-600',
  },
  // Chapter 4 — Data Structures
  {
    id: 4,
    primary: 'violet-500',
    text: 'text-violet-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(139, 92, 246, 0.2))',
    dotBg: 'bg-violet-500',
    bgActive: 'bg-violet-500 hover:bg-violet-600',
    hover: 'hover:bg-violet-500/5 hover:text-violet-600',
  },
  // Chapter 5 — OOP
  {
    id: 5,
    primary: 'rose-500',
    text: 'text-rose-600',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(244, 63, 94, 0.2))',
    dotBg: 'bg-rose-500',
    bgActive: 'bg-rose-500 hover:bg-rose-600',
    hover: 'hover:bg-rose-500/5 hover:text-rose-600',
  },
  // Chapter 6 — Error Handling & Files
  {
    id: 6,
    primary: 'cyan-600',
    text: 'text-cyan-700',
    bg: 'bg-cyan-600/10',
    border: 'border-cyan-600/20',
    glow: 'filter drop-shadow(0 0 10px rgba(8, 145, 178, 0.2))',
    dotBg: 'bg-cyan-600',
    bgActive: 'bg-cyan-600 hover:bg-cyan-700',
    hover: 'hover:bg-cyan-600/5 hover:text-cyan-700',
  },
];

export const pythonConfig = {
  courseName: 'Python Programming Essentials',
  chapters: pythonChapters,
  themes: pythonThemes,
  hasSandbox: true,
  SandboxComponent: PythonSandbox,
  hasWhiteboard: true,
  WhiteboardComponent: Whiteboard,
};
