import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OPS = [
  { op: '+',  name: 'Addition',       example: '7 + 3',   result: '10',   color: 'text-amber-500',  note: 'Adds two numbers together.' },
  { op: '-',  name: 'Subtraction',    example: '10 - 4',  result: '6',    color: 'text-sky-500',    note: 'Takes one from another.' },
  { op: '*',  name: 'Multiplication', example: '6 × 7',   result: '42',   color: 'text-emerald-500',note: 'Repeated addition, fast.' },
  { op: '/',  name: 'Division',       example: '9 / 2',   result: '4.5',  color: 'text-violet-500', note: 'Always returns a float, even if clean.' },
  { op: '//', name: 'Floor Division', example: '9 // 2',  result: '4',    color: 'text-rose-500',   note: 'Divides and drops the decimal — rounds down.' },
  { op: '%',  name: 'Modulo',         example: '9 % 2',   result: '1',    color: 'text-orange-500', note: 'The remainder after division. Used for "is it even?"' },
  { op: '**', name: 'Power',          example: '2 ** 10', result: '1024', color: 'text-cyan-500',   note: '2 to the power of 10. Great for scientific work.' },
];

export const Scene04_NumbersArithmetic: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(3);
  const active = OPS[activeIdx];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 h-full w-full max-w-7xl mx-auto px-8 py-6">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-7">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 04</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 mt-2 leading-[1.05]">
            Python is a<br />
            <span className="text-amber-500">calculator</span><br />
            that never sleeps.
          </h2>
          <p className="text-slate-500 text-base mt-4 leading-relaxed max-w-sm">
            Two number types: <span className="font-bold text-slate-700 font-mono">int</span> for whole numbers, <span className="font-bold text-slate-700 font-mono">float</span> for decimals. Seven operators handle every arithmetic you'll ever need.
          </p>
        </div>

        {/* Type callouts */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
            <p className="text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-2">int</p>
            <p className="font-mono text-sm text-slate-700 leading-6">x = 42<br />y = -7<br />score = 100</p>
            <p className="text-xs text-slate-500 mt-2">Whole numbers only. Unlimited size in Python.</p>
          </div>
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4">
            <p className="text-xs font-extrabold text-sky-600 uppercase tracking-wider mb-2">float</p>
            <p className="font-mono text-sm text-slate-700 leading-6">pi = 3.14159<br />tax = 0.08<br />temp = 98.6</p>
            <p className="text-xs text-slate-500 mt-2"><span className="font-bold">/</span> always returns float.</p>
          </div>
        </div>

        {/* Operator row */}
        <div className="flex flex-wrap gap-2">
          {OPS.map((o, i) => (
            <button
              key={o.op}
              onClick={() => setActiveIdx(i)}
              className={`w-12 h-12 rounded-xl font-mono text-lg font-extrabold border-2 transition-all cursor-pointer ${
                i === activeIdx
                  ? `bg-slate-900 text-white border-slate-900 shadow-lg`
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-800'
              }`}
            >
              {o.op}
            </button>
          ))}
        </div>
      </div>

      {/* Right: giant operator display */}
      <div className="flex-1 flex flex-col items-center gap-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-sm flex flex-col gap-4"
          >
            {/* Big display */}
            <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800">
              <p className={`text-sm font-extrabold uppercase tracking-wider mb-5 ${active.color}`}>
                {active.name}
              </p>
              <p className={`font-mono text-4xl md:text-5xl font-black mb-3 ${active.color}`}>
                {active.example}
              </p>
              <div className="w-16 h-0.5 bg-slate-700 mx-auto mb-3" />
              <p className="font-mono text-5xl md:text-6xl font-black text-white">
                {active.result}
              </p>
            </div>

            {/* Note card */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-center shadow-sm">
              <p className="text-slate-700 text-base font-semibold leading-relaxed">{active.note}</p>
            </div>

            {/* REPL snippet */}
            <div className="bg-slate-950 rounded-xl px-5 py-3.5 font-mono text-sm border border-slate-800">
              <span className="text-slate-600">&gt;&gt;&gt; </span>
              <span className={active.color}>{active.example.replace('×', '*')}</span>
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
