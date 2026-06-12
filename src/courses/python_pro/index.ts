import type { Chapter, ChapterTheme } from '../CourseViewer';
import { chapter1 } from './scenes/chapter_1';
import { chapter2 } from './scenes/chapter_2';
import { PythonSandbox } from '../python/components/PythonSandbox';
import { Whiteboard } from '../ai/components/Whiteboard';

export const pythonProChapters: Chapter[] = [
  chapter1,
  chapter2,
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
