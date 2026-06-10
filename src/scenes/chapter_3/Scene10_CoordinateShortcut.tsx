import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';
import { fmt, mag2, dot2 } from '../../components/mathHelpers';

type Vec2 = [number, number];

export const Scene3_10_CoordinateShortcut: React.FC = () => {
  const [step, setStep] = useState(0);

  const vecA: Vec2 = [3, 2];
  const vecB: Vec2 = [4, 1];
  const prodX = vecA[0] * vecB[0];
  const prodY = vecA[1] * vecB[1];
  const total  = prodX + prodY;

  const stepInfo = [
    { label: 'Start',         detail: 'We have A = [3, 2] and B = [4, 1]. We want the dot product — no angle needed.' },
    { label: 'Multiply X',    detail: `Take the x-coordinate of each vector and multiply: ${vecA[0]} × ${vecB[0]} = ${prodX}. This captures agreement along the horizontal.` },
    { label: 'Multiply Y',    detail: `Now the y-coordinates: ${vecA[1]} × ${vecB[1]} = ${prodY}. This captures agreement along the vertical.` },
    { label: 'Add them up',   detail: `Sum both products: ${prodX} + ${prodY} = ${total}. Done — that's the dot product.` },
    { label: 'Verify!',       detail: `|A||B|cos(θ) = ${fmt(mag2(vecA))} × ${fmt(mag2(vecB))} × ${fmt(dot2(vecA,vecB) / (mag2(vecA)*mag2(vecB)))} ≈ ${total}. Both methods give the same answer.` },
  ];

  const maxStep = stepInfo.length - 1;

  return (
    <SlideLayout
      title="No Angle Needed"
      text="The dot product can be computed directly from coordinates: multiply matching pairs and add them up. No trigonometry required."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {stepInfo.map((s, i) => (
            <div key={i} className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
              step === i        ? 'bg-white border-slate-300 shadow-sm'
              : step > i       ? 'bg-emerald-50 border-emerald-200'
              : 'border-transparent text-slate-300'
            }`}>
              <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                step === i ? 'text-similarity' : step > i ? 'text-emerald-500' : 'text-slate-300'
              }`}>
                {step > i ? '✓' : `Step ${i + 1}`}
              </span>
              <span className={`font-medium ${step < i ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</span>
            </div>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-relaxed">{stepInfo[step].detail}</p>

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
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-lg">
        <div className="flex gap-8 font-mono">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Vector A</span>
            <div className={`flex gap-3 px-6 py-4 rounded-2xl border-2 transition-all ${
              step >= 1 ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
            }`}>
              {vecA.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[9px] text-slate-400">{['x','y'][i]}</span>
                  <span className={`text-3xl font-black ${step >= 1 ? 'text-rose-600' : 'text-slate-700'}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center text-3xl font-black text-slate-300">·</div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Vector B</span>
            <div className={`flex gap-3 px-6 py-4 rounded-2xl border-2 transition-all ${
              step >= 1 ? 'bg-sky-50 border-sky-300' : 'bg-slate-50 border-slate-200'
            }`}>
              {vecB.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[9px] text-slate-400">{['x','y'][i]}</span>
                  <span className={`text-3xl font-black ${step >= 1 ? 'text-sky-600' : 'text-slate-700'}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 font-mono text-sm">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div key="sx" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-xl px-5 py-3">
                <span className="text-rose-700 font-bold">X parts:  {vecA[0]} × {vecB[0]}</span>
                <span className="text-rose-800 font-black text-lg">= {prodX}</span>
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div key="sy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-sky-50 border border-sky-200 rounded-xl px-5 py-3">
                <span className="text-sky-700 font-bold">Y parts:  {vecA[1]} × {vecB[1]}</span>
                <span className="text-sky-800 font-black text-lg">= {prodY}</span>
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div key="stot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl px-5 py-3">
                <span className="text-emerald-700 font-bold">Total: {prodX} + {prodY}</span>
                <span className="text-emerald-800 font-black text-2xl">= {total}</span>
              </motion.div>
            )}
            {step >= 4 && (
              <motion.div key="sverify" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center bg-violet-50 border border-violet-200 rounded-xl px-5 py-3 gap-3">
                <span className="text-violet-600 font-bold text-sm">|A||B|cos θ</span>
                <span className="text-slate-400">=</span>
                <span className="text-violet-800 font-black text-xl">{total} ✓</span>
              </motion.div>
            )}
          </AnimatePresence>

          {step === 0 && (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl px-5 py-4 text-center text-slate-400 text-sm font-medium">
              Press Next to walk through the calculation →
            </div>
          )}
        </div>
      </div>
    </SlideLayout>
  );
};
