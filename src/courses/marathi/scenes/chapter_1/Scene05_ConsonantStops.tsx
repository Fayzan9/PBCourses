import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speakMarathi } from '../../utils/speech';

type Pair = { letter: string; roman: string; type: string };

type Row = {
  place: string;
  placeRoman: string;
  pairs: Pair[];
};

const ROWS: Row[] = [
  {
    place: 'कण्ठ्य', placeRoman: 'Velar — back of throat',
    pairs: [
      { letter: 'क', roman: 'ka', type: 'unvoiced' },
      { letter: 'ख', roman: 'kha', type: 'unvoiced aspirated' },
      { letter: 'ग', roman: 'ga', type: 'voiced' },
      { letter: 'घ', roman: 'gha', type: 'voiced aspirated' },
    ],
  },
  {
    place: 'तालव्य', placeRoman: 'Palatal — middle of mouth',
    pairs: [
      { letter: 'च', roman: 'ca', type: 'unvoiced' },
      { letter: 'छ', roman: 'cha', type: 'unvoiced aspirated' },
      { letter: 'ज', roman: 'ja', type: 'voiced' },
      { letter: 'झ', roman: 'jha', type: 'voiced aspirated' },
    ],
  },
];

const TYPE_COLORS: Record<string, string> = {
  'unvoiced': 'bg-slate-100 border-slate-300 text-slate-700',
  'unvoiced aspirated': 'bg-sky-50 border-sky-300 text-sky-700',
  'voiced': 'bg-emerald-50 border-emerald-300 text-emerald-700',
  'voiced aspirated': 'bg-violet-50 border-violet-300 text-violet-700',
};

const LEGEND = [
  { type: 'unvoiced', label: 'Unvoiced', desc: 'No vocal cord vibration (like "k" in "kite")' },
  { type: 'unvoiced aspirated', label: 'Aspirated', desc: 'Unvoiced + a puff of air (like "k" in "kind")' },
  { type: 'voiced', label: 'Voiced', desc: 'Vocal cords vibrate (like "g" in "go")' },
  { type: 'voiced aspirated', label: 'Voiced + Aspirated', desc: 'Voiced + puff of air — unique to Indian languages!' },
];

export const Scene05_ConsonantStops: React.FC = () => {
  const [active, setActive] = useState<Pair | null>(null);

  // Auto-speak consonant when selected
  useEffect(() => {
    if (active) {
      speakMarathi(active.letter).catch(() => {});
    }
  }, [active]);

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">
      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 05 · व्यंजन</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Stop<br /><span className="text-amber-500">Consonants.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            Marathi consonants follow a precise grid — organised by mouth position and airflow. Click any letter to listen.
          </p>
        </div>

        {ROWS.map((row, ri) => (
          <div key={ri} className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-base font-bold text-slate-700" style={{ fontFamily: 'serif' }}>{row.place}</span>
              <span className="text-xs text-slate-400 font-mono">{row.placeRoman}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {row.pairs.map((p, pi) => (
                <motion.button
                  key={pi}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActive(active?.letter === p.letter ? null : p)}
                  className={`flex flex-col items-center gap-1 rounded-xl py-2.5 border-2 cursor-pointer transition-all ${
                    active?.letter === p.letter
                      ? TYPE_COLORS[p.type] + ' shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <span className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'serif' }}>{p.letter}</span>
                  <span className="text-xs font-mono text-slate-500">{p.roman}</span>
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
              onClick={() => speakMarathi(active.letter).catch(() => {})}
              className={`rounded-3xl border-2 p-6 flex flex-col items-center gap-3 cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all group ${TYPE_COLORS[active.type]}`}
            >
              <div className="relative">
                <span className="text-8xl font-bold" style={{ fontFamily: 'serif' }}>{active.letter}</span>
                <Volume2 size={24} className="absolute -top-1 -right-6 opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-2xl font-black text-slate-800 font-mono">{active.roman}</p>
              <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${TYPE_COLORS[active.type]}`}>
                {active.type}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center gap-2 min-h-[160px]"
            >
              <span className="text-3xl animate-bounce">👆</span>
              <p className="text-sm text-slate-400 font-medium text-center">Click any letter to see and hear it up close</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">The four consonant types</p>
          <div className="flex flex-col gap-2">
            {LEGEND.map((l) => (
              <div key={l.type} className="flex items-start gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md border shrink-0 ${TYPE_COLORS[l.type]}`}>{l.label}</span>
                <span className="text-xs text-slate-500 leading-snug">{l.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene05_ConsonantStops;
