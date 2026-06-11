import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speakMarathi } from '../../utils/speech';

const VOWELS = [
  {
    letter: 'ए', roman: 'e', name: 'e',
    sound: 'Like "a" in "say" — a mid-front vowel',
    example: { word: 'एक', roman: 'ek', meaning: 'one' },
    tip: 'Pure vowel — don\'t diphthong it like "ei". Hold it steady.',
    color: 'border-sky-300 bg-sky-50 text-sky-600',
  },
  {
    letter: 'ऐ', roman: 'ai', name: 'ai',
    sound: 'Like "ai" in "aisle" — a broad open diphthong',
    example: { word: 'ऐका', roman: 'aikā', meaning: 'listen!' },
    tip: 'Wider open mouth than ए. Starts low, glides up.',
    color: 'border-sky-300 bg-sky-50 text-sky-600',
  },
  {
    letter: 'ओ', roman: 'o', name: 'o',
    sound: 'Like "o" in "go" — round lips, steady sound',
    example: { word: 'ओठ', roman: 'oṭh', meaning: 'lip' },
    tip: 'Keep lips rounded. Don\'t let it slide into "ow".',
    color: 'border-emerald-300 bg-emerald-50 text-emerald-600',
  },
  {
    letter: 'औ', roman: 'au', name: 'au',
    sound: 'Like "au" in "caught" or "ow" in "cow"',
    example: { word: 'औषध', roman: 'auṣadh', meaning: 'medicine' },
    tip: 'Wider and more open than ओ. Jaw drops more.',
    color: 'border-emerald-300 bg-emerald-50 text-emerald-600',
  },
  {
    letter: 'अं', roman: 'aṃ', name: 'anusvara',
    sound: 'A nasal resonance — like humming "m" or "n" at end of syllable',
    example: { word: 'संत', roman: 'saṃt', meaning: 'saint' },
    tip: 'The dot above (ं) nasalises the preceding vowel. Very common in Marathi.',
    color: 'border-violet-300 bg-violet-50 text-violet-600',
  },
  {
    letter: 'अः', roman: 'aḥ', name: 'visarga',
    sound: 'A soft breathy "h" sound at the end of a syllable',
    example: { word: 'नमः', roman: 'namaḥ', meaning: 'I bow (in prayer)' },
    tip: 'Rare in everyday Marathi, common in Sanskrit-origin words and prayers.',
    color: 'border-violet-300 bg-violet-50 text-violet-600',
  },
];

export const Scene04_VowelsPart2: React.FC = () => {
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
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 04 · स्वर</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Vowels — <span className="text-amber-500">Part 2</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            The remaining 6 vowels — two diphthongs, two more open sounds, and two special markers. Click to listen.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {VOWELS.map((vw, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-3 px-2 border-2 transition-all cursor-pointer ${
                active === i
                  ? `${vw.color.split(' ')[1]} ${vw.color.split(' ')[0]} shadow-sm`
                  : 'bg-white border-slate-200 hover:border-amber-200'
              }`}
            >
              <span
                className={`text-3xl font-bold ${active === i ? vw.color.split(' ')[2] : 'text-slate-700'}`}
                style={{ fontFamily: 'serif' }}
              >
                {vw.letter}
              </span>
              <span className="text-xs font-mono text-slate-500">{vw.roman}</span>
            </button>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <p className="text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-1">Complete vowel set</p>
          <div className="flex flex-wrap gap-2">
            {['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','अं','अः'].map((l, i) => (
              <span key={i} className="text-lg text-amber-700 font-bold" style={{ fontFamily: 'serif' }}>{l}</span>
            ))}
          </div>
          <p className="text-xs text-amber-600 mt-2">12 vowels total — you now know all of them.</p>
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
              className={`flex items-center gap-5 border-2 rounded-3xl px-6 py-5 cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all group ${v.color.split(' ').slice(0, 2).join(' ')}`}
            >
              <span className={`text-7xl lg:text-8xl font-bold shrink-0 ${v.color.split(' ')[2]}`} style={{ fontFamily: 'serif' }}>{v.letter}</span>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  {v.roman}
                  <Volume2 size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className={`text-sm font-semibold mt-0.5 ${v.color.split(' ')[2]}`}>{v.name}</p>
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

export default Scene04_VowelsPart2;
