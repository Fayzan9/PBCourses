import type { Chapter } from '../../../CourseViewer';

import { Scene4_1_WarpCuriosity } from './Scene01_WarpCuriosity';
import { Scene4_2_RealWorldTransforms } from './Scene02_RealWorldTransforms';
import { Scene4_3_ScaleTransform } from './Scene03_ScaleTransform';
import { Scene4_4_RotationTransform } from './Scene04_RotationTransform';
import { Scene4_5_ShearTransform } from './Scene05_ShearTransform';
import { Scene4_6_NonUniformScale } from './Scene06_NonUniformScale';
import { Scene4_7_FourNumbers } from './Scene07_FourNumbers';
import { Scene4_8_ColumnDestinations } from './Scene08_ColumnDestinations';
import { Scene4_9_MatrixVectorRecipe } from './Scene09_MatrixVectorRecipe';
import { Scene4_10_GridWarpPresets } from './Scene10_GridWarpPresets';
import { Scene4_11_ComposingTransforms } from './Scene11_ComposingTransforms';
import { Scene4_12_WhyTransformationsHelp } from './Scene12_WhyTransformationsHelp';
import { Scene4_13_DotProductBridge } from './Scene13_DotProductBridge';
import { Scene4_14_OneNeuron } from './Scene14_OneNeuron';
import { Scene4_15_NeuralLayer } from './Scene15_NeuralLayer';
import { Scene4_16_WhyNonLinear } from './Scene16_WhyNonLinear';
import { Scene4_17_ActivationBends } from './Scene17_ActivationBends';
import { Scene4_18_NonLinearity } from './Scene18_NonLinearity';
import { Scene4_19_StackedVsActivated } from './Scene19_StackedVsActivated';
import { Scene4_20_NextHook } from './Scene20_NextHook';

export const chapter4: Chapter = {
  id: 4,
  title: "Matrix Transformations",
  subtitle: "Chapter 4: How AI Reshapes Space",
  scenes: [
    { component: Scene4_1_WarpCuriosity,      title: "What Can You Do to Space?" },
    { component: Scene4_2_RealWorldTransforms, title: "Transformations Everywhere" },
    { component: Scene4_3_ScaleTransform,      title: "Stretch & Shrink" },
    { component: Scene4_4_RotationTransform,   title: "Spinning Space" },
    { component: Scene4_5_ShearTransform,      title: "The Italic Effect" },
    { component: Scene4_6_NonUniformScale,     title: "Non-Uniform Scaling" },
    { component: Scene4_7_FourNumbers,         title: "Just 4 Numbers" },
    { component: Scene4_8_ColumnDestinations, title: "Where Arrows Land" },
    { component: Scene4_9_MatrixVectorRecipe, title: "The Recipe" },
    { component: Scene4_10_GridWarpPresets,    title: "Watch Space Warp" },
    { component: Scene4_11_ComposingTransforms,title: "Two in a Row" },
    { component: Scene4_12_WhyTransformationsHelp, title: "Why Warping Space Helps AI" },
    { component: Scene4_13_DotProductBridge,   title: "Each Row = One Dot Product" },
    { component: Scene4_14_OneNeuron,          title: "One Neuron First" },
    { component: Scene4_15_NeuralLayer,        title: "A Full Layer" },
    { component: Scene4_16_WhyNonLinear,      title: "Why Lines Aren't Enough" },
    { component: Scene4_17_ActivationBends,   title: "Activation Bends the Space" },
    { component: Scene4_18_NonLinearity,        title: "The Bend" },
    { component: Scene4_19_StackedVsActivated, title: "Stack vs Activate" },
    { component: Scene4_20_NextHook,            title: "What's Next" }
  ]
};
