import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseStateProvider } from './components/CourseStateContext';
import { 
  ArrowLeft, ArrowRight, BookOpen, HelpCircle, Menu, X,
  ChevronDown, ChevronRight, ChevronLeft
} from 'lucide-react';
import { 
  Scene1_Curiosity, Scene2_PersonRep, Scene3_PeoplePoints, 
  Scene4_MovieSpace, Scene4b_ThreeDSpace, Scene4c_HighDimSpace,
  Scene5_MusicSpace, Scene6_ProductSpace, 
  Scene7_ImageSpace, Scene8_LanguageSpace, Scene9_SemanticGalaxy, 
  Scene10_ChatGPTReveal, Scene11_Unification, Scene12_MathReveal, 
  Scene13_InteractivePlayground, Scene14_FinalModel, Scene15_NextHook
} from './scenes/chapter_1';
import {
  Scene2_1_CuriosityHook, Scene2_2_HowDoWeCompare, Scene2_3_RealWorldProximity,
  Scene2_3b_WhyFormula,
  Scene2_4_EuclideanDistance, Scene2_5_HigherDimensions, Scene2_6_MagnitudeTrapQuestion,
  Scene2_7_SameDifferent, Scene2_8_CosineIdea, Scene2_9_CosineSimilarity,
  Scene2_10_CosineMath, Scene2_11_WhenToUseWhich, Scene2_12_ProximitySandbox,
  Scene2_Summary,
  Scene2_13_NextHook
} from './scenes/chapter_2';
import {
  Scene3_1_CuriosityHook, Scene3_2_HowToMeasure, Scene3_3_RealWorldAnalogies,
  Scene3_4_AngleExplorer, Scene3_5_WhatAboutPerpendicular, Scene3_6_ZeroAlignment,
  Scene3_7_OppositeNegative, Scene3_8_ShadowProjection, Scene3_9_CanWeSkipAngle,
  Scene3_10_CoordinateShortcut, Scene3_11_GrandEquivalence, Scene3_12_WhySignalMatters,
  Scene3_13_SignalStrength, Scene3_14_NextHook
} from './scenes/chapter_3';
import {
  Scene4_1_WarpCuriosity,
  Scene4_2_WhatHappens,
  Scene4_3_RealWorldTransforms,
  Scene4_4_ScaleTransform,
  Scene4_5_HowToRotate,
  Scene4_6_RotationTransform,
  Scene4_7_ShearTransform,
  Scene4_8_FourNumbers,
  Scene4_9_WhatDoesEachDo,
  Scene4_10_ColumnDestinations,
  Scene4_11_MatrixVectorRecipe,
  Scene4_12_GridWarpPresets,
  Scene4_13_WhatIfStack,
  Scene4_14_ComposingTransforms,
  Scene4_15_DotProductBridge,
  Scene4_16_OneNeuron,
  Scene4_17_NeuralLayer,
  Scene4_18_StackLinearQuestion,
  Scene4_19_NonLinearity,
  Scene4_20_DeepNetworks,
  Scene4_21_MatrixSandbox,
  Scene4_22_NextHook,
} from './scenes/chapter_4';
import {
  Scene5_1_CuriosityHook,
  Scene5_2_RubberSheetThink,
  Scene5_3_RealWorldAnalogies,
  Scene5_3b_Bridge,
  Scene5_4_WobbleTest,
  Scene5_5_WhatMakesSpecial,
  Scene5_6_TheEquation,
  Scene5_7_WhatIsLambda,
  Scene5_8_EigenvalueExplorer,
  Scene5_9_GeometricPicture,
  Scene5_10_CanEveryMatrix,
  Scene5_11_CharacteristicEquation,
  Scene5_12_WorkedExample,
  Scene5_13_NegativeLambda,
  Scene5_14_Diagonalization,
  Scene5_15_PCAIntuition,
  Scene5_16_WhyMLLoves,
  Scene5_17_SymmetricMatrices,
  Scene5_18_Spectrum,
  Scene5_19_RankThink,
  Scene5_20_EigenSandbox,
  Scene5_21_GrandSummary,
  Scene5_22_NextHook,
} from './scenes/chapter_5';
import {
  Scene6_1_CuriosityHook, Scene6_2_TheSquareProblem, Scene6_3_RealWorldNonSquare,
  Scene6_4_ThreeMoveIdea, Scene6_5_RotateStretchRotate, Scene6_6_WhatIsU,
  Scene6_7_WhatIsSigma, Scene6_8_WhatIsVt, Scene6_9_SingularValuesVsEigenvalues,
  Scene6_10_RankAndSingularValues, Scene6_11_LowRankIdea, Scene6_12_ImageCompression,
  Scene6_13_RecommenderIntuition, Scene6_14_LatentFactors, Scene6_15_SVDAndPCABridge,
  Scene6_16_WhyNotEigen, Scene6_17_AttentionPreview, Scene6_18_NumericalStability,
  Scene6_19_SVDInteractiveSandbox, Scene6_20_RecapTheThreeSteps, Scene6_21_GrandSummary,
  Scene6_22_NextHook,
} from './scenes/chapter_6';

