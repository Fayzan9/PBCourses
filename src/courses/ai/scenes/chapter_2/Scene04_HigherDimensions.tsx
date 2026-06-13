import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene2_4_HigherDimensions: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      label: '2D',
      subtitle: 'Two Features',
      formula: 'd = \\sqrt{(B_x-A_x)^2 + (B_y-A_y)^2}',
      example: '60.2',
      dimensions: ['Action', 'Comedy'],
      accent: 'from-emerald-500 to-emerald-400',
    },
    {
      label: '3D',
      subtitle: 'Add Drama',
      formula: 'd = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}',
      example: '63.5',
      dimensions: ['Action', 'Comedy', 'Drama'],
      accent: 'from-violet-500 to-violet-400',
    },
    {
      label: '1536D',
      subtitle: 'Real Embeddings',
      formula: 'd = \\sqrt{\\sum_{i=1}^{n}(B_i - A_i)^2}',
      example: '\\sqrt{\\sum_{i=1}^{1536}(B_i - A_i)^2}',
      dimensions: ['Action', 'Comedy', 'Drama', '...', '1536'],
      accent: 'from-slate-700 to-slate-500',
    },
  ];

  const current = steps[step];
  const maxStep = steps.length - 1;

  return (
    <SlideLayout
      title="Distance Scales Naturally"
      text="More dimensions. Same idea."
      sidebarContent={
        <div className="flex flex-col h-full justify-between gap-6">
          <div className="space-y-3">
            {steps.map((item, index) => {
              const active = step === index;

              return (
                <button
                  key={index}
                  onClick={() => setStep(index)}
                  className={`w-full text-left rounded-2xl border transition-all cursor-pointer ${
                    active
                      ? 'bg-white border-slate-300 shadow-md'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xl font-black ${
                          active ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {item.label}
                      </span>

                      {active && (
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                      )}
                    </div>

                    <div
                      className={`text-xs font-medium mt-1 ${
                        active ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Back
            </button>

            <button
              onClick={() => setStep((s) => Math.min(maxStep, s + 1))}
              disabled={step === maxStep}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 px-6">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 flex-wrap justify-center"
        >
          {current.dimensions.map((dim, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                dim === '...'
                  ? 'border-dashed border-slate-300 text-slate-400 bg-slate-50'
                  : index < 2
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : index === 2
                      ? 'bg-violet-50 border-violet-200 text-violet-700'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              {dim}
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              <div
                className={`h-1.5 bg-gradient-to-r ${current.accent}`}
              />

              <div className="p-10 flex flex-col items-center gap-8">
                <div className="text-center">
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">
                    Euclidean Distance
                  </div>

                  <h3 className="mt-2 text-3xl font-black text-slate-900">
                    {current.label}
                  </h3>
                </div>

                <div className="text-center">
                  <KaTeXMath tex={current.formula} block />
                </div>

                <div className="w-full max-w-xs border-t border-slate-100 pt-6">
                  <div className="text-center">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Example Distance
                    </div>

                    <div className="text-3xl font-black text-slate-900">
                      <KaTeXMath tex={current.example} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
};

export default Scene2_4_HigherDimensions;