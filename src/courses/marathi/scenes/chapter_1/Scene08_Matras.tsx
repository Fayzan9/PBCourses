import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BASE = 'क';

const MATRAS = [
  { matra: '',   result: 'क',  roman: 'ka',  name: 'inherent a', desc: 'No matra needed — every consonant already has an inherent "a" sound.' },
  { matra: 'ा', result: 'का', roman: 'kā',  name: 'ā matra',    desc: 'The long "aa" stroke placed after the consonant.' },
  { matra: 'ि', result: 'कि', roman: 'ki',  name: 'i matra',    desc: 'Placed visually BEFORE the consonant, but pronounced after it.' },
  { matra: 'ी', result: 'की', roman: 'kī',  name: 'ī matra',    desc: 'The long "ee" flag on the right of the consonant.' },
  { matra: 'ु', result: 'कु', roman: 'ku',  name: 'u matra',    desc: 'Hangs below the consonant like a small hook.' },
  { matra: 'ू', result: 'कू', roman: 'kū',  name: 'ū matra',    desc: 'A larger hook below — same position as ु but longer sound.' },
  { matra: 'े', result: 'के', roman: 'ke',  name: 'e matra',    desc: 'A stroke above-right of the consonant.' },
  { matra: 'ै', result: 'कै', roman: 'kai', name: 'ai matra',   desc: 'Two strokes above-right — wider, open sound.' },
  { matra: 'ो', result: 'को', roman: 'ko',  name: 'o matra',    desc: 'ā + e combined — wraps around both sides of the consonant.' },
  { matra: 'ौ', result: 'कौ', roman: 'kau', name: 'au matra',   desc: 'ā + ai combined — similar visual to ो but with doubled top stroke.' },
  { matra: 'ं', result: 'कं', roman: 'kaṃ', name: 'anusvara',   desc: 'A dot above — nasalises the vowel sound.' },
  { matra: 'ः', result: 'कः', roman: 'kaḥ', name: 'visarga',    desc: 'Two dots after — a breathy "h" echo (common in Sanskrit-origin words).' },
];

export const Scene08_Matras: React.FC = () => {
  const [active, setActive] = useState(0);
  const m = MATRAS[active];

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">
      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 08 · मात्रा</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Matras —<br /><span className="text-amber-500">vowels attach.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            Standalone vowels become <span className="font-bold text-slate-700">matra</span> symbols when attached to a consonant. One base consonant + one matra = one syllable. Click each matra to see it in action.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {MATRAS.map((mt, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-0.5 py-2.5 px-1 rounded-xl border-2 cursor-pointer transition-all ${
                active === i
                  ? 'bg-amber-50 border-amber-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-amber-200'
              }`}
            >
              <span className="text-xl font-bold text-amber-600" style={{ fontFamily: 'serif' }}>{mt.result}</span>
              <span className="text-[10px] font-mono text-slate-500">{mt.roman}</span>
            </motion.button>
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
            {/* Visual composition */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center gap-4 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Composition</p>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-slate-100 rounded-xl px-4 py-3 border border-slate-200">
                    <span className="text-4xl font-bold text-slate-600" style={{ fontFamily: 'serif' }}>{BASE}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">base</span>
                </div>

                <span className="text-2xl text-slate-300 font-bold">+</span>

                <div className="flex flex-col items-center gap-1">
                  <div className="bg-amber-50 rounded-xl px-4 py-3 border-2 border-amber-200 min-w-[64px] text-center">
                    <span className="text-4xl font-bold text-amber-500" style={{ fontFamily: 'serif' }}>
                      {m.matra || '∅'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{m.name}</span>
                </div>

                <span className="text-2xl text-slate-300 font-bold">=</span>

                <div className="flex flex-col items-center gap-1">
                  <div className="bg-amber-500 rounded-xl px-4 py-3 border-2 border-amber-600 shadow-lg">
                    <span className="text-4xl font-black text-white" style={{ fontFamily: 'serif' }}>{m.result}</span>
                  </div>
                  <span className="text-xs text-amber-600 font-mono font-bold">{m.roman}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-1.5">{m.name}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{m.desc}</p>
            </div>

            {active === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3"
              >
                <span className="text-base shrink-0">⚠️</span>
                <p className="text-xs text-rose-700 leading-relaxed">
                  The <span className="font-mono font-bold">ि</span> matra is written before the consonant but pronounced after. This is one of the quirks of Devanagari — your eyes read ahead while your mouth follows the logic.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene08_Matras;
