import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene03_BinaryFundamentals: React.FC = () => {
  const [bits, setBits] = useState<boolean[]>([false, true, false, false, true, false, false, true]); // Decimal 73 ('I')

  const toggleBit = (index: number) => {
    const updated = [...bits];
    updated[index] = !updated[index];
    setBits(updated);
  };

  const getSumExpression = () => {
    const activeTerms = bits
      .map((bit, idx) => (bit ? Math.pow(2, 7 - idx) : null))
      .filter((term): term is number => term !== null);
    
    if (activeTerms.length === 0) return '0';
    return activeTerms.join(' + ');
  };

  const decimalVal = bits.reduce((sum, val, idx) => {
    return val ? sum + Math.pow(2, 7 - idx) : sum;
  }, 0);

  const getCharValue = (dec: number) => {
    if (dec >= 32 && dec <= 126) return `'${String.fromCharCode(dec)}'`;
    return 'Control/Special';
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-6 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.3 · Computer Fundamentals
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          Binary & <span className="text-indigo-600 font-serif italic">Byte Explorer</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-2xl leading-relaxed">
          Toggling a single transistor represents a Bit (0 or 1). Combining 8 Bits makes a Byte. Click the switches to watch the binary summation update.
        </p>
      </div>

      {/* Calculator Board */}
      <div className="flex-1 flex flex-col gap-5 justify-center">
        
        {/* Large Bit Row */}
        <div className="grid grid-cols-8 gap-2.5 max-w-2xl mx-auto w-full">
          {bits.map((bit, idx) => {
            const power = 7 - idx;
            const value = Math.pow(2, power);
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-xs font-mono font-bold text-slate-400">2^{power}</span>
                <span className="text-[11px] font-mono font-extrabold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{value}</span>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggleBit(idx)}
                  className={`w-full py-5 rounded-2xl font-mono text-xl font-black border-2 transition-all cursor-pointer flex items-center justify-center ${
                    bit
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-sm'
                  }`}
                >
                  {bit ? '1' : '0'}
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* Summation Display */}
        <div className="max-w-2xl mx-auto w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 shadow-inner">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Dynamic Math Accumulator</span>
          <p className="font-mono text-sm font-semibold text-indigo-600 text-center tracking-wide line-clamp-1">
            {getSumExpression()}
          </p>
        </div>

        {/* Decoder outputs */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-1 items-center justify-center">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Integer (Decimal)</span>
            <span className="text-3xl font-black text-slate-800 font-mono">{decimalVal}</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-1 items-center justify-center">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">ASCII Character Representation</span>
            <span className="text-3xl font-black text-indigo-600 font-mono">{getCharValue(decimalVal)}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Scene03_BinaryFundamentals;
