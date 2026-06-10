import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene6_16_WhyNotEigen: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2200),
      setTimeout(() => setStep(4), 3400),
      setTimeout(() => setStep(5), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // SVG dimensions for the shape-mismatch scene
  const W = 440;
  const H = 260;

  // Eigenvalue attempt: A (3×2) * v (2D) → result (3D)
  // Box dimensions
  const aBox = { x: 30, y: 80, w: 64, h: 90, label: 'A', dims: '3×2', color: '#0ea5e9' };
  const vBox2D = { x: 118, y: 105, w: 44, h: 44, label: 'v', dims: '(2D)', color: '#0ea5e9' };
  const resultBox3D = { x: 190, y: 90, w: 44, h: 70, label: 'Av', dims: '(3D)', color: '#f87171' };
  const lambdaBox = { x: 250, y: 105, w: 44, h: 44, label: 'λv', dims: '(2D)', color: '#fbbf24' };

  // SVD shapes
  const svdY = 155;
  const svdH = 70;
  const svdBoxes = [
    { x: 22, y: svdY, w: 50, h: svdH, label: 'U', dims: '3×3', color: '#0ea5e9' },
    { x: 80, y: svdY + 10, w: 50, h: 50, label: 'Σ', dims: '3×2', color: '#0ea5e9' },
    { x: 138, y: svdY + 10, w: 50, h: 50, label: 'Vᵀ', dims: '2×2', color: '#0ea5e9' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: animated dimension mismatch */}
      <div className="flex flex-col items-center gap-4">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-5 shadow-lg w-full"
            >
              {/* Eigenvalue attempt */}
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 text-center">
                Trying eigenvalues on a rectangular matrix…
              </p>

              <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', margin: '0 auto' }}>
                {/* Background */}
                <rect x={4} y={4} width={W - 8} height={H - 8} rx={12} fill="#fafafa" stroke="#f1f5f9" strokeWidth={1} />

                {/* --- EIGENVALUE ATTEMPT (top half) --- */}
                <text x={W / 2} y={22} textAnchor="middle" fontSize={10} fill="#94a3b8" fontWeight={700}>Eigenvalue equation: A·v = λ·v</text>

                {/* A box */}
                <rect x={aBox.x} y={aBox.y} width={aBox.w} height={aBox.h} rx={6}
                  fill="#e0f2fe" stroke="#0ea5e9" strokeWidth={2} />
                <text x={aBox.x + aBox.w / 2} y={aBox.y + aBox.h / 2 - 4} textAnchor="middle" fontSize={16} fill="#0284c7" fontWeight={700}>{aBox.label}</text>
                <text x={aBox.x + aBox.w / 2} y={aBox.y + aBox.h / 2 + 13} textAnchor="middle" fontSize={9} fill="#0ea5e9" fontWeight={600}>{aBox.dims}</text>

                {/* multiply dot */}
                <text x={107} y={130} textAnchor="middle" fontSize={18} fill="#94a3b8">·</text>

                {/* v box (2D) */}
                <rect x={vBox2D.x} y={vBox2D.y} width={vBox2D.w} height={vBox2D.h} rx={6}
                  fill="#e0f2fe" stroke="#0ea5e9" strokeWidth={2} />
                <text x={vBox2D.x + vBox2D.w / 2} y={vBox2D.y + vBox2D.h / 2 - 3} textAnchor="middle" fontSize={14} fill="#0284c7" fontWeight={700}>{vBox2D.label}</text>
                <text x={vBox2D.x + vBox2D.w / 2} y={vBox2D.y + vBox2D.h / 2 + 11} textAnchor="middle" fontSize={8} fill="#0ea5e9" fontWeight={600}>{vBox2D.dims}</text>

                {/* = */}
                <text x={183} y={130} textAnchor="middle" fontSize={18} fill="#94a3b8" fontWeight={700}>=</text>

                {/* Av result (3D) */}
                <rect x={resultBox3D.x} y={resultBox3D.y} width={resultBox3D.w} height={resultBox3D.h} rx={6}
                  fill="#fee2e2" stroke="#f87171" strokeWidth={2} />
                <text x={resultBox3D.x + resultBox3D.w / 2} y={resultBox3D.y + resultBox3D.h / 2 - 4} textAnchor="middle" fontSize={13} fill="#dc2626" fontWeight={700}>{resultBox3D.label}</text>
                <text x={resultBox3D.x + resultBox3D.w / 2} y={resultBox3D.y + resultBox3D.h / 2 + 12} textAnchor="middle" fontSize={8} fill="#f87171" fontWeight={600}>{resultBox3D.dims}</text>

                {/* ≠ */}
                {step >= 2 && (
                  <motion.text
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    x={248}
                    y={132}
                    textAnchor="middle"
                    fontSize={20}
                    fill="#f87171"
                    fontWeight={900}
                  >
                    ≠
                  </motion.text>
                )}

                {/* λv (2D) */}
                {step >= 2 && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <rect x={lambdaBox.x + 20} y={lambdaBox.y} width={lambdaBox.w} height={lambdaBox.h} rx={6}
                      fill="#fef9c3" stroke="#fbbf24" strokeWidth={2} />
                    <text x={lambdaBox.x + 20 + lambdaBox.w / 2} y={lambdaBox.y + lambdaBox.h / 2 - 3} textAnchor="middle" fontSize={13} fill="#b45309" fontWeight={700}>{lambdaBox.label}</text>
                    <text x={lambdaBox.x + 20 + lambdaBox.w / 2} y={lambdaBox.y + lambdaBox.h / 2 + 11} textAnchor="middle" fontSize={8} fill="#d97706" fontWeight={600}>{lambdaBox.dims}</text>
                  </motion.g>
                )}

                {/* Red X + error badge */}
                {step >= 2 && (
                  <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                    <rect x={300} y={96} width={130} height={34} rx={8} fill="#fef2f2" stroke="#f87171" strokeWidth={1.5} />
                    <text x={308} y={116} fontSize={9} fill="#ef4444" fontWeight={700}>Shape Error: 3D ≠ 2D</text>
                    <text x={308} y={126} fontSize={8} fill="#f87171">Can't equate outputs!</text>
                  </motion.g>
                )}

                {/* Divider */}
                {step >= 3 && (
                  <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    x1={16} y1={148} x2={W - 16} y2={148}
                    stroke="#e2e8f0" strokeWidth={1.5} strokeDasharray="6,4" />
                )}

                {/* --- SVD FIX (bottom half) --- */}
                {step >= 3 && (
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    x={W / 2} y={165} textAnchor="middle" fontSize={10} fill="#0ea5e9" fontWeight={700}
                  >
                    SVD: A = U Σ Vᵀ — shapes always match
                  </motion.text>
                )}

                {step >= 3 && svdBoxes.map((b, i) => (
                  <motion.g key={b.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                    <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={6} fill="#e0f2fe" stroke="#0ea5e9" strokeWidth={2} />
                    <text x={b.x + b.w / 2} y={b.y + b.h / 2 - 3} textAnchor="middle" fontSize={14} fill="#0284c7" fontWeight={700}>{b.label}</text>
                    <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 12} textAnchor="middle" fontSize={8} fill="#0ea5e9" fontWeight={600}>{b.dims}</text>
                  </motion.g>
                ))}

                {step >= 3 && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <text x={75} y={svdY + svdH / 2 + 5} textAnchor="middle" fontSize={14} fill="#94a3b8">·</text>
                    <text x={133} y={svdY + svdH / 2 + 5} textAnchor="middle" fontSize={14} fill="#94a3b8">·</text>
                  </motion.g>
                )}

                {/* Green checkmarks */}
                {step >= 4 && svdBoxes.map((b, i) => (
                  <motion.text
                    key={`check-${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                    x={b.x + b.w - 4}
                    y={b.y + 12}
                    textAnchor="middle"
                    fontSize={12}
                    fill="#22c55e"
                    fontWeight={900}
                  >
                    ✓
                  </motion.text>
                ))}

                {step >= 4 && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Dimension chain */}
                    <text x={210} y={svdY + 22} fontSize={9} fill="#0ea5e9" fontWeight={600}>3×2 =</text>
                    <text x={210} y={svdY + 34} fontSize={9} fill="#0ea5e9" fontWeight={600}>(3×3)·(3×2)·(2×2)</text>
                    <rect x={200} y={svdY + 40} width={220} height={20} rx={5} fill="#f0fdf4" stroke="#bbf7d0" strokeWidth={1} />
                    <text x={214} y={svdY + 53} fontSize={9} fill="#15803d" fontWeight={700}>All dimensions chain perfectly!</text>
                  </motion.g>
                )}
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT: explanation */}
      <div className="flex flex-col gap-5">
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              Why Eigenvalues <span className="text-red-400">Break</span>
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
              Eigenvalues need the <span className="font-bold text-slate-800">same input and output space</span>.
              <br /><br />
              For <KaTeXMath tex="A \mathbf{v} = \lambda \mathbf{v}" /> to work, A must be <span className="font-bold text-slate-700">square</span>.
              <br /><br />
              A 3×2 matrix takes <span className="text-sky-500 font-semibold">2D → 3D</span>. Different sizes!
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4"
          >
            <p className="text-xs font-bold text-sky-600 uppercase tracking-wide mb-2">SVD fixes this</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              SVD uses <span className="font-semibold text-slate-700">two separate rotation matrices</span>:
            </p>
            <ul className="text-sm text-slate-700 mt-2 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                <span><span className="font-bold text-sky-600">V</span> lives in input space (2D)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                <span><span className="font-bold text-cyan-600">U</span> lives in output space (3D)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                <span><span className="font-bold text-slate-600">Σ</span> bridges them (3×2 diagonal)</span>
              </li>
            </ul>
          </motion.div>
        )}

        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-sky-500 to-cyan-400 rounded-xl p-4 text-white shadow-md"
          >
            <p className="text-sm font-semibold leading-relaxed">
              SVD is the grown-up version. No restrictions. No square requirement. Always works.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
