import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXAMPLES = [
  { value: '7',       correct: 'int',   label: '7' },
  { value: '3.14',    correct: 'float', label: '3.14' },
  { value: '100',     correct: 'int',   label: '100' },
  { value: '0.5',     correct: 'float', label: '0.5' },
  { value: '-4',      correct: 'int',   label: '-4' },
  { value: '9.99',    correct: 'float', label: '9.99' },
];

type Guess = 'int' | 'float' | null;

export const Scene04a_IntFloat: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [guess, setGuess] = useState<Guess>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const item = EXAMPLES[current];

  const handleGuess = (g: 'int' | 'float') => {
    if (guess) return;
    setGuess(g);
    const correct = g === item.correct;
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (current + 1 >= EXAMPLES.length) {
        setDone(true);
      } else {
        setCurrent(c => c + 1);
        setGuess(null);
      }
    }, 900);
  };

  const reset = () => { setCurrent(0); setGuess(null); setScore(0); setDone(false); };

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden">

      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 04a · Numbers</span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          int vs float — <span className="text-amber-500">what's the difference?</span>
        </h2>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-5 min-h-0">

        {/* Left — concept cards */}
        <div className="flex flex-col gap-3 lg:w-[340px] shrink-0">
          {/* int card */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔢</span>
              <div>
                <code className="font-mono font-black text-amber-700 text-lg">int</code>
                <span className="text-amber-600 text-xs font-semibold ml-2">— whole numbers</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['0', '7', '-3', '1000'].map(v => (
                <span key={v} className="font-mono font-bold text-sm bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-lg">{v}</span>
              ))}
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">Ages, counts, scores — anything you'd never write as a decimal.</p>
          </div>

          {/* float card */}
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl px-5 py-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📐</span>
              <div>
                <code className="font-mono font-black text-sky-700 text-lg">float</code>
                <span className="text-sky-600 text-xs font-semibold ml-2">— decimal numbers</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['3.14', '9.99', '-0.5', '1.82'].map(v => (
                <span key={v} className="font-mono font-bold text-sm bg-white border border-sky-200 text-sky-700 px-3 py-1 rounded-lg">{v}</span>
              ))}
            </div>
            <p className="text-xs text-sky-800 leading-relaxed">Prices, measurements, percentages — anything with a decimal point.</p>
          </div>

          {/* quick rule */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-700">Quick rule:</span> If it has a <code className="text-slate-700 font-mono font-semibold">.</code> in it → it's a float. No dot → it's an int.
          </div>
        </div>

        {/* Right — guessing game */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5 min-h-0">

          {!done ? (
            <>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                <span>Question {current + 1} of {EXAMPLES.length}</span>
                <span className="bg-amber-100 border border-amber-200 text-amber-700 font-bold px-2 py-0.5 rounded-full">
                  {score} correct
                </span>
              </div>

              {/* Value display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="bg-white border-2 border-slate-200 rounded-3xl px-12 py-8 shadow-sm text-center"
                >
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">What type is this?</p>
                  <p className="font-mono font-black text-5xl text-slate-800">{item.label}</p>
                </motion.div>
              </AnimatePresence>

              {/* Guess buttons */}
              <div className="flex gap-4">
                {(['int', 'float'] as const).map(type => {
                  const isChosen = guess === type;
                  const isCorrect = guess && type === item.correct;
                  const isWrong = isChosen && type !== item.correct;

                  return (
                    <motion.button
                      key={type}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleGuess(type)}
                      disabled={!!guess}
                      className={`px-8 py-3 rounded-2xl font-mono font-black text-lg border-2 transition-all cursor-pointer disabled:cursor-default ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                          : isWrong
                          ? 'bg-rose-50 border-rose-300 text-rose-600'
                          : !guess
                          ? type === 'int'
                            ? 'bg-white border-amber-300 text-amber-700 hover:bg-amber-50'
                            : 'bg-white border-sky-300 text-sky-700 hover:bg-sky-50'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      {isCorrect ? '✓ ' : isWrong ? '✗ ' : ''}{type}
                    </motion.button>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-xs bg-slate-100 rounded-full h-1.5">
                <motion.div
                  className="bg-amber-400 h-full rounded-full"
                  animate={{ width: `${((current) / EXAMPLES.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <span className="text-6xl">{score >= 5 ? '🏆' : score >= 3 ? '👍' : '💪'}</span>
              <div>
                <p className="text-3xl font-black text-slate-800">{score} / {EXAMPLES.length} correct</p>
                <p className="text-slate-500 text-sm mt-1">
                  {score === EXAMPLES.length ? 'Perfect! You know your types.' : 'Remember: dot = float, no dot = int.'}
                </p>
              </div>
              <button
                onClick={reset}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-bold text-sm transition-colors cursor-pointer shadow-sm"
              >
                Try again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scene04a_IntFloat;
