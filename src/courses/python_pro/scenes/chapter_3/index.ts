import type { Chapter } from '../../../CourseViewer';

import { Scene01_PrintFunction } from './Scene01_PrintFunction';
import { Scene02_UserInput } from './Scene02_UserInput';
import { Scene03_DataTypes } from './Scene03_DataTypes';
import { Scene04_TypeConversion } from './Scene04_TypeConversion';
import { Scene05_ExpressionsAndOperators } from './Scene05_ExpressionsAndOperators';
import { Scene06_MiniCalculatorProject } from './Scene06_MiniCalculatorProject';

export const chapter3: Chapter = {
  id: 3,
  title: 'Input, Output & Expressions',
  subtitle: 'Chapter 3: Writing Real Python Programs',
  scenes: [
    {
      component: Scene01_PrintFunction,
      title: 'Output with print()'
    },
    {
      component: Scene02_UserInput,
      title: 'Receiving User Input'
    },
    {
      component: Scene03_DataTypes,
      title: 'Understanding Data Types'
    },
    {
      component: Scene04_TypeConversion,
      title: 'Type Conversion'
    },
    {
      component: Scene05_ExpressionsAndOperators,
      title: 'Expressions & Operators'
    },
    {
      component: Scene06_MiniCalculatorProject,
      title: 'Calculator Project'
    }
  ]
};

export default chapter3;