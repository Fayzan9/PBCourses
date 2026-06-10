import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSlideState } from '../../components/CourseStateContext';

// --- Image generation & SVD simulation ---

const IMG_SIZE = 32;

function generateImage(): number[][] {
  const img: number[][] = [];
  const cx = IMG_SIZE / 2;
  const cy = IMG_SIZE / 2;
  for (let i = 0; i < IMG_SIZE; i++) {
    img.push([]);
    for (let j = 0; j < IMG_SIZE; j++) {
      const dist = Math.sqrt((i - cx) ** 2 + (j - cy) ** 2);
      const circle = dist < 8 ? 70 : 0;
      const wave = 55 * Math.sin(i / 4) * Math.cos(j / 4);
      const gradient = 20 * (i / IMG_SIZE) + 20 * (j / IMG_SIZE);
      const val = Math.max(0, Math.min(255, Math.round(50 + wave + circle + gradient)));
      img[i].push(val);
    }
  }
  return img;
}

// Generate a set of basis "singular vector outer products"
// We use sine/cosine basis functions at different frequencies (like real SVD components)
function generateBases(): { singular: number; basis: number[][] }[] {
  const bases: { singular: number; basis: number[][] }[] = [];
  const freqs = [
    { fx: 0.5, fy: 0.5, s: 180 },
    { fx: 1.0, fy: 0.5, s: 90 },
    { fx: 0.5, fy: 1.0, s: 70 },
    { fx: 1.5, fy: 0.5, s: 50 },
    { fx: 0.5, fy: 1.5, s: 40 },
    { fx: 1.0, fy: 1.0, s: 32 },
    { fx: 2.0, fy: 0.5, s: 25 },
    { fx: 0.5, fy: 2.0, s: 20 },
    { fx: 1.5, fy: 1.0, s: 16 },
    { fx: 1.0, fy: 1.5, s: 13 },
    { fx: 2.0, fy: 1.0, s: 10 },
    { fx: 1.0, fy: 2.0, s: 8 },
    { fx: 2.0, fy: 1.5, s: 6 },
    { fx: 1.5, fy: 2.0, s: 5 },
    { fx: 2.5, fy: 1.5, s: 4 },
    { fx: 1.5, fy: 2.5, s: 3 },
  ];

  for (const { fx, fy, s } of freqs) {
    const b: number[][] = [];
    for (let i = 0; i < IMG_SIZE; i++) {
      b.push([]);
      for (let j = 0; j < IMG_SIZE; j++) {
        b[i].push(Math.sin((i / IMG_SIZE) * Math.PI * 2 * fx) * Math.cos((j / IMG_SIZE) * Math.PI * 2 * fy));
      }
    }
    bases.push({ singular: s, basis: b });
  }
  return bases;
}

// Project image onto bases to get coefficients, then reconstruct
function projectAndReconstruct(img: number[][], bases: { singular: number; basis: number[][] }[], rank: number): number[][] {
  // Compute coefficients: c_k = sum_{i,j} img[i][j] * basis_k[i][j] / norm
  const coeffs: number[] = bases.map(({ basis }) => {
    let dot = 0;
    let norm = 0;
    for (let i = 0; i < IMG_SIZE; i++) {
      for (let j = 0; j < IMG_SIZE; j++) {
        dot += img[i][j] * basis[i][j];
        norm += basis[i][j] ** 2;
      }
    }
    return norm > 0 ? dot / norm : 0;
  });

  // Reconstruct using top-k
  const result: number[][] = Array.from({ length: IMG_SIZE }, () => Array(IMG_SIZE).fill(0));
  for (let k = 0; k < rank; k++) {
    for (let i = 0; i < IMG_SIZE; i++) {
      for (let j = 0; j < IMG_SIZE; j++) {
        result[i][j] += coeffs[k] * bases[k].basis[i][j];
      }
    }
  }

  // Normalize to 0-255 range
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < IMG_SIZE; i++) {
    for (let j = 0; j < IMG_SIZE; j++) {
      min = Math.min(min, result[i][j]);
      max = Math.max(max, result[i][j]);
    }
  }
  const range = max - min || 1;
  return result.map((row) => row.map((v) => Math.round(((v - min) / range) * 255)));
}

function pixelToColor(v: number): string {
  const c = Math.round(Math.max(0, Math.min(255, v)));
  return `rgb(${c},${c},${c})`;
}

