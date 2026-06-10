import React from 'react';
import { motion } from 'framer-motion';

export const Scene4_22_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center max-w-3xl mx-auto relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-emerald-400/10 filter blur-[120px] pointer-events-none" />

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
        🧲
      </motion.div>

      <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-extrabold">Up Next · Chapter 5</span>

      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
        You can warp space.<br />
        <span className="text-emerald-600">But which directions survive?</span>
      </h1>

      <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="text-slate-500 text-lg font-medium leading-relaxed max-w-md"
      >
        Every matrix has special directions that only get scaled — not rotated. These <em>eigenvectors</em> reveal what a transformation fundamentally does, and they power PCA, Google PageRank, and more.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="flex items-center gap-4 mt-2"
      >
        {[['Eigenvectors', '#059669'], ['Eigenvalues', '#0284C7'], ['PCA', '#7C3AED']].map(([label, color]) => (
          <div key={label} className="px-3 py-1.5 rounded-full border text-xs font-bold" style={{ borderColor: color + '55', color, backgroundColor: color + '11' }}>
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);
export default Scene4_22_NextHook;