const CHAPTERS = [
  {
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
  },
  {
    id: 2,
    title: "Measuring Proximity",
    subtitle: "Chapter 2: Similarity & Distance Metrics",
    scenes: [
      { component: Scene2_1_CuriosityHook,           title: "Near vs Far" },
      { component: Scene2_2_HowDoWeCompare,           title: "Think: How Do We Compare?" },
      { component: Scene2_3_RealWorldProximity,       title: "Proximity Everywhere" },
      { component: Scene2_3b_WhyFormula,              title: "Why We Need a Formula" },
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
  },
  {
    id: 3,
    title: "The Dot Product",
    subtitle: "Chapter 3: Projection & Feature Alignment",
    scenes: [
      { component: Scene3_1_CuriosityHook,           title: "What is Alignment?" },
      { component: Scene3_2_HowToMeasure,             title: "Think: How to Measure" },
      { component: Scene3_3_RealWorldAnalogies,        title: "Real-World Agreement" },
      { component: Scene3_4_AngleExplorer,             title: "Rotate & Observe" },
      { component: Scene3_5_WhatAboutPerpendicular,    title: "Think: Perpendicular" },
      { component: Scene3_6_ZeroAlignment,             title: "Zero Alignment" },
      { component: Scene3_7_OppositeNegative,          title: "Opposition is Negative" },
      { component: Scene3_8_ShadowProjection,          title: "The Shadow" },
      { component: Scene3_9_CanWeSkipAngle,            title: "Think: Skip the Angle?" },
      { component: Scene3_10_CoordinateShortcut,       title: "Coordinate Shortcut" },
      { component: Scene3_11_GrandEquivalence,         title: "Two Paths, One Answer" },
      { component: Scene3_12_WhySignalMatters,         title: "Think: Signal Strength" },
      { component: Scene3_13_SignalStrength,            title: "Signal Strength Sandbox" },
      { component: Scene3_14_NextHook,                   title: "What's Next" }
    ]
  },
  {
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
      { component: Scene4_19_NonLinearity,       title: "The Bend" },
      { component: Scene4_20_DeepNetworks,       title: "Depth = Power" },
      { component: Scene4_21_MatrixSandbox,      title: "Matrix Sandbox" },
      { component: Scene4_22_NextHook,            title: "What's Next" }
    ]
  },
  {
    id: 5,
    title: "Eigenvectors & Eigenvalues",
    subtitle: "Chapter 5: The Skeleton of Every Transformation",
    scenes: [
      { component: Scene5_1_CuriosityHook,            title: "Special Directions" },
      { component: Scene5_2_RubberSheetThink,          title: "Think: The Rubber Sheet" },
      { component: Scene5_3_RealWorldAnalogies,        title: "Eigenvectors Everywhere" },
      { component: Scene5_3b_Bridge,                   title: "What Are We Looking For?" },
      { component: Scene5_4_WobbleTest,                title: "The Wobble Test" },
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
      { component: Scene5_22_NextHook,                 title: "What's Next" },
    ]
  },
  {
    id: 6,
    title: "Singular Value Decomposition",
    subtitle: "Chapter 6: Rotate · Stretch · Rotate",
    scenes: [
      { component: Scene6_1_CuriosityHook, title: "Rotate. Stretch. Rotate." },
      { component: Scene6_2_TheSquareProblem, title: "The Square Problem" },
      { component: Scene6_3_RealWorldNonSquare, title: "Non-Square Is Everywhere" },
      { component: Scene6_4_ThreeMoveIdea, title: "The 3-Move Idea" },
      { component: Scene6_5_RotateStretchRotate, title: "Three Steps, One Matrix" },
      { component: Scene6_6_WhatIsU, title: "What Is U?" },
      { component: Scene6_7_WhatIsSigma, title: "What Is Σ?" },
      { component: Scene6_8_WhatIsVt, title: "What Is Vᵀ?" },
      { component: Scene6_9_SingularValuesVsEigenvalues, title: "Eigenvalues vs Singular Values" },
      { component: Scene6_10_RankAndSingularValues, title: "Rank = Non-Zero σ's" },
      { component: Scene6_11_LowRankIdea, title: "Keep Only What Matters" },
      { component: Scene6_12_ImageCompression, title: "Image Compression Live" },
      { component: Scene6_13_RecommenderIntuition, title: "Filling in the Blanks" },
      { component: Scene6_14_LatentFactors, title: "Hidden Taste Dimensions" },
      { component: Scene6_15_SVDAndPCABridge, title: "PCA = SVD in Disguise" },
      { component: Scene6_16_WhyNotEigen, title: "Why Eigenvalues Break" },
      { component: Scene6_17_AttentionPreview, title: "SVD in Transformers" },
      { component: Scene6_18_NumericalStability, title: "The Safe Solver" },
      { component: Scene6_19_SVDInteractiveSandbox, title: "SVD Sandbox" },
      { component: Scene6_20_RecapTheThreeSteps, title: "The Full Picture" },
      { component: Scene6_21_GrandSummary, title: "Everything You Now Know" },
      { component: Scene6_22_NextHook, title: "What's Next" },
    ]
  }
];

