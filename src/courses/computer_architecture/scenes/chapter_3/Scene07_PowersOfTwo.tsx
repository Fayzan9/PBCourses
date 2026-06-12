import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene07_PowersOfTwo: React.FC = () => {
  const powers = [
    { exp: 0,  value: 1,           bits: 1,  name: '1 bit',   meaning: '2 choices' },
    { exp: 1,  value: 2,           bits: 1,  name: '1 bit',   meaning: '2 values' },
    { exp: 3,  value: 8,           bits: 3,  name: '3 bits',  meaning: '1 octal digit' },
    { exp: 4,  value: 16,          bits: 4,  name: '4 bits',  meaning: '1 nibble / 1 hex digit' },
    { exp: 7,  value: 128,         bits: 7,  name: '7 bits',  meaning: 'ASCII table size' },
    { exp: 8,  value: 256,         bits: 8,  name: '8 bits',  meaning: '1 byte (0–255)' },
    { exp: 10, value: 1024,        bits: 10, name: '10 bits', meaning: '1 Kilobyte = 1,024 bytes' },
    { exp: 16, value: 65536,       bits: 16, name: '16 bits', meaning: '65,536 values' },
    { exp: 32, value: 4294967296,  bits: 32, name: '32 bits', meaning: '~4 billion — old CPU max RAM' },
    { exp: 64, value: 0,           bits: 64, name: '64 bits', meaning: '~18 quintillion — modern CPUs' }
  ];

  const [selectedPow, setSelectedPow] = useState(5); // 256 by default

  const pow = powers[selectedPow];

  const numberFacts = [
    { label: 'Decimal', color: 'text-slate-700', value: pow.value > 0 ? pow.value.toLocaleString() : '18,446,744,073,709,551,616' },
    { label: `2^${pow.exp}`, color: 'text-amber-600', value: `2^${pow.exp}` },
    { label: 'Bits', color: 'text-violet-600', value: String(pow.bits) },
    { label: 'Meaning', color: 'text-emerald-600', value: pow.meaning }
  ];

  // For the "bit capacity" visualizer - show a bar scaled to the power
  const maxExp = 10;
  const barWidth = Math.min((pow.exp / maxExp) * 100, 100);

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-amber-600 font-extrabold">
          Lesson 3.7 · Chapter Summary
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Powers Of{' '}
          <span className="text-amber-600 font-serif italic">Two</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Every computer size and limit you will ever encounter — storage,
          memory, color depth, data types — is a power of two. Memorising
          a few key powers makes everything else click.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4 min-h-0">

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex-1 min-h-0 overflow-auto">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Key Powers of 2
            </div>
            <div className="flex flex-col gap-1.5">
              {powers.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPow(i)}
                  className={`p-2.5 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    selectedPow === i
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <span className="font-black font-mono text-amber-600 text-sm w-12">2^{p.exp}</span>
                  <span className="font-semibold text-xs text-slate-600 flex-1 text-right">{p.meaning}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Number Systems — Chapter Recap
          </div>

          <motion.div
            key={selectedPow}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-4"
          >

            {/* Power highlight */}
            <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-5 text-center">
              <div className="text-xs font-mono uppercase text-amber-600 font-bold mb-2">
                2^{pow.exp}
              </div>
              <div className="text-5xl font-black text-amber-700 font-mono">
                {pow.value > 0 ? pow.value.toLocaleString() : '≈18.4 quintillion'}
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-600">{pow.meaning}</div>
            </div>

            {/* Scale bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Scale (relative to 2^10 = 1,024)
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  key={barWidth}
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full bg-amber-400 rounded-full"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>2^0 = 1</span>
                <span>2^10 = 1,024</span>
              </div>
            </div>

            {/* Chapter summary grid */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Chapter 3 — Systems Covered
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Decimal',     base: 10, digits: '0–9',   prefix: '',    color: 'bg-slate-100 text-slate-700' },
                  { name: 'Binary',      base: 2,  digits: '0–1',   prefix: '0b',  color: 'bg-amber-100 text-amber-700' },
                  { name: 'Octal',       base: 8,  digits: '0–7',   prefix: '0o',  color: 'bg-orange-100 text-orange-700' },
                  { name: 'Hexadecimal', base: 16, digits: '0–F',   prefix: '0x',  color: 'bg-violet-100 text-violet-700' }
                ].map(s => (
                  <div key={s.name} className={`rounded-xl p-3 ${s.color}`}>
                    <div className="font-black text-sm">{s.name}</div>
                    <div className="text-[10px] font-mono mt-1">Base {s.base} · {s.digits}</div>
                    {s.prefix && (
                      <div className="text-[10px] font-mono">Prefix: {s.prefix}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Decimal</div>
              <div className="mt-1 font-black text-slate-700">✓</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Binary / Hex</div>
              <div className="mt-1 font-black text-amber-600">✓</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Conversion</div>
              <div className="mt-1 font-black text-violet-600">✓</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene07_PowersOfTwo;
