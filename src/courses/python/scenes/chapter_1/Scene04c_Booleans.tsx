import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHALLENGES = [
  { expr: '5 > 3',         answer: true,  explanation: '5 is greater than 3 — yep.' },
  { expr: '10 == 10',      answer: true,  explanation: '== checks equality. 10 equals 10.' },
  { expr: '"a" == "A"',    answer: false, explanation: 'Python is case-sensitive. "a" ≠ "A".' },
  { expr: '0 == False',    answer: true,  explanation: 'bool is a subclass of int. False == 0.' },
  { expr: '3 != 3',        answer: false, explanation: '!= means "not equal". 3 is equal to 3.' },
  { expr: 'True + True',   answer: true,  explanation: 'True is 1, so 1 + 1 = 2, which is truthy!' },
  { expr: 'len("") == 0',  answer: true,  explanation: 'Empty string has length 0. True.' },
  { expr: '"" == False',   answer: false, explanation: 'Empty str is falsy, but "" does not equal False.' },
];

export const Scene04c_Booleans: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [guess, setGuess] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [done, setDone] = useState(false);

  const item = CHALLENGES[current];
  const isCorrect = guess === item.answer;

  const handleGuess = (g: boolean) => {
    if (guess !== null) return;
    setGuess(g);
    const correct = g === item.answer;
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => {
        const next = s + 1;
        setBestStreak(b => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (current + 1 >= CHALLENGES.length) {
        setDone(true);
      } else {
        setCurrent(c => c + 1);
        setGuess(null);
      }
    }, 1100);
  };

  const reset = () => {
    setCurrent(0); setGuess(null); setScore(0);
    setStreak(0); setBestStreak(0); setDone(false);
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden">

      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 04c · Booleans</span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          bool: the judge. <span className="text-violet-600">True</span> or <span className="text-rose-500">False</span>?
        </h2>
        <p className="text-slate-500 text-sm mt-1">Every expression in Python evaluates to one of two values. Can you judge correctly?</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">

        {/* Left — quick reference */}
        <div className="flex flex-col gap-3 lg:w-[260px] shrink-0 justify-center">
          <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl px-5 py-4 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">The two values</p>
            <div className="flex gap-3">
              <div className="flex-1 bg-white border-2 border-emerald-300 rounded-xl py-3 flex flex-col items-center gap-1">
                <span className="font-mono font-black text-xl text-emerald-600">True</span>
                <span className="text-[10px] text-slate-400 font-mono">== 1</span>
              </div>
              <div className="flex-1 bg-white border-2 border-rose-300 rounded-xl py-3 flex flex-col items-center gap-1">
                <span className="font-mono font-black text-xl text-rose-500">False</span>
                <span className="text-[10px] text-slate-400 font-mono">== 0</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Comparison operators</p>
            {[
              ['==', 'equal to'],
              ['!=', 'not equal to'],
              ['>', 'greater than'],
              ['<', 'less than'],
              ['>=', 'greater or equal'],
            ].map(([op, label]) => (
              <div key={op} className="flex items-center gap-2">
                <code className="font-mono font-black text-sm text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-lg w-10 text-center">{op}</code>
                <span className="text-xs text-slate-500">{label}</span>
              </div>
            ))}
          </div>

          {/* Score / streak */}
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Score</p>
              <p className="font-black text-xl text-slate-800">{score}</p>
            </div>
            <div className="flex-1 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-center">
              <p className="text-[10px] font-mono text-amber-600 uppercase tracking-wider">Streak 🔥</p>
              <p className="font-black text-xl text-amber-600">{streak}</p>
            </div>
          </div>
        </div>

        {/* Right — game */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5 min-h-0">

          {!done ? (
            <>
              {/* Progress */}
              <div className="flex items-center gap-2 self-stretch">
                {CHALLENGES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      i < current ? 'bg-violet-400' : i === current ? 'bg-amber-400' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Expression card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -60, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`w-full max-w-md rounded-3xl border-2 px-8 py-8 text-center shadow-sm transition-colors ${
                    guess === null
                      ? 'bg-white border-slate-200'
                      : isCorrect
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-rose-50 border-rose-300'
                  }`}
                >
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Is this True or False?</p>
                  <code className="font-mono font-black text-3xl text-slate-800">{item.expr}</code>

                  <AnimatePresence>
                    {guess !== null && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 overflow-hidden"
                      >
                        <div className={`text-sm font-semibold mb-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {isCorrect ? '✓ Correct!' : `✗ It's ${item.answer ? 'True' : 'False'}`}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.explanation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              {/* True / False buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleGuess(true)}
                  disabled={guess !== null}
                  className={`px-10 py-3 rounded-2xl font-mono font-black text-lg border-2 cursor-pointer transition-all disabled:cursor-default disabled:opacity-50 ${
                    guess !== null && item.answer === true
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                      : 'bg-white border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  True
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleGuess(false)}
                  disabled={guess !== null}
                  className={`px-10 py-3 rounded-2xl font-mono font-black text-lg border-2 cursor-pointer transition-all disabled:cursor-default disabled:opacity-50 ${
                    guess !== null && item.answer === false
                      ? 'bg-rose-50 border-rose-400 text-rose-600'
                      : 'bg-white border-rose-300 text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  False
                </motion.button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="flex flex-col items-center gap-5 text-center"
            >
              <span className="text-7xl">{score >= 7 ? '🏆' : score >= 5 ? '🎯' : '💪'}</span>
              <div>
                <p className="text-4xl font-black text-slate-800">{score} / {CHALLENGES.length}</p>
                <p className="text-slate-500 text-sm mt-1">
                  {score >= 7 ? 'You\'ve mastered booleans!' : score >= 5 ? 'Solid! A couple tricky ones.' : 'The tricky ones involve True == 1.'}
                </p>
                {bestStreak >= 3 && (
                  <p className="text-amber-600 text-sm font-bold mt-1">🔥 Best streak: {bestStreak}</p>
                )}
              </div>
              <button
                onClick={reset}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-sm transition-colors cursor-pointer shadow-sm"
              >
                Play again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scene04c_Booleans;
