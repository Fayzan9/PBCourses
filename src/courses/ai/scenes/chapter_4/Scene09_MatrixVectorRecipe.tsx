import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';
import { mulMV } from '../../components/mathHelpers';

type Mat2 = [[number, number], [number, number]];

interface Preset {
  name: string;
  label: string;
  matrix: Mat2;
  vector: [number, number];
  description: string;
}

const PRESETS: Preset[] = [
  {
    name: 'Scale',
    label: '🔍 Scale Example (2x)',
    matrix: [[2, 0], [0, 2]],
    vector: [3, 2],
    description: 'Every point stretches outwards from the origin by a factor of 2. The diagonal contains the scaling factor.',
  },
  {
    name: 'Rotation',
    label: '🔄 Rotation Example (90°)',
    matrix: [[0, -1], [1, 0]],
    vector: [3, 2],
    description: 'Spins space 90° counter-clockwise. The coordinates switch roles, and the y-axis direction is inverted.',
  },
  {
    name: 'Shear',
    label: '📐 Shear Example (Tilt)',
    matrix: [[1, 1.5], [0, 1]],
    vector: [3, 2],
    description: 'Slants the grid horizontally. The tilt factor (1.5) is multiplied by the vertical coordinate.',
  },
];

export const Scene4_9_MatrixVectorRecipe: React.FC = () => {
  const [activePresetIdx, setActivePresetIdx] = useState(0);
  const [step, setStep] = useState(0);

  const preset = PRESETS[activePresetIdx];
  const M = preset.matrix;
  const v = preset.vector;
  const result = mulMV(M, v);
  const maxStep = 3;

  const handlePresetChange = (idx: number) => {
    setActivePresetIdx(idx);
    setStep(0);
  };

  const stepInfo = [
    { label: 'Start', detail: `We want to transform the point [${v.join(', ')}] using a ${preset.name.toLowerCase()} matrix.` },
    { label: 'Top row', detail: `Row 1 of M is [${M[0].join(', ')}]. Dot with [${v.join(', ')}]: ${M[0][0]}×${v[0]} + ${M[0][1]}×${v[1]} = ${result[0]}.` },
    { label: 'Bottom row', detail: `Row 2 of M is [${M[1].join(', ')}]. Dot with [${v.join(', ')}]: ${M[1][0]}×${v[0]} + ${M[1][1]}×${v[1]} = ${result[1]}.` },
    { label: 'Done!', detail: `The point [${v.join(', ')}] has moved to [${result.join(', ')}]. Two dot products completed.` },
  ];

  return (
    <SlideLayout
      title="The Recipe"
      text="To find where a point lands after a matrix transformation, you run one dot product per row. Try stepping through different types of transformations."
      sidebarContent={
        <div className="flex flex-col gap-4 justify-between h-full">
          <div className="space-y-4">
            {/* Preset Selector */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Choose Transformation</span>
              {PRESETS.map((p, idx) => (
                <button
                  key={p.name}
                  onClick={() => handlePresetChange(idx)}
                  className={`w-full px-3 py-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    activePresetIdx === idx
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Step Walkthrough List */}
            <div className="space-y-2">
              {stepInfo.map((s, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-xl border text-xs transition-all ${
                    step === i
                      ? 'bg-white border-slate-300 shadow-sm'
                      : step > i
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-transparent text-slate-300'
                  }`}
                >
                  <span className={`text-[9px] uppercase tracking-wider font-black block mb-0.5 ${
                    step === i ? 'text-transformations' : step > i ? 'text-emerald-500' : 'text-slate-300'
                  }`}>
                    {step > i ? '✓' : `Step ${i + 1}`}
                  </span>
                  <span className={step < i ? 'text-slate-300' : 'text-slate-600 font-medium'}>{s.label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 font-medium leading-relaxed px-1">
              {stepInfo[step].detail}
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 leading-relaxed">
              <strong>About {preset.name}:</strong> {preset.description}
            </div>

            <div className="flex gap-2">
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
        </div>
      }
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-lg">
        <div className="flex items-center gap-5 font-mono select-none">
          {/* Matrix column space with x/y headers */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 px-5 justify-between text-sm font-bold text-slate-400">
              <span className="w-6 text-center">x</span>
              <span className="w-6 text-center">y</span>
            </div>
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

          <span className="text-3xl font-black text-slate-300 mt-5">×</span>

          {/* Vector input with x/y row labels */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-bold text-slate-400 text-center">
              vec
            </div>
            {v.map((val, i) => (
              <div key={i} className={`px-5 py-3 rounded-xl border text-center relative transition-all ${
                step === 1 || step === 2 ? 'bg-sky-50 border-sky-300' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  {i === 0 ? 'x' : 'y'}
                </span>
                <span className={`text-2xl font-black ${
                  step === 1 || step === 2 ? 'text-sky-600' : 'text-slate-700'
                }`}>{val}</span>
              </div>
            ))}
          </div>

          <span className="text-3xl font-black text-slate-300 mt-5">=</span>

          {/* Result output with x/y row labels */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-bold text-slate-400 text-center">
              out
            </div>
            {result.map((val, i) => (
              <div key={i} className={`px-5 py-3 rounded-xl border text-center min-w-[60px] relative transition-all ${
                step === 3
                  ? 'bg-emerald-50 border-emerald-300'
                  : step === i + 1
                  ? 'bg-violet-50 border-violet-300'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  {i === 0 ? 'x' : 'y'}
                </span>
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
            key={`${activePresetIdx}-${step}`}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6 font-mono text-center w-full text-xl"
          >
            {step === 0 && <span className="text-slate-400 font-bold">Press "Next" to walk through the calculation →</span>}
            {step === 1 && <span className="text-rose-600 font-bold">Row 1 · input = {M[0][0]}×{v[0]} + {M[0][1]}×{v[1]} = <span className="text-violet-600 font-black">{result[0]}</span></span>}
            {step === 2 && <span className="text-rose-600 font-bold">Row 2 · input = {M[1][0]}×{v[0]} + {M[1][1]}×{v[1]} = <span className="text-violet-600 font-black">{result[1]}</span></span>}
            {step === 3 && <span className="text-emerald-600 font-black text-2xl">[{v.join(', ')}] → [{result.join(', ')}] ✓</span>}
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
};

export default Scene4_9_MatrixVectorRecipe;
