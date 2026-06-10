import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { useSlideState } from '../../components/CourseStateContext';

// A simple 4×4 "matrix" to visualize
const ORIGINAL_MATRIX = [
  [8, 6, 4, 2],
  [6, 5, 3, 2],
  [4, 3, 7, 5],
  [2, 2, 5, 9],
];

// Precomputed "rank-k layers" as outer products (scaled to look like SVD layers)
// These are simplified but visually illustrative
const LAYERS = [
  {
    sigma: 20.1,
    outer: [
      [5.0, 3.9, 3.2, 2.5],
      [3.9, 3.0, 2.5, 1.9],
      [3.2, 2.5, 4.5, 3.5],
      [2.5, 1.9, 3.5, 5.5],
    ],
  },
  {
    sigma: 5.3,
    outer: [
      [1.5, 1.2, 0.5, -0.2],
      [1.2, 1.0, 0.3, -0.3],
      [0.5, 0.3, 1.8, 1.2],
      [-0.2, -0.3, 1.2, 2.0],
    ],
  },
  {
    sigma: 2.8,
    outer: [
      [0.9, 0.6, 0.2, -0.1],
      [0.6, 0.7, -0.1, -0.2],
      [0.2, -0.1, 0.5, 0.3],
      [-0.1, -0.2, 0.3, 0.8],
    ],
  },
  {
    sigma: 1.1,
    outer: [
      [0.6, 0.3, 0.1, -0.2],
      [0.3, 0.3, 0.2, 0.3],
      [0.1, 0.2, 0.2, 0.2],
      [-0.2, 0.3, 0.2, 1.2],
    ],
  },
];

function approximateMatrix(rank: number): number[][] {
  const result = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let k = 0; k < rank; k++) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result[i][j] += LAYERS[k].outer[i][j];
      }
    }
  }
  return result;
}

function colorFromValue(val: number, isOriginal = false): string {
  const clamped = Math.max(0, Math.min(9, val));
  const t = clamped / 9;
  if (isOriginal) {
    const g = Math.round(200 * t + 55);
    return `rgb(${Math.round(220 - 180 * t)}, ${g}, ${Math.round(240 - 200 * t)})`;
  }
  // sky blue gradient
  const r = Math.round(255 - 200 * t);
  const g = Math.round(255 - 100 * t);
  const b = Math.round(255);
  return `rgb(${r}, ${g}, ${b})`;
}

const MatrixGrid: React.FC<{
  matrix: number[][];
  label: string;
  isApprox?: boolean;
  rank?: number;
}> = ({ matrix, label, isApprox = false, rank }) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="grid grid-cols-4 gap-1">
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <motion.div
              key={`${i}-${j}`}
              animate={{ backgroundColor: colorFromValue(val, !isApprox) }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded flex items-center justify-center text-xs font-bold text-slate-700 shadow-sm"
              style={{ backgroundColor: colorFromValue(val, !isApprox) }}
            >
              {Math.max(0, Math.round(val * 10) / 10).toFixed(1)}
            </motion.div>
          ))
        )}
      </div>
      {isApprox && rank !== undefined && (
        <p className="text-xs text-sky-600 font-semibold">Rank-{rank} approx</p>
      )}
    </div>
  );
};

const LayerStack: React.FC<{ rank: number }> = ({ rank }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">SVD Layers</p>
      {LAYERS.map((layer, k) => {
        const included = k < rank;
        return (
          <motion.div
            key={k}
            animate={{
              opacity: included ? 1 : 0.3,
              scale: included ? 1 : 0.97,
            }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
              included
                ? 'bg-sky-50 border-sky-200 text-sky-700'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <span className={`font-mono font-bold text-sm ${included ? 'text-sky-500' : 'text-slate-300'}`}>
              σ{k + 1} = {layer.sigma}
            </span>
            <span className="flex-1">
              {included ? `✓ Layer ${k + 1} included` : `Layer ${k + 1} skipped`}
            </span>
            <div
              className={`w-2 h-2 rounded-full ${
                included ? 'bg-sky-400' : 'bg-slate-300'
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export const Scene6_11_LowRankIdea: React.FC = () => {
  const [step, setStep] = useState(0);
  const [rank, setRank] = useSlideState<number>('ch6_rank_approx', 1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const approxMatrix = useMemo(() => approximateMatrix(rank), [rank]);

  const totalSigma = LAYERS.reduce((s, l) => s + l.sigma * l.sigma, 0);
  const kSigma = LAYERS.slice(0, rank).reduce((s, l) => s + l.sigma * l.sigma, 0);
  const varianceExplained = Math.round((kSigma / totalSigma) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT */}
      <div className="flex flex-col gap-4">
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-6 bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
          >
            <MatrixGrid matrix={ORIGINAL_MATRIX} label="Original" />
            <div className="flex flex-col items-center justify-center pt-8">
              <span className="text-slate-300 text-3xl font-thin">≈</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={rank}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <MatrixGrid matrix={approxMatrix} label="Approximation" isApprox rank={rank} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <LayerStack rank={rank} />
          </motion.div>
        )}

        {/* Variance bar */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-slate-50 rounded-xl p-3 border border-slate-200"
          >
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-medium">Information captured</span>
              <motion.span
                key={varianceExplained}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-sky-600 font-bold"
              >
                {varianceExplained}%
              </motion.span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${varianceExplained}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full"
              />
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
            Keep Only<br />
            <span className="text-sky-500">What Matters</span>
          </h1>
        </motion.div>

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
          >
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Rank k</p>
            <input
              type="range"
              min={1}
              max={4}
              value={rank}
              onChange={(e) => setRank(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1</span>
              <span className="text-sky-600 font-bold">k = {rank}</span>
              <span>4</span>
            </div>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 rounded-xl p-4 border border-slate-200"
          >
            <p className="text-slate-700 text-sm leading-relaxed">
              You don't need ALL the singular values.
            </p>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              The first few (the biggest ones) capture most of the important structure.
            </p>
            <p className="text-sky-600 text-sm mt-2 font-semibold leading-relaxed">
              The small ones? Mostly noise. Throw them away.
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
          >
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">The Formula</p>
            <KaTeXMath tex="\hat{A}_k = \sum_{i=1}^{k} \sigma_i \mathbf{u}_i \mathbf{v}_i^T" block />
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl p-4 text-white shadow-md"
          >
            <p className="text-sm font-bold leading-relaxed">
              Compression through low-rank approximation.
            </p>
            <p className="text-sky-100 text-xs mt-1 leading-relaxed">
              This is the most important idea in SVD. Move the slider to see it work.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
