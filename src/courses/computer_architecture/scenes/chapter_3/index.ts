import type { Chapter } from '../../../CourseViewer';

import { Scene01_TheDecimalSystem } from './Scene01_TheDecimalSystem';
import { Scene02_TheBinarySystem } from './Scene02_TheBinarySystem';
import { Scene03_TheOctalSystem } from './Scene03_TheOctalSystem';
import { Scene04_TheHexadecimalSystem } from './Scene04_TheHexadecimalSystem';
import { Scene05_BaseConversion } from './Scene05_BaseConversion';
import { Scene06_WhyComputersUseBinary } from './Scene06_WhyComputersUseBinary';
import { Scene07_PowersOfTwo } from './Scene07_PowersOfTwo';

export const chapter3: Chapter = {
  id: 3,
  title: 'Number Systems',
  subtitle: 'Chapter 3: How Computers Count',
  scenes: [
    {
      component: Scene01_TheDecimalSystem,
      title: 'The Decimal System'
    },
    {
      component: Scene02_TheBinarySystem,
      title: 'The Binary System'
    },
    {
      component: Scene03_TheOctalSystem,
      title: 'The Octal System'
    },
    {
      component: Scene04_TheHexadecimalSystem,
      title: 'The Hexadecimal System'
    },
    {
      component: Scene05_BaseConversion,
      title: 'Base Conversion'
    },
    {
      component: Scene06_WhyComputersUseBinary,
      title: 'Why Computers Use Binary'
    },
    {
      component: Scene07_PowersOfTwo,
      title: 'Powers of Two'
    }
  ]
};

export default chapter3;
