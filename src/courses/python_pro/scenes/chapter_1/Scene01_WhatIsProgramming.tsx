import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene01_WhatIsProgramming: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(3); // Default to Level 3: Python

  const steps = [
    {
      id: 4,
      level: 'Level 4',
      name: 'Human Intent',
      desc: 'High-level goal or problem representation.',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700 text-indigo-500',
      badge: 'Thought',
      preview: {
        title: 'Your Mental Workspace',
        content: '“I want to sort this list of names alphabetically.”\n- Goal-oriented\n- Abstract human concept\n- Highly structured in intent, zero structure in electrical signals'
      }
    },
    {
      id: 3,
      level: 'Level 3',
      name: 'High-Level Code (Python)',
      desc: 'Readable text representing logic and structures.',
      color: 'bg-sky-50 border-sky-200 text-sky-700 text-sky-500',
      badge: 'Abstractions',
      preview: {
        title: 'Source Code: sort.py',
        content: 'names = ["Fayzan", "Alice", "Bob"]\nnames.sort()\nprint(names)\n\n# Very easy for humans to read & write!'
      }
    },
    {
      id: 2,
      level: 'Level 2',
      name: 'Bytecode Translation',
      desc: 'Low-level virtual machine commands.',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700 text-emerald-500',
      badge: 'Translation',
      preview: {
        title: 'Disassembled Bytecode',
        content: '0 LOAD_NAME                0 (names)\n2 LOAD_METHOD              1 (sort)\n4 CALL_METHOD              0\n6 POP_TOP\n8 LOAD_NAME                2 (print)'
      }
    },
    {
      id: 1,
      level: 'Level 1',
      name: 'Hardware & Silicon',
      desc: 'Electricity routing through logical gates.',
      color: 'bg-slate-100 border-slate-300 text-slate-700 text-slate-500',
      badge: 'Physical',
      preview: {
        title: 'Physical Transistor State',
        content: '01001100 01001111 01000001 01000100\n[Gate 0x1A: HIGH (5V)]\n[Gate 0x1B: LOW (0V)]\n[Clock Cycle Pulse: Active]'
      }
    }
  ];

  const currentLevelInfo = steps.find(s => s.id === selectedLevel)!;

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-6 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.1 · Computer Fundamentals
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          What Is <span className="text-indigo-600 font-serif italic">Programming?</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-2xl leading-relaxed">
          Programming bridges the gap between human thought and the physical silicon switches inside the CPU. Click any level to see how representation changes.
        </p>
      </div>

      {/* Interactive Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 items-stretch">
        
        {/* Left column - Abstraction Levels Grid */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Select Abstraction Layer
          </span>
          
          <div className="flex flex-col gap-2.5">
            {steps.map((step) => {
              const isSelected = selectedLevel === step.id;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => setSelectedLevel(step.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`text-left p-3.5 border-2 rounded-xl bg-white cursor-pointer transition-all flex items-start justify-between ${
                    isSelected ? 'border-indigo-500 shadow-sm' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400">{step.level}</span>
                      <h4 className={`text-sm font-extrabold ${isSelected ? 'text-indigo-600' : 'text-slate-700'}`}>
                        {step.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal font-semibold mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                    isSelected ? step.color : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    {step.badge}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right column - Live Representation Simulator */}
        <div className="flex-1 flex flex-col bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 relative justify-between min-h-0">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 block">
            Layer Preview: {currentLevelInfo.name}
          </span>

          <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm min-h-0">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50 shrink-0">
              <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                {currentLevelInfo.preview.title}
              </span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-200" />
                <span className="w-2 h-2 rounded-full bg-slate-200" />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLevel}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="flex-1 p-5 font-mono text-sm leading-6 font-semibold text-slate-700 overflow-y-auto whitespace-pre-line"
              >
                {currentLevelInfo.preview.content}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 flex items-start gap-2.5 shrink-0">
            <span className="text-base">💡</span>
            <p className="text-indigo-900 text-xs leading-relaxed font-semibold">
              Python abstracts away memory allocation and physical gate operations completely, letting you focus on human logic (Level 3).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scene01_WhatIsProgramming;
