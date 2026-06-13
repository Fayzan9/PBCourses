import React from 'react';
import { motion } from 'framer-motion';

export const Scene15_NextHook: React.FC = () => (
  <div className="relative flex flex-col items-center justify-center h-full px-8 overflow-hidden">
    {/* Glow */}
    <div className="absolute w-[600px] h-[600px] rounded-full bg-sky-400/10 blur-[140px]" />

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 flex flex-col items-center text-center max-w-4xl"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.2,
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}
        className="text-7xl mb-6"
      >
        📍
      </motion.div>

      <div className="text-sky-500 font-black uppercase tracking-[0.25em] text-xs mb-4">
        Chapter 2
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-slate-800 leading-[0.95]">
        We Have Points.
        <br />
        <span className="text-sky-500">
          Now We Need Distance.
        </span>
      </h1>

      <p className="mt-6 text-xl text-slate-500 max-w-2xl leading-relaxed">
        Once everything becomes a point, the next question is:
      </p>

      <div className="mt-12 flex items-center gap-10">
        <motion.div
          animate={{
            x: [-8, 8, -8]
          }}
          transition={{
            repeat: Infinity,
            duration: 4
          }}
          className="flex items-center gap-4"
        >
          <div className="w-5 h-5 rounded-full bg-sky-500" />
          <div className="w-32 h-[3px] bg-slate-300" />
          <div className="w-5 h-5 rounded-full bg-violet-500" />
        </motion.div>

        <span className="text-2xl font-black text-slate-700">
          Similar?
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 px-6 py-4 rounded-2xl bg-white/70 border border-slate-200 shadow-sm"
      >
        <div className="text-lg font-bold text-slate-700">
          Which points are actually close?
        </div>

        <div className="text-slate-500 mt-1">
          The answer powers search, recommendations, and modern AI.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-8 text-sm font-mono text-slate-400"
      >
        Euclidean Distance • Cosine Similarity • Vector Magnitude
      </motion.div>
    </motion.div>
  </div>
);

export default Scene15_NextHook;