import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene2_3b_WhyFormula: React.FC = () => {
  const [step, setStep] = useState(0);

  const reasons = [
    {
      icon: '👁️',
      title: "Visual intuition breaks at 3D",
      body: "You can see 'closer' on a 2D chart. But ChatGPT uses 1,536-dimensional vectors. There's no chart for that — we need arithmetic.",
      color: '#0284C7', bg: 'bg-sky-50', border: 'border-sky-200',
    },
    {
      icon: '⚡',
      title: "Computers need exact numbers",
      body: 'A recommendation engine compares your taste vector to 50 million songs every second. "Looks about the same" won\'t cut it — we need a number.',
      color: '#7C3AED', bg: 'bg-violet-50', border: 'border-violet-200',
    },
    {
      icon: '🏆',
      title: "Formulas let us rank and sort",
      body: 'With a number, we can rank 1,000 candidates and pick the top 5. Without a formula, we can\'t sort. Without sorting, no search engine, no recommendation, no AI retrieval.',
      color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-6 gap-6">
      <div className="text-center">
        <motion.p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Bridge</motion.p>
        <motion.h2 className="text-3xl font-black text-slate-800"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          Intuition is great. But we need a number.
        </motion.h2>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= i ? 1 : 0.1, x: step >= i ? 0 : -20 }}
            transition={{ duration: 0.4 }}
            onClick={() => setStep(Math.max(step, i + 1))}
            className={`${r.bg} border ${r.border} rounded-2xl p-4 flex items-start gap-4 cursor-pointer hover:shadow-md transition-all`}
          >
            <div className="text-3xl shrink-0 mt-0.5">{r.icon}</div>
            <div>
              <div className="font-black text-slate-800 text-base mb-1" style={{ color: r.color }}>{r.title}</div>
              <div className="text-slate-600 text-sm font-medium leading-relaxed">{r.body}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {step >= reasons.length ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-6 py-3 bg-slate-800 text-white rounded-2xl text-sm font-bold text-center"
        >
          Next up: the formula — then a live interactive to feel it. →
        </motion.div>
      ) : (
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
          className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          tap each card to unlock
        </motion.p>
      )}
    </div>
  );
};
