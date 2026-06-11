import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Concept {
  icon: string;
  title: string;
  tagline: string;
  color: 'amber' | 'sky' | 'emerald' | 'violet' | 'rose' | 'orange';
  insight: string;
  interview: string;
}

const CONCEPTS: Concept[] = [
  {
    icon: '🏷️',
    title: 'Variables',
    tagline: 'Labels, not boxes',
    color: 'amber',
    insight: 'A variable is a name pointing to an object. Reassigning moves the label, not the object.',
    interview: 'Variables are references. int/str are immutable; lists are mutable.',
  },
  {
    icon: '🔢',
    title: 'int & float',
    tagline: 'Whole vs decimal',
    color: 'sky',
    insight: 'int for whole numbers, float for decimals. Division / always gives float. 0.1 + 0.2 ≠ 0.3.',
    interview: 'float precision trap: never use == with floats, use abs(a-b) < epsilon.',
  },
  {
    icon: '📝',
    title: 'Strings',
    tagline: 'Necklaces of characters',
    color: 'emerald',
    insight: 'str is immutable and indexed from 0. Slice with [start:end]. Methods return new strings.',
    interview: 'str is immutable. s.upper() returns a new string — s is unchanged.',
  },
  {
    icon: '⚖️',
    title: 'Booleans',
    tagline: 'True or False',
    color: 'violet',
    insight: 'bool is a subclass of int. True==1, False==0. Everything has a truthy/falsy value.',
    interview: "0, '', [], None, {} are all falsy. Everything else is truthy.",
  },
  {
    icon: '💬',
    title: 'Input / Output',
    tagline: 'print() speaks, input() listens',
    color: 'rose',
    insight: 'input() always returns str. print() can use f-strings for dynamic output.',
    interview: 'Always convert: int(input()) for numbers. Never assume type from input().',
  },
  {
    icon: '🧠',
    title: 'Memory Model',
    tagline: 'id() is the address',
    color: 'orange',
    insight: 'Objects live in RAM. Variables are just name tags. Mutable objects shared via = can surprise you.',
    interview: 'b = a then b.append(x) changes a too. Use b = a.copy() to avoid aliasing bugs.',
  },
];

const COLOR_MAP: Record<Concept['color'], {
  bg: string; border: string; text: string; badgeBg: string; badgeText: string; interviewBg: string;
}> = {
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-600',
    interviewBg: 'bg-amber-100/60',
  },
  sky: {
    bg: 'bg-sky-50',
    border: 'border-sky-300',
    text: 'text-sky-700',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-600',
    interviewBg: 'bg-sky-100/60',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    text: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-600',
    interviewBg: 'bg-emerald-100/60',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-300',
    text: 'text-violet-700',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-600',
    interviewBg: 'bg-violet-100/60',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-300',
    text: 'text-rose-600',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-600',
    interviewBg: 'bg-rose-100/60',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-600',
    interviewBg: 'bg-orange-100/60',
  },
};

export const Scene13_Summary: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-4 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-start justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
            Scene 13 · Chapter Summary
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Chapter 1{' '}
            <span className="text-amber-500">Complete.</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mt-1">
            You've covered everything Maya needed to know. Click any card to expand.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-amber-50 border-2 border-amber-300 rounded-full px-4 py-1.5">
          <span className="text-amber-500 text-lg">🎉</span>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wide">
            Chapter 1 Complete
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1 min-h-0 overflow-auto">
        {CONCEPTS.map((concept, i) => {
          const c = COLOR_MAP[concept.color];
          const isActive = activeIndex === i;
          return (
            <motion.div
              key={concept.title}
              layout
              onClick={() => setActiveIndex(isActive ? null : i)}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
                isActive ? `${c.bg} ${c.border}` : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Compact header — always visible */}
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{concept.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-black text-slate-800 text-sm`}>{concept.title}</span>
                    {isActive && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badgeBg} ${c.badgeText}`}>
                        expanded
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{concept.tagline}</p>
                </div>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.125, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 flex flex-col gap-2.5">
                      <p className={`text-xs leading-relaxed ${c.text}`}>{concept.insight}</p>
                      <div className={`rounded-xl px-3 py-2 ${c.interviewBg}`}>
                        <span className={`text-xs font-bold uppercase tracking-widest ${c.text} block mb-1`}>
                          Interview tip
                        </span>
                        <p className={`text-xs leading-relaxed font-mono ${c.text}`}>
                          {concept.interview}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Golden rule strip */}
      <div className="shrink-0 bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-4 flex items-center gap-2 flex-wrap">
        <span className="font-mono text-sm text-slate-600">Everything in Python is an</span>
        <span className="font-mono text-sm text-amber-600 font-bold">object.</span>
        <span className="font-mono text-sm text-slate-600">Variables are</span>
        <span className="font-mono text-sm text-sky-600 font-bold">names.</span>
        <span className="font-mono text-sm text-slate-600">Objects live in</span>
        <span className="font-mono text-sm text-emerald-600 font-bold">memory.</span>
      </div>
    </div>
  );
};

export default Scene13_Summary;
