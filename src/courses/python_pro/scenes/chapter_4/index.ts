import type { Chapter } from '../../../CourseViewer';

import { Scene01_WhyProgramsNeedDecisions } from './Scene01_WhyProgramsNeedDecisions';
import { Scene02_BooleanValues } from './Scene02_BooleanValues';
import { Scene03_ComparisonOperators } from './Scene03_ComparisonOperators';
import { Scene04_IfStatements } from './Scene04_IfStatements';
import { Scene05_IfElseStatements } from './Scene05_IfElseStatements';
import { Scene06_GradeCheckerProject } from './Scene06_GradeCheckerProject';

export const chapter4: Chapter = {
  id: 4,
  title: 'Decisions & Logic',
  subtitle: 'Chapter 4: Making Programs Think',
  scenes: [
    {
      component: Scene01_WhyProgramsNeedDecisions,
      title: 'Why Programs Need Decisions'
    },
    {
      component: Scene02_BooleanValues,
      title: 'Boolean Values'
    },
    {
      component: Scene03_ComparisonOperators,
      title: 'Comparison Operators'
    },
    {
      component: Scene04_IfStatements,
      title: 'if Statements'
    },
    {
      component: Scene05_IfElseStatements,
      title: 'if / else Statements'
    },
    {
      component: Scene06_GradeCheckerProject,
      title: 'Grade Checker Project'
    }
  ]
};

export default chapter4;
