import React from 'react';
import { motion } from 'framer-motion';

export const Scene00_Intro: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900"
      >
        AI Course
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease: 'easeOut' }}
        className="mt-6 text-xl md:text-2xl text-slate-500 font-medium tracking-wide"
      >
        From curiosity to clarity — understand the math that powers modern AI.
      </motion.p>
    </div>
  );
};