// Efficient rendering: render as a single SVG with rect elements
const ImageCanvas: React.FC<{
  pixels: number[][];
  label: string;
  size?: number;
}> = ({ pixels, label, size = 192 }) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${IMG_SIZE} ${IMG_SIZE}`}
        style={{ imageRendering: 'pixelated', borderRadius: 8 }}
        className="border border-slate-200 shadow-md"
      >
        {pixels.map((row, i) =>
          row.map((val, j) => (
            <rect
              key={`${i}-${j}`}
              x={j}
              y={i}
              width={1}
              height={1}
              fill={pixelToColor(val)}
            />
          ))
        )}
      </svg>
    </div>
  );
};

function calcVarianceExplained(bases: { singular: number }[], rank: number): number {
  const total = bases.reduce((s, b) => s + b.singular ** 2, 0);
  const kept = bases.slice(0, rank).reduce((s, b) => s + b.singular ** 2, 0);
  return Math.round((kept / total) * 100);
}

// Storage calculation
function storageInfo(rank: number): { approx: number; original: number; ratio: number } {
  const original = IMG_SIZE * IMG_SIZE; // 1024
  // For rank-k SVD: k * (m + n + 1) numbers
  const approx = rank * (IMG_SIZE + IMG_SIZE + 1);
  const ratio = Math.round((original / approx) * 10) / 10;
  return { approx, original, ratio };
}

export const Scene6_12_ImageCompression: React.FC = () => {
  const [step, setStep] = useState(0);
  const [rank, setRank] = useSlideState<number>('ch6_image_rank', 1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const originalImage = useMemo(() => generateImage(), []);
  const bases = useMemo(() => generateBases(), []);
  const approxImage = useMemo(
    () => projectAndReconstruct(originalImage, bases, rank),
    [originalImage, bases, rank]
  );

  const variance = calcVarianceExplained(bases, rank);
  const { approx, original, ratio } = storageInfo(rank);

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
            <ImageCanvas pixels={originalImage} label="Original (32×32)" />
            <div className="flex flex-col items-center justify-center pt-16 gap-2">
              <span className="text-slate-300 text-3xl font-thin">→</span>
              <span className="text-xs text-slate-400 font-semibold">SVD</span>
              <span className="text-xs text-sky-500 font-bold">rank {rank}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={rank}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <ImageCanvas pixels={approxImage} label={`Rank-${rank} Approx`} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Quality bar */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-50 rounded-xl p-3 border border-slate-200"
          >
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-500 font-medium">Quality (% variance explained)</span>
              <motion.span
                key={variance}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-sky-600 font-bold text-sm"
              >
                {variance}%
              </motion.span>
            </div>
            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${variance}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full ${
                  variance >= 80
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                    : variance >= 50
                    ? 'bg-gradient-to-r from-sky-400 to-cyan-400'
                    : 'bg-gradient-to-r from-amber-400 to-sky-400'
                }`}
              />
            </div>

            {/* Storage info */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 text-center bg-slate-100 rounded-lg p-2">
                <p className="text-slate-500 text-xs">Original</p>
                <p className="text-slate-700 font-bold text-sm">{original} numbers</p>
              </div>
              <div className="text-sky-400 font-bold text-lg">vs</div>
              <div className="flex-1 text-center bg-sky-50 rounded-lg p-2">
                <p className="text-sky-500 text-xs">Rank {rank}</p>
                <p className="text-sky-700 font-bold text-sm">{approx} numbers</p>
              </div>
              <div className="flex-1 text-center bg-emerald-50 rounded-lg p-2">
                <p className="text-emerald-500 text-xs">Compression</p>
                <p className="text-emerald-700 font-bold text-sm">{ratio}x</p>
              </div>
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
            See SVD<br />
            <span className="text-sky-500">Compress an Image</span>
          </h1>
        </motion.div>

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
          >
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
              Rank k — Drag to Compress
            </p>
            <input
              type="range"
              min={1}
              max={16}
              value={rank}
              onChange={(e) => setRank(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 (blurry)</span>
              <span className="text-sky-600 font-bold">k = {rank}</span>
              <span>16 (sharp)</span>
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
              Just <strong>{rank > 3 ? 'a few' : rank === 1 ? '1 layer' : `${rank} layers`}</strong>{' '}
              {rank <= 4 ? 'capture the main shapes.' : 'give you great quality.'}
            </p>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              The rest are fine details — noise and edges only you'd notice.
            </p>
            <p className="text-sky-600 text-sm mt-2 font-semibold leading-relaxed">
              We store {approx} numbers instead of {original}. That's {ratio}x smaller!
            </p>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-sky-50 rounded-xl p-4 border border-sky-200"
          >
            <p className="text-sky-700 text-sm font-bold leading-relaxed">
              Netflix, Google Photos, Spotify —
            </p>
            <p className="text-slate-600 text-sm mt-1 leading-relaxed">
              they all use ideas exactly like this. Less storage, same experience.
            </p>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl p-4 text-white shadow-md"
          >
            <p className="text-sm font-bold">
              SVD finds what's important.
            </p>
            <p className="text-sky-100 text-xs mt-1 leading-relaxed">
              Throw away the small singular values. Keep the big ones. That's the whole trick.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
