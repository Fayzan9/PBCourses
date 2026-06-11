import React from 'react';
import { motion } from 'framer-motion';

export const Scene12_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center max-w-3xl mx-auto relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full bg-sky-400/10 filter blur-[130px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col items-center gap-6 z-10"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 16 }}
        className="text-6xl select-none"
      >
        🔀
      </motion.div>

      <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-extrabold">Up Next · Chapter 2</span>

      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
        Your code runs top to bottom.<br />
        <span className="text-sky-500">What if it could choose?</span>
      </h1>

      <div className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-sky-500 rounded-full" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-md"
      >
        Real programs don't just execute linearly — they respond to conditions, repeat actions, and skip irrelevant steps. That requires <strong>control flow</strong>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="flex items-center gap-3 mt-2 flex-wrap justify-center"
      >
        {[
          ['if / elif / else', '#0284C7'],
          ['for loops', '#7C3AED'],
          ['while loops', '#059669'],
          ['break & continue', '#DC2626'],
        ].map(([label, color]) => (
          <div
            key={label}
            className="px-3 py-1.5 rounded-full border text-xs font-bold"
            style={{ borderColor: color + '55', color, backgroundColor: color + '11' }}
          >
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);

export default Scene12_NextHook;
