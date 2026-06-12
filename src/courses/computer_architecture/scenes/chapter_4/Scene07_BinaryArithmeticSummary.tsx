import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene07_BinaryArithmeticSummary: React.FC = () => {
  const operations = [
    {
      id: 'add',
      op: '+',
      name: 'Addition',
      a: 13, b: 11,
      compute: (a: number, b: number) => a + b,
      note: 'Column by column, carry the overflow',
      color: 'rose'
    },
    {
      id: 'sub',
      op: '−',
      name: 'Subtraction',
      a: 13, b: 5,
      compute: (a: number, b: number) => a - b,
      note: "Add two's complement of B",
      color: 'violet'
    },
    {
      id: 'mul',
      op: '×',
      name: 'Multiplication',
      a: 5, b: 6,
      compute: (a: number, b: number) => a * b,
      note: 'Shift and add partial products',
      color: 'orange'
    },
    {
      id: 'div',
      op: '÷',
      name: 'Division',
      a: 13, b: 3,
      compute: (a: number, b: number) => Math.floor(a / b),
      computeR: (a: number, b: number) => a % b,
      note: 'Repeated subtraction, track remainder',
      color: 'emerald'
    },
  ];

  const concepts = [
    { label: 'Carry Bit', icon: '→', desc: 'Spill from one column to the next when sum ≥ 2' },
    { label: 'Overflow', icon: '⚠', desc: 'Result too large for register — high bits lost, value wraps' },
    { label: "Two's Complement", icon: '−', desc: 'Flip all bits + 1 to negate a number for subtraction' },
  ];

  const [selected, setSelected] = useState('add');
  const op = operations.find(o => o.id === selected)!;
  const result = op.compute(op.a, op.b);
  const remainder = op.computeR ? op.computeR(op.a, op.b) : null;

  const toBin8 = (n: number) => Math.abs(n).toString(2).padStart(8, '0');

  const colorMap: Record<string, { border: string; bg: string; text: string; iconBg: string }> = {
    rose:    { border: 'border-rose-500',    bg: 'bg-rose-50',    text: 'text-rose-700',    iconBg: 'bg-rose-500'    },
    violet:  { border: 'border-violet-500',  bg: 'bg-violet-50',  text: 'text-violet-700',  iconBg: 'bg-violet-500'  },
    orange:  { border: 'border-orange-500',  bg: 'bg-orange-50',  text: 'text-orange-700',  iconBg: 'bg-orange-500'  },
    emerald: { border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', iconBg: 'bg-emerald-500' },
  };
  const c = colorMap[op.color];

  return (
    <SceneLayout gap="gap-5">
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-rose-600 font-extrabold">
          Lesson 4.7 · Chapter Summary
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Binary Arithmetic{' '}
          <span className="text-rose-600 font-serif italic">Summary</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Every calculation a CPU ever makes — in games, browsers, AI, rockets —
          comes down to these four binary operations, carry bits, and overflow handling.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">Operations</div>
            <div className="flex flex-col gap-2">
              {operations.map(o => {
                const oc = colorMap[o.color];
                return (
                  <button key={o.id} onClick={() => setSelected(o.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      selected === o.id ? `${oc.border} ${oc.bg}` : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${oc.iconBg} flex items-center justify-center text-white font-black text-lg`}>
                      {o.op}
                    </div>
                    <div>
                      <div className="font-black text-slate-800">{o.name}</div>
                      <div className="text-[11px] text-slate-500">{o.note}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-rose-600 mb-2">Chapter 4 Takeaway</div>
            <p className="text-sm font-semibold text-slate-700">
              The CPU's ALU performs only these operations — everything else (sorting, rendering, AI) is built on top of them.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">
          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Operation Breakdown
          </div>

          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-4"
          >

            {/* Operation display */}
            <div className={`rounded-2xl border-2 p-5 ${c.border} ${c.bg}`}>
              <div className={`text-xs font-mono uppercase font-bold ${c.text} mb-3`}>{op.name}</div>
              <div className="flex items-center gap-4 justify-center">
                <div className="text-center">
                  <div className="text-[10px] font-mono text-slate-400 mb-1">A</div>
                  <div className={`text-4xl font-black font-mono ${c.text}`}>{op.a}</div>
                  <div className="text-xs font-mono text-slate-500 mt-1">{toBin8(op.a)}</div>
                </div>
                <div className={`text-4xl font-black ${c.text}`}>{op.op}</div>
                <div className="text-center">
                  <div className="text-[10px] font-mono text-slate-400 mb-1">B</div>
                  <div className={`text-4xl font-black font-mono ${c.text}`}>{op.b}</div>
                  <div className="text-xs font-mono text-slate-500 mt-1">{toBin8(op.b)}</div>
                </div>
                <div className="text-4xl font-black text-slate-300">=</div>
                <div className="text-center">
                  <div className="text-[10px] font-mono text-slate-400 mb-1">Result</div>
                  <div className="text-4xl font-black font-mono text-slate-700">{result}</div>
                  {remainder !== null && (
                    <div className="text-xs font-mono text-slate-500 mt-1">rem {remainder}</div>
                  )}
                  <div className="text-xs font-mono text-slate-500 mt-1">{toBin8(result)}</div>
                </div>
              </div>
            </div>

            {/* Key concepts recap */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">Key Concepts From Chapter 4</div>
              <div className="space-y-2">
                {concepts.map(concept => (
                  <div key={concept.label} className="flex items-start gap-3 p-2 rounded-xl bg-slate-50">
                    <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 font-black text-sm shrink-0">
                      {concept.icon}
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-700">{concept.label}</div>
                      <div className="text-xs font-semibold text-slate-500">{concept.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-4 gap-2">
            {operations.map(o => {
              const oc = colorMap[o.color];
              return (
                <div key={o.id} className="bg-white border border-slate-200 rounded-xl p-2 text-center">
                  <div className="text-[10px] uppercase font-mono text-slate-400">{o.name}</div>
                  <div className={`mt-1 font-black text-lg ${oc.text}`}>{o.op}</div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene07_BinaryArithmeticSummary;
