import type { Chapter } from '../../../CourseViewer';

import { Scene2_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene2_3_RealWorldProximity } from './Scene03_RealWorldProximity';
import { Scene2_4_EuclideanDistance } from './Scene04_EuclideanDistance';
import { Scene2_5_HigherDimensions } from './Scene05_HigherDimensions';
import { Scene2_7_SameDifferent } from './Scene07_SameDifferent';
import { Scene2_9_CosineSimilarity } from './Scene09_CosineSimilarity';
import { Scene2_10_CosineMath } from './Scene10_CosineMath';
import { Scene2_13_NextHook } from './Scene14_NextHook';

export const chapter2: Chapter = {
  id: 2,
  title: "Measuring Proximity",
  subtitle: "Chapter 2: Similarity & Distance Metrics",
  scenes: [
    { component: Scene2_1_CuriosityHook,           title: "Near vs Far" },
    { component: Scene2_3_RealWorldProximity,       title: "Proximity Everywhere" },
    { component: Scene2_4_EuclideanDistance,        title: "Euclidean Distance" },
    { component: Scene2_5_HigherDimensions,         title: "Scale to Any Dimension" },
    { component: Scene2_7_SameDifferent,            title: "Same Direction, Different Scale" },
    { component: Scene2_9_CosineSimilarity,         title: "Cosine Similarity" },
    { component: Scene2_10_CosineMath,              title: "The Normalization Trick" },
    { component: Scene2_13_NextHook,                 title: "What's Next" }
  ]
};
