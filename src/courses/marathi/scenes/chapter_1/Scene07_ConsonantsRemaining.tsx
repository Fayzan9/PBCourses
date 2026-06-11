import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GROUPS = [
  {
    name: 'Labials (ओष्ठ्य)',
    desc: 'Made with the lips',
    color: 'border-emerald-200 bg-emerald-50',
    activeColor: 'border-emerald-400 bg-emerald-100',
    textColor: 'text-emerald-700',
    letters: [
      { letter: 'प', roman: 'pa', note: 'Unvoiced, like "p" in "pot"' },
      { letter: 'फ', roman: 'pha', note: 'Aspirated "p" — lips + puff of air' },
      { letter: 'ब', roman: 'ba', note: 'Voiced, like "b" in "bat"' },
      { letter: 'भ', roman: 'bha', note: 'Voiced aspirated — "bh" in "abhor"' },
      { letter: 'म', roman: 'ma', note: 'Nasal labial — lips closed, voice through nose' },
    ],
  },
  {
    name: 'Semi-vowels (अंतस्थ)',
    desc: 'Between vowels and consonants',
    color: 'border-violet-200 bg-violet-50',
    activeColor: 'border-violet-400 bg-violet-100',
    textColor: 'text-violet-700',
    letters: [
      { letter: 'य', roman: 'ya', note: 'Like "y" in "yes"' },
      { letter: 'र', roman: 'ra', note: 'A tapped/flapped "r" — tongue tip briefly touches ridge' },
      { letter: 'ल', roman: 'la', note: 'Like "l" in "love" — tongue on ridge' },
      { letter: 'व', roman: 'va', note: 'Between "v" and "w" — light lip-teeth contact' },
    ],
  },
  {
    name: 'Sibilants & Aspirate (ऊष्म)',
    desc: 'Fricative and breathy sounds',
    color: 'border-rose-200 bg-rose-50',
    activeColor: 'border-rose-400 bg-rose-100',
    textColor: 'text-rose-700',
    letters: [
      { letter: 'श', roman: 'śa', note: 'Palatal sibilant — like "sh" in "shoe"' },
      { letter: 'ष', roman: 'ṣa', note: 'Retroflex sibilant — "sh" with tongue curled back (rare in spoken Marathi)' },
      { letter: 'स', roman: 'sa', note: 'Dental sibilant — like "s" in "sun"' },
      { letter: 'ह', roman: 'ha', note: 'Aspirate — like "h" in "hat", voiced' },
    ],
  },
];

type Letter = { letter: string; roman: string; note: string };

export const Scene07_ConsonantsRemaining: React.FC = () => {
  const [active, setActive] = useState<(Letter & { color: string; textColor: string }) | null>(null);

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">
      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 07 · व्यंजन</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            The remaining<br /><span className="text-amber-500">consonants.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            Three more groups complete the Marathi consonant set — labials (lips), semi-vowels, and sibilants. Click any letter to explore it.
          </p>
        </div>

        {GROUPS.map((g, gi) => (
          <div key={gi} className={`border rounded-2xl p-3 ${g.color}`}>
            <p className={`text-xs font-extrabold uppercase tracking-wider mb-2 ${g.textColor}`}>{g.name} — {g.desc}</p>
            <div className="flex gap-2 flex-wrap">
              {g.letters.map((c, ci) => (
                <motion.button
                  key={ci}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setActive(active?.letter === c.letter ? null : { ...c, color: g.activeColor, textColor: g.textColor })}
                  className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl border-2 cursor-pointer transition-all ${
                    active?.letter === c.letter ? g.activeColor + ' shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className={`text-2xl font-bold ${active?.letter === c.letter ? g.textColor : 'text-slate-800'}`} style={{ fontFamily: 'serif' }}>{c.letter}</span>
                  <span className="text-xs font-mono text-slate-500">{c.roman}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
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
              className={`rounded-3xl border-2 p-6 flex flex-col items-center gap-4 ${active.color}`}
            >
              <span className={`text-8xl font-bold ${active.textColor}`} style={{ fontFamily: 'serif' }}>{active.letter}</span>
              <p className={`text-2xl font-black font-mono ${active.textColor}`}>{active.roman}</p>
              <p className="text-sm text-slate-700 text-center leading-relaxed px-2">{active.note}</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center gap-2 min-h-[200px]"
            >
              <span className="text-3xl">👆</span>
              <p className="text-sm text-slate-400 font-medium text-center">Click any letter to learn it</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-slate-900 rounded-2xl px-5 py-4">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Full consonant inventory</p>
          <div className="flex flex-wrap gap-2">
            {['क','ख','ग','घ','च','छ','ज','झ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'].map((l, i) => (
              <span key={i} className="text-lg text-amber-400 font-bold" style={{ fontFamily: 'serif' }}>{l}</span>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">31 core consonants — you now know all of them.</p>
        </div>
      </div>
    </div>
  );
};

export default Scene07_ConsonantsRemaining;
