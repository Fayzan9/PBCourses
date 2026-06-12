import type { Chapter } from '../../../CourseViewer';

import { Scene01_WhatIsAComputer } from './Scene01_WhatIsAComputer';
import { Scene02_InputProcessOutput } from './Scene02_InputProcessOutput';
import { Scene03_HardwareVsSoftware } from './Scene03_HardwareVsSoftware';
import { Scene04_TypesOfComputers } from './Scene04_TypesOfComputers';
import { Scene05_InsideAComputer } from './Scene05_InsideAComputer';
import { Scene06_HowProgramsRun } from './Scene06_HowProgramsRun';
import { Scene07_ComputerSystemOverview } from './Scene07_ComputerSystemOverview';

export const chapter1: Chapter = {
  id: 1,
  title: 'What Is A Computer?',
  subtitle: 'Chapter 1: Foundations of Computing',
  scenes: [
    {
      component: Scene01_WhatIsAComputer,
      title: 'What Is A Computer?'
    },
    {
      component: Scene02_InputProcessOutput,
      title: 'Input → Process → Output'
    },
    {
      component: Scene03_HardwareVsSoftware,
      title: 'Hardware vs Software'
    },
    {
      component: Scene04_TypesOfComputers,
      title: 'Types of Computers'
    },
    {
      component: Scene05_InsideAComputer,
      title: 'Major Components of a Computer'
    },
    {
      component: Scene06_HowProgramsRun,
      title: 'How Programs Run'
    },
    {
      component: Scene07_ComputerSystemOverview,
      title: 'Computer System Overview'
    }
  ]
};

export default chapter1;
