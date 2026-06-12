import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene01_TheDecimalSystem: React.FC = () => {
  const examples = [
    { number: 7,    digits: [7],       positions: ['Ones'] },
    { number: 43,   digits: [4, 3],    positions: ['Tens', 'Ones'] },
    { number: 256,  digits: [2, 5, 6], positions: ['Hundreds', 'Tens', 'Ones'] },
    { number: 1024, digits: [1, 0, 2, 4], positions: ['Thousands', 'Hundreds', 'Tens', 'Ones'] }
  ];

  const [selectedEx, setSelectedEx] = useState(2); // default to 256
  const ex = examples[selectedEx];

  const placeValues = [1000, 100, 10, 1];
  const placeNames = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
  const placePowers = ['10³', '10²', '10¹', '10⁰'];

  // Build breakdown for selected number
  const breakdown = ex.digits.map((d, i) => {
    const pv = placeValues[placeNames.indexOf(ex.positions[i])];
    return { digit: d, position: ex.positions[i], placeValue: pv, contribution: d * pv };
  });

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-amber-600 font-extrabold">
          Lesson 3.1 · Number Systems
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          The Decimal{' '}
          <span className="text-amber-600 font-serif italic">System</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Decimal is the number system we use every day. It has ten digits
          (0–9) and each position in a number represents a power of 10.
          Understanding this makes learning other bases easy.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Pick A Number
            </div>
            <div className="flex flex-col gap-2">
              {examples.map((e, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedEx(i)}
                  className={`p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    selectedEx === i
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <span className="font-black text-2xl font-mono text-slate-700">{e.number}</span>
                  <span className="text-xs text-slate-400 font-mono">{e.digits.length} digit{e.digits.length > 1 ? 's' : ''}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-amber-600 mb-3">
              Place Value System
            </div>
            <div className="space-y-2">
              {placeNames.map((name, i) => (
                <div key={name} className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-600">{name}</span>
                  <span className="font-black text-amber-700 font-mono">{placePowers[i]} = {placeValues[i]}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-5 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Breaking Down {ex.number}
          </div>

          <motion.div
            key={ex.number}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-5"
          >

            {/* Digit tiles */}
            <div className="flex items-end gap-3 justify-center">
              {breakdown.map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    {b.position}
                  </div>
                  <div className="text-[10px] font-mono text-amber-600 font-bold">
                    {placePowers[placeNames.indexOf(b.position)]}
                  </div>
                  <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl font-black transition-all ${
                    b.digit === 0
                      ? 'border-slate-200 bg-white text-slate-300'
                      : 'border-amber-500 bg-amber-50 text-amber-700'
                  }`}>
                    {b.digit}
                  </div>
                  <div className="text-xs font-mono text-slate-500 font-semibold">
                    ×{b.placeValue}
                  </div>
                  <div className={`text-sm font-black font-mono ${b.digit === 0 ? 'text-slate-300' : 'text-slate-700'}`}>
                    = {b.contribution}
                  </div>
                </div>
              ))}
            </div>

            {/* Addition breakdown */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Total
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {breakdown.map((b, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-slate-400 font-bold text-lg">+</span>}
                    <span className={`font-black text-lg font-mono ${b.digit === 0 ? 'text-slate-300' : 'text-slate-700'}`}>
                      {b.contribution}
                    </span>
                  </React.Fragment>
                ))}
                <span className="text-slate-400 font-bold text-lg">=</span>
                <span className="text-2xl font-black text-amber-600 font-mono">{ex.number}</span>
              </div>
            </div>

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Base</div>
              <div className="mt-1 font-black text-amber-600 text-lg">10</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Digits</div>
              <div className="mt-1 font-black text-slate-700">0 – 9</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Each Position</div>
              <div className="mt-1 font-black text-slate-700">×10 larger</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene01_TheDecimalSystem;
