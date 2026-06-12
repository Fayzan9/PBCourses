import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene02_InputProcessOutput: React.FC = () => {
  const scenarios = [
    {
      input: 'Press A Key',
      process: 'CPU Processes Input',
      output: 'Letter Appears'
    },
    {
      input: 'Click Play',
      process: 'Load Audio Data',
      output: 'Music Plays'
    },
    {
      input: 'Move Mouse',
      process: 'Update Cursor Position',
      output: 'Cursor Moves'
    },
    {
      input: 'Open Website',
      process: 'Download Web Page',
      output: 'Page Appears'
    }
  ];

  const [selected, setSelected] = useState(0);

  const current = scenarios[selected];

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}

      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.2 · Foundations Of Computing
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Input → Process →{' '}
          <span className="text-indigo-600 font-serif italic">
            Output
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Every computer system follows the same pattern.
          Information enters the computer, the computer
          performs work, and a result is produced.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}

        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Try Examples
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.input}
                  onClick={() => setSelected(index)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="font-bold">
                    {scenario.input}
                  </div>
                </button>
              ))}
            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Important
            </div>

            <div className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <div>
                • Computers receive information.
              </div>

              <div>
                • The CPU performs work.
              </div>

              <div>
                • Results are sent back to users.
              </div>

              <div>
                • Every app follows this pattern.
              </div>
            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-indigo-600">
              Universal Formula
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-black">

              <span className="text-indigo-600">
                Input
              </span>

              <span>→</span>

              <span className="text-orange-600">
                Process
              </span>

              <span>→</span>

              <span className="text-emerald-600">
                Output
              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Information Flow
          </div>

          <motion.div
            key={selected}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex items-center gap-6 flex-wrap justify-center">

              {/* Input */}

              <div className="w-56 h-52 rounded-3xl bg-white border-2 border-indigo-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono uppercase text-slate-400">
                  Input
                </div>

                <div className="text-center text-2xl font-black text-indigo-600 px-4 mt-4">
                  {current.input}
                </div>

              </div>

              <div className="text-6xl text-slate-300">
                →
              </div>

              {/* Process */}

              <div className="w-60 h-52 rounded-3xl bg-white border-2 border-orange-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono uppercase text-slate-400">
                  CPU Processing
                </div>

                <div className="text-center text-2xl font-black text-orange-600 px-4 mt-4">
                  {current.process}
                </div>

              </div>

              <div className="text-6xl text-slate-300">
                →
              </div>

              {/* Output */}

              <div className="w-56 h-52 rounded-3xl bg-white border-2 border-emerald-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono uppercase text-slate-400">
                  Output
                </div>

                <div className="text-center text-2xl font-black text-emerald-600 px-4 mt-4">
                  {current.output}
                </div>

              </div>

            </div>
          </motion.div>

          {/* Bottom */}

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono uppercase text-slate-400">
                Step 1
              </div>

              <div className="mt-2 font-black text-indigo-600">
                Receive Data
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono uppercase text-slate-400">
                Step 2
              </div>

              <div className="mt-2 font-black text-orange-600">
                Process Data
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono uppercase text-slate-400">
                Step 3
              </div>

              <div className="mt-2 font-black text-emerald-600">
                Produce Result
              </div>

            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene02_InputProcessOutput;