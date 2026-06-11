import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CONCEPTS = [
  {
    emoji: '🏷️',
    title: 'Variables',
    tagline: 'Labels, not boxes',
    desc: 'A variable points to an object in memory. Reassigning it just moves the label.',
    code: 'name = "Alice"',
    color: 'border-amber-300 bg-amber-50',
    titleColor: 'text-amber-700',
  },
  {
    emoji: '🔢',
    title: 'Numbers',
    tagline: 'int & float',
    desc: '7 operators: + − * / // % **. Division always gives a float.',
    code: '2 ** 10  # → 1024',
    color: 'border-sky-300 bg-sky-50',
    titleColor: 'text-sky-700',
  },
  {
    emoji: '✂️',
    title: 'Strings',
    tagline: 'Bead necklaces',
    desc: 'Sequences of characters. Index with [i], slice with [a:b], built-in methods do the rest.',
    code: '"Python"[1:4]  # → "yth"',
    color: 'border-emerald-300 bg-emerald-50',
    titleColor: 'text-emerald-700',
  },
  {
    emoji: '⚖️',
    title: 'Booleans',
    tagline: 'True or False',
    desc: 'Comparisons return booleans. Zero, empty, and None are falsy. Everything else is truthy.',
    code: '5 > 3 and [] == []',
    color: 'border-violet-300 bg-violet-50',
    titleColor: 'text-violet-700',
  },
  {
    emoji: '🔄',
    title: 'Conversion',
    tagline: 'Always explicit',
    desc: 'Python won\'t auto-convert. Use int(), float(), str(), bool(). Validate before converting strings.',
    code: 'int("42") + 8  # → 50',
    color: 'border-orange-300 bg-orange-50',
    titleColor: 'text-orange-700',
  },
  {
    emoji: '🧠',
    title: 'Memory model',
    tagline: 'References everywhere',
    desc: 'Lists are mutable — aliases share the same object. Integers and strings are immutable — always safe.',
    code: 'x = [1,2]; y = x  # ⚠',
    color: 'border-rose-300 bg-rose-50',
    titleColor: 'text-rose-700',
  },
];

export const Scene11_ChapterSummary: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Chapter 1 · Summary</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mt-2 leading-tight">
          Your Python foundation — <span className="text-amber-500">mastered.</span>
        </h2>
        <p className="text-slate-500 text-base mt-2">Click any card to zoom in.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1 min-h-0 overflow-hidden">
        {CONCEPTS.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onClick={() => setActive(active === i ? null : i)}
            className={`flex flex-col gap-3 border-2 rounded-3xl p-5 cursor-pointer transition-all hover:shadow-lg ${c.color} ${active === i ? 'ring-4 ring-offset-2 ring-amber-400 shadow-xl' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{c.emoji}</span>
              <div>
                <p className={`font-extrabold text-base ${c.titleColor}`}>{c.title}</p>
                <p className="text-xs text-slate-500 font-medium">{c.tagline}</p>
              </div>
            </div>

            <motion.div
              animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              <div className="mt-3 bg-slate-900 rounded-xl px-3 py-2 font-mono text-xs text-emerald-400">
                {c.code}
              </div>
            </motion.div>

            {active !== i && (
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{c.desc}</p>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-slate-900 rounded-2xl px-8 py-5 font-mono text-sm border border-slate-800 text-center"
      >
        <span className="text-slate-500"># The golden rule —</span>
        <span className="text-white ml-2">everything in Python is an</span>
        <span className="text-amber-400 font-extrabold ml-2">object.</span>
        <span className="text-sky-400 ml-2">int, str, list, function</span>
        <span className="text-slate-500 ml-2">— all of them.</span>
      </motion.div>
    </div>
  );
};

export default Scene11_ChapterSummary;
