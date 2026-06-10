import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene6_2_TheSquareProblem: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Render a matrix grid visualization
  const MatrixGrid: React.FC<{
    rows: number;
    cols: number;
    color: string;
    label: string;
    sublabel: string;
    ok: boolean;
    delay?: number;
  }> = ({ rows, cols, color, label, sublabel, ok, delay = 0 }) => {
    const cellSize = 18;
    const gap = 3;
    const totalW = cols * cellSize + (cols - 1) * gap;
    const totalH = rows * cellSize + (rows - 1) * gap;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        {/* Grid SVG */}
        <div className="relative">
          <svg width={totalW + 12} height={totalH + 12} viewBox={`-6 -6 ${totalW + 12} ${totalH + 12}`}>
            {Array.from({ length: rows }).map((_, r) =>
              Array.from({ length: cols }).map((_, c) => (
                <motion.rect
                  key={`${r}-${c}`}
                  x={c * (cellSize + gap)}
                  y={r * (cellSize + gap)}
                  width={cellSize}
                  height={cellSize}
                  rx={3}
                  fill={color}
                  opacity={0.15 + (r + c) * 0.04}
                  stroke={color}
                  strokeWidth={1.2}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.15 + (r + c) * 0.04 }}
                  transition={{ delay: delay + r * 0.07 + c * 0.05, duration: 0.3 }}
                />
              ))
            )}
            {/* Dimension labels */}
            <text
              x={totalW / 2}
              y={totalH + 10}
              textAnchor="middle"
              fontSize={9}
              fill={color}
              fontWeight="600"
            >
              {cols}
            </text>
            <text
              x={totalW + 8}
              y={totalH / 2}
              textAnchor="middle"
              fontSize={9}
              fill={color}
              fontWeight="600"
            >
              {rows}
            </text>
          </svg>

          {/* OK/FAIL badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.4, type: 'spring', stiffness: 260 }}
            className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-black shadow-md ${
              ok ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
          >
            {ok ? '✓' : '✗'}
          </motion.div>
        </div>

        {/* Label */}
        <div className="text-center">
          <p className={`text-sm font-bold ${ok ? 'text-emerald-700' : 'text-rose-700'}`}>{label}</p>
          <p className="text-xs text-slate-500">{sublabel}</p>
        </div>

        {/* Pulsing glow for the failing case */}
        {!ok && (
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-semibold text-rose-500 px-3 py-1 bg-rose-50 border border-rose-200 rounded-full"
          >
            Eigenvalues BREAK here
          </motion.div>
        )}
        {ok && (
          <div className="text-xs font-semibold text-emerald-600 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
            Eigenvalues work here
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: Matrix shape visualizations */}
      <div className="flex flex-col items-center justify-center gap-8 h-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          className="text-slate-400 text-xs font-mono uppercase tracking-widest"
        >
          Matrix Shapes
        </motion.p>

        <div className="flex gap-16 items-start justify-center flex-wrap">
          {step >= 1 && (
            <MatrixGrid
              rows={3}
              cols={3}
              color="#10b981"
              label="Square Matrix (3×3)"
              sublabel="Same rows and columns"
              ok={true}
              delay={0.1}
            />
          )}

          {step >= 2 && (
            <MatrixGrid
              rows={3}
              cols={2}
              color="#f43f5e"
              label="Non-Square Matrix (3×2)"
              sublabel="Different rows and columns"
              ok={false}
              delay={0.1}
            />
          )}
        </div>

        {/* Why it fails — visual arrows */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl px-6 py-4 max-w-sm shadow-sm"
          >
            <p className="text-slate-600 text-xs font-semibold mb-2 text-center uppercase tracking-wide">
              Why eigenvalues need square matrices
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="px-3 py-1.5 bg-sky-50 border border-sky-200 rounded-lg text-sky-700 text-xs font-bold">
                A · v
              </div>
              <span className="text-slate-400 text-sm">=</span>
              <div className="px-3 py-1.5 bg-violet-50 border border-violet-200 rounded-lg text-violet-700 text-xs font-bold">
                λ · v
              </div>
            </div>
            <p className="text-slate-500 text-xs mt-2 text-center">
              Both sides must be the <span className="font-bold text-slate-700">same size</span>.
              <br />
              A non-square matrix changes the dimension!
            </p>
          </motion.div>
        )}
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
            The Square Problem
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          className="text-slate-600 text-sm leading-relaxed"
        >
          In Chapter 5, we found special directions called{' '}
          <span className="font-bold text-slate-800">eigenvectors</span> for square matrices. They
          were the directions a matrix doesn't rotate — only stretches.
        </motion.p>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3"
            >
              <p className="text-rose-800 text-sm font-bold mb-1">But real-world data is rarely square.</p>
              <ul className="text-rose-700 text-xs space-y-1">
                <li>• Images: pixels × color channels</li>
                <li>• Ratings: users × movies</li>
                <li>• Text: words × documents</li>
              </ul>
              <p className="text-rose-600 text-xs mt-2 font-medium">
                None of these are square. Eigenvalues can't help.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3"
            >
              <p className="text-sky-800 text-sm font-semibold mb-2">
                The eigenvalue equation requires:
              </p>
              <div className="flex justify-center py-1">
                <KaTeXMath tex="A\mathbf{v} = \lambda \mathbf{v}" block />
              </div>
              <p className="text-sky-700 text-xs mt-1">
                For this to work, <strong>Av</strong> must live in the same space as{' '}
                <strong>v</strong>. A non-square matrix maps vectors to a{' '}
                <em>different-sized</em> space. Equation fails.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-sky-500 to-cyan-400 rounded-xl px-4 py-3 text-white shadow-lg"
            >
              <p className="text-sm font-bold">We need a new tool.</p>
              <p className="text-xs mt-1 opacity-90">
                Something that handles <em>any</em> shape — tall, wide, square — and still reveals
                the hidden structure inside.
              </p>
              <p className="text-white font-black text-base mt-2">
                That tool is SVD.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
