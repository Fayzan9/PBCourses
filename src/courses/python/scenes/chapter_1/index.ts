import type { Chapter } from '../../../CourseViewer';

import { Scene01_StoryHook }        from './Scene01_StoryHook';
import { Scene02_WhyPython }        from './Scene02_WhyPython';
import { Scene03_Variables }        from './Scene03_Variables';
import { Scene04a_IntFloat }        from './Scene04a_IntFloat';
import { Scene04b_Strings }         from './Scene04b_Strings';
import { Scene04c_Booleans }        from './Scene04c_Booleans';
import { Scene05_InputOutput }      from './Scene05_InputOutput';
import { Scene06a_MemoryModel }     from './Scene06a_MemoryModel';
import { Scene06b_MutableImmutable } from './Scene06b_MutableImmutable';
import { Scene07_FirstProgram }     from './Scene07_FirstProgram';
import { Scene08_PracticeSandbox }  from './Scene08_PracticeSandbox';
import { Scene09_Quiz1 }            from './Scene09_Quiz1';
import { Scene10_Quiz2 }            from './Scene10_Quiz2';
import { Scene11_BossChallenge }    from './Scene11_BossChallenge';
import { Scene12_MayaDebrief }      from './Scene12_MayaDebrief';
import { Scene13_Summary }          from './Scene13_Summary';
import { Scene14_NextHook }         from './Scene14_NextHook';

export const chapter1: Chapter = {
  id: 1,
  title: 'The Awakening',
  subtitle: 'Chapter 1: Python Foundations',
  scenes: [
    { component: Scene01_StoryHook,        title: 'The Awakening' },
    { component: Scene02_WhyPython,        title: 'Why Python?' },
    { component: Scene03_Variables,        title: 'Variables' },
    { component: Scene04a_IntFloat,        title: 'int & float' },
    { component: Scene04b_Strings,         title: 'Strings' },
    { component: Scene04c_Booleans,        title: 'Booleans' },
    { component: Scene05_InputOutput,      title: 'Input & Output' },
    { component: Scene06a_MemoryModel,     title: 'Memory Model' },
    { component: Scene06b_MutableImmutable, title: 'Mutable vs Immutable' },
    { component: Scene07_FirstProgram,     title: 'First Program' },
    { component: Scene08_PracticeSandbox,  title: 'Practice Sandbox' },
    { component: Scene09_Quiz1,            title: 'Quiz 1' },
    { component: Scene10_Quiz2,            title: 'Quiz 2' },
    { component: Scene11_BossChallenge,    title: 'Boss Challenge' },
    { component: Scene12_MayaDebrief,      title: "Maya's Debrief" },
    { component: Scene13_Summary,          title: 'Chapter Summary' },
    { component: Scene14_NextHook,         title: "What's Next" },
  ],
};
