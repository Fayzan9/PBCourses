import type { Chapter, ChapterTheme } from '../CourseViewer';
import { CourseStateProvider } from './components/CourseStateContext';
import { Whiteboard } from './components/Whiteboard';

import { chapter1 } from './scenes/chapter_1';
import { chapter2 } from './scenes/chapter_2';
import { chapter3 } from './scenes/chapter_3';
import { chapter4 } from './scenes/chapter_4';
import { chapter5 } from './scenes/chapter_5';
import { chapter6 } from './scenes/chapter_6';
import { chapter7 } from './scenes/chapter_7';

export const aiChapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7
];

export const aiThemes: ChapterTheme[] = [
  {
    id: 1,
    primary: 'vector',
    text: 'text-vector',
    bg: 'bg-vector/10',
    border: 'border-vector/20',
    glow: 'glow-vector',
    dotBg: 'bg-vector',
    bgActive: 'bg-vector hover:bg-sky-600',
    hover: 'hover:bg-vector/5 hover:text-vector'
  },
  {
    id: 2,
    primary: 'similarity',
    text: 'text-similarity',
    bg: 'bg-similarity/10',
    border: 'border-similarity/20',
    glow: 'glow-similarity',
    dotBg: 'bg-similarity',
    bgActive: 'bg-similarity hover:bg-amber-600',
    hover: 'hover:bg-similarity/5 hover:text-similarity'
  },
  {
    id: 3,
    primary: 'probability',
    text: 'text-probability',
    bg: 'bg-probability/10',
    border: 'border-probability/20',
    glow: 'glow-probability',
    dotBg: 'bg-probability',
    bgActive: 'bg-probability hover:bg-emerald-600',
    hover: 'hover:bg-probability/5 hover:text-probability'
  },
  {
    id: 4,
    primary: 'transformations',
    text: 'text-transformations',
    bg: 'bg-transformations/10',
    border: 'border-transformations/20',
    glow: 'glow-transformations',
    dotBg: 'bg-transformations',
    bgActive: 'bg-transformations hover:bg-violet-600',
    hover: 'hover:bg-transformations/5 hover:text-transformations'
  },
  {
    id: 5,
    primary: 'loss',
    text: 'text-loss',
    bg: 'bg-loss/10',
    border: 'border-loss/20',
    glow: 'glow-loss',
    dotBg: 'bg-loss',
    bgActive: 'bg-loss hover:bg-rose-600',
    hover: 'hover:bg-loss/5 hover:text-loss'
  },
  {
    id: 6,
    primary: 'svd',
    text: 'text-svd',
    bg: 'bg-svd/10',
    border: 'border-svd/20',
    glow: 'glow-svd',
    dotBg: 'bg-svd',
    bgActive: 'bg-svd hover:bg-cyan-600',
    hover: 'hover:bg-svd/5 hover:text-svd'
  },
  {
    id: 7,
    primary: 'pca',
    text: 'text-pca',
    bg: 'bg-pca/10',
    border: 'border-pca/20',
    glow: 'glow-pca',
    dotBg: 'bg-pca',
    bgActive: 'bg-pca hover:bg-indigo-600',
    hover: 'hover:bg-pca/5 hover:text-pca'
  }
];

export const aiConfig = {
  courseName: "AI & Neural Networks Intuition",
  chapters: aiChapters,
  themes: aiThemes,
  hasWhiteboard: true,
  WhiteboardComponent: Whiteboard,
  stateProvider: CourseStateProvider
};
