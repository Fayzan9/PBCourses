import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene01_WhyFunctionsExist: React.FC = () => {
  const [repetitions, setRepetitions] = useState(4);

  const repeatedCode = Array.from(
    { length: repetitions },
    () =>
      `print("Welcome")\nprint("----------")`
  ).join('\n\n');

  const outputs = Array.from(
    { length: repetitions },
    (_, index) => `Banner ${index + 1}`
  );

  return (
    <SceneLayout gap="gap-4">

      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 6.1 · Creating Your Own Commands
        </span>

        <h2 className="text-3xl font-extrabold text-slate-800 mt-1">
          Why Functions{' '}
          <span className="text-indigo-600 font-serif italic">
            Exist
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          Functions solve a very important problem:
          repeating the same code again and again.
        </p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">

        {/* Controls */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="flex justify-between">

              <div className="text-xs font-mono uppercase font-bold text-slate-400">
                Number Of Banners
              </div>

              <div className="font-black text-indigo-600">
                {repetitions}
              </div>

            </div>

            <input
              type="range"
              min={1}
              max={20}
              value={repetitions}
              onChange={(e) =>
                setRepetitions(
                  Number(e.target.value)
                )
              }
              className="w-full mt-4"
            />

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-indigo-600">
              The Problem
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              Every time we need another banner,
              we must copy the same code again.
            </div>

          </div>

        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">

          {/* Comparison */}
          <div className="grid grid-cols-2 gap-4">

            {/* Without Functions */}
            <div className="bg-red-50 border border-red-100 rounded-3xl p-4 flex flex-col">

              <div className="flex items-center justify-between">

                <div>
                  <div className="text-xs font-mono uppercase font-bold text-red-500">
                    Without Functions
                  </div>

                  <div className="text-xl font-black text-red-700 mt-1">
                    Repeating Code
                  </div>
                </div>

                <div className="text-4xl">
                  😩
                </div>

              </div>

              <div className="mt-4 h-[280px] bg-white border border-red-100 rounded-2xl overflow-hidden flex flex-col">

                <div className="px-3 py-2 border-b border-red-100 bg-red-50 text-[11px] font-mono font-bold text-red-500 uppercase">
                  Source Code
                </div>

                <div className="flex-1 overflow-y-auto p-3">
                  <pre className="text-xs font-mono font-bold text-slate-700 whitespace-pre-wrap">
{repeatedCode}
                  </pre>
                </div>

              </div>

              <div className="mt-3 text-center font-black text-red-600">
                {repetitions * 2} repeated lines
              </div>

            </div>

            {/* With Functions */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-4 flex flex-col">

              <div className="flex items-center justify-between">

                <div>
                  <div className="text-xs font-mono uppercase font-bold text-emerald-500">
                    With Functions
                  </div>

                  <div className="text-xl font-black text-emerald-700 mt-1">
                    Reusable Code
                  </div>
                </div>

                <div className="text-4xl">
                  😎
                </div>

              </div>

              <div className="mt-4 h-[280px] bg-white border border-emerald-100 rounded-2xl overflow-hidden flex flex-col">

                <div className="px-3 py-2 border-b border-emerald-100 bg-emerald-50 text-[11px] font-mono font-bold text-emerald-500 uppercase">
                  Source Code
                </div>

                <div className="flex-1 overflow-y-auto p-3">
                  <pre className="text-xs font-mono font-bold text-slate-700 whitespace-pre-wrap">
{`def show_banner():
    print("Welcome")
    print("----------")

${Array.from(
  { length: repetitions },
  () => 'show_banner()'
).join('\n')}`}
                  </pre>
                </div>

              </div>

              <div className="mt-3 text-center font-black text-emerald-600">
                Same output, less duplication
              </div>

            </div>

          </div>

          {/* Execution Flow */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5">

            <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
              What Actually Happens
            </div>

            <div className="mt-5 flex items-center justify-center gap-6">

              <div className="w-52 h-32 rounded-3xl bg-white border-2 border-indigo-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono uppercase text-slate-400">
                  Call Function
                </div>

                <div className="mt-2 text-2xl font-black text-indigo-600">
                  show_banner()
                </div>

              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              <div className="w-64 h-32 rounded-3xl bg-white border-2 border-emerald-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono uppercase text-slate-400">
                  Executes Code
                </div>

                <div className="mt-2 text-lg font-black text-emerald-600">
                  Welcome
                </div>

                <div className="font-black text-emerald-600">
                  ----------
                </div>

              </div>

            </div>

          </div>

          {/* Output */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Program Output
            </div>

            <div className="mt-4 flex flex-wrap gap-3">

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
                  className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200"
                >
                  <div className="font-black text-emerald-600">
                    Welcome
                  </div>

                  <div className="font-black text-emerald-600">
                    ----------
                  </div>
                </motion.div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </SceneLayout>
  );
};

export default Scene01_WhyFunctionsExist;