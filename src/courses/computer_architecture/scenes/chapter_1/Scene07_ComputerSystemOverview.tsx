import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene07_ComputerSystemOverview: React.FC = () => {
  const scenarios = [
    {
      name: 'Typing A Letter',
      input: 'Keyboard',
      storage: 'Operating System & App',
      ram: 'Document Loaded',
      cpu: 'Process Keystroke',
      output: 'Letter Appears'
    },
    {
      name: 'Playing Music',
      input: 'Play Button',
      storage: 'Music File',
      ram: 'Audio Data Loaded',
      cpu: 'Decode Audio',
      output: 'Sound Through Speakers'
    },
    {
      name: 'Opening A Website',
      input: 'Mouse Click',
      storage: 'Browser Program',
      ram: 'Browser Loaded',
      cpu: 'Execute Browser',
      output: 'Website Displayed'
    }
  ];

  const [selected, setSelected] = useState(0);

  const current = scenarios[selected];

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}

      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.7 · Chapter Summary
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Computer System{' '}
          <span className="text-indigo-600 font-serif italic">
            Overview
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          All computer components work together as a system.
          Input enters the computer, software runs on hardware,
          the CPU processes data, and results are delivered back
          to the user.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}

        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Try Examples
            </div>

            <div className="mt-3 flex flex-col gap-2">

              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.name}
                  onClick={() => setSelected(index)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="font-black">
                    {scenario.name}
                  </div>
                </button>
              ))}

            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-indigo-600">
              Chapter 1 Takeaway
            </div>

            <div className="mt-3 text-sm font-semibold text-slate-700">

              Computers are systems made of hardware and
              software working together to process information.

            </div>

          </div>

        </div>

        {/* Right Panel */}

        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Complete System Flow
          </div>

          {/* Flow Visualization */}

          <div className="flex-1 flex items-center justify-center">

            <motion.div
              key={current.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >

              <div className="grid grid-cols-5 gap-4">

                {/* Input */}

                <div className="bg-sky-50 border-2 border-sky-500 rounded-2xl p-4 text-center">

                  <div className="text-xs font-mono uppercase text-sky-600">
                    Input
                  </div>

                  <div className="mt-3 font-black text-sky-700">
                    {current.input}
                  </div>

                </div>

                {/* Storage */}

                <div className="bg-orange-50 border-2 border-orange-500 rounded-2xl p-4 text-center">

                  <div className="text-xs font-mono uppercase text-orange-600">
                    Storage
                  </div>

                  <div className="mt-3 font-black text-orange-700">
                    {current.storage}
                  </div>

                </div>

                {/* RAM */}

                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 text-center">

                  <div className="text-xs font-mono uppercase text-emerald-600">
                    RAM
                  </div>

                  <div className="mt-3 font-black text-emerald-700">
                    {current.ram}
                  </div>

                </div>

                {/* CPU */}

                <div className="bg-indigo-50 border-2 border-indigo-500 rounded-2xl p-4 text-center">

                  <div className="text-xs font-mono uppercase text-indigo-600">
                    CPU
                  </div>

                  <div className="mt-3 font-black text-indigo-700">
                    {current.cpu}
                  </div>

                </div>

                {/* Output */}

                <div className="bg-rose-50 border-2 border-rose-500 rounded-2xl p-4 text-center">

                  <div className="text-xs font-mono uppercase text-rose-600">
                    Output
                  </div>

                  <div className="mt-3 font-black text-rose-700">
                    {current.output}
                  </div>

                </div>

              </div>

            </motion.div>

          </div>

          {/* Chapter Summary */}

          <div className="grid grid-cols-5 gap-3">

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Input
              </div>
              <div className="mt-1 font-black">✓</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Hardware
              </div>
              <div className="mt-1 font-black">✓</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Software
              </div>
              <div className="mt-1 font-black">✓</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                CPU
              </div>
              <div className="mt-1 font-black">✓</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Memory
              </div>
              <div className="mt-1 font-black">✓</div>
            </div>

          </div>

        </div>

      </div>

    </SceneLayout>
  );
};

export default Scene07_ComputerSystemOverview;