import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORD = 'Python';
const CHARS = WORD.split('');

export const Scene05_StringsIndexing: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(3);

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">

      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 05</span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-800 mt-1 leading-[1.05]">
            Strings are like<br /><span className="text-amber-500">a bead necklace.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            Each character sits at a numbered position starting at <span className="font-mono font-extrabold text-amber-600">0</span>. Grab any single bead, or yank out a stretch with a <span className="font-bold text-slate-700">slice</span>.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl px-5 py-4 font-mono text-xs leading-6 border border-slate-800">
          <span className="text-slate-500"># Three ways to create a string</span><br />
          <span className="text-sky-300">s1</span><span className="text-slate-400"> = </span><span className="text-emerald-400">'single quotes'</span><br />
          <span className="text-sky-300">s2</span><span className="text-slate-400"> = </span><span className="text-emerald-400">"double quotes"</span><br />
          <span className="text-sky-300">s3</span><span className="text-slate-400"> = </span><span className="text-emerald-400">"""triple for<br />   multi-line text"""</span>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Slice Explorer</p>
            <span className="font-mono text-xs font-extrabold text-amber-600">
              "Python"[{sliceStart}:{sliceEnd}] = "{WORD.slice(sliceStart, sliceEnd) || '(empty)'}"
            </span>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-slate-400 font-bold">start: {sliceStart}</label>
              <input type="range" min={0} max={WORD.length} value={sliceStart}
                onChange={e => setSliceStart(Math.min(Number(e.target.value), sliceEnd))}
                className="w-full accent-amber-500 cursor-pointer mt-1" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-400 font-bold">end: {sliceEnd}</label>
              <input type="range" min={0} max={WORD.length} value={sliceEnd}
                onChange={e => setSliceEnd(Math.max(Number(e.target.value), sliceStart))}
                className="w-full accent-amber-500 cursor-pointer mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Right: index visualizer */}
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center gap-6">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Hover any character</p>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2.5">
            {CHARS.map((ch, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <motion.span
                  animate={{ opacity: hovered === i ? 1 : 0.35 }}
                  className="text-xs font-mono font-extrabold text-amber-500"
                >{i}</motion.span>
                <motion.div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{ scale: hovered === i ? 1.2 : 1, y: hovered === i ? -3 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-extrabold text-xl border-2 cursor-default select-none transition-colors duration-100 ${
                    i >= sliceStart && i < sliceEnd
                      ? 'bg-amber-100 border-amber-400 text-amber-700 shadow-md'
                      : hovered === i
                      ? 'bg-sky-100 border-sky-400 text-sky-700 shadow-lg'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >{ch}</motion.div>
                <motion.span
                  animate={{ opacity: hovered === i ? 1 : 0.25 }}
                  className="text-xs font-mono font-bold text-slate-400"
                >{i - WORD.length}</motion.span>
              </div>
            ))}
          </div>
          <div className="flex gap-8 text-[10px] font-bold text-slate-400">
            <span>↑ positive index (from start)</span>
            <span>↓ negative index (from end)</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {hovered !== null ? (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900 rounded-2xl px-7 py-4 font-mono text-center shadow-xl border border-slate-800 w-full max-w-xs"
            >
              <p className="text-slate-500 text-xs mb-2 uppercase tracking-wider font-bold">Two ways to get "{CHARS[hovered]}"</p>
              <p className="text-sm text-amber-400 font-bold mb-1">"Python"[{hovered}] → <span className="text-emerald-400">'{CHARS[hovered]}'</span></p>
              <p className="text-sm text-amber-400 font-bold">"Python"[{-(WORD.length - hovered)}] → <span className="text-emerald-400">'{CHARS[hovered]}'</span></p>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-7 py-4 text-center w-full max-w-xs">
              <p className="text-slate-400 text-xs font-medium">Hover a character to see how to access it</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene05_StringsIndexing;
