import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene4_16_OneNeuron: React.FC = () => {
  const [step, setStep] = useState(0);

  const weights = [0.5, 0.8];
  const input   = [3, 2];
  const bias    = 0.5;
  const weighted = weights[0] * input[0] + weights[1] * input[1];
  const output   = weighted + bias;

  return (
    <SlideLayout
      title="Start With One Neuron"
      text="Before looking at a full layer, let's understand one neuron. It does exactly three things: multiply each input by a weight, sum them up, then add a bias."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {[
            { label: 'Step 1: Weighted sum', detail: `Multiply each input by its weight and sum: ${weights[0]}×${input[0]} + ${weights[1]}×${input[1]} = ${weighted}` },
            { label: 'Step 2: Add bias',     detail: `Add the bias term to shift the result: ${weighted} + ${bias} = ${output.toFixed(1)}` },
            { label: "That's it!",           detail: "This single number is the neuron's output. A full layer just runs this for every neuron at once." },
          ].map((s, i) => (
            <div key={i} className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
              step === i + 1 ? 'bg-white border-slate-300 shadow-sm'
              : step > i + 1  ? 'bg-emerald-50 border-emerald-200'
              : 'border-transparent text-slate-300'
            }`}>
              <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                step === i + 1 ? 'text-transformations' : step > i + 1 ? 'text-emerald-500' : 'text-slate-300'
              }`}>
                {step > i + 1 ? '✓' : `Step ${i + 1}`}
              </span>
              <span className={`font-medium ${step < i + 1 ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</span>
              {step === i + 1 && <p className="text-slate-500 mt-1">{s.detail}</p>}
            </div>
          ))}

          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={step === 3}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md">
        <div className="flex items-center gap-8 w-full justify-center">
          <div className="flex flex-col gap-3">
            {input.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-sky-50 border border-sky-200 rounded-xl px-5 py-3 text-sky-700 font-black text-xl font-mono">
                  {v}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">x{i + 1}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 items-center">
            {weights.map((w, i) => (
              <div key={i} className={`text-xs font-mono font-bold transition-all ${
                step === 1 ? 'text-rose-500' : 'text-slate-400'
              }`}>
                w{i + 1} = {w} ──
              </div>
            ))}
          </div>

          <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all ${
            step === 1 ? 'bg-rose-50   border-rose-300'
            : step === 2 ? 'bg-violet-50 border-violet-300'
            : step === 3 ? 'bg-emerald-50 border-emerald-300'
            : 'bg-slate-50 border-slate-200'
          }`}>
            <AnimatePresence mode="wait">
              {step === 0 && <span key="q" className="text-2xl text-slate-300 font-black">?</span>}
              {step === 1 && <motion.span key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black text-rose-600 font-mono">{weighted}</motion.span>}
              {step === 2 && <motion.span key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black text-violet-600 font-mono">{output.toFixed(1)}</motion.span>}
              {step === 3 && <motion.span key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base font-black text-emerald-600 font-mono">{output.toFixed(1)} ✓</motion.span>}
            </AnimatePresence>
          </div>

          <div className={`px-5 py-3 rounded-xl border font-black text-xl font-mono transition-all ${
            step >= 2 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-dashed border-slate-200 text-slate-200'
          }`}>
            {step >= 2 ? output.toFixed(1) : '?'}
          </div>
        </div>

        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-violet-50 border border-violet-200 rounded-xl px-6 py-3 text-sm font-medium text-slate-600 text-center">
            <span className="font-bold text-violet-700">+ bias {bias}</span> — a constant that shifts the output up or down, giving the neuron more flexibility
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};
export default Scene4_16_OneNeuron;
