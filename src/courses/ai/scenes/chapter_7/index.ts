import type { Chapter } from '../../../CourseViewer';

import { Scene7_1_CuriosityHook }       from './Scene01_CuriosityHook';
import { Scene7_2_RedundancyProblem }   from './Scene02_RedundancyProblem';
import { Scene7_3_VarianceIntuition }   from './Scene03_VarianceIntuition';
import { Scene7_4_FirstComponent }      from './Scene04_FirstComponent';
import { Scene7_5_OrthogonalityRule }   from './Scene05_OrthogonalityRule';
import { Scene7_6_CovarianceMatrix }    from './Scene06_CovarianceMatrix';
import { Scene7_7_EigenvectorsReturn }  from './Scene07_EigenvectorsReturn';
import { Scene7_8_SVDBridge }           from './Scene08_SVDBridge';
import { Scene7_9_TheAlgorithm }        from './Scene09_TheAlgorithm';
import { Scene7_10_WorkedExample }      from './Scene10_WorkedExample';
import { Scene7_11_RealAIApplications } from './Scene11_RealAIApplications';
import { Scene7_12_NextHook }           from './Scene12_NextHook';

export const chapter7: Chapter = {
  id: 7,
  title: "Principal Component Analysis",
  subtitle: "Chapter 7: Compressing Reality Without Losing Meaning",

  scenes: [
    { component: Scene7_1_CuriosityHook,       title: "Dimensions Compressed" },
    { component: Scene7_2_RedundancyProblem,   title: "Most Dimensions Are Redundant" },
    { component: Scene7_3_VarianceIntuition,   title: "Variance = Signal" },
    { component: Scene7_4_FirstComponent,      title: "The First Principal Component" },
    { component: Scene7_5_OrthogonalityRule,   title: "The Orthogonality Rule" },
    { component: Scene7_6_CovarianceMatrix,    title: "The Covariance Matrix" },
    { component: Scene7_7_EigenvectorsReturn,  title: "The Eigenvectors Are Back" },
    { component: Scene7_8_SVDBridge,           title: "PCA Is SVD in Disguise" },
    { component: Scene7_9_TheAlgorithm,        title: "PCA: The Full Recipe" },
    { component: Scene7_10_WorkedExample,      title: "Worked Example: 2D → 1D" },
    { component: Scene7_11_RealAIApplications, title: "Where PCA Powers Modern AI" },
    { component: Scene7_12_NextHook,           title: "The Limit of Lines" },
  ]
};
