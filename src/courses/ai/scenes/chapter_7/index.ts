import type { Chapter } from '../../../CourseViewer';

import { Scene7_1_TheAIHook } from './Scene01_TheAIHook';
import { Scene7_2_WeightMatrix } from './Scene02_WeightMatrix';
import { Scene7_3_ThinkBias } from './Scene03_ThinkBias';
import { Scene7_4_ShiftingSpace } from './Scene04_ShiftingSpace';
import { Scene7_5_StackingProblem } from './Scene05_StackingProblem';
import { Scene7_6_CollapsingNetwork } from './Scene06_CollapsingNetwork';
import { Scene7_7_ThinkNonLinear } from './Scene07_ThinkNonLinear';
import { Scene7_8_TheSquish } from './Scene08_TheSquish';
import { Scene7_9_ReLUSandbox } from './Scene09_ReLUSandbox';
import { Scene7_10_TheNonLinearFold } from './Scene10_TheNonLinearFold';
import { Scene7_11_WarpingSpace } from './Scene11_WarpingSpace';
import { Scene7_12_FullLayerEquation } from './Scene12_FullLayerEquation';
import { Scene7_13_LayerSandbox } from './Scene13_LayerSandbox';
import { Scene7_14_ChapterSummary } from './Scene14_ChapterSummary';
import { Scene7_15_CalculusHook } from './Scene15_CalculusHook';

export const chapter7: Chapter = {
  id: 7,
  title: "The Neural Network Layer",
  subtitle: "Chapter 7: How AI Actually Looks at Data",
  scenes: [
    { component: Scene7_1_TheAIHook,           title: "Through a Sequence of Matrices" },
    { component: Scene7_2_WeightMatrix,        title: "The Weight Matrix (W)" },
    { component: Scene7_3_ThinkBias,           title: "Think: What About the Origin?" },
    { component: Scene7_4_ShiftingSpace,       title: "Adding the Bias (+ b)" },
    { component: Scene7_5_StackingProblem,     title: "The Problem with Lines" },
    { component: Scene7_6_CollapsingNetwork,   title: "Matrices Just Collapse" },
    { component: Scene7_7_ThinkNonLinear,      title: "Think: How Do We Bend Space?" },
    { component: Scene7_8_TheSquish,           title: "The Non-Linear Squish" },
    { component: Scene7_9_ReLUSandbox,         title: "Meet ReLU & Sigmoid" },
    { component: Scene7_10_TheNonLinearFold,   title: "The Non-Linear Fold" },
    { component: Scene7_11_WarpingSpace,       title: "Learning Complex Shapes" },
    { component: Scene7_12_FullLayerEquation,  title: "y = Wx + b Revealed" },
    { component: Scene7_13_LayerSandbox,       title: "Build Your First Layer" },
    { component: Scene7_14_ChapterSummary,     title: "Everything You Now Know" },
    { component: Scene7_15_CalculusHook,       title: "But How Do We Find W?" }
  ]
};
