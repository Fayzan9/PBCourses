import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene01_WhatIsAComputer: React.FC = () => {
  const examples = [
    {
      name: 'Calculator',
      input: '5 + 3',
      process: 'Calculate',
      output: '8'
    },
    {
      name: 'Music App',
      input: 'Play Song',
      process: 'Load Audio',
      output: 'Music'
    },
    {
      name: 'Web Browser',
      input: 'Open Website',
      process: 'Fetch Data',
      output: 'Web Page'
    },
    {
      name: 'Game',
      input: 'Press Jump',
      process: 'Run Game Logic',
      output: 'Character Jumps'
    }
  ];

  const [selected, setSelected] = useState(0);

  const current = examples[selected];

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.1 · Foundations Of Computing
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          What Is A{' '}
          <span className="text-indigo-600 font-serif italic">
            Computer?
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          A computer is a machine that receives input,
          processes information, and produces output.
          Everything from phones to supercomputers follows
          this basic idea.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Key Idea
            </div>

            <div className="mt-4 flex flex-col gap-3">

              <div className="rounded-xl bg-indigo-50 p-3 border border-indigo-100">
                <div className="font-black text-indigo-600">
                  Input
                </div>

                <div className="text-xs text-slate-600 mt-1">
                  Information given to a computer.
                </div>
              </div>

              <div className="rounded-xl bg-orange-50 p-3 border border-orange-100">
                <div className="font-black text-orange-600">
                  Process
                </div>

                <div className="text-xs text-slate-600 mt-1">
                  Work performed by the computer.
                </div>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-100">
                <div className="font-black text-emerald-600">
                  Output
                </div>

                <div className="text-xs text-slate-600 mt-1">
                  The result produced.
                </div>
              </div>

            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex-1 min-h-0">
            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Examples
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {examples.map((example, index) => (
                <button
                  key={example.name}
                  onClick={() => setSelected(index)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="font-bold">
                    {example.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Computer In Action
          </div>

          <motion.div
            key={current.name}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex items-center gap-6 flex-wrap justify-center">

              {/* Input */}
              <div className="w-52 h-48 bg-white border-2 border-indigo-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-xs uppercase font-mono text-slate-400">
                  Input
                </div>

                <div className="mt-4 text-center text-2xl font-black text-indigo-600 px-3">
                  {current.input}
                </div>

              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Process */}
              <div className="w-52 h-48 bg-white border-2 border-orange-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-xs uppercase font-mono text-slate-400">
                  Process
                </div>

                <div className="mt-4 text-center text-2xl font-black text-orange-600 px-3">
                  {current.process}
                </div>

              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Output */}
              <div className="w-52 h-48 bg-white border-2 border-emerald-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-xs uppercase font-mono text-slate-400">
                  Output
                </div>

                <div className="mt-4 text-center text-2xl font-black text-emerald-600 px-3">
                  {current.output}
                </div>

              </div>

            </div>
          </motion.div>

          {/* Bottom Summary */}

          <div className="grid grid-cols-4 gap-3">

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Example
              </div>

              <div className="mt-1 font-black text-slate-700 text-sm">
                {current.name}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Input
              </div>

              <div className="mt-1 font-black text-indigo-600">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Process
              </div>

              <div className="mt-1 font-black text-orange-600">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Output
              </div>

              <div className="mt-1 font-black text-emerald-600">
                ✓
              </div>
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene01_WhatIsAComputer;