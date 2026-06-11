import type { Chapter } from '../../../CourseViewer';

import { Scene6_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene6_2_TheProblem } from './Scene02_TheProblem';
import { Scene6_3_ThinkRectangular } from './Scene03_ThinkRectangular';
import { Scene6_4_CircleToEllipse } from './Scene04_CircleToEllipse';
import { Scene6_5_StretchingContest } from './Scene05_StretchingContest';
import { Scene6_6_ChampionDirection } from './Scene06_ChampionDirection';
import { Scene6_7_ThinkSecondBest } from './Scene07_ThinkSecondBest';
import { Scene6_8_ThreeSteps } from './Scene08_ThreeSteps';
import { Scene6_9_TheReveal } from './Scene09_TheReveal';
import { Scene6_10_SingularValues } from './Scene10_SingularValues';
import { Scene6_11_ThinkCompression } from './Scene11_ThinkCompression';
import { Scene6_12_LowRankApprox } from './Scene12_LowRankApprox';
import { Scene6_13_NetflixAnalogy } from './Scene13_NetflixAnalogy';
import { Scene6_14_SVDSandbox } from './Scene14_SVDSandbox';
import { Scene6_15_GrandSummary } from './Scene15_GrandSummary';
import { Scene6_16_NextHook } from './Scene16_NextHook';

export const chapter6: Chapter = {
  id: 6,
  title: "Singular Value Decomposition",
  subtitle: "Chapter 6: Every Matrix is Rotate → Stretch → Rotate",
  scenes: [
    { component: Scene6_1_CuriosityHook,       title: "Are We Done?" },
    { component: Scene6_2_TheProblem,           title: "The Problem with Eigenvectors" },
    { component: Scene6_3_ThinkRectangular,     title: "Think: What About Rectangles?" },
    { component: Scene6_4_CircleToEllipse,      title: "Circle → Ellipse" },
    { component: Scene6_5_StretchingContest,    title: "The Stretching Contest" },
    { component: Scene6_6_ChampionDirection,    title: "Champion Direction" },
    { component: Scene6_7_ThinkSecondBest,      title: "Think: Second Best?" },
    { component: Scene6_8_ThreeSteps,           title: "Three-Step Magic" },
    { component: Scene6_9_TheReveal,            title: "A = UΣVᵀ Revealed" },
    { component: Scene6_10_SingularValues,      title: "Singular Values" },
    { component: Scene6_11_ThinkCompression,    title: "Think: Compression" },
    { component: Scene6_12_LowRankApprox,       title: "Low-Rank Approximation" },
    { component: Scene6_13_NetflixAnalogy,      title: "The Netflix Insight" },
    { component: Scene6_14_SVDSandbox,          title: "SVD Sandbox" },
    { component: Scene6_15_GrandSummary,        title: "Everything You Now Know" },
    { component: Scene6_16_NextHook,            title: "What's Next" }
  ]
};
