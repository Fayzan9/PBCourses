import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene5_1_CuriosityHook: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2700),
      setTimeout(() => setStep(4), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const words = [
    { text: 'Stretch.', color: 'text-rose-500' },
    { text: 'Rotate.', color: 'text-sky-500' },
    { text: 'Squish.', color: 'text-violet-600' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
      >
        Chapter 5 · Eigenvectors & Eigenvalues
      </motion.p>

      <div className="flex gap-8 mb-2">
        {words.map((w, i) => (
          <motion.span
            key={w.text}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.45, duration: 0.6, ease: 'easeOut' }}
            className={`text-4xl md:text-6xl font-black ${w.color}`}
          >
            {w.text}
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-slate-600 text-xl font-semibold">When a matrix transforms space…</p>
            <p className="text-slate-800 text-2xl font-black">
              most vectors <span className="text-rose-500">change direction.</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-8 py-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md"
          >
            <p className="text-emerald-800 text-xl font-black">
              But a few special vectors only get <span className="underline decoration-wavy decoration-emerald-500">scaled.</span>
            </p>
            <p className="text-emerald-600 text-sm font-semibold mt-1">They keep pointing the same way. They never rotate.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-400 text-lg font-medium italic"
          >
            These are <strong className="text-slate-700 not-italic">eigenvectors</strong> — and they reveal the skeleton of every transformation.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
