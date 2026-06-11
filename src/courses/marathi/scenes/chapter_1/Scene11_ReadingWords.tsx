import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type WordEntry = {
  word: string;
  roman: string;
  meaning: string;
  parts: { letter: string; roman: string }[];
};

const WORDS: WordEntry[] = [
  {
    word: 'नमस्कार', roman: 'namaskār', meaning: 'hello / greeting',
    parts: [
      { letter: 'न', roman: 'na' }, { letter: 'म', roman: 'ma' },
      { letter: 'स', roman: 'sa' }, { letter: 'का', roman: 'kā' },
      { letter: 'र', roman: 'r' },
    ],
  },
  {
    word: 'पाणी', roman: 'pāṇī', meaning: 'water',
    parts: [
      { letter: 'पा', roman: 'pā' }, { letter: 'णी', roman: 'ṇī' },
    ],
  },
  {
    word: 'घर', roman: 'ghar', meaning: 'house / home',
    parts: [
      { letter: 'घ', roman: 'gha' }, { letter: 'र', roman: 'r' },
    ],
  },
  {
    word: 'आई', roman: 'āī', meaning: 'mother',
    parts: [
      { letter: 'आ', roman: 'ā' }, { letter: 'ई', roman: 'ī' },
    ],
  },
  {
    word: 'मित्र', roman: 'mitra', meaning: 'friend',
    parts: [
      { letter: 'मि', roman: 'mi' }, { letter: 'त्र', roman: 'tra' },
    ],
  },
  {
    word: 'शाळा', roman: 'śāḷā', meaning: 'school',
    parts: [
      { letter: 'शा', roman: 'śā' }, { letter: 'ळा', roman: 'ḷā' },
    ],
  },
  {
    word: 'देश', roman: 'deś', meaning: 'country',
    parts: [
      { letter: 'दे', roman: 'de' }, { letter: 'श', roman: 'ś' },
    ],
  },
  {
    word: 'फूल', roman: 'phūl', meaning: 'flower',
    parts: [
      { letter: 'फू', roman: 'phū' }, { letter: 'ल', roman: 'l' },
    ],
  },
];

export const Scene11_ReadingWords: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  const selectWord = (i: number) => {
    setActive(i);
  };

  const w = active !== null ? WORDS[active] : null;

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">
      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 11 · शब्द</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Read real<br /><span className="text-amber-500">Marathi words.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            These 8 words appear in everyday Marathi. Click any word to see it broken down into its syllable components.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {WORDS.map((wd, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.96 }}
              onClick={() => selectWord(i)}
              className={`flex flex-col items-start gap-1 px-4 py-3 rounded-2xl border-2 cursor-pointer text-left transition-all ${
                active === i
                  ? 'bg-amber-50 border-amber-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-amber-200'
              }`}
            >
              <span className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'serif' }}>{wd.word}</span>
              <span className="text-xs font-mono text-slate-500">{wd.roman}</span>
              <span className="text-xs text-slate-400">{wd.meaning}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
        <AnimatePresence mode="wait">
          {w ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              {/* Full word */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl px-6 py-5 flex flex-col items-center gap-2">
                <span className="text-6xl font-black text-amber-600 leading-none" style={{ fontFamily: 'serif' }}>{w.word}</span>
                <span className="text-xl font-bold text-slate-600 font-mono">{w.roman}</span>
                <span className="text-sm text-slate-500 font-medium">{w.meaning}</span>
              </div>

              {/* Parts breakdown */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Syllable breakdown</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {w.parts.map((p, pi) => (
                    <React.Fragment key={pi}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: pi * 0.12, type: 'spring', stiffness: 280, damping: 20 }}
                        className="flex flex-col items-center gap-0.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2"
                      >
                        <span className="text-3xl font-bold text-amber-700" style={{ fontFamily: 'serif' }}>{p.letter}</span>
                        <span className="text-xs font-mono text-slate-500">{p.roman}</span>
                      </motion.div>
                      {pi < w.parts.length - 1 && (
                        <span className="text-slate-300 text-lg font-bold">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <span className="text-base shrink-0">📖</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every Marathi word is just a sequence of these syllables. Once you recognise the parts, the whole word becomes readable.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border-2 border-dashed border-slate-200 p-10 flex flex-col items-center justify-center gap-3"
            >
              <span className="text-4xl">👈</span>
              <p className="text-sm text-slate-400 font-medium text-center">Select a word to see its breakdown</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene11_ReadingWords;
