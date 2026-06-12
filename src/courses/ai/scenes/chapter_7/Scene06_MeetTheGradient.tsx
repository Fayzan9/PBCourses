import React from 'react';
import { motion } from 'framer-motion';
import { Math } from '../../components/Math';

export const Scene7_6_MeetTheGradient: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-6">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
    >
      Chapter 7 · The Mathematical Compass
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-black text-slate-800 leading-tight"
    >
      Meet <span className="text-rose-600">The Gradient.</span>
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col items-center gap-4 text-slate-600 text-xl font-medium leading-relaxed"
    >
      <p>
        If you look at the contour map, there is always one direction that goes directly uphill, perpendicular to the contour line.
      </p>
      <p>
        In mathematics, this direction is represented by the **gradient vector** denoted by the symbol:
      </p>

      <div className="my-4 px-6 py-4 bg-rose-50 border border-rose-200 rounded-2xl">
        <Math tex="\nabla L = \begin{bmatrix} \frac{\partial L}{\partial w_1} \\ \frac{\partial L}{\partial w_2} \end{bmatrix}" block className="text-3xl text-rose-600 font-bold" />
      </div>

      <p className="text-slate-800 text-2xl font-black">
        The gradient ALWAYS points directly UPHILL.
      </p>
      <p className="text-emerald-600 font-extrabold text-2xl">
        To minimize loss, we must step in the exact opposite direction: <Math tex="-\nabla L" /> (downhill).
      </p>
    </motion.div>
  </div>
);
