import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene03_CreatingAFunction: React.FC = () => {
  const [step, setStep] = useState(0);

  const stages = [
    {
      title: 'Step 1',
      subtitle: 'Start With def',
      code: `def`,
      explanation:
        'Every function starts with the keyword "def". This tells Python we are defining a function.'
    },
    {
      title: 'Step 2',
      subtitle: 'Add A Name',
      code: `def show_banner`,
      explanation:
        'Choose a descriptive name. The name becomes the command we can use later.'
    },
    {
      title: 'Step 3',
      subtitle: 'Add Parentheses',
      code: `def show_banner()`,
      explanation:
        'Parentheses hold inputs (parameters). For now they are empty.'
    },
    {
      title: 'Step 4',
      subtitle: 'Add Colon',
      code: `def show_banner():`,
      explanation:
        'The colon tells Python the function body starts next.'
    },
    {
      title: 'Step 5',
      subtitle: 'Add The Body',
      code: `def show_banner():
    print("Welcome")
    print("----------")`,
      explanation:
        'Indented lines belong to the function. These lines run whenever the function is called.'
    }
  ];

  const current = stages[step];

  return (
    <SceneLayout gap="gap-4">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 6.3 · Creating Your Own Commands
        </span>

        <h2 className="text-3xl font-extrabold text-slate-800 mt-1">
          Creating A{' '}
          <span className="text-indigo-600 font-serif italic">
            Function
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          Let's build a function piece by piece and see exactly how a
          function definition is created.
        </p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex justify-between">
              <div className="text-xs font-mono uppercase font-bold text-slate-400">
                Construction Progress
              </div>

              <div className="font-black text-indigo-600">
                {step + 1}/5
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={4}
              value={step}
              onChange={(e) =>
                setStep(Number(e.target.value))
              }
              className="w-full mt-4"
            />
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-indigo-600">
              Current Step
            </div>

            <div className="mt-2 text-2xl font-black text-indigo-900">
              {current.title}
            </div>

            <div className="mt-1 text-sm font-bold text-indigo-700">
              {current.subtitle}
            </div>

            <div className="mt-3 text-sm font-semibold text-indigo-900 leading-relaxed">
              {current.explanation}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Function Recipe
            </div>

            <div className="mt-3 flex flex-col gap-2 text-sm font-semibold text-slate-700">
              <div
                className={
                  step >= 0
                    ? 'text-emerald-600'
                    : ''
                }
              >
                ✓ def
              </div>

              <div
                className={
                  step >= 1
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                }
              >
                ✓ Function Name
              </div>

              <div
                className={
                  step >= 2
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                }
              >
                ✓ Parentheses ()
              </div>

              <div
                className={
                  step >= 3
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                }
              >
                ✓ Colon :
              </div>

              <div
                className={
                  step >= 4
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                }
              >
                ✓ Function Body
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Function Builder */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex-1 flex flex-col">
            <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
              Interactive Function Builder
            </div>

            <div className="flex-1 flex items-center justify-center">
              <motion.div
                key={step}
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="w-full max-w-4xl"
              >
                <div className="bg-white border-2 border-indigo-200 rounded-3xl overflow-hidden">
                  <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
                    <div className="text-xs font-mono uppercase font-bold text-indigo-600">
                      Python Source Code
                    </div>
                  </div>

                  <div className="p-8 overflow-auto">
                    <pre className="font-mono text-3xl font-black text-slate-800 whitespace-pre-wrap leading-relaxed">
{current.code}
                    </pre>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="grid grid-cols-5 gap-3">
            <motion.div
              animate={{
                opacity: step >= 0 ? 1 : 0.25,
                scale: step === 0 ? 1.05 : 1
              }}
              className="bg-white border border-slate-200 rounded-2xl p-4 text-center"
            >
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Keyword
              </div>

              <div className="mt-2 text-3xl font-black text-red-500">
                def
              </div>
            </motion.div>

            <motion.div
              animate={{
                opacity: step >= 1 ? 1 : 0.25,
                scale: step === 1 ? 1.05 : 1
              }}
              className="bg-white border border-slate-200 rounded-2xl p-4 text-center"
            >
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Name
              </div>

              <div className="mt-2 text-lg font-black text-indigo-600">
                show_banner
              </div>
            </motion.div>

            <motion.div
              animate={{
                opacity: step >= 2 ? 1 : 0.25,
                scale: step === 2 ? 1.05 : 1
              }}
              className="bg-white border border-slate-200 rounded-2xl p-4 text-center"
            >
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Inputs
              </div>

              <div className="mt-2 text-3xl font-black text-emerald-600">
                ()
              </div>
            </motion.div>

            <motion.div
              animate={{
                opacity: step >= 3 ? 1 : 0.25,
                scale: step === 3 ? 1.05 : 1
              }}
              className="bg-white border border-slate-200 rounded-2xl p-4 text-center"
            >
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Colon
              </div>

              <div className="mt-2 text-3xl font-black text-orange-500">
                :
              </div>
            </motion.div>

            <motion.div
              animate={{
                opacity: step >= 4 ? 1 : 0.25,
                scale: step === 4 ? 1.05 : 1
              }}
              className="bg-white border border-slate-200 rounded-2xl p-4 text-center"
            >
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Body
              </div>

              <div className="mt-2 text-3xl font-black text-purple-600">
                ↳
              </div>
            </motion.div>
          </div>

          {/* Mental Model */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5">
            <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
              Mental Model
            </div>

            <div className="mt-4 flex items-center justify-center gap-8">
              <div className="w-60 h-28 rounded-3xl bg-indigo-50 border-2 border-indigo-300 flex flex-col items-center justify-center">
                <div className="text-xs font-mono uppercase text-indigo-500">
                  Create Function
                </div>

                <div className="mt-2 text-2xl font-black text-indigo-700">
                  def show_banner()
                </div>
              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              <div className="w-60 h-28 rounded-3xl bg-emerald-50 border-2 border-emerald-300 flex flex-col items-center justify-center">
                <div className="text-xs font-mono uppercase text-emerald-500">
                  New Command Created
                </div>

                <div className="mt-2 text-2xl font-black text-emerald-700">
                  show_banner
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene03_CreatingAFunction;