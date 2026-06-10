import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene5_11_CharacteristicEquation: React.FC = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  return (
    <div className="flex flex-col items-center justify-start h-full max-w-3xl mx-auto px-6 py-4 gap-6 overflow-y-auto">
      <div className="text-center">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">The Math</p>
        <h2 className="text-3xl font-black text-slate-800">Finding Eigenvalues</h2>
      </div>

      <div className="w-full flex flex-col gap-3">
        {[
          {
            label: 'Start with the equation',
            content: <KaTeXMath tex="M \mathbf{v} = \lambda \mathbf{v}" />,
            note: 'We want v ≠ 0',
          },
          {
            label: 'Rearrange',
            content: <KaTeXMath tex="M \mathbf{v} - \lambda \mathbf{v} = \mathbf{0}" />,
            note: 'Move everything to the left',
          },
          {
            label: 'Factor out v',
            content: <KaTeXMath tex="(M - \lambda I)\mathbf{v} = \mathbf{0}" />,
            note: 'I is the identity matrix',
          },
          {
            label: 'Non-trivial solution requires',
            content: <KaTeXMath tex="\det(M - \lambda I) = 0" />,
            note: 'If det ≠ 0, only v = 0 is a solution',
          },
          {
            label: 'Solve the characteristic polynomial',
            content: <KaTeXMath tex="\lambda^2 - \text{tr}(M)\lambda + \det(M) = 0" />,
            note: 'For 2×2 matrices — roots are your eigenvalues!',
          },
        ].map((row, i) => (
          <AnimatePresence key={i}>
            {step >= i && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wide">{row.label}</div>
                  <div className="text-xl font-mono">{row.content}</div>
                  <div className="text-xs text-slate-400 mt-1 italic">{row.note}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <div className="flex gap-2">
        {step < totalSteps - 1 ? (
          <button
            onClick={() => setStep(s => Math.min(s + 1, totalSteps - 1))}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all cursor-pointer active:scale-95"
          >
            Next Step →
          </button>
        ) : (
          <div className="px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-bold text-sm">
            ✓ That's the full derivation!
          </div>
        )}
        {step > 0 && (
          <button
            onClick={() => setStep(0)}
            className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
