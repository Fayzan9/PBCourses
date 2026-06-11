import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_1_CuriosityHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-6">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
    >
      Chapter 6 · Singular Value Decomposition
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-5xl md:text-6xl font-black text-slate-800 leading-tight"
    >
      In Chapter 5,<br />
      <span className="text-cyan-600">we found eigenvectors.</span>
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col items-center gap-3"
    >
      <p className="text-slate-600 text-2xl font-semibold">
        The directions a matrix <span className="text-cyan-600 font-black">naturally likes.</span>
      </p>
      <p className="text-slate-800 text-3xl font-black mt-2">So… are we done?</p>
      <p className="text-slate-500 text-xl font-medium">Have we completely understood matrices?</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="px-8 py-5 bg-amber-50 border border-amber-200 rounded-2xl max-w-lg"
    >
      <p className="text-amber-800 text-xl font-black">Show me the eigenvectors of this:</p>
      <div className="mt-3 font-mono text-2xl font-black text-slate-800">
        <div className="inline-flex flex-col items-center border-l-4 border-r-4 border-slate-400 px-6 py-2 gap-1">
          <span>1&nbsp;&nbsp;2&nbsp;&nbsp;3</span>
          <span>4&nbsp;&nbsp;5&nbsp;&nbsp;6</span>
        </div>
      </div>
    </motion.div>
  </div>
);
