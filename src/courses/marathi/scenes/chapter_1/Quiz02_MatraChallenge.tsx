import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCorrect, playWrong, playCombo } from '../../utils/sounds';
import { speakMarathi } from '../../utils/speech';

type Question = { roman: string; correct: string; options: string[] };

const SYLLABLES: { devanagari: string; roman: string }[] = [
  { devanagari: 'का', roman: 'kā' }, { devanagari: 'कि', roman: 'ki' },
  { devanagari: 'की', roman: 'kī' }, { devanagari: 'कु', roman: 'ku' },
  { devanagari: 'कू', roman: 'kū' }, { devanagari: 'के', roman: 'ke' },
  { devanagari: 'को', roman: 'ko' }, { devanagari: 'गा', roman: 'gā' },
  { devanagari: 'गि', roman: 'gi' }, { devanagari: 'मा', roman: 'mā' },
  { devanagari: 'मि', roman: 'mi' }, { devanagari: 'ना', roman: 'nā' },
  { devanagari: 'नि', roman: 'ni' }, { devanagari: 'पा', roman: 'pā' },
  { devanagari: 'पि', roman: 'pi' }, { devanagari: 'रा', roman: 'rā' },
  { devanagari: 'लि', roman: 'li' }, { devanagari: 'वा', roman: 'vā' },
  { devanagari: 'सा', roman: 'sā' }, { devanagari: 'हा', roman: 'hā' },
  { devanagari: 'ते', roman: 'te' }, { devanagari: 'दे', roman: 'de' },
  { devanagari: 'बो', roman: 'bo' }, { devanagari: 'जो', roman: 'jo' },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeQuestions(): Question[] {
  const pool = shuffle(SYLLABLES).slice(0, 10);
  return pool.map(({ devanagari, roman }) => {
    const wrong = shuffle(SYLLABLES.filter(s => s.roman !== roman)).slice(0, 3).map(s => s.devanagari);
    return { roman, correct: devanagari, options: shuffle([devanagari, ...wrong]) };
  });
}

type Status = 'playing' | 'correct' | 'wrong' | 'done';

export const Quiz02_MatraChallenge: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(makeQuestions);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [status, setStatus] = useState<Status>('playing');
  const [chosen, setChosen] = useState<string | null>(null);
  const [combo, setCombo] = useState(false);

  const q = questions[idx];

  const pick = useCallback((opt: string) => {
    if (status !== 'playing') return;
    setChosen(opt);
    speakMarathi(opt).catch(() => {});
    if (opt === q.correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(s => Math.max(s, newStreak));
      const bonus = newStreak >= 3;
      setScore(s => s + (bonus ? 3 : 1));
      setCombo(bonus);
      if (bonus) playCombo(); else playCorrect();
      setStatus('correct');
    } else {
      playWrong();
      setStreak(0);
      setCombo(false);
      setStatus('wrong');
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        setStatus('done');
      } else {
        setIdx(i => i + 1);
        setChosen(null);
        setStatus('playing');
      }
    }, 1000);
  }, [status, q, streak, idx, questions.length]);

  const restart = () => {
    setQuestions(makeQuestions());
    setIdx(0); setScore(0); setStreak(0); setBestStreak(0);
    setStatus('playing'); setChosen(null); setCombo(false);
  };

  if (status === 'done') {
    const max = questions.length * 3;
    const pct = Math.round((score / max) * 100);
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-6 px-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="text-8xl select-none"
        >
          {pct >= 80 ? '🎯' : pct >= 50 ? '⭐' : '💪'}
        </motion.div>
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Quiz 2 Complete!</p>
          <h2 className="text-5xl font-black text-slate-800 mt-1">{score} <span className="text-slate-400 text-3xl">/ {max}</span></h2>
          <p className="text-slate-500 text-sm mt-2">
            {pct >= 80 ? 'Matra master! Your syllables are solid.' : pct >= 50 ? 'Getting there — matras take a bit of practice.' : 'Keep practising the matra chart — it clicks fast.'}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-center bg-violet-50 border border-violet-200 rounded-2xl px-5 py-3">
            <p className="text-2xl font-black text-violet-600">{bestStreak}🔥</p>
            <p className="text-xs text-slate-500 font-mono">best streak</p>
          </div>
          <div className="text-center bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3">
            <p className="text-2xl font-black text-slate-700">{pct}%</p>
            <p className="text-xs text-slate-500 font-mono">score</p>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={restart}
          className="px-8 py-3 bg-violet-500 hover:bg-violet-400 text-white font-extrabold rounded-2xl text-sm shadow-lg cursor-pointer transition-all">
          Play Again
        </motion.button>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-violet-500 font-extrabold">Quiz 2 · Matra Challenge!</span>
          <p className="text-xs text-slate-400 mt-0.5">Pick the Devanagari syllable that matches the sound</p>
        </div>
        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-orange-100 border border-orange-300 rounded-full px-3 py-1">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-extrabold text-orange-600">+3 bonus!</span>
            </motion.div>
          )}
          <div className="bg-violet-500 text-white font-extrabold text-sm px-4 py-1.5 rounded-full">{score} pts</div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div animate={{ width: `${(idx / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }} className="h-full bg-violet-400 rounded-full" />
      </div>
      <p className="text-xs text-slate-400 font-mono -mt-2">{idx + 1} / {questions.length}</p>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {/* Prompt */}
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">This sound in Devanagari is…</p>
            <div className={`px-10 py-6 rounded-3xl border-4 shadow-xl ${
              status === 'correct' ? 'bg-emerald-50 border-emerald-400' :
              status === 'wrong'   ? 'bg-rose-50 border-rose-400' :
              'bg-violet-50 border-violet-300'
            }`}>
              <span className={`text-6xl font-black font-mono ${
                status === 'correct' ? 'text-emerald-600' :
                status === 'wrong'   ? 'text-rose-500' :
                'text-violet-700'
              }`}>{q.roman}</span>
            </div>
            {combo && status === 'correct' && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="text-emerald-600 font-extrabold text-sm">🔥 Combo! +3 points</motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Options — 2×2 grid with big Devanagari */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          {q.options.map((opt) => {
            const isChosen = chosen === opt;
            const isCorrect = opt === q.correct;
            let cls = 'bg-white border-2 border-slate-200 hover:border-violet-300 hover:bg-violet-50';
            if (isChosen && status === 'correct') cls = 'bg-emerald-500 border-emerald-500 text-white shadow-lg';
            if (isChosen && status === 'wrong')   cls = 'bg-rose-500 border-rose-500 text-white';
            if (!isChosen && status !== 'playing' && isCorrect) cls = 'bg-emerald-100 border-emerald-400';

            return (
              <motion.button key={opt} whileTap={status === 'playing' ? { scale: 0.92 } : {}}
                onClick={() => pick(opt)}
                className={`py-5 rounded-2xl font-black text-4xl cursor-pointer transition-all ${cls}`}
                style={{ fontFamily: 'serif' }}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz02_MatraChallenge;
