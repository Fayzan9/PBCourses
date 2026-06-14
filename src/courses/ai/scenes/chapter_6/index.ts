import type { Chapter } from '../../../CourseViewer';

import { Scene6_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene6_2_CircleToEllipse } from './Scene02_CircleToEllipse';
import { Scene6_3_TheRealQuestion } from './Scene03_TheRealQuestion';
import { Scene6_4_FindStrongestDirection } from './Scene04_FindStrongestDirection';
import { Scene6_5_WhyATA } from './Scene05_WhyATA';
import { Scene6_6_SymmetricGift } from './Scene06_SymmetricGift';
import { Scene6_7_EigenvectorsReturn } from './Scene07_EigenvectorsReturn';
import { Scene6_8_SingularValues } from './Scene08_SingularValues';
import { Scene6_9_WorkedExample } from './Scene09_WorkedExample';
import { Scene6_10_InputVsOutput } from './Scene10_InputVsOutput';
import { Scene6_11_BuildingU } from './Scene11_BuildingU';
import { Scene6_12_RevealSVD } from './Scene12_RevealSVD';
import { Scene6_13_LowRankIntuition } from './Scene13_LowRankIntuition';
import { Scene6_14_NetflixAnalogy } from './Scene14_NetflixAnalogy';
import { Scene6_15_EmbeddingsAndLLMs } from './Scene15_EmbeddingsAndLLMs';
import { Scene6_16_PCAHook } from './Scene16_PCAHook';

export const chapter6: Chapter = {
  id: 6,
  title: "Singular Value Decomposition",
  subtitle: "Chapter 6: Finding What A Transformation Really Does",

  scenes: [
    { component: Scene6_1_CuriosityHook,          title: "Every Matrix Has A Secret" },
    { component: Scene6_2_CircleToEllipse,        title: "The Circle Becomes An Ellipse" },
    { component: Scene6_3_TheRealQuestion,        title: "Which Direction Matters Most?" },
    { component: Scene6_4_FindStrongestDirection, title: "The Stretching Contest" },
    { component: Scene6_5_WhyATA,                 title: "Why AᵀA Appears" },
    { component: Scene6_6_SymmetricGift,          title: "Why Symmetry Saves Us" },
    { component: Scene6_7_EigenvectorsReturn,     title: "The Hidden Directions" },
    { component: Scene6_8_SingularValues,         title: "How Much Stretch?" },
    { component: Scene6_9_WorkedExample,          title: "Solving A Real Matrix" },
    { component: Scene6_10_InputVsOutput,         title: "Where Does The Vector Go?" },
    { component: Scene6_11_BuildingU,             title: "The Output Directions" },
    { component: Scene6_12_RevealSVD,             title: "Rotate → Stretch → Rotate" },
    { component: Scene6_13_LowRankIntuition,      title: "Keeping Only What Matters" },
    { component: Scene6_14_NetflixAnalogy,        title: "Hidden Structure" },
    { component: Scene6_15_EmbeddingsAndLLMs,     title: "Why Modern AI Uses SVD" },
    { component: Scene6_16_PCAHook,               title: "What Happens Next?" }
  ]
};
