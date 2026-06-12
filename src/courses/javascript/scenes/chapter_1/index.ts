import type { Chapter } from '../../../CourseViewer';

import { Scene01_WhatIsProgramming } from './Scene01_WhatIsProgramming';
import { Scene02_HowProgramsExecute } from './Scene02_HowProgramsExecute';
import { Scene03_VariablesAndMemory } from './Scene03_VariablesAndMemory';
import { Scene04_InputProcessingOutput } from './Scene04_InputProcessingOutput';
import { Scene05_FirstJavaScriptProgram } from './Scene05_FirstJavaScriptProgram';
import { Scene06_Summary } from './Scene06_Summary';

export const chapter1: Chapter = {
  id: 1,
  title: 'Introduction to Programming',
  subtitle: 'Chapter 1: Programming Foundations',
  scenes: [
    { component: Scene01_WhatIsProgramming, title: 'What Is Programming?' },
    { component: Scene02_HowProgramsExecute, title: 'How Programs Execute' },
    { component: Scene03_VariablesAndMemory, title: 'Variables and Memory' },
    { component: Scene04_InputProcessingOutput, title: 'Input → Processing → Output' },
    { component: Scene05_FirstJavaScriptProgram, title: 'Writing Your First JavaScript Program' },
    { component: Scene06_Summary, title: 'Chapter Summary' },
  ],
};
