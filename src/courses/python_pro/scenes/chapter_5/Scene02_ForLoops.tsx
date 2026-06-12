import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene02_ForLoops: React.FC = () => {
  const [repeatCount, setRepeatCount] = useState(5);

  const manualLines = Array.from(
    { length: repeatCount },
    () => 'print("Hello")'
  );

  const outputs = Array.from(
    { length: repeatCount },
    (_, index) => `Hello #${index + 1}`
  );

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 5.2 · Repeating Work Automatically
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Introducing{' '}
          <span className="text-indigo-600 font-serif italic">
            for Loops
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          A loop lets us repeat code many times without writing the same
          instruction again and again.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Repetitions Needed
            </div>

            <input
              type="range"
              min={1}
              max={15}
              value={repeatCount}
              onChange={(e) =>
                setRepeatCount(Number(e.target.value))
              }
              className="w-full mt-4"
            />

            <div className="mt-4 text-center text-5xl font-black text-indigo-600">
              {repeatCount}
            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Key Question
            </div>

            <div className="mt-3 text-sm font-semibold text-indigo-900">
              What if we needed to print the same thing{' '}
              <span className="font-black">
                {repeatCount}
              </span>{' '}
              times?
            </div>

          </div>

        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Comparison */}
          <div className="flex-1 grid grid-cols-2 gap-5">

            {/* Without Loop */}
            <div className="bg-red-50 border border-red-100 rounded-3xl p-5 flex flex-col">

              <div className="flex items-center justify-between">

                <div>
                  <div className="text-xs font-mono font-bold text-red-500 uppercase">
                    Without Loops
                  </div>

                  <div className="text-2xl font-black text-red-700 mt-1">
                    Repeated Code
                  </div>
                </div>

                <div className="text-5xl">
                  😓
                </div>

              </div>

              <div className="mt-5 flex-1 bg-white rounded-2xl border border-red-100 p-4 overflow-auto">

                <pre className="text-sm font-mono font-bold text-slate-700">
{manualLines.join('\n')}
                </pre>

              </div>

              <div className="mt-4 text-center text-red-600 font-black">
                {repeatCount} lines of code
              </div>

            </div>

            {/* With Loop */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-5 flex flex-col">

              <div className="flex items-center justify-between">

                <div>
                  <div className="text-xs font-mono font-bold text-emerald-500 uppercase">
                    With Loops
                  </div>

                  <div className="text-2xl font-black text-emerald-700 mt-1">
                    Smart Solution
                  </div>
                </div>

                <div className="text-5xl">
                  😎
                </div>

              </div>

              <div className="mt-5 flex-1 bg-white rounded-2xl border border-emerald-100 p-4">

                <pre className="text-sm font-mono font-bold text-slate-700">
{`for i in range(${repeatCount}):
    print("Hello")`}
                </pre>

              </div>

              <div className="mt-4 text-center text-emerald-600 font-black">
                Only 2 lines of code
              </div>

            </div>

          </div>

          {/* Output Visualization */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Both Programs Produce The Same Output
            </div>

            <div className="mt-5 flex flex-wrap gap-3 justify-center">

              {outputs.map((item) => (
                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  className="px-5 py-3 rounded-2xl bg-white border-2 border-indigo-500"
                >
                  <span className="font-black text-indigo-600">
                    {item}
                  </span>
                </motion.div>
              ))}

            </div>

          </div>

          {/* Bottom Insight */}
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
              <div className="text-xs font-mono text-slate-400 uppercase">
                Repetitions
              </div>

              <div className="mt-2 text-3xl font-black text-indigo-600">
                {repeatCount}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
              <div className="text-xs font-mono text-slate-400 uppercase">
                Without Loop
              </div>

              <div className="mt-2 text-3xl font-black text-red-600">
                {repeatCount}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
              <div className="text-xs font-mono text-slate-400 uppercase">
                With Loop
              </div>

              <div className="mt-2 text-3xl font-black text-emerald-600">
                2
              </div>
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene02_ForLoops;