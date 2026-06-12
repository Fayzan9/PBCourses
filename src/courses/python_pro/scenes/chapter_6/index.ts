import type { Chapter } from '../../../CourseViewer';

import { Scene01_WhyFunctionsExist } from './Scene01_WhyFunctionsExist';
import { Scene02_WhatIsAFunction } from './Scene02_WhatIsAFunction';
import { Scene03_CreatingAFunction } from './Scene03_CreatingAFunction';
import { Scene04_CallingAFunction } from './Scene04_CallingAFunction';
import { Scene05_FunctionsCanRunManyTimes } from './Scene05_FunctionsCanRunManyTimes';
import { Scene06_MultipleFunctions } from './Scene06_MultipleFunctions';
import { Scene07_FunctionExecutionFlow } from './Scene07_FunctionExecutionFlow';
import { Scene08_FunctionParameters } from './Scene08_FunctionParameters';
import { Scene09_MultipleParameters } from './Scene09_MultipleParameters';
import { Scene10_ReturnValues } from './Scene10_ReturnValues';
import { Scene11_CalculatorFunctionsProject } from './Scene11_CalculatorFunctionsProject';

export const chapter6: Chapter = {
  id: 6,
  title: 'Functions',
  subtitle: 'Chapter 6: Creating Your Own Commands',
  scenes: [
    {
      component: Scene01_WhyFunctionsExist,
      title: 'Why Functions Exist'
    },
    {
      component: Scene02_WhatIsAFunction,
      title: 'What Is a Function?'
    },
    {
      component: Scene03_CreatingAFunction,
      title: 'Creating a Function'
    },
    {
      component: Scene04_CallingAFunction,
      title: 'Calling a Function'
    },
    {
      component: Scene05_FunctionsCanRunManyTimes,
      title: 'Functions Can Run Many Times'
    },
    {
      component: Scene06_MultipleFunctions,
      title: 'Multiple Functions'
    },
    {
      component: Scene07_FunctionExecutionFlow,
      title: 'Function Execution Flow'
    },
    {
      component: Scene08_FunctionParameters,
      title: 'Function Parameters'
    },
    {
      component: Scene09_MultipleParameters,
      title: 'Multiple Parameters'
    },
    {
      component: Scene10_ReturnValues,
      title: 'Return Values'
    },
    {
      component: Scene11_CalculatorFunctionsProject,
      title: 'Calculator Functions Project'
    }
  ]
};

export default chapter6;
