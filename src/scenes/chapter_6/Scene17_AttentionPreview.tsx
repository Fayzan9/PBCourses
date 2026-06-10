import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Scene6_17_AttentionPreview: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 3200),
      setTimeout(() => setStep(5), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const N = 8; // attention matrix size

  // Simulate attention weights — block-like pattern to show low-rank structure
  const buildAttentionMatrix = (): number[][] => {
    const mat: number[][] = [];
    for (let i = 0; i < N; i++) {
      const row: number[] = [];
      for (let j = 0; j < N; j++) {
        // Create a realistic low-rank-ish attention pattern
        const base = Math.exp(-0.5 * Math.abs(i - j));
        const periodic = 0.3 * Math.cos((i * j) / 3.0);
        const noise = 0.1 * ((((i * 7 + j * 13) % 17) / 17) - 0.5);
        row.push(Math.max(0, Math.min(1, base + periodic + noise)));
      }
      mat.push(row);
    }
    return mat;
  };

  const attMat = buildAttentionMatrix();

  // Simulated singular values (first few dominate)
  const singularValues = [3.8, 2.1, 0.9, 0.4, 0.15, 0.06, 0.02, 0.01];
  const maxSv = singularValues[0];

  // Low-rank approximation: reconstruct with only top-2 singular values (visually simplified)
  const buildLowRankMatrix = (): number[][] => {
    const mat: number[][] = [];
    for (let i = 0; i < N; i++) {
      const row: number[] = [];
      for (let j = 0; j < N; j++) {
        const base = Math.exp(-0.4 * Math.abs(i - j));
        row.push(Math.max(0, Math.min(1, base)));
      }
      mat.push(row);
    }
    return mat;
  };

  const lowRankMat = buildLowRankMatrix();

  const getHeatColor = (val: number, opacity = 1): string => {
    // Sky to cyan gradient for attention weights
    const r = Math.round(14 + val * (6 - 14));
    const g = Math.round(165 + val * (182 - 165));
    const b = Math.round(233 + val * (212 - 233));
    return `rgba(${r},${g},${b},${opacity})`;
  };

  const CELL = 28;
  const PAD = 4;
  const gridSize = N * CELL + 2 * PAD;

  const renderHeatmap = (
    matrix: number[][],
    label: string,
    showLabels = false
  ) => (
    <div className="flex flex-col items-center gap-1">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{label}</p>
      <svg width={gridSize} height={gridSize} viewBox={`0 0 ${gridSize} ${gridSize}`}>
        {matrix.map((row, ri) =>
          row.map((val, ci) => (
            <rect
              key={`${ri}-${ci}`}
              x={PAD + ci * CELL}
              y={PAD + ri * CELL}
              width={CELL - 1}
              height={CELL - 1}
              rx={3}
              fill={getHeatColor(val)}
            />
          ))
        )}
        {/* Diagonal highlight for low rank */}
        {showLabels && (
          <>
            <rect x={PAD} y={PAD} width={gridSize - 2 * PAD} height={gridSize - 2 * PAD}
              fill="none" stroke="#0ea5e9" strokeWidth={1.5} rx={4} opacity={0.4} />
          </>
        )}
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full px-4 py-8 relative overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-cyan-400/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">

          {/* LEFT: attention matrix visualization */}
          <div className="flex flex-col items-center gap-5">
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
              >
                <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest text-center mb-4">
                  Transformer Attention Weight Matrix
                </p>

                <div className="flex items-center justify-center gap-5 flex-wrap">
                  {/* Original attention matrix */}
                  {renderHeatmap(attMat, 'A (attention)')}

                  {step >= 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <p className="text-[9px] text-slate-400 font-semibold">SVD</p>
                      <div className="text-2xl text-sky-400 font-bold">→</div>
                    </motion.div>
                  )}

                  {/* U Σ Vt representation */}
                  {step >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">U Σ Vᵀ</p>
                      <div className="flex items-center gap-1">
                        {/* U */}
                        <svg width={32} height={gridSize} viewBox={`0 0 32 ${gridSize}`}>
                          {Array.from({ length: N }).map((_, ri) =>
                            Array.from({ length: 2 }).map((_, ci) => {
                              const val = Math.max(0, 1 - Math.abs(ri - N / 2 + ci) / (N / 2));
                              return (
                                <rect key={`${ri}-${ci}`}
                                  x={ci * 14 + 2} y={PAD + ri * CELL} width={12} height={CELL - 1}
                                  rx={2} fill={getHeatColor(val)} />
                              );
                            })
                          )}
                        </svg>
                        <span className="text-[9px] text-slate-500">·</span>
                        {/* Sigma — only top-k glow */}
                        <div className="flex flex-col gap-0.5">
                          {singularValues.map((sv, i) => {
                            const norm = sv / maxSv;
                            const isTop = i < 2;
                            return (
                              <div
                                key={i}
                                className="rounded-sm flex items-center justify-center"
                                style={{
                                  width: 28,
                                  height: CELL - 3,
                                  background: isTop
                                    ? `rgba(14,165,233,${norm})`
                                    : `rgba(148,163,184,${norm * 0.4})`,
                                  border: isTop ? '1px solid rgba(14,165,233,0.6)' : '1px solid transparent',
                                  boxShadow: isTop ? `0 0 ${6 * norm}px rgba(14,165,233,0.5)` : 'none',
                                }}
                              >
                                {isTop && step >= 3 && (
                                  <span style={{ fontSize: 7, color: 'white', fontWeight: 700 }}>
                                    {sv.toFixed(1)}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <span className="text-[9px] text-slate-500">·</span>
                        {/* Vt */}
                        <svg width={gridSize} height={32} viewBox={`0 0 ${gridSize} 32`}>
                          {Array.from({ length: 2 }).map((_, ri) =>
                            Array.from({ length: N }).map((_, ci) => {
                              const val = Math.max(0, 1 - Math.abs(ci - N / 2 + ri) / (N / 2));
                              return (
                                <rect key={`${ri}-${ci}`}
                                  x={PAD + ci * CELL} y={ri * 14 + 2} width={CELL - 1} height={12}
                                  rx={2} fill={getHeatColor(val)} />
                              );
                            })
                          )}
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Low rank reconstruction */}
                {step >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex flex-col items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-px w-12 bg-sky-400/40" />
                      <p className="text-[9px] text-sky-400 font-bold uppercase tracking-widest">Low-rank approximation (top-2)</p>
                      <div className="h-px w-12 bg-sky-400/40" />
                    </div>
                    {renderHeatmap(lowRankMat, 'Â ≈ A  (keeps 95% of info!)', true)}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Singular value bar chart */}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 w-full"
              >
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-3 text-center">
                  Singular values — most info in just a few
                </p>
                <div className="flex items-end justify-center gap-1.5 h-14">
                  {singularValues.map((sv, i) => {
                    const pct = (sv / maxSv) * 100;
                    const isTop = i < 2;
                    return (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.07 }}
                        style={{ height: `${pct}%`, transformOrigin: 'bottom' }}
                        className={`w-7 rounded-t-md flex items-end justify-center pb-0.5 ${
                          isTop
                            ? 'bg-sky-400 shadow-lg shadow-sky-500/30'
                            : 'bg-slate-600/50'
                        }`}
                      >
                        <span style={{ fontSize: 7, color: isTop ? 'white' : '#64748b', fontWeight: 700 }}>
                          σ{i + 1}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                <p className="text-[9px] text-sky-400/70 text-center mt-2">
                  Only σ₁ and σ₂ really matter — the rest are near zero
                </p>
              </motion.div>
            )}
          </div>

          {/* RIGHT: text content */}
          <div className="flex flex-col gap-5">
            {step >= 1 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2">SVD meets AI</p>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  The Lens that Reveals <span className="text-sky-400">Structure</span>
                </h2>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4"
              >
                <p className="text-sm text-slate-300 leading-relaxed">
                  The attention mechanism in GPT uses <span className="font-semibold text-white">matrices</span>.
                  <br /><br />
                  SVD reveals which directions in those matrices <span className="text-sky-400 font-semibold">matter most</span>.
                </p>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-sky-500/10 border border-sky-400/20 rounded-xl p-4"
              >
                <p className="text-xs font-bold text-sky-400 uppercase tracking-wide mb-2">Low-rank attention</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Research shows attention weight matrices are often <span className="font-bold text-sky-300">LOW RANK</span> — most information lives in just a few directions.
                </p>
              </motion.div>
            )}

            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <p className="text-sm text-slate-300 leading-relaxed">
                  This is why models like <span className="font-bold text-white">LoRA</span> fine-tune AI using <span className="text-cyan-400 font-semibold">low-rank updates</span> instead of changing every weight.
                  <br /><br />
                  SVD is the lens that reveals this structure.
                </p>
              </motion.div>
            )}

            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden rounded-xl border border-sky-400/40 shadow-lg shadow-sky-500/10"
              >
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 to-cyan-400/10 pointer-events-none" />
                <div className="relative p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Coming up next</p>
                  </div>
                  <p className="text-sm font-bold text-white">
                    Chapter 14: Attention Mechanism
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    We'll dive deep into how transformers use matrices — and how SVD helps us understand and compress them.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
