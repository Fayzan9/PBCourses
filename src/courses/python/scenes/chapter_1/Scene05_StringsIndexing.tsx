import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORD = 'Python';
const CHARS = WORD.split('');

export const Scene05_StringsIndexing: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(3);

  const sliceResult = WORD.slice(sliceStart, sliceEnd);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 h-full w-full max-w-7xl mx-auto px-8 py-6">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-7">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 05</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 mt-2 leading-[1.05]">
            Strings are like<br />
            <span className="text-amber-500">a bead necklace.</span>
          </h2>
          <p className="text-slate-500 text-base mt-4 leading-relaxed max-w-sm">
            Each character sits at a numbered position starting at <span className="font-mono font-extrabold text-amber-600">0</span>. You can grab any single bead, or yank out a stretch with a <span className="font-bold text-slate-700">slice</span>.
          </p>
        </div>

        {/* Creation syntax */}
        <div className="bg-slate-900 rounded-2xl px-6 py-5 font-mono text-sm leading-7 border border-slate-800">
          <span className="text-slate-500"># Three ways to create a string</span><br />
          <span className="text-sky-300">greeting</span><span className="text-slate-400"> = </span><span className="text-emerald-400">'single quotes work'</span><br />
          <span className="text-sky-300">name</span><span className="text-slate-400">    = </span><span className="text-emerald-400">"double quotes too"</span><br />
          <span className="text-sky-300">essay</span><span className="text-slate-400">   = </span><span className="text-emerald-400">"""triple for<br />multi-line text"""</span>
        </div>

        {/* Slice controls */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Slice Explorer</p>
            <span className="font-mono text-sm font-extrabold text-amber-600">
              "Python"[{sliceStart}:{sliceEnd}]
            </span>
          </div>
          <div className="flex gap-5">
            <div className="flex-1">
              <label className="text-xs text-slate-400 font-bold">start index: {sliceStart}</label>
              <input type="range" min={0} max={WORD.length} value={sliceStart}
                onChange={e => setSliceStart(Math.min(Number(e.target.value), sliceEnd))}
                className="w-full accent-amber-500 cursor-pointer mt-1.5" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-400 font-bold">end index: {sliceEnd}</label>
              <input type="range" min={0} max={WORD.length} value={sliceEnd}
                onChange={e => setSliceEnd(Math.max(Number(e.target.value), sliceStart))}
                className="w-full accent-amber-500 cursor-pointer mt-1.5" />
            </div>
          </div>
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl px-5 py-3 text-center">
            <span className="font-mono font-black text-amber-700 text-2xl">
              "{sliceResult || '(empty)'}"
            </span>
          </div>
        </div>
      </div>

      {/* Right: index visualizer */}
      <div className="flex-1 flex flex-col items-center gap-8">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Hover any character</p>

        {/* Character boxes */}
        <div className="flex flex-col items-center gap-6">
          {/* Positive indices above */}
          <div className="flex gap-3">
            {CHARS.map((ch, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <motion.span
                  animate={{ opacity: hovered === i ? 1 : 0.4 }}
                  className="text-xs font-mono font-extrabold text-amber-500"
                >
                  {i}
                </motion.span>
                <motion.div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{
                    scale: hovered === i ? 1.2 : 1,
                    y: hovered === i ? -4 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-mono font-extrabold text-2xl border-2 cursor-default select-none transition-colors duration-150 ${
                    i >= sliceStart && i < sliceEnd
                      ? 'bg-amber-100 border-amber-400 text-amber-700 shadow-md'
                      : hovered === i
                      ? 'bg-sky-100 border-sky-400 text-sky-700 shadow-lg'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {ch}
                </motion.div>
                <motion.span
                  animate={{ opacity: hovered === i ? 1 : 0.3 }}
                  className="text-xs font-mono font-bold text-slate-400"
                >
                  {i - WORD.length}
                </motion.span>
              </div>
            ))}
          </div>

          <div className="flex gap-8 text-[11px] font-bold text-slate-400">
            <span>↑ positive index (from start)</span>
            <span>↓ negative index (from end)</span>
          </div>
        </div>

        {/* Detail callout */}
        <AnimatePresence mode="wait">
          {hovered !== null ? (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 rounded-2xl px-8 py-5 font-mono text-center shadow-xl border border-slate-800 w-full max-w-xs"
            >
              <p className="text-slate-500 text-xs mb-3 uppercase tracking-wider font-bold">Two ways to access "{CHARS[hovered]}"</p>
              <p className="text-lg text-amber-400 font-bold mb-1">"Python"[{hovered}] → <span className="text-emerald-400">'{CHARS[hovered]}'</span></p>
              <p className="text-lg text-amber-400 font-bold">"Python"[{-(WORD.length - hovered)}] → <span className="text-emerald-400">'{CHARS[hovered]}'</span></p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-5 text-center w-full max-w-xs"
            >
              <p className="text-slate-400 text-sm font-medium">Hover a character to see how to access it</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene05_StringsIndexing;
