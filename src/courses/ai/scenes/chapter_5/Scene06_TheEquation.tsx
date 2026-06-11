import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

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
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-6 shadow-inner gap-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold">
          The Eigenvector Equation
        </motion.p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="px-6 py-3 bg-rose-50 border-2 border-rose-200 rounded-2xl text-4xl font-black text-rose-600 font-mono">
            M·v
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-4xl font-black text-slate-400">=
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.7 }}
            className="px-6 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-4xl font-black text-emerald-600 font-mono">
            λ·v
          </motion.div>
        </div>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-3 max-w-md w-full">
              {[
                { label: 'M', desc: 'The matrix (a transformation)', color: '#E11D48', bg: 'bg-rose-50', border: 'border-rose-200' },
                { label: 'v', desc: 'The eigenvector (special direction)', color: '#7C3AED', bg: 'bg-violet-50', border: 'border-violet-200' },
                { label: 'λ', desc: 'The eigenvalue (how much it scales)', color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                { label: 'M·v = λ·v', desc: 'Matrix = just a number ×', color: '#0284C7', bg: 'bg-sky-50', border: 'border-sky-200' },
              ].map(item => (
                <div key={item.label} className={`${item.bg} border ${item.border} rounded-xl p-3`}>
                  <div className="font-mono font-black text-base mb-1" style={{ color: item.color }}>{item.label}</div>
                  <div className="text-slate-600 text-xs font-medium">{item.desc}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full lg:w-[280px] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <h2 className="text-2xl font-black text-slate-800 leading-tight mb-2">Prove It With Numbers</h2>
          <p className="text-slate-600 text-sm leading-relaxed">Watch both sides equal the same result — that's what makes v an eigenvector.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">The Matrix & Vector</div>
          <div className="font-mono text-xs flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold">M =</span>
              <KaTeXMath tex="\begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}" />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-slate-400 font-bold">v =</span>
              <KaTeXMath tex="\begin{pmatrix} 1 \\ 0 \end{pmatrix}" />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-slate-400 font-bold">\lambda =</span>
              <KaTeXMath tex="3" />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {step >= 1 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              className="bg-rose-50 border border-rose-200 rounded-2xl p-4 shadow-sm">
              <div className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold mb-2">Left side: M·v</div>
              <div className="font-mono text-xs text-slate-600 flex flex-col gap-1">
                <KaTeXMath tex="\begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 3 \times 1 + 1 \times 0 \\ 0 \times 1 + 2 \times 0 \end{pmatrix} = \begin{pmatrix} 3 \\ 0 \end{pmatrix}" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold mb-2">Right side: λ·v</div>
              <div className="font-mono text-xs text-slate-600">
                <KaTeXMath tex="3 \times \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 3 \\ 0 \end{pmatrix}" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-2xl p-4 text-center">
              <div className="text-white font-black text-base mb-1">
                <KaTeXMath tex="M\mathbf{v} = \lambda\mathbf{v} = \begin{pmatrix} 3 \\ 0 \end{pmatrix}" />
              </div>
              <div className="text-slate-400 text-xs font-medium">v = [1, 0] is an eigenvector of M with λ = 3</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
