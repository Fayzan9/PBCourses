import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_9_TheReveal: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-6 gap-6">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
    >
      The Equation Revealed
    </motion.p>

    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 140 }}
      className="px-10 py-7 bg-slate-800 text-white rounded-3xl shadow-2xl"
    >
      <p className="font-mono text-4xl md:text-5xl font-black tracking-wide">
        <span className="text-cyan-400">A</span>
        <span className="text-slate-300"> = </span>
        <span className="text-violet-400">U</span>
        <span className="text-amber-400"> Σ </span>
        <span className="text-emerald-400">Vᵀ</span>
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center gap-4 text-2xl font-black"
    >
      <div className="px-5 py-3 bg-violet-50 border-2 border-violet-200 rounded-2xl text-violet-700">
        <span className="font-mono text-3xl">Vᵀ</span>
        <p className="text-sm font-semibold text-violet-500 mt-1">Rotate</p>
      </div>
      <span className="text-slate-400 text-3xl">→</span>
      <div className="px-5 py-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-amber-700">
        <span className="font-mono text-3xl">Σ</span>
        <p className="text-sm font-semibold text-amber-500 mt-1">Stretch</p>
      </div>
      <span className="text-slate-400 text-3xl">→</span>
      <div className="px-5 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-emerald-700">
        <span className="font-mono text-3xl">U</span>
        <p className="text-sm font-semibold text-emerald-500 mt-1">Rotate</p>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-3 gap-3 text-sm max-w-xl w-full"
    >
      {[
        { sym: 'V', color: 'text-violet-600', title: 'Right singular vectors', desc: 'Input preferred directions' },
        { sym: 'Σ', color: 'text-amber-600', title: 'Singular values (σ)', desc: 'How much each direction stretches' },
        { sym: 'U', color: 'text-emerald-600', title: 'Left singular vectors', desc: 'Output preferred directions' },
      ].map(item => (
        <div key={item.sym} className="bg-white border border-slate-200 rounded-xl p-3">
          <p className={`font-mono text-2xl font-black ${item.color}`}>{item.sym}</p>
          <p className="font-bold text-slate-700 text-xs mt-1 leading-snug">{item.title}</p>
          <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
        </div>
      ))}
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="px-8 py-4 bg-cyan-50 border border-cyan-200 rounded-2xl max-w-md"
    >
      <p className="text-cyan-700 font-semibold text-base">
        Every matrix. No matter how ugly. No matter how large. No matter how rectangular.
      </p>
    </motion.div>
  </div>
);
