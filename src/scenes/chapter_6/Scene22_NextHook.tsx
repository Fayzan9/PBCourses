import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Scene6_22_NextHook: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1100),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 2900),
      setTimeout(() => setStep(5), 3700),
      setTimeout(() => setStep(6), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-6 relative overflow-hidden">
      {/* Background glow orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(14,165,233,0.12) 0%, rgba(6,182,212,0.06) 50%, transparent 80%)',
        }}
      />
      {/* Secondary amber glow (teaser for ch7) */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 75%, rgba(251,191,36,0.10) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Chapter 6 complete badge */}
      {step >= 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg shadow-sky-200"
        >
          <span className="text-base">✓</span>
          <span>SVD Complete</span>
          <span className="bg-sky-400 rounded-full px-2 py-0.5 text-xs">Chapter 6</span>
        </motion.div>
      )}

      {/* Main statement */}
      {step >= 2 && (
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight"
        >
          You now know how to{' '}
          <span className="text-sky-500">decompose</span> any matrix.
        </motion.h1>
      )}

      {/* Transition line */}
      {step >= 3 && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-slate-600 font-medium"
        >
          But AI does something even{' '}
          <span className="text-amber-500 font-bold">weirder.</span>
        </motion.p>
      )}

      {/* Amber teaser card */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-left max-w-xl w-full shadow-md relative overflow-hidden"
        >
          {/* Subtle amber glow inside card */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251,191,36,0.15) 0%, transparent 70%)',
            }}
          />
          <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-3">
            Coming Up in Chapter 7
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            An AI that gets the wrong answer doesn't just fail —
          </p>
          <p className="text-slate-800 font-semibold text-base mt-1 mb-2">
            it measures{' '}
            <span className="text-amber-600">EXACTLY how wrong it was.</span>
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            And uses that number to get better. Every. Single. Time.
          </p>
        </motion.div>
      )}

      {/* Three teaser badges */}
      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          {[
            { label: 'Loss Functions', icon: '📉' },
            { label: 'MSE', icon: '📐' },
            { label: 'Cross-Entropy', icon: '🎯' },
          ].map(({ label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 280, damping: 22 }}
              className="flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
            >
              <span>{icon}</span>
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Next chapter CTA */}
      {step >= 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg shadow-amber-100">
            Chapter 7: Probability & Distributions →
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Coming up: why AI speaks in probabilities, not answers.
          </p>
        </motion.div>
      )}

      {/* Decorative floating dots */}
      <div className="absolute top-8 left-8 pointer-events-none opacity-30">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-sky-400 rounded-full absolute"
            style={{ left: i * 14, top: i * 10 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: i * 0.3 }}
          />
        ))}
      </div>
      <div className="absolute bottom-12 right-8 pointer-events-none opacity-30">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-amber-400 rounded-full absolute"
            style={{ right: i * 14, bottom: i * 10 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 + i * 0.4, delay: i * 0.4 }}
          />
        ))}
      </div>
    </div>
  );
};
