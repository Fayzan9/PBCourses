import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';
import { mulMV } from '../../components/mathHelpers';

type Mat2 = [[number, number], [number, number]];

export const Scene4_11_MatrixVectorRecipe: React.FC = () => {
  const [step, setStep] = useState(0);
  const M: Mat2 = [[2, 1], [0, 3]];
  const v: [number, number] = [3, 2];
  const result = mulMV(M, v);
  const maxStep = 3;

  const stepInfo = [
    { label: 'Start', detail: 'We have a matrix M and an input point [3, 2]. We want to find where it lands after the transformation.' },
    { label: 'Top row', detail: `Row 1 of M is [2, 1]. Dot with [3, 2]: 2×3 + 1×2 = ${result[0]}. This gives the new x-coordinate.` },
    { label: 'Bottom row', detail: `Row 2 of M is [0, 3]. Dot with [3, 2]: 0×3 + 3×2 = ${result[1]}. This gives the new y-coordinate.` },
    { label: 'Done!', detail: `The point [3, 2] has moved to [${result[0]}, ${result[1]}]. Two dot products. One transformation.` },
  ];

  return (
    <SlideLayout
      title="The Recipe"
      text="To find where a point lands after a matrix transformation, you run one dot product per row. You're in control of the pace — press Next when ready."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {stepInfo.map((s, i) => (
            <div
              key={i}
              className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
                step === i
                  ? 'bg-white border-slate-300 shadow-sm'
                  : step > i
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-transparent text-slate-300'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                step === i ? 'text-transformations' : step > i ? 'text-emerald-500' : 'text-slate-300'
              }`}>
                {step > i ? '✓' : `Step ${i + 1}`}
              </span>
              <span className={step < i ? 'text-slate-300' : 'text-slate-600 font-medium'}>{s.label}</span>
            </div>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-relaxed">{stepInfo[step].detail}</p>

          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(s => Math.min(maxStep, s + 1))}
              disabled={step === maxStep}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-lg">
        <div className="flex items-center gap-5 font-mono select-none">
          <div className="flex flex-col gap-2">
            {M.map((row, ri) => (
              <div key={ri} className={`flex gap-4 px-5 py-3 rounded-xl border transition-all ${
                step === ri + 1 ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
              }`}>
                {row.map((val, ci) => (
                  <span key={ci} className={`text-2xl font-black w-6 text-center ${
                    step === ri + 1 ? 'text-rose-600' : 'text-slate-700'
                  }`}>
                    {val}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <span className="text-3xl font-black text-slate-300">×</span>

          <div className="flex flex-col gap-2">
            {v.map((val, i) => (
              <div key={i} className={`px-5 py-3 rounded-xl border text-center transition-all ${
                step === 1 || step === 2 ? 'bg-sky-50 border-sky-300' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-2xl font-black ${
                  step === 1 || step === 2 ? 'text-sky-600' : 'text-slate-700'
                }`}>{val}</span>
              </div>
            ))}
          </div>

          <span className="text-3xl font-black text-slate-300">=</span>

          <div className="flex flex-col gap-2">
            {result.map((val, i) => (
              <div key={i} className={`px-5 py-3 rounded-xl border text-center min-w-[60px] transition-all ${
                step === 3
                  ? 'bg-emerald-50 border-emerald-300'
                  : step === i + 1
                  ? 'bg-violet-50 border-violet-300'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <AnimatePresence mode="wait">
                  {step >= i + 1 ? (
                    <motion.span key="v" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                      className={`text-2xl font-black block ${step === 3 ? 'text-emerald-600' : 'text-violet-600'}`}>
                      {val}
                    </motion.span>
                  ) : (
                    <span key="q" className="text-2xl font-black text-slate-200">?</span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-4 font-mono text-center w-full text-sm"
          >
            {step === 0 && <span className="text-slate-400 font-bold">Press "Next" to walk through the calculation →</span>}
            {step === 1 && <span className="text-rose-600 font-bold">Row 1 · input = 2×3 + 1×2 = <span className="text-violet-600">{result[0]}</span></span>}
            {step === 2 && <span className="text-rose-600 font-bold">Row 2 · input = 0×3 + 3×2 = <span className="text-violet-600">{result[1]}</span></span>}
            {step === 3 && <span className="text-emerald-600 font-black text-base">[3, 2] → [{result.join(', ')}] ✓</span>}
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
};
export default Scene4_11_MatrixVectorRecipe;
