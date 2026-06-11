import React from 'react';
import { motion } from 'framer-motion';

const WORDS = [
  { text: 'Stretch.',  color: 'text-emerald-500' },
  { text: 'Rotate.',   color: 'text-sky-500'     },
  { text: 'Squish.',   color: 'text-violet-600'  },
];

export const Scene5_1_CuriosityHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4">

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-8 font-bold"
    >
      Chapter 5 · Eigenvectors &amp; Eigenvalues
    </motion.p>

    <div className="flex flex-col gap-3 mb-10">
      {WORDS.map((w, i) => (
        <motion.h1
          key={w.text}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.5, duration: 0.7, ease: 'easeOut' }}
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
      className="border-t border-slate-200 pt-8 max-w-xl w-full"
    >
      <p className="text-slate-500 text-lg font-medium mb-3">
        A matrix does this to <em>everything</em> in space.
      </p>

      <p className="text-slate-800 text-2xl md:text-3xl font-black mb-6">
        Every vector gets warped.<br />
        Every direction shifts.
      </p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.3, duration: 0.8 }}
        className="text-slate-500 text-xl font-semibold italic mb-2"
      >
        …or does it?
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.0, duration: 0.9 }}
        className="text-slate-800 text-2xl md:text-3xl font-black"
      >
        What if some directions{' '}
        <span className="text-emerald-500">never changed?</span>
      </motion.p>
    </motion.div>
  </div>
);

export default Scene5_1_CuriosityHook;
