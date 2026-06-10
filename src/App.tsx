import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, HelpCircle } from 'lucide-react';
import { 
  Scene1_Curiosity, Scene2_PersonRep, Scene3_PeoplePoints, 
  Scene4_MovieSpace, Scene5_MusicSpace, Scene6_ProductSpace, 
  Scene7_ImageSpace, Scene8_LanguageSpace, Scene9_SemanticGalaxy, 
  Scene10_ChatGPTReveal, Scene11_Unification, Scene12_MathReveal, 
  Scene13_InteractivePlayground, Scene14_FinalModel 
} from './scenes/Scenes';

const SCENES = [
  { component: Scene1_Curiosity, title: "Curiosity" },
  { component: Scene2_PersonRep, title: "Measurements to Numbers" },
  { component: Scene3_PeoplePoints, title: "People Become Locations" },
  { component: Scene4_MovieSpace, title: "Movie Space" },
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
];

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const totalScenes = SCENES.length;

  const navigateNext = () => {
    if (currentScene < totalScenes - 1) {
      setDirection(1);
      setCurrentScene(c => c + 1);
    }
  };

  const navigatePrev = () => {
    if (currentScene > 0) {
      setDirection(-1);
      setCurrentScene(c => c - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in search box or inputs
      if (
        document.activeElement?.tagName === 'INPUT' || 
        document.activeElement?.tagName === 'TEXTAREA'
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
  }, [currentScene]);

  // Touch Swipe Gesture Detectors
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    // Minimum swipe threshold (50px)
    if (diff > 50) {
      navigateNext();
      setTouchStart(null);
    } else if (diff < -50) {
      navigatePrev();
      setTouchStart(null);
    }
  };

  const jumpToScene = (idx: number) => {
    setDirection(idx > currentScene ? 1 : -1);
    setCurrentScene(idx);
  };

  const ActiveComponent = SCENES[currentScene].component;

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
          <div className="p-2 bg-vector/10 border border-vector/20 rounded-xl text-vector glow-vector">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-800 flex items-center gap-2">
              Everything Can Become a Point
            </h1>
            <p className="text-xs text-slate-500 font-bold">
              Chapter 1: The Secret Language of Modern AI
            </p>
          </div>
        </div>

        {/* Progress Tracker dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {SCENES.map((scene, idx) => {
            const isActive = idx === currentScene;
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

      {/* CORE STAGE */}
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-6 py-2 flex items-center justify-center z-10 overflow-hidden">
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentScene}
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
          <span className="text-vector">{(currentScene + 1).toString().padStart(2, '0')}</span>
          <span>/</span>
          <span>{totalScenes.toString().padStart(2, '0')}</span>
        </div>

        {/* Buttons navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={navigatePrev}
            disabled={currentScene === 0}
            className="flex items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          
          <button
            onClick={navigateNext}
            disabled={currentScene === totalScenes - 1}
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
