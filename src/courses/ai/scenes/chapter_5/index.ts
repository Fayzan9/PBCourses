import type { Chapter } from '../../../CourseViewer';

import { Scene5_1_CuriosityHook } from './Scene01_CuriosityHook';
import { Scene5_2_RubberSheetThink } from './Scene02_RubberSheetThink';
import { Scene5_3b_Bridge } from './Scene03b_Bridge';
import { Scene5_5_WhatMakesSpecial } from './Scene05_WhatMakesSpecial';
import { Scene5_6_TheEquation } from './Scene06_TheEquation';
import { Scene5_7_WhatIsLambda } from './Scene07_WhatIsLambda';
import { Scene5_8_EigenvalueExplorer } from './Scene08_EigenvalueExplorer';
import { Scene5_9_GeometricPicture } from './Scene09_GeometricPicture';
import { Scene5_10_CanEveryMatrix } from './Scene10_CanEveryMatrix';
import { Scene5_11_CharacteristicEquation } from './Scene11_CharacteristicEquation';
import { Scene5_12_WorkedExample } from './Scene12_WorkedExample';
import { Scene5_13_NegativeLambda } from './Scene13_NegativeLambda';
import { Scene5_14_Diagonalization } from './Scene14_Diagonalization';
import { Scene5_15_PCAIntuition } from './Scene15_PCAIntuition';
import { Scene5_16_WhyMLLoves } from './Scene16_WhyMLLoves';
import { Scene5_17_SymmetricMatrices } from './Scene17_SymmetricMatrices';
import { Scene5_18_Spectrum } from './Scene18_Spectrum';
import { Scene5_19_RankThink } from './Scene19_RankThink';
import { Scene5_20_EigenSandbox } from './Scene20_EigenSandbox';
import { Scene5_21_GrandSummary } from './Scene21_GrandSummary';
import { Scene5_22_NextHook } from './Scene22_NextHook';

export const chapter5: Chapter = {
  id: 5,
  title: "Eigenvectors & Eigenvalues",
  subtitle: "Chapter 5: The Skeleton of Every Transformation",
  scenes: [
    { component: Scene5_1_CuriosityHook,            title: "Special Directions" },
    { component: Scene5_2_RubberSheetThink,          title: "Think: The Rubber Sheet" },
    { component: Scene5_3b_Bridge,                   title: "What Are We Looking For?" },
    { component: Scene5_5_WhatMakesSpecial,          title: "Think: What Makes Special?" },
    { component: Scene5_6_TheEquation,               title: "The Equation Revealed" },
    { component: Scene5_7_WhatIsLambda,              title: "Think: What Is λ?" },
    { component: Scene5_8_EigenvalueExplorer,        title: "Feel the Eigenvalue" },
    { component: Scene5_9_GeometricPicture,          title: "Eigenvectors in the Grid" },
    { component: Scene5_10_CanEveryMatrix,           title: "Think: Every Matrix?" },
    { component: Scene5_11_CharacteristicEquation,   title: "Finding Eigenvalues (Math)" },
    { component: Scene5_12_WorkedExample,            title: "Worked Example" },
    { component: Scene5_13_NegativeLambda,           title: "Think: Negative λ" },
    { component: Scene5_14_Diagonalization,          title: "Why Eigenvectors Are Powerful" },
    { component: Scene5_15_PCAIntuition,             title: "PCA: The Spread Direction" },
    { component: Scene5_16_WhyMLLoves,               title: "Think: Why ML Loves Them" },
    { component: Scene5_17_SymmetricMatrices,        title: "Symmetric = Guaranteed" },
    { component: Scene5_18_Spectrum,                 title: "The Eigenvalue Spectrum" },
    { component: Scene5_19_RankThink,                title: "Think: Rank the Eigenvalues" },
    { component: Scene5_20_EigenSandbox,             title: "Eigen Sandbox" },
    { component: Scene5_21_GrandSummary,             title: "Everything You Now Know" },
    { component: Scene5_22_NextHook,                 title: "What's Next" }
  ]
};
