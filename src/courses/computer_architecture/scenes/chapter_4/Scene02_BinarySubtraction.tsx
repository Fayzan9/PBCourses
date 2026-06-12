import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene02_BinarySubtraction: React.FC = () => {
  const [aVal, setAVal] = useState(12);
  const [bVal, setBVal] = useState(5);

  const clamp = (n: number) => Math.max(0, Math.min(255, n));
  const a = clamp(aVal);
  const b = clamp(bVal);

  const toBin8 = (n: number) => n.toString(2).padStart(8, '0');

  // Two's complement of b
  const bNot = (~b & 0xFF);
  const bTwos = (bNot + 1) & 0xFF;
  const result = (a + bTwos) & 0xFF;
  const isNegative = a < b;
  const trueResult = a - b;

  const steps = [
    { label: 'Step 1 — Start with B', value: b, bin: toBin8(b), color: 'text-orange-600', note: `B = ${b}` },
    { label: "Step 2 — Flip all bits (NOT)", value: bNot, bin: toBin8(bNot), color: 'text-violet-600', note: "Ones' complement" },
    { label: 'Step 3 — Add 1', value: bTwos, bin: toBin8(bTwos), color: 'text-rose-600', note: "Two's complement = −B" },
    { label: 'Step 4 — Add A + (−B)', value: result, bin: toBin8(result), color: 'text-emerald-600', note: `${a} + (−${b}) = ${trueResult}` },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const presets = [
    { a: 12, b: 5 }, { a: 15, b: 7 }, { a: 100, b: 36 }, { a: 8, b: 3 },
  ];

  return (
    <SceneLayout gap="gap-5">
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-rose-600 font-extrabold">
          Lesson 4.2 · Binary Arithmetic
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Binary{' '}
          <span className="text-rose-600 font-serif italic">Subtraction</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Computers do not subtract — they add a negative number instead.
          To negate a binary number, use <strong>two's complement</strong>:
          flip all bits, then add 1.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">Inputs</div>
            {[
              { label: 'A', val: aVal, set: setAVal, color: 'border-rose-400 bg-rose-50' },
              { label: 'B', val: bVal, set: setBVal, color: 'border-orange-400 bg-orange-50' },
            ].map(inp => (
              <div key={inp.label} className="mb-3">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Value {inp.label} (0–255)</div>
                <input
                  type="number" min={0} max={255}
                  value={inp.val}
                  onChange={e => inp.set(Number(e.target.value))}
                  className={`w-full border-2 rounded-xl px-3 py-2 text-xl font-black font-mono text-slate-700 outline-none focus:border-rose-500 text-center ${inp.color}`}
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-1">
              {presets.map(p => (
                <button key={`${p.a}-${p.b}`}
                  onClick={() => { setAVal(p.a); setBVal(p.b); setActiveStep(0); }}
                  className={`p-2 rounded-xl border-2 font-mono font-black text-sm transition-all ${
                    a === p.a && b === p.b ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {p.a} − {p.b}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-rose-600 mb-2">Why Two's Complement?</div>
            <p className="text-xs font-semibold text-slate-600">
              Addition circuits already exist in every CPU. Using two's complement means the same adder hardware handles both addition and subtraction — no separate subtraction circuit needed.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">
          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Two's Complement Method — A − B
          </div>

          {/* Step navigator */}
          <div className="flex gap-2">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex-1 py-1.5 rounded-xl border-2 text-xs font-bold transition-all ${
                  activeStep === i ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-500'
                }`}
              >
                Step {i + 1}
              </button>
            ))}
          </div>

          <motion.div
            key={`${activeStep}-${a}-${b}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-4"
          >
            {/* All steps stacked, highlight active */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 font-mono space-y-3">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    activeStep === i ? 'border-rose-400 bg-rose-50' : 'border-slate-100 opacity-50'
                  }`}
                  onClick={() => setActiveStep(i)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    activeStep === i ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">{s.label}</div>
                    <div className={`text-lg font-black tracking-widest mt-0.5 ${activeStep === i ? s.color : 'text-slate-400'}`}>
                      {s.bin}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-black font-mono ${activeStep === i ? s.color : 'text-slate-300'}`}>{s.value}</div>
                    <div className="text-[10px] text-slate-400">{s.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Result */}
            <div className={`border-2 rounded-2xl p-4 text-center ${isNegative ? 'border-orange-400 bg-orange-50' : 'border-emerald-400 bg-emerald-50'}`}>
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400 mb-1">Result: {a} − {b}</div>
              <div className={`text-4xl font-black font-mono ${isNegative ? 'text-orange-600' : 'text-emerald-700'}`}>
                {trueResult}
              </div>
              {isNegative && (
                <div className="text-xs font-semibold text-orange-600 mt-1">
                  Negative — would need a signed representation
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene02_BinarySubtraction;
