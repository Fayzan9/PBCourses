import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Scenario {
  code: string;
  explanation: string;
  xTarget: string;
  yTarget: string;
}

export const Scene03_References: React.FC = () => {
  const scenarios: Scenario[] = [
    {
      code: `x = 42`,
      explanation: 'One variable points to one object.',
      xTarget: '42',
      yTarget: ''
    },
    {
      code: `x = 42\ny = x`,
      explanation: 'Both variables point to the SAME object.',
      xTarget: '42',
      yTarget: '42'
    }
  ];

  const [step, setStep] = useState(0);

  const current = scenarios[step];

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 2.3 · Python Memory Model
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Variables &{' '}
          <span className="text-indigo-600 font-serif italic">
            References
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Variables do not store objects. Variables reference objects.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Key Concept
            </div>

            <div className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <div>• Variables are names.</div>
              <div>• Objects live in memory.</div>
              <div>• Variables point to objects.</div>
              <div>• Multiple variables can point to the same object.</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Code
            </div>

            <pre className="mt-3 font-mono text-sm font-bold text-slate-800 whitespace-pre-wrap">
              {current.code}
            </pre>
          </div>

          <button
            onClick={() =>
              setStep(prev =>
                prev === scenarios.length - 1 ? 0 : prev + 1
              )
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {step === scenarios.length - 1
              ? '🔄 Restart'
              : '➡ Next Step'}
          </button>
        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Reference Visualization
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="flex items-center gap-12">

                {/* Variables */}
                <div className="flex flex-col gap-6">

                  <div className="w-28 h-20 rounded-2xl border-2 border-indigo-500 bg-white flex flex-col items-center justify-center">
                    <div className="text-xs text-slate-400 font-mono">
                      Variable
                    </div>

                    <div className="text-2xl font-black text-indigo-600">
                      x
                    </div>
                  </div>

                  {current.yTarget && (
                    <div className="w-28 h-20 rounded-2xl border-2 border-indigo-500 bg-white flex flex-col items-center justify-center">
                      <div className="text-xs text-slate-400 font-mono">
                        Variable
                      </div>

                      <div className="text-2xl font-black text-indigo-600">
                        y
                      </div>
                    </div>
                  )}
                </div>

                {/* Arrows */}
                <div className="flex flex-col gap-10 items-center">
                  <div className="text-4xl text-slate-300">→</div>

                  {current.yTarget && (
                    <div className="text-4xl text-slate-300">→</div>
                  )}
                </div>

                {/* Object */}
                <div className="w-44 h-36 rounded-3xl border-2 border-emerald-500 bg-white flex flex-col items-center justify-center">
                  <div className="text-xs text-slate-400 font-mono uppercase">
                    Python Object
                  </div>

                  <div className="text-4xl font-black text-emerald-600 mt-2">
                    42
                  </div>

                  <div className="text-sm text-slate-500 font-semibold mt-1">
                    int
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Takeaway
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              {current.explanation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene03_References;