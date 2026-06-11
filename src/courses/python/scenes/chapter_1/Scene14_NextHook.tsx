import React from 'react';
import { motion } from 'framer-motion';

const TOPICS = [
  { label: 'if / elif / else', colorClass: 'bg-sky-50 border-sky-300 text-sky-700' },
  { label: 'for loops', colorClass: 'bg-violet-50 border-violet-300 text-violet-700' },
  { label: 'while loops', colorClass: 'bg-emerald-50 border-emerald-300 text-emerald-700' },
  { label: 'FizzBuzz', colorClass: 'bg-amber-50 border-amber-300 text-amber-700' },
  { label: 'Big-O Intro', colorClass: 'bg-rose-50 border-rose-300 text-rose-600' },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export const Scene14_NextHook: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden items-center justify-center">
      {/* Scene label */}
      <motion.div {...fadeUp(0)} className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
          Scene 14 · Up Next
        </span>
      </motion.div>

      {/* Forking path illustration */}
      <motion.div {...fadeUp(0.1)} className="flex flex-col items-center gap-0 relative">
        {/* Vertical stem */}
        <div className="w-0.5 h-10 bg-slate-300" />
        {/* Fork node */}
        <div className="w-3 h-3 rounded-full bg-amber-400 border-2 border-amber-500 z-10" />
        {/* Branches row */}
        <div className="flex items-start gap-24 relative mt-0">
          {/* Left branch */}
          <div className="flex flex-col items-center">
            <div
              className="w-0.5 h-10 bg-slate-300"
              style={{ transform: 'rotate(-25deg)', transformOrigin: 'top center', marginTop: '-4px' }}
            />
            <span className="font-mono text-sm font-bold text-sky-600 mt-1 whitespace-nowrap">if condition:</span>
          </div>
          {/* Right branch */}
          <div className="flex flex-col items-center">
            <div
              className="w-0.5 h-10 bg-slate-300"
              style={{ transform: 'rotate(25deg)', transformOrigin: 'top center', marginTop: '-4px' }}
            />
            <span className="font-mono text-sm font-bold text-violet-600 mt-1 whitespace-nowrap">else:</span>
          </div>
        </div>
      </motion.div>

      {/* Chapter badge */}
      <motion.div {...fadeUp(0.2)} className="flex justify-center">
        <span className="bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest font-mono">
          Chapter 2 · The Decision Maze
        </span>
      </motion.div>

      {/* Big headline */}
      <motion.div {...fadeUp(0.3)} className="text-center flex flex-col gap-1">
        <h2 className="text-4xl lg:text-6xl font-black text-slate-800 leading-[1.1]">
          Your code runs top to bottom.
        </h2>
        <h2 className="text-4xl lg:text-6xl font-black leading-[1.1]">
          What if it could{' '}
          <span className="text-sky-500">choose?</span>
        </h2>
      </motion.div>

      {/* Body */}
      <motion.p
        {...fadeUp(0.42)}
        className="text-slate-500 text-sm leading-relaxed max-w-lg text-center"
      >
        Real programs respond to conditions. They repeat tasks. They skip irrelevant steps. That requires
        control flow — and it starts with one simple word:{' '}
        <span className="font-mono text-sm bg-sky-50 border border-sky-200 text-sky-700 px-2 py-0.5 rounded-md">
          if
        </span>
        .
      </motion.p>

      {/* Topic pills */}
      <motion.div {...fadeUp(0.54)} className="flex flex-wrap gap-2 justify-center">
        {TOPICS.map((topic, i) => (
          <motion.span
            key={topic.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.07, duration: 0.3, ease: 'easeOut' }}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${topic.colorClass}`}
          >
            {topic.label}
          </motion.span>
        ))}
      </motion.div>

      {/* Maya quote */}
      <motion.div {...fadeUp(0.85)} className="w-full flex justify-center">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 max-w-md w-full flex items-start gap-3">
          <span className="text-2xl shrink-0">👩‍💻</span>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
              Maya · End of Day 1
            </span>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Maya closes her laptop. Day 1 is done. She's no longer someone who freezes at 'What is a
              variable?' — she's someone who understands how Python thinks. Tomorrow: decisions."
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Scene14_NextHook;
