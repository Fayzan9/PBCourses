import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene04_BinaryDivision: React.FC = () => {
  const [aVal, setAVal] = useState(13);
  const [bVal, setBVal] = useState(3);

  const clamp = (n: number, max: number) => Math.max(1, Math.min(max, n));
  const dividend = clamp(aVal, 31);
  const divisor  = clamp(bVal, 15);

  const quotient  = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  const toBin = (n: number, bits: number) => n.toString(2).padStart(bits, '0');

  // Build long-division steps
  const dividendBin = toBin(dividend, 5);
  const divisorBin  = toBin(divisor, 4);

  // Step-by-step restoring division (simplified)
  const steps: { partial: string; divisorBin: string; fits: boolean; quotientBit: number; remainder: number }[] = [];
  let running = 0;
  for (let i = 0; i < dividendBin.length; i++) {
    running = (running << 1) | Number(dividendBin[i]);
    const fits = running >= divisor;
    steps.push({
      partial: toBin(running, i + 1).slice(-Math.max(i + 1, 4)),
      divisorBin,
      fits,
      quotientBit: fits ? 1 : 0,
      remainder: fits ? running - divisor : running,
    });
    if (fits) running -= divisor;
  }

  const presets = [
    { a: 13, b: 3 }, { a: 20, b: 4 }, { a: 15, b: 5 }, { a: 30, b: 7 },
  ];

  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <SceneLayout gap="gap-5">
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-rose-600 font-extrabold">
          Lesson 4.4 · Binary Arithmetic
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Binary{' '}
          <span className="text-rose-600 font-serif italic">Division</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Binary long division works just like decimal long division —
          bring down one bit at a time, check if the divisor fits,
          write 1 if it does, 0 if it does not, and track the remainder.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">Inputs</div>
            {[
              { label: 'Dividend A', val: aVal, set: setAVal, max: 31, color: 'border-rose-400 bg-rose-50' },
              { label: 'Divisor B',  val: bVal, set: setBVal, max: 15, color: 'border-orange-400 bg-orange-50' },
            ].map(inp => (
              <div key={inp.label} className="mb-3">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">{inp.label} (1–{inp.max})</div>
                <input
                  type="number" min={1} max={inp.max}
                  value={inp.val}
                  onChange={e => inp.set(Number(e.target.value))}
                  className={`w-full border-2 rounded-xl px-3 py-2 text-xl font-black font-mono text-slate-700 outline-none focus:border-rose-500 text-center ${inp.color}`}
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2">
              {presets.map(p => (
                <button key={`${p.a}/${p.b}`}
                  onClick={() => { setAVal(p.a); setBVal(p.b); setActiveStep(null); }}
                  className={`p-2 rounded-xl border-2 font-mono font-black text-sm transition-all ${
                    dividend === p.a && divisor === p.b ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {p.a} ÷ {p.b}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex-1 min-h-0 overflow-auto">
            <div className="text-xs font-mono uppercase font-bold text-rose-600 mb-2">Algorithm</div>
            <ol className="text-xs font-semibold text-slate-600 space-y-2 list-decimal list-inside">
              <li>Bring down the next bit of the dividend</li>
              <li>If partial ≥ divisor → quotient bit = 1, subtract</li>
              <li>If partial &lt; divisor → quotient bit = 0, keep</li>
              <li>Repeat until all bits processed</li>
              <li>What remains is the remainder</li>
            </ol>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">
          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Long Division — {dividend} ÷ {divisor}
          </div>

          <motion.div
            key={`${dividend}-${divisor}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-4"
          >

            {/* Header: dividend / divisor */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 font-mono">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-center">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Dividend</div>
                  <div className="text-2xl font-black text-rose-600">{dividendBin}</div>
                  <div className="text-xs text-slate-400">= {dividend}</div>
                </div>
                <div className="text-2xl text-slate-300 font-black">÷</div>
                <div className="text-center">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Divisor</div>
                  <div className="text-2xl font-black text-orange-600">{divisorBin}</div>
                  <div className="text-xs text-slate-400">= {divisor}</div>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-1.5">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveStep(activeStep === i ? null : i)}
                    className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer border-2 transition-all ${
                      activeStep === i
                        ? s.fits ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 bg-slate-50'
                        : 'border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 w-12">Bit {i + 1}</div>
                    <div className="flex-1">
                      <span className="font-black text-slate-700">{s.partial}</span>
                      {s.fits && <span className="text-slate-400"> ≥ {divisorBin}</span>}
                      {!s.fits && <span className="text-slate-400"> &lt; {divisorBin}</span>}
                    </div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border-2 ${
                      s.fits
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 text-slate-300'
                    }`}>
                      {s.quotientBit}
                    </div>
                    <div className="text-[10px] text-slate-400 w-16 text-right">rem {s.remainder}</div>
                  </div>
                ))}
              </div>

              {/* Quotient bits */}
              <div className="border-t border-slate-200 mt-3 pt-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Quotient</span>
                  <div className="flex gap-1">
                    {steps.map((s, i) => (
                      <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black border ${
                        s.quotientBit === 1 ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-300'
                      }`}>{s.quotientBit}</div>
                    ))}
                  </div>
                  <span className="font-black text-emerald-600 font-mono">{toBin(quotient, 5)} = {quotient}</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border-2 border-emerald-400 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-mono text-slate-400">Quotient</div>
                <div className="mt-1 font-black text-emerald-600 text-2xl font-mono">{quotient}</div>
              </div>
              <div className="bg-white border-2 border-violet-400 rounded-xl p-3 text-center">
                <div className="text-[10px] uppercase font-mono text-slate-400">Remainder</div>
                <div className="mt-1 font-black text-violet-600 text-2xl font-mono">{remainder}</div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene04_BinaryDivision;
