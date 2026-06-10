import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene6_21_GrandSummary: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1500),
      setTimeout(() => setStep(4), 2100),
      setTimeout(() => setStep(5), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const conceptCards = [
    {
      color: 'violet',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      titleColor: 'text-violet-700',
      dotBg: 'bg-violet-400',
      icon: '🔄',
      title: 'U & V — Rotations',
      body: 'Pure rotations in output / input space. Columns are orthonormal — they never stretch, only rotate.',
    },
    {
      color: 'sky',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      titleColor: 'text-sky-700',
      dotBg: 'bg-sky-400',
      icon: '📏',
      title: 'Σ — Singular Values',
      body: 'Always positive. Sorted biggest first. Think of them as an importance ranking — the biggest σ matters most.',
    },
    {
      color: 'emerald',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      titleColor: 'text-emerald-700',
      dotBg: 'bg-emerald-400',
      icon: '✂️',
      title: 'Low-Rank Approx',
      body: 'Keep top-k singular values. Throw away the noise. A rank-10 approx of a 1000×1000 matrix can look nearly perfect.',
    },
  ];

  const appCards = [
    {
      icon: '🖼️',
      title: 'Image Compression',
      desc: 'Rank-20 image looks almost perfect at 1/5 the storage',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
    },
    {
      icon: '🎬',
      title: 'Recommender Systems',
      desc: 'Hidden taste dimensions discovered from user-movie ratings',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-700',
    },
    {
      icon: '🤖',
      title: 'PCA & AI',
      desc: 'Principal components = SVD on centered data. Foundation of modern ML.',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-700',
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-4 flex flex-col gap-6">
      {/* Header */}
      {step >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-block bg-sky-100 text-sky-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Chapter 6 · Grand Summary
          </span>
          <h2 className="text-3xl font-bold text-slate-800">What You've Learned</h2>
          <p className="text-slate-500 text-sm mt-1">Singular Value Decomposition — from scratch</p>
        </motion.div>
      )}

      {/* Section 1: The Decomposition */}
      {step >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-200 rounded-2xl p-6 flex flex-col items-center shadow-sm"
        >
          <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-3">
            Section 1 — The Decomposition
          </p>
          <KaTeXMath tex="A = U \Sigma V^T" block />
          <p className="text-slate-500 text-sm mt-3 text-center max-w-md">
            Any matrix. Any shape. Every single one can be broken into these three pieces.
            <br />
            <span className="font-semibold text-slate-700">Rotate → Stretch → Rotate.</span>
          </p>
          {/* Color-coded breakdown */}
          <div className="flex gap-3 mt-4 flex-wrap justify-center">
            {[
              { sym: 'U', label: 'Rotate outputs', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
              { sym: '·', label: '', color: 'bg-transparent text-slate-400 border-transparent text-xl' },
              { sym: 'Σ', label: 'Scale importance', color: 'bg-sky-100 text-sky-700 border-sky-200' },
              { sym: '·', label: '', color: 'bg-transparent text-slate-400 border-transparent text-xl' },
              { sym: 'Vᵀ', label: 'Rotate inputs', color: 'bg-violet-100 text-violet-700 border-violet-200' },
            ].map(({ sym, label, color }) => (
              <div key={sym + label} className={`border rounded-xl px-3 py-2 flex flex-col items-center ${color}`}>
                <span className="text-xl font-bold">{sym}</span>
                {label && <span className="text-xs font-medium mt-0.5">{label}</span>}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Section 2: Three Key Concepts */}
      {step >= 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">
            Section 2 — Three Key Concepts
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {conceptCards.map(({ bg, border, titleColor, dotBg, icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className={`${bg} ${border} border rounded-2xl p-4 shadow-sm flex flex-col gap-2`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{icon}</span>
                  <div className={`w-2 h-2 rounded-full ${dotBg}`} />
                </div>
                <p className={`text-sm font-bold ${titleColor}`}>{title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Section 3: Real Applications */}
      {step >= 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">
            Section 3 — Real Applications
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {appCards.map(({ icon, title, desc, bg, border, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${bg} ${border} border rounded-xl p-4 flex flex-col gap-2`}
              >
                <span className="text-3xl">{icon}</span>
                <p className={`text-sm font-bold ${text}`}>{title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick recap table */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-5 shadow-sm"
        >
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">
            At a Glance
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-2 pr-4 text-slate-400 font-semibold">Concept</th>
                  <th className="pb-2 pr-4 text-slate-400 font-semibold">What it is</th>
                  <th className="pb-2 text-slate-400 font-semibold">Why it matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { concept: 'Singular values σᵢ', what: 'Diagonal of Σ, positive, sorted', why: 'Measure how much each direction matters' },
                  { concept: 'Left singular vectors U', what: 'Orthonormal columns, output space', why: 'Directions in the output' },
                  { concept: 'Right singular vectors V', what: 'Orthonormal columns, input space', why: 'Directions in the input' },
                  { concept: 'Rank-k approximation', what: 'Keep top k terms', why: 'Compress data, remove noise' },
                  { concept: 'Pseudo-inverse A⁺', what: 'V Σ⁺ Uᵀ', why: 'Stable least-squares solver' },
                ].map(({ concept, what, why }) => (
                  <tr key={concept} className="py-1">
                    <td className="py-2 pr-4 font-semibold text-sky-600">{concept}</td>
                    <td className="py-2 pr-4 text-slate-600">{what}</td>
                    <td className="py-2 text-slate-500">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl p-5 text-white text-center shadow-lg"
        >
          <p className="text-lg font-bold mb-1">Chapter 6 Complete!</p>
          <p className="text-sky-100 text-sm">
            Up next: What does it mean for an AI to be WRONG?
          </p>
          <p className="text-white font-semibold text-base mt-1">
            Chapter 7: Loss Functions →
          </p>
        </motion.div>
      )}
    </div>
  );
};
