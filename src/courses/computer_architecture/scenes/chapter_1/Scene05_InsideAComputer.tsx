import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene05_InsideAComputer: React.FC = () => {
  const components = [
    {
      id: 'cpu',
      name: 'CPU',
      role: 'Brain',
      description:
        'Executes instructions, performs calculations, and controls the entire computer.',
      color:
        'border-indigo-500 bg-indigo-50 text-indigo-600'
    },
    {
      id: 'ram',
      name: 'RAM',
      role: 'Working Memory',
      description:
        'Temporarily stores data and programs currently being used.',
      color:
        'border-emerald-500 bg-emerald-50 text-emerald-600'
    },
    {
      id: 'storage',
      name: 'Storage',
      role: 'Long-Term Memory',
      description:
        'Stores files, programs, photos, and operating systems permanently.',
      color:
        'border-orange-500 bg-orange-50 text-orange-600'
    },
    {
      id: 'input',
      name: 'Input Devices',
      role: 'Information In',
      description:
        'Keyboard, mouse, microphone, camera and other devices send information into the computer.',
      color:
        'border-sky-500 bg-sky-50 text-sky-600'
    },
    {
      id: 'output',
      name: 'Output Devices',
      role: 'Information Out',
      description:
        'Monitors, speakers and printers present results back to users.',
      color:
        'border-rose-500 bg-rose-50 text-rose-600'
    }
  ];

  const [selected, setSelected] = useState('cpu');

  const current =
    components.find(c => c.id === selected)!;

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}

      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.5 · Foundations Of Computing
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Inside A{' '}
          <span className="text-indigo-600 font-serif italic">
            Computer
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Every computer contains several major
          components working together to receive,
          process, store and produce information.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* LEFT PANEL */}

        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Computer Components
            </div>

            <div className="mt-3 flex flex-col gap-2">

              {components.map(component => (
                <button
                  key={component.id}
                  onClick={() =>
                    setSelected(component.id)
                  }
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === component.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="font-black text-slate-800">
                    {component.name}
                  </div>

                  <div className="text-xs text-slate-500 mt-1">
                    {component.role}
                  </div>
                </button>
              ))}

            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-indigo-600">
              Human Analogy
            </div>

            <div className="mt-3 space-y-2 text-sm font-semibold text-slate-700">

              <div>🧠 CPU → Brain</div>

              <div>💭 RAM → Short-Term Memory</div>

              <div>📚 Storage → Long-Term Memory</div>

              <div>👀 Input → Eyes & Ears</div>

              <div>🗣️ Output → Voice & Display</div>

            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between min-w-0">

          <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
            Computer Architecture
          </div>

          {/* Architecture Visualization */}

          <div className="flex-1 flex items-center justify-center">

            <motion.div
              key={selected}
              initial={{
                opacity: 0,
                scale: 0.98
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              className="w-full max-w-[760px]"
            >

              {/* Input / Output */}

              <div className="flex items-center justify-between mb-6">

                <button
                  onClick={() =>
                    setSelected('input')
                  }
                  className={`w-40 h-24 rounded-2xl border-2 font-black transition-all ${
                    selected === 'input'
                      ? 'border-sky-500 bg-sky-50 text-sky-600'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  INPUT
                </button>

                <button
                  onClick={() =>
                    setSelected('output')
                  }
                  className={`w-40 h-24 rounded-2xl border-2 font-black transition-all ${
                    selected === 'output'
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  OUTPUT
                </button>

              </div>

              {/* Motherboard */}

              <div className="bg-white border-2 border-slate-300 rounded-3xl p-8">

                <div className="text-center text-xs font-mono font-bold uppercase text-slate-400 mb-6">
                  Motherboard
                </div>

                {/* CPU */}

                <div className="flex justify-center">

                  <button
                    onClick={() =>
                      setSelected('cpu')
                    }
                    className={`w-56 h-32 rounded-3xl border-2 transition-all ${
                      selected === 'cpu'
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="text-4xl font-black text-indigo-600">
                      CPU
                    </div>

                    <div className="text-xs font-bold text-slate-500 mt-2">
                      Central Processing Unit
                    </div>
                  </button>

                </div>

                {/* RAM + Storage */}

                <div className="grid grid-cols-2 gap-6 mt-8">

                  <button
                    onClick={() =>
                      setSelected('ram')
                    }
                    className={`h-28 rounded-2xl border-2 transition-all ${
                      selected === 'ram'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="text-2xl font-black text-emerald-600">
                      RAM
                    </div>

                    <div className="text-xs font-bold text-slate-500 mt-2">
                      Working Memory
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      setSelected('storage')
                    }
                    className={`h-28 rounded-2xl border-2 transition-all ${
                      selected === 'storage'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="text-2xl font-black text-orange-600">
                      STORAGE
                    </div>

                    <div className="text-xs font-bold text-slate-500 mt-2">
                      Long-Term Memory
                    </div>
                  </button>

                </div>

              </div>

            </motion.div>

          </div>

          {/* Information Card */}

          <div
            className={`rounded-2xl border-2 p-5 ${current.color}`}
          >
            <div className="text-xs font-mono uppercase font-bold">
              Selected Component
            </div>

            <div className="mt-2 text-3xl font-black">
              {current.name}
            </div>

            <div className="mt-1 text-lg font-bold">
              {current.role}
            </div>

            <div className="mt-3 text-sm text-slate-700 font-semibold">
              {current.description}
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene05_InsideAComputer;