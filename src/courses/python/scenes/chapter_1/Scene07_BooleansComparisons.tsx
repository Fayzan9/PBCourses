import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CMP_OPS = [
  { op: '==',  label: 'Equal',              ex: ['5 == 5', 'True'], ex2: ['5 == 6', 'False'] },
  { op: '!=',  label: 'Not Equal',          ex: ['5 != 6', 'True'], ex2: ['5 != 5', 'False'] },
  { op: '>',   label: 'Greater Than',       ex: ['7 > 3', 'True'],  ex2: ['3 > 7', 'False'] },
  { op: '<',   label: 'Less Than',          ex: ['2 < 9', 'True'],  ex2: ['9 < 2', 'False'] },
  { op: 'is',  label: 'Identity',           ex: ['x is None', 'True'], ex2: ['[] is []', 'False'] },
  { op: 'in',  label: 'Membership',         ex: ['"py" in "python"', 'True'], ex2: ['"x" in "python"', 'False'] },
];

const TRUTHINESS = [
  { val: '0',       truthy: false, note: 'Zero is falsy' },
  { val: '1',       truthy: true,  note: 'Non-zero is truthy' },
  { val: '""',      truthy: false, note: 'Empty string is falsy' },
  { val: '"hi"',    truthy: true,  note: 'Non-empty string is truthy' },
  { val: '[]',      truthy: false, note: 'Empty list is falsy' },
  { val: '[1,2]',   truthy: true,  note: 'Non-empty list is truthy' },
  { val: 'None',    truthy: false, note: 'None is always falsy' },
];

export const Scene07_BooleansComparisons: React.FC = () => {
  const [activeOp, setActiveOp] = useState(0);
  const current = CMP_OPS[activeOp];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 h-full w-full max-w-5xl mx-auto px-4 py-4">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 07</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            Booleans & Comparisons
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Comparisons always return <span className="font-mono font-bold text-emerald-600">True</span> or <span className="font-mono font-bold text-rose-500">False</span>. Python also has <span className="font-bold text-slate-700">truthiness</span> — almost any value can act as a boolean.
          </p>
        </div>

        {/* Operator buttons */}
        <div className="flex flex-wrap gap-2">
          {CMP_OPS.map((c, i) => (
            <button
              key={c.op}
              onClick={() => setActiveOp(i)}
              className={`px-3 py-1.5 rounded-lg font-mono text-sm font-extrabold border transition-all cursor-pointer ${
                i === activeOp
                  ? 'bg-amber-500 text-white border-amber-500 shadow'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-600'
              }`}
            >
              {c.op}
            </button>
          ))}
        </div>

        {/* Operator detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeOp}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900 rounded-xl px-5 py-4 font-mono text-sm text-slate-200 flex flex-col gap-2"
          >
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">{current.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-slate-500">&gt;&gt;&gt; </span>
              <span className="text-amber-300">{current.ex[0]}</span>
              <span className="text-emerald-400">→ {current.ex[1]}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500">&gt;&gt;&gt; </span>
              <span className="text-amber-300">{current.ex2[0]}</span>
              <span className="text-rose-400">→ {current.ex2[1]}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: truthiness table */}
      <div className="flex-1 flex flex-col gap-4">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Truthiness — if value:</p>
        <div className="flex flex-col gap-1.5">
          {TRUTHINESS.map((t, i) => (
            <motion.div
              key={t.val}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm"
            >
              <span className={`w-16 text-center font-mono text-xs font-extrabold px-2 py-1 rounded-lg ${
                t.truthy ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
              }`}>
                {t.truthy ? 'Truthy' : 'Falsy'}
              </span>
              <span className="font-mono text-sm font-bold text-slate-700 w-16">{t.val}</span>
              <span className="text-xs text-slate-400 flex-1">{t.note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scene07_BooleansComparisons;
