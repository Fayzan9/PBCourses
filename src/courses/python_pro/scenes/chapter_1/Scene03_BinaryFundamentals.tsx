import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene03_BinaryFundamentals: React.FC = () => {
  const [bits, setBits] = useState<boolean[]>([
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true
  ]);

  const toggleBit = (index: number) => {
    const updated = [...bits];
    updated[index] = !updated[index];
    setBits(updated);
  };

  const decimalValue = bits.reduce((sum, bit, index) => {
    return bit ? sum + Math.pow(2, 7 - index) : sum;
  }, 0);

  const activeValues = bits
    .map((bit, index) => (bit ? Math.pow(2, 7 - index) : null))
    .filter((v): v is number => v !== null);

  const getCharacter = () => {
    if (decimalValue >= 32 && decimalValue <= 126) {
      return String.fromCharCode(decimalValue);
    }
    return '?';
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.3 · Computer Fundamentals
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Binary &{' '}
          <span className="text-indigo-600 font-serif italic">
            Bytes
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Every bit can be ON (1) or OFF (0). Eight bits form a byte that can
          represent numbers, letters, and symbols.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              How Binary Works
            </span>

            <ul className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <li>• Each position represents a power of 2.</li>
              <li>• A 1 means include that value.</li>
              <li>• A 0 means ignore that value.</li>
              <li>• Add active values together.</li>
            </ul>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Active Calculation
            </span>

            <div className="mt-2 text-sm font-mono font-bold text-indigo-900 break-words">
              {activeValues.length
                ? activeValues.join(' + ')
                : '0'}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Real Computer Fact
            </span>

            <p className="mt-2 text-xs font-semibold text-slate-600 leading-relaxed">
              Modern computers store everything as binary:
              text, images, videos, music, and programs.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Interactive Byte Builder
            </span>
          </div>

          {/* Bit Controls */}
          <div className="grid grid-cols-8 gap-2">

            {bits.map((bit, index) => {
              const power = 7 - index;
              const value = Math.pow(2, power);

              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    2^{power}
                  </span>

                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    {value}
                  </span>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => toggleBit(index)}
                    className={`w-full h-14 rounded-xl border-2 font-mono font-black text-lg transition-all ${
                      bit
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    {bit ? '1' : '0'}
                  </motion.button>
                </div>
              );
            })}

          </div>

          {/* Binary String */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Binary Value
            </span>

            <span className="font-mono text-2xl font-black text-indigo-600 tracking-widest">
              {bits.map(bit => (bit ? '1' : '0')).join('')}
            </span>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Decimal Number
              </span>

              <div className="mt-2 text-4xl font-black font-mono text-slate-800">
                {decimalValue}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                ASCII Character
              </span>

              <div className="mt-2 text-4xl font-black font-mono text-indigo-600">
                {getCharacter()}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Scene03_BinaryFundamentals;