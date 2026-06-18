import React from 'react';
import { motion } from 'framer-motion';
import { Math as MathTex } from '../../components/Math';

// ─── Dataset ──────────────────────────────────────────────────────────────────
// X = {(1,1),(2,2),(3,4),(4,3),(5,5)}   Mean = (3,3)
// C = [[2.5, 2.25],[2.25, 2.5]]
// λ₁ = 4.75  →  PC1 = [1/√2, 1/√2] ≈ [0.707, 0.707]   (95% variance)
// λ₂ = 0.25  →  PC2 = [1/√2,−1/√2]                      (5% variance)

const DATA_POINTS: [number, number][] = [[1, 1], [2, 2], [3, 4], [4, 3], [5, 5]];
const MEAN = [3, 3];
const PC1 = [1 / Math.SQRT2, 1 / Math.SQRT2];

// PC1 projections (scalar t)
const pc1T = DATA_POINTS.map(([x, y]) =>
  (x - MEAN[0]) * PC1[0] + (y - MEAN[1]) * PC1[1]
);

// ─── Mini SVG for the scatter ─────────────────────────────────────────────────
const SW = 340, SH = 280;
const SP = { l: 40, r: 16, t: 16, b: 36 };
const SPW = SW - SP.l - SP.r, SPH = SH - SP.t - SP.b;
const DATA_RANGE = 6; // 0..6

function px(v: number) { return SP.l + (v / DATA_RANGE) * SPW; }
function py(v: number) { return SP.t + SPH - (v / DATA_RANGE) * SPH; }

const PROJ_REACH = 3.2;
const pc1LineX1 = px(MEAN[0] - PROJ_REACH * PC1[0]);
const pc1LineY1 = py(MEAN[1] - PROJ_REACH * PC1[1]);
const pc1LineX2 = px(MEAN[0] + PROJ_REACH * PC1[0]);
const pc1LineY2 = py(MEAN[1] + PROJ_REACH * PC1[1]);

const projectedPoints = DATA_POINTS.map(([x, y], i) => {
  const t = pc1T[i];
  return {
    ox: px(x), oy: py(y),
    projX: px(MEAN[0] + t * PC1[0]),
    projY: py(MEAN[1] + t * PC1[1]),
  };
});

