import React from 'react';
import { motion } from 'framer-motion';

export const Scene5_21_GrandSummary: React.FC = () => {
  const cards = [
    { icon: '🎯', title: 'Eigenvector', body: 'A direction that only gets scaled by a matrix — never rotated. The "natural axis" of a transformation.', color: '#059669' },
    { icon: '🔢', title: 'Eigenvalue (λ)', body: 'The scale factor. λ > 1 stretches, 0 < λ < 1 squishes, λ < 0 flips, λ = 0 destroys the direction.', color: '#0284C7' },
    { icon: '📐', title: 'The Equation', body: 'M·v = λ·v. Applying the full matrix is identical to multiplying by one number λ.', color: '#7C3AED' },
    { icon: '🤖', title: 'In AI: PCA', body: 'Eigenvectors of covariance matrices find the directions of maximum variance. Used for compression, denoising, and visualization.', color: '#D97706' },
    { icon: '🌐', title: 'Google PageRank', body: "The internet's link matrix has one dominant eigenvector — the one every random surfer gravitates toward. That's PageRank.", color: '#E11D48' },
    { icon: '🔬', title: 'Symmetric Matrices', body: 'Always have real, perpendicular eigenvectors. ML uses symmetric covariance matrices specifically because of this guarantee.', color: '#10B981' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-4xl mx-auto gap-6">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-extrabold"
        >
          Intuition Mastered
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black text-slate-800 mt-1"
        >
          The skeleton of every transformation.
        </motion.h1>
      </div>

      <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="font-black text-slate-800 text-sm mb-1" style={{ color: card.color }}>{card.title}</div>
            <div className="text-slate-500 text-xs font-medium leading-relaxed">{card.body}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
