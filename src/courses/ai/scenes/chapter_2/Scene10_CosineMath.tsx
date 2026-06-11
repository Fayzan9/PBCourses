import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene2_10_CosineMath: React.FC = () => {
  const [step, setStep] = useState(0);

  const vecA = [40, 35];
  const vecB = [70, 20];
  const dotVal = vecA[0] * vecB[0] + vecA[1] * vecB[1];
  const mA = Math.sqrt(vecA[0] ** 2 + vecA[1] ** 2);
  const mB = Math.sqrt(vecB[0] ** 2 + vecB[1] ** 2);
  const cosV = dotVal / (mA * mB);

  const steps = [
    { label: 'Start', detail: 'We have A = [40, 35] and B = [70, 20]. We want to know how similar their directions are.' },
    { label: 'Compute Dot Product', detail: `Multiply matching coordinates and sum: 40×70 + 35×20 = 2800 + 700 = ${dotVal}.` },
    { label: 'Compute Magnitudes', detail: `|A| = √(40²+35²) = ${mA.toFixed(2)}, |B| = √(70²+20²) = ${mB.toFixed(2)}. This is the "length" of each vector.` },
    { label: 'Divide to Normalize', detail: `cos θ = dot / (|A| × |B|) = ${dotVal} / (${mA.toFixed(1)} × ${mB.toFixed(1)}) = ${cosV.toFixed(3)}.` },
    { label: 'Interpret!', detail: `${cosV.toFixed(3)} means cos θ ≈ ${cosV.toFixed(3)} → angle ≈ ${(Math.acos(cosV) * 180 / Math.PI).toFixed(0)}°. The vectors are quite similar in direction.` },
  ];

  const maxStep = steps.length - 1;

  return (
    <SlideLayout
      title="The Normalization Trick"
      text="Dividing by the magnitudes cancels out scale completely. You're left with a pure angle measure between −1 and +1."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
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
              <span className={`font-medium ${step < i ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</span>
            </div>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-relaxed">{steps[step].detail}</p>

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
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-lg px-4">
        <div className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-6 shadow-sm">
          <div className="text-center mb-4">
            <KaTeXMath tex={`\\text{cos}(\\theta) = \\frac{A \\cdot B}{\\|A\\| \\cdot \\|B\\|}`} block />
          </div>

          <AnimatePresence>
            {step >= 1 && (
              <motion.div key="dot" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-2">
                <span className="text-xs font-bold text-rose-700">A · B (numerator)</span>
                <span className="font-black text-rose-600 font-mono">{dotVal}</span>
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div key="mags" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 mb-2">
                <span className="text-xs font-bold text-sky-700">|A| × |B| (denominator)</span>
                <span className="font-black text-sky-600 font-mono">{(mA * mB).toFixed(1)}</span>
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div key="cos" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-3">
                <span className="text-xs font-bold text-emerald-700">cos θ (similarity)</span>
                <span className="font-black text-emerald-600 font-mono text-xl">{cosV.toFixed(3)}</span>
              </motion.div>
            )}
            {step >= 4 && (
              <motion.div key="angle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 mt-2">
                <KaTeXMath tex={`\\theta = \\arccos(${cosV.toFixed(3)}) \\approx ${(Math.acos(cosV) * 180 / Math.PI).toFixed(0)}°`} />
              </motion.div>
            )}
          </AnimatePresence>

          {step === 0 && (
            <div className="text-center text-slate-400 text-sm font-medium mt-2 border border-dashed border-slate-200 rounded-xl py-4">
              Press Next to walk through →
            </div>
          )}
        </div>

        {step >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-amber-700 block mb-1">Key insight</span>
            Even if you scale A to [400, 350] or B to [7000, 2000], the magnitudes scale proportionally — the ratio stays the same. Cosine similarity doesn't change.
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};
