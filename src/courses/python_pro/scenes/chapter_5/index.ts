import type { Chapter } from '../../../CourseViewer';

import { Scene01_WhyProgramsNeedLoops } from './Scene01_WhyProgramsNeedLoops';
import { Scene02_ForLoops } from './Scene02_ForLoops';
import { Scene03_RangeFunction } from './Scene03_RangeFunction';
import { Scene04_LoopVariable } from './Scene04_LoopVariable';
import { Scene05_LoopsWithConditions } from './Scene05_LoopsWithConditions';
import { Scene06_CountdownProject } from './Scene06_CountdownProject';

export const chapter5: Chapter = {
  id: 5,
  title: 'Loops',
  subtitle: 'Chapter 5: Repeating Work Automatically',
  scenes: [
    {
      component: Scene01_WhyProgramsNeedLoops,
      title: 'Why Programs Need Loops'
    },
    {
      component: Scene02_ForLoops,
      title: 'for Loops'
    },
    {
      component: Scene03_RangeFunction,
      title: 'The range() Function'
    },
    {
      component: Scene04_LoopVariable,
      title: 'The Loop Variable'
    },
    {
      component: Scene05_LoopsWithConditions,
      title: 'Loops with Conditions'
    },
    {
      component: Scene06_CountdownProject,
      title: 'Countdown Project'
    }
  ]
};

export default chapter5;
