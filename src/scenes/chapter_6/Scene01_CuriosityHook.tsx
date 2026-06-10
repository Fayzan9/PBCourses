import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene6_1_CuriosityHook: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1300),
      setTimeout(() => setStep(3), 2100),
      setTimeout(() => setStep(4), 3200),
      setTimeout(() => setStep(5), 4400),
      setTimeout(() => setStep(6), 5800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const words = [
    { text: 'Rotate.', color: 'text-violet-500', delay: 0.2 },
    { text: 'Stretch.', color: 'text-sky-500', delay: 0.7 },
    { text: 'Rotate.', color: 'text-emerald-500', delay: 1.2 },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-8">
      {/* Chapter tag */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
      >
        Chapter 6 · Singular Value Decomposition
      </motion.p>

      {/* Animated words */}
      <div className="flex gap-6 md:gap-10 flex-wrap justify-center">
        {words.map((w) => (
          <motion.span
            key={w.text + w.delay}
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: w.delay, duration: 0.6, ease: 'easeOut' }}
            className={`text-4xl md:text-6xl font-black ${w.color}`}
          >
            {w.text}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-700 text-xl md:text-2xl font-bold"
          >
            Every matrix is secretly just{' '}
            <span className="text-sky-500 underline decoration-wavy decoration-sky-300">
              3 moves.
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* But eigen only works on square */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-5 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-lg shadow-sm"
          >
            <p className="text-emerald-800 text-base md:text-lg font-semibold leading-relaxed">
              But eigenvalues only work on{' '}
              <span className="font-black underline decoration-emerald-500">square</span> matrices.
            </p>
            <p className="text-emerald-600 text-sm font-medium mt-1">
              What if the matrix is <strong>NOT</strong> square?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual hint: non-square shape */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            {/* Square */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="w-14 h-14 rounded-lg bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center"
            >
              <span className="text-emerald-600 text-xs font-bold">n×n</span>
            </motion.div>

            <span className="text-slate-400 text-2xl font-light">vs</span>

            {/* Rectangle (non-square) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
              className="w-24 h-14 rounded-lg bg-rose-100 border-2 border-rose-400 flex items-center justify-center relative overflow-hidden"
            >
              <span className="text-rose-600 text-xs font-bold">m×n</span>
              {/* Pulsing red glow to indicate "broken" */}
              <motion.div
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="absolute inset-0 bg-rose-400 rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final teaser */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-slate-400 text-sm font-medium italic">So we need something better...</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-black text-sky-600"
            >
              Meet SVD —
            </motion.p>
            <p className="text-slate-600 text-base md:text-lg font-semibold">
              the decomposition that works on{' '}
              <span className="text-cyan-500 font-black">everything.</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step dots progress indicator */}
      <div className="flex gap-2 mt-2">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <motion.div
            key={s}
            animate={{ scale: step >= s ? 1 : 0.6, opacity: step >= s ? 1 : 0.25 }}
            className={`w-2 h-2 rounded-full ${step >= s ? 'bg-sky-500' : 'bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  );
};
