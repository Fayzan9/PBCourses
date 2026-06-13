import type { Chapter } from '../../../CourseViewer';

import { Scene3_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene3_2_RealWorldAgreement } from './Scene02_RealWorldAgreement';
import { Scene3_3_AngleExplorer } from './Scene03_AngleExplorer';
import { Scene3_4_CoordinateShortcut } from './Scene04_CoordinateShortcut';
import { Scene3_5_ShadowProjection } from './Scene05_ShadowProjection';
import { Scene3_6_DotProductFormula } from './Scene06_DotProductFormula';
import { Scene3_7_NextHook } from './Scene07_NextHook';

export const chapter3: Chapter = {
  id: 3,
  title: "The Dot Product",
  subtitle: "Chapter 3: Projection & Feature Alignment",
  scenes: [
    { component: Scene3_1_CuriosityHook,           title: "What is Alignment?" },
    { component: Scene3_2_RealWorldAgreement,       title: "Real-World Agreement" },
    { component: Scene3_3_AngleExplorer,             title: "Rotate & Observe" },
    { component: Scene3_4_CoordinateShortcut,       title: "Coordinate Shortcut" },
    { component: Scene3_5_ShadowProjection,          title: "The Shadow" },
    { component: Scene3_6_DotProductFormula,        title: "The Mathematical Formula" },
    { component: Scene3_7_NextHook,                   title: "What's Next" }
  ]
};
