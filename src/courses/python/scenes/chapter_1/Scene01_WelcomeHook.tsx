import React from 'react';
import { motion } from 'framer-motion';

const lines = [
  { code: 'print("Hello, World!")', label: 'greets the world', color: 'text-amber-500' },
  { code: 'requests.get(url)', label: 'scrapes the web', color: 'text-sky-500' },
  { code: 'model.fit(X, y)', label: 'trains an AI', color: 'text-emerald-500' },
  { code: 'df.plot(kind="bar")', label: 'draws a chart', color: 'text-violet-500' },
];

export const Scene01_WelcomeHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-6 text-center max-w-3xl mx-auto relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-400/10 filter blur-[140px] pointer-events-none" />

    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold mb-6 z-10"
    >
      Chapter 1 · Python Foundations
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="text-4xl md:text-6xl font-black tracking-tight text-slate-800 leading-tight mb-4 z-10"
    >
      One language.<br />
      <span className="text-amber-500">Infinite possibilities.</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      className="text-slate-500 text-base md:text-lg font-medium mb-10 z-10"
    >
      A single line of Python can do all of this:
    </motion.p>

    <div className="flex flex-col gap-3 w-full max-w-lg z-10">
      {lines.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 + idx * 0.3, duration: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-between gap-4 bg-slate-900 rounded-xl px-5 py-3"
        >
          <span className={`font-mono text-sm font-bold ${item.color}`}>{item.code}</span>
          <span className="text-slate-400 text-xs font-semibold shrink-0">→ {item.label}</span>
        </motion.div>
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      className="mt-10 text-slate-500 text-sm font-medium z-10"
    >
      Let's understand how Python thinks — from the ground up.
    </motion.p>
  </div>
);

export default Scene01_WelcomeHook;
