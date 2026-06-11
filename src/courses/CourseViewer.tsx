import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, HelpCircle, Menu, X,
  ChevronDown, ChevronRight, ChevronLeft, Edit3, Home
} from 'lucide-react';

export interface Scene {
  title: string;
  component: React.ComponentType<any>;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  scenes: Scene[];
}

export interface ChapterTheme {
  id: number;
  primary: string;
  text: string;
  bg: string;
  border: string;
  glow: string;
  dotBg: string;
  bgActive: string;
  hover: string;
}

interface CourseViewerProps {
  courseName: string;
  chapters: Chapter[];
  themes?: ChapterTheme[];
  hasWhiteboard?: boolean;
  WhiteboardComponent?: React.ComponentType<{ onClose: () => void; activeChapterIdx: number }>;
  onBack: () => void;
}

const DEFAULT_THEME: ChapterTheme = {
  id: 1,
  primary: 'sky-600',
  text: 'text-sky-600',
  bg: 'bg-sky-50',
  border: 'border-sky-200',
  glow: 'filter drop-shadow(0 0 10px rgba(2, 132, 199, 0.2))',
  dotBg: 'bg-sky-600',
  bgActive: 'bg-sky-600 hover:bg-sky-500',
  hover: 'hover:bg-sky-50 hover:text-sky-600'
};

export const CourseViewer: React.FC<CourseViewerProps> = ({
  courseName,
  chapters,
  themes = [],
  hasWhiteboard = false,
  WhiteboardComponent,
  onBack
}) => {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedChapterIdx, setExpandedChapterIdx] = useState<number | null>(0);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);

  const activeChapter = chapters[activeChapterIdx] || chapters[0];
  const activeScene = activeChapter?.scenes[currentSceneIdx] || activeChapter?.scenes[0];
  const totalScenes = activeChapter?.scenes.length || 0;

  const currentTheme = themes[activeChapterIdx] || DEFAULT_THEME;

  const navigateNext = () => {
    if (currentSceneIdx < totalScenes - 1) {
      setDirection(1);
      setCurrentSceneIdx(c => c + 1);
    } else if (activeChapterIdx < chapters.length - 1) {
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
      setCurrentSceneIdx(chapters[prevChapterIdx].scenes.length - 1);
      setExpandedChapterIdx(prevChapterIdx);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' || 
        document.activeElement?.tagName === 'TEXTAREA' ||
        isSidebarOpen ||
        isWhiteboardOpen
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
  }, [currentSceneIdx, activeChapterIdx, isSidebarOpen, isWhiteboardOpen, totalScenes]);

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
  };

  const selectChapter = (chapterIdx: number) => {
    setDirection(chapterIdx > activeChapterIdx ? 1 : -1);
    setActiveChapterIdx(chapterIdx);
    setCurrentSceneIdx(0);
    setExpandedChapterIdx(chapterIdx);
  };

  const toggleChapterExpanded = (chapterIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedChapterIdx(prev => prev === chapterIdx ? null : chapterIdx);
  };

  const ActiveComponent = activeScene?.component;

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
    if (isCollapsed) {
      return (
        <div className="flex flex-col h-full items-center justify-between py-2">
          <button
            onClick={onBack}
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
            title="Back to Landing Page"
          >
            <Home size={20} />
          </button>
          <button
            onClick={() => setIsSidebarCollapsed(false)}
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
            title="Open Menu"
          >
            <ChevronRight size={20} />
          </button>
          <div />
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full overflow-hidden select-none">
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer mr-1"
              title="Back to courses"
            >
              <Home size={16} />
            </button>
            <div className={`p-1.5 rounded-lg transition-colors ${currentTheme.bg} ${currentTheme.text}`}>
              <BookOpen size={16} />
            </div>
            <span className="font-extrabold text-sm text-slate-800 tracking-tight truncate">{courseName}</span>
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
          {chapters.map((chapter, chIdx) => {
            const isActiveChapter = chIdx === activeChapterIdx;
            const isExpanded = expandedChapterIdx === chIdx;
            const theme = themes[chIdx] || DEFAULT_THEME;

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
          <span className="text-[10px] text-slate-400 font-mono font-bold">{courseName} v1.0</span>
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
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="relative flex flex-row w-full h-screen max-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden font-sans space-grid-pattern-fine animate-fade-in"
    >
      {/* Background soft atmosphere */}
      <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 filter blur-[120px] pointer-events-none ${currentTheme.primary === 'vector' ? 'bg-vector/5' : 'bg-slate-500/5'}`} />

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

            <button
              onClick={onBack}
              className="flex items-center justify-center p-2 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all cursor-pointer active:scale-95"
              title="Back to Landing Page"
            >
              <Home size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl border transition-all ${currentTheme.bg} ${currentTheme.border} ${currentTheme.text} ${currentTheme.glow}`}>
                <BookOpen size={20} />
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-slate-800 flex items-center gap-2">
                  {activeChapter?.title}
                </h1>
                <p className="text-xs text-slate-500 font-bold">
                  {activeChapter?.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Tracker dots & Whiteboard Button */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {activeChapter?.scenes.map((scene, idx) => {
                const isActive = idx === currentSceneIdx;
                const theme = themes[activeChapterIdx] || DEFAULT_THEME;
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

            {hasWhiteboard && (
              <button
                onClick={() => setIsWhiteboardOpen(true)}
                className="p-2 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                title="Open Whiteboard"
              >
                <Edit3 size={16} className={currentTheme.text} />
                <span className="hidden sm:inline text-xs font-extrabold text-slate-700">Whiteboard</span>
              </button>
            )}
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
                {ActiveComponent && <ActiveComponent />}
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
            <span className={currentTheme.text}>{(currentSceneIdx + 1).toString().padStart(2, '0')}</span>
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
              disabled={activeChapterIdx === chapters.length - 1 && currentSceneIdx === totalScenes - 1}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white transition-all font-bold disabled:opacity-30 disabled:pointer-events-none shadow cursor-pointer ${currentTheme.bgActive} ${currentTheme.glow}`}
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </footer>
      </div>
      
      {/* Whiteboard Overlay */}
      {hasWhiteboard && WhiteboardComponent && (
        <AnimatePresence>
          {isWhiteboardOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-50"
            >
              <WhiteboardComponent 
                onClose={() => setIsWhiteboardOpen(false)} 
                activeChapterIdx={activeChapterIdx}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
