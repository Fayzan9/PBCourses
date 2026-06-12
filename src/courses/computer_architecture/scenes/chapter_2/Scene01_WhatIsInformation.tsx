import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene01_WhatIsInformation: React.FC = () => {
  const examples = [
    {
      id: 'weather',
      label: 'Weather Report',
      raw: '"It will rain tomorrow at 3pm"',
      meaningful: true,
      reason: 'Tells you something specific and actionable — bring an umbrella.',
      tag: 'Information'
    },
    {
      id: 'noise',
      label: 'Random Static',
      raw: '"xQp#9!mZk@2$wLo"',
      meaningful: false,
      reason: 'No structure, no meaning — you cannot act on it.',
      tag: 'Noise'
    },
    {
      id: 'stock',
      label: 'Stock Price',
      raw: '"AAPL is $192.34 (+2.1%)"',
      meaningful: true,
      reason: 'A meaningful signal — investors can make decisions from this.',
      tag: 'Information'
    },
    {
      id: 'bytes',
      label: 'Raw Bytes',
      raw: '"0x4F 0xA1 0x3C 0x77"',
      meaningful: false,
      reason: 'Without context, raw bytes carry no meaning on their own.',
      tag: 'Noise'
    }
  ];

  const [selected, setSelected] = useState('weather');
  const current = examples.find(e => e.id === selected)!;

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-violet-600 font-extrabold">
          Lesson 2.1 · Information And Data
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          What Is{' '}
          <span className="text-violet-600 font-serif italic">
            Information?
          </span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Information is data that carries meaning. Not everything
          you receive is information — it only becomes information
          when it can be understood and acted upon.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Examples
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {examples.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => setSelected(ex.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === ex.id
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-black text-slate-800 text-sm">{ex.label}</div>
                    <div className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                      ex.meaningful
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {ex.tag}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-violet-600">
              Key Definition
            </div>
            <div className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
              <div className="rounded-xl bg-white border border-violet-100 p-3">
                <span className="text-violet-600 font-black">Data</span> — raw symbols, numbers, signals
              </div>
              <div className="rounded-xl bg-white border border-violet-100 p-3">
                <span className="text-violet-600 font-black">Information</span> — data + meaning + context
              </div>
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Is This Information?
          </div>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-6"
          >

            {/* Raw signal box */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Signal Received
              </div>
              <div className="text-xl font-black text-slate-700 font-mono">
                {current.raw}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="text-4xl text-slate-300">↓</div>
            </div>

            {/* Verdict */}
            <div className={`rounded-2xl border-2 p-6 ${
              current.meaningful
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-rose-500 bg-rose-50'
            }`}>
              <div className={`text-xs font-mono uppercase font-bold mb-2 ${
                current.meaningful ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                Verdict
              </div>
              <div className={`text-3xl font-black mb-3 ${
                current.meaningful ? 'text-emerald-700' : 'text-rose-700'
              }`}>
                {current.meaningful ? 'This IS Information' : 'This is NOT Information'}
              </div>
              <div className="text-sm font-semibold text-slate-600">
                {current.reason}
              </div>
            </div>

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Meaningful</div>
              <div className="mt-1 font-black text-emerald-600">Has Context</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Noise</div>
              <div className="mt-1 font-black text-rose-600">No Context</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene01_WhatIsInformation;
