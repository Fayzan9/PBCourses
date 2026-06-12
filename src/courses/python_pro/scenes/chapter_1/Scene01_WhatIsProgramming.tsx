import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

interface Layer {
  id: number;
  level: string;
  name: string;
  badge: string;
  color: string;
  preview: {
    title: string;
    content: string;
  };
  takeaway: string;
}

export const Scene01_WhatIsProgramming: React.FC = () => {
  const layers: Layer[] = [
    {
      id: 4,
      level: 'Level 4',
      name: 'Human Intent',
      badge: 'Thought',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      preview: {
        title: 'Problem To Solve',
        content:
          'Goal:\n\nStore a person’s age and display it on screen.\n\nHumans think in goals and outcomes, not CPU instructions.'
      },
      takeaway:
        'Programming starts with human intent. At this level there is no code yet.'
    },
    {
      id: 3,
      level: 'Level 3',
      name: 'Python Source Code',
      badge: 'Code',
      color: 'bg-sky-50 border-sky-200 text-sky-700',
      preview: {
        title: 'Python Program',
        content:
`age = 25

print(age)

# Easy for humans to read
# Difficult for hardware to execute directly`
      },
      takeaway:
        'Python is designed for humans. CPUs cannot execute Python source code directly.'
    },
    {
      id: 2,
      level: 'Level 2',
      name: 'Python Bytecode',
      badge: 'Translation',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      preview: {
        title: 'Bytecode Instructions',
        content:
`LOAD_CONST 25
STORE_NAME age
LOAD_NAME age
CALL print
RETURN_VALUE`
      },
      takeaway:
        'CPython translates source code into bytecode instructions that run inside the Python Virtual Machine.'
    },
    {
      id: 1,
      level: 'Level 1',
      name: 'Hardware Execution',
      badge: 'Physical',
      color: 'bg-slate-100 border-slate-300 text-slate-700',
      preview: {
        title: 'Electrical Reality',
        content:
`01010101 00101010

Transistor A → HIGH
Transistor B → LOW

Clock Cycle Active`
      },
      takeaway:
        'Every program eventually becomes electrical signals moving through billions of transistors.'
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(1);

  const current = layers[selectedIndex];

  const goNext = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, layers.length - 1));
  };

  const goPrev = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <SceneLayout gap="gap-6">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.1 · Computer Fundamentals
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          What Is{' '}
          <span className="text-indigo-600 font-serif italic">
            Programming?
          </span>
        </h2>

        <p className="text-slate-500 text-sm mt-1 max-w-3xl leading-relaxed">
          Programming is the process of translating human ideas into instructions
          a computer can execute. Explore how the same task changes as it moves
          closer to the hardware.
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {layers.map((layer, idx) => (
          <React.Fragment key={layer.id}>
            <button
              onClick={() => setSelectedIndex(idx)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                idx === selectedIndex
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              {layer.name}
            </button>

            {idx < layers.length - 1 && (
              <span className="text-slate-300 font-bold">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">

        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-3">
          {layers.map((layer, idx) => {
            const active = idx === selectedIndex;

            return (
              <motion.button
                key={layer.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedIndex(idx)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  active
                    ? 'border-indigo-500 bg-white shadow-sm'
                    : 'border-slate-100 bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-mono text-slate-400">
                      {layer.level}
                    </div>

                    <div
                      className={`font-extrabold ${
                        active ? 'text-indigo-600' : 'text-slate-700'
                      }`}
                    >
                      {layer.name}
                    </div>
                  </div>

                  <span
                    className={`text-[11px] px-2 py-1 rounded-md border font-bold uppercase ${layer.color}`}
                  >
                    {layer.badge}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">

          <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b bg-slate-50">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                {current.preview.title}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.pre
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-5 whitespace-pre-wrap text-sm font-mono text-slate-700 h-full overflow-auto"
              >
                {current.preview.content}
              </motion.pre>
            </AnimatePresence>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <h4 className="text-xs uppercase tracking-wider font-mono font-bold text-indigo-600">
              Key Takeaway
            </h4>

            <p className="mt-1 text-sm text-indigo-900 font-semibold">
              {current.takeaway}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={goPrev}
              disabled={selectedIndex === 0}
              className="flex-1 py-2 rounded-xl border border-slate-200 font-bold disabled:opacity-40"
            >
              ← Previous Layer
            </button>

            <button
              onClick={goNext}
              disabled={selectedIndex === layers.length - 1}
              className="flex-1 py-2 rounded-xl bg-indigo-600 text-white font-bold disabled:opacity-40"
            >
              Next Layer →
            </button>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene01_WhatIsProgramming;