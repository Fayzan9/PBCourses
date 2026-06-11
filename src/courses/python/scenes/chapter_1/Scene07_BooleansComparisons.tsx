import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CMP_OPS = [
  { op: '==',  label: 'Equal to',     left: '5',   right: '5',       result: true,  note: '"Does this equal that?" — be careful: == checks value, not identity.' },
  { op: '!=',  label: 'Not equal',    left: '5',   right: '6',       result: true,  note: '"Are these different?" Opposite of ==.' },
  { op: '>',   label: 'Greater than', left: '7',   right: '3',       result: true,  note: 'Is the left side bigger?' },
  { op: '<',   label: 'Less than',    left: '2',   right: '9',       result: true,  note: 'Is the left side smaller?' },
  { op: 'is',  label: 'Identity',     left: 'x',   right: 'None',    result: true,  note: '"Is this the exact same object in memory?" — not the same as ==' },
  { op: 'in',  label: 'Membership',   left: '"py"',right: '"python"', result: true, note: '"Is this value inside that container?" Works on strings and lists.' },
];

const TRUTHINESS = [
  { val: '0',      truthy: false },
  { val: '"hi"',   truthy: true  },
  { val: '""',     truthy: false },
  { val: '[1,2]',  truthy: true  },
  { val: '[]',     truthy: false },
  { val: 'None',   truthy: false },
  { val: '99',     truthy: true  },
];

export const Scene07_BooleansComparisons: React.FC = () => {
  const [activeOp, setActiveOp] = useState(0);
  const current = CMP_OPS[activeOp];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 h-full w-full max-w-7xl mx-auto px-8 py-6">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-7">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 07</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 mt-2 leading-[1.05]">
            Python asks<br />
            questions.<br />
            <span className="text-amber-500">You get True or False.</span>
          </h2>
          <p className="text-slate-500 text-base mt-4 leading-relaxed max-w-sm">
            Every comparison produces a boolean — <span className="font-mono font-bold text-emerald-600">True</span> or <span className="font-mono font-bold text-rose-500">False</span>. These power every decision your program makes.
          </p>
        </div>

        {/* Operator buttons */}
        <div className="flex flex-wrap gap-2">
          {CMP_OPS.map((c, i) => (
            <button
              key={c.op}
              onClick={() => setActiveOp(i)}
              className={`px-4 py-2.5 rounded-xl font-mono text-sm font-extrabold border-2 transition-all cursor-pointer ${
                i === activeOp
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-800'
              }`}
            >
              {c.op}
            </button>
          ))}
        </div>

        {/* Active operator detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeOp}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900 rounded-2xl px-6 py-5 border border-slate-800"
          >
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">{current.label}</p>
            <div className="flex items-center gap-3 font-mono text-base mb-2">
              <span className="text-slate-500">&gt;&gt;&gt; </span>
              <span className="text-amber-300">{current.left}</span>
              <span className="text-slate-300 font-bold"> {current.op} </span>
              <span className="text-amber-300">{current.right}</span>
              <span className="text-emerald-400 ml-2">→ True</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mt-3">{current.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: truthiness */}
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <p className="text-base font-extrabold text-slate-700">Truthiness — the secret boolean rule</p>
          <p className="text-sm text-slate-500 mt-1">In Python, any value can act as a boolean. Most things are <span className="text-emerald-600 font-bold">truthy</span>. A few are <span className="text-rose-500 font-bold">falsy</span>.</p>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {TRUTHINESS.map((t, i) => (
            <motion.div
              key={t.val}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm"
            >
              <span className={`w-20 text-center font-extrabold text-sm px-3 py-1.5 rounded-xl border-2 ${
                t.truthy
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-rose-50 text-rose-600 border-rose-300'
              }`}>
                {t.truthy ? 'Truthy ✓' : 'Falsy ✗'}
              </span>
              <span className="font-mono text-base font-bold text-slate-700 flex-1">{t.val}</span>
              <span className="font-mono text-xs text-slate-400">
                if {t.val}:  <span className={t.truthy ? 'text-emerald-500' : 'text-rose-400'}>{t.truthy ? '✓ runs' : '✗ skips'}</span>
              </span>
            </motion.div>
          ))}
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-4">
          <p className="text-sm font-semibold text-amber-800">
            <span className="font-extrabold">Memory trick:</span> Zero, empty, and None are falsy. Everything else is truthy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene07_BooleansComparisons;
