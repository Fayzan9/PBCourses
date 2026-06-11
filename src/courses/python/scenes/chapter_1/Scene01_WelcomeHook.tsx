import React from 'react';
import { motion } from 'framer-motion';

const LINES = [
  { code: 'print("Hello, World!")',  label: 'greets the world',        color: 'text-amber-400' },
  { code: 'requests.get(url)',        label: 'scrapes the entire web',   color: 'text-sky-400' },
  { code: 'model.fit(X, y)',          label: 'trains an AI',             color: 'text-emerald-400' },
  { code: 'df.plot(kind="bar")',      label: 'draws a beautiful chart',  color: 'text-violet-400' },
];

export const Scene01_WelcomeHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full w-full px-8 text-center relative overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-amber-400/8 filter blur-[160px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-sky-400/8 filter blur-[120px]" />
    </div>

    <div className="relative z-10 flex flex-col items-center gap-10 max-w-4xl mx-auto">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-xs font-mono font-extrabold text-amber-600 uppercase tracking-widest">Chapter 1 · Python Foundations</span>
      </motion.div>

      {/* Hero headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-800 leading-[1.05]">
          One language.
        </h1>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-amber-500 leading-[1.05]">
          Infinite possibilities.
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-slate-500 text-lg md:text-xl font-medium max-w-lg"
      >
        A single line of Python can do all of this — and you'll learn how today.
      </motion.p>

      {/* Code lines */}
      <div className="flex flex-col gap-3 w-full max-w-xl">
        {LINES.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + idx * 0.25, duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-between gap-6 bg-slate-900 rounded-2xl px-6 py-4 border border-slate-800"
          >
            <span className={`font-mono text-base md:text-lg font-bold ${item.color}`}>
              {item.code}
            </span>
            <span className="text-slate-500 text-sm font-medium shrink-0 hidden sm:block">
              → {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="text-slate-400 text-sm font-medium"
      >
        Let's understand how Python thinks — from the very ground up.
      </motion.p>
    </div>
  </div>
);

export default Scene01_WelcomeHook;
