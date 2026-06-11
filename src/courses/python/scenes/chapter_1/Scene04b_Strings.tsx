import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_WORD = 'Python';

export const Scene04b_Strings: React.FC = () => {
  const [word, setWord] = useState(DEFAULT_WORD);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const safe = word || 'A';
  const sliced = safe.slice(start, end);
  const clampedEnd = Math.min(end, safe.length);
  const clampedStart = Math.min(start, safe.length - 1);

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden">

      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 04b · Strings</span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          A string is a <span className="text-emerald-600">necklace of characters.</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Every character has an index starting at <code className="text-emerald-700 font-mono font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-md">0</code>. Hover to explore, then try slicing.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-5 min-h-0">

        {/* Word input */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider shrink-0">Try your own word:</span>
          <input
            value={word}
            onChange={e => {
              const v = e.target.value.slice(0, 12);
              setWord(v);
              setStart(0);
              setEnd(Math.min(3, v.length));
            }}
            maxLength={12}
            className="font-mono font-bold text-sm text-slate-800 bg-white border-2 border-slate-200 focus:border-emerald-400 rounded-xl px-3 py-1.5 outline-none w-36 transition-colors"
          />
        </div>

        {/* Character necklace */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-1.5 flex-wrap">
            {safe.split('').map((char, i) => {
              const inSlice = i >= clampedStart && i < clampedEnd;
              const isHovered = hoveredIdx === i;
              return (
                <motion.div
                  key={i}
                  onHoverStart={() => setHoveredIdx(i)}
                  onHoverEnd={() => setHoveredIdx(null)}
                  animate={{ y: isHovered ? -4 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex flex-col items-center gap-1 cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-mono font-black text-xl transition-all ${
                    inSlice
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm'
                      : isHovered
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}>
                    {char}
                  </div>
                  <span className={`text-[11px] font-mono font-bold ${
                    inSlice ? 'text-emerald-600' : isHovered ? 'text-amber-500' : 'text-slate-400'
                  }`}>
                    [{i}]
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredIdx !== null && hoveredIdx < safe.length && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs font-mono text-amber-800 w-fit"
              >
                <span className="text-slate-500">word[{hoveredIdx}]</span>
                <span className="text-amber-600 mx-2">→</span>
                <span className="font-bold">"{safe[hoveredIdx]}"</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Slice controls */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">

          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Interactive Slice — <code className="text-emerald-700">word[start : end]</code></p>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-slate-500 w-10">start</span>
                <input
                  type="range" min={0} max={safe.length - 1}
                  value={clampedStart}
                  onChange={e => setStart(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 cursor-pointer"
                />
                <span className="font-mono font-black text-emerald-700 w-6 text-center">{clampedStart}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-slate-500 w-10">end</span>
                <input
                  type="range" min={0} max={safe.length}
                  value={clampedEnd}
                  onChange={e => setEnd(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 cursor-pointer"
                />
                <span className="font-mono font-black text-emerald-700 w-6 text-center">{clampedEnd}</span>
              </div>
            </div>

            {/* Live result */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="font-mono text-sm text-slate-500">
                <span className="text-slate-600 font-semibold">"{safe}"</span>
                <span className="text-emerald-600 font-black">[{clampedStart}:{clampedEnd}]</span>
                <span className="text-slate-400 mx-2">→</span>
              </div>
              <span className="font-mono font-black text-2xl text-emerald-700">
                "{sliced || '(empty)'}"
              </span>
            </div>
          </div>

          {/* Quick facts */}
          <div className="flex flex-col gap-2 lg:w-52 shrink-0">
            {[
              { code: `"${safe}"[0]`, result: `"${safe[0] || ''}"`, label: 'First character' },
              { code: `"${safe}"[-1]`, result: `"${safe[safe.length - 1] || ''}"`, label: 'Last character' },
              { code: `len("${safe}")`, result: `${safe.length}`, label: 'Length' },
            ].map((fact, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 font-medium">{fact.label}</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <code className="font-mono text-xs text-slate-600 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">{fact.code}</code>
                  <span className="text-slate-400 text-xs">→</span>
                  <code className="font-mono text-xs text-emerald-700 font-bold">{fact.result}</code>
                </div>
              </div>
            ))}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-amber-800 leading-relaxed mt-auto">
              <span className="font-bold">Remember:</span> slicing never crashes. <code className="font-mono">[start:end]</code> end is <em>not included</em>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene04b_Strings;
