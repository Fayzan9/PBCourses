import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene03_HardwareVsSoftware: React.FC = () => {
  const softwareExamples = [
    {
      name: 'Web Browser',
      icon: '🌐',
      action: 'Display Websites'
    },
    {
      name: 'Game',
      icon: '🎮',
      action: 'Run Game Logic'
    },
    {
      name: 'Music Player',
      icon: '🎵',
      action: 'Play Audio'
    },
    {
      name: 'Code Editor',
      icon: '💻',
      action: 'Edit Programs'
    }
  ];

  const [selected, setSelected] = useState(0);

  const current = softwareExamples[selected];

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}

      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.3 · Foundations Of Computing
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Hardware vs{' '}
          <span className="text-indigo-600 font-serif italic">
            Software
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          A computer consists of physical hardware and software
          instructions. Software tells hardware what work to perform.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Side */}

        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          {/* Software Selection */}

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Choose Software
            </div>

            <div className="mt-3 flex flex-col gap-2">

              {softwareExamples.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setSelected(index)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {item.icon}
                    </span>

                    <span className="font-bold">
                      {item.name}
                    </span>
                  </div>
                </button>
              ))}

            </div>

          </div>

          {/* Definitions */}

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="space-y-4">

              <div>
                <div className="text-xs font-mono uppercase text-indigo-600 font-bold">
                  Hardware
                </div>

                <div className="mt-1 text-xs font-semibold text-slate-600">
                  Physical parts you can touch.
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase text-orange-600 font-bold">
                  Software
                </div>

                <div className="mt-1 text-xs font-semibold text-slate-600">
                  Instructions and programs.
                </div>
              </div>

            </div>

          </div>

          {/* Summary */}

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-indigo-600">
              Remember
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              Software cannot run without hardware.
              Hardware is useless without software.
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Software Controls Hardware
          </div>

          <motion.div
            key={current.name}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex items-center gap-8 flex-wrap justify-center">

              {/* Software */}

              <div className="w-64 h-56 rounded-3xl bg-white border-2 border-orange-500 flex flex-col items-center justify-center">

                <div className="text-xs uppercase font-mono text-slate-400">
                  Software
                </div>

                <div className="text-6xl mt-4">
                  {current.icon}
                </div>

                <div className="mt-4 text-2xl font-black text-orange-600 text-center px-3">
                  {current.name}
                </div>

              </div>

              <div className="text-6xl text-slate-300">
                →
              </div>

              {/* Hardware */}

              <div className="w-80 h-56 rounded-3xl bg-white border-2 border-indigo-500 flex flex-col items-center justify-center">

                <div className="text-xs uppercase font-mono text-slate-400">
                  Hardware
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">

                  <div className="px-4 py-2 rounded-xl bg-indigo-50 font-black text-indigo-600 text-center">
                    CPU
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-indigo-50 font-black text-indigo-600 text-center">
                    RAM
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-indigo-50 font-black text-indigo-600 text-center">
                    SSD
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-indigo-50 font-black text-indigo-600 text-center">
                    GPU
                  </div>

                </div>

              </div>

            </div>
          </motion.div>

          {/* Bottom Cards */}

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs uppercase font-mono text-slate-400">
                Current Software
              </div>

              <div className="mt-2 font-black text-orange-600">
                {current.name}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs uppercase font-mono text-slate-400">
                What It Does
              </div>

              <div className="mt-2 font-black text-slate-700">
                {current.action}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs uppercase font-mono text-slate-400">
                Needs Hardware
              </div>

              <div className="mt-2 font-black text-emerald-600">
                Yes ✓
              </div>

            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene03_HardwareVsSoftware;