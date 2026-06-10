import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSlideState } from '../../components/CourseStateContext';

const EXAMPLES = [
  {
    id: 'image',
    emoji: '🖼️',
    title: 'Image Matrix',
    rows: 'Pixels (rows)',
    cols: 'Color Channels',
    dims: '1024 × 3',
    dimRows: 1024,
    dimCols: 3,
    color: '#6366f1',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    accent: 'bg-violet-500',
    description: 'Each row is one pixel. Each column is R, G, or B. Way more rows than columns.',
  },
  {
    id: 'recommender',
    emoji: '🎬',
    title: 'Recommender Matrix',
    rows: 'Users (rows)',
    cols: 'Movies (cols)',
    dims: '50M × 10K',
    dimRows: 50000000,
    dimCols: 10000,
    color: '#0ea5e9',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-700',
    accent: 'bg-sky-500',
    description: '50 million users, 10 thousand movies. Massively non-square. Netflix lives here.',
  },
  {
    id: 'text',
    emoji: '📄',
    title: 'Text Matrix',
    rows: 'Words (rows)',
    cols: 'Documents (cols)',
    dims: '100K × 5K',
    dimRows: 100000,
    dimCols: 5000,
    color: '#10b981',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    accent: 'bg-emerald-500',
    description: 'Each row is a word, each column is a document. How often does word X appear in doc Y?',
  },
];

// Miniature rectangle to represent the matrix shape
const ShapeRect: React.FC<{ rows: number; cols: number; color: string }> = ({ rows, cols, color }) => {
  // Normalize to a nice visual size
  const maxDim = 80;
  const ratio = cols / rows;
  const w = ratio >= 1 ? maxDim : Math.max(18, maxDim * ratio);
  const h = ratio >= 1 ? Math.max(18, maxDim / ratio) : maxDim;

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        width: w,
        height: h,
        backgroundColor: color,
        opacity: 0.18,
        borderRadius: 6,
        border: `2px solid ${color}`,
      }}
    />
  );
};

export const Scene6_3_RealWorldNonSquare: React.FC = () => {
  const [activeIdx, setActiveIdx] = useSlideState<number>('ch6_realworld_active', 0);
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-cycle examples
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % EXAMPLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [autoPlay, setActiveIdx]);

  const active = EXAMPLES[activeIdx];

  // Build a small pixel-art-style grid for the active example
  const gridRows = 7;
  const gridCols = active.id === 'image' ? 3 : active.id === 'recommender' ? 6 : 5;
  const cellPx = active.id === 'image' ? 22 : 16;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: Animated matrix visualization */}
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          className="text-slate-400 text-xs font-mono uppercase tracking-widest"
        >
          Real-World Data Shapes
        </motion.p>

        {/* Selector tabs */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 flex-wrap justify-center"
          >
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => {
                  setActiveIdx(i);
                  setAutoPlay(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  activeIdx === i
                    ? `${ex.accent} text-white border-transparent shadow-md`
                    : `bg-white text-slate-600 border-slate-200 hover:border-slate-300`
                }`}
              >
                {ex.emoji} {ex.title}
              </button>
            ))}
          </motion.div>
        )}

        {/* Main visual card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-sm ${active.bg} border ${active.border} rounded-2xl p-5 shadow-sm`}
          >
            {/* Dimension label */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{active.emoji}</span>
              <div className="text-right">
                <p className={`text-2xl font-black ${active.text}`}>{active.dims}</p>
                <p className="text-slate-400 text-xs">{active.rows} × {active.cols}</p>
              </div>
            </div>

            {/* Mini grid + shape comparison */}
            <div className="flex gap-5 items-end justify-center">
              {/* Pixel grid */}
              <div>
                <p className="text-xs text-slate-400 mb-1.5 text-center">sample rows</p>
                <svg
                  width={gridCols * cellPx + (gridCols - 1) * 3}
                  height={gridRows * cellPx + (gridRows - 1) * 3}
                >
                  {Array.from({ length: gridRows }).map((_, r) =>
                    Array.from({ length: gridCols }).map((_, c) => (
                      <motion.rect
                        key={`${r}-${c}`}
                        x={c * (cellPx + 3)}
                        y={r * (cellPx + 3)}
                        width={cellPx}
                        height={cellPx}
                        rx={2}
                        fill={active.color}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.12 + ((r * gridCols + c) % 7) * 0.1 }}
                        transition={{ delay: (r * gridCols + c) * 0.02, duration: 0.3 }}
                      />
                    ))
                  )}
                </svg>
                <p className="text-xs text-slate-400 mt-1 text-center">
                  {gridRows} shown of millions
                </p>
              </div>

              {/* Proportional shape */}
              <div className="flex flex-col items-center gap-1">
                <p className="text-xs text-slate-400 mb-1 text-center">actual shape</p>
                <ShapeRect rows={active.dimRows} cols={active.dimCols} color={active.color} />
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  {active.dimRows > active.dimCols ? 'Tall rectangle' : 'Wide rectangle'}
                </p>
              </div>
            </div>

            {/* NOT square badge */}
            <div className="flex justify-center mt-3">
              <span className="px-3 py-1 bg-rose-100 border border-rose-300 rounded-full text-rose-700 text-xs font-bold">
                NOT square — eigenvalues can't help
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-2">
          {EXAMPLES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIdx(i); setAutoPlay(false); }}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIdx === i ? 'bg-sky-500 scale-125' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: Explanation */}
      <div className="flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sky-500 text-xs font-mono uppercase tracking-widest mb-1">Chapter 6 · SVD</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
            Non-Square is Everywhere
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          className="text-slate-600 text-sm leading-relaxed"
        >
          The most important data in AI isn't square. It's always some{' '}
          <span className="font-bold text-slate-800">tall or wide rectangle</span> — never a perfect grid.
        </motion.p>

        {/* Example cards */}
        <div className="flex flex-col gap-2">
          {EXAMPLES.map((ex, i) => (
            <AnimatePresence key={ex.id}>
              {step >= 2 && (
                <motion.button
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  onClick={() => { setActiveIdx(i); setAutoPlay(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all ${
                    activeIdx === i
                      ? `${ex.bg} ${ex.border} shadow-sm`
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-base">{ex.emoji}</span>
                    <span className={`text-xs font-bold ${activeIdx === i ? ex.text : 'text-slate-700'}`}>
                      {ex.title}
                    </span>
                    <span className="ml-auto text-xs font-mono text-slate-400">{ex.dims}</span>
                  </div>
                  {activeIdx === i && (
                    <p className={`text-xs ${ex.text} opacity-80 pl-6`}>{ex.description}</p>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          ))}
        </div>

        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-sky-500 to-cyan-400 rounded-xl px-4 py-3 text-white shadow-md"
            >
              <p className="text-sm font-bold">None of these are square.</p>
              <p className="text-xs mt-1 opacity-90">
                Eigenvalues can't touch them.{' '}
                <span className="font-bold underline">SVD can.</span>
              </p>
              <p className="text-xs mt-2 opacity-80 italic">
                And these are exactly the matrices AI cares about most.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
