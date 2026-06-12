import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene05_CarryBits: React.FC = () => {
  const examples = [
    { label: '1 + 1 = 10',   a: 1,  b: 1,  note: 'Simplest carry' },
    { label: '3 + 1 = 4',    a: 3,  b: 1,  note: 'Carry ripples' },
    { label: '7 + 1 = 8',    a: 7,  b: 1,  note: 'Carry ripples 3 columns' },
    { label: '127 + 1 = 128', a: 127, b: 1, note: 'Carry ripples 7 columns' },
    { label: '255 + 1 = 256', a: 255, b: 1, note: 'Overflows 8 bits!' },
  ];

  const [selected, setSelected] = useState(0);
  const ex = examples[selected];
  const sum = ex.a + ex.b;

  const toBin8 = (n: number) => n.toString(2).padStart(8, '0');
  const aBin = toBin8(ex.a);
  const bBin = toBin8(ex.b);
  const sumBin = toBin8(sum & 0xFF);
  const overflow = sum > 255;

  // Compute carry row
  const carries = new Array(9).fill(0);
  for (let i = 7; i >= 0; i--) {
    const col = Number(aBin[i]) + Number(bBin[i]) + carries[i + 1];
    carries[i] = Math.floor(col / 2);
  }

  // Find which columns produce a carry
  const carryColumns = carries.slice(0, 8).map((c, i) => c === 1);

  const [animStep, setAnimStep] = useState(-1);

  // Count carry propagation distance
  const firstCarry = carryColumns.lastIndexOf(true);
  const propagationLen = firstCarry >= 0 ? 8 - firstCarry : 0;

  return (
    <SceneLayout gap="gap-5">
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-rose-600 font-extrabold">
          Lesson 4.5 · Binary Arithmetic
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Carry{' '}
          <span className="text-rose-600 font-serif italic">Bits</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          When a binary column sums to 2 or more, the excess spills into the
          next column — this is a carry. Carries can ripple through many columns
          at once, which is why addition hardware must handle them carefully.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">Examples</div>
            <div className="flex flex-col gap-2">
              {examples.map((e, i) => (
                <button key={i}
                  onClick={() => { setSelected(i); setAnimStep(-1); }}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === i ? 'border-rose-500 bg-rose-50' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="font-black font-mono text-sm text-slate-700">{e.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{e.note}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-rose-600 mb-2">Carry Propagation</div>
            <p className="text-xs font-semibold text-slate-600 mb-2">
              This example propagates a carry through <span className="font-black text-rose-600">{propagationLen}</span> column{propagationLen !== 1 ? 's' : ''}.
            </p>
            <p className="text-xs font-semibold text-slate-600">
              In hardware, carry-ripple adders must wait for each carry to settle before the next column can finish — this is called ripple carry delay.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">
          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Carry Propagation Visualised
          </div>

          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-5"
          >

            <div className="bg-white border border-slate-200 rounded-2xl p-5 font-mono">

              {/* Carry row */}
              <div className="mb-1">
                <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Carry out</div>
                <div className="flex gap-1">
                  {carries.slice(0, 8).map((c, i) => (
                    <AnimatePresence key={i} mode="wait">
                      <motion.div
                        key={`${c}-${selected}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className={`w-9 h-7 flex items-center justify-center rounded-lg text-xs font-black ${
                          c === 1 ? 'bg-orange-100 text-orange-600 border border-orange-300' : 'text-slate-200'
                        }`}
                      >
                        {c === 1 ? '1' : '·'}
                      </motion.div>
                    </AnimatePresence>
                  ))}
                </div>
              </div>

              {/* Row A */}
              <div className="flex items-center gap-1 mt-2">
                <span className="text-[10px] text-rose-500 font-bold w-5">A</span>
                <div className="flex gap-1">
                  {aBin.split('').map((bit, i) => (
                    <div key={i} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-black border ${
                      bit === '1' ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-100 text-slate-300'
                    }`}>{bit}</div>
                  ))}
                </div>
                <span className="text-slate-400 font-black text-sm ml-2">= {ex.a}</span>
              </div>

              {/* Row B */}
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] text-orange-500 font-bold w-5">B</span>
                <div className="flex gap-1">
                  {bBin.split('').map((bit, i) => (
                    <div key={i} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-black border ${
                      bit === '1' ? 'border-orange-300 bg-orange-50 text-orange-700' : 'border-slate-100 text-slate-300'
                    }`}>{bit}</div>
                  ))}
                </div>
                <span className="text-slate-400 font-black text-sm ml-2">= {ex.b}</span>
              </div>

              <div className="border-t-2 border-slate-300 my-2 ml-5" />

              {/* Sum row */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-emerald-600 font-bold w-5">=</span>
                <div className="flex gap-1">
                  {overflow && (
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-black border border-orange-400 bg-orange-100 text-orange-600">1</div>
                  )}
                  {sumBin.split('').map((bit, i) => (
                    <div key={i} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-black border ${
                      bit === '1' ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-300'
                    }`}>{bit}</div>
                  ))}
                </div>
                <span className={`font-black text-sm ml-2 ${overflow ? 'text-orange-600' : 'text-emerald-600'}`}>
                  = {overflow ? '256 (overflow!)' : sum}
                </span>
              </div>

            </div>

            {/* Carry count highlight */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Columns With Carry</div>
                <div className="text-3xl font-black text-orange-600">{carryColumns.filter(Boolean).length}</div>
              </div>
              <div className={`border-2 rounded-2xl p-4 text-center ${overflow ? 'border-orange-400 bg-orange-50' : 'border-slate-200 bg-white'}`}>
                <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Final Carry Out</div>
                <div className={`text-3xl font-black ${overflow ? 'text-orange-600' : 'text-slate-300'}`}>
                  {overflow ? '1 ⚠' : '0'}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene05_CarryBits;
