import type { Chapter } from '../../../CourseViewer';

import { Scene7_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene7_2_TheLimitation } from './Scene02_TheLimitation';
import { Scene7_3_ThinkMountain } from './Scene03_ThinkMountain';
import { Scene7_4_LossLandscape3D } from './Scene04_LossLandscape3D';
import { Scene7_5_ContourMap } from './Scene05_ContourMap';
import { Scene7_6_MeetTheGradient } from './Scene06_MeetTheGradient';
import { Scene7_7_GradientSandbox } from './Scene07_GradientSandbox';
import { Scene7_8_ThinkStepSize } from './Scene08_ThinkStepSize';
import { Scene7_9_LearningRateSandbox } from './Scene09_LearningRateSandbox';
import { Scene7_10_WorkedFormula } from './Scene10_WorkedFormula';
import { Scene7_11_Summary } from './Scene11_Summary';

export const chapter7: Chapter = {
  id: 7,
  title: "The Gradient & The Loss Landscape",
  subtitle: "Chapter 7: Sliding Down the Mountain of Error",
  scenes: [
    { component: Scene7_1_CuriosityHook,       title: "Blindfolded Hiker" },
    { component: Scene7_2_TheLimitation,       title: "The Weight Problem" },
    { component: Scene7_3_ThinkMountain,       title: "Think: Measuring Wrongness" },
    { component: Scene7_4_LossLandscape3D,     title: "3D Loss Landscape" },
    { component: Scene7_5_ContourMap,          title: "Contour Maps" },
    { component: Scene7_6_MeetTheGradient,     title: "Meet the Gradient" },
    { component: Scene7_7_GradientSandbox,     title: "Gradient Sandbox" },
    { component: Scene7_8_ThinkStepSize,       title: "Think: Step Size" },
    { component: Scene7_9_LearningRateSandbox, title: "Learning Rate Sandbox" },
    { component: Scene7_10_WorkedFormula,      title: "The Update Rule" },
    { component: Scene7_11_Summary,            title: "Summary" }
  ]
};
