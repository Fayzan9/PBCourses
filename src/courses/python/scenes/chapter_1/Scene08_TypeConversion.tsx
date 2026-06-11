import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FromType = 'int' | 'float' | 'str' | 'bool';

const CONVERSIONS: Record<FromType, { to: string; fn: string; input: string; output: string; safe: boolean }[]> = {
  int: [
    { to: 'float', fn: 'float(42)',   input: '42',    output: '42.0',  safe: true },
    { to: 'str',   fn: 'str(42)',     input: '42',    output: '"42"',  safe: true },
    { to: 'bool',  fn: 'bool(0)',     input: '0',     output: 'False', safe: true },
  ],
  float: [
    { to: 'int',   fn: 'int(3.9)',    input: '3.9',   output: '3',     safe: false },
    { to: 'str',   fn: 'str(3.14)',   input: '3.14',  output: '"3.14"',safe: true },
    { to: 'bool',  fn: 'bool(0.0)',   input: '0.0',   output: 'False', safe: true },
  ],
  str: [
    { to: 'int',   fn: 'int("42")',   input: '"42"',  output: '42',    safe: true },
    { to: 'int',   fn: 'int("hi")',   input: '"hi"',  output: 'ValueError!', safe: false },
    { to: 'float', fn: 'float("3.14")',input:'"3.14"',output: '3.14',  safe: true },
  ],
  bool: [
    { to: 'int',   fn: 'int(True)',   input: 'True',  output: '1',     safe: true },
    { to: 'int',   fn: 'int(False)',  input: 'False', output: '0',     safe: true },
    { to: 'str',   fn: 'str(True)',   input: 'True',  output: '"True"',safe: true },
  ],
};

const TYPE_COLOR: Record<FromType, string> = {
  int:   'text-amber-600 bg-amber-50 border-amber-200',
  float: 'text-sky-600 bg-sky-50 border-sky-200',
  str:   'text-emerald-600 bg-emerald-50 border-emerald-200',
  bool:  'text-violet-600 bg-violet-50 border-violet-200',
};

export const Scene08_TypeConversion: React.FC = () => {
  const [from, setFrom] = useState<FromType>('str');

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 h-full w-full max-w-5xl mx-auto px-4 py-4">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 08</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            Type Conversion
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Python won't silently mix types for you. Use <span className="font-mono font-bold text-slate-700">int()</span>, <span className="font-mono font-bold text-slate-700">float()</span>, <span className="font-mono font-bold text-slate-700">str()</span>, and <span className="font-mono font-bold text-slate-700">bool()</span> to convert explicitly.
          </p>
        </div>

        {/* Source type selector */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Convert FROM:</p>
          <div className="flex gap-2">
            {(['int', 'float', 'str', 'bool'] as FromType[]).map(t => (
              <button
                key={t}
                onClick={() => setFrom(t)}
                className={`px-4 py-2 rounded-xl font-mono text-sm font-extrabold border transition-all cursor-pointer ${
                  from === t ? TYPE_COLOR[t] + ' shadow' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Watch out note */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
          <p className="text-xs font-extrabold text-rose-600 uppercase tracking-wider mb-1">⚠ Watch out</p>
          <p className="text-xs text-rose-700">Converting a string like <span className="font-mono">"hello"</span> to <span className="font-mono">int</span> raises a <span className="font-mono font-bold">ValueError</span> at runtime. Always validate user input first.</p>
        </div>
      </div>

      {/* Right: conversion cards */}
      <div className="flex-1 flex flex-col gap-3">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Conversions from <span className={`font-mono ${TYPE_COLOR[from].split(' ')[0]}`}>{from}</span>:</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={from}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            {CONVERSIONS[from].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="flex items-center">
                  {/* From */}
                  <div className={`px-4 py-3 border-r border-slate-200 font-mono text-sm font-extrabold ${TYPE_COLOR[from]}`}>
                    {c.input}
                  </div>
                  {/* Arrow + function */}
                  <div className="flex-1 px-4 py-3">
                    <span className="font-mono text-sm text-slate-700 font-bold">{c.fn}</span>
                  </div>
                  {/* Output */}
                  <div className={`px-4 py-3 border-l border-slate-200 font-mono text-sm font-extrabold ${
                    c.output.includes('Error') ? 'text-rose-600 bg-rose-50' : 'text-emerald-700 bg-emerald-50'
                  }`}>
                    {c.output}
                  </div>
                </div>
                {!c.safe && !c.output.includes('Error') && (
                  <div className="px-4 py-1.5 bg-amber-50 border-t border-amber-200">
                    <p className="text-[10px] text-amber-700 font-bold">⚠ Truncates decimal — 3.9 becomes 3</p>
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
