import React from 'react';
import { motion } from 'framer-motion';

const WORDS = [
  { text: 'Rotate.', color: 'text-sky-500' },
  { text: 'Stretch.', color: 'text-emerald-500' },
  { text: 'Complicated?', color: 'text-violet-600' },
];

export const Scene6_1_CuriosityHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-8 font-bold"
    >
      Chapter 6 · Singular Value Decomposition
    </motion.p>

    <div className="flex flex-col gap-3 mb-12">
      {WORDS.map((w, i) => (
        <motion.h1
          key={w.text}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4 + i * 0.55,
            duration: 0.7,
            ease: 'easeOut',
          }}
          className={`text-5xl md:text-7xl font-extrabold tracking-tight ${w.color}`}
        >
          {w.text}
        </motion.h1>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
      className="mb-10"
    >
      <div className="flex items-center justify-center gap-4 text-slate-800">
        <span className="text-2xl md:text-3xl font-thin">A =</span>

        <div className="border-l-2 border-r-2 border-slate-700 px-4 py-2">
          <div className="flex gap-8">
            <span className="text-3xl md:text-4xl font-black">3</span>
            <span className="text-3xl md:text-4xl font-black">1</span>
          </div>
          <div className="flex gap-8">
            <span className="text-3xl md:text-4xl font-black">1</span>
            <span className="text-3xl md:text-4xl font-black">3</span>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.0, duration: 0.9 }}
      className="border-t border-slate-200 pt-8 max-w-2xl"
    >
      <p className="text-slate-500 text-lg font-medium mb-4">
        A matrix can look messy.
      </p>

      <p className="text-slate-800 text-2xl md:text-4xl font-black leading-tight mb-6">
        But what is it
        <br />
        <span className="text-slate-900">
          actually doing?
        </span>
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2 }}
        className="text-slate-500 text-xl font-semibold italic mb-3"
      >
        Is there a simpler way to describe it?
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.0 }}
        className="text-2xl md:text-3xl font-black"
      >
        Every matrix hides
        <span className="text-emerald-500"> special directions.</span>
      </motion.p>
    </motion.div>

  </div>
);

export default Scene6_1_CuriosityHook;