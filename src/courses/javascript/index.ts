import type { Chapter, ChapterTheme } from '../CourseViewer';
import EventLoopScene from './scenes/EventLoopScene';
import ClosuresScene from './scenes/ClosuresScene';

export const javascriptChapters: Chapter[] = [
  {
    id: 1,
    title: "JavaScript Mastery",
    subtitle: "Chapter 1: Engine & Execution Context",
    scenes: [
      { component: EventLoopScene, title: "Javascript Event Loop" },
      { component: ClosuresScene, title: "Scope & Closures" }
    ]
  }
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
    bgActive: 'bg-yellow-500 text-slate-900 hover:bg-yellow-600',
    hover: 'hover:bg-yellow-500/5 hover:text-yellow-600'
  }
];

export const javascriptConfig = {
  courseName: "Modern JavaScript Deep Dive",
  chapters: javascriptChapters,
  themes: javascriptThemes
};
