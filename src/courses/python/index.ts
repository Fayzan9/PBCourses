import type { Chapter, ChapterTheme } from '../CourseViewer';
import IntroScene from './scenes/IntroScene';
import VariablesScene from './scenes/VariablesScene';

export const pythonChapters: Chapter[] = [
  {
    id: 1,
    title: "Python Foundations",
    subtitle: "Chapter 1: Code & Memory Mechanics",
    scenes: [
      { component: IntroScene, title: "Introduction to Python" },
      { component: VariablesScene, title: "Data Types & Variables" }
    ]
  }
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
    hover: 'hover:bg-amber-500/5 hover:text-amber-600'
  }
];

export const pythonConfig = {
  courseName: "Python Foundations",
  chapters: pythonChapters,
  themes: pythonThemes
};
