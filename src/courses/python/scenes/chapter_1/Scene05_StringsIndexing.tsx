import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORD = 'Python';
const CHARS = WORD.split('');

export const Scene05_StringsIndexing: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [sliceStart, setSliceStart] = useState(1);
  const [sliceEnd, setSliceEnd] = useState(4);

  const sliceResult = WORD.slice(sliceStart, sliceEnd);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 h-full w-full max-w-5xl mx-auto px-4 py-4">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 05</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            Strings & Indexing
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            A string is a <span className="font-bold text-slate-700">sequence of characters</span>. Python gives each character an index starting at <span className="font-mono font-bold text-amber-600">0</span>. Negative indices count from the end.
          </p>
        </div>

        {/* String creation */}
        <div className="bg-slate-900 rounded-xl px-5 py-4 font-mono text-sm text-slate-200 flex flex-col gap-1.5">
          <span className="text-slate-500"># Three ways to create a string</span>
          <span>s1 = <span className="text-emerald-400">'single quotes'</span></span>
          <span>s2 = <span className="text-emerald-400">"double quotes"</span></span>
          <span>s3 = <span className="text-emerald-400">"""triple for</span></span>
          <span className="text-emerald-400">   multi-line"""</span>
        </div>

        {/* Slice controls */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Slice Explorer: <span className="font-mono text-amber-600">"{WORD}"[{sliceStart}:{sliceEnd}]</span></p>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-slate-500 font-bold">start: {sliceStart}</label>
              <input type="range" min={0} max={WORD.length} value={sliceStart}
                onChange={e => setSliceStart(Math.min(Number(e.target.value), sliceEnd))}
                className="w-full accent-amber-500 cursor-pointer" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500 font-bold">end: {sliceEnd}</label>
              <input type="range" min={0} max={WORD.length} value={sliceEnd}
                onChange={e => setSliceEnd(Math.max(Number(e.target.value), sliceStart))}
                className="w-full accent-amber-500 cursor-pointer" />
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-center font-mono font-extrabold text-amber-700 text-lg">
            "{sliceResult || '(empty)'}"
          </div>
        </div>
      </div>

      {/* Right: index visualizer */}
      <div className="flex-1 flex flex-col items-center gap-6">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Hover a character</p>

        {/* Positive indices */}
        <div className="flex flex-col items-center gap-1 w-full">
          <div className="flex gap-2">
            {CHARS.map((ch, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono font-bold text-slate-400">{i}</span>
                <motion.div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{ scale: hovered === i ? 1.15 : 1 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-extrabold text-lg border-2 cursor-default transition-colors ${
                    i >= sliceStart && i < sliceEnd
                      ? 'bg-amber-100 border-amber-400 text-amber-700'
                      : hovered === i
                      ? 'bg-sky-100 border-sky-400 text-sky-700'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {ch}
                </motion.div>
                <span className="text-[10px] font-mono font-bold text-slate-300">{i - WORD.length}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-8 mt-1">
            <span className="text-[10px] font-mono text-slate-400">↑ positive index</span>
            <span className="text-[10px] font-mono text-slate-400">↓ negative index</span>
          </div>
        </div>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          {hovered !== null && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900 rounded-xl px-6 py-4 font-mono text-sm text-slate-200 text-center shadow-lg"
            >
              <span className="text-slate-500">&gt;&gt;&gt; </span>
              <span className="text-amber-300">"Python"[{hovered}]</span>
              <br />
              <span className="text-emerald-400">'{CHARS[hovered]}'</span>
              <span className="ml-3 text-slate-500 text-xs">also: [-{WORD.length - hovered}]</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene05_StringsIndexing;
