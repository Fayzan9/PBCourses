import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_1_CuriosityHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-6">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
    >
      Chapter 7 · The Gradient & The Loss Landscape
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-5xl md:text-6xl font-black text-slate-800 leading-tight"
    >
      Imagine being placed<br />
      <span className="text-rose-600">blindfolded on a mountain.</span>
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col items-center gap-3"
    >
      <p className="text-slate-600 text-2xl font-semibold">
        Your only goal: find the <span className="text-rose-600 font-black">lowest valley.</span>
      </p>
      <p className="text-slate-500 text-xl font-medium mt-2">
        You can't see the path, the terrain, or the destination.
      </p>
      <p className="text-slate-700 text-2xl font-bold mt-2">
        How do you navigate using only the tilt under your feet?
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-6"
    >
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold"
      >
        press → to start climbing down
      </motion.span>
    </motion.div>
  </div>
);
