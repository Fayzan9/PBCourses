import type { Chapter } from '../../../CourseViewer';

import { Scene01_WhatIsAVariable } from './Scene01_WhatIsAVariable';
import { Scene02_ObjectsInMemory } from './Scene02_ObjectsInMemory';
import { Scene03_References } from './Scene03_References';
import { Scene04_AssignmentAndRebinding } from './Scene04_AssignmentAndRebinding';
import { Scene05_MutableVsImmutable } from './Scene05_MutableVsImmutable';
import { Scene06_Summary } from './Scene06_Summary';

export const chapter2: Chapter = {
  id: 2,
  title: 'Variables, Objects & Memory',
  subtitle: 'Chapter 2: Python Memory Model',
  scenes: [
    {
      component: Scene01_WhatIsAVariable,
      title: 'What Is a Variable?'
    },
    {
      component: Scene02_ObjectsInMemory,
      title: 'Objects in Memory'
    },
    {
      component: Scene03_References,
      title: 'Variables and References'
    },
    {
      component: Scene04_AssignmentAndRebinding,
      title: 'Assignment & Rebinding'
    },
    {
      component: Scene05_MutableVsImmutable,
      title: 'Mutable vs Immutable Objects'
    },
    {
      component: Scene06_Summary,
      title: 'Chapter Summary'
    }
  ]
};

export default chapter2;