import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ArrowRight } from 'lucide-react';

type VarKey = 'name' | 'age' | 'score';

const MEMORY_DATA: Record<VarKey, { type: string; value: string; id: string; callout: string }> = {
  name:  { type: 'str',  value: '"Maya"', id: '0x7f3c1a', callout: 'id(name) → 0x7f3c1a — this is the address in RAM where "Maya" lives' },
  age:   { type: 'int',  value: '22',     id: '0x7f3c2b', callout: 'id(age) → 0x7f3c2b — the integer 22 lives at this address in RAM' },
  score: { type: 'int',  value: '100',    id: '0x7f3c3c', callout: 'id(score) → 0x7f3c3c — the integer 100 has its own unique address' },
};

const VARS: VarKey[] = ['name', 'age', 'score'];

export const Scene06a_MemoryModel: React.FC = () => {
  const [activeVar, setActiveVar] = useState<VarKey | null>(null);

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
          Scene 06a · Memory Model
        </span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          Variables don't store values. They store{' '}
          <span className="text-amber-500">addresses.</span>
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mt-2">
          When Maya types <code className="font-mono text-sm bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-md">name = "Maya"</code>, Python doesn't put "Maya" inside the variable box — it creates an object in RAM and stores the <em>address</em> of that object.
        </p>
      </div>

      {/* Main content */}
      <div className="flex flex-1 gap-5 min-h-0">
        {/* LEFT: Concept cards */}
        <div className="flex flex-col gap-4 w-2/5">
          <motion.div
            className="bg-white border border-slate-200 rounded-2xl p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">1️⃣</span>
              <span className="font-bold text-slate-700 text-sm">Object created first</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Python creates the object in memory <em>before</em> assigning the name. The value exists in RAM independently of any variable.
            </p>
          </motion.div>

          <motion.div
            className="bg-white border border-slate-200 rounded-2xl p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">2️⃣</span>
              <span className="font-bold text-slate-700 text-sm">Variable = address card</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The variable name is like a sticky note that holds a memory address — a pointer to where the actual object lives.
            </p>
          </motion.div>

          <motion.div
            className="bg-white border border-slate-200 rounded-2xl p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">3️⃣</span>
              <span className="font-bold text-slate-700 text-sm">id() shows the address</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              <code className="font-mono text-sm bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-md">id(x)</code> returns the unique identity of the object — its exact location in RAM.
            </p>
          </motion.div>

          {/* Key message */}
          <motion.div
            className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-2">
              <Database className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-amber-800 text-sm leading-relaxed font-medium">
                Python manages memory for you. You never write to addresses directly — that's what makes Python safe.
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: RAM Shelf visualization */}
        <div className="flex-1 flex flex-col gap-3">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
            <Database className="w-3 h-3" /> RAM Shelf — click a variable to inspect it
          </p>

          {VARS.map((key, i) => {
            const data = MEMORY_DATA[key];
            const isActive = activeVar === key;
            return (
              <motion.div
                key={key}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
              >
                <div className="flex items-center gap-3">
                  {/* Variable label pill */}
                  <button
                    onClick={() => setActiveVar(isActive ? null : key)}
                    className={`font-mono font-bold text-sm px-4 py-2 rounded-xl border-2 transition-all cursor-pointer min-w-[80px] text-center ${
                      isActive
                        ? 'bg-amber-50 border-2 border-amber-300 text-amber-700 shadow-sm'
                        : 'bg-white border-2 border-slate-200 hover:border-amber-200 text-slate-500'
                    }`}
                  >
                    {key}
                  </button>

                  {/* Arrow */}
                  <ArrowRight className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-amber-500' : 'text-slate-300'}`} />

                  {/* Memory object box */}
                  <div
                    className={`flex-1 bg-white border rounded-2xl p-3 flex items-center gap-4 transition-all ${
                      isActive ? 'border-amber-300 shadow-md shadow-amber-100' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">type:</span>
                      <span className={`font-mono text-xs px-2 py-0.5 rounded-md font-bold ${
                        data.type === 'str'
                          ? 'bg-violet-50 border border-violet-200 text-violet-700'
                          : 'bg-blue-50 border border-blue-200 text-blue-700'
                      }`}>{data.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">value:</span>
                      <span className="font-mono text-sm bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-md">{data.value}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs text-slate-400 font-mono">id:</span>
                      <span className="font-mono text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">{data.id}</span>
                    </div>
                  </div>
                </div>

                {/* Callout */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -5 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="ml-[100px] bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-2"
                    >
                      <p className="text-amber-800 text-xs font-mono font-medium">{data.callout}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Hint when nothing selected */}
          <AnimatePresence>
            {!activeVar && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-slate-400 text-xs mt-2 ml-1"
              >
                Tap any variable name to see its memory address callout.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Scene06a_MemoryModel;
