import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OPS = [
  { op: '+',  name: 'Add',        example: '7 + 3',    result: '10',   note: 'Basic addition' },
  { op: '-',  name: 'Subtract',   example: '10 - 4',   result: '6',    note: 'Basic subtraction' },
  { op: '*',  name: 'Multiply',   example: '6 * 7',    result: '42',   note: 'Multiplication' },
  { op: '/',  name: 'Divide',     example: '9 / 2',    result: '4.5',  note: 'Always returns a float' },
  { op: '//', name: 'Floor Div',  example: '9 // 2',   result: '4',    note: 'Drops the decimal (floor)' },
  { op: '%',  name: 'Modulo',     example: '9 % 2',    result: '1',    note: 'Remainder after division' },
  { op: '**', name: 'Power',      example: '2 ** 10',  result: '1024', note: 'Exponentiation' },
];

export const Scene04_NumbersArithmetic: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = OPS[activeIdx];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 h-full w-full max-w-5xl mx-auto px-4 py-4">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 04</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            Numbers & Arithmetic
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Python has two main number types: <span className="font-bold text-slate-700">int</span> (whole numbers) and <span className="font-bold text-slate-700">float</span> (decimals). Seven operators let you do any arithmetic you need.
          </p>
        </div>

        {/* Type comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-2">int</p>
            <p className="font-mono text-sm text-slate-700">x = 42</p>
            <p className="font-mono text-sm text-slate-700">y = -7</p>
            <p className="text-xs text-slate-500 mt-2">Whole numbers, no decimal point. Unlimited precision in Python.</p>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
            <p className="text-xs font-extrabold text-sky-600 uppercase tracking-wider mb-2">float</p>
            <p className="font-mono text-sm text-slate-700">pi = 3.14159</p>
            <p className="font-mono text-sm text-slate-700">e = 2.718</p>
            <p className="text-xs text-slate-500 mt-2">Decimal numbers. Division <span className="font-bold">/</span> always produces a float.</p>
          </div>
        </div>

        {/* Operator grid */}
        <div className="flex flex-wrap gap-2">
          {OPS.map((o, i) => (
            <button
              key={o.op}
              onClick={() => setActiveIdx(i)}
              className={`px-3 py-1.5 rounded-lg font-mono text-sm font-extrabold border transition-all cursor-pointer ${
                i === activeIdx
                  ? 'bg-amber-500 text-white border-amber-500 shadow'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-600'
              }`}
            >
              {o.op}
            </button>
          ))}
        </div>
      </div>

      {/* Right: live operator view */}
      <div className="flex-1 flex flex-col items-center gap-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-sm flex flex-col gap-4"
          >
            {/* Big operator display */}
            <div className="bg-slate-900 rounded-2xl p-6 text-center">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">{active.name}</p>
              <p className="font-mono text-4xl font-extrabold text-amber-400">{active.example}</p>
              <div className="w-12 h-0.5 bg-slate-700 mx-auto my-4" />
              <p className="font-mono text-5xl font-black text-emerald-400">{active.result}</p>
            </div>

            {/* Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-center">
              <p className="text-sm font-semibold text-amber-700">{active.note}</p>
            </div>

            {/* Code snippet */}
            <div className="bg-slate-900 rounded-xl px-5 py-3 font-mono text-sm text-slate-300">
              <span className="text-slate-500">&gt;&gt;&gt; </span>
              <span className="text-amber-300">{active.example}</span>
              <br />
              <span className="text-emerald-400">{active.result}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene04_NumbersArithmetic;
