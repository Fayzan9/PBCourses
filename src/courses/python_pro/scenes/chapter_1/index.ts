import type { Chapter } from '../../../CourseViewer';

import { Scene01_WhatIsProgramming } from './Scene01_WhatIsProgramming';
import { Scene02_ComputerArchitecture } from './Scene02_ComputerArchitecture';
import { Scene03_BinaryFundamentals } from './Scene03_BinaryFundamentals';
import { Scene04_ProgramExecution } from './Scene04_ProgramExecution';
import { Scene05_MemoryFundamentals } from './Scene05_MemoryFundamentals';
import { Scene06_Summary } from './Scene06_Summary';

export const chapter1: Chapter = {
  id: 1,
  title: 'How Computers Work',
  subtitle: 'Chapter 1: Computer Fundamentals',
  scenes: [
    { component: Scene01_WhatIsProgramming, title: 'What Is Programming?' },
    { component: Scene02_ComputerArchitecture, title: 'Computer Architecture' },
    { component: Scene03_BinaryFundamentals, title: 'Binary Fundamentals' },
    { component: Scene04_ProgramExecution, title: 'How Programs Execute' },
    { component: Scene05_MemoryFundamentals, title: 'Memory Fundamentals' },
    { component: Scene06_Summary, title: 'Chapter Summary' },
  ],
};
