import type { Chapter } from '../../../CourseViewer';

import { Scene01_WelcomeHook } from './Scene01_WelcomeHook';
import { Scene02_Intro } from './Scene02_Intro';
import { Scene03_Variables } from './Scene03_Variables';
import { Scene04_NumbersArithmetic } from './Scene04_NumbersArithmetic';
import { Scene05_StringsIndexing } from './Scene05_StringsIndexing';
import { Scene06_StringMethods } from './Scene06_StringMethods';
import { Scene07_BooleansComparisons } from './Scene07_BooleansComparisons';
import { Scene08_TypeConversion } from './Scene08_TypeConversion';
import { Scene09_HowPythonStores } from './Scene09_HowPythonStores';
import { Scene10_CodingSandbox } from './Scene10_CodingSandbox';
import { Scene11_ChapterSummary } from './Scene11_ChapterSummary';
import { Scene12_NextHook } from './Scene12_NextHook';

export const chapter1: Chapter = {
  id: 1,
  title: 'Python Foundations',
  subtitle: 'Chapter 1: Code & Memory Mechanics',
  scenes: [
    { component: Scene01_WelcomeHook,        title: 'Welcome Hook' },
    { component: Scene02_Intro,              title: 'Introduction to Python' },
    { component: Scene03_Variables,          title: 'Data Types & Variables' },
    { component: Scene04_NumbersArithmetic,  title: 'Numbers & Arithmetic' },
    { component: Scene05_StringsIndexing,    title: 'Strings & Indexing' },
    { component: Scene06_StringMethods,      title: 'String Methods Playground' },
    { component: Scene07_BooleansComparisons,title: 'Booleans & Comparisons' },
    { component: Scene08_TypeConversion,     title: 'Type Conversion' },
    { component: Scene09_HowPythonStores,    title: 'How Python Stores Objects' },
    { component: Scene10_CodingSandbox,      title: 'Coding Sandbox' },
    { component: Scene11_ChapterSummary,     title: 'Chapter Summary' },
    { component: Scene12_NextHook,           title: "What's Next" },
  ],
};
