import React from 'react';
import { motion } from 'framer-motion';

const CONCEPTS = [
  { emoji: '🔤', title: 'Types',        desc: 'int, float, str, bool, None — Python infers them automatically', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { emoji: '🏷️', title: 'Variables',    desc: 'Labels pointing to objects in memory — not boxes', color: 'bg-sky-50 border-sky-200 text-sky-700' },
  { emoji: '🔢', title: 'Numbers',      desc: 'int & float. Seven operators: + - * / // % **', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { emoji: '✂️', title: 'Strings',      desc: 'Immutable sequences. Index with [i], slice with [a:b], dozens of methods', color: 'bg-violet-50 border-violet-200 text-violet-700' },
  { emoji: '⚖️', title: 'Booleans',     desc: 'True / False. Comparison operators. Almost any value has truthiness', color: 'bg-rose-50 border-rose-200 text-rose-700' },
  { emoji: '🔄', title: 'Conversion',   desc: 'Explicit casting with int() float() str() bool(). Validate before converting', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { emoji: '🧠', title: 'Memory',       desc: 'Variables are references. Mutable objects can be aliased. Immutables are safe', color: 'bg-teal-50 border-teal-200 text-teal-700' },
];

export const Scene11_ChapterSummary: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 py-4 gap-6">
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Chapter 1 · Summary</span>
      <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1">Your Python Foundation</h2>
      <p className="text-slate-500 text-sm mt-2">Seven concepts that underpin everything you'll write in Python.</p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
      {CONCEPTS.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`flex items-start gap-3 border rounded-xl p-4 ${c.color}`}
        >
          <span className="text-2xl shrink-0">{c.emoji}</span>
          <div>
            <p className="font-extrabold text-sm">{c.title}</p>
            <p className="text-xs mt-0.5 opacity-80 leading-relaxed">{c.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="bg-slate-900 rounded-xl px-6 py-4 font-mono text-xs text-slate-300 w-full max-w-lg text-center"
    >
      <span className="text-slate-500"># Everything in Python is an object</span>
      <br />
      <span className="text-amber-400">type</span>
      <span className="text-amber-300">(</span>
      <span className="text-emerald-400">42</span>
      <span className="text-amber-300">)</span>
      <span className="text-slate-500">  →  </span>
      <span className="text-sky-400">&lt;class 'int'&gt;</span>
      <br />
      <span className="text-amber-400">type</span>
      <span className="text-amber-300">(</span>
      <span className="text-emerald-400">"hello"</span>
      <span className="text-amber-300">)</span>
      <span className="text-slate-500">  →  </span>
      <span className="text-sky-400">&lt;class 'str'&gt;</span>
      <br />
      <span className="text-amber-400">type</span>
      <span className="text-amber-300">(</span>
      <span className="text-amber-400">print</span>
      <span className="text-amber-300">)</span>
      <span className="text-slate-500">  →  </span>
      <span className="text-sky-400">&lt;class 'builtin_function'&gt;</span>
    </motion.div>
  </div>
);

export default Scene11_ChapterSummary;
