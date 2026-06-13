import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Menu, X, Check,
  ChevronDown, ChevronLeft, Presentation, Settings, Moon, Pen, Trash2, Terminal, Headphones
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
  hasSandbox?: boolean;
  SandboxComponent?: React.ComponentType<{ onClose: () => void }>;
  hasLiveAgent?: boolean;
  LiveAgentComponent?: React.ComponentType<{ onClose: () => void }>;
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
  hasSandbox = false,
  SandboxComponent,
  hasLiveAgent = false,
  LiveAgentComponent,
  onBack
}) => {
  const [activeChapterIdx, setActiveChapterIdx] = useState(() => {
    const saved = localStorage.getItem(`${courseName}_activeChapterIdx`);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [currentSceneIdx, setCurrentSceneIdx] = useState(() => {
    const saved = localStorage.getItem(`${courseName}_currentSceneIdx`);
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem(`${courseName}_activeChapterIdx`, activeChapterIdx.toString());
  }, [courseName, activeChapterIdx]);

  useEffect(() => {
    localStorage.setItem(`${courseName}_currentSceneIdx`, currentSceneIdx.toString());
  }, [courseName, currentSceneIdx]);

  const [direction, setDirection] = useState<1 | -1>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedChapterIdx, setExpandedChapterIdx] = useState<number | null>(0);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isLiveAgentOpen, setIsLiveAgentOpen] = useState(false);
  const [visitedScenes, setVisitedScenes] = useState<Set<string>>(new Set(['0-0']));
  const [isPenActive, setIsPenActive] = useState(false);
  const [penColor, setPenColor] = useState('#EF4444');
  const [penWidth] = useState(3.5);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = React.useRef(false);
  const lastPointRef = React.useRef<{ x: number; y: number } | null>(null);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getPenCursor = () => {
    const colorEncoded = penColor.replace('#', '%23');
    return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${colorEncoded}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 20h9'/><path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'/></svg>") 3 20, crosshair`;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCtx.drawImage(canvas, 0, 0);
    }
    
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    if (isPenActive) {
      const timer = setTimeout(resizeCanvas, 50);
      window.addEventListener('resize', resizeCanvas);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isPenActive]);

  useEffect(() => {
    clearCanvas();
  }, [activeChapterIdx, currentSceneIdx]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPenActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    lastPointRef.current = { x, y };
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !isPenActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    } else {
      ctx.moveTo(x, y);
    }
    ctx.lineTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.stroke();
    
    lastPointRef.current = { x, y };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  useEffect(() => {
    const key = `${activeChapterIdx}-${currentSceneIdx}`;
    setVisitedScenes(prev => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, [activeChapterIdx, currentSceneIdx]);

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

  const jumpToScene = (chapterIdx: number, sceneIdx: number) => {
    setDirection(chapterIdx > activeChapterIdx || (chapterIdx === activeChapterIdx && sceneIdx > currentSceneIdx) ? 1 : -1);
    setActiveChapterIdx(chapterIdx);
    setCurrentSceneIdx(sceneIdx);
    setIsSidebarOpen(false);
  };

  const selectChapter = (chapterIdx: number) => {
    setExpandedChapterIdx(prev => prev === chapterIdx ? null : chapterIdx);
  };


  const totalCourseScenes = chapters.reduce((acc, ch) => acc + ch.scenes.length, 0);
  const completedCourseScenes = visitedScenes.size;
  const overallProgressPercent = Math.round((completedCourseScenes / totalCourseScenes) * 100);

  const getChapterProgress = (chapterIdx: number) => {
    const total = chapters[chapterIdx].scenes.length;
    const completed = chapters[chapterIdx].scenes.filter((_, sIdx) => visitedScenes.has(`${chapterIdx}-${sIdx}`)).length;
    const percent = Math.round((completed / total) * 100);
    return { completed, total, percent };
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
        <div className="flex flex-col h-full items-center justify-between py-4 w-full">
          <button
            onClick={() => setIsSidebarCollapsed(false)}
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
            title="Open Menu"
          >
            <Menu size={20} />
          </button>
          <div />
        </div>
      );
    }

    return (
      <div className={`flex flex-col h-full overflow-hidden select-none w-full ${isMobile ? 'p-5' : 'p-4'}`}>
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 shrink-0">
          <div
            onClick={onBack}
            className="flex items-center gap-3 truncate cursor-pointer hover:opacity-80 transition-opacity"
            title="Back to courses"
          >
            <img src="/channel_icon.png" alt="Productive Bros" className="w-8 h-8 rounded shadow-sm border border-slate-200 bg-white" />
            <span className="font-extrabold text-base text-slate-800 tracking-tight truncate">{courseName}</span>
          </div>
          {isMobile ? (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          ) : (
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              title="Collapse Menu"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* Overall Course Progress Panel */}
        <div className="bg-slate-50 rounded-2xl p-3 mb-4 border border-slate-100 shrink-0">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-mono font-bold text-slate-700">{completedCourseScenes} / {totalCourseScenes} lessons</span>
            <span className="text-xs font-mono font-extrabold text-indigo-600">{overallProgressPercent}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-500 ease-out" 
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Chapters Accordion / Navigation tree */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
          {chapters.map((chapter, chIdx) => {
            const isActiveChapter = chIdx === activeChapterIdx;
            const isExpanded = expandedChapterIdx === chIdx;
            const theme = themes[chIdx] || DEFAULT_THEME;
            const { percent } = getChapterProgress(chIdx);

            return (
              <div key={chIdx} className="flex flex-col border border-slate-100 rounded-xl overflow-hidden bg-white shrink-0">
                {/* Chapter Row / Accordion Header */}
                <div
                  onClick={() => selectChapter(chIdx)}
                  className={`w-full text-left py-2.5 px-3 transition-all cursor-pointer flex items-center justify-between border-b ${
                    isActiveChapter
                      ? `${theme.bg} ${theme.border} text-slate-800`
                      : 'bg-slate-50/50 hover:bg-slate-50/80 text-slate-700 border-transparent'
                  }`}
                >
                  <div className="flex flex-col truncate pr-2">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider ${isActiveChapter ? theme.text : 'text-slate-400'}`}>
                      Chapter {chapter.id}
                    </span>
                    <span className="font-bold text-sm text-slate-800 truncate">{chapter.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {!isExpanded && (
                      <span className="text-xs font-mono font-bold text-slate-400">{percent}%</span>
                    )}
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </div>
                </div>

                {/* Scene list & Chapter Progress (only when expanded) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="flex flex-col gap-0.5 px-2 py-1.5">
                        {chapter.scenes.map((scene, scIdx) => {
                          const isActive = isActiveChapter && scIdx === currentSceneIdx;
                          const sceneKey = `${chIdx}-${scIdx}`;
                          const isVisited = visitedScenes.has(sceneKey);

                          return (
                            <button
                              key={scIdx}
                              onClick={() => jumpToScene(chIdx, scIdx)}
                              className={`w-full text-left px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-between group ${
                                isActive
                                  ? 'bg-slate-900 text-white shadow-sm font-bold'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate pr-2">
                                <span className={`text-[11px] font-mono shrink-0 ${isActive ? 'text-white/60' : 'text-slate-400'}`}>
                                  {String(scIdx + 1).padStart(2, '0')}
                                </span>
                                <span className="truncate">{scene.title}</span>
                              </div>

                              {/* Status indicators */}
                              <div className="shrink-0 flex items-center justify-center">
                                {isActive ? (
                                  <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-white" />
                                ) : isVisited ? (
                                  <div className="w-5 h-5 rounded-full bg-green-500/15 border border-green-500 flex items-center justify-center">
                                    <Check size={10} className="text-green-600 stroke-[3]" />
                                  </div>
                                ) : (
                                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
                                )}
                              </div>
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

        <div className="pt-4 border-t border-slate-100 mt-auto shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/channel_icon.png" alt="Productive Bros" className="w-7 h-7 rounded-lg shadow-sm border border-slate-200 bg-white" />
            <span className="text-xs font-extrabold tracking-wider uppercase text-slate-500 font-mono">Productive Bros</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              title="Settings"
            >
              <Settings size={18} />
            </button>
            <button
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
              title="Toggle Theme"
            >
              <Moon size={18} />
            </button>
          </div>
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
        animate={{ width: isSidebarCollapsed ? 88 : 380 }}
        transition={{ type: 'spring', damping: 22, stiffness: 150 }}
        className="hidden md:flex flex-col h-full bg-white border-r border-slate-200/80 shadow-md select-none shrink-0 overflow-hidden z-30"
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
              className="absolute top-0 bottom-0 left-0 w-[380px] bg-white/95 backdrop-blur border-r border-slate-200 z-50 shadow-2xl flex flex-col overflow-hidden md:hidden"
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
            {/* Mobile-only Menu toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all cursor-pointer active:scale-95 md:hidden"
              title="Open Menu"
            >
              <Menu size={20} />
            </button>
            
            <div className="hidden sm:flex items-center gap-3">
              <div className={`p-2 rounded-xl border transition-all ${currentTheme.bg} ${currentTheme.border} ${currentTheme.text} ${currentTheme.glow}`}>
                <BookOpen size={20} />
              </div>
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-extrabold tracking-tight text-slate-800 line-clamp-1">
                {activeChapter?.title}
              </h1>
              <p className="hidden md:block text-xs text-slate-500 font-bold">
                {activeChapter?.subtitle}
              </p>
            </div>
          </div>

          {/* Progress Tracker dots & Whiteboard Button */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {activeChapter?.scenes.map((scene, idx) => {
                const isActive = idx === currentSceneIdx;
                const theme = themes[activeChapterIdx] || DEFAULT_THEME;
                return (
                  <button
                    key={idx}
                    onClick={() => jumpToScene(activeChapterIdx, idx)}
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

            <div className="flex items-center gap-2">
              {/* Pen / Inline Drawing Toggle */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setIsPenActive(!isPenActive)}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer active:scale-95 flex items-center justify-center ${
                    isPenActive 
                      ? 'bg-slate-900 text-white shadow' 
                      : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                  title="Draw on screen"
                >
                  <Pen size={16} />
                </button>
                
                {isPenActive && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex items-center gap-1 overflow-hidden pl-1 pr-0.5 border-l border-slate-200/85 ml-1 shrink-0"
                    >
                      {[
                        { color: '#EF4444', name: 'Red' },
                        { color: '#3B82F6', name: 'Blue' },
                        { color: '#10B981', name: 'Green' },
                        { color: '#F59E0B', name: 'Orange' },
                        { color: '#000000', name: 'Black' }
                      ].map((c) => (
                        <button
                          key={c.color}
                          onClick={() => setPenColor(c.color)}
                          className={`w-4 h-4 rounded-full border transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                            penColor === c.color 
                              ? 'border-slate-800 ring-2 ring-indigo-500/50' 
                              : 'border-slate-300'
                          }`}
                          style={{ backgroundColor: c.color }}
                          title={`Select ${c.name} Pen`}
                        />
                      ))}
                      
                      {/* Clear Canvas button */}
                      <button
                        onClick={clearCanvas}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-red-500 transition-colors ml-1 cursor-pointer"
                        title="Clear Sketch"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {hasWhiteboard && (
                <button
                  onClick={() => setIsWhiteboardOpen(true)}
                  className="p-2.5 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all cursor-pointer active:scale-95 flex items-center justify-center"
                  title="Open Whiteboard"
                >
                  <Presentation size={16} className={currentTheme.text} />
                </button>
              )}

              {hasSandbox && (
                <button
                  onClick={() => setIsSandboxOpen(true)}
                  className="p-2.5 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all cursor-pointer active:scale-95 flex items-center justify-center"
                  title="Open Python Sandbox"
                >
                  <Terminal size={16} className={currentTheme.text} />
                </button>
              )}

              {hasLiveAgent && (
                <button
                  onClick={() => setIsLiveAgentOpen(true)}
                  className="p-2.5 hover:bg-slate-105 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-600 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
                  title="Open Live Marathi AI Tutor"
                >
                  <Headphones size={16} />
                  <span className="text-xs font-bold hidden sm:inline">AI Tutor</span>
                </button>
              )}
            </div>
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
                className="w-full h-full flex items-start justify-center overflow-y-auto overflow-x-hidden scrollbar-none"
              >
                {ActiveComponent && <ActiveComponent />}
              </motion.div>
            </AnimatePresence>

            {/* Drawing Canvas Overlay */}
            {isPenActive && (
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="absolute inset-0 w-full h-full z-30 touch-none"
                style={{ cursor: getPenCursor() }}
              />
            )}
          </div>
        </main>

        {/* FOOTER CONTROLS BAR */}
        <footer className="w-full px-6 py-2 flex items-center justify-between border-t border-slate-200/80 bg-white/70 backdrop-blur z-20 shadow-sm shrink-0">
          {/* Branding */}
          <div
            onClick={onBack}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            title="Back to Landing Page"
          >
            <img src="/channel_icon.png" alt="Productive Bros" className="w-7 h-7 rounded-lg shadow-sm border border-slate-200 bg-white" />
            <span className="font-extrabold text-xs tracking-wider uppercase text-slate-600 font-mono">
              Productive Bros
            </span>
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
              className="flex items-center justify-center p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            
            <button
              onClick={navigateNext}
              disabled={activeChapterIdx === chapters.length - 1 && currentSceneIdx === totalScenes - 1}
              className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-xl text-white transition-all font-bold disabled:opacity-30 disabled:pointer-events-none shadow cursor-pointer ${currentTheme.bgActive} ${currentTheme.glow}`}
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

      {/* Sandbox Overlay */}
      {hasSandbox && SandboxComponent && (
        <AnimatePresence>
          {isSandboxOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-50"
            >
              <SandboxComponent 
                onClose={() => setIsSandboxOpen(false)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Live Agent Overlay */}
      {hasLiveAgent && LiveAgentComponent && (
        <AnimatePresence>
          {isLiveAgentOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-50"
            >
              <LiveAgentComponent 
                onClose={() => setIsLiveAgentOpen(false)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
