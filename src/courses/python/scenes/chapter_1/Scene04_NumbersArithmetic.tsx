import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OPS = [
  { op: '+',  name: 'Addition',       example: '7 + 3',   result: '10',   color: 'text-amber-500',  note: 'Adds two numbers together.' },
  { op: '-',  name: 'Subtraction',    example: '10 - 4',  result: '6',    color: 'text-sky-500',    note: 'Takes one value from another.' },
  { op: '*',  name: 'Multiplication', example: '6 × 7',   result: '42',   color: 'text-emerald-500',note: 'Repeated addition, fast.' },
  { op: '/',  name: 'Division',       example: '9 / 2',   result: '4.5',  color: 'text-violet-500', note: 'Always returns a float, even if clean.' },
  { op: '//', name: 'Floor Div',      example: '9 // 2',  result: '4',    color: 'text-rose-500',   note: 'Divides and drops the decimal — rounds down.' },
  { op: '%',  name: 'Modulo',         example: '9 % 2',   result: '1',    color: 'text-orange-500', note: 'Remainder after division. Used for "is it even?"' },
  { op: '**', name: 'Power',          example: '2 ** 10', result: '1024', color: 'text-cyan-500',   note: '2 to the power of 10. Great for scientific work.' },
];

export const Scene04_NumbersArithmetic: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(3);
  const active = OPS[activeIdx];

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">

      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 04</span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-800 mt-1 leading-[1.05]">
            Python is a calculator<br /><span className="text-amber-500">that never sleeps.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            Two types: <span className="font-bold text-slate-700 font-mono">int</span> for whole numbers, <span className="font-bold text-slate-700 font-mono">float</span> for decimals. Seven operators cover every arithmetic you'll ever need.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3.5">
            <p className="text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-1.5">int</p>
            <p className="font-mono text-xs text-slate-700 leading-5">x = 42<br />y = -7<br />score = 100</p>
            <p className="text-xs text-slate-500 mt-1.5">Whole numbers. Unlimited size in Python.</p>
          </div>
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3.5">
            <p className="text-xs font-extrabold text-sky-600 uppercase tracking-wider mb-1.5">float</p>
            <p className="font-mono text-xs text-slate-700 leading-5">pi = 3.14159<br />tax = 0.08<br />temp = 98.6</p>
            <p className="text-xs text-slate-500 mt-1.5"><span className="font-bold">/</span> always returns float.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {OPS.map((o, i) => (
            <button
              key={o.op}
              onClick={() => setActiveIdx(i)}
              className={`w-10 h-10 rounded-xl font-mono text-base font-extrabold border-2 transition-all cursor-pointer ${
                i === activeIdx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-800'
              }`}
            >
              {o.op}
            </button>
          ))}
        </div>
      </div>

      {/* Right: operator display */}
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.22 }}
            className="w-full max-w-sm flex flex-col gap-3"
          >
            <div className="bg-slate-900 rounded-3xl p-7 text-center border border-slate-800">
              <p className={`text-xs font-extrabold uppercase tracking-wider mb-4 ${active.color}`}>{active.name}</p>
              <p className={`font-mono text-3xl lg:text-4xl font-black mb-3 ${active.color}`}>{active.example}</p>
              <div className="w-12 h-0.5 bg-slate-700 mx-auto mb-3" />
              <p className="font-mono text-4xl lg:text-5xl font-black text-white">{active.result}</p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl px-5 py-3 text-center shadow-sm">
              <p className="text-slate-700 text-sm font-semibold leading-snug">{active.note}</p>
            </div>

            <div className="bg-slate-950 rounded-xl px-4 py-3 font-mono text-xs border border-slate-800">
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
