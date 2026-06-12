import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene01_BinaryAddition: React.FC = () => {
  const presets = [
    { a: 3,  b: 5  },
    { a: 6,  b: 7  },
    { a: 13, b: 10 },
    { a: 25, b: 38 },
  ];

  const [aVal, setAVal] = useState(3);
  const [bVal, setBVal] = useState(5);

  const clamp = (n: number) => Math.max(0, Math.min(255, n));

  const a = clamp(aVal);
  const b = clamp(bVal);
  const sum = a + b;

  const toBin8 = (n: number) => n.toString(2).padStart(8, '0');

  const aBin = toBin8(a);
  const bBin = toBin8(b);
  const sumBin = sum <= 255 ? toBin8(sum) : (sum).toString(2).padStart(9, '0');

  // Compute carry row bit by bit from right
  const carries: number[] = new Array(9).fill(0);
  for (let i = 7; i >= 0; i--) {
    const colSum = Number(aBin[i]) + Number(bBin[i]) + carries[i + 1];
    carries[i] = Math.floor(colSum / 2);
  }

  const rules = [
    { lhs: '0 + 0', result: '0', carry: '0' },
    { lhs: '0 + 1', result: '1', carry: '0' },
    { lhs: '1 + 0', result: '1', carry: '0' },
    { lhs: '1 + 1', result: '0', carry: '1' },
  ];

  return (
    <SceneLayout gap="gap-5">
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-rose-600 font-extrabold">
          Lesson 4.1 · Binary Arithmetic
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Binary{' '}
          <span className="text-rose-600 font-serif italic">Addition</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Binary addition works exactly like decimal addition — column by column
          from right to left — except the only digits are 0 and 1. When a column
          exceeds 1, the extra is carried to the next column.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">Addition Rules</div>
            <div className="space-y-2">
              {rules.map(r => (
                <div key={r.lhs} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                  <span className="font-mono font-black text-slate-700">{r.lhs}</span>
                  <span className="text-slate-400">=</span>
                  <span className="font-mono font-black text-rose-600">{r.result}</span>
                  {r.carry === '1' && (
                    <span className="text-[10px] font-mono bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">carry 1</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">Presets</div>
            <div className="grid grid-cols-2 gap-2">
              {presets.map(p => (
                <button
                  key={`${p.a}+${p.b}`}
                  onClick={() => { setAVal(p.a); setBVal(p.b); }}
                  className={`p-2 rounded-xl border-2 font-mono font-black text-sm transition-all ${
                    a === p.a && b === p.b
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {p.a} + {p.b}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-rose-600 mb-2">Key Insight</div>
            <p className="text-xs font-semibold text-slate-600">
              1 + 1 = 10 in binary (not "ten" — "one zero"). The 1 carries left, just like 9 + 1 = 10 in decimal.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Column-By-Column Addition
          </div>

          {/* Number inputs */}
          <div className="flex gap-3">
            {[
              { label: 'A', val: aVal, set: setAVal, color: 'border-rose-400 bg-rose-50' },
              { label: 'B', val: bVal, set: setBVal, color: 'border-orange-400 bg-orange-50' },
            ].map(inp => (
              <div key={inp.label} className="flex-1">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Value {inp.label} (0–255)</div>
                <input
                  type="number"
                  min={0}
                  max={255}
                  value={inp.val}
                  onChange={e => inp.set(Number(e.target.value))}
                  className={`w-full border-2 rounded-xl px-3 py-2 text-xl font-black font-mono text-slate-700 outline-none focus:border-rose-500 text-center ${inp.color}`}
                />
              </div>
            ))}
          </div>

          {/* Binary long addition */}
          <motion.div
            key={`${a}-${b}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-2xl p-5 font-mono"
          >
            <div className="text-[10px] uppercase text-slate-400 font-bold mb-4">Binary Long Addition</div>

            {/* Carry row */}
            <div className="flex items-center gap-1 mb-1">
              <div className="w-6 text-[10px] text-slate-400 font-bold">c</div>
              <div className="flex gap-1">
                {carries.slice(0, 8).map((c, i) => (
                  <div key={i} className={`w-8 text-center text-xs font-black ${c === 1 ? 'text-orange-500' : 'text-slate-200'}`}>
                    {c === 1 ? '1' : '·'}
                  </div>
                ))}
              </div>
            </div>

            {/* Row A */}
            <div className="flex items-center gap-1">
              <div className="w-6 text-[10px] text-rose-500 font-bold">A</div>
              <div className="flex gap-1">
                {aBin.split('').map((bit, i) => (
                  <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border ${
                    bit === '1' ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-100 text-slate-300'
                  }`}>{bit}</div>
                ))}
              </div>
            </div>

            {/* Row B */}
            <div className="flex items-center gap-1 mt-1">
              <div className="w-6 text-[10px] text-orange-500 font-bold">B</div>
              <div className="flex gap-1">
                {bBin.split('').map((bit, i) => (
                  <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border ${
                    bit === '1' ? 'border-orange-300 bg-orange-50 text-orange-700' : 'border-slate-100 text-slate-300'
                  }`}>{bit}</div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-slate-300 my-2 ml-7" />

            {/* Sum row */}
            <div className="flex items-center gap-1">
              <div className="w-6 text-[10px] text-emerald-600 font-bold">=</div>
              <div className="flex gap-1">
                {sumBin.length > 8
                  ? <div className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border border-orange-400 bg-orange-50 text-orange-600">1</div>
                  : null
                }
                {(sumBin.length > 8 ? sumBin.slice(1) : sumBin).split('').map((bit, i) => (
                  <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border ${
                    bit === '1' ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-300'
                  }`}>{bit}</div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Decimal confirmation */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">A</div>
              <div className="mt-1 font-black text-rose-600 font-mono">{a}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">B</div>
              <div className="mt-1 font-black text-orange-600 font-mono">{b}</div>
            </div>
            <div className={`border rounded-xl p-3 text-center ${sum > 255 ? 'bg-orange-50 border-orange-300' : 'bg-white border-slate-200'}`}>
              <div className="text-[10px] uppercase font-mono text-slate-400">Sum</div>
              <div className={`mt-1 font-black font-mono ${sum > 255 ? 'text-orange-600' : 'text-emerald-600'}`}>{sum}{sum > 255 ? ' ⚠ overflow' : ''}</div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene01_BinaryAddition;
