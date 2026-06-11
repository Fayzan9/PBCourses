import type { Chapter } from '../../../CourseViewer';

import { Scene4_1_WarpCuriosity } from './Scene01_WarpCuriosity';
import { Scene4_2_WhatHappens } from './Scene02_WhatHappens';
import { Scene4_3_RealWorldTransforms } from './Scene03_RealWorldTransforms';
import { Scene4_4_ScaleTransform } from './Scene04_ScaleTransform';
import { Scene4_5_HowToRotate } from './Scene05_HowToRotate';
import { Scene4_6_RotationTransform } from './Scene06_RotationTransform';
import { Scene4_7_ShearTransform } from './Scene07_ShearTransform';
import { Scene4_8_FourNumbers } from './Scene08_FourNumbers';
import { Scene4_9_WhatDoesEachDo } from './Scene09_WhatDoesEachDo';
import { Scene4_10_ColumnDestinations } from './Scene10_ColumnDestinations';
import { Scene4_11_MatrixVectorRecipe } from './Scene11_MatrixVectorRecipe';
import { Scene4_12_GridWarpPresets } from './Scene12_GridWarpPresets';
import { Scene4_13_WhatIfStack } from './Scene13_WhatIfStack';
import { Scene4_14_ComposingTransforms } from './Scene14_ComposingTransforms';
import { Scene4_15_DotProductBridge } from './Scene15_DotProductBridge';
import { Scene4_16_OneNeuron } from './Scene16_OneNeuron';
import { Scene4_17_NeuralLayer } from './Scene17_NeuralLayer';
import { Scene4_18_StackLinearQuestion } from './Scene18_StackLinearQuestion';
import { Scene4_18b_WhyNonLinear } from './Scene18b_WhyNonLinear';
import { Scene4_18c_ActivationBends } from './Scene18c_ActivationBends';
import { Scene4_19_NonLinearity } from './Scene19_NonLinearity';
import { Scene4_19b_StackedVsActivated } from './Scene19b_StackedVsActivated';
import { Scene4_22_NextHook } from './Scene22_NextHook';

export const chapter4: Chapter = {
  id: 4,
  title: "Matrix Transformations",
  subtitle: "Chapter 4: How AI Reshapes Space",
  scenes: [
    { component: Scene4_1_WarpCuriosity,      title: "What Can You Do to Space?" },
    { component: Scene4_2_WhatHappens,         title: "Think: What Happens?" },
    { component: Scene4_3_RealWorldTransforms, title: "Transformations Everywhere" },
    { component: Scene4_4_ScaleTransform,      title: "Stretch & Shrink" },
    { component: Scene4_5_HowToRotate,         title: "Think: How to Rotate?" },
    { component: Scene4_6_RotationTransform,   title: "Spinning Space" },
    { component: Scene4_7_ShearTransform,      title: "The Italic Effect" },
    { component: Scene4_8_FourNumbers,         title: "Just 4 Numbers" },
    { component: Scene4_9_WhatDoesEachDo,      title: "Think: What Does Each Do?" },
    { component: Scene4_10_ColumnDestinations, title: "Where Arrows Land" },
    { component: Scene4_11_MatrixVectorRecipe, title: "The Recipe" },
    { component: Scene4_12_GridWarpPresets,    title: "Watch Space Warp" },
    { component: Scene4_13_WhatIfStack,        title: "Think: Stack Two?" },
    { component: Scene4_14_ComposingTransforms,title: "Two in a Row" },
    { component: Scene4_15_DotProductBridge,   title: "You Already Know This" },
    { component: Scene4_16_OneNeuron,          title: "One Neuron First" },
    { component: Scene4_17_NeuralLayer,        title: "A Full Layer" },
    { component: Scene4_18_StackLinearQuestion,title: "Think: Stack 100 Layers?" },
    { component: Scene4_18b_WhyNonLinear,      title: "Why Lines Aren't Enough" },
    { component: Scene4_18c_ActivationBends,   title: "Activation Bends the Space" },
    { component: Scene4_19_NonLinearity,        title: "The Bend" },
    { component: Scene4_19b_StackedVsActivated, title: "Stack vs Activate" },
    { component: Scene4_22_NextHook,            title: "What's Next" }
  ]
};
