import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene04_TypesOfComputers: React.FC = () => {
  const computers = [
    {
      name: 'Smart Watch',
      icon: '⌚',
      users: '1 User',
      power: 1,
      purpose: 'Health Tracking'
    },
    {
      name: 'Smartphone',
      icon: '📱',
      users: '1 User',
      power: 2,
      purpose: 'Personal Computing'
    },
    {
      name: 'Laptop',
      icon: '💻',
      users: '1 User',
      power: 3,
      purpose: 'Work & Study'
    },
    {
      name: 'Desktop',
      icon: '🖥️',
      users: '1 User',
      power: 4,
      purpose: 'High Performance Tasks'
    },
    {
      name: 'Server',
      icon: '🗄️',
      users: 'Thousands',
      power: 5,
      purpose: 'Serve Applications'
    },
    {
      name: 'Supercomputer',
      icon: '🏢',
      users: 'Entire Organizations',
      power: 6,
      purpose: 'Scientific Research'
    }
  ];

  const [selected, setSelected] = useState(2);

  const current = computers[selected];

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}

      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.4 · Foundations Of Computing
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Types Of{' '}
          <span className="text-indigo-600 font-serif italic">
            Computers
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Computers come in many sizes and forms. Despite their differences,
          they all perform the same fundamental job: processing information.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}

        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Explore Computers
            </div>

            <div className="mt-3 flex flex-col gap-2">

              {computers.map((computer, index) => (
                <button
                  key={computer.name}
                  onClick={() => setSelected(index)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {computer.icon}
                    </span>

                    <span className="font-bold">
                      {computer.name}
                    </span>
                  </div>
                </button>
              ))}

            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-indigo-600">
              Key Observation
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              Different computers look different,
              but all take input, process data,
              and produce output.
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Computer Explorer
          </div>

          <motion.div
            key={current.name}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex flex-col items-center">

              <div className="w-80 h-72 bg-white border-2 border-indigo-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-8xl">
                  {current.icon}
                </div>

                <div className="mt-4 text-3xl font-black text-indigo-600 text-center">
                  {current.name}
                </div>

              </div>

            </div>
          </motion.div>

          {/* Details */}

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs uppercase font-mono text-slate-400">
                Users
              </div>

              <div className="mt-2 text-lg font-black text-slate-700">
                {current.users}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs uppercase font-mono text-slate-400">
                Power Level
              </div>

              <div className="mt-2 flex gap-1">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-5 flex-1 rounded ${
                      index < current.power
                        ? 'bg-indigo-500'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs uppercase font-mono text-slate-400">
                Purpose
              </div>

              <div className="mt-2 text-lg font-black text-emerald-600">
                {current.purpose}
              </div>

            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene04_TypesOfComputers;