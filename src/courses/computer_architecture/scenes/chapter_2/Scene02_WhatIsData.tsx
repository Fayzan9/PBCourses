import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene02_WhatIsData: React.FC = () => {
  const interpretations = [
    {
      id: 'temp',
      label: 'Temperature Sensor',
      raw: '72',
      unit: '°F',
      interpreted: '72°F — Comfortable room temperature',
      context: 'Thermometer reading',
      color: 'orange'
    },
    {
      id: 'ascii',
      label: 'Text Character',
      raw: '72',
      unit: 'ASCII',
      interpreted: '"H" — The letter H in text',
      context: 'ASCII character code',
      color: 'violet'
    },
    {
      id: 'pixel',
      label: 'Pixel Color',
      raw: '72',
      unit: 'RGB',
      interpreted: 'Dark blue component in a pixel',
      context: 'Image color channel',
      color: 'sky'
    },
    {
      id: 'volume',
      label: 'Audio Sample',
      raw: '72',
      unit: 'PCM',
      interpreted: 'Quiet sound wave amplitude',
      context: 'Audio waveform sample',
      color: 'emerald'
    }
  ];

  const [selected, setSelected] = useState('temp');
  const current = interpretations.find(i => i.id === selected)!;

  const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
    orange: { border: 'border-orange-500', bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
    violet: { border: 'border-violet-500', bg: 'bg-violet-50', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700' },
    sky:    { border: 'border-sky-500',    bg: 'bg-sky-50',    text: 'text-sky-700',    badge: 'bg-sky-100 text-sky-700'    },
    emerald:{ border: 'border-emerald-500',bg: 'bg-emerald-50',text: 'text-emerald-700',badge: 'bg-emerald-100 text-emerald-700' }
  };
  const c = colorMap[current.color];

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-violet-600 font-extrabold">
          Lesson 2.2 · Information And Data
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          What Is{' '}
          <span className="text-violet-600 font-serif italic">
            Data?
          </span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Data is the raw ingredient. The same number can mean completely
          different things depending on context — a computer stores the
          number, but context gives it meaning.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-1">
              Same Number, Different Meaning
            </div>
            <div className="text-[11px] text-slate-400 mb-3">
              The number 72 stored in memory — pick a context:
            </div>
            <div className="flex flex-col gap-2">
              {interpretations.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selected === item.id
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="font-black text-slate-800 text-sm">{item.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.context}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-violet-600">
              The Big Idea
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-700">
              Computers store only numbers. What those numbers
              <span className="text-violet-600"> mean</span> depends entirely
              on how a program chooses to interpret them.
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Data Interpretation
          </div>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-5"
          >

            {/* Raw data */}
            <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                Raw Data In Memory
              </div>
              <div className="text-7xl font-black text-slate-700 font-mono">
                72
              </div>
              <div className="text-xs text-slate-400 mt-2 font-mono">
                01001000 in binary
              </div>
            </div>

            {/* Context arrow */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <div className={`text-xs font-mono uppercase font-bold px-3 py-1 rounded-full ${c.badge}`}>
                Context: {current.context}
              </div>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Interpreted meaning */}
            <div className={`rounded-2xl border-2 p-5 ${c.border} ${c.bg}`}>
              <div className={`text-[10px] font-mono uppercase font-bold mb-2 ${c.text}`}>
                Interpreted As
              </div>
              <div className={`text-2xl font-black ${c.text} mb-2`}>
                {current.raw}{current.unit !== 'ASCII' && current.unit !== 'RGB' && current.unit !== 'PCM' ? current.unit : ''}
              </div>
              <div className="text-sm font-semibold text-slate-600">
                {current.interpreted}
              </div>
            </div>

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Raw</div>
              <div className="mt-1 font-black text-slate-700 text-sm font-mono">72</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Context</div>
              <div className="mt-1 font-black text-violet-600 text-sm">{current.unit}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Meaning</div>
              <div className="mt-1 font-black text-emerald-600 text-sm">✓</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene02_WhatIsData;
