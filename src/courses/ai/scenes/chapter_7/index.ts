import type { Chapter } from '../../../CourseViewer';

import { Scene7_1_WhyPCA } from './Scene01_WhyPCA';
import { Scene7_2_DataAsPoints } from './Scene02_DataAsPoints';
import { Scene7_3_PointCloudProblem } from './Scene03_PointCloudProblem';
import { Scene7_4_VarianceAsInformation } from './Scene04_VarianceAsInformation';
import { Scene7_5_FindBestDirection } from './Scene05_FindBestDirection';
import { Scene7_6_ProjectionAndShadows } from './Scene06_ProjectionAndShadows';
import { Scene7_7_MaximumVariance } from './Scene07_MaximumVariance';
import { Scene7_8_WhyCentering } from './Scene08_WhyCentering';
import { Scene7_9_MeanCenteringDemo } from './Scene09_MeanCenteringDemo';
import { Scene7_10_CovarianceIntuition } from './Scene10_CovarianceIntuition';
import { Scene7_11_CovarianceMatrix } from './Scene11_CovarianceMatrix';
import { Scene7_12_WhyXTX } from './Scene12_WhyXTX';
import { Scene7_13_EigenvectorsReturn } from './Scene13_EigenvectorsReturn';
import { Scene7_14_FirstPrincipalComponent } from './Scene14_FirstPrincipalComponent';
import { Scene7_15_SecondPrincipalComponent } from './Scene15_SecondPrincipalComponent';
import { Scene7_16_ExplainedVariance } from './Scene16_ExplainedVariance';
import { Scene7_17_PerfectDiagonalExample } from './Scene17_PerfectDiagonalExample';
import { Scene7_18_AlmostDiagonalExample } from './Scene18_AlmostDiagonalExample';
import { Scene7_19_RotatingCoordinates } from './Scene19_RotatingCoordinates';
import { Scene7_20_ProjectOntoPC1 } from './Scene20_ProjectOntoPC1';
import { Scene7_21_DiscardingPC2 } from './Scene21_DiscardingPC2';
import { Scene7_22_ReconstructingData } from './Scene22_ReconstructingData';
import { Scene7_23_DimensionalityReduction } from './Scene23_DimensionalityReduction';
import { Scene7_24_Eigenfaces } from './Scene24_Eigenfaces';
import { Scene7_25_EmbeddingsExample } from './Scene25_EmbeddingsExample';
import { Scene7_26_PCAAndSVD } from './Scene26_PCAAndSVD';
import { Scene7_27_OptimizationHook } from './Scene27_OptimizationHook';

export const chapter7: Chapter = {
  id: 7,
  title: "Principal Component Analysis",
  subtitle: "Chapter 7: Discovering The Hidden Structure In Data",

  scenes: [
    { component: Scene7_1_WhyPCA,                  title: "Why PCA Exists" },
    { component: Scene7_2_DataAsPoints,            title: "Data As Points In Space" },
    { component: Scene7_3_PointCloudProblem,       title: "The Point Cloud Problem" },
    { component: Scene7_4_VarianceAsInformation,   title: "Why Variance Matters" },
    { component: Scene7_5_FindBestDirection,       title: "Finding The Best Direction" },
    { component: Scene7_6_ProjectionAndShadows,    title: "Projecting Onto A Line" },
    { component: Scene7_7_MaximumVariance,         title: "The Variance Contest" },

    { component: Scene7_8_WhyCentering,            title: "Why We Center Data" },
    { component: Scene7_9_MeanCenteringDemo,       title: "Location vs Distribution" },

    { component: Scene7_10_CovarianceIntuition,    title: "When Features Move Together" },
    { component: Scene7_11_CovarianceMatrix,       title: "Capturing Relationships" },
    { component: Scene7_12_WhyXTX,                 title: "Why XᵀX Appears" },

    { component: Scene7_13_EigenvectorsReturn,     title: "The Important Directions" },
    { component: Scene7_14_FirstPrincipalComponent,title: "The First Principal Component" },
    { component: Scene7_15_SecondPrincipalComponent,title: "The Second Principal Component" },
    { component: Scene7_16_ExplainedVariance,      title: "How Much Information?" },

    { component: Scene7_17_PerfectDiagonalExample, title: "A Perfectly Structured Dataset" },
    { component: Scene7_18_AlmostDiagonalExample,  title: "A Realistic Dataset" },

    { component: Scene7_19_RotatingCoordinates,    title: "A Better Coordinate System" },
    { component: Scene7_20_ProjectOntoPC1,         title: "Compressing The Data" },
    { component: Scene7_21_DiscardingPC2,          title: "Throwing Away Noise" },
    { component: Scene7_22_ReconstructingData,     title: "Recovering The Original Points" },

    { component: Scene7_23_DimensionalityReduction,title: "Why PCA Is Powerful" },
    { component: Scene7_24_Eigenfaces,             title: "The Face Compression Breakthrough" },
    { component: Scene7_25_EmbeddingsExample,      title: "Embeddings Live In Lower Dimensions" },

    { component: Scene7_26_PCAAndSVD,              title: "PCA Is Really SVD" },
    { component: Scene7_27_OptimizationHook,       title: "What Comes Next?" }
  ]
};