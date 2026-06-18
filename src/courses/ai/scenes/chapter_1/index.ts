import type { Chapter } from '../../../CourseViewer';

import { Scene00_Intro } from './Scene00_Intro';
import { Scene1_Curiosity } from './Scene01_Curiosity';
import { Scene2_PersonRep } from './Scene02_PersonRep';
import { Scene3_PeoplePoints } from './Scene03_PeoplePoints';
import { Scene4b_ThreeDSpace } from './Scene04b_ThreeDSpace';
import { Scene4c_HighDimSpace } from './Scene04c_HighDimSpace';
import { Scene05_CombinedSpace } from './Scene05_CombinedSpace';
import { Scene7_ImageSpace } from './Scene07_ImageSpace';
import { Scene9_SemanticGalaxy } from './Scene09_SemanticGalaxy';
import { Scene12_MathReveal } from './Scene12_MathReveal';
import { Scene15_NextHook } from './Scene15_NextHook';

export const chapter1: Chapter = {
  id: 1,
  title: "Everything Can Become a Point",
  subtitle: "Chapter 1: The Secret Language of Modern AI",
  scenes: [
    { component: Scene00_Intro, title: "AI Course" },
    { component: Scene1_Curiosity, title: "Curiosity" },
    { component: Scene2_PersonRep, title: "Measurements to Numbers" },
    { component: Scene3_PeoplePoints, title: "People Become Locations" },
    { component: Scene4b_ThreeDSpace, title: "Adding a 3rd Dimension (3D)" },
    { component: Scene4c_HighDimSpace, title: "Hyper-Dimensions" },
    { component: Scene05_CombinedSpace, title: "Clustering Spaces (Music, Product, Words)" },
    { component: Scene7_ImageSpace, title: "Images are Grids" },
    { component: Scene9_SemanticGalaxy, title: "Semantic Galaxy" },
    { component: Scene12_MathReveal, title: "Meet the Vector" },
    { component: Scene15_NextHook,    title: "What's Next" }
  ]
};