const CHAPTER_THEMES = [
  {
    id: 1,
    primary: 'vector',
    text: 'text-vector',
    bg: 'bg-vector/10',
    border: 'border-vector/20',
    glow: 'glow-vector',
    dotBg: 'bg-vector',
    bgActive: 'bg-vector hover:bg-sky-600',
    hover: 'hover:bg-vector/5 hover:text-vector'
  },
  {
    id: 2,
    primary: 'similarity',
    text: 'text-similarity',
    bg: 'bg-similarity/10',
    border: 'border-similarity/20',
    glow: 'glow-similarity',
    dotBg: 'bg-similarity',
    bgActive: 'bg-similarity hover:bg-amber-600',
    hover: 'hover:bg-similarity/5 hover:text-similarity'
  },
  {
    id: 3,
    primary: 'probability',
    text: 'text-probability',
    bg: 'bg-probability/10',
    border: 'border-probability/20',
    glow: 'glow-probability',
    dotBg: 'bg-probability',
    bgActive: 'bg-probability hover:bg-emerald-600',
    hover: 'hover:bg-probability/5 hover:text-probability'
  },
  {
    id: 4,
    primary: 'transformations',
    text: 'text-transformations',
    bg: 'bg-transformations/10',
    border: 'border-transformations/20',
    glow: 'glow-transformations',
    dotBg: 'bg-transformations',
    bgActive: 'bg-transformations hover:bg-violet-600',
    hover: 'hover:bg-transformations/5 hover:text-transformations'
  },
  {
    id: 5,
    primary: 'loss',
    text: 'text-loss',
    bg: 'bg-loss/10',
    border: 'border-loss/20',
    glow: 'glow-loss',
    dotBg: 'bg-loss',
    bgActive: 'bg-loss hover:bg-rose-600',
    hover: 'hover:bg-loss/5 hover:text-loss'
  },
  {
    id: 6,
    primary: 'svd',
    text: 'text-svd',
    bg: 'bg-svd/10',
    border: 'border-svd/20',
    glow: 'glow-svd',
    dotBg: 'bg-svd',
    bgActive: 'bg-svd hover:bg-cyan-700',
    hover: 'hover:bg-svd/5 hover:text-svd'
  }
];

