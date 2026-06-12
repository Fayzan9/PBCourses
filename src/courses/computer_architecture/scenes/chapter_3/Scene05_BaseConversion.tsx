import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene05_BaseConversion: React.FC = () => {
  const [decimalInput, setDecimalInput] = useState('42');

  const raw = parseInt(decimalInput, 10);
  const value = isNaN(raw) || raw < 0 ? 0 : Math.min(raw, 255);

  const toBinary  = (n: number) => n.toString(2).padStart(8, '0');
  const toOctal   = (n: number) => '0o' + n.toString(8);
  const toHex     = (n: number) => '0x' + n.toString(16).toUpperCase().padStart(2, '0');

  const binary = toBinary(value);
  const octal  = toOctal(value);
  const hex    = toHex(value);

  // Division-by-2 steps for decimal→binary (up to 8 steps)
  const buildSteps = (n: number) => {
    if (n === 0) return [{ quotient: 0, remainder: 0 }];
    const steps = [];
    let cur = n;
    while (cur > 0) {
      steps.push({ quotient: Math.floor(cur / 2), remainder: cur % 2 });
      cur = Math.floor(cur / 2);
    }
    return steps;
  };

  const steps = buildSteps(value);

  const presets = [7, 10, 42, 100, 127, 255];

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-amber-600 font-extrabold">
          Lesson 3.5 · Number Systems
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Base{' '}
          <span className="text-amber-600 font-serif italic">Conversion</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Any number can be expressed in any base. To convert decimal to
          binary, divide by 2 repeatedly and read the remainders bottom-up.
          The same principle works for any base.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Enter A Decimal (0–255)
            </div>
            <input
              type="number"
              min={0}
              max={255}
              value={decimalInput}
              onChange={e => setDecimalInput(e.target.value)}
              className="w-full border-2 border-amber-300 rounded-xl px-4 py-3 text-3xl font-black font-mono text-slate-700 bg-amber-50 outline-none focus:border-amber-500 text-center"
              placeholder="42"
            />
            <div className="mt-3 grid grid-cols-3 gap-2">
              {presets.map(p => (
                <button
                  key={p}
                  onClick={() => setDecimalInput(String(p))}
                  className={`p-2 rounded-xl border-2 font-black font-mono text-sm transition-all ${
                    value === p
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex-1 min-h-0 overflow-auto">
            <div className="text-xs font-mono uppercase font-bold text-amber-600 mb-3">
              Divide By 2 — Read Remainders ↑
            </div>
            <div className="space-y-1">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-500 w-24">
                    {steps[i - 1]?.quotient ?? value} ÷ 2 =
                  </span>
                  <span className="font-black text-slate-700 w-8">{s.quotient}</span>
                  <span className="text-slate-400">R</span>
                  <span className={`font-black w-4 ${s.remainder === 1 ? 'text-amber-600' : 'text-slate-500'}`}>
                    {s.remainder}
                  </span>
                  {i === steps.length - 1 && (
                    <span className="text-[9px] text-slate-400">← MSB</span>
                  )}
                  {i === 0 && (
                    <span className="text-[9px] text-slate-400">← LSB</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 text-[10px] font-semibold text-slate-500">
              Read remainders from bottom → top = {value === 0 ? '0' : steps.map(s => s.remainder).reverse().join('')}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Same Value, Four Bases
          </div>

          <motion.div
            key={value}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-4"
          >

            {/* Four base cards */}
            {[
              { base: 'Base 10', name: 'Decimal',     value: String(value),  color: 'border-slate-400  bg-white        text-slate-700',  badge: 'bg-slate-100  text-slate-600'  },
              { base: 'Base 2',  name: 'Binary',      value: binary,         color: 'border-amber-500  bg-amber-50     text-amber-700',  badge: 'bg-amber-100  text-amber-700'  },
              { base: 'Base 8',  name: 'Octal',       value: octal,          color: 'border-orange-400 bg-orange-50    text-orange-700', badge: 'bg-orange-100 text-orange-700' },
              { base: 'Base 16', name: 'Hexadecimal', value: hex,            color: 'border-violet-500 bg-violet-50    text-violet-700', badge: 'bg-violet-100 text-violet-700' }
            ].map(card => (
              <div
                key={card.base}
                className={`border-2 rounded-2xl p-4 flex items-center justify-between ${card.color}`}
              >
                <div>
                  <div className={`text-[10px] font-mono uppercase font-bold ${card.badge.split(' ')[1]}`}>
                    {card.base} · {card.name}
                  </div>
                  <div className="text-2xl font-black font-mono mt-1">{card.value}</div>
                </div>
                <div className={`text-xs px-3 py-1 rounded-full font-bold ${card.badge}`}>
                  {card.name.slice(0,3).toUpperCase()}
                </div>
              </div>
            ))}

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Decimal', val: String(value), color: 'text-slate-700' },
              { label: 'Binary',  val: binary.replace(/^0+(?=.)/, ''), color: 'text-amber-600' },
              { label: 'Octal',   val: octal,   color: 'text-orange-600' },
              { label: 'Hex',     val: hex,     color: 'text-violet-600' }
            ].map(b => (
              <div key={b.label} className="bg-white border border-slate-200 rounded-xl p-3 text-center min-w-0">
                <div className="text-[10px] uppercase font-mono text-slate-400">{b.label}</div>
                <div className={`mt-1 font-black font-mono text-xs truncate ${b.color}`}>{b.val}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene05_BaseConversion;
