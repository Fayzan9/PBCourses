import type { Chapter } from '../../../CourseViewer';

import { Scene01_BinaryAddition } from './Scene01_BinaryAddition';
import { Scene02_BinarySubtraction } from './Scene02_BinarySubtraction';
import { Scene03_BinaryMultiplication } from './Scene03_BinaryMultiplication';
import { Scene04_BinaryDivision } from './Scene04_BinaryDivision';
import { Scene05_CarryBits } from './Scene05_CarryBits';
import { Scene06_Overflow } from './Scene06_Overflow';
import { Scene07_BinaryArithmeticSummary } from './Scene07_BinaryArithmeticSummary';

export const chapter4: Chapter = {
  id: 4,
  title: 'Binary Arithmetic',
  subtitle: 'Chapter 4: How Computers Calculate',
  scenes: [
    { component: Scene01_BinaryAddition,          title: 'Binary Addition' },
    { component: Scene02_BinarySubtraction,       title: 'Binary Subtraction' },
    { component: Scene03_BinaryMultiplication,    title: 'Binary Multiplication' },
    { component: Scene04_BinaryDivision,          title: 'Binary Division' },
    { component: Scene05_CarryBits,               title: 'Carry Bits' },
    { component: Scene06_Overflow,                title: 'Overflow' },
    { component: Scene07_BinaryArithmeticSummary, title: 'Binary Arithmetic Summary' }
  ]
};

export default chapter4;
