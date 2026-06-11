import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    title: 'Two names, one object',
    subtitle: 'Aliasing — the most common surprise in Python',
    code: ['x = [1, 2, 3]', 'y = x  # NOT a copy — same list!'],
    diagram: () => (
      <div className="flex items-center gap-6 font-mono text-sm">
        <div className="flex flex-col gap-3">
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-2 rounded-xl font-extrabold text-center">x</div>
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-2 rounded-xl font-extrabold text-center">y</div>
        </div>
        <div className="flex flex-col gap-3 text-slate-400 text-lg">
          <span>─→</span>
          <span>─→</span>
        </div>
        <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-800 px-6 py-4 rounded-2xl font-extrabold text-center shadow-md">
          [1, 2, 3]<br />
          <span className="text-[10px] text-emerald-500 font-mono">same object in memory</span>
        </div>
      </div>
    ),
    insight: 'Think of it like two remote controls for the same TV. Either one can change the channel.',
  },
  {
    title: 'One mutation, visible everywhere',
    subtitle: 'Because both names point to the same list',
    code: ['y.append(4)', 'print(x)  # [1, 2, 3, 4] 😲'],
    diagram: () => (
      <div className="flex items-center gap-6 font-mono text-sm">
        <div className="flex flex-col gap-3">
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-2 rounded-xl font-extrabold text-center">x</div>
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-2 rounded-xl font-extrabold text-center">y</div>
        </div>
        <div className="flex flex-col gap-3 text-slate-400 text-lg">
          <span>─→</span>
          <span>─→</span>
        </div>
        <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-800 px-6 py-4 rounded-2xl font-extrabold text-center shadow-md">
          [1, 2, 3, <span className="text-rose-600 font-black">4</span>]<br />
          <span className="text-[10px] text-emerald-500 font-mono">mutated via y — x sees it too</span>
        </div>
      </div>
    ),
    insight: 'y.append changed the shared list. x didn\'t move — it still points to the same place, now with new content.',
  },
  {
    title: 'Rebinding only moves the label',
    subtitle: 'Assigning y to something new doesn\'t touch x',
    code: ['y = [9, 9, 9]  # new list, new home', 'print(x)  # [1, 2, 3, 4] — untouched'],
    diagram: () => (
      <div className="flex flex-col gap-4 font-mono text-sm">
        <div className="flex items-center gap-5">
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-2 rounded-xl font-extrabold">x</div>
          <span className="text-slate-400 text-lg">─→</span>
          <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-800 px-5 py-3 rounded-2xl font-extrabold">[1, 2, 3, 4]</div>
        </div>
        <div className="flex items-center gap-5">
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-2 rounded-xl font-extrabold">y</div>
          <span className="text-slate-400 text-lg">─→</span>
          <div className="bg-sky-100 border-2 border-sky-500 text-sky-800 px-5 py-3 rounded-2xl font-extrabold">[9, 9, 9] ← new</div>
        </div>
      </div>
    ),
    insight: 'Rebinding (y = ...) just moves where y points. It has no effect on x whatsoever.',
  },
  {
    title: 'Integers & strings never alias',
    subtitle: 'Immutable types are always safe',
    code: ['a = 42', 'b = a', 'b = 99  # brand new int object', 'print(a)  # 42 — safe'],
    diagram: () => (
      <div className="flex flex-col gap-4 font-mono text-sm">
        <div className="flex items-center gap-5">
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-2 rounded-xl font-extrabold">a</div>
          <span className="text-slate-400 text-lg">─→</span>
          <div className="bg-slate-100 border-2 border-slate-400 text-slate-700 px-5 py-3 rounded-2xl font-extrabold">42 🔒</div>
        </div>
        <div className="flex items-center gap-5">
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-2 rounded-xl font-extrabold">b</div>
          <span className="text-slate-400 text-lg">─→</span>
          <div className="bg-sky-100 border-2 border-sky-400 text-sky-800 px-5 py-3 rounded-2xl font-extrabold">99 🔒</div>
        </div>
        <p className="text-xs text-slate-500 mt-1">🔒 = immutable — can never be changed, only replaced</p>
      </div>
    ),
    insight: 'Numbers and strings are immutable — no method can change them in-place, so aliasing is never a problem.',
  },
];

export const Scene09_HowPythonStores: React.FC = () => {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const Diagram = current.diagram;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 h-full w-full max-w-7xl mx-auto px-8 py-6">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-7">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 09</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mt-2 leading-[1.1]">
            Variables are<br />
            <span className="text-amber-500">name tags,</span><br />
            not boxes.
          </h2>
          <p className="text-slate-500 text-base mt-4 leading-relaxed max-w-sm">
            This single idea prevents some of Python's most confusing bugs. Walk through each scenario to see exactly what Python does in memory.
          </p>
        </div>

        {/* Step tabs */}
        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                i === step
                  ? 'bg-amber-500 text-white border-amber-500 shadow-lg'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-amber-300'
              }`}
            >
              <span className="font-extrabold text-lg">{i + 1}</span>
              <span className="text-[10px] font-bold leading-tight">{['Alias', 'Mutate', 'Rebind', 'Immut.'][i]}</span>
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
            transition={{ duration: 0.2 }}
            className="bg-slate-900 rounded-2xl px-6 py-5 font-mono text-sm leading-7 border border-slate-800"
          >
            <span className="text-xs text-slate-500 uppercase tracking-wider font-extrabold block mb-2">{current.subtitle}</span>
            {current.code.map((line, i) => (
              <div key={i} className={line.startsWith('#') || line.includes('  #') ? '' : ''}>
                {line.includes('  #') ? (
                  <>
                    <span className="text-slate-200">{line.split('  #')[0]}</span>
                    <span className="text-slate-500">  #{line.split('  #')[1]}</span>
                  </>
                ) : line.startsWith('#') ? (
                  <span className="text-slate-500">{line}</span>
                ) : (
                  <span className="text-slate-200">{line}</span>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: diagram + insight */}
      <div className="flex-1 flex flex-col items-center gap-6">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Memory Diagram</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ duration: 0.28 }}
            className="w-full bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-lg min-h-[160px] flex items-center justify-center"
          >
            <Diagram />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={step + 'insight'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-4 w-full"
          >
            <p className="text-amber-800 text-sm font-semibold leading-relaxed">
              💡 {current.insight}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene09_HowPythonStores;
