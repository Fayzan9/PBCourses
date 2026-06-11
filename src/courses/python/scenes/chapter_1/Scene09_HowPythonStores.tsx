import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    title: 'Assignment creates a reference',
    code: ['x = [1, 2, 3]', 'y = x  # same object!'],
    diagram: 'alias',
    note: 'Both x and y point to the SAME list in memory.',
  },
  {
    title: 'Mutating via alias affects both',
    code: ['y.append(4)', 'print(x)  # [1, 2, 3, 4]'],
    diagram: 'mutate',
    note: 'Because x and y share a reference, any mutation is visible through both.',
  },
  {
    title: 'Rebinding does not affect the original',
    code: ['y = [9, 9, 9]  # new object', 'print(x)  # [1, 2, 3, 4]'],
    diagram: 'rebind',
    note: 'y now points elsewhere. x still holds the original list.',
  },
  {
    title: 'Integers & strings are immutable',
    code: ['a = 42', 'b = a', 'b = 99  # creates new int', 'print(a)  # 42'],
    diagram: 'immutable',
    note: 'Immutable objects can never be changed in-place — only rebound.',
  },
];

const DiagramAlias = () => (
  <div className="flex items-center gap-3 font-mono text-sm">
    <div className="flex flex-col gap-1 items-center">
      <span className="bg-amber-100 border border-amber-300 text-amber-700 px-3 py-1.5 rounded-lg font-extrabold">x</span>
      <span className="bg-amber-100 border border-amber-300 text-amber-700 px-3 py-1.5 rounded-lg font-extrabold">y</span>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-slate-400">→</span>
      <span className="text-slate-400">→</span>
    </div>
    <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-800 px-5 py-3 rounded-xl font-extrabold">
      [1, 2, 3]<br/><span className="text-[10px] text-emerald-500">id: 0x7fa2</span>
    </div>
  </div>
);

const DiagramMutate = () => (
  <div className="flex items-center gap-3 font-mono text-sm">
    <div className="flex flex-col gap-1 items-center">
      <span className="bg-amber-100 border border-amber-300 text-amber-700 px-3 py-1.5 rounded-lg font-extrabold">x</span>
      <span className="bg-amber-100 border border-amber-300 text-amber-700 px-3 py-1.5 rounded-lg font-extrabold">y</span>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-slate-400">→</span>
      <span className="text-slate-400">→</span>
    </div>
    <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-800 px-5 py-3 rounded-xl font-extrabold">
      [1, 2, 3, <span className="text-rose-600">4</span>]<br/><span className="text-[10px] text-emerald-500">id: 0x7fa2</span>
    </div>
  </div>
);

const DiagramRebind = () => (
  <div className="flex flex-col gap-3 font-mono text-sm">
    <div className="flex items-center gap-3">
      <span className="bg-amber-100 border border-amber-300 text-amber-700 px-3 py-1.5 rounded-lg font-extrabold">x</span>
      <span className="text-slate-400">→</span>
      <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-800 px-4 py-2 rounded-xl font-extrabold">[1, 2, 3, 4]</div>
    </div>
    <div className="flex items-center gap-3">
      <span className="bg-amber-100 border border-amber-300 text-amber-700 px-3 py-1.5 rounded-lg font-extrabold">y</span>
      <span className="text-slate-400">→</span>
      <div className="bg-sky-100 border-2 border-sky-400 text-sky-800 px-4 py-2 rounded-xl font-extrabold">[9, 9, 9]</div>
    </div>
  </div>
);

const DiagramImmutable = () => (
  <div className="flex flex-col gap-3 font-mono text-sm">
    <div className="flex items-center gap-3">
      <span className="bg-amber-100 border border-amber-300 text-amber-700 px-3 py-1.5 rounded-lg font-extrabold">a</span>
      <span className="text-slate-400">→</span>
      <div className="bg-slate-100 border-2 border-slate-300 text-slate-700 px-4 py-2 rounded-xl font-extrabold">42 🔒</div>
    </div>
    <div className="flex items-center gap-3">
      <span className="bg-amber-100 border border-amber-300 text-amber-700 px-3 py-1.5 rounded-lg font-extrabold">b</span>
      <span className="text-slate-400">→</span>
      <div className="bg-sky-100 border-2 border-sky-400 text-sky-800 px-4 py-2 rounded-xl font-extrabold">99 🔒</div>
    </div>
  </div>
);

const DIAGRAMS = [DiagramAlias, DiagramMutate, DiagramRebind, DiagramImmutable];

export const Scene09_HowPythonStores: React.FC = () => {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const Diagram = DIAGRAMS[step];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 h-full w-full max-w-5xl mx-auto px-4 py-4">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 09</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            How Python Stores Objects
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            In Python, variables are <span className="font-bold text-slate-700">references</span> to objects in memory — not boxes containing values. This changes how assignment, mutation, and copying work.
          </p>
        </div>

        {/* Step nav */}
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`flex-1 py-2 rounded-lg text-xs font-extrabold border transition-all cursor-pointer text-center ${
                i === step ? 'bg-amber-500 text-white border-amber-500 shadow' : 'bg-white text-slate-500 border-slate-200 hover:border-amber-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Code block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900 rounded-xl px-5 py-4 font-mono text-sm text-slate-200 flex flex-col gap-1.5"
          >
            <span className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">{current.title}</span>
            {current.code.map((line, i) => (
              <span key={i} className={line.startsWith('#') ? 'text-slate-500' : line.includes('#') ? '' : ''}>
                {line.includes('#') ? (
                  <>
                    <span>{line.split('#')[0]}</span>
                    <span className="text-slate-500"># {line.split('#')[1]}</span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs text-amber-800 font-semibold leading-relaxed">{current.note}</p>
        </div>
      </div>

      {/* Right: diagram */}
      <div className="flex-1 flex flex-col items-center gap-6">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Memory Diagram</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[140px] flex items-center justify-center w-full"
          >
            <Diagram />
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-200 border border-amber-300 inline-block" /> variable</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-400 inline-block" /> mutable</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-200 border border-slate-300 inline-block" /> immutable</span>
        </div>
      </div>
    </div>
  );
};

export default Scene09_HowPythonStores;
