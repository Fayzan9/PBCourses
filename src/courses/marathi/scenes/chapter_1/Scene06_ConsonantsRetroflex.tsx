import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RETROFLEX = [
  { letter: 'ट', roman: 'ṭa', hint: 'Like "t" in "tree" — tongue tip curls back' },
  { letter: 'ठ', roman: 'ṭha', hint: 'Aspirated retroflex — ṭa + puff of air' },
  { letter: 'ड', roman: 'ḍa', hint: 'Like "d" but tongue curled back to roof' },
  { letter: 'ढ', roman: 'ḍha', hint: 'Voiced aspirated retroflex — ḍa + puff' },
  { letter: 'ण', roman: 'ṇa', hint: 'Nasal sound with tongue curled back' },
];

const DENTAL = [
  { letter: 'त', roman: 'ta', hint: 'Tongue tip touches upper teeth (not the ridge)' },
  { letter: 'थ', roman: 'tha', hint: 'Aspirated dental — ta + puff of air' },
  { letter: 'द', roman: 'da', hint: 'Tongue touches upper teeth with voice' },
  { letter: 'ध', roman: 'dha', hint: 'Voiced aspirated dental — da + puff' },
  { letter: 'न', roman: 'na', hint: 'Nasal with tongue tip at upper teeth' },
];

type Pair = { letter: string; roman: string; hint: string };

export const Scene06_ConsonantsRetroflex: React.FC = () => {
  const [active, setActive] = useState<(Pair & { kind: 'r' | 'd' }) | null>(null);

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">
      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 06 · व्यंजन</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Retroflex vs<br /><span className="text-amber-500">Dental.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            This is the distinction that makes Marathi (and all Indian languages) unique. Both rows look like "t/d/n" to English ears — but the tongue position is completely different.
          </p>
        </div>

        {/* Retroflex row */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔁</span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-orange-600">Retroflex (मूर्धन्य)</p>
              <p className="text-xs text-slate-500">Tongue tip curls BACK and touches the roof of mouth</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {RETROFLEX.map((c, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActive(active?.letter === c.letter ? null : { ...c, kind: 'r' })}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                  active?.letter === c.letter
                    ? 'bg-orange-100 border-orange-400 shadow-sm'
                    : 'bg-white border-orange-200 hover:border-orange-300'
                }`}
              >
                <span className="text-2xl font-bold text-orange-700" style={{ fontFamily: 'serif' }}>{c.letter}</span>
                <span className="text-xs font-mono text-slate-500">{c.roman}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dental row */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🦷</span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-sky-600">Dental (दंत्य)</p>
              <p className="text-xs text-slate-500">Tongue tip touches TEETH — like European "t/d/n"</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {DENTAL.map((c, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActive(active?.letter === c.letter ? null : { ...c, kind: 'd' })}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                  active?.letter === c.letter
                    ? 'bg-sky-100 border-sky-400 shadow-sm'
                    : 'bg-white border-sky-200 hover:border-sky-300'
                }`}
              >
                <span className="text-2xl font-bold text-sky-700" style={{ fontFamily: 'serif' }}>{c.letter}</span>
                <span className="text-xs font-mono text-slate-500">{c.roman}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.letter}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className={`rounded-3xl border-2 p-6 flex flex-col items-center gap-4 ${
                active.kind === 'r'
                  ? 'bg-orange-50 border-orange-300'
                  : 'bg-sky-50 border-sky-300'
              }`}
            >
              <span
                className={`text-8xl font-bold ${active.kind === 'r' ? 'text-orange-600' : 'text-sky-600'}`}
                style={{ fontFamily: 'serif' }}
              >
                {active.letter}
              </span>
              <p className={`text-2xl font-black font-mono ${active.kind === 'r' ? 'text-orange-700' : 'text-sky-700'}`}>
                {active.roman}
              </p>
              <div className={`text-center px-4 py-2 rounded-xl ${active.kind === 'r' ? 'bg-orange-100' : 'bg-sky-100'}`}>
                <p className="text-sm text-slate-700 leading-relaxed">{active.hint}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${
                  active.kind === 'r' ? 'bg-orange-200 text-orange-700' : 'bg-sky-200 text-sky-700'
                }`}>
                  {active.kind === 'r' ? 'Retroflex · मूर्धन्य' : 'Dental · दंत्य'}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center gap-2 min-h-[200px]"
            >
              <span className="text-3xl">👆</span>
              <p className="text-sm text-slate-400 font-medium text-center">Click any consonant to see placement details</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <p className="text-xs font-extrabold text-amber-600 mb-1.5">Why it matters</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            In Marathi, <span className="font-bold" style={{ fontFamily: 'serif' }}>टोपी</span> (ṭopī, hat) and <span className="font-bold" style={{ fontFamily: 'serif' }}>तोंड</span> (toṃḍ, mouth) are different words because <span className="font-mono font-bold text-orange-600">ट</span> and <span className="font-mono font-bold text-sky-600">त</span> are different sounds. Native speakers hear the difference immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene06_ConsonantsRetroflex;
