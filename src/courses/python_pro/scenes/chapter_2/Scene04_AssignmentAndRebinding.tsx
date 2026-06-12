import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

interface State {
  title: string;
  code: string;
  xTarget: string;
  yTarget: string;
  explanation: string;
}

export const Scene04_AssignmentAndRebinding: React.FC = () => {
  const states: State[] = [
    {
      title: 'Step 1',
      code: `x = 10`,
      xTarget: '10',
      yTarget: '',
      explanation: 'x points to the object 10.'
    },
    {
      title: 'Step 2',
      code: `x = 10\ny = x`,
      xTarget: '10',
      yTarget: '10',
      explanation: 'Both variables reference the same object.'
    },
    {
      title: 'Step 3',
      code: `x = 10\ny = x\nx = 20`,
      xTarget: '20',
      yTarget: '10',
      explanation: 'x is rebound to a new object. y still points to 10.'
    }
  ];

  const [step, setStep] = useState(0);

  const current = states[step];

  const nextStep = () => {
    setStep(prev =>
      prev === states.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 2.4 · Python Memory Model
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Assignment &{' '}
          <span className="text-indigo-600 font-serif italic">
            Rebinding
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Reassigning a variable does not change other variables that
          reference an older object.
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
              <div>• Assignment creates references.</div>
              <div>• Variables can be rebound.</div>
              <div>• Objects are separate from variables.</div>
              <div>• Rebinding one variable does not affect another.</div>
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
            onClick={nextStep}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {step === states.length - 1
              ? '🔄 Restart'
              : '➡ Next Step'}
          </button>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Takeaway
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              {current.explanation}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Memory State
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="flex items-center gap-16">

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

                  <div className="text-4xl text-slate-300">
                    →
                  </div>

                  {current.yTarget && (
                    <div className="text-4xl text-slate-300">
                      →
                    </div>
                  )}

                </div>

                {/* Objects */}
                <div className="flex flex-col gap-6">

                  <div className="w-40 h-24 rounded-2xl border-2 border-emerald-500 bg-white flex flex-col items-center justify-center">
                    <div className="text-xs text-slate-400 font-mono uppercase">
                      Object
                    </div>

                    <div className="text-3xl font-black text-emerald-600">
                      {current.xTarget}
                    </div>
                  </div>

                  {step === 2 && (
                    <div className="w-40 h-24 rounded-2xl border-2 border-orange-500 bg-white flex flex-col items-center justify-center">
                      <div className="text-xs text-slate-400 font-mono uppercase">
                        Object
                      </div>

                      <div className="text-3xl font-black text-orange-600">
                        10
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quiz */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Predict
            </div>

            <pre className="mt-2 text-xs font-mono text-slate-700">
{`x = 10
y = x
x = 20

print(y)`}
            </pre>

            <div className="mt-3 text-lg font-black text-indigo-600">
              Answer: 10
            </div>
          </div>

        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene04_AssignmentAndRebinding;