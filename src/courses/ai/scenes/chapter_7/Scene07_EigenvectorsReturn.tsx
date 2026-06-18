import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math } from '../../components/Math';

const CARDS = [
  {
    symbol: 'C',
    title: 'Covariance Matrix',
    desc: 'Encodes how every pair of features varies together. A d×d real symmetric matrix.',
    color: '#0284c7',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
  },
  {
    symbol: 'v',
    title: 'Principal Component',
    desc: 'An eigenvector of C. A unit vector in the direction of maximum (remaining) variance.',
    color: '#4f46e5',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  {
    symbol: 'λ',
    title: 'Variance Captured',
    desc: 'The eigenvalue. How much variance this PC explains. λ₁ ≥ λ₂ ≥ … ≥ λ_d ≥ 0.',
    color: '#059669',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    symbol: 'Cv=λv',
    title: 'The Connection',
    desc: 'Multiply the covariance matrix by a PC and you only scale it — the direction is unchanged.',
    color: '#7c3aed',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
];

export const Scene7_7_EigenvectorsReturn: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 700),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-8 py-6 overflow-hidden">

      {/* Header */}
      <div className="text-center mb-6 shrink-0">
        <motion.p
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold"
        >
          Chapter 7 · Scene 7
        </motion.p>
        <h2 className="text-3xl font-black text-slate-800 mt-1">
          The Eigenvectors Are{' '}
          <span className="text-indigo-500">Back</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Chapter 5 gave you Av = λv. Chapter 7 is the same equation — on a different matrix.
        </p>
      </div>

      {/* Central equation */}
      <div className="flex items-center justify-center gap-5 mb-8 shrink-0 flex-wrap">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 100 }}
          className="px-7 py-4 bg-sky-50 border-2 border-sky-200 rounded-2xl text-4xl font-black font-mono text-sky-600 shadow-sm"
        >
          C
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="px-7 py-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-4xl font-black font-mono text-indigo-600 shadow-sm"
        >
          v
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          className="text-4xl font-black text-slate-400"
        >=</motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.85 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="px-7 py-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-4xl font-black font-mono text-emerald-600 shadow-sm"
        >
          λ
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.85 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="px-7 py-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-4xl font-black font-mono text-indigo-600 shadow-sm"
        >
          v
        </motion.div>
      </div>

      {/* Definition cards */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 14 }}
            className="grid grid-cols-2 gap-4 w-full"
          >
            {CARDS.map((card) => (
              <div key={card.symbol}
                className={`${card.bg} border ${card.border} rounded-2xl p-4 shadow-sm`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono font-black text-xl" style={{ color: card.color }}>
                    {card.symbol}
                  </span>
                  <span className="text-sm font-bold text-slate-800">{card.title}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key takeaway banner */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-5 w-full p-4 bg-indigo-600 rounded-2xl text-center shrink-0"
          >
            <p className="text-white text-sm font-black leading-relaxed">
              Sort eigenvectors by their eigenvalues: λ₁ ≥ λ₂ ≥ … — the top <em>k</em> give
              you the <span className="text-indigo-200">k most informative directions</span> in your data.
            </p>
            <div className="flex justify-center mt-3">
              <Math tex="\% \text{ variance explained} = \frac{\lambda_i}{\sum_j \lambda_j} \times 100" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scene7_7_EigenvectorsReturn;
