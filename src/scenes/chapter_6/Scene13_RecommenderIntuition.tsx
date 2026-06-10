import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene6_13_RecommenderIntuition: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2200),
      setTimeout(() => setStep(4), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const users = ['Alice', 'Bob', 'Carol', 'Dan', 'Eve'];
  const movies = ['Action1', 'Action2', 'Romance1', 'Romance2', 'SciFi1'];

  // Ratings matrix: 0 = not rated
  const ratings = [
    [5, 4, 0, 2, 3],
    [4, 5, 1, 1, 4],
    [1, 2, 5, 4, 2],
    [2, 1, 4, 5, 1],
    [3, 3, 3, 2, 5],
  ];

  // Alice missing rating for Romance1 (index [0][2])
  const highlightCell = { row: 0, col: 2 };

  // Approximate U (users × 2 latent)
  const uMatrix = [
    [0.85, 0.20],
    [0.90, 0.15],
    [0.15, 0.85],
    [0.10, 0.90],
    [0.50, 0.50],
  ];

  // Approximate Vt (2 latent × movies)
  const vtMatrix = [
    [0.90, 0.85, 0.10, 0.05, 0.60],
    [0.10, 0.15, 0.88, 0.92, 0.40],
  ];

  const sigmaVals = [4.2, 3.1];

  const getRatingColor = (val: number) => {
    if (val === 0) return '#e2e8f0';
    if (val <= 1) return '#bfdbfe';
    if (val <= 2) return '#93c5fd';
    if (val <= 3) return '#fde68a';
    if (val <= 4) return '#fb923c';
    return '#ef4444';
  };

  const getRatingLabel = (val: number) => (val === 0 ? '?' : String(val));

  const predictedRating = (() => {
    // r_hat = u_alice . sigma . v_romance1
    const r = uMatrix[0][0] * sigmaVals[0] * vtMatrix[0][2] + uMatrix[0][1] * sigmaVals[1] * vtMatrix[1][2];
    return r.toFixed(1);
  })();

  const CELL = 52;
  const HEADER_W = 56;
  const HEADER_H = 28;
  const gridW = HEADER_W + movies.length * CELL;
  const gridH = HEADER_H + users.length * CELL;

  const uCellW = 44;
  const uCellH = 44;
  const uGridW = HEADER_W + 2 * uCellW;
  const uGridH = HEADER_H + users.length * uCellH;

  const vtCellW = 44;
  const vtCellH = 36;
  const vtGridW = HEADER_W + movies.length * vtCellW;
  const vtGridH = HEADER_H + 2 * vtCellH;

  const getUColor = (val: number) => {
    const v = Math.max(0, Math.min(1, val));
    const r = Math.round(14 + v * (239 - 14));
    const g = Math.round(165 + v * (68 - 165));
    const b = Math.round(233 + v * (47 - 233));
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: SVG visualisation */}
      <div className="flex flex-col items-center gap-4">
        {/* Main ratings matrix */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-lg"
            >
              <p className="text-xs font-semibold text-slate-500 mb-2 text-center tracking-wide uppercase">
                Users × Movies Rating Matrix
              </p>
              <svg width={gridW} height={gridH} style={{ display: 'block', margin: '0 auto' }}>
                {/* Column headers */}
                {movies.map((m, ci) => (
                  <text
                    key={m}
                    x={HEADER_W + ci * CELL + CELL / 2}
                    y={HEADER_H - 6}
                    textAnchor="middle"
                    fontSize={9}
                    fill="#64748b"
                    fontWeight={600}
                  >
                    {m}
                  </text>
                ))}
                {/* Row headers + cells */}
                {users.map((u, ri) => (
                  <g key={u}>
                    <text
                      x={HEADER_W - 4}
                      y={HEADER_H + ri * CELL + CELL / 2 + 4}
                      textAnchor="end"
                      fontSize={10}
                      fill="#475569"
                      fontWeight={ri === 0 ? 700 : 500}
                    >
                      {u}
                    </text>
                    {movies.map((_, ci) => {
                      const val = ratings[ri][ci];
                      const isHighlight = ri === highlightCell.row && ci === highlightCell.col;
                      const isPredicted = step >= 4 && isHighlight;
                      return (
                        <g key={ci}>
                          <rect
                            x={HEADER_W + ci * CELL + 2}
                            y={HEADER_H + ri * CELL + 2}
                            width={CELL - 4}
                            height={CELL - 4}
                            rx={6}
                            fill={isPredicted ? '#0ea5e9' : getRatingColor(val)}
                            stroke={isHighlight ? '#0ea5e9' : 'transparent'}
                            strokeWidth={isHighlight ? 2.5 : 0}
                            style={{ transition: 'fill 0.5s' }}
                          />
                          <text
                            x={HEADER_W + ci * CELL + CELL / 2}
                            y={HEADER_H + ri * CELL + CELL / 2 + 5}
                            textAnchor="middle"
                            fontSize={isPredicted ? 13 : 12}
                            fontWeight={isHighlight ? 700 : 500}
                            fill={isPredicted ? '#fff' : val === 0 ? '#94a3b8' : '#1e293b'}
                          >
                            {isPredicted ? predictedRating : getRatingLabel(val)}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                ))}
              </svg>
              {step >= 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-sky-600 font-semibold mt-2 text-center"
                >
                  Alice hasn't rated Romance1 yet — can we predict it?
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* SVD decomposition view */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-md border border-sky-200/60 rounded-2xl p-4 shadow-lg w-full"
            >
              <p className="text-xs font-semibold text-sky-500 mb-3 text-center tracking-wide uppercase">
                SVD Reveals Hidden Structure: A = U Σ Vᵀ
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {/* U matrix */}
                <div>
                  <p className="text-[9px] text-center text-slate-400 mb-1 font-medium">U (users)</p>
                  <svg width={uGridW} height={uGridH}>
                    {['L1', 'L2'].map((label, ci) => (
                      <text key={label} x={HEADER_W + ci * uCellW + uCellW / 2} y={HEADER_H - 4} textAnchor="middle" fontSize={8} fill="#64748b" fontWeight={600}>{label}</text>
                    ))}
                    {users.map((u, ri) => (
                      <g key={u}>
                        <text x={HEADER_W - 3} y={HEADER_H + ri * uCellH + uCellH / 2 + 4} textAnchor="end" fontSize={9} fill={ri === 0 ? '#0ea5e9' : '#475569'} fontWeight={ri === 0 ? 700 : 500}>{u}</text>
                        {[0, 1].map(ci => (
                          <g key={ci}>
                            <rect x={HEADER_W + ci * uCellW + 2} y={HEADER_H + ri * uCellH + 2} width={uCellW - 4} height={uCellH - 4} rx={5} fill={getUColor(uMatrix[ri][ci])} />
                            <text x={HEADER_W + ci * uCellW + uCellW / 2} y={HEADER_H + ri * uCellH + uCellH / 2 + 4} textAnchor="middle" fontSize={9} fill="#1e293b" fontWeight={600}>{uMatrix[ri][ci].toFixed(2)}</text>
                          </g>
                        ))}
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="text-slate-400 text-xl font-bold">×</div>

                {/* Sigma */}
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[9px] text-center text-slate-400 font-medium">Σ</p>
                  {sigmaVals.map((s, i) => (
                    <div key={i} className="w-10 h-9 rounded-md flex items-center justify-center text-xs font-bold text-white" style={{ background: i === 0 ? '#0ea5e9' : '#38bdf8' }}>
                      {s}
                    </div>
                  ))}
                </div>

                <div className="text-slate-400 text-xl font-bold">×</div>

                {/* Vt matrix */}
                <div>
                  <p className="text-[9px] text-center text-slate-400 mb-1 font-medium">Vᵀ (movies)</p>
                  <svg width={vtGridW} height={vtGridH}>
                    {movies.map((m, ci) => (
                      <text key={m} x={HEADER_W + ci * vtCellW + vtCellW / 2} y={HEADER_H - 4} textAnchor="middle" fontSize={8} fill="#64748b" fontWeight={600}>{m.replace('1', '').replace('2', '')}{ci % 2 === 0 ? '1' : '2'}</text>
                    ))}
                    {['L1', 'L2'].map((label, ri) => (
                      <g key={label}>
                        <text x={HEADER_W - 3} y={HEADER_H + ri * vtCellH + vtCellH / 2 + 4} textAnchor="end" fontSize={9} fill="#64748b" fontWeight={600}>{label}</text>
                        {movies.map((_, ci) => (
                          <g key={ci}>
                            <rect x={HEADER_W + ci * vtCellW + 2} y={HEADER_H + ri * vtCellH + 2} width={vtCellW - 4} height={vtCellH - 4} rx={4} fill={getUColor(vtMatrix[ri][ci])} />
                            <text x={HEADER_W + ci * vtCellW + vtCellW / 2} y={HEADER_H + ri * vtCellH + vtCellH / 2 + 4} textAnchor="middle" fontSize={8} fill="#1e293b" fontWeight={600}>{vtMatrix[ri][ci].toFixed(2)}</text>
                          </g>
                        ))}
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 bg-sky-50 border border-sky-200 rounded-xl p-3 text-center"
                >
                  <p className="text-xs text-sky-700 font-semibold">
                    Predicted rating for Alice → Romance1: <span className="text-sky-500 text-sm font-bold">{predictedRating} ★</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">= Alice's taste vector · Σ · Romance1's vector</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT: explanation panel */}
      <div className="flex flex-col gap-5">
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              Filling in <span className="text-sky-500">the Blanks</span>
            </h2>
          </motion.div>
        )}

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4 shadow-sm"
          >
            <p className="text-sm text-slate-600 leading-relaxed">
              Netflix has <span className="font-bold text-sky-500">50 million users</span> and{' '}
              <span className="font-bold text-sky-500">10,000 movies</span>.
              <br />
              <br />
              Most users haven't seen most movies. There are <span className="font-semibold text-slate-700">billions of unknowns</span> in that giant table.
            </p>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4"
          >
            <p className="text-xs font-bold text-sky-600 uppercase tracking-wide mb-2">SVD finds hidden "taste dimensions"</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 inline-block flex-shrink-0" />
                Dimension 1: Action lover vs Romance fan
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block flex-shrink-0" />
                Dimension 2: Old films vs New films
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-300 inline-block flex-shrink-0" />
                …and uses them to predict unseen ratings!
              </li>
            </ul>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">The prediction formula</p>
            <div className="flex justify-center">
              <KaTeXMath tex="\hat{r}_{ij} = \mathbf{u}_i \cdot \sigma \cdot \mathbf{v}_j" block />
            </div>
            <p className="text-xs text-slate-500 text-center mt-1">
              Dot Alice's taste vector with the movie's taste vector
            </p>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-sky-500 to-cyan-400 rounded-xl p-4 text-white shadow-md"
          >
            <p className="text-sm font-semibold leading-relaxed">
              This is how YouTube knows your next video. SVD finds the hidden structure in what you've watched — and fills in all the blanks.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