export const App: React.FC = () => {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedChapterIdx, setExpandedChapterIdx] = useState<number | null>(0);

  const activeChapter = CHAPTERS[activeChapterIdx];
  const activeScene = activeChapter.scenes[currentSceneIdx];
  const totalScenes = activeChapter.scenes.length;

  const navigateNext = () => {
    if (currentSceneIdx < totalScenes - 1) {
      setDirection(1);
      setCurrentSceneIdx(c => c + 1);
    } else if (activeChapterIdx < CHAPTERS.length - 1) {
      setDirection(1);
      const nextCh = activeChapterIdx + 1;
      setActiveChapterIdx(nextCh);
      setCurrentSceneIdx(0);
      setExpandedChapterIdx(nextCh);
    }
  };

  const navigatePrev = () => {
    if (currentSceneIdx > 0) {
      setDirection(-1);
      setCurrentSceneIdx(c => c - 1);
    } else if (activeChapterIdx > 0) {
      setDirection(-1);
      const prevChapterIdx = activeChapterIdx - 1;
      setActiveChapterIdx(prevChapterIdx);
      setCurrentSceneIdx(CHAPTERS[prevChapterIdx].scenes.length - 1);
      setExpandedChapterIdx(prevChapterIdx);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' || 
        document.activeElement?.tagName === 'TEXTAREA' ||
        isSidebarOpen
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        navigateNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigatePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSceneIdx, activeChapterIdx, isSidebarOpen, totalScenes]);

  // Touch Swipe Gesture Detectors
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSidebarOpen) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null || isSidebarOpen) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    if (diff > 50) {
      navigateNext();
      setTouchStart(null);
    } else if (diff < -50) {
      navigatePrev();
      setTouchStart(null);
    }
  };

  const jumpToScene = (idx: number) => {
    setDirection(idx > currentSceneIdx ? 1 : -1);
    setCurrentSceneIdx(idx);
    // Keep sidebar open as requested
  };

  const selectChapter = (chapterIdx: number) => {
    setDirection(chapterIdx > activeChapterIdx ? 1 : -1);
    setActiveChapterIdx(chapterIdx);
    setCurrentSceneIdx(0);
    setExpandedChapterIdx(chapterIdx);
    // Keep sidebar open as requested
  };

  const toggleChapterExpanded = (chapterIdx: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop navigation triggered on clicking chapter row
    setExpandedChapterIdx(prev => prev === chapterIdx ? null : chapterIdx);
  };

  const ActiveComponent = activeScene.component;

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.99
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -250 : 250,
      opacity: 0,
      scale: 0.99,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.25 }
      }
    })
  };

  const renderSidebar = (isCollapsed: boolean, isMobile: boolean) => {
    // COLLAPSED: show nothing but a single centered expand button
    if (isCollapsed) {
      return (
        <div className="flex flex-col h-full items-center justify-center">
          <button
            onClick={() => setIsSidebarCollapsed(false)}
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
            title="Open Menu"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      );
    }

    // EXPANDED: full header + accordion nav tree + footer
    return (
      <div className="flex flex-col h-full overflow-hidden select-none">
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <div className={`p-1.5 rounded-lg transition-colors ${CHAPTER_THEMES[activeChapterIdx].bg} ${CHAPTER_THEMES[activeChapterIdx].text}`}>
              <BookOpen size={16} />
            </div>
            <span className="font-extrabold text-sm text-slate-800 tracking-tight truncate">AI Intuition Course</span>
          </div>
          {isMobile ? (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          ) : (
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              title="Collapse Menu"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Navigation tree */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
          {CHAPTERS.map((chapter, chIdx) => {
            const isActiveChapter = chIdx === activeChapterIdx;
            const isExpanded = expandedChapterIdx === chIdx;
            const theme = CHAPTER_THEMES[chIdx];

            return (
              <div key={chIdx} className="flex flex-col">
                {/* Chapter Row */}
                <div
                  onClick={() => selectChapter(chIdx)}
                  className={`group w-full text-left py-2.5 px-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isActiveChapter
                      ? `${theme.bg} ${theme.text} ${theme.border} shadow-sm`
                      : 'text-slate-600 hover:bg-slate-50 border-transparent hover:text-slate-900'
                  }`}
                >
                  <button
                    onClick={(e) => toggleChapterExpanded(chIdx, e)}
                    className={`p-1 rounded-md hover:bg-slate-200/50 transition-colors cursor-pointer ${
                      isActiveChapter ? 'text-slate-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                    />
                  </button>
                  <span className="truncate">Ch {chapter.id}: {chapter.title}</span>
                </div>

                {/* Scene list */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 pl-3 pr-1 py-1 ml-3 border-l border-slate-200/80">
                        {chapter.scenes.map((scene, scIdx) => {
                          const isActive = isActiveChapter && scIdx === currentSceneIdx;
                          return (
                            <button
                              key={scIdx}
                              onClick={() => jumpToScene(scIdx)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                                isActive
                                  ? 'bg-slate-900 text-white shadow-sm font-bold'
                                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                              }`}
                            >
                              <span className={`text-[9px] font-mono shrink-0 ${isActive ? 'text-white/60' : 'text-slate-300'}`}>
                                {String(scIdx + 1).padStart(2, '0')}
                              </span>
                              <span className="truncate">{scene.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 mt-auto shrink-0 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-mono font-bold">AI Curriculum v1.0</span>
          <button
            onClick={() => setIsSidebarCollapsed(true)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
            title="Collapse Menu"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <CourseStateProvider>
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="relative flex flex-row w-full h-screen max-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden font-sans space-grid-pattern-fine"
      >
        {/* Background soft atmosphere */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-vector/5 opacity-30 filter blur-[120px] pointer-events-none" />

        {/* DESKTOP SIDEBAR - DOCKED (hidden on mobile) */}
        <motion.aside
          animate={{ width: isSidebarCollapsed ? 88 : 320 }}
          transition={{ type: 'spring', damping: 22, stiffness: 150 }}
          className="hidden md:flex flex-col h-full bg-white border-r border-slate-200/80 shadow-md select-none shrink-0 overflow-hidden p-4 z-30"
        >
          {renderSidebar(isSidebarCollapsed, false)}
        </motion.aside>

        {/* MOBILE SIDEBAR - DRAWER (hidden on desktop) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Sidebar backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 bg-slate-900 z-40 cursor-pointer md:hidden"
              />

              {/* Sidebar drawer content */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 bottom-0 left-0 w-80 bg-white/95 backdrop-blur border-r border-slate-200 z-50 shadow-2xl flex flex-col p-5 overflow-hidden md:hidden"
              >
                {renderSidebar(false, true)}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* MAIN CONTAINER (spans rest of screen) */}
        <div className="flex-1 flex flex-col justify-between h-full overflow-hidden min-w-0">
          {/* HEADER SECTION */}
          <header className="w-full px-6 py-4 flex flex-row items-center justify-between gap-4 border-b border-slate-200/80 z-20 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsSidebarOpen(true);
                  } else {
                    setIsSidebarCollapsed(prev => !prev);
                  }
                }}
                className="p-2 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all cursor-pointer active:scale-95"
                title="Toggle sidebar"
              >
                <Menu size={20} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border transition-all ${CHAPTER_THEMES[activeChapterIdx].bg} ${CHAPTER_THEMES[activeChapterIdx].border} ${CHAPTER_THEMES[activeChapterIdx].text} ${CHAPTER_THEMES[activeChapterIdx].glow}`}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold tracking-tight text-slate-800 flex items-center gap-2">
                    {activeChapter.title}
                  </h1>
                  <p className="text-xs text-slate-500 font-bold">
                    {activeChapter.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Tracker dots */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {activeChapter.scenes.map((scene, idx) => {
                const isActive = idx === currentSceneIdx;
                const theme = CHAPTER_THEMES[activeChapterIdx];
                return (
                  <button
                    key={idx}
                    onClick={() => jumpToScene(idx)}
                    title={scene.title}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      isActive 
                        ? `w-6 ${theme.dotBg} shadow ${theme.glow}` 
                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                );
              })}
            </div>
          </header>

          {/* CORE STAGE */}
          <main className="flex-1 min-h-0 w-full px-6 py-2 flex items-center justify-center z-10 overflow-hidden">
            <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={`${activeChapterIdx}-${currentSceneIdx}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full flex items-center justify-center"
                >
                  <ActiveComponent />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

          {/* FOOTER CONTROLS BAR */}
          <footer className="w-full px-6 py-4 flex items-center justify-between border-t border-slate-200/80 bg-white/70 backdrop-blur z-20 shadow-sm shrink-0">
            {/* Navigation Tips */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono font-semibold">
              <HelpCircle size={14} className="text-slate-400" />
              <span>Use</span>
              <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600">Left</span>
              <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600">Right</span>
              <span>or</span>
              <span className="px-3 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600">Space</span>
              <span>to explore</span>
            </div>

            {/* Numeric progress indicator */}
            <div className="text-xs font-mono text-slate-500 flex items-center gap-1 font-bold">
              <span className={CHAPTER_THEMES[activeChapterIdx].text}>{(currentSceneIdx + 1).toString().padStart(2, '0')}</span>
              <span>/</span>
              <span>{totalScenes.toString().padStart(2, '0')}</span>
            </div>

            {/* Buttons navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={navigatePrev}
                disabled={activeChapterIdx === 0 && currentSceneIdx === 0}
                className="flex items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              
              <button
                onClick={navigateNext}
                disabled={activeChapterIdx === CHAPTERS.length - 1 && currentSceneIdx === totalScenes - 1}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white transition-all font-bold disabled:opacity-30 disabled:pointer-events-none shadow cursor-pointer ${CHAPTER_THEMES[activeChapterIdx].bgActive} ${CHAPTER_THEMES[activeChapterIdx].glow}`}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </CourseStateProvider>
  );
};

export default App;
