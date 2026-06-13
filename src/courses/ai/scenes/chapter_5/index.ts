import type { Chapter } from '../../../CourseViewer';

import { Scene5_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene5_2_RubberSheetThink } from './Scene02_RubberSheetThink';
import { Scene5_3b_Bridge } from './Scene03b_Bridge';
import { Scene5_5_WhatMakesSpecial } from './Scene05_WhatMakesSpecial';
import { Scene5_6_TheEquation } from './Scene06_TheEquation';
import { Scene5_7_SolveExample } from './Scene07_SolveExample';
import { Scene5_22_NextHook } from './Scene22_NextHook';

export const chapter5: Chapter = {
  id: 5,
  title: "Eigenvectors & Eigenvalues",
  subtitle: "Chapter 5: The Skeleton of Every Transformation",
  scenes: [
    { component: Scene5_1_CuriosityHook,            title: "Special Directions" },
    { component: Scene5_2_RubberSheetThink,          title: "Think: The Rubber Sheet" },
    { component: Scene5_3b_Bridge,                   title: "What Are We Looking For?" },
    { component: Scene5_5_WhatMakesSpecial,          title: "Think: What Makes Special?" },
    { component: Scene5_6_TheEquation,               title: "The Equation Revealed" },
    { component: Scene5_7_SolveExample,              title: "Solving an Example" },
    { component: Scene5_22_NextHook,                 title: "What's Next" }
  ]
};

