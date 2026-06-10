import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene2_5_HigherDimensions: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      label: '2D: Two features',
      detail: 'Two movies. Each has an action score and a comedy score. We can plot them and measure the Pythagorean distance.',
      formula: 'd = \\sqrt{(B_x-A_x)^2 + (B_y-A_y)^2}',
      dims: ['Action', 'Comedy'],
      ex: 'd = \\sqrt{45^2 + 40^2} = 60.2',
    },
    {
      label: '3D: Add Drama',
      detail: 'Add a Drama score. Now each movie is a point in 3D space. We just extend the formula with one more term.',
      formula: 'd = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}',
      dims: ['Action', 'Comedy', 'Drama'],
      ex: 'd = \\sqrt{45^2 + 40^2 + 20^2} = 63.5',
    },
    {
      label: '100D: Real embeddings',
      detail: "ChatGPT's word embeddings have 1536 dimensions. Each dimension captures a subtle semantic feature. The formula just keeps adding terms.",
      formula: 'd = \\sqrt{\\sum_{i=1}^{n}(B_i - A_i)^2}',
      dims: ['Action', 'Comedy', 'Drama', '...', 'dim 100'],
      ex: 'd = \\sqrt{\\sum_{i=1}^{100}(B_i - A_i)^2}',
    },
  ];

  const maxStep = steps.length - 1;
  const s = steps[step];

  return (
    <SlideLayout
      title="Scale to Any Dimension"
      text="Euclidean distance extends naturally — just add more terms under the square root. Each new feature adds one more squared difference."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {steps.map((st, i) => (
            <div key={i} className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
              step === i  ? 'bg-white border-slate-300 shadow-sm'
              : step > i ? 'bg-emerald-50 border-emerald-200'
              :             'border-transparent text-slate-300'
            }`}>
              <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                step === i ? 'text-similarity' : step > i ? 'text-emerald-500' : 'text-slate-300'
              }`}>
                {step > i ? '✓' : `Step ${i + 1}`}
              </span>
              <span className={`font-medium ${step < i ? 'text-slate-300' : 'text-slate-600'}`}>{st.label}</span>
            </div>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-relaxed">{s.detail}</p>

          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(maxStep, s + 1))} disabled={step === maxStep}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-lg px-4">
        <div className="flex flex-wrap justify-center gap-2">
          {s.dims.map((d, i) => (
            <motion.span
              key={`${step}-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                d === '...' ? 'bg-slate-50 border-dashed border-slate-300 text-slate-400' :
                i < 2 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                i === 2 ? 'bg-violet-50 border-violet-200 text-violet-700' :
                'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              {d}
            </motion.span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-white border border-slate-200 rounded-2xl px-8 py-6 shadow-sm text-center flex flex-col gap-4 w-full"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Formula</span>
            <KaTeXMath tex={s.formula} block />
            <div className="border-t border-slate-100 pt-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">Example</span>
              <KaTeXMath tex={s.ex} block />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
};
export default Scene2_5_HigherDimensions;
