import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type VarType = 'int' | 'float' | 'str' | 'bool' | 'none';

const TYPES: {
  key: VarType; label: string; example: string; value: string;
  textColor: string; bgColor: string; borderColor: string; description: string;
}[] = [
  { key: 'int',   label: 'int',   example: 'age = 25',       value: '25',     textColor: 'text-amber-600',   bgColor: 'bg-amber-50',   borderColor: 'border-amber-300',  description: 'Whole numbers — no decimal point. Ages, counts, scores.' },
  { key: 'float', label: 'float', example: 'price = 9.99',   value: '9.99',   textColor: 'text-sky-600',     bgColor: 'bg-sky-50',     borderColor: 'border-sky-300',    description: 'Decimal numbers. Money, measurements, percentages.' },
  { key: 'str',   label: 'str',   example: 'name = "Alice"', value: '"Alice"',textColor: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-300',description: 'Text, always in quotes. Names, messages, URLs.' },
  { key: 'bool',  label: 'bool',  example: 'active = True',  value: 'True',   textColor: 'text-violet-600',  bgColor: 'bg-violet-50',  borderColor: 'border-violet-300', description: 'Just True or False. On/off, yes/no, exists/missing.' },
  { key: 'none',  label: 'None',  example: 'result = None',  value: 'None',   textColor: 'text-slate-500',   bgColor: 'bg-slate-50',   borderColor: 'border-slate-300',  description: 'The absence of a value. Like an empty box waiting to be filled.' },
];

export const Scene03_Variables: React.FC = () => {
  const [active, setActive] = useState<VarType>('str');
  const current = TYPES.find(t => t.key === active)!;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 h-full w-full max-w-7xl mx-auto px-8 py-6">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-7">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 03</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 mt-2 leading-[1.05]">
            Variables are<br />
            <span className="text-amber-500">sticky notes.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg mt-4 leading-relaxed max-w-sm">
            A variable is just a <span className="font-bold text-slate-700">label</span> you stick onto a value. Python figures out the type automatically — you never declare it.
          </p>
        </div>

        {/* Type tabs */}
        <div className="flex flex-wrap gap-2">
          {TYPES.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-extrabold border-2 transition-all cursor-pointer ${
                active === t.key
                  ? `${t.bgColor} ${t.textColor} ${t.borderColor} shadow-sm`
                  : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-2xl border-2 px-6 py-5 ${current.bgColor} ${current.borderColor}`}
          >
            <p className={`text-xs font-extrabold uppercase tracking-wider mb-2 ${current.textColor}`}>What is {current.label}?</p>
            <p className="text-slate-700 text-sm leading-relaxed">{current.description}</p>
            <div className={`mt-4 font-mono text-base font-bold ${current.textColor}`}>
              {current.example}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: memory model */}
      <div className="flex-1 flex flex-col items-center gap-8">
        <div className="w-full max-w-sm flex flex-col gap-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 text-center">Memory Model — What Python actually does</p>

          {/* The sticky note analogy */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg flex flex-col items-center gap-6"
            >
              {/* Label / sticky note */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-amber-100 border-2 border-amber-300 text-amber-800 font-mono font-extrabold text-xl px-6 py-3 rounded-xl shadow-sm">
                  {current.example.split(' =')[0].trim()}
                </div>
                <div className="w-0.5 h-8 bg-slate-300" />
                <span className="text-slate-400 text-xs font-bold">points to →</span>
                <div className="w-0.5 h-4 bg-slate-300" />
              </div>

              {/* Value object */}
              <div className={`border-2 ${current.borderColor} ${current.bgColor} rounded-2xl px-8 py-5 text-center`}>
                <p className={`text-xs font-extrabold uppercase tracking-wider mb-1 ${current.textColor}`}>{current.label} object</p>
                <p className={`font-mono font-black text-3xl ${current.textColor}`}>{current.value}</p>
                <p className="font-mono text-xs text-slate-400 mt-2">id: 0x7f3c…</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-slate-400 text-center leading-relaxed px-4">
            The label can be moved to any value at any time.<br />
            <span className="font-bold text-slate-500">Python handles memory for you.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene03_Variables;
