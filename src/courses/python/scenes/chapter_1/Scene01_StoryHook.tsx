import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTERVIEW_LINES = [
  { text: '$ python interview_prep.py', color: 'text-slate-500', delay: 0.0 },
  { text: 'Interviewer: "What is a variable?"', color: 'text-slate-300', delay: 350.0 },
  { text: 'Maya: "..."', color: 'text-rose-400', delay: 800.0 },
  { text: 'Interviewer: "Take your time."', color: 'text-slate-300', delay: 1300.0 },
  { text: 'Maya: "..."', color: 'text-rose-400', delay: 1800.0 },
  { text: 'Result: Not selected.', color: 'text-rose-400 font-bold', delay: 2300.0 },
];

const RESTART_LINES = [
  { text: '$ mkdir day_1', color: 'text-slate-500', delay: 150.0 },
  { text: '$ touch main.py', color: 'text-slate-500', delay: 350.0 },
  { text: '$ python main.py', color: 'text-slate-500', delay: 550.0 },
  { text: '# This time will be different.', color: 'text-amber-400', delay: 850.0 },
];

function TypingLine({ text, color, startDelay }: { text: string; color: string; startDelay: number }) {
  const [visible, setVisible] = useState(false);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!visible || chars >= text.length) return;
    const t = setTimeout(() => setChars(c => c + 1), 26);
    return () => clearTimeout(t);
  }, [visible, chars, text]);

  if (!visible) return null;
  return (
    <div className={`font-mono text-sm leading-6 ${color}`}>
      {text.slice(0, chars)}
      {chars < text.length && <span className="animate-pulse opacity-70">▋</span>}
    </div>
  );
}

export const Scene01_StoryHook: React.FC = () => {
  const [showRestart, setShowRestart] = useState(false);
  const [showResolve, setShowResolve] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowRestart(true), 6800);
    const t2 = setTimeout(() => setShowResolve(true), 8200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row px-8 py-6 gap-8 overflow-hidden">

      {/* Left — narrative */}
      <div className="flex-1 flex flex-col justify-center gap-5 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
            Chapter 1 · The Awakening
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mt-2 leading-[1.05]">
            She froze.
          </h2>
          <h3 className="text-2xl lg:text-3xl font-black text-slate-400 leading-[1.1] mt-1">
            One question. No answer.
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex flex-col gap-3"
        >
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            Maya had practiced her story, her strengths, her goals. But nobody told her the interviewer
            would open with a line of code.
          </p>

          <AnimatePresence>
            {showResolve && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4"
              >
                <p className="text-amber-800 text-sm leading-relaxed font-medium">
                  That night, she opened her laptop and made one decision:{' '}
                  <strong>start from the very beginning.</strong>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Journey stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.25 }}
          className="flex items-center gap-6 pt-2"
        >
          {[
            { label: 'Day', value: '01' },
            { label: 'Chapter', value: '1 of 15' },
            { label: 'Goal', value: 'Interview Ready' },
          ].map(item => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{item.label}</span>
              <span className="text-sm font-bold text-slate-700">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — terminal */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex-1 flex flex-col justify-center min-w-0"
      >
        <div className="bg-slate-900 rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-3 font-mono text-xs text-slate-500">terminal</span>
          </div>

          {/* Interview session */}
          <div className="px-6 py-5 flex flex-col gap-1">
            <div className="text-[11px] font-mono text-slate-600 mb-3 border-b border-slate-800 pb-2">
              — Interview session, 2:14 PM —
            </div>
            {INTERVIEW_LINES.map((line, i) => (
              <TypingLine key={i} text={line.text} color={line.color} startDelay={line.delay} />
            ))}
          </div>

          {/* Restart section */}
          <AnimatePresence>
            {showRestart && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.175 }}
                className="border-t border-slate-800 px-6 py-5 flex flex-col gap-1 overflow-hidden"
              >
                <div className="text-[11px] font-mono text-slate-600 mb-3 border-b border-slate-800 pb-2">
                  — 11:52 PM, her bedroom —
                </div>
                {RESTART_LINES.map((line, i) => (
                  <TypingLine key={i} text={line.text} color={line.color} startDelay={line.delay} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="text-slate-400 text-xs text-center mt-3 font-mono"
        >
          Follow Maya from zero → interview ready.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Scene01_StoryHook;
