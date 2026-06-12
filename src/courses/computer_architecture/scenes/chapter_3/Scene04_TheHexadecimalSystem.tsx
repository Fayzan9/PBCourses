import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene04_TheHexadecimalSystem: React.FC = () => {
  const hexDigits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  const hexValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  // Two hex digits = one byte (0–255)
  const [hi, setHi] = useState(10); // A
  const [lo, setLo] = useState(13); // D

  const decimal = hi * 16 + lo;
  const hexStr = `${hexDigits[hi]}${hexDigits[lo]}`;
  const binary = decimal.toString(2).padStart(8, '0');
  const binaryFormatted = binary.slice(0, 4) + ' ' + binary.slice(4);

  // Real-world uses
  const useCases = [
    { label: 'Colors in CSS', example: '#FF5733', note: 'R=FF G=57 B=33' },
    { label: 'Memory Addresses', example: '0x7FFF4A2C', note: 'RAM location' },
    { label: 'MAC Addresses', example: 'A4:C3:F0:12:3E', note: 'Network hardware ID' },
    { label: 'ASCII in Hex', example: '48 65 6C 6C 6F', note: '"Hello"' }
  ];

  const [selectedUse, setSelectedUse] = useState(0);

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-amber-600 font-extrabold">
          Lesson 3.4 · Number Systems
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          The Hexadecimal{' '}
          <span className="text-amber-600 font-serif italic">System</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Hexadecimal (hex) uses 16 digits: 0–9 and A–F.
          Two hex digits represent one byte perfectly — making it
          the standard way programmers read and write binary data.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4 min-h-0">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Hex Digit Table
            </div>
            <div className="grid grid-cols-4 gap-1 overflow-auto">
              {hexDigits.map((h, i) => (
                <div
                  key={h}
                  className={`rounded-lg p-1.5 text-center border ${
                    i >= 10
                      ? 'border-amber-200 bg-amber-50'
                      : 'border-slate-100 bg-slate-50'
                  }`}
                >
                  <div className={`font-black text-sm font-mono ${i >= 10 ? 'text-amber-700' : 'text-slate-700'}`}>
                    {h}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400">{i}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[10px] text-slate-400 font-semibold">
              A–F are extra digits for 10–15
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex-1 min-h-0 overflow-auto">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Where You See Hex
            </div>
            <div className="flex flex-col gap-2">
              {useCases.map((u, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedUse(i)}
                  className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                    selectedUse === i
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="font-black text-xs text-slate-700">{u.label}</div>
                  <div className="font-mono text-xs text-amber-600 mt-0.5">{u.example}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Build A Byte In Hex
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4">

            {/* Two hex digit pickers */}
            <div className="flex gap-4 justify-center">
              {[
                { value: hi, set: setHi, label: 'High nibble (×16)' },
                { value: lo, set: setLo, label: 'Low nibble (×1)' }
              ].map((col, ci) => (
                <div key={ci} className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-mono text-slate-400 font-bold">{col.label}</div>
                  <div className="grid grid-cols-4 gap-1">
                    {hexDigits.map((h, i) => (
                      <button
                        key={h}
                        onClick={() => col.set(i)}
                        className={`w-9 h-8 rounded-lg border text-sm font-black font-mono transition-all ${
                          col.value === i
                            ? 'border-amber-500 bg-amber-400 text-white'
                            : i >= 10
                            ? 'border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-400'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-amber-300'
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Result card */}
            <motion.div
              key={hexStr}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-2 border-amber-400 rounded-2xl p-5"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">Hex</div>
                  <div className="text-4xl font-black font-mono text-amber-600">0x{hexStr}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">Decimal</div>
                  <div className="text-4xl font-black font-mono text-slate-700">{decimal}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">Binary</div>
                  <div className="text-xl font-black font-mono text-slate-600 tracking-wider">{binaryFormatted}</div>
                </div>
              </div>
              <div className="mt-4 text-center text-xs font-mono text-slate-500">
                {hexDigits[hi]} ({hi}) × 16 + {hexDigits[lo]} ({lo}) = {decimal}
              </div>
            </motion.div>

            {/* Use case note */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                Real World: {useCases[selectedUse].label}
              </div>
              <div className="font-black font-mono text-amber-600 text-lg">{useCases[selectedUse].example}</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">{useCases[selectedUse].note}</div>
            </div>

          </div>

          {/* Bottom strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Base</div>
              <div className="mt-1 font-black text-amber-600 text-lg">16</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Digits</div>
              <div className="mt-1 font-black text-slate-700">0–9, A–F</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Prefix</div>
              <div className="mt-1 font-black text-slate-700 font-mono">0x</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene04_TheHexadecimalSystem;
