import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_6_ChampionDirection: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-6 gap-6">
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="text-6xl select-none"
    >
      🏆
    </motion.div>

    <div className="flex flex-col items-center gap-3 w-full max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-8 py-4 bg-emerald-50 border border-emerald-200 rounded-2xl w-full"
      >
        <p className="text-sm text-slate-500 font-medium">Eigenvectors ask:</p>
        <p className="text-xl font-black text-emerald-700 mt-1">"Which direction survives unchanged?"</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-8 py-4 bg-cyan-50 border-2 border-cyan-300 rounded-2xl w-full"
      >
        <p className="text-sm text-slate-500 font-medium">SVD asks:</p>
        <p className="text-2xl font-black text-cyan-700 mt-1">"Which direction gets stretched the most?"</p>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col gap-2 w-full max-w-lg"
    >
      <div className="w-full h-0.5 bg-slate-100" />
      <div className="flex flex-col gap-2">
        {[
          { icon: '📦', text: 'Objects enter the factory', color: 'bg-slate-50 border-slate-200' },
          { icon: '🏭', text: 'The matrix processes them', color: 'bg-amber-50 border-amber-200' },
          { icon: '🎁', text: 'Objects leave — different shape', color: 'bg-slate-50 border-slate-200' },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-3 px-4 py-3 ${item.color} border rounded-xl`}>
            <span className="text-xl">{item.icon}</span>
            <span className="text-slate-700 font-semibold text-sm">{item.text}</span>
          </div>
        ))}
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="px-8 py-4 bg-slate-800 text-white rounded-2xl max-w-lg text-center"
    >
      <p className="font-black text-base text-cyan-400">Singular vectors tell us which incoming directions the matrix handles best — and where they land.</p>
    </motion.div>
  </div>
);
