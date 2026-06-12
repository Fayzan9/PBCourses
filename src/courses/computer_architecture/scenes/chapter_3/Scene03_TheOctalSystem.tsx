import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene03_TheOctalSystem: React.FC = () => {
  const examples = [
    { decimal: 8,   octal: '10',  binary: '001 000' },
    { decimal: 64,  octal: '100', binary: '001 000 000' },
    { decimal: 255, octal: '377', binary: '011 111 111' },
    { decimal: 511, octal: '777', binary: '111 111 111' }
  ];

  const [selected, setSelected] = useState(0);
  const ex = examples[selected];

  // Interactive: pick 3 octal digits (0-7) to build a number
  const [d2, setD2] = useState(0); // hundreds (octal 64s)
  const [d1, setD1] = useState(1); // eights
  const [d0, setD0] = useState(0); // ones
  const customDecimal = d2 * 64 + d1 * 8 + d0;
  const customOctal = `${d2}${d1}${d0}`;

  const digits = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-amber-600 font-extrabold">
          Lesson 3.3 · Number Systems
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          The Octal{' '}
          <span className="text-amber-600 font-serif italic">System</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Octal uses 8 digits (0–7). Every octal digit maps perfectly to
          3 binary bits, making it a compact shorthand for binary — used
          in file permissions and early computing.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Key Examples
            </div>
            <div className="flex flex-col gap-2">
              {examples.map((e, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === i
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black font-mono text-slate-700">
                      Decimal {e.decimal}
                    </span>
                    <span className="font-black font-mono text-amber-600">
                      0o{e.octal}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-amber-600 mb-2">
              Octal ↔ Binary Trick
            </div>
            <p className="text-xs font-semibold text-slate-600">
              Every octal digit = exactly 3 binary bits.
              Group binary digits in threes from the right.
            </p>
            <div className="mt-3 space-y-1 text-xs font-mono">
              {[
                ['0', '000'], ['1', '001'], ['2', '010'], ['3', '011'],
                ['4', '100'], ['5', '101'], ['6', '110'], ['7', '111']
              ].map(([o, b]) => (
                <div key={o} className="flex gap-3">
                  <span className="text-amber-600 font-black w-4">{o}</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-slate-700 font-black">{b}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Octal Digit Builder
          </div>

          <div className="flex-1 flex flex-col justify-center gap-5">

            {/* Selected example breakdown */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl p-4"
            >
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Binary → Group by 3 → Octal
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono font-black text-slate-500 text-sm">Binary:</span>
                <span className="font-mono font-black text-slate-700 text-lg tracking-widest">{ex.binary}</span>
                <span className="text-slate-300 text-lg">→</span>
                <span className="font-mono font-black text-amber-600 text-2xl">0o{ex.octal}</span>
                <span className="text-slate-300 text-lg">→</span>
                <span className="font-mono font-black text-slate-700 text-2xl">{ex.decimal}</span>
              </div>
            </motion.div>

            {/* Interactive digit picker */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Build Your Own 3-Digit Octal Number
              </div>
              <div className="flex gap-4 justify-center">
                {[
                  { value: d2, set: setD2, position: '64s (8²)' },
                  { value: d1, set: setD1, position: '8s (8¹)' },
                  { value: d0, set: setD0, position: '1s (8⁰)' }
                ].map((col, ci) => (
                  <div key={ci} className="flex flex-col items-center gap-2">
                    <div className="text-[10px] font-mono text-slate-400 font-bold">{col.position}</div>
                    <div className="flex flex-col gap-1">
                      {digits.map(d => (
                        <button
                          key={d}
                          onClick={() => col.set(d)}
                          className={`w-10 h-7 rounded-lg border text-sm font-black font-mono transition-all ${
                            col.value === d
                              ? 'border-amber-500 bg-amber-400 text-white'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-amber-300'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Result */}
                <div className="flex flex-col items-center justify-center gap-3 ml-4 pl-4 border-l border-slate-200">
                  <div className="text-center">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Octal</div>
                    <div className="text-3xl font-black font-mono text-amber-600">0o{customOctal}</div>
                  </div>
                  <div className="text-2xl text-slate-300">=</div>
                  <div className="text-center">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Decimal</div>
                    <motion.div
                      key={customDecimal}
                      initial={{ scale: 0.85 }}
                      animate={{ scale: 1 }}
                      className="text-3xl font-black font-mono text-slate-700"
                    >
                      {customDecimal}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Base</div>
              <div className="mt-1 font-black text-amber-600 text-lg">8</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Digits</div>
              <div className="mt-1 font-black text-slate-700">0 – 7</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Prefix</div>
              <div className="mt-1 font-black text-slate-700 font-mono">0o</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene03_TheOctalSystem;
