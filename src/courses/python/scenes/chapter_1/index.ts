import type { Chapter } from '../../../CourseViewer';

import { Scene01_StoryHook }    from './Scene01_StoryHook';
import { Scene02_WhyPython }    from './Scene02_WhyPython';
import { Scene03_Variables }    from './Scene03_Variables';
import { Scene04a_IntFloat }    from './Scene04a_IntFloat';
import { Scene04b_Strings }     from './Scene04b_Strings';
import { Scene04c_Booleans }    from './Scene04c_Booleans';
import { Scene05_InputOutput }  from './Scene05_InputOutput';

export const chapter1: Chapter = {
  id: 1,
  title: 'The Awakening',
  subtitle: 'Chapter 1: Python Foundations',
  scenes: [
    { component: Scene01_StoryHook,   title: 'The Awakening' },
    { component: Scene02_WhyPython,   title: 'Why Python?' },
    { component: Scene03_Variables,   title: 'Variables' },
    { component: Scene04a_IntFloat,   title: 'int & float' },
    { component: Scene04b_Strings,    title: 'Strings' },
    { component: Scene04c_Booleans,   title: 'Booleans' },
    { component: Scene05_InputOutput, title: 'Input & Output' },
  ],
};
