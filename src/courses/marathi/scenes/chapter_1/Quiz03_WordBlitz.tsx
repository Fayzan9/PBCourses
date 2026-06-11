import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCorrect, playWrong, playTimeout } from '../../utils/sounds';
import { speakMarathi } from '../../utils/speech';

type Card = { word: string; roman: string; meaning: string; emoji: string };

const WORD_BANK: Card[] = [
  { word: 'नमस्कार', roman: 'namaskār', meaning: 'hello / greeting',   emoji: '🙏' },
  { word: 'पाणी',    roman: 'pāṇī',    meaning: 'water',               emoji: '💧' },
  { word: 'घर',      roman: 'ghar',     meaning: 'house',               emoji: '🏠' },
  { word: 'आई',      roman: 'āī',       meaning: 'mother',              emoji: '👩' },
  { word: 'मित्र',   roman: 'mitra',    meaning: 'friend',              emoji: '🤝' },
  { word: 'शाळा',    roman: 'śāḷā',    meaning: 'school',              emoji: '🏫' },
  { word: 'देश',     roman: 'deś',      meaning: 'country',             emoji: '🗺️' },
  { word: 'फूल',     roman: 'phūl',     meaning: 'flower',              emoji: '🌸' },
  { word: 'आंबा',    roman: 'āmbā',     meaning: 'mango',               emoji: '🥭' },
  { word: 'सूर्य',   roman: 'sūrya',    meaning: 'sun',                 emoji: '☀️' },
  { word: 'चंद्र',   roman: 'candra',   meaning: 'moon',                emoji: '🌙' },
  { word: 'नदी',     roman: 'nadī',     meaning: 'river',               emoji: '🌊' },
];

type Question = { card: Card; options: string[]; };
type Status = 'playing' | 'correct' | 'wrong' | 'done';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeQuestions(): Question[] {
  const pool = shuffle(WORD_BANK).slice(0, 8);
  return pool.map(card => {
    const wrong = shuffle(WORD_BANK.filter(w => w.word !== card.word)).slice(0, 3).map(w => w.word);
    return { card, options: shuffle([card.word, ...wrong]) };
  });
}

const TOTAL_TIME = 8;

export const Quiz03_WordBlitz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(makeQuestions);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState<Status>('playing');
  const [chosen, setChosen] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const q = questions[idx];

  const advance = useCallback((wasCorrect: boolean) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (idx + 1 >= questions.length) {
      setStatus('done');
    } else {
      setTimeout(() => {
        setIdx(i => i + 1);
        setChosen(null);
        setStatus('playing');
        setTimeLeft(TOTAL_TIME);
      }, wasCorrect ? 700 : 1000);
    }
  }, [idx, questions.length]);

  const pick = useCallback((opt: string) => {
    if (status !== 'playing') return;
    setChosen(opt);
    speakMarathi(opt).catch(() => {});
    if (opt === q.card.word) {
      playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      const bonus = Math.ceil(timeLeft / 2);
      setScore(s => s + 10 + bonus);
      setStatus('correct');
      advance(true);
    } else {
      playWrong();
      setStreak(0);
      setStatus('wrong');
      advance(false);
    }
  }, [status, q, streak, timeLeft, advance]);

  // Countdown timer
  useEffect(() => {
    if (status !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          playTimeout();
          setStreak(0);
          setStatus('wrong');
          advance(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status, idx, advance]);

  const restart = () => {
    setQuestions(makeQuestions());
    setIdx(0); setScore(0); setStreak(0);
    setStatus('playing'); setChosen(null); setTimeLeft(TOTAL_TIME);
  };

  if (status === 'done') {
    const maxPossible = questions.length * (10 + TOTAL_TIME / 2);
    const pct = Math.round((score / maxPossible) * 100);
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-6 px-8">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="text-8xl select-none">
          {pct >= 70 ? '🚀' : pct >= 40 ? '⭐' : '🎯'}
        </motion.div>
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-extrabold">Word Blitz Complete!</p>
          <h2 className="text-5xl font-black text-slate-800 mt-1">{score} <span className="text-slate-400 text-2xl">pts</span></h2>
          <p className="text-slate-500 text-sm mt-2">
            {pct >= 70 ? 'Lightning fast! You\'ve got real Marathi vocabulary.' : pct >= 40 ? 'Nice — speed comes with practice.' : 'Keep at it! Marathi words will start feeling familiar soon.'}
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-3 text-center">
          <p className="text-xs text-slate-500 font-mono">Faster answers = more bonus points ⚡</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={restart}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold rounded-2xl text-sm shadow-lg cursor-pointer transition-all">
          Play Again
        </motion.button>
      </div>
    );
  }

  const timerPct = timeLeft / TOTAL_TIME;

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-extrabold">Quiz 3 · Word Blitz ⚡</span>
          <p className="text-xs text-slate-400 mt-0.5">Match the meaning to the Marathi word — fast!</p>
        </div>
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-orange-100 border border-orange-300 rounded-full px-3 py-1">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-extrabold text-orange-600">{streak}x</span>
            </motion.div>
          )}
          <div className="bg-emerald-500 text-white font-extrabold text-sm px-4 py-1.5 rounded-full">{score} pts</div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${timerPct * 100}%` }}
          transition={{ duration: 0.5, ease: 'linear' }}
          className={`h-full rounded-full transition-colors ${
            timerPct > 0.5 ? 'bg-emerald-400' : timerPct > 0.25 ? 'bg-amber-400' : 'bg-rose-400'
          }`}
        />
      </div>
      <div className="flex items-center justify-between -mt-2">
        <p className="text-xs text-slate-400 font-mono">{idx + 1} / {questions.length}</p>
        <p className={`text-xs font-extrabold font-mono ${timeLeft <= 3 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`}>
          {timeLeft}s
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-5">
        {/* Meaning card */}
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`flex flex-col items-center gap-2 px-10 py-6 rounded-3xl border-4 shadow-xl w-full max-w-sm ${
              status === 'correct' ? 'bg-emerald-50 border-emerald-400' :
              status === 'wrong'   ? 'bg-rose-50 border-rose-400' :
              'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-5xl select-none">{q.card.emoji}</span>
            <p className="text-2xl font-black text-slate-800">{q.card.meaning}</p>
            <p className="text-sm font-mono text-slate-400">{q.card.roman}</p>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {q.options.map((opt) => {
            const isChosen = chosen === opt;
            const isCorrect = opt === q.card.word;
            let cls = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50';
            if (isChosen && status === 'correct') cls = 'bg-emerald-500 border-emerald-500 text-white shadow-lg';
            if (isChosen && status === 'wrong')   cls = 'bg-rose-500 border-rose-500 text-white';
            if (!isChosen && status !== 'playing' && isCorrect) cls = 'bg-emerald-100 border-emerald-400 text-emerald-800';

            return (
              <motion.button key={opt} whileTap={status === 'playing' ? { scale: 0.92 } : {}}
                onClick={() => pick(opt)}
                className={`py-4 rounded-2xl font-black text-2xl cursor-pointer transition-all ${cls}`}
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

export default Quiz03_WordBlitz;
