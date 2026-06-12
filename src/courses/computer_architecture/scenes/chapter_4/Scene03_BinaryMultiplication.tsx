import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene03_BinaryMultiplication: React.FC = () => {
  const [aVal, setAVal] = useState(5);
  const [bVal, setBVal] = useState(6);

  const clamp = (n: number) => Math.max(0, Math.min(15, n));
  const a = clamp(aVal);
  const b = clamp(bVal);
  const product = a * b;

  const toBin4 = (n: number) => n.toString(2).padStart(4, '0');
  const aBin = toBin4(a);
  const bBin = toBin4(b);

  // Partial products — each bit of b multiplied by a, shifted left
  const partials = bBin.split('').reverse().map((bit, shift) => ({
    bit,
    shift,
    value: bit === '1' ? a * Math.pow(2, shift) : 0,
    bin: bit === '1' ? (a * Math.pow(2, shift)).toString(2).padStart(8, '0') : '00000000',
    active: bit === '1',
  }));

  const presets = [
    { a: 5, b: 6 }, { a: 3, b: 7 }, { a: 4, b: 4 }, { a: 7, b: 7 },
  ];

  const [highlightShift, setHighlightShift] = useState<number | null>(null);

  return (
    <SceneLayout gap="gap-5">
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-rose-600 font-extrabold">
          Lesson 4.3 · Binary Arithmetic
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Binary{' '}
          <span className="text-rose-600 font-serif italic">Multiplication</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Binary multiplication uses the same long-multiplication method as
          decimal — but far simpler. Each bit of the multiplier is either
          0 (skip) or 1 (copy and shift). Then add all partial products.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">Inputs (0–15)</div>
            {[
              { label: 'A', val: aVal, set: setAVal, color: 'border-rose-400 bg-rose-50' },
              { label: 'B', val: bVal, set: setBVal, color: 'border-orange-400 bg-orange-50' },
            ].map(inp => (
              <div key={inp.label} className="mb-3">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Value {inp.label}</div>
                <input
                  type="number" min={0} max={15}
                  value={inp.val}
                  onChange={e => inp.set(Number(e.target.value))}
                  className={`w-full border-2 rounded-xl px-3 py-2 text-xl font-black font-mono text-slate-700 outline-none focus:border-rose-500 text-center ${inp.color}`}
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2">
              {presets.map(p => (
                <button key={`${p.a}x${p.b}`}
                  onClick={() => { setAVal(p.a); setBVal(p.b); }}
                  className={`p-2 rounded-xl border-2 font-mono font-black text-sm transition-all ${
                    a === p.a && b === p.b ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {p.a} × {p.b}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-rose-600 mb-2">The Rule</div>
            <div className="space-y-1 text-xs font-mono font-semibold text-slate-700">
              <div className="flex gap-2"><span className="text-slate-400">bit = 0:</span><span>partial product = 0 (skip)</span></div>
              <div className="flex gap-2"><span className="text-slate-400">bit = 1:</span><span>partial product = A shifted left by position</span></div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">
          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Long Multiplication — {a} × {b}
          </div>

          <motion.div
            key={`${a}-${b}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-4"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-5 font-mono">

              {/* A and B display */}
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="text-[10px] text-rose-500 font-bold">A</span>
                <div className="flex gap-1">
                  {aBin.split('').map((bit, i) => (
                    <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border ${
                      bit === '1' ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-100 text-slate-300'
                    }`}>{bit}</div>
                  ))}
                </div>
                <span className="text-slate-400 font-black ml-1">= {a}</span>
              </div>

              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="text-[10px] text-orange-500 font-bold">×B</span>
                <div className="flex gap-1">
                  {bBin.split('').map((bit, i) => (
                    <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border ${
                      bit === '1' ? 'border-orange-300 bg-orange-50 text-orange-700' : 'border-slate-100 text-slate-300'
                    }`}>{bit}</div>
                  ))}
                </div>
                <span className="text-slate-400 font-black ml-1">= {b}</span>
              </div>

              <div className="border-t border-slate-200 my-2" />

              {/* Partial products */}
              <div className="space-y-1">
                {partials.map((p, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer transition-all ${
                      highlightShift === i ? 'bg-rose-50' : ''
                    } ${!p.active ? 'opacity-30' : ''}`}
                    onMouseEnter={() => setHighlightShift(i)}
                    onMouseLeave={() => setHighlightShift(null)}
                  >
                    <div className="text-[10px] text-slate-400 w-20 text-right">
                      {p.active ? `bit ${p.shift}, shift ${p.shift}` : `bit ${p.shift} = 0`}
                    </div>
                    <div className="flex gap-1">
                      {p.bin.split('').map((bit, bi) => (
                        <div key={bi} className={`w-7 h-7 flex items-center justify-center rounded text-xs font-black ${
                          bit === '1' ? 'text-rose-600' : 'text-slate-200'
                        }`}>{bit}</div>
                      ))}
                    </div>
                    <span className={`text-sm font-black font-mono ${p.active ? 'text-rose-600' : 'text-slate-300'}`}>
                      = {p.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-slate-300 my-2" />

              {/* Final product */}
              <div className="flex items-center justify-end gap-2">
                <span className="text-[10px] text-emerald-600 font-bold">Product</span>
                <div className="flex gap-1">
                  {product.toString(2).padStart(8, '0').split('').map((bit, i) => (
                    <div key={i} className={`w-7 h-7 flex items-center justify-center rounded text-xs font-black ${
                      bit === '1' ? 'border border-emerald-400 bg-emerald-50 text-emerald-700' : 'text-slate-200'
                    }`}>{bit}</div>
                  ))}
                </div>
                <span className="text-xl font-black font-mono text-emerald-600 ml-1">= {product}</span>
              </div>

            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">A × B</div>
              <div className="mt-1 font-black font-mono text-slate-700">{a} × {b}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Partial Products</div>
              <div className="mt-1 font-black text-rose-600">{partials.filter(p => p.active).length}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Product</div>
              <div className="mt-1 font-black text-emerald-600 font-mono">{product}</div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene03_BinaryMultiplication;
