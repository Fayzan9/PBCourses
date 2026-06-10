import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene6_15_SVDAndPCABridge: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 3200),
      setTimeout(() => setStep(5), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Data points: 2D spread along a diagonal direction
  const dataPoints = [
    [-1.5, -1.2], [-1.2, -0.9], [-0.8, -0.6], [-0.5, -0.4],
    [0.1, 0.2], [0.4, 0.5], [0.7, 0.6], [1.1, 1.0],
    [1.4, 1.2], [-0.3, 0.3], [0.6, -0.1], [-0.9, 0.1],
  ];

  const W = 260;
  const H = 240;
  const cx = W / 2;
  const cy = H / 2;
  const scale = 68;

  const toSvg = (x: number, y: number) => ({
    sx: cx + x * scale,
    sy: cy - y * scale,
  });

  // First principal direction (dominant): normalized [1, 0.9] → ~[0.743, 0.669]
  const pc1 = { x: 0.743, y: 0.669 };
  // Second direction: perpendicular → [-0.669, 0.743]
  const pc2 = { x: -0.669, y: 0.743 };

  const arrowLen1 = 80;
  const arrowLen2 = 48;

  const mathSteps = [
    { label: 'Step 1', math: 'X \\in \\mathbb{R}^{n \\times d}', note: 'Center your data matrix' },
    { label: 'Step 2', math: 'X = U \\Sigma V^T', note: 'Apply SVD' },
    { label: 'Step 3', math: 'V = \\text{principal components}', note: 'Same as eigenvectors of } X^TX/(n{-}1)' },
  ];

  const SubPlot: React.FC<{
    title: string;
    arrowColor1: string;
    arrowColor2: string;
    showMerge: boolean;
    label: string;
  }> = ({ title, arrowColor1, arrowColor2, showMerge: _showMerge, label }) => (
    <div className="flex flex-col items-center">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">{title}</p>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect x={8} y={8} width={W - 16} height={H - 16} rx={10} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1} />

        {/* Grid lines */}
        <line x1={8} y1={cy} x2={W - 8} y2={cy} stroke="#e2e8f0" strokeWidth={1} />
        <line x1={cx} y1={8} x2={cx} y2={H - 8} stroke="#e2e8f0" strokeWidth={1} />

        {/* Data points */}
        {dataPoints.map(([dx, dy], i) => {
          const { sx, sy } = toSvg(dx, dy);
          return <circle key={i} cx={sx} cy={sy} r={3.5} fill="#94a3b8" opacity={0.6} />;
        })}

        {/* Arrow 1 (dominant direction) */}
        <defs>
          <marker id={`arrow1-${label}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={arrowColor1} />
          </marker>
          <marker id={`arrow2-${label}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={arrowColor2} />
          </marker>
        </defs>

        <line
          x1={cx - pc1.x * arrowLen1}
          y1={cy + pc1.y * arrowLen1}
          x2={cx + pc1.x * arrowLen1}
          y2={cy - pc1.y * arrowLen1}
          stroke={arrowColor1}
          strokeWidth={2.5}
          markerEnd={`url(#arrow1-${label})`}
          opacity={0.9}
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx + pc2.x * arrowLen2}
          y2={cy - pc2.y * arrowLen2}
          stroke={arrowColor2}
          strokeWidth={2}
          markerEnd={`url(#arrow2-${label})`}
          opacity={0.7}
        />

        <text x={cx + pc1.x * arrowLen1 + 4} y={cy - pc1.y * arrowLen1 - 4} fontSize={9} fill={arrowColor1} fontWeight={700}>PC1</text>
        <text x={cx + pc2.x * arrowLen2 + 4} y={cy - pc2.y * arrowLen2 - 4} fontSize={9} fill={arrowColor2} fontWeight={700}>PC2</text>
      </svg>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: visual comparison */}
      <div className="flex flex-col items-center gap-4">
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-5 shadow-lg w-full"
          >
            <div className="flex items-start justify-center gap-6 flex-wrap">
              {/* PCA path */}
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <SubPlot
                      title="PCA path — eigenvectors of XᵀX"
                      arrowColor1="#0ea5e9"
                      arrowColor2="#38bdf8"
                      showMerge={false}
                      label="pca"
                    />
                    <p className="text-[9px] text-center text-sky-500 font-semibold mt-1">
                      Covariance → Eigen-decomposition
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider / merge arrow */}
              <div className="flex flex-col items-center justify-center pt-16">
                {step < 4 ? (
                  <div className="text-2xl text-slate-300 font-bold">vs</div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="text-2xl font-bold text-sky-500">=</div>
                    <p className="text-[9px] text-sky-500 font-bold text-center">Same!<br/>Directions</p>
                  </motion.div>
                )}
              </div>

              {/* SVD path */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <SubPlot
                      title="SVD path — columns of V"
                      arrowColor1={step >= 4 ? '#0ea5e9' : '#8b5cf6'}
                      arrowColor2={step >= 4 ? '#38bdf8' : '#a78bfa'}
                      showMerge={step >= 4}
                      label="svd"
                    />
                    <p className="text-[9px] text-center text-violet-500 font-semibold mt-1">
                      X = UΣVᵀ → V columns
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center bg-sky-50 border border-sky-200 rounded-xl py-2 px-4"
              >
                <p className="text-sm font-bold text-sky-600">They point in the exact same direction!</p>
                <p className="text-xs text-slate-500 mt-0.5">Two roads, one destination.</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Math steps */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-sm w-full"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 text-center">The Math Connection</p>
            <div className="space-y-3">
              {mathSteps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[10px] font-bold text-sky-400 bg-sky-50 border border-sky-200 rounded-md px-2 py-1 flex-shrink-0 mt-0.5">
                    {s.label}
                  </span>
                  <div>
                    <KaTeXMath tex={s.math} />
                    <p className="text-[10px] text-slate-400 mt-0.5">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* RIGHT: explanation */}
      <div className="flex flex-col gap-5">
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              PCA = SVD <span className="text-sky-500">in Disguise</span>
            </h2>
          </motion.div>
        )}

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4"
          >
            <p className="text-sm text-slate-600 leading-relaxed">
              Remember PCA from Chapter 5?
              <br /><br />
              The principal directions were <span className="font-semibold text-slate-800">eigenvectors of the covariance matrix</span>.
              <br /><br />
              Turns out: if you center your data and apply SVD, the <span className="font-bold text-sky-500">V columns ARE the principal components</span>.
            </p>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4"
          >
            <p className="text-sm text-slate-700 font-semibold mb-1">Same directions. Different road.</p>
            <p className="text-sm text-slate-600">
              PCA computes eigenvectors from XᵀX.
              <br />
              SVD goes directly from X.
            </p>
          </motion.div>
        )}

        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-sky-500 to-cyan-400 rounded-xl p-4 text-white shadow-md"
          >
            <p className="text-sm font-semibold leading-relaxed">
              SVD is the numerically stable way to compute PCA. Every major ML library — NumPy, scikit-learn, PyTorch — uses it under the hood.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
