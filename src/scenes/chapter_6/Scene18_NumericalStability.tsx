import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene6_18_NumericalStability: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2400),
      setTimeout(() => setStep(4), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);


  // Ellipse radii scaled for display

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: Visual canvas */}
      <div className="flex flex-col gap-6">
        {/* Ill-conditioned matrix visual */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-sm"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Ill-Conditioned Matrix — Nearly Singular
            </p>
            <svg viewBox="0 0 340 120" className="w-full">
              {/* Grid */}
              {[0, 1, 2, 3, 4].map(i => (
                <line key={`v${i}`} x1={40 + i * 65} y1={10} x2={40 + i * 65} y2={110} stroke="#e2e8f0" strokeWidth="0.5" />
              ))}
              {[0, 1, 2].map(i => (
                <line key={`h${i}`} x1={40} y1={20 + i * 40} x2={300} y2={20 + i * 40} stroke="#e2e8f0" strokeWidth="0.5" />
              ))}
              {/* Axes */}
              <line x1={170} y1={10} x2={170} y2={110} stroke="#94a3b8" strokeWidth="1" />
              <line x1={40} y1={60} x2={300} y2={60} stroke="#94a3b8" strokeWidth="1" />

              {/* Very flat ellipse (σ₁ >> σ₂) */}
              <motion.ellipse
                initial={{ rx: 0, ry: 0 }}
                animate={{ rx: 120, ry: 2 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                cx={170} cy={60}
                rx={120} ry={2}
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
              />
              {/* σ₁ arrow (horizontal) */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <line x1={170} y1={60} x2={290} y2={60} stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowBlue18)" />
                <text x={230} y={52} fontSize="11" fill="#0ea5e9" fontWeight="bold">σ₁ = 100</text>
              </motion.g>
              {/* σ₂ arrow (vertical, tiny) */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <line x1={170} y1={60} x2={170} y2={57} stroke="#f97316" strokeWidth="2" />
                <text x={174} y={52} fontSize="11" fill="#f97316" fontWeight="bold">σ₂ = 0.0001</text>
              </motion.g>

              <defs>
                <marker id="arrowBlue18" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#0ea5e9" />
                </marker>
              </defs>
            </svg>
            <p className="text-xs text-slate-500 mt-2 text-center">
              This ellipse is almost flat — σ₂ is nearly zero → the matrix is "almost singular"
            </p>
          </motion.div>
        )}

        {/* Direct inversion blows up */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-sm"
          >
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-3">
              Direct Inversion — Numbers Blow Up!
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white rounded-xl p-3 border border-red-200 flex flex-col items-center">
                <p className="text-xs text-slate-500 mb-1">1 / σ₁</p>
                <p className="text-lg font-bold text-slate-700">1 / 100</p>
                <p className="text-base font-bold text-sky-600">= 0.01 ✓</p>
                <p className="text-xs text-slate-400">Fine</p>
              </div>
              <div className="text-2xl text-slate-400 font-bold">vs</div>
              <div className="bg-white rounded-xl p-3 border border-red-300 flex flex-col items-center">
                <p className="text-xs text-slate-500 mb-1">1 / σ₂</p>
                <p className="text-lg font-bold text-slate-700">1 / 0.0001</p>
                <motion.p
                  className="text-base font-bold text-red-600"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: 2, duration: 0.4 }}
                >
                  = 10,000 ⚠️
                </motion.p>
                <p className="text-xs text-red-400 font-semibold">DANGER!</p>
              </div>
              <div className="bg-red-100 rounded-xl p-3 border border-red-300 flex flex-col items-center">
                <p className="text-xs text-slate-500 mb-1">Accumulated error</p>
                <motion.p
                  className="text-lg font-bold text-red-600"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  ±∞ OVERFLOW
                </motion.p>
                <p className="text-xs text-red-400">Result meaningless</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* SVD fix */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm"
          >
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              SVD Pseudo-Inverse — Safe & Stable
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white rounded-xl p-3 border border-emerald-200 flex flex-col items-center">
                <p className="text-xs text-slate-500 mb-1">σ₁ = 100 (big)</p>
                <p className="text-sm font-bold text-slate-700">1 / σ₁ = 0.01</p>
                <p className="text-sm font-bold text-emerald-600">Keep ✓</p>
              </div>
              <div className="text-xl text-slate-300 font-bold">|</div>
              <div className="bg-white rounded-xl p-3 border border-emerald-200 flex flex-col items-center">
                <p className="text-xs text-slate-500 mb-1">σ₂ = 0.0001 (tiny)</p>
                <p className="text-sm font-bold text-slate-700">Below threshold</p>
                <p className="text-sm font-bold text-sky-600">Set to 0 ✓</p>
              </div>
              <div className="bg-emerald-100 rounded-xl p-3 border border-emerald-300 flex flex-col items-center">
                <p className="text-xs text-slate-500 mb-1">Result</p>
                <p className="text-sm font-bold text-emerald-700">Stable answer</p>
                <p className="text-xs text-emerald-500">No overflow!</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Threshold illustration */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-sky-200 rounded-2xl p-4 shadow-sm"
          >
            <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-2">
              The Threshold Rule
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-6 bg-gradient-to-r from-red-100 via-amber-100 to-emerald-100 rounded-full relative">
                <div className="absolute left-[65%] top-0 bottom-0 w-0.5 bg-slate-400" />
                <span className="absolute left-[66%] -top-5 text-xs text-slate-500">threshold ε</span>
                <span className="absolute left-[5%] top-1 text-xs text-red-500 font-semibold">tiny σ → set 0</span>
                <span className="absolute left-[70%] top-1 text-xs text-emerald-600 font-semibold">big σ → 1/σ</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              If σ &lt; ε (a small number like 1e-10), treat it as 0 in the pseudo-inverse
            </p>
          </motion.div>
        )}
      </div>

      {/* RIGHT: Explanation */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-4">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <span className="inline-block bg-sky-100 text-sky-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Chapter 6 · Scene 18
          </span>
          <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-2">
            The Safe Solver
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Computers solve millions of equations per second. But some matrices are nearly
            singular — and dividing by a near-zero number makes answers blow up to infinity.
          </p>
        </motion.div>

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-3"
          >
            <p className="text-xs font-bold text-red-500 mb-1">The Problem</p>
            <p className="text-sm text-slate-600">
              Inverting a nearly-singular matrix directly causes a tiny σ to become a huge 1/σ.
              Tiny errors explode into nonsense.
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"
          >
            <p className="text-xs font-bold text-emerald-600 mb-1">The SVD Fix</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              SVD gives us the pseudo-inverse A⁺. Instead of computing 1/σ for all values,
              we simply <strong>set near-zero singular values to 0</strong>. Stable. Safe. Smart.
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4"
          >
            <p className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-2">Formula</p>
            <KaTeXMath tex="A^+ = V \Sigma^+ U^T" block />
            <p className="text-xs text-slate-500 mt-2 text-center">
              where Σ⁺ flips each diagonal (1/σ), but zeroes out near-zero entries
            </p>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4"
          >
            <p className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-2">
              Real-World Uses
            </p>
            <div className="space-y-2">
              {[
                { icon: '📡', label: 'GPS Navigation', desc: 'Solving overdetermined equations stably' },
                { icon: '🏥', label: 'MRI Machines', desc: 'Reconstructing images from frequency data' },
                { icon: '📷', label: 'Phone Cameras', desc: 'Image stabilization & noise reduction' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex items-start gap-2">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{label}</p>
                    <p className="text-xs text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
