import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_15_GrandSummary: React.FC = () => {
  const cards = [
    { icon: '📐', title: 'The Problem', body: 'Eigenvectors only work for square matrices. Most real data is rectangular — images, user-item tables, embeddings.', color: '#E11D48' },
    { icon: '🏆', title: 'Singular Vectors', body: 'SVD asks a different question: which directions get stretched most? Right singular vectors = preferred input directions.', color: '#0891B2' },
    { icon: '↔️', title: 'Singular Values (σ)', body: 'The stretch factors. σ₁ ≥ σ₂ ≥ … ≥ 0. Large σ means that direction carries important information.', color: '#D97706' },
    { icon: '🔄', title: 'A = UΣVᵀ', body: 'Every matrix = Rotate → Stretch → Rotate. Three simple operations. No exceptions, no matter the size.', color: '#7C3AED' },
    { icon: '🗜️', title: 'Compression', body: 'Keep only the top k singular values. Discard the rest. Most information is preserved at a fraction of the cost.', color: '#059669' },
    { icon: '🎬', title: 'Hidden Structure', body: 'SVD finds the hidden axes. 10 movie genres collapse to 2: Excitement and Emotional Depth. Used in recommender systems, PCA, attention.', color: '#0891B2' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-4xl mx-auto gap-6">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono uppercase tracking-widest text-cyan-600 font-extrabold"
        >
          Intuition Mastered
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black text-slate-800 mt-1"
        >
          Every matrix is secretly just Rotate → Stretch → Rotate.
        </motion.h1>
      </div>

      <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />

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
            <div className="font-black text-sm mb-1" style={{ color: card.color }}>{card.title}</div>
            <div className="text-slate-500 text-xs font-medium leading-relaxed">{card.body}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-8 py-4 bg-cyan-50 border border-cyan-200 rounded-2xl max-w-2xl text-center"
      >
        <p className="text-cyan-800 font-black text-base">One-Sentence Intuition</p>
        <p className="text-cyan-700 text-sm font-medium mt-1">
          Eigenvectors find directions that stay on themselves. SVD finds the directions a matrix stretches most — and shows that every matrix is secretly just a <strong>rotate → stretch → rotate</strong> machine.
        </p>
      </motion.div>
    </div>
  );
};