export const Scene7_10_WorkedExample: React.FC = () => (
  <div className="flex h-full w-full overflow-hidden">
    <div className="h-full px-6 py-4 overflow-y-auto w-full">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            Chapter 7 · Scene 10
          </p>
          <h2 className="text-4xl font-black text-slate-800 mt-2">
            Worked Example:{' '}
            <span className="text-indigo-500">2D → 1D</span>
          </h2>
          <p className="text-lg text-slate-500 mt-2 font-medium">
            Five points. One covariance matrix. All six steps.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-slate-200 bg-white p-8"
        >
          <div className="grid grid-cols-2 gap-8">

            {/* LEFT column: steps 1-4 */}
            <div className="space-y-6">

              {/* Step 1 */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-xs uppercase tracking-widest font-black text-sky-600 mb-3">Step 1 · Raw Data</p>
                <div className="overflow-x-auto">
                  <table className="text-center w-full text-sm font-mono">
                    <thead>
                      <tr className="text-slate-400 text-xs font-bold border-b border-slate-100">
                        <th className="pb-1">Point</th><th className="pb-1">x₁</th><th className="pb-1">x₂</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700 font-semibold">
                      {DATA_POINTS.map(([x, y], i) => (
                        <tr key={i} className="border-b border-slate-50">
                          <td className="py-1 text-slate-400 font-bold">p{i + 1}</td>
                          <td>{x}</td><td>{y}</td>
                        </tr>
                      ))}
                      <tr className="font-black text-indigo-600">
                        <td>μ</td><td>3</td><td>3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <p className="text-xs uppercase tracking-widest font-black text-indigo-600 mb-3">Step 2 · Centred Data (X_c = X − μ)</p>
                <table className="text-center w-full text-sm font-mono">
                  <thead>
                    <tr className="text-slate-400 text-xs font-bold border-b border-slate-100">
                      <th className="pb-1">Point</th><th className="pb-1">x₁−3</th><th className="pb-1">x₂−3</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 font-semibold">
                    {DATA_POINTS.map(([x, y], i) => (
                      <tr key={i} className="border-b border-slate-50">
                        <td className="py-1 text-slate-400 font-bold">p{i + 1}</td>
                        <td className={x - 3 > 0 ? 'text-emerald-600' : x - 3 < 0 ? 'text-rose-500' : ''}>{x - 3}</td>
                        <td className={y - 3 > 0 ? 'text-emerald-600' : y - 3 < 0 ? 'text-rose-500' : ''}>{y - 3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Step 3 */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-xs uppercase tracking-widest font-black text-violet-600 mb-3">Step 3 · Covariance Matrix</p>
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 text-center">
                  <MathTex tex="\mathbf{C} = \begin{bmatrix} 2.5 & 2.25 \\ 2.25 & 2.5 \end{bmatrix}" />
                  <p className="text-violet-700 text-xs font-semibold mt-2">Var(x₁) = Var(x₂) = 2.5, Cov = 2.25</p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <p className="text-xs uppercase tracking-widest font-black text-amber-600 mb-3">Step 4 · Eigenvalues & Eigenvectors</p>
                <div className="space-y-2">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 mb-1">
                      <span className="text-indigo-500 font-black">λ₁ = 4.75</span>
                      <span className="text-slate-400">→</span>
                      <span>PC1 = [0.707, 0.707]</span>
                    </div>
                    <div className="bg-indigo-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '95%' }} />
                    </div>
                    <p className="text-indigo-600 text-[10px] font-bold mt-1">95% of variance</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-1">
                      <span className="font-black">λ₂ = 0.25</span>
                      <span className="text-slate-400">→</span>
                      <span>PC2 = [0.707, −0.707]</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-slate-400 h-2 rounded-full" style={{ width: '5%' }} />
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold mt-1">5% of variance</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT column: scatter + step 5/6 */}
            <div className="space-y-6">

              {/* Scatter SVG */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <p className="text-xs uppercase tracking-widest font-black text-emerald-600 mb-3">Step 5 · Project onto PC1</p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <svg viewBox={`0 0 ${SW} ${SH}`} style={{ width: '100%' }}>
                    <defs>
                      <clipPath id="ch7s10-clip">
                        <rect x={SP.l} y={SP.t} width={SPW} height={SPH} />
                      </clipPath>
                      <marker id="ch7s10-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
                        <polygon points="0 0, 7 2.5, 0 5" fill="#4f46e5" />
                      </marker>
                    </defs>

                    {/* Grid */}
                    {[1, 2, 3, 4, 5].map(v => (
                      <React.Fragment key={v}>
                        <line x1={px(v)} y1={SP.t} x2={px(v)} y2={SP.t + SPH} stroke="#e2e8f0" />
                        <line x1={SP.l} y1={py(v)} x2={SP.l + SPW} y2={py(v)} stroke="#e2e8f0" />
                        <text x={px(v)} y={SP.t + SPH + 14} textAnchor="middle" fill="#94a3b8" fontSize="9">{v}</text>
                        <text x={SP.l - 5} y={py(v) + 3} textAnchor="end" fill="#94a3b8" fontSize="9">{v}</text>
                      </React.Fragment>
                    ))}
                    <line x1={SP.l} y1={SP.t + SPH} x2={SP.l + SPW} y2={SP.t + SPH} stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1={SP.l} y1={SP.t} x2={SP.l} y2={SP.t + SPH} stroke="#94a3b8" strokeWidth="1.5" />
                    <text x={SP.l + SPW / 2} y={SH - 4} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">x₁</text>
                    <text x={8} y={SP.t + SPH / 2} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600" transform={`rotate(-90,8,${SP.t + SPH / 2})`}>x₂</text>

                    {/* Drop lines */}
                    <g clipPath="url(#ch7s10-clip)">
                      {projectedPoints.map((p, i) => (
                        <line key={i} x1={p.ox} y1={p.oy} x2={p.projX} y2={p.projY}
                          stroke="#a5b4fc" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
                      ))}
                    </g>

                    {/* PC1 axis */}
                    <line x1={pc1LineX1} y1={pc1LineY1} x2={pc1LineX2} y2={pc1LineY2}
                      stroke="#4f46e5" strokeWidth="2.5" clipPath="url(#ch7s10-clip)"
                      markerEnd="url(#ch7s10-arr)" />

                    {/* Projected dots */}
                    <g clipPath="url(#ch7s10-clip)">
                      {projectedPoints.map((p, i) => (
                        <circle key={i} cx={p.projX} cy={p.projY} r={4}
                          fill="#4f46e5" stroke="white" strokeWidth="1" />
                      ))}
                    </g>

                    {/* Original points */}
                    {DATA_POINTS.map(([x, y], i) => (
                      <circle key={i} cx={px(x)} cy={py(y)} r={5.5}
                        fill="#1e293b" opacity="0.65" stroke="white" strokeWidth="1" />
                    ))}

                    {/* Mean */}
                    <circle cx={px(MEAN[0])} cy={py(MEAN[1])} r={4} fill="#1e293b" stroke="white" strokeWidth="1.5" />

                    {/* PC1 label */}
                    <text x={pc1LineX2 - 3} y={pc1LineY2 - 8} fill="#4f46e5" fontSize="11" fontWeight="900" textAnchor="end">PC 1</text>
                  </svg>
                </div>
              </motion.div>

              {/* Projection values */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <p className="text-xs uppercase tracking-widest font-black text-indigo-600 mb-2">1D Compressed Scores</p>
                <table className="text-center w-full text-xs font-mono">
                  <thead>
                    <tr className="text-slate-400 font-bold border-b border-slate-100">
                      <th className="pb-1">Point</th>
                      <th className="pb-1">t = Xc · PC1</th>
                      <th className="pb-1">PC2 score</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {[
                      { p: 'p1', t: '−2√2 ≈ −2.83', pc2: '0.00' },
                      { p: 'p2', t: '−√2 ≈ −1.41', pc2: '0.00' },
                      { p: 'p3', t: '½√2 ≈ +0.71', pc2: '−0.71' },
                      { p: 'p4', t: '½√2 ≈ +0.71', pc2: '+0.71' },
                      { p: 'p5', t: '2√2 ≈ +2.83', pc2: '0.00' },
                    ].map(({ p, t, pc2 }) => (
                      <tr key={p} className="border-b border-slate-50">
                        <td className="py-1 text-slate-400 font-bold">{p}</td>
                        <td className="text-indigo-600 font-bold">{t}</td>
                        <td className="text-slate-400">{pc2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Reconstruction error */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
                <p className="text-xs uppercase tracking-widest font-black text-rose-600 mb-2">Step 6 · Reconstruction Error</p>
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-1.5">
                  {[
                    { p: 'p1, p2, p5', err: '0.00', note: 'no error — exactly on PC1' },
                    { p: 'p3, p4', err: '0.71', note: 'PC2 score = ±0.71, lost in compression' },
                  ].map(({ p, err, note }) => (
                    <div key={p} className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">{p}</span>
                      <span className="font-mono text-rose-600 font-black">‖err‖ = {err}</span>
                      <span className="text-slate-400">{note}</span>
                    </div>
                  ))}
                  <p className="text-rose-600 text-xs font-bold pt-1 border-t border-rose-100 mt-1">
                    Total reconstruction error = ‖X − X̂‖² ∝ λ₂ = 0.25 (the discarded variance)
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default Scene7_10_WorkedExample;
