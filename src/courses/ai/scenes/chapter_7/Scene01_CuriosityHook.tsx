import React from 'react';
import { motion } from 'framer-motion';

const WORDS = [
  { text: '1,536', color: 'text-indigo-500' },
  { text: 'dimensions.', color: 'text-slate-800' },
  { text: 'Compressed.', color: 'text-emerald-500' },
];

export const Scene7_1_CuriosityHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-8 font-bold"
    >
      Chapter 7 · Principal Component Analysis
    </motion.p>

    <div className="flex flex-col gap-3 mb-12">
      {WORDS.map((w, i) => (
        <motion.h1
          key={w.text}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.55, duration: 0.7, ease: 'easeOut' }}
          className={`text-5xl md:text-7xl font-extrabold tracking-tight ${w.color}`}
        >
          {w.text}
        </motion.h1>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.9 }}
      className="border-t border-slate-200 pt-8 max-w-2xl w-full"
    >
      <p className="text-slate-500 text-lg font-medium mb-4">
        A modern AI embedding. Every sentence, every image, every product.
      </p>

      <p className="text-slate-800 text-2xl md:text-3xl font-black mb-6 leading-tight">
        But how much of that is <em>real signal</em>?<br />
        How much is just <span className="text-rose-400">noise</span>?
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        className="text-slate-500 text-xl font-semibold italic mb-3"
      >
        What if meaning lives in just a few key directions?
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.3 }}
        className="text-slate-800 text-2xl md:text-3xl font-black"
      >
        PCA finds the directions that{' '}
        <span className="text-indigo-500">actually matter.</span>
      </motion.p>
    </motion.div>

  </div>
);

export default Scene7_1_CuriosityHook;
