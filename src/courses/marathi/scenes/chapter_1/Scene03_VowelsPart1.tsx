import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speakMarathi } from '../../utils/speech';

const VOWELS = [
  {
    letter: 'अ', roman: 'a', name: 'a (short)',
    sound: 'Like "u" in "about" or "a" in "sofa"',
    example: { word: 'अमर', roman: 'amar', meaning: 'immortal' },
    tip: 'The most common vowel in Marathi. Every consonant has this sound built in.',
  },
  {
    letter: 'आ', roman: 'ā', name: 'aa (long)',
    sound: 'Like "a" in "father" — held twice as long as अ',
    example: { word: 'आई', roman: 'āī', meaning: 'mother' },
    tip: 'The horizontal stroke ā tells you to stretch the sound.',
  },
  {
    letter: 'इ', roman: 'i', name: 'i (short)',
    sound: 'Like "i" in "sit" — short and crisp',
    example: { word: 'इथे', roman: 'ithe', meaning: 'here' },
    tip: 'Short. Don\'t hold it — keep it quick and light.',
  },
  {
    letter: 'ई', roman: 'ī', name: 'ee (long)',
    sound: 'Like "ee" in "see" — full and sustained',
    example: { word: 'ईश्वर', roman: 'īśvar', meaning: 'God/Lord' },
    tip: 'The longer tail signals a longer sound.',
  },
  {
    letter: 'उ', roman: 'u', name: 'u (short)',
    sound: 'Like "u" in "put" — lips rounded, sound short',
    example: { word: 'उद्या', roman: 'udyā', meaning: 'tomorrow' },
    tip: 'Round your lips and keep it brief.',
  },
  {
    letter: 'ऊ', roman: 'ū', name: 'oo (long)',
    sound: 'Like "oo" in "pool" — full round vowel',
    example: { word: 'ऊन', roman: 'ūn', meaning: 'wool / sunshine' },
    tip: 'Same shape as उ but with an extra hook — longer sound.',
  },
];

export const Scene03_VowelsPart1: React.FC = () => {
  const [active, setActive] = useState(0);
  const v = VOWELS[active];

  // Auto-speak vowel when selected
  useEffect(() => {
    speakMarathi(v.letter).catch(() => {});
  }, [active]);

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">
      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 03 · स्वर</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Vowels — <span className="text-amber-500">Part 1</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            Marathi has 12 vowels. The first 6 are the foundation — three short/long pairs. Click each to explore and hear pronunciation.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {VOWELS.map((v, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-3 px-2 border-2 transition-all cursor-pointer ${
                active === i
                  ? 'bg-amber-50 border-amber-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-amber-200'
              }`}
            >
              <span className="text-3xl font-bold text-amber-600 animate-pulse-slow" style={{ fontFamily: 'serif' }}>{v.letter}</span>
              <span className="text-xs font-mono text-slate-500">{v.roman}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div 
              onClick={() => speakMarathi(v.letter).catch(() => {})}
              className="flex items-center gap-5 bg-amber-50 border-2 border-amber-300 rounded-3xl px-6 py-5 cursor-pointer hover:bg-amber-100/50 active:scale-[0.99] transition-all group"
            >
              <span className="text-7xl lg:text-8xl font-bold text-amber-600 shrink-0" style={{ fontFamily: 'serif' }}>{v.letter}</span>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  {v.roman}
                  <Volume2 size={18} className="text-amber-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-sm font-semibold text-amber-600 mt-0.5">{v.name}</p>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{v.sound}</p>
              </div>
            </div>

            <div 
              onClick={() => speakMarathi(v.example.word).catch(() => {})}
              className="bg-white border border-slate-200 rounded-2xl px-5 py-4 cursor-pointer hover:border-amber-300 active:scale-[0.99] transition-all group"
            >
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                Example word (Click to hear)
                <Volume2 size={12} className="text-slate-400 group-hover:text-amber-500" />
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'serif' }}>{v.example.word}</span>
                <span className="text-base font-mono text-slate-500">{v.example.roman}</span>
                <span className="text-sm text-slate-400">— {v.example.meaning}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
              <span className="text-lg shrink-0">💡</span>
              <p className="text-sm text-slate-600 leading-relaxed">{v.tip}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene03_VowelsPart1;
