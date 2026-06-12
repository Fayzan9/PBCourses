import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene04_LoopVariable: React.FC = () => {
  const [count, setCount] = useState(6);
  const [currentStep, setCurrentStep] = useState(0);

  const values = useMemo(
    () =>
      Array.from(
        { length: count },
        (_, index) => index
      ),
    [count]
  );

  const currentValue = values[currentStep] ?? 0;

  return (
    <SceneLayout gap="gap-4">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 5.4 · Repeating Work Automatically
        </span>

        <h2 className="text-3xl font-extrabold text-slate-800 mt-1">
          The Loop{' '}
          <span className="text-indigo-600 font-serif italic">
            Variable
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          During each iteration, Python updates the loop variable with
          the next value from the sequence.
        </p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">

        {/* Controls */}
        <div className="w-[320px] shrink-0 flex flex-col gap-3">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="flex justify-between">
              <div className="text-xs font-mono font-bold uppercase text-slate-400">
                Total Iterations
              </div>

              <div className="font-black text-indigo-600">
                {count}
              </div>
            </div>

            <input
              type="range"
              min={1}
              max={10}
              value={count}
              onChange={(e) => {
                const value = Number(e.target.value);

                setCount(value);

                if (currentStep >= value) {
                  setCurrentStep(value - 1);
                }
              }}
              className="w-full mt-3"
            />

          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Select Iteration
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2">

              {values.map((value) => (
                <button
                  key={value}
                  onClick={() =>
                    setCurrentStep(value)
                  }
                  className={`h-11 rounded-xl font-black border-2 transition-all ${
                    currentStep === value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {value}
                </button>
              ))}

            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold uppercase text-indigo-600">
              Python Code
            </div>

            <pre className="mt-3 text-xs font-mono font-bold text-slate-800 whitespace-pre-wrap">
{`for i in range(${count}):
    print(i)`}
            </pre>

          </div>

        </div>

        {/* Main Visualization */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">

          {/* Sequence */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5">

            <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Sequence Produced By range({count})
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-3">

              {values.map((value) => (
                <motion.div
                  key={value}
                  animate={{
                    scale:
                      currentStep === value
                        ? 1.08
                        : 1,
                    opacity:
                      currentStep === value
                        ? 1
                        : 0.45
                  }}
                  className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center ${
                    currentStep === value
                      ? 'border-indigo-500 bg-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  <span
                    className={`text-2xl font-black ${
                      currentStep === value
                        ? 'text-indigo-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {value}
                  </span>
                </motion.div>
              ))}

            </div>

          </div>

          {/* Flow */}
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-5 flex items-center justify-center">

            <div className="flex items-center gap-6">

              {/* Current Position */}
              <div className="w-52 h-44 bg-white border-2 border-orange-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-xs font-mono uppercase text-slate-400">
                  Current Position
                </div>

                <div className="mt-3 text-6xl font-black text-orange-600">
                  #{currentStep}
                </div>

              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Variable */}
              <motion.div
                key={currentValue}
                initial={{
                  scale: 0.9,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                className="w-52 h-44 bg-white border-2 border-indigo-500 rounded-3xl flex flex-col items-center justify-center"
              >
                <div className="text-xs font-mono uppercase text-slate-400">
                  Variable i
                </div>

                <div className="mt-3 text-6xl font-black text-indigo-600">
                  {currentValue}
                </div>

              </motion.div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Output */}
              <motion.div
                key={`output-${currentValue}`}
                initial={{
                  scale: 0.9,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                className="w-52 h-44 bg-white border-2 border-emerald-500 rounded-3xl flex flex-col items-center justify-center"
              >
                <div className="text-xs font-mono uppercase text-slate-400">
                  Printed
                </div>

                <div className="mt-3 text-6xl font-black text-emerald-600">
                  {currentValue}
                </div>

              </motion.div>

            </div>

          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Iteration
              </div>

              <div className="mt-1 text-2xl font-black text-orange-600">
                {currentStep}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Variable
              </div>

              <div className="mt-1 text-2xl font-black text-indigo-600">
                i = {currentValue}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Output
              </div>

              <div className="mt-1 text-2xl font-black text-emerald-600">
                {currentValue}
              </div>
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene04_LoopVariable;