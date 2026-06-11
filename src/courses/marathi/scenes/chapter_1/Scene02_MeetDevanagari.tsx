import React from 'react';
import { motion } from 'framer-motion';

const CHAOS = [
  { en: 'though',   pron: '/θoʊ/' },
  { en: 'through',  pron: '/θruː/' },
  { en: 'tough',    pron: '/tʌf/' },
  { en: 'thought',  pron: '/θɔːt/' },
];

const RULES = [
  { icon: '🔤', title: 'One symbol → one sound', desc: 'No silent letters. No spelling exceptions. क is always "ka".' },
  { icon: '📐', title: 'Phonetic by design', desc: 'Devanagari was engineered for Indian sounds — every phoneme has its own symbol.' },
  { icon: '🎯', title: 'Read on day one', desc: 'Once you learn the 48 core symbols, you can sound out any Marathi word.' },
];

export const Scene02_MeetDevanagari: React.FC = () => (
  <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">
    {/* Left */}
    <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 02</span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          Meet<br /><span className="text-amber-500">Devanagari.</span>
        </h2>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
          Unlike English, where the same letters can sound completely different, Devanagari is <span className="font-bold text-slate-700">strictly phonetic</span> — the script you see is the sound you make.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {RULES.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="flex items-start gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm"
          >
            <span className="text-xl shrink-0 mt-0.5">{r.icon}</span>
            <div>
              <p className="font-extrabold text-slate-800 text-sm">{r.title}</p>
              <p className="text-slate-500 text-xs mt-0.5 leading-snug">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Right */}
    <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
      <div className="bg-rose-50 border border-rose-200 rounded-2xl px-5 py-4">
        <p className="text-xs font-extrabold uppercase tracking-wider text-rose-500 mb-3">English — same letters, different sounds</p>
        <div className="flex flex-col gap-1.5">
          {CHAOS.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-bold text-slate-800 text-base w-16">{item.en}</span>
              <span className="font-mono text-rose-400 text-sm">{item.pron}</span>
              <span className="text-slate-400 text-xs">— "ough" sounds different every time</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-300 rounded-2xl px-5 py-4">
        <p className="text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-3">Devanagari — one symbol, one sound. Always.</p>
        <div className="grid grid-cols-4 gap-2">
          {['क', 'ख', 'ग', 'घ', 'च', 'ज', 'त', 'द'].map((letter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              className="flex flex-col items-center gap-0.5 bg-white border border-amber-200 rounded-xl py-2 px-1"
            >
              <span className="text-2xl text-amber-600 font-bold" style={{ fontFamily: 'serif' }}>{letter}</span>
              <span className="text-xs text-slate-400 font-mono">
                {['ka','kha','ga','gha','ca','ja','ta','da'][i]}
              </span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-amber-700 mt-3 font-medium">Each character always makes exactly this sound — no exceptions.</p>
      </div>
    </div>
  </div>
);

export default Scene02_MeetDevanagari;
