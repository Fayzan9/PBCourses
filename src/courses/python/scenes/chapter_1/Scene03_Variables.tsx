import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type VarType = 'int' | 'float' | 'str' | 'bool' | 'none';

const TYPES: { key: VarType; label: string; color: string; bg: string; example: string; value: string }[] = [
  { key: 'int',   label: 'int',   color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-200',   example: 'age = 25',          value: '25' },
  { key: 'float', label: 'float', color: 'text-sky-600',    bg: 'bg-sky-50 border-sky-200',        example: 'price = 9.99',      value: '9.99' },
  { key: 'str',   label: 'str',   color: 'text-emerald-600',bg: 'bg-emerald-50 border-emerald-200',example: 'name = "Alice"',    value: '"Alice"' },
  { key: 'bool',  label: 'bool',  color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200',  example: 'active = True',     value: 'True' },
  { key: 'none',  label: 'None',  color: 'text-slate-500',  bg: 'bg-slate-50 border-slate-200',    example: 'result = None',     value: 'None' },
];

export const Scene03_Variables: React.FC = () => {
  const [active, setActive] = useState<VarType>('int');
  const current = TYPES.find(t => t.key === active)!;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 h-full w-full max-w-5xl mx-auto px-4 py-4">
      {/* Left: explanation */}
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 03</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            Data Types & Variables
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Variables are labels pointing to objects in memory. Python figures out the type automatically — you never declare it.
          </p>
        </div>

        {/* Type selector */}
        <div className="flex flex-wrap gap-2">
          {TYPES.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold border transition-all cursor-pointer ${
                active === t.key ? `${t.bg} ${t.color} border-current shadow-sm` : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Code block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-slate-900 rounded-xl px-5 py-4 font-mono text-sm text-slate-200"
          >
            <span className="text-slate-500"># type is inferred automatically</span>
            <br />
            <span className={current.color}>{current.example}</span>
            <br />
            <span className="text-slate-400">print(type(x))  </span>
            <span className="text-emerald-400"># &lt;class '{current.label}'&gt;</span>
          </motion.div>
        </AnimatePresence>

        <p className="text-xs text-slate-400 font-medium">
          Python also lets you <span className="font-bold text-slate-600">reassign</span> a variable to a completely different type — it just creates a new object.
        </p>
      </div>

      {/* Right: memory model */}
      <div className="flex-1 flex flex-col gap-4 items-center">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Memory Model</p>

        <div className="w-full max-w-xs flex flex-col gap-3">
          {/* Variable box */}
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Variable (label)</span>
              <span className="font-mono font-extrabold text-slate-800 text-lg">
                {current.example.split(' = ')[0]}
              </span>
            </div>
            <span className="text-2xl text-slate-300">→</span>
            {/* Object box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className={`flex flex-col items-center border rounded-xl px-4 py-2 ${current.bg}`}
              >
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${current.color}`}>{current.label}</span>
                <span className={`font-mono font-extrabold text-lg ${current.color}`}>{current.value}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* id() */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Memory Address</span>
            <p className="font-mono text-xs text-slate-600 mt-1">id({current.example.split(' = ')[0]}) → <span className="text-amber-500 font-bold">0x7f3c…</span></p>
          </div>

          <p className="text-xs text-slate-400 text-center leading-relaxed px-2">
            The variable name is just a <span className="font-bold text-slate-600">pointer</span>. The actual value lives in memory at an address Python manages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene03_Variables;
