import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { useSlideState } from '../../components/CourseStateContext';

export const Scene6_7_WhatIsSigma: React.FC = () => {
  const [step, setStep] = useState(0);
  const [sigma1, setSigma1] = useSlideState<number>('ch6_sigma1', 3);
  const [sigma2, setSigma2] = useSlideState<number>('ch6_sigma2', 1.5);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const cx = 200;
  const cy = 200;
  const baseR = 70;
  const scaleUnit = 28;

  // Ellipse radii based on sigma values
  const rx = Math.max(8, sigma1 * scaleUnit);
  const ry = Math.max(8, sigma2 * scaleUnit);

  // Max bar height
  const maxBarH = 90;
  const bar1H = Math.max(6, (sigma1 / 5) * maxBarH);
  const bar2H = Math.max(6, (sigma2 / 3) * maxBarH);

  // Color intensity for bars

  // Matrix display entries
  const sigmaValues = [sigma1, sigma2, 0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: SVG Canvas */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-lg">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Interactive Σ</span>

        <svg viewBox="0 0 400 400" className="w-full">
          {/* Grid */}
          {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <line x1={cx + i * 40} y1={40} x2={cx + i * 40} y2={360} stroke="#f1f5f9" strokeWidth="1" />
              <line x1={40} y1={cy + i * 40} x2={360} y2={cy + i * 40} stroke="#f1f5f9" strokeWidth="1" />
            </React.Fragment>
          ))}
          {/* Axes */}
          <line x1={40} y1={cy} x2={360} y2={cy} stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1={cx} y1={40} x2={cx} y2={360} stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Original unit circle */}
          {step >= 1 && (
            <motion.circle
              cx={cx} cy={cy} r={baseR}
              fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5 4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Stretched ellipse */}
          {step >= 2 && (
            <motion.ellipse
              cx={cx} cy={cy}
              rx={rx} ry={ry}
              fill="rgba(14,165,233,0.08)"
              stroke="#0ea5e9"
              strokeWidth="2"
              animate={{ rx, ry }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          )}

          {/* Sigma1 axis label */}
          {step >= 2 && (
            <>
              <motion.line
                x1={cx} y1={cy}
                x2={cx + rx} y2={cy}
                stroke="#0ea5e9" strokeWidth="2"
                animate={{ x2: cx + rx }}
                transition={{ duration: 0.4 }}
              />
              <motion.text
                x={cx + rx / 2} y={cy - 10}
                textAnchor="middle" fill="#0ea5e9" fontSize="11" fontWeight="700"
                animate={{ x: cx + rx / 2 }}
                transition={{ duration: 0.4 }}
              >
                σ₁ = {sigma1.toFixed(1)}
              </motion.text>
              <motion.line
                x1={cx} y1={cy}
                x2={cx} y2={cy - ry}
                stroke="#38bdf8" strokeWidth="2"
                animate={{ y2: cy - ry }}
                transition={{ duration: 0.4 }}
              />
              <motion.text
                x={cx + 8} y={cy - ry / 2}
                fill="#38bdf8" fontSize="11" fontWeight="700"
                animate={{ y: cy - ry / 2 }}
                transition={{ duration: 0.4 }}
              >
                σ₂ = {sigma2.toFixed(1)}
              </motion.text>
            </>
          )}

          {/* Unit circle label */}
          {step >= 1 && (
            <text x={cx - baseR - 8} y={cy - baseR + 8} fill="#94a3b8" fontSize="10" textAnchor="end">
              unit circle
            </text>
          )}

          {/* Diagonal matrix visualization */}
          {step >= 3 && (
            <g transform={`translate(290, 60)`}>
              <rect x={-5} y={-5} width={78} height={82} rx="8"
                fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
              <text x={34} y={-14} textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">Σ matrix</text>
              {Array.from({ length: 3 }, (_, row) =>
                Array.from({ length: 3 }, (_, col) => {
                  const isDiag = row === col;
                  const val = isDiag ? sigmaValues[row] : 0;
                  return (
                    <motion.text
                      key={`${row}-${col}`}
                      x={col * 24 + 10}
                      y={row * 24 + 18}
                      textAnchor="middle"
                      fill={isDiag && val > 0 ? '#0ea5e9' : '#94a3b8'}
                      fontSize={isDiag && val > 0 ? '11' : '10'}
                      fontWeight={isDiag && val > 0 ? '700' : '400'}
                      animate={{ opacity: 1 }}
                    >
                      {isDiag ? val.toFixed(1) : '0'}
                    </motion.text>
                  );
                })
              )}
            </g>
          )}

          {/* Bar chart for sigma values */}
          {step >= 3 && (
            <g transform={`translate(30, 280)`}>
              <text x={25} y={-8} textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">
                Singular Values
              </text>
              {/* Bar 1 */}
              <motion.rect
                x={5} y={0 - bar1H} width={28} height={bar1H}
                fill="#0ea5e9" rx="3"
                animate={{ height: bar1H, y: -bar1H }}
                transition={{ duration: 0.5 }}
              />
              <text x={19} y={14} textAnchor="middle" fill="#0ea5e9" fontSize="10" fontWeight="700">σ₁</text>
              {/* Bar 2 */}
              <motion.rect
                x={40} y={0 - bar2H} width={28} height={bar2H}
                fill="#38bdf8" rx="3"
                animate={{ height: bar2H, y: -bar2H }}
                transition={{ duration: 0.5 }}
              />
              <text x={54} y={14} textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="700">σ₂</text>
              {/* Bar 3 (zero) */}
              <rect x={75} y={-4} width={28} height={4} fill="#e2e8f0" rx="2" />
              <text x={89} y={14} textAnchor="middle" fill="#94a3b8" fontSize="10">σ₃</text>
              {/* Baseline */}
              <line x1={0} y1={0} x2={110} y2={0} stroke="#e2e8f0" strokeWidth="1" />
            </g>
          )}
        </svg>
      </div>

      {/* RIGHT: Controls and explanation */}
      <div className="flex flex-col gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-1">What Is Σ?</h2>
          <p className="text-sm text-slate-500">The stretching machine.</p>
        </motion.div>

        {/* Sliders */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4 shadow-sm"
          >
            <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Adjust Singular Values</p>

            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-bold text-sky-600">σ₁</label>
                  <span className="text-sm font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    {sigma1.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range" min={0.5} max={5} step={0.1}
                  value={sigma1}
                  onChange={(e) => setSigma1(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-0.5">
                  <span>0.5</span><span>5.0</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-bold text-sky-400">σ₂</label>
                  <span className="text-sm font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                    {sigma2.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range" min={0} max={3} step={0.1}
                  value={sigma2}
                  onChange={(e) => setSigma2(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-0.5">
                  <span>0</span><span>3.0</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4"
          >
            <ul className="flex flex-col gap-1.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-0.5">◆</span>
                <span>Σ is a <span className="font-bold">diagonal matrix</span> — only the diagonal matters.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-0.5">◆</span>
                <span>Each diagonal entry σ is called a <span className="font-bold">singular value</span>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-0.5">◆</span>
                <span>Bigger σ = <span className="font-bold text-sky-600">more important direction</span>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-0.5">◆</span>
                <span>Always sorted: <span className="font-bold">σ₁ ≥ σ₂ ≥ ... ≥ 0</span></span>
              </li>
            </ul>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-3 shadow-sm"
          >
            <p className="text-xs text-slate-500 mb-2 font-semibold">Σ template (3×3 example):</p>
            <KaTeXMath
              tex="\Sigma = \begin{pmatrix} \sigma_1 & 0 & 0 \\ 0 & \sigma_2 & 0 \\ 0 & 0 & 0 \end{pmatrix}"
              block
            />
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-amber-50 to-sky-50 border border-amber-200 rounded-xl p-3"
          >
            <p className="text-xs text-slate-700">
              Unlike eigenvalues, singular values are{' '}
              <span className="font-bold text-amber-600">ALWAYS non-negative</span>.
              No surprises!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
