import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type VarType = 'int' | 'float' | 'str' | 'bool' | 'none';

const TYPES: {
  key: VarType; label: string; example: string; value: string;
  textColor: string; bgColor: string; borderColor: string; description: string;
}[] = [
  { key: 'int',   label: 'int',   example: 'age = 25',       value: '25',      textColor: 'text-amber-600',   bgColor: 'bg-amber-50',   borderColor: 'border-amber-300',   description: 'Whole numbers. Ages, counts, scores.' },
  { key: 'float', label: 'float', example: 'price = 9.99',   value: '9.99',    textColor: 'text-sky-600',     bgColor: 'bg-sky-50',     borderColor: 'border-sky-300',     description: 'Decimal numbers. Money, measurements, percentages.' },
  { key: 'str',   label: 'str',   example: 'name = "Alice"', value: '"Alice"', textColor: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-300', description: 'Text, always in quotes. Names, messages, URLs.' },
  { key: 'bool',  label: 'bool',  example: 'active = True',  value: 'True',    textColor: 'text-violet-600',  bgColor: 'bg-violet-50',  borderColor: 'border-violet-300',  description: 'Just True or False. On/off, yes/no.' },
  { key: 'none',  label: 'None',  example: 'result = None',  value: 'None',    textColor: 'text-slate-500',   bgColor: 'bg-slate-50',   borderColor: 'border-slate-300',   description: 'The absence of a value. An empty box waiting to be filled.' },
];

export const Scene03_Variables: React.FC = () => {
  const [active, setActive] = useState<VarType>('str');
  const current = TYPES.find(t => t.key === active)!;

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">

      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 03</span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-800 mt-1 leading-[1.05]">
            Variables are<br /><span className="text-amber-500">sticky notes.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            A variable is a <span className="font-bold text-slate-700">label</span> you stick onto a value. Python figures out the type automatically — you never declare it.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {TYPES.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border-2 transition-all cursor-pointer ${
                active === t.key
                  ? `${t.bgColor} ${t.textColor} ${t.borderColor} shadow-sm`
                  : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-2xl border-2 px-5 py-4 ${current.bgColor} ${current.borderColor}`}
          >
            <p className={`text-xs font-extrabold uppercase tracking-wider mb-1.5 ${current.textColor}`}>What is {current.label}?</p>
            <p className="text-slate-700 text-sm leading-relaxed">{current.description}</p>
            <div className={`mt-3 font-mono text-sm font-bold ${current.textColor}`}>{current.example}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: memory model */}
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center gap-5">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Memory Model</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg flex flex-col items-center gap-5 w-full max-w-xs"
          >
            <div className="bg-amber-100 border-2 border-amber-300 text-amber-800 font-mono font-extrabold text-lg px-6 py-2.5 rounded-xl shadow-sm">
              {current.example.split(' =')[0].trim()}
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-0.5 h-6 bg-slate-300" />
              <span className="text-slate-400 text-xs font-bold">points to</span>
              <div className="w-0.5 h-4 bg-slate-300" />
            </div>
            <div className={`border-2 ${current.borderColor} ${current.bgColor} rounded-2xl px-7 py-4 text-center`}>
              <p className={`text-xs font-extrabold uppercase tracking-wider mb-1 ${current.textColor}`}>{current.label}</p>
              <p className={`font-mono font-black text-2xl ${current.textColor}`}>{current.value}</p>
              <p className="font-mono text-xs text-slate-400 mt-1.5">id: 0x7f3c…</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-xs text-slate-400 text-center leading-relaxed max-w-[200px]">
          The label can be moved to any value at any time. Python handles memory for you.
        </p>
      </div>
    </div>
  );
};

export default Scene03_Variables;
