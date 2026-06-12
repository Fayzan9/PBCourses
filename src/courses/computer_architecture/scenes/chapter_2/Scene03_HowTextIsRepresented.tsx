import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene03_HowTextIsRepresented: React.FC = () => {
  const keys = [
    { char: 'A', decimal: 65,  binary: '01000001' },
    { char: 'B', decimal: 66,  binary: '01000010' },
    { char: 'C', decimal: 67,  binary: '01000011' },
    { char: 'H', decimal: 72,  binary: '01001000' },
    { char: 'I', decimal: 73,  binary: '01001001' },
    { char: 'Z', decimal: 90,  binary: '01011010' },
    { char: 'a', decimal: 97,  binary: '01100001' },
    { char: 'z', decimal: 122, binary: '01111010' },
    { char: '0', decimal: 48,  binary: '00110000' },
    { char: '9', decimal: 57,  binary: '00111001' },
    { char: '!', decimal: 33,  binary: '00100001' },
    { char: ' ', decimal: 32,  binary: '00100000' }
  ];

  const [selected, setSelected] = useState(keys[0]);
  const [typed, setTyped] = useState('HI');

  const typedCodes = typed
    .split('')
    .map(ch => {
      const match = keys.find(k => k.char === ch);
      return match ?? { char: ch, decimal: ch.codePointAt(0) ?? 0, binary: '????????' };
    });

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-violet-600 font-extrabold">
          Lesson 2.3 · Information And Data
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          How Text Is{' '}
          <span className="text-violet-600 font-serif italic">
            Represented
          </span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Every character — letter, digit, symbol — is stored as a number.
          ASCII is the standard that maps characters to numbers so computers
          can store and share text.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4 min-h-0">

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex-1 min-h-0 flex flex-col">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Click A Character
            </div>
            <div className="grid grid-cols-4 gap-2 overflow-auto">
              {keys.map(k => (
                <button
                  key={k.char + k.decimal}
                  onClick={() => setSelected(k)}
                  className={`h-12 rounded-xl border-2 font-black text-lg transition-all ${
                    selected.char === k.char
                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {k.char === ' ' ? '␣' : k.char}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-violet-600">
              ASCII Standard
            </div>
            <div className="mt-2 space-y-1 text-xs font-semibold text-slate-600">
              <div>A–Z → 65–90</div>
              <div>a–z → 97–122</div>
              <div>0–9 → 48–57</div>
              <div>Space → 32</div>
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Character Encoding
          </div>

          <motion.div
            key={selected.char}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col justify-center gap-4"
          >

            {/* Character → Decimal → Binary */}
            <div className="grid grid-cols-3 gap-4">

              <div className="bg-white border-2 border-violet-500 rounded-2xl p-4 text-center">
                <div className="text-[10px] font-mono uppercase text-violet-600 font-bold mb-2">
                  Character
                </div>
                <div className="text-6xl font-black text-violet-700">
                  {selected.char === ' ' ? '␣' : selected.char}
                </div>
              </div>

              <div className="bg-white border-2 border-orange-400 rounded-2xl p-4 text-center">
                <div className="text-[10px] font-mono uppercase text-orange-600 font-bold mb-2">
                  Decimal
                </div>
                <div className="text-5xl font-black text-orange-700">
                  {selected.decimal}
                </div>
              </div>

              <div className="bg-white border-2 border-slate-400 rounded-2xl p-4 text-center">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold mb-2">
                  Binary
                </div>
                <div className="text-lg font-black text-slate-700 font-mono tracking-wider">
                  {selected.binary}
                </div>
              </div>

            </div>

            {/* Word encoder */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Word Encoder — try typing (use A–Z, 0–9, !, space)
              </div>
              <input
                type="text"
                value={typed}
                onChange={e => setTyped(e.target.value.toUpperCase().slice(0, 6))}
                maxLength={6}
                className="w-full border-2 border-violet-300 rounded-xl px-4 py-2 text-xl font-black font-mono text-slate-700 bg-violet-50 outline-none focus:border-violet-500"
                placeholder="HI"
              />
              <div className="mt-3 flex gap-2 flex-wrap">
                {typedCodes.map((tc, i) => (
                  <div key={i} className="flex flex-col items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                    <div className="text-lg font-black text-violet-700">{tc.char === ' ' ? '␣' : tc.char}</div>
                    <div className="text-xs font-mono text-slate-500">{tc.decimal}</div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Standard</div>
              <div className="mt-1 font-black text-slate-700">ASCII</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Bits Per Char</div>
              <div className="mt-1 font-black text-violet-600">8 bits</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Total Chars</div>
              <div className="mt-1 font-black text-orange-600">128</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene03_HowTextIsRepresented;
