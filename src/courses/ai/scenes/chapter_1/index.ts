import type { Chapter } from '../../../CourseViewer';

import { Scene1_Curiosity } from './Scene01_Curiosity';
import { Scene2_PersonRep } from './Scene02_PersonRep';
import { Scene3_PeoplePoints } from './Scene03_PeoplePoints';
import { Scene4_MovieSpace } from './Scene04_MovieSpace';
import { Scene4b_ThreeDSpace } from './Scene04b_ThreeDSpace';
import { Scene4c_HighDimSpace } from './Scene04c_HighDimSpace';
import { Scene5_MusicSpace } from './Scene05_MusicSpace';
import { Scene6_ProductSpace } from './Scene06_ProductSpace';
import { Scene7_ImageSpace } from './Scene07_ImageSpace';
import { Scene8_LanguageSpace } from './Scene08_LanguageSpace';
import { Scene9_SemanticGalaxy } from './Scene09_SemanticGalaxy';
import { Scene10_ChatGPTReveal } from './Scene10_ChatGPTReveal';
import { Scene11_Unification } from './Scene11_Unification';
import { Scene12_MathReveal } from './Scene12_MathReveal';
import { Scene13_InteractivePlayground } from './Scene13_InteractivePlayground';
import { Scene14_FinalModel } from './Scene14_FinalModel';
import { Scene15_NextHook } from './Scene15_NextHook';

export const chapter1: Chapter = {
  id: 1,
  title: "Everything Can Become a Point",
  subtitle: "Chapter 1: The Secret Language of Modern AI",
  scenes: [
    { component: Scene1_Curiosity, title: "Curiosity" },
    { component: Scene2_PersonRep, title: "Measurements to Numbers" },
    { component: Scene3_PeoplePoints, title: "People Become Locations" },
    { component: Scene4_MovieSpace, title: "Movie Space (2D)" },
    { component: Scene4b_ThreeDSpace, title: "Adding a 3rd Dimension (3D)" },
    { component: Scene4c_HighDimSpace, title: "Hyper-Dimensions" },
    { component: Scene5_MusicSpace, title: "Music Clustering" },
    { component: Scene6_ProductSpace, title: "Product Space" },
    { component: Scene7_ImageSpace, title: "Images are Grids" },
    { component: Scene8_LanguageSpace, title: "Language Space" },
    { component: Scene9_SemanticGalaxy, title: "Semantic Galaxy" },
    { component: Scene10_ChatGPTReveal, title: "ChatGPT Brain" },
    { component: Scene11_Unification, title: "The Great Unification" },
    { component: Scene12_MathReveal, title: "Meet the Vector" },
    { component: Scene13_InteractivePlayground, title: "Interactive Sandbox" },
    { component: Scene14_FinalModel, title: "Core Mental Model" },
    { component: Scene15_NextHook,    title: "What's Next" }
  ]
};
