import type { Chapter } from '../../../CourseViewer';

import { Scene01_WelcomeHook } from './Scene01_WelcomeHook';
import { Scene02_MeetDevanagari } from './Scene02_MeetDevanagari';
import { Scene03_VowelsPart1 } from './Scene03_VowelsPart1';
import { Scene04_VowelsPart2 } from './Scene04_VowelsPart2';
import { Scene05_ConsonantStops } from './Scene05_ConsonantStops';
import { Scene06_ConsonantsRetroflex } from './Scene06_ConsonantsRetroflex';
import { Scene07_ConsonantsRemaining } from './Scene07_ConsonantsRemaining';
import { Scene08_Matras } from './Scene08_Matras';
import { Scene09_ConjunctConsonants } from './Scene09_ConjunctConsonants';
import { Scene10_ReadingSyllables } from './Scene10_ReadingSyllables';
import { Scene11_ReadingWords } from './Scene11_ReadingWords';
import { Scene12_WritingPractice } from './Scene12_WritingPractice';
import { Scene13_ChapterSummary } from './Scene13_ChapterSummary';
import { Scene14_NextHook } from './Scene14_NextHook';

export const chapter1: Chapter = {
  id: 1,
  title: 'Script & Sounds',
  subtitle: 'Chapter 1: The Marathi Writing System',
  scenes: [
    { component: Scene01_WelcomeHook,         title: 'Welcome Hook' },
    { component: Scene02_MeetDevanagari,      title: 'Meet Devanagari' },
    { component: Scene03_VowelsPart1,         title: 'Vowels — Part 1' },
    { component: Scene04_VowelsPart2,         title: 'Vowels — Part 2' },
    { component: Scene05_ConsonantStops,      title: 'Stop Consonants' },
    { component: Scene06_ConsonantsRetroflex, title: 'Retroflex vs Dental' },
    { component: Scene07_ConsonantsRemaining, title: 'Remaining Consonants' },
    { component: Scene08_Matras,              title: 'Matras — Vowels Attach' },
    { component: Scene09_ConjunctConsonants,  title: 'Conjunct Consonants' },
    { component: Scene10_ReadingSyllables,    title: 'Build a Syllable' },
    { component: Scene11_ReadingWords,        title: 'Read Real Words' },
    { component: Scene12_WritingPractice,     title: 'Writing Practice' },
    { component: Scene13_ChapterSummary,      title: 'Chapter Summary' },
    { component: Scene14_NextHook,            title: "What's Next" },
  ],
};
