import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene02_TheBinarySystem: React.FC = () => {
  // 8 toggleable bits
  const [bits, setBits] = useState([0, 0, 0, 0, 1, 0, 1, 0]); // = 10

  const toggleBit = (i: number) => {
    setBits(prev => prev.map((b, idx) => idx === i ? (b === 0 ? 1 : 0) : b));
  };

  const placeValues = [128, 64, 32, 16, 8, 4, 2, 1];
  const decimal = bits.reduce((sum, b, i) => sum + b * placeValues[i], 0);
  const binaryString = bits.join('');

  const presets = [
    { label: '0',   bits: [0,0,0,0,0,0,0,0] },
    { label: '1',   bits: [0,0,0,0,0,0,0,1] },
    { label: '10',  bits: [0,0,0,0,1,0,1,0] },
    { label: '42',  bits: [0,0,1,0,1,0,1,0] },
    { label: '100', bits: [0,1,1,0,0,1,0,0] },
    { label: '255', bits: [1,1,1,1,1,1,1,1] }
  ];

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-amber-600 font-extrabold">
          Lesson 3.2 · Number Systems
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          The Binary{' '}
          <span className="text-amber-600 font-serif italic">System</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Binary uses only two digits — 0 and 1. Each position is a power
          of 2. Toggle the bits below to build any number from 0 to 255.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Presets
            </div>
            <div className="grid grid-cols-3 gap-2">
              {presets.map(p => (
                <button
                  key={p.label}
                  onClick={() => setBits([...p.bits])}
                  className={`p-2 rounded-xl border-2 font-black font-mono text-sm transition-all ${
                    decimal === Number(p.label)
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex-1 min-h-0">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Place Values (Powers of 2)
            </div>
            <div className="space-y-2 overflow-auto">
              {placeValues.map((pv, i) => (
                <div
                  key={pv}
                  className={`flex items-center justify-between text-sm rounded-lg px-2 py-1 transition-all ${
                    bits[i] === 1 ? 'bg-amber-50' : ''
                  }`}
                >
                  <span className="font-mono text-slate-500">2<sup>{7 - i}</sup></span>
                  <span className="font-black text-amber-600 font-mono w-8 text-right">{pv}</span>
                  <span className={`font-black font-mono w-8 text-right ${bits[i] === 1 ? 'text-slate-700' : 'text-slate-300'}`}>
                    ×{bits[i]}
                  </span>
                  <span className={`font-black font-mono w-8 text-right ${bits[i] === 1 ? 'text-amber-600' : 'text-slate-300'}`}>
                    {bits[i] === 1 ? pv : 0}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-5 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Toggle Bits — Click To Flip
          </div>

          <motion.div
            className="flex-1 flex flex-col justify-center gap-6"
          >

            {/* Bit toggles */}
            <div className="flex gap-2 justify-center flex-wrap">
              {bits.map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="text-[10px] font-mono text-slate-400 font-bold">
                    2<sup>{7-i}</sup>
                  </div>
                  <div className="text-[10px] font-mono text-amber-600 font-bold">
                    {placeValues[i]}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleBit(i)}
                    className={`w-14 h-14 rounded-2xl border-2 text-2xl font-black font-mono transition-all ${
                      b === 1
                        ? 'border-amber-500 bg-amber-400 text-white shadow-md'
                        : 'border-slate-200 bg-white text-slate-300'
                    }`}
                  >
                    {b}
                  </motion.button>
                </div>
              ))}
            </div>

            {/* Result */}
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 text-center">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                  Binary
                </div>
                <div className="text-xl font-black font-mono text-slate-700 tracking-widest">
                  {binaryString}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">base 2</div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-4 text-center">
                <div className="text-[10px] font-mono uppercase text-amber-600 font-bold mb-2">
                  Decimal
                </div>
                <motion.div
                  key={decimal}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-black text-amber-700"
                >
                  {decimal}
                </motion.div>
                <div className="text-[10px] text-amber-500 mt-1 font-mono">base 10</div>
              </div>

            </div>

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Base</div>
              <div className="mt-1 font-black text-amber-600 text-lg">2</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Digits</div>
              <div className="mt-1 font-black text-slate-700">0 and 1</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">8 bits range</div>
              <div className="mt-1 font-black text-slate-700">0 – 255</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene02_TheBinarySystem;
