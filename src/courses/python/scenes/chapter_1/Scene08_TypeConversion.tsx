import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FromType = 'int' | 'float' | 'str' | 'bool';

const CONVERSIONS: Record<FromType, { to: string; call: string; input: string; output: string; safe: boolean; warning?: string }[]> = {
  int: [
    { to: 'float', call: 'float(42)',     input: '42',    output: '42.0',   safe: true  },
    { to: 'str',   call: 'str(42)',       input: '42',    output: '"42"',   safe: true  },
    { to: 'bool',  call: 'bool(0)',       input: '0',     output: 'False',  safe: true  },
    { to: 'bool',  call: 'bool(42)',      input: '42',    output: 'True',   safe: true  },
  ],
  float: [
    { to: 'int',   call: 'int(3.9)',      input: '3.9',   output: '3',      safe: false, warning: 'Truncates — 3.9 becomes 3, not 4.' },
    { to: 'int',   call: 'int(9.99)',     input: '9.99',  output: '9',      safe: false, warning: 'Always truncates toward zero, never rounds.' },
    { to: 'str',   call: 'str(3.14)',     input: '3.14',  output: '"3.14"', safe: true  },
    { to: 'bool',  call: 'bool(0.0)',     input: '0.0',   output: 'False',  safe: true  },
  ],
  str: [
    { to: 'int',   call: 'int("42")',     input: '"42"',  output: '42',     safe: true  },
    { to: 'int',   call: 'int("hello")',  input: '"hello"',output:'ValueError!', safe: false, warning: 'Python can\'t convert letters to numbers. Validate first!' },
    { to: 'float', call: 'float("3.14")',input: '"3.14"', output: '3.14',   safe: true  },
    { to: 'bool',  call: 'bool("")',      input: '""',    output: 'False',  safe: true  },
  ],
  bool: [
    { to: 'int',   call: 'int(True)',     input: 'True',  output: '1',      safe: true  },
    { to: 'int',   call: 'int(False)',    input: 'False', output: '0',      safe: true  },
    { to: 'str',   call: 'str(True)',     input: 'True',  output: '"True"', safe: true  },
    { to: 'float', call: 'float(True)',   input: 'True',  output: '1.0',    safe: true  },
  ],
};

const TYPE_STYLES: Record<FromType, { text: string; bg: string; border: string }> = {
  int:   { text: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-300' },
  float: { text: 'text-sky-600',     bg: 'bg-sky-50',     border: 'border-sky-300' },
  str:   { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-300' },
  bool:  { text: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-300' },
};

export const Scene08_TypeConversion: React.FC = () => {
  const [from, setFrom] = useState<FromType>('str');
  const style = TYPE_STYLES[from];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 h-full w-full max-w-7xl mx-auto px-8 py-6">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-7">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 08</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 mt-2 leading-[1.05]">
            Python won't<br />
            mix types.<br />
            <span className="text-amber-500">You must convert.</span>
          </h2>
          <p className="text-slate-500 text-base mt-4 leading-relaxed max-w-sm">
            Think of it like currency exchange. £10 and $10 aren't the same — you have to explicitly convert. Python's built-in functions do that for types.
          </p>
        </div>

        {/* Source type buttons */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Convert FROM:</p>
          <div className="flex gap-2">
            {(['int', 'float', 'str', 'bool'] as FromType[]).map(t => {
              const s = TYPE_STYLES[t];
              return (
                <button
                  key={t}
                  onClick={() => setFrom(t)}
                  className={`flex-1 py-3 rounded-2xl font-mono text-sm font-extrabold border-2 transition-all cursor-pointer ${
                    from === t ? `${s.bg} ${s.text} ${s.border} shadow-sm` : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick reference */}
        <div className="bg-slate-900 rounded-2xl px-6 py-5 font-mono text-sm leading-7 border border-slate-800">
          <span className="text-slate-500"># The four conversion functions</span><br />
          <span className="text-amber-400">int</span><span className="text-slate-300">(x)    </span><span className="text-slate-500"># → whole number</span><br />
          <span className="text-sky-400">float</span><span className="text-slate-300">(x)  </span><span className="text-slate-500"># → decimal number</span><br />
          <span className="text-emerald-400">str</span><span className="text-slate-300">(x)    </span><span className="text-slate-500"># → text</span><br />
          <span className="text-violet-400">bool</span><span className="text-slate-300">(x)   </span><span className="text-slate-500"># → True or False</span>
        </div>
      </div>

      {/* Right: conversion results */}
      <div className="flex-1 flex flex-col gap-4">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Conversions from <span className={`font-mono ${style.text}`}>{from}</span>:
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={from}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            {CONVERSIONS[from].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="flex items-center">
                  <div className={`px-5 py-3.5 border-r border-slate-200 font-mono text-sm font-extrabold min-w-[90px] text-center ${style.bg} ${style.text}`}>
                    {c.input}
                  </div>
                  <div className="flex-1 px-5 py-3.5">
                    <span className="font-mono text-sm font-bold text-slate-700">{c.call}</span>
                  </div>
                  <div className={`px-5 py-3.5 border-l border-slate-200 font-mono text-sm font-extrabold min-w-[90px] text-center ${
                    c.output.includes('Error') ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {c.output}
                  </div>
                </div>
                {c.warning && (
                  <div className="px-5 py-2 bg-amber-50 border-t border-amber-200">
                    <p className="text-xs text-amber-700 font-semibold">⚠ {c.warning}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene08_TypeConversion;
