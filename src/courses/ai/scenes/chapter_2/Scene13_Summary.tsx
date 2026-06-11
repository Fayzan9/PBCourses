import React from 'react';
import { motion } from 'framer-motion';

export const Scene2_Summary: React.FC = () => {
  const cards = [
    { icon: '📏', title: 'Euclidean Distance', body: 'Straight-line gap between two points. Works like a ruler. Pythagorean theorem in any dimension.', color: '#0284C7', formula: 'd = √(Σ(Bᵢ−Aᵢ)²)' },
    { icon: '🎯', title: 'The Magnitude Trap', body: 'Two vectors can point the same way but sit far apart by Euclidean distance — just because one is scaled up.', color: '#E11D48', formula: null },
    { icon: '📐', title: 'Cosine Similarity', body: 'Only the angle matters. Perfect for comparing preferences, documents, or embeddings where scale is irrelevant.', color: '#7C3AED', formula: 'cos θ = (A·B) / (|A||B|)' },
    { icon: '🔢', title: 'Score Range', body: '+1 = identical direction · 0 = perpendicular · −1 = exact opposites. Easy to interpret.', color: '#059669', formula: '-1 ≤ cos θ ≤ +1' },
    { icon: '🤔', title: 'When to Use Which', body: 'Euclidean: absolute gap matters (GPS, pixel distance). Cosine: only direction matters (text, recommendation, embeddings).', color: '#D97706', formula: null },
    { icon: '🌐', title: 'Real-World Impact', body: 'Spotify, Netflix, Google Search, and every vector database run on these two formulas. You now understand their core operation.', color: '#10B981', formula: null },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-4xl mx-auto gap-5">
      <div className="text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs font-mono uppercase tracking-widest text-sky-500 font-extrabold">
          Chapter 2 · Complete
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-3xl font-black text-slate-800 mt-1">
          Two tools to measure proximity.
        </motion.h1>
      </div>
      <div className="w-16 h-1.5 bg-gradient-to-r from-sky-400 to-violet-500 rounded-full" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {cards.map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2"
          >
            <div className="text-2xl">{c.icon}</div>
            <div className="font-black text-sm" style={{ color: c.color }}>{c.title}</div>
            <div className="text-slate-500 text-xs font-medium leading-relaxed">{c.body}</div>
            {c.formula && (
              <div className="mt-auto pt-2 border-t border-slate-100 font-mono text-xs font-bold text-slate-400">{c.formula}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
