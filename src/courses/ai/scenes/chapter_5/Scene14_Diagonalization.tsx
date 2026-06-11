import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene5_14_Diagonalization: React.FC = () => {
  const [step, setStep] = useState(0);

  const points = [
    { emoji: '🎯', title: 'The Core Insight', body: 'Eigenvectors form the "natural axes" of a matrix. In those axes, the matrix is just a simple diagonal stretch.', color: '#0284C7', bg: 'bg-sky-50', border: 'border-sky-200' },
    { emoji: '🧩', title: 'Diagonalization', body: 'M = P D P⁻¹ where P is the matrix of eigenvectors and D is the diagonal matrix of eigenvalues. This breaks any matrix into rotate → scale → un-rotate.', color: '#7C3AED', bg: 'bg-violet-50', border: 'border-violet-200' },
    { emoji: '⚡', title: 'Why It Matters', body: 'Computing Mⁿ (matrix to the n-th power) is expensive. In eigenvector form it is trivially: P Dⁿ P⁻¹. Eigenvalues just get raised to the n-th power.', color: '#D97706', bg: 'bg-amber-50', border: 'border-amber-200' },
    { emoji: '🤖', title: 'In AI: PCA', body: 'The eigenvectors of a data covariance matrix are the principal components. The eigenvalues tell you how much variance each direction captures.', color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-6 gap-6">
      <div className="text-center">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">Big Picture</p>
        <h2 className="text-3xl font-black text-slate-800">Why Eigenvectors Are Powerful</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= i ? 1 : 0.15, y: step >= i ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onClick={() => setStep(Math.max(step, i + 1))}
            className={`${p.bg} border ${p.border} rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md`}
          >
            <div className="text-3xl mb-2">{p.emoji}</div>
            <div className="font-black text-slate-800 text-sm mb-1">{p.title}</div>
            <div className="text-slate-600 text-xs font-medium leading-relaxed">{p.body}</div>
          </motion.div>
        ))}
      </div>

      {step < points.length && (
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          tap a card to unlock
        </motion.p>
      )}
    </div>
  );
};
