import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSlideState } from '../../components/CourseStateContext';

export const Scene6_14_LatentFactors: React.FC = () => {
  const [view, setView] = useSlideState<number>('ch6_latent_view', 0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Users in taste space (x=action vs romance, y=old vs new)
  // x: -1 = pure romance, +1 = pure action
  // y: -1 = loves old films, +1 = loves new films
  const users = [
    { name: 'Alice', x: 0.80, y: 0.50, color: '#0ea5e9' },
    { name: 'Bob', x: 0.85, y: -0.30, color: '#38bdf8' },
    { name: 'Carol', x: -0.75, y: 0.40, color: '#06b6d4' },
    { name: 'Dan', x: -0.80, y: -0.50, color: '#0284c7' },
    { name: 'Eve', x: 0.10, y: 0.70, color: '#7dd3fc' },
  ];

  // Movies in taste space
  const movies = [
    { name: 'Action1', x: 0.90, y: 0.30, color: '#8b5cf6' },
    { name: 'Action2', x: 0.75, y: -0.40, color: '#a78bfa' },
    { name: 'Romance1', x: -0.70, y: 0.55, color: '#c084fc' },
    { name: 'Romance2', x: -0.85, y: -0.60, color: '#7c3aed' },
    { name: 'SciFi1', x: 0.20, y: 0.80, color: '#9333ea' },
  ];

  // Pairs to connect (user idx, movie idx) — predicted high rating
  const connections = [
    [0, 0], // Alice - Action1
    [1, 1], // Bob - Action2
    [2, 2], // Carol - Romance1
    [3, 3], // Dan - Romance2
    [4, 4], // Eve - SciFi1
  ];

  // SVG coordinate conversion
  const W = 360;
  const H = 320;
  const PAD = 48;
  const toSvgX = (x: number) => PAD + ((x + 1) / 2) * (W - 2 * PAD);
  const toSvgY = (y: number) => PAD + ((1 - y) / 2) * (H - 2 * PAD);

  const showUsers = view === 0 || view === 2;
  const showMovies = view === 1 || view === 2;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: scatter plot */}
      <div className="flex flex-col items-center gap-3">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-lg w-full"
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide text-center mb-3">
                Hidden Taste Space — discovered by SVD
              </p>
              <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', margin: '0 auto' }}>
                {/* Grid background */}
                <rect x={PAD} y={PAD} width={W - 2 * PAD} height={H - 2 * PAD} rx={8} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1} />

                {/* Axes */}
                <line x1={W / 2} y1={PAD - 8} x2={W / 2} y2={H - PAD + 8} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="4,3" />
                <line x1={PAD - 8} y1={H / 2} x2={W - PAD + 8} y2={H / 2} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="4,3" />

                {/* Axis labels */}
                <text x={PAD + 4} y={H / 2 - 6} fontSize={9} fill="#94a3b8" fontWeight={600}>← Romance</text>
                <text x={W - PAD - 4} y={H / 2 - 6} fontSize={9} fill="#94a3b8" fontWeight={600} textAnchor="end">Action →</text>
                <text x={W / 2 + 6} y={PAD + 12} fontSize={9} fill="#94a3b8" fontWeight={600}>New ↑</text>
                <text x={W / 2 + 6} y={H - PAD - 4} fontSize={9} fill="#94a3b8" fontWeight={600}>↓ Old</text>

                {/* Connection lines between nearby pairs */}
                {view === 2 && step >= 3 && connections.map(([ui, mi], idx) => {
                  const u = users[ui];
                  const m = movies[mi];
                  return (
                    <motion.line
                      key={idx}
                      x1={toSvgX(u.x)} y1={toSvgY(u.y)}
                      x2={toSvgX(m.x)} y2={toSvgY(m.y)}
                      stroke="#0ea5e9"
                      strokeWidth={1.5}
                      strokeDasharray="4,3"
                      opacity={0.5}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ delay: idx * 0.12, duration: 0.4 }}
                    />
                  );
                })}

                {/* Movie dots */}
                {showMovies && movies.map((m, i) => (
                  <motion.g
                    key={m.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <circle cx={toSvgX(m.x)} cy={toSvgY(m.y)} r={12} fill={m.color} opacity={0.15} />
                    <circle cx={toSvgX(m.x)} cy={toSvgY(m.y)} r={7} fill={m.color} />
                    <text
                      x={toSvgX(m.x)}
                      y={toSvgY(m.y) - 14}
                      textAnchor="middle"
                      fontSize={9}
                      fill={m.color}
                      fontWeight={700}
                    >
                      {m.name}
                    </text>
                  </motion.g>
                ))}

                {/* User dots */}
                {showUsers && users.map((u, i) => (
                  <motion.g
                    key={u.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <circle cx={toSvgX(u.x)} cy={toSvgY(u.y)} r={14} fill={u.color} opacity={0.12} />
                    <circle cx={toSvgX(u.x)} cy={toSvgY(u.y)} r={8} fill={u.color} stroke="white" strokeWidth={2} />
                    <text
                      x={toSvgX(u.x)}
                      y={toSvgY(u.y) + 20}
                      textAnchor="middle"
                      fontSize={9}
                      fill={u.color}
                      fontWeight={700}
                    >
                      {u.name}
                    </text>
                  </motion.g>
                ))}
              </svg>

              {/* Legend */}
              {step >= 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-6 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-sky-400 border-2 border-white shadow-sm" />
                    <span className="text-[10px] text-slate-500 font-medium">Users</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-violet-500" />
                    <span className="text-[10px] text-slate-500 font-medium">Movies</span>
                  </div>
                  {view === 2 && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-0.5 bg-sky-400 opacity-50" style={{ borderTop: '1.5px dashed #0ea5e9' }} />
                      <span className="text-[10px] text-sky-500 font-medium">Predicted match</span>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT: explanation */}
      <div className="flex flex-col gap-5">
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              Hidden <span className="text-sky-500">Taste Dimensions</span>
            </h2>
          </motion.div>
        )}

        {/* Toggle buttons */}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
            {(['Users', 'Movies', 'Both'] as const).map((label, idx) => (
              <button
                key={label}
                onClick={() => setView(idx)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  view === idx
                    ? 'bg-sky-500 text-white border-sky-500 shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4"
          >
            <p className="text-sm text-slate-600 leading-relaxed">
              SVD doesn't just decompose the matrix.
              <br /><br />
              It discovers <span className="font-bold text-sky-500">hidden ingredients</span> — called <span className="font-bold text-slate-700">latent factors</span>.
              <br /><br />
              Users and movies both get mapped into the <span className="font-semibold text-slate-700">same hidden space</span>.
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4 space-y-2"
          >
            <div className="flex items-start gap-2">
              <span className="text-sky-400 text-base mt-0.5">●</span>
              <p className="text-sm text-slate-700"><span className="font-semibold text-sky-600">Close together</span> = good match</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-slate-300 text-base mt-0.5">●</span>
              <p className="text-sm text-slate-700"><span className="font-semibold text-slate-500">Far apart</span> = bad match</p>
            </div>
            <div className="pt-1 border-t border-sky-100 mt-1">
              <p className="text-xs text-slate-500 italic">
                Nobody told the algorithm what "Action" or "Romance" means. It figured it out from the ratings alone.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
