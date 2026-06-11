import React from 'react';
import { motion } from 'framer-motion';

const EXAMPLES = [
  { marathi: 'ज्ञानेश्वरी', roman: 'Dnyaneshwari', label: 'a 13th-century philosophical masterpiece', color: 'text-amber-400' },
  { marathi: 'माझं नाव…', roman: 'Māzhaṃ nāv…', label: 'how 95 million people say "My name is"', color: 'text-sky-400' },
  { marathi: 'पुणे', roman: 'Puṇe', label: 'the cultural capital of Maharashtra', color: 'text-emerald-400' },
  { marathi: 'गणपती बाप्पा मोरया', roman: 'Gaṇapatī Bāppā Morayā', label: 'the chant of Ganesh Chaturthi', color: 'text-violet-400' },
];

export const Scene01_WelcomeHook: React.FC = () => (
  <div className="h-full w-full flex flex-col items-center justify-center px-8 py-6 overflow-hidden relative">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-400/8 filter blur-[160px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-orange-400/6 filter blur-[120px]" />
    </div>

    <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-xs font-mono font-extrabold text-amber-600 uppercase tracking-widest">Chapter 1 · Marathi Fundamentals</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-center"
      >
        <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-800 leading-[1.05]">One script.</h1>
        <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-amber-500 leading-[1.05]">A world of meaning.</h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-slate-500 text-sm lg:text-base font-medium text-center max-w-md"
      >
        Marathi is spoken by 95 million people and written in Devanagari — a phonetic script where every symbol makes exactly one sound.
      </motion.p>

      <div className="flex flex-col gap-2.5 w-full">
        {EXAMPLES.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + idx * 0.18, duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-between gap-6 bg-slate-900 rounded-2xl px-5 py-3 border border-slate-800"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className={`font-bold text-xl lg:text-2xl shrink-0 ${item.color}`} style={{ fontFamily: 'serif' }}>{item.marathi}</span>
              <span className="text-slate-500 text-xs font-mono hidden sm:block">{item.roman}</span>
            </div>
            <span className="text-slate-500 text-xs font-medium shrink-0 hidden sm:block text-right max-w-[180px]">→ {item.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="text-slate-400 text-xs font-medium text-center"
      >
        Start with the script — and everything else will follow.
      </motion.p>
    </div>
  </div>
);

export default Scene01_WelcomeHook;
