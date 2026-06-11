import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  {
    emoji: '🔤',
    title: 'Vowels (स्वर)',
    tagline: '12 sounds, always consistent',
    desc: 'Three short/long pairs (अ/आ, इ/ई, उ/ऊ), two diphthong pairs (ए/ऐ, ओ/औ), and two special markers (anusvara ं, visarga ः).',
    preview: ['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','अं','अः'],
    color: 'border-amber-300 bg-amber-50',
    titleColor: 'text-amber-700',
  },
  {
    emoji: '🏗️',
    title: 'Consonants (व्यंजन)',
    tagline: '5 groups by articulation',
    desc: 'Organised by where sound is made: velar (क-घ), palatal (च-झ), retroflex (ट-ण), dental (त-न), labial (प-म), plus semi-vowels and sibilants.',
    preview: ['क','ग','च','ज','ट','त','प','म','य','र','ल','स'],
    color: 'border-sky-300 bg-sky-50',
    titleColor: 'text-sky-700',
  },
  {
    emoji: '🔗',
    title: 'Matras (मात्रा)',
    tagline: 'Vowels that attach to consonants',
    desc: 'Vowel symbols transform into matras when combined with consonants. ि is written before but pronounced after. ो and ौ wrap around the consonant on both sides.',
    preview: ['का','कि','की','कु','कू','के','कै','को','कौ','कं'],
    color: 'border-emerald-300 bg-emerald-50',
    titleColor: 'text-emerald-700',
  },
  {
    emoji: '🔀',
    title: 'Conjuncts (जोडाक्षरे)',
    tagline: 'Two consonants merging into one',
    desc: 'The halant (्) strips the inherent vowel from a consonant, allowing it to fuse with the next one. Common examples: क्ष, त्र, ज्ञ, श्र, प्र.',
    preview: ['क्ष','त्र','ज्ञ','श्र','प्र','न्त'],
    color: 'border-violet-300 bg-violet-50',
    titleColor: 'text-violet-700',
  },
];

export const Scene13_ChapterSummary: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Chapter 1 · Summary</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mt-2 leading-tight">
          Devanagari — <span className="text-amber-500">mastered.</span>
        </h2>
        <p className="text-slate-500 text-base mt-1">Click any card to expand.</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 overflow-hidden">
        {CARDS.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onClick={() => setActive(active === i ? null : i)}
            className={`flex flex-col gap-3 border-2 rounded-3xl p-5 cursor-pointer transition-all hover:shadow-lg ${c.color} ${active === i ? 'ring-4 ring-offset-2 ring-amber-400 shadow-xl' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{c.emoji}</span>
              <div>
                <p className={`font-extrabold text-base ${c.titleColor}`}>{c.title}</p>
                <p className="text-xs text-slate-500 font-medium">{c.tagline}</p>
              </div>
            </div>

            {/* Preview glyphs — always visible */}
            <div className="flex flex-wrap gap-1.5">
              {c.preview.map((g, gi) => (
                <span key={gi} className="text-xl font-bold text-slate-700" style={{ fontFamily: 'serif' }}>{g}</span>
              ))}
            </div>

            <motion.div
              animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
            </motion.div>

            {active !== i && (
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-1">{c.desc}</p>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-900 rounded-2xl px-8 py-4 font-mono text-sm border border-slate-800 text-center"
      >
        <span className="text-slate-500">The golden rule —</span>
        <span className="text-white ml-2">Devanagari is</span>
        <span className="text-amber-400 font-extrabold ml-2">phonetic.</span>
        <span className="text-sky-400 ml-2">What you see</span>
        <span className="text-slate-500 ml-1">is exactly what you say.</span>
      </motion.div>
    </div>
  );
};

export default Scene13_ChapterSummary;
