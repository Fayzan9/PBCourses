import type { Chapter } from '../../../CourseViewer';

import { Scene3_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene3_2_HowToMeasure } from './Scene02_HowToMeasure';
import { Scene3_3_RealWorldAnalogies } from './Scene03_RealWorldAnalogies';
import { Scene3_4_AngleExplorer } from './Scene04_AngleExplorer';
import { Scene3_5_WhatAboutPerpendicular } from './Scene05_WhatAboutPerpendicular';
import { Scene3_6_ZeroAlignment } from './Scene06_ZeroAlignment';
import { Scene3_7_OppositeNegative } from './Scene07_OppositeNegative';
import { Scene3_8_ShadowProjection } from './Scene08_ShadowProjection';
import { Scene3_9_CanWeSkipAngle } from './Scene09_CanWeSkipAngle';
import { Scene3_10_CoordinateShortcut } from './Scene10_CoordinateShortcut';
import { Scene3_11_GrandEquivalence } from './Scene11_GrandEquivalence';
import { Scene3_12_WhySignalMatters } from './Scene12_WhySignalMatters';
import { Scene3_13_SignalStrength } from './Scene13_SignalStrength';
import { Scene3_14_NextHook } from './Scene14_NextHook';

export const chapter3: Chapter = {
  id: 3,
  title: "The Dot Product",
  subtitle: "Chapter 3: Projection & Feature Alignment",
  scenes: [
    { component: Scene3_1_CuriosityHook,           title: "What is Alignment?" },
    { component: Scene3_2_HowToMeasure,             title: "Think: How to Measure" },
    { component: Scene3_3_RealWorldAnalogies,        title: "Real-World Agreement" },
    { component: Scene3_4_AngleExplorer,             title: "Rotate & Observe" },
    { component: Scene3_5_WhatAboutPerpendicular,    title: "Think: Perpendicular" },
    { component: Scene3_6_ZeroAlignment,             title: "Zero Alignment" },
    { component: Scene3_7_OppositeNegative,          title: "Opposition is Negative" },
    { component: Scene3_8_ShadowProjection,          title: "The Shadow" },
    { component: Scene3_9_CanWeSkipAngle,            title: "Think: Skip the Angle?" },
    { component: Scene3_10_CoordinateShortcut,       title: "Coordinate Shortcut" },
    { component: Scene3_11_GrandEquivalence,         title: "Two Paths, One Answer" },
    { component: Scene3_12_WhySignalMatters,         title: "Think: Signal Strength" },
    { component: Scene3_13_SignalStrength,            title: "Signal Strength Sandbox" },
    { component: Scene3_14_NextHook,                   title: "What's Next" }
  ]
};
