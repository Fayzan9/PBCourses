import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene5_6_TheEquation: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-8 py-6 bg-white overflow-hidden">
      <div className="text-center mb-8 flex-shrink-0">
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold"
        >
          Chapter 5 · Section 5
        </motion.p>
        <h2 className="text-3xl font-black text-slate-800 mt-1">
          The Eigenvalue Equation
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          The fundamental relationship defining eigenvectors and eigenvalues.
        </p>
      </div>

      {/* Center stage equation display */}
      <div className="w-full flex-1 flex flex-col items-center justify-center gap-12 min-h-0">
        <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap select-none">
          {/* M * v */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="px-8 py-5 bg-rose-50 border-2 border-rose-200 rounded-2xl text-5xl md:text-6xl font-black text-rose-600 font-mono shadow-sm flex items-center justify-center gap-1"
          >
            <span className="text-rose-600">M</span>
            <span className="text-rose-300 font-normal">·</span>
            <span className="text-violet-600">v</span>
          </motion.div>

          {/* Equal Sign */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-400"
          >
            =
          </motion.div>

          {/* λ * v */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.8 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="px-8 py-5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-5xl md:text-6xl font-black text-emerald-600 font-mono shadow-sm flex items-center justify-center gap-1"
          >
            <span className="text-emerald-600">λ</span>
            <span className="text-emerald-300 font-normal">·</span>
            <span className="text-violet-600">v</span>
          </motion.div>
        </div>

        {/* Core Definitions Grid */}
        <div className="w-full max-w-3xl">
          <AnimatePresence>
            {step >= 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  { label: 'M', title: 'The Matrix', desc: 'A linear transformation that stretches, rotates, or shears vectors in space.', color: '#E11D48', bg: 'bg-rose-50/70', border: 'border-rose-100' },
                  { label: 'v', title: 'The Eigenvector', desc: 'A special, non-zero direction that does not change its line/axis of direction during transformation.', color: '#7C3AED', bg: 'bg-violet-50/70', border: 'border-violet-100' },
                  { label: 'λ', title: 'The Eigenvalue', desc: 'The scaling factor (magnitude multiplier) along the eigenvector direction.', color: '#059669', bg: 'bg-emerald-50/70', border: 'border-emerald-100' },
                  { label: 'M·v = λ·v', title: 'The Miracle', desc: 'Applying a complex matrix transformation yields the exact same result as multiplying by a simple scalar number.', color: '#0284C7', bg: 'bg-sky-50/70', border: 'border-sky-100' },
                ].map(item => (
                  <div key={item.label} className={`${item.bg} border ${item.border} rounded-2xl p-5 shadow-sm transition-all hover:shadow-md`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-black text-2xl" style={{ color: item.color }}>{item.label}</span>
                      <span className="text-sm font-bold text-slate-800">{item.title}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Scene5_6_TheEquation;
