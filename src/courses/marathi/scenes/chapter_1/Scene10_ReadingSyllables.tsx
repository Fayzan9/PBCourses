import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONSONANTS = [
  { letter: 'क', roman: 'k' }, { letter: 'ग', roman: 'g' }, { letter: 'च', roman: 'c' },
  { letter: 'ज', roman: 'j' }, { letter: 'त', roman: 't' }, { letter: 'द', roman: 'd' },
  { letter: 'न', roman: 'n' }, { letter: 'प', roman: 'p' }, { letter: 'ब', roman: 'b' },
  { letter: 'म', roman: 'm' }, { letter: 'य', roman: 'y' }, { letter: 'र', roman: 'r' },
  { letter: 'ल', roman: 'l' }, { letter: 'व', roman: 'v' }, { letter: 'स', roman: 's' },
  { letter: 'ह', roman: 'h' }, { letter: 'श', roman: 'ś' }, { letter: 'ट', roman: 'ṭ' },
];

const MATRAS = [
  { matra: '',   roman: 'a',   name: '(inherent a)' },
  { matra: 'ा', roman: 'ā',   name: 'ā' },
  { matra: 'ि', roman: 'i',   name: 'i' },
  { matra: 'ी', roman: 'ī',   name: 'ī' },
  { matra: 'ु', roman: 'u',   name: 'u' },
  { matra: 'ू', roman: 'ū',   name: 'ū' },
  { matra: 'े', roman: 'e',   name: 'e' },
  { matra: 'ै', roman: 'ai',  name: 'ai' },
  { matra: 'ो', roman: 'o',   name: 'o' },
  { matra: 'ौ', roman: 'au',  name: 'au' },
];

export const Scene10_ReadingSyllables: React.FC = () => {
  const [selCons, setSelCons] = useState(0);
  const [selMatra, setSelMatra] = useState(0);

  const cons = CONSONANTS[selCons];
  const matra = MATRAS[selMatra];
  const syllable = cons.letter + matra.matra;
  const syllableRoman = cons.roman + matra.roman;

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-4 overflow-hidden">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 10 · Interactive</span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          Build a <span className="text-amber-500">syllable.</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1 leading-relaxed">
          Pick a consonant + a matra to assemble any Marathi syllable in real time.
        </p>
      </div>

      <div className="flex flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Consonants */}
        <div className="flex flex-col gap-2 w-[260px] shrink-0">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">1 · Choose consonant</p>
          <div className="grid grid-cols-6 gap-1.5 overflow-auto">
            {CONSONANTS.map((c, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelCons(i)}
                className={`flex flex-col items-center py-1.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selCons === i
                    ? 'bg-amber-50 border-amber-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-amber-200'
                }`}
              >
                <span className="text-xl font-bold text-slate-800" style={{ fontFamily: 'serif' }}>{c.letter}</span>
              </motion.button>
            ))}
          </div>

          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mt-2">2 · Choose matra</p>
          <div className="grid grid-cols-5 gap-1.5">
            {MATRAS.map((mt, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelMatra(i)}
                className={`flex flex-col items-center py-2 rounded-xl border-2 cursor-pointer transition-all ${
                  selMatra === i
                    ? 'bg-amber-50 border-amber-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-amber-200'
                }`}
              >
                <span className="text-base font-bold text-amber-600" style={{ fontFamily: 'serif' }}>
                  {mt.matra ? 'क' + mt.matra : 'क'}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{mt.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={syllable}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="flex flex-col items-center gap-3 bg-amber-50 border-2 border-amber-300 rounded-3xl px-12 py-8 shadow-lg"
            >
              <span className="text-8xl lg:text-9xl font-black text-amber-600 leading-none" style={{ fontFamily: 'serif' }}>{syllable}</span>
              <span className="text-3xl font-black text-slate-700 font-mono">{syllableRoman}</span>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-3">
            <div className="flex flex-col items-center">
              <span className="text-3xl text-slate-600 font-bold" style={{ fontFamily: 'serif' }}>{cons.letter}</span>
              <span className="text-xs font-mono text-slate-400">{cons.roman}</span>
            </div>
            <span className="text-slate-300 text-xl">+</span>
            <div className="flex flex-col items-center min-w-[40px]">
              <span className="text-3xl text-amber-500 font-bold" style={{ fontFamily: 'serif' }}>
                {matra.matra ? 'क' + matra.matra : '∅'}
              </span>
              <span className="text-xs font-mono text-slate-400">{matra.name}</span>
            </div>
            <span className="text-slate-300 text-xl">=</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl text-amber-600 font-black" style={{ fontFamily: 'serif' }}>{syllable}</span>
              <span className="text-xs font-mono text-amber-600 font-bold">{syllableRoman}</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-medium text-center max-w-[200px]">
            You can build every syllable in Marathi with this combination system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene10_ReadingSyllables;
