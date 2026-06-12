import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_2_TheLimitation: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-6">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
    >
      Chapter 7 · The Connection
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-black text-slate-800 leading-tight"
    >
      In Chapter 4 and 6,<br />
      <span className="text-violet-600">we saw space warp.</span>
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col items-center gap-4 text-slate-600 text-xl font-medium leading-relaxed"
    >
      <p>
        We learned that neural networks warp space using **matrices**. These matrices scale, rotate, and shear inputs to separate different classes or make predictions.
      </p>
      <p className="text-slate-800 text-2xl font-black mt-2">
        But where do the matrix numbers come from?
      </p>
      <p>
        In a real model, we don't choose the weights manually. The network must discover the perfect set of numbers itself.
      </p>
    </motion.div>
  </div>
);
