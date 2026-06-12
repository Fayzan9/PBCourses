import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene07_EverythingIsNumbers: React.FC = () => {
  const mediaTypes = [
    {
      id: 'text',
      label: 'Text',
      icon: 'T',
      color: 'violet',
      example: '"Hello"',
      howStored: 'Each character → ASCII number',
      numbers: ['72', '101', '108', '108', '111'],
      labels: ['H', 'e', 'l', 'l', 'o'],
      fact: 'Every letter, digit, and symbol has a unique number. "Hello" = 5 numbers.'
    },
    {
      id: 'image',
      label: 'Image',
      icon: '🖼',
      color: 'sky',
      example: '1 pixel',
      howStored: 'Each pixel → 3 numbers (R, G, B)',
      numbers: ['220', '38', '38'],
      labels: ['R', 'G', 'B'],
      fact: 'A 1920×1080 photo contains over 6 million numbers (3 per pixel).'
    },
    {
      id: 'audio',
      label: 'Audio',
      icon: '🔊',
      color: 'orange',
      example: '5 samples',
      howStored: 'Sound wave → sampled amplitude values',
      numbers: ['2', '42', '60', '-38', '-62'],
      labels: ['t1', 't2', 't3', 't4', 't5'],
      fact: 'CD audio captures 44,100 numbers every second to represent sound.'
    },
    {
      id: 'video',
      label: 'Video',
      icon: '🎬',
      color: 'emerald',
      example: '1 frame',
      howStored: 'Frame sequence + audio track → numbers',
      numbers: ['...', '220', '38', '...', '72', '...'],
      labels: ['px1R', 'px1G', 'px1B', '...', 'audio', '...'],
      fact: 'Video combines millions of pixel numbers with thousands of audio samples per second.'
    }
  ];

  const colorMap: Record<string, { border: string; bg: string; text: string; badgeBg: string; badgeText: string; iconBg: string }> = {
    violet:  { border: 'border-violet-500',  bg: 'bg-violet-50',  text: 'text-violet-700',  badgeBg: 'bg-violet-100',  badgeText: 'text-violet-700',  iconBg: 'bg-violet-500'  },
    sky:     { border: 'border-sky-500',     bg: 'bg-sky-50',     text: 'text-sky-700',     badgeBg: 'bg-sky-100',     badgeText: 'text-sky-700',     iconBg: 'bg-sky-500'     },
    orange:  { border: 'border-orange-500',  bg: 'bg-orange-50',  text: 'text-orange-700',  badgeBg: 'bg-orange-100',  badgeText: 'text-orange-700',  iconBg: 'bg-orange-500'  },
    emerald: { border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700', iconBg: 'bg-emerald-500' }
  };

  const [selected, setSelected] = useState('text');
  const current = mediaTypes.find(m => m.id === selected)!;
  const c = colorMap[current.color];

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-violet-600 font-extrabold">
          Lesson 2.7 · Chapter Summary
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Everything Is{' '}
          <span className="text-violet-600 font-serif italic">
            Numbers
          </span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          No matter what a computer stores — text, images, audio, or video —
          it all comes down to numbers. The computer never sees letters or
          colours. It only ever sees sequences of numbers.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Media Type
            </div>
            <div className="flex flex-col gap-2">
              {mediaTypes.map(m => {
                const mc = colorMap[m.color];
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      selected === m.id
                        ? `${mc.border} ${mc.bg}`
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg ${mc.iconBg} flex items-center justify-center text-white font-black text-sm`}>
                      {m.icon}
                    </div>
                    <div>
                      <div className="font-black text-slate-800 text-sm">{m.label}</div>
                      <div className="text-[11px] text-slate-500">{m.howStored}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-violet-600">
              Chapter 2 Takeaway
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-700">
              Computers are number machines. Everything you see,
              hear, or type is encoded as a sequence of numbers
              before the computer can work with it.
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            How It Gets Stored
          </div>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-5"
          >

            {/* Top: human-readable example */}
            <div className={`rounded-2xl border-2 p-5 ${c.border} ${c.bg}`}>
              <div className={`text-[10px] font-mono uppercase font-bold mb-2 ${c.text}`}>
                Human Sees
              </div>
              <div className={`text-4xl font-black ${c.text}`}>
                {current.label}: {current.example}
              </div>
              <div className={`text-sm font-semibold mt-2 ${c.text} opacity-80`}>
                {current.howStored}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="text-4xl text-slate-300">↓</div>
            </div>

            {/* Bottom: stored as numbers */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Computer Stores
              </div>
              <div className="flex flex-wrap gap-3">
                {current.numbers.map((n, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`text-xl font-black font-mono ${c.text}`}>{n}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{current.labels[i]}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs font-semibold text-slate-500">
                {current.fact}
              </div>
            </div>

          </motion.div>

          {/* Bottom strip — chapter recap */}
          <div className="grid grid-cols-4 gap-3">
            {mediaTypes.map(m => {
              const mc = colorMap[m.color];
              return (
                <div key={m.id} className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-[10px] uppercase font-mono text-slate-400">{m.label}</div>
                  <div className={`mt-1 font-black text-sm ${mc.text}`}>✓</div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene07_EverythingIsNumbers;
