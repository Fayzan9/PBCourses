import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene06_Overflow: React.FC = () => {
  const scenarios = [
    {
      id: 'safe',
      label: 'Safe Addition',
      a: 100, b: 50,
      bits: 8,
      note: '100 + 50 = 150 — fits in 8 bits (max 255)',
      color: 'emerald'
    },
    {
      id: 'edge',
      label: 'Edge of Range',
      a: 200, b: 55,
      bits: 8,
      note: '200 + 55 = 255 — exactly fills 8 bits',
      color: 'amber'
    },
    {
      id: 'overflow8',
      label: '8-bit Overflow',
      a: 200, b: 100,
      bits: 8,
      note: '200 + 100 = 300 — 8 bits can only hold 255, result wraps to 44',
      color: 'rose'
    },
    {
      id: 'overflow4',
      label: '4-bit Overflow',
      a: 12, b: 6,
      bits: 4,
      note: '12 + 6 = 18 — 4 bits can only hold 15, result wraps to 2',
      color: 'rose'
    },
  ];

  const [selected, setSelected] = useState('overflow8');
  const sc = scenarios.find(s => s.id === selected)!;

  const maxVal = Math.pow(2, sc.bits) - 1;
  const trueSum = sc.a + sc.b;
  const storedSum = trueSum & maxVal;
  const overflow = trueSum > maxVal;
  const lostBit = overflow ? Math.floor(trueSum / Math.pow(2, sc.bits)) : 0;

  const toBin = (n: number, bits: number) => n.toString(2).padStart(bits, '0');

  const realWorldCases = [
    { title: 'Ariane 5 Rocket (1996)', desc: 'A 64-bit float was converted to 16-bit. The value was too large → overflow → rocket self-destructed 37 seconds after launch.' },
    { title: 'Y2K Bug (2000)', desc: 'Years stored as 2 digits (00–99). 1999 + 1 = "00" — not 2000. Led to a global software crisis.' },
    { title: 'Integer Overflow in Games', desc: 'Pac-Man level 256: the level counter was an 8-bit value. 255 + 1 → 0, causing the infamous corrupted screen.' },
  ];
  const [activeCase, setActiveCase] = useState(0);

  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    emerald: { border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
    amber:   { border: 'border-amber-500',   bg: 'bg-amber-50',   text: 'text-amber-700'   },
    rose:    { border: 'border-rose-500',     bg: 'bg-rose-50',    text: 'text-rose-700'    },
  };
  const c = colorMap[sc.color];

  return (
    <SceneLayout gap="gap-5">
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-rose-600 font-extrabold">
          Lesson 4.6 · Binary Arithmetic
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          <span className="text-rose-600 font-serif italic">Overflow</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Every register has a fixed number of bits. When a result is too large
          to fit, the extra bits are lost — the value wraps around.
          This is overflow, and it has caused real-world disasters.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">Scenarios</div>
            <div className="flex flex-col gap-2">
              {scenarios.map(s => {
                const sc2 = colorMap[s.color];
                return (
                  <button key={s.id}
                    onClick={() => setSelected(s.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selected === s.id ? `${sc2.border} ${sc2.bg}` : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-black text-sm text-slate-800">{s.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-mono">{s.a} + {s.b} ({s.bits}-bit)</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex-1 min-h-0 overflow-auto">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">Real-World Disasters</div>
            <div className="flex flex-col gap-2">
              {realWorldCases.map((r, i) => (
                <button key={i} onClick={() => setActiveCase(i)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    activeCase === i ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                  }`}
                >
                  <div className="font-black text-xs text-slate-700">{r.title}</div>
                </button>
              ))}
            </div>
            <div className="mt-3 p-3 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold text-slate-600">{realWorldCases[activeCase].desc}</p>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">
          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            {sc.bits}-Bit Register — {sc.a} + {sc.b}
          </div>

          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-4"
          >

            {/* Register capacity bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Register Capacity: {sc.bits} bits = max {maxVal}
              </div>
              <div className="h-6 bg-slate-100 rounded-full overflow-hidden relative">
                {/* True result bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((trueSum / (maxVal + 1)) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${overflow ? 'bg-rose-400' : 'bg-emerald-400'}`}
                />
                {/* Max marker */}
                <div className="absolute right-0 top-0 h-full w-0.5 bg-slate-400" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>0</span>
                <span className={overflow ? 'text-rose-500 font-bold' : ''}>
                  True result: {trueSum} {overflow ? `> ${maxVal} ← OVERFLOW` : `≤ ${maxVal} ✓`}
                </span>
                <span>{maxVal}</span>
              </div>
            </div>

            {/* Binary breakdown */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 font-mono">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-3">Binary Representation</div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-rose-500 font-bold w-14">True sum</span>
                <div className="flex gap-1">
                  {overflow && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border-2 border-orange-400 bg-orange-100 text-orange-600">
                      {lostBit}
                    </div>
                  )}
                  {toBin(trueSum & maxVal, sc.bits).split('').map((bit, i) => (
                    <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border ${
                      bit === '1' ? 'border-slate-300 bg-slate-50 text-slate-700' : 'border-slate-100 text-slate-300'
                    }`}>{bit}</div>
                  ))}
                </div>
                <span className="text-slate-500 font-black">= {trueSum}</span>
              </div>

              {overflow && (
                <div className="flex items-center gap-2 mt-1 text-[10px] text-orange-500">
                  <span className="w-14" />
                  <span className="font-bold">↑ This bit is lost — register only has {sc.bits} bits</span>
                </div>
              )}

              <div className="border-t border-dashed border-slate-200 my-3" />

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-emerald-600 font-bold w-14">Stored</span>
                <div className="flex gap-1">
                  {toBin(storedSum, sc.bits).split('').map((bit, i) => (
                    <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border ${
                      bit === '1'
                        ? overflow ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                        : 'border-slate-100 text-slate-300'
                    }`}>{bit}</div>
                  ))}
                </div>
                <span className={`font-black ${overflow ? 'text-rose-600' : 'text-emerald-600'}`}>
                  = {storedSum} {overflow ? `← WRONG!` : '✓'}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className={`border-2 rounded-2xl p-4 ${c.border} ${c.bg}`}>
              <div className={`text-xs font-mono uppercase font-bold ${c.text} mb-1`}>
                {overflow ? 'OVERFLOW DETECTED' : 'No Overflow'}
              </div>
              <p className={`text-sm font-semibold ${c.text}`}>{sc.note}</p>
            </div>

          </motion.div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene06_Overflow;
