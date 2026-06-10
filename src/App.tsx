import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, HelpCircle, Menu, X } from 'lucide-react';
import { 
  Scene1_Curiosity, Scene2_PersonRep, Scene3_PeoplePoints, 
  Scene4_MovieSpace, Scene4b_ThreeDSpace, Scene4c_HighDimSpace,
  Scene5_MusicSpace, Scene6_ProductSpace, 
  Scene7_ImageSpace, Scene8_LanguageSpace, Scene9_SemanticGalaxy, 
  Scene10_ChatGPTReveal, Scene11_Unification, Scene12_MathReveal, 
  Scene13_InteractivePlayground, Scene14_FinalModel 
} from './scenes/Scenes';
import {
  Scene2_1_ProximityCuriosity, Scene2_2_EuclideanDistance, Scene2_2b_HighDimEuclidean,
  Scene2_3_MagnitudeTrap, Scene2_4_CosineSimilarity, Scene2_4b_CosineMath,
  Scene2_5_ProximitySandbox
} from './scenes/Chapter2Scenes';
import {
  Scene3_1_CuriosityHook, Scene3_2_HowToMeasure, Scene3_3_RealWorldAnalogies,
  Scene3_4_AngleExplorer, Scene3_5_WhatAboutPerpendicular, Scene3_6_ZeroAlignment,
  Scene3_7_OppositeNegative, Scene3_8_ShadowProjection, Scene3_9_CanWeSkipAngle,
  Scene3_10_CoordinateShortcut, Scene3_11_GrandEquivalence, Scene3_12_WhySignalMatters,
  Scene3_13_SignalStrength
} from './scenes/Chapter3Scenes';
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
} from './scenes/Chapter4Scenes';

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
      { component: Scene14_FinalModel, title: "Core Mental Model" }
    ]
  },
  {
    id: 2,
    title: "Measuring Proximity",
    subtitle: "Chapter 2: Similarity & Distance Metrics",
    scenes: [
      { component: Scene2_1_ProximityCuriosity, title: "Proximity Curiosity" },
      { component: Scene2_2_EuclideanDistance, title: "Euclidean Distance" },
      { component: Scene2_2b_HighDimEuclidean, title: "Adding Dimensions (3D)" },
      { component: Scene2_3_MagnitudeTrap, title: "The Magnitude Trap" },
      { component: Scene2_4_CosineSimilarity, title: "Cosine Similarity" },
      { component: Scene2_4b_CosineMath, title: "Inside Cosine Math" },
      { component: Scene2_5_ProximitySandbox, title: "Proximity Sandbox" }
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
      { component: Scene3_13_SignalStrength,            title: "Signal Strength Sandbox" }
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
      { component: Scene4_21_MatrixSandbox,      title: "Matrix Sandbox" }
    ]
  }
];

export const App: React.FC = () => {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeChapter = CHAPTERS[activeChapterIdx];
  const activeScene = activeChapter.scenes[currentSceneIdx];
  const totalScenes = activeChapter.scenes.length;

  const navigateNext = () => {
    if (currentSceneIdx < totalScenes - 1) {
      setDirection(1);
      setCurrentSceneIdx(c => c + 1);
    } else if (activeChapterIdx < CHAPTERS.length - 1) {
      setDirection(1);
      setActiveChapterIdx(c => c + 1);
      setCurrentSceneIdx(0);
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
    setIsSidebarOpen(false);
  };

  const selectChapter = (chapterIdx: number) => {
    setDirection(chapterIdx > activeChapterIdx ? 1 : -1);
    setActiveChapterIdx(chapterIdx);
    setCurrentSceneIdx(0);
    setIsSidebarOpen(false);
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

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="relative flex flex-col justify-between w-full h-screen max-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden font-sans space-grid-pattern-fine"
    >
      {/* Background soft atmosphere */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-vector/5 opacity-30 filter blur-[120px] pointer-events-none" />
      
      {/* HEADER SECTION */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all cursor-pointer active:scale-95 animate-pulse-slow"
            title="Open navigation menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-vector/10 border border-vector/20 rounded-xl text-vector glow-vector">
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
            return (
              <button
                key={idx}
                onClick={() => jumpToScene(idx)}
                title={scene.title}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  isActive 
                    ? 'w-6 bg-vector shadow glow-vector' 
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            );
          })}
        </div>
      </header>

      {/* SIDEBAR NAVIGATION DRAWER */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Sidebar backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-slate-900 z-40 cursor-pointer"
            />

            {/* Sidebar drawer content */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 bottom-0 left-0 w-80 bg-white/95 backdrop-blur border-r border-slate-200 z-50 shadow-2xl flex flex-col p-6 overflow-hidden"
            >
              {/* Sidebar Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-vector/10 text-vector rounded-lg">
                    <BookOpen size={16} />
                  </div>
                  <span className="font-extrabold text-sm text-slate-800 tracking-tight">AI Intuition Course</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation tree — dynamic over CHAPTERS */}
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 scrollbar-thin">
                {CHAPTERS.map((chapter, chIdx) => {
                  const isActiveChapter = chIdx === activeChapterIdx;
                  return (
                    <div key={chIdx} className="flex flex-col">
                      {/* Chapter row */}
                      <button
                        onClick={() => selectChapter(chIdx)}
                        className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isActiveChapter
                            ? 'bg-vector/10 text-vector border border-vector/20'
                            : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:text-slate-900'
                        }`}
                      >
                        <span>Ch {chapter.id}: {chapter.title}</span>
                        <span className={`text-[9px] font-mono shrink-0 ${isActiveChapter ? 'text-vector/60' : 'text-slate-300'}`}>
                          {chapter.scenes.length} scenes
                        </span>
                      </button>

                      {/* Scene list — only shown for active chapter */}
                      <AnimatePresence>
                        {isActiveChapter && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-0.5 pl-4 pr-1 py-1 ml-2 border-l border-slate-200">
                              {chapter.scenes.map((scene, scIdx) => {
                                const isActive = scIdx === currentSceneIdx;
                                return (
                                  <button
                                    key={scIdx}
                                    onClick={() => jumpToScene(scIdx)}
                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                                      isActive
                                        ? 'bg-vector text-white shadow-sm'
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                    }`}
                                  >
                                    <span className={`text-[9px] font-mono shrink-0 ${isActive ? 'text-white/60' : 'text-slate-300'}`}>
                                      {String(scIdx + 1).padStart(2, '0')}
                                    </span>
                                    {scene.title}
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* CORE STAGE */}
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-6 py-2 flex items-center justify-center z-10 overflow-hidden">
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
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-t border-slate-200/80 bg-white/70 backdrop-blur z-20 shadow-sm">
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
          <span className="text-vector">{(currentSceneIdx + 1).toString().padStart(2, '0')}</span>
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
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-vector text-white hover:bg-sky-600 transition-all font-bold disabled:opacity-30 disabled:pointer-events-none shadow glow-vector cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
