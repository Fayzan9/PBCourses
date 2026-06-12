import type { Chapter, ChapterTheme } from '../CourseViewer';
import { chapter1 } from './scenes/chapter_1';

export const javascriptChapters: Chapter[] = [
  chapter1,
];

export const javascriptThemes: ChapterTheme[] = [
  {
    id: 1,
    primary: 'yellow-500',
    text: 'text-yellow-600',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    glow: 'filter drop-shadow(0 0 10px rgba(234, 179, 8, 0.2))',
    dotBg: 'bg-yellow-500',
    bgActive: 'bg-yellow-500 hover:bg-yellow-600',
    hover: 'hover:bg-yellow-500/5 hover:text-yellow-600',
  },
];

export const javascriptConfig = {
  courseName: 'Modern JavaScript Deep Dive',
  chapters: javascriptChapters,
  themes: javascriptThemes,
};
