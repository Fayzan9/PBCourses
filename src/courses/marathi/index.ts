import type { Chapter, ChapterTheme } from '../CourseViewer';
import { chapter1 } from './scenes/chapter_1';
import { Whiteboard } from '../ai/components/Whiteboard';

export const marathiChapters: Chapter[] = [
  chapter1,
];

export const marathiThemes: ChapterTheme[] = [
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
];

export const marathiConfig = {
  courseName: 'Marathi Fundamentals',
  chapters: marathiChapters,
  themes: marathiThemes,
  hasWhiteboard: true,
  WhiteboardComponent: Whiteboard,
};
