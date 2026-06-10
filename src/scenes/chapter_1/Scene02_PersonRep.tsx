import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene2_PersonRep: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1800);
    const t2 = setTimeout(() => setStep(2), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      {/* Left Column: Visual Silhouette (Scaled Up) */}
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-8 shadow-inner overflow-hidden relative">
        <svg viewBox="0 0 100 150" className="w-full h-full text-slate-400">
          <circle cx="50" cy="30" r="16" fill="currentColor" className="text-vector opacity-40" />
          <path d="M50 48 C35 48 30 75 30 110 L42 110 L45 145 L55 145 L58 110 L70 110 C70 75 65 48 50 48 Z" fill="currentColor" className="text-vector opacity-30" />
          
          {step >= 1 && (
            <g>
              {/* Height Callout */}
              <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="12" y1="14" x2="12" y2="146" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
              <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} x="18" y="80" fill="#0284C7" fontSize="8.5" className="font-bold rotate-90 origin-left">Height: 180cm</motion.text>
              
              {/* Weight Callout */}
              <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="30" y1="90" x2="70" y2="90" stroke="#7C3AED" strokeWidth="2" />
              <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} x="50" y="84" textAnchor="middle" fill="#7C3AED" fontSize="8.5" className="font-bold">Weight: 75kg</motion.text>
            </g>
          )}
        </svg>
      </div>

      {/* Right Column: Descriptions & Morphing */}
      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Can a person become numbers?</h2>
        
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          By taking measurements like height and weight, we capture their essential features.
        </p>

        <div className="h-24 flex items-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-400 font-mono text-base">
                Scanning attributes...
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-1 font-mono text-sm font-semibold text-slate-600">
                <div>Height: <span className="text-vector">180 cm</span></div>
                <div>Weight: <span className="text-transformations">75 kg</span></div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Vector representation</span>
                <div className="bg-slate-100 px-6 py-4 rounded-xl border border-slate-200 text-3xl font-mono text-center font-bold text-vector glow-vector">
                  [180, 75]
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
