import type { Chapter } from '../../../CourseViewer';

import { Scene2_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene2_2_RealWorldProximity } from './Scene02_RealWorldProximity';
import { Scene2_3_EuclideanDistance } from './Scene03_EuclideanDistance';
import { Scene2_4_HigherDimensions } from './Scene04_HigherDimensions';
import { Scene2_5_SameDifferent } from './Scene05_SameDifferent';
import { Scene2_6_CosineSimilarity } from './Scene06_CosineSimilarity';
import { Scene2_7_CosineMath } from './Scene07_CosineMath';
import { Scene2_8_NextHook } from './Scene08_NextHook';

export const chapter2: Chapter = {
  id: 2,
  title: "Measuring Proximity",
  subtitle: "Chapter 2: Similarity & Distance Metrics",
  scenes: [
    { component: Scene2_1_CuriosityHook,           title: "Near vs Far" },
    { component: Scene2_2_RealWorldProximity,       title: "Proximity Everywhere" },
    { component: Scene2_3_EuclideanDistance,        title: "Euclidean Distance" },
    { component: Scene2_4_HigherDimensions,         title: "Scale to Any Dimension" },
    { component: Scene2_5_SameDifferent,            title: "Same Direction, Different Scale" },
    { component: Scene2_6_CosineSimilarity,         title: "Cosine Similarity" },
    { component: Scene2_7_CosineMath,              title: "The Normalization Trick" },
    { component: Scene2_8_NextHook,                 title: "What's Next" }
  ]
};
