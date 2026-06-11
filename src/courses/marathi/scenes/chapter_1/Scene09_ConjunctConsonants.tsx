import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONJUNCTS = [
  {
    parts: ['क', '्', 'ष'],
    result: 'क्ष',
    roman: 'kṣa',
    meaning: 'Appears in लक्ष्य (lakṣya — goal/target), क्षण (kṣaṇ — moment)',
    tip: 'k + silent marker + ṣ → merged into one glyph',
  },
  {
    parts: ['त', '्', 'र'],
    result: 'त्र',
    roman: 'tra',
    meaning: 'Appears in मित्र (mitra — friend), त्रास (trās — trouble)',
    tip: 'ta drops its inherent vowel via halant, merges with ra',
  },
  {
    parts: ['ज', '्', 'ञ'],
    result: 'ज्ञ',
    roman: 'jña',
    meaning: 'Appears in ज्ञान (jñān — knowledge), आज्ञा (ājñā — order)',
    tip: 'Often pronounced "dnya" in Marathi spoken form',
  },
  {
    parts: ['श', '्', 'र'],
    result: 'श्र',
    roman: 'śra',
    meaning: 'Appears in श्री (śrī — honorific), श्रम (śram — effort)',
    tip: 'ś loses its vowel, ra hangs as a diagonal stroke below',
  },
  {
    parts: ['प', '्', 'र'],
    result: 'प्र',
    roman: 'pra',
    meaning: 'Appears in प्रश्न (praśna — question), प्रेम (prem — love)',
    tip: 'Very common prefix cluster in Marathi and Sanskrit words',
  },
  {
    parts: ['न', '्', 'त'],
    result: 'न्त',
    roman: 'nta',
    meaning: 'Appears in संत (sant — saint), शांत (śānt — calm)',
    tip: 'na drops its head when followed by ta — a half-form merge',
  },
];

export const Scene09_ConjunctConsonants: React.FC = () => {
  const [active, setActive] = useState(0);
  const c = CONJUNCTS[active];

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">
      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 09 · जोडाक्षरे</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Conjunct<br /><span className="text-amber-500">Consonants.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            When two consonants sit together with no vowel between them, they merge into a single <span className="font-bold text-slate-700">conjunct</span> glyph. The key is the <span className="font-mono font-bold text-amber-600">halant (्)</span> — it removes a consonant's inherent "a" sound.
          </p>
        </div>

        {/* Halant explainer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <p className="text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-1.5">The Halant (विराम)</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'serif' }}>क</span>
            <span className="text-slate-400 text-sm">has inherent "a" → sounds like "ka"</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-3xl font-bold text-amber-600" style={{ fontFamily: 'serif' }}>क्</span>
            <span className="text-slate-500 text-sm">halant removes the "a" → sounds like bare "k"</span>
          </div>
        </div>

        {/* Conjunct grid */}
        <div className="grid grid-cols-3 gap-2">
          {CONJUNCTS.map((cj, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1 py-3 rounded-2xl border-2 cursor-pointer transition-all ${
                active === i
                  ? 'bg-amber-50 border-amber-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-amber-200'
              }`}
            >
              <span className="text-2xl font-bold text-amber-700" style={{ fontFamily: 'serif' }}>{cj.result}</span>
              <span className="text-xs font-mono text-slate-500">{cj.roman}</span>
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
            {/* Step-by-step merge */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4 text-center">How it merges</p>
              <div className="flex items-center justify-center gap-3">
                {c.parts.map((p, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`text-4xl font-bold ${p === '्' ? 'text-rose-400' : 'text-slate-700'}`}
                        style={{ fontFamily: 'serif' }}
                      >
                        {p}
                      </span>
                      {p === '्' && <span className="text-[10px] text-rose-400 font-mono">halant</span>}
                    </div>
                    {i < c.parts.length - 1 && <span className="text-slate-300 text-xl font-bold">+</span>}
                  </React.Fragment>
                ))}
                <span className="text-slate-300 text-xl font-bold mx-1">=</span>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-5xl font-black text-amber-600" style={{ fontFamily: 'serif' }}>{c.result}</span>
                  <span className="text-xs font-mono text-amber-600 font-bold">{c.roman}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-1.5">Where you'll see it</p>
              <p className="text-sm text-slate-700 leading-relaxed">{c.meaning}</p>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
              <span className="text-lg shrink-0">💡</span>
              <p className="text-sm text-slate-600 leading-relaxed">{c.tip}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene09_ConjunctConsonants;
