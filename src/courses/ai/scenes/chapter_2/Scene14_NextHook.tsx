import React from 'react';
import { motion } from 'framer-motion';

export const Scene2_13_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center max-w-3xl mx-auto relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-violet-400/10 filter blur-[120px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center gap-6 z-10"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
        className="text-6xl select-none"
      >
        🔗
      </motion.div>

      <span className="text-xs font-mono uppercase tracking-widest text-violet-500 font-extrabold">Up Next · Chapter 3</span>

      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
        You already used it.<br />
        <span className="text-violet-500">You just didn't know.</span>
      </h1>

      <div className="w-16 h-1.5 bg-gradient-to-r from-violet-400 to-rose-500 rounded-full" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg"
      >
        The numerator of cosine similarity — <span className="font-black text-slate-700">A · B</span> — is the dot product. In Chapter 3 we'll pull it apart: what it actually computes, why it measures alignment, and why <em>every</em> neural network runs on it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="flex items-center gap-3 mt-2 flex-wrap justify-center"
      >
        {[
          ['A·B formula', '#7C3AED'],
          ['Geometric meaning', '#0284C7'],
          ['Inside every AI model', '#059669'],
        ].map(([label, color]) => (
          <div key={label} className="px-3 py-1.5 rounded-full border text-xs font-bold" style={{ borderColor: color + '55', color, backgroundColor: color + '11' }}>
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);
