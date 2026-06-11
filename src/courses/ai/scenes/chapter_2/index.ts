import type { Chapter } from '../../../CourseViewer';

import { Scene2_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene2_2_HowDoWeCompare } from './Scene02_HowDoWeCompare';
import { Scene2_3_RealWorldProximity } from './Scene03_RealWorldProximity';
import { Scene2_3b_Proximity3DSpace } from './Scene03b_WhyFormula';
import { Scene2_4_EuclideanDistance } from './Scene04_EuclideanDistance';
import { Scene2_5_HigherDimensions } from './Scene05_HigherDimensions';
import { Scene2_6_MagnitudeTrapQuestion } from './Scene06_MagnitudeTrapQuestion';
import { Scene2_7_SameDifferent } from './Scene07_SameDifferent';
import { Scene2_8_CosineIdea } from './Scene08_CosineIdea';
import { Scene2_9_CosineSimilarity } from './Scene09_CosineSimilarity';
import { Scene2_10_CosineMath } from './Scene10_CosineMath';
import { Scene2_11_WhenToUseWhich } from './Scene11_WhenToUseWhich';
import { Scene2_12_ProximitySandbox } from './Scene12_ProximitySandbox';
import { Scene2_Summary } from './Scene13_Summary';
import { Scene2_13_NextHook } from './Scene14_NextHook';

export const chapter2: Chapter = {
  id: 2,
  title: "Measuring Proximity",
  subtitle: "Chapter 2: Similarity & Distance Metrics",
  scenes: [
    { component: Scene2_1_CuriosityHook,           title: "Near vs Far" },
    { component: Scene2_2_HowDoWeCompare,           title: "Think: How Do We Compare?" },
    { component: Scene2_3_RealWorldProximity,       title: "Proximity Everywhere" },
    { component: Scene2_3b_Proximity3DSpace,              title: "Proximity in 3D Space" },
    { component: Scene2_4_EuclideanDistance,        title: "Euclidean Distance" },
    { component: Scene2_5_HigherDimensions,         title: "Scale to Any Dimension" },
    { component: Scene2_6_MagnitudeTrapQuestion,    title: "Think: The Magnitude Trap" },
    { component: Scene2_7_SameDifferent,            title: "Same Direction, Different Scale" },
    { component: Scene2_8_CosineIdea,               title: "Think: Only Direction Matters" },
    { component: Scene2_9_CosineSimilarity,         title: "Cosine Similarity" },
    { component: Scene2_10_CosineMath,              title: "The Normalization Trick" },
    { component: Scene2_11_WhenToUseWhich,          title: "Think: Which Metric?" },
    { component: Scene2_12_ProximitySandbox,        title: "Proximity Sandbox" },
    { component: Scene2_Summary,                    title: "Chapter Summary" },
    { component: Scene2_13_NextHook,                 title: "What's Next" }
  ]
};
