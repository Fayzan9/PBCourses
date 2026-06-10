import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { useSlideState } from '../../components/CourseStateContext';

const CASES = [
  {
    label: 'Full Rank',
    sigmas: [4, 2, 1],
    rank: 3,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dotBg: 'bg-emerald-400',
    desc: 'All 3 directions survive',
  },
  {
    label: 'Rank 1',
    sigmas: [4, 0, 0],
    rank: 1,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dotBg: 'bg-amber-400',
    desc: 'Only 1 direction survives',
  },
  {
    label: 'Rank Deficient',
    sigmas: [4, 2, 0],
    rank: 2,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    dotBg: 'bg-sky-400',
    desc: '2 of 3 directions survive',
  },
];

const BlobAnimation: React.FC<{ caseIdx: number; step: number }> = ({ caseIdx, step }) => {
  const currentCase = CASES[caseIdx];
  const isFlat = currentCase.rank < 3;
  const isLine = currentCase.rank < 2;

  // Generate random-ish but deterministic dots
  const dots = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const r = 0.5 + ((i * 7 + 13) % 10) / 25;
      arr.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        z: (((i * 3 + 5) % 10) / 10 - 0.5) * 0.8,
      });
    }
    return arr;
  }, []);

  const svgW = 220;
  const svgH = 180;
  const cx = svgW / 2;
  const cy = svgH / 2;
  const scale = 55;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
      {/* Before (faint) */}
      {dots.map((d, i) => (
        <circle
          key={`before-${i}`}
          cx={cx + d.x * scale + d.z * scale * 0.4}
          cy={cy + d.y * scale - d.z * scale * 0.25}
          r={2.5}
          fill="rgb(148,163,184)"
          opacity={step >= 2 ? 0.15 : 0.5}
        />
      ))}

      {/* After transform — animated */}
      {step >= 2 &&
        dots.map((d, i) => {
          const targetX = cx + d.x * scale * (isLine ? 0 : 1) + (isLine ? 0 : d.z * scale * 0.4);
          const targetY = cy + d.y * scale * (isFlat && !isLine ? 0.15 : isLine ? 0 : 1) - (isFlat ? 0 : d.z * scale * 0.25);
          const sourceX = cx + d.x * scale + d.z * scale * 0.4;
          const sourceY = cy + d.y * scale - d.z * scale * 0.25;
          return (
            <motion.circle
              key={`after-${i}`}
              initial={{ cx: sourceX, cy: sourceY }}
              animate={{ cx: targetX, cy: targetY }}
              transition={{ duration: 0.8, delay: i * 0.012, ease: 'easeInOut' }}
              r={2.5}
              fill={
                currentCase.rank === 3
                  ? '#34d399'
                  : currentCase.rank === 1
                  ? '#fbbf24'
                  : '#38bdf8'
              }
              opacity={0.8}
            />
          );
        })}

      {/* Arrow showing collapse */}
      {step >= 2 && isFlat && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <line x1={cx} y1={cy - 65} x2={cx} y2={cy + 65} stroke="#ef4444" strokeWidth={2} strokeDasharray="4,3" opacity={0.6} />
          <text x={cx + 6} y={cy - 50} fill="#ef4444" fontSize="9" fontWeight="bold">
            crushed
          </text>
        </motion.g>
      )}

      {/* Label */}
      <text x={cx} y={svgH - 8} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
        {step < 2 ? 'Before transform' : `Rank ${currentCase.rank} output`}
      </text>
    </svg>
  );
};

export const Scene6_10_RankAndSingularValues: React.FC = () => {
  const [step, setStep] = useState(0);
  const [activeCase, setActiveCase] = useSlideState<number>('ch6_rank_case', 2);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const current = CASES[activeCase];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT */}
      <div className="flex flex-col gap-4">
        {/* Sigma matrix display */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
          >
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-3">Σ Matrix</p>
            <div className="flex items-center gap-4">
              {/* Matrix brackets */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 border-l-2 border-t-2 border-b-2 border-slate-400 rounded-l-sm" />
                <div className="absolute right-0 top-0 bottom-0 w-1 border-r-2 border-t-2 border-b-2 border-slate-400 rounded-r-sm" />
                <div className="px-5 py-2 grid grid-cols-3 gap-3 text-center font-mono text-sm">
                  {current.sigmas.map((s, ri) =>
                    [0, 1, 2].map((ci) => {
                      const val = ri === ci ? s : 0;
                      const isZero = val === 0;
                      const isDiag = ri === ci;
                      return (
                        <motion.span
                          key={`${ri}-${ci}`}
                          animate={{
                            color: isZero && isDiag ? '#ef4444' : isDiag ? '#0ea5e9' : '#cbd5e1',
                            fontWeight: isDiag ? 700 : 400,
                          }}
                          transition={{ duration: 0.4 }}
                          className="w-7 text-center"
                        >
                          {val}
                        </motion.span>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-400" />
                  <span className="text-slate-500">Non-zero = direction survives</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="text-slate-500">Zero = direction crushed</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Case selector */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex gap-2"
          >
            {CASES.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setActiveCase(i)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                  activeCase === i
                    ? `${c.bg} ${c.color} ${c.border} shadow-sm`
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Blob animation */}
        {step >= 2 && (
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-50 rounded-xl p-4 border border-slate-200"
          >
            <BlobAnimation caseIdx={activeCase} step={step} />
            <div className="flex items-center justify-center gap-2 mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeCase}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={`text-sm font-bold ${current.color}`}
                >
                  {current.desc}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sky-500 text-xs font-mono uppercase tracking-widest font-bold mb-1">
            Chapter 6 · SVD
          </p>
          <h1 className="text-2xl font-black text-slate-800 leading-tight">
            Rank = Non-Zero<br />
            <span className="text-sky-500">Singular Values</span>
          </h1>
        </motion.div>

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 rounded-xl p-4 border border-slate-200"
          >
            <p className="text-slate-700 text-sm leading-relaxed">
              The <strong>rank</strong> tells you how many directions survive the transformation.
            </p>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              If σ = 0, that direction gets <span className="text-red-500 font-semibold">crushed to nothing.</span>
            </p>
            <p className="text-slate-700 text-sm mt-2 leading-relaxed font-semibold">
              Count the non-zero σᵢ values → that's the rank.
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
          >
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">The Rule</p>
            <KaTeXMath tex="\text{rank}(A) = \text{number of nonzero } \sigma_i" block />
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-sky-50 rounded-xl p-4 border border-sky-200"
          >
            <p className="text-sky-700 text-sm leading-relaxed">
              A low-rank matrix is like a camera that can only focus in 2 directions.
            </p>
            <p className="text-sky-600 text-sm mt-2 font-semibold leading-relaxed">
              Some information is just... gone.
            </p>
            <p className="text-slate-500 text-xs mt-2 italic">
              Try the 3 cases on the left — watch how the dot cloud collapses.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
