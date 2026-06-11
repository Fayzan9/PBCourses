import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCorrect, playWrong } from '../../utils/sounds';
import { speakMarathi } from '../../utils/speech';

type Question = { letter: string; correct: string; options: string[] };

const ALL_LETTERS: { letter: string; roman: string }[] = [
  { letter: 'अ', roman: 'a' }, { letter: 'आ', roman: 'ā' }, { letter: 'इ', roman: 'i' },
  { letter: 'ई', roman: 'ī' }, { letter: 'उ', roman: 'u' }, { letter: 'ऊ', roman: 'ū' },
  { letter: 'ए', roman: 'e' }, { letter: 'ओ', roman: 'o' }, { letter: 'क', roman: 'ka' },
  { letter: 'ग', roman: 'ga' }, { letter: 'च', roman: 'ca' }, { letter: 'ज', roman: 'ja' },
  { letter: 'त', roman: 'ta' }, { letter: 'द', roman: 'da' }, { letter: 'न', roman: 'na' },
  { letter: 'प', roman: 'pa' }, { letter: 'ब', roman: 'ba' }, { letter: 'म', roman: 'ma' },
  { letter: 'य', roman: 'ya' }, { letter: 'र', roman: 'ra' }, { letter: 'ल', roman: 'la' },
  { letter: 'व', roman: 'va' }, { letter: 'स', roman: 'sa' }, { letter: 'ह', roman: 'ha' },
  { letter: 'ट', roman: 'ṭa' }, { letter: 'ड', roman: 'ḍa' }, { letter: 'ण', roman: 'ṇa' },
  { letter: 'श', roman: 'śa' }, { letter: 'ष', roman: 'ṣa' }, { letter: 'ख', roman: 'kha' },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeQuestions(): Question[] {
  const pool = shuffle(ALL_LETTERS).slice(0, 10);
  return pool.map(({ letter, roman }) => {
    const wrong = shuffle(ALL_LETTERS.filter(l => l.roman !== roman)).slice(0, 3).map(l => l.roman);
    return { letter, correct: roman, options: shuffle([roman, ...wrong]) };
  });
}

type Status = 'playing' | 'correct' | 'wrong' | 'done';

export const Quiz01_LetterRecognition: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(makeQuestions);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [status, setStatus] = useState<Status>('playing');
  const [chosen, setChosen] = useState<string | null>(null);

  const q = questions[idx];
  const progress = idx / questions.length;

  const pick = useCallback((opt: string) => {
    if (status !== 'playing') return;
    setChosen(opt);
    speakMarathi(q.letter).catch(() => {});
    if (opt === q.correct) {
      playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(s => Math.max(s, newStreak));
      setScore(s => s + (newStreak >= 3 ? 2 : 1));
      setStatus('correct');
    } else {
      playWrong();
      setStreak(0);
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
    }, 900);
  }, [status, q, streak, idx, questions.length]);

  const restart = () => {
    setQuestions(makeQuestions());
    setIdx(0); setScore(0); setStreak(0); setBestStreak(0);
    setStatus('playing'); setChosen(null);
  };

  if (status === 'done') {
    const pct = Math.round((score / (questions.length * 2)) * 100);
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-6 px-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="text-8xl select-none"
        >
          {pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '💪'}
        </motion.div>
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Quiz 1 Complete!</p>
          <h2 className="text-5xl font-black text-slate-800 mt-1">{score} <span className="text-slate-400 text-3xl">/ {questions.length * 2}</span></h2>
          <p className="text-slate-500 text-sm mt-2">{pct >= 80 ? 'Excellent! You know your letters.' : pct >= 50 ? 'Good start — keep practising!' : 'Review the vowels & consonants and try again.'}</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3">
            <p className="text-2xl font-black text-amber-600">{bestStreak}🔥</p>
            <p className="text-xs text-slate-500 font-mono">best streak</p>
          </div>
          <div className="text-center bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3">
            <p className="text-2xl font-black text-slate-700">{pct}%</p>
            <p className="text-xs text-slate-500 font-mono">accuracy</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={restart}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-extrabold rounded-2xl text-sm shadow-lg cursor-pointer transition-all"
        >
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
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Quiz 1 · Name That Letter!</span>
          <p className="text-xs text-slate-400 mt-0.5">What sound does this Devanagari letter make?</p>
        </div>
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-orange-100 border border-orange-300 rounded-full px-3 py-1"
            >
              <span className="text-sm">🔥</span>
              <span className="text-xs font-extrabold text-orange-600">{streak} streak</span>
            </motion.div>
          )}
          <div className="bg-amber-500 text-white font-extrabold text-sm px-4 py-1.5 rounded-full">
            {score} pts
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4 }}
          className="h-full bg-amber-400 rounded-full"
        />
      </div>
      <p className="text-xs text-slate-400 font-mono -mt-2">{idx + 1} / {questions.length}</p>

      {/* Letter card */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`flex items-center justify-center w-40 h-40 rounded-3xl border-4 shadow-xl select-none ${
              status === 'correct' ? 'bg-emerald-50 border-emerald-400' :
              status === 'wrong'   ? 'bg-rose-50 border-rose-400' :
              'bg-amber-50 border-amber-300'
            }`}
          >
            <span
              className={`text-8xl font-black leading-none ${
                status === 'correct' ? 'text-emerald-600' :
                status === 'wrong'   ? 'text-rose-500' :
                'text-amber-600'
              }`}
              style={{ fontFamily: 'serif' }}
            >
              {q.letter}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {q.options.map((opt) => {
            const isChosen = chosen === opt;
            const isCorrect = opt === q.correct;
            let cls = 'bg-white border-2 border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50';
            if (isChosen && status === 'correct') cls = 'bg-emerald-500 border-emerald-500 text-white scale-105 shadow-lg';
            if (isChosen && status === 'wrong')   cls = 'bg-rose-500 border-rose-500 text-white';
            if (!isChosen && status !== 'playing' && isCorrect) cls = 'bg-emerald-100 border-emerald-400 text-emerald-700';

            return (
              <motion.button
                key={opt}
                whileTap={status === 'playing' ? { scale: 0.94 } : {}}
                onClick={() => pick(opt)}
                className={`py-3.5 rounded-2xl font-extrabold font-mono text-lg cursor-pointer transition-all ${cls}`}
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

export default Quiz01_LetterRecognition;
