import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2, XCircle } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    question: "Which of these is a valid Python variable name?",
    options: ["2fast", "my_name", "class", "first-name"],
    correct: 1,
    explanation:
      "Variable names can't start with a number, can't be keywords like 'class', and can't contain hyphens.",
  },
  {
    question: "What type does Python give the value 3.14?",
    options: ["int", "str", "float", "number"],
    correct: 2,
    explanation: "Any number with a decimal point is a float. 3.14 → float.",
  },
  {
    question: "What does type('hello') return?",
    options: ["'hello'", "<class 'str'>", "string", "text"],
    correct: 1,
    explanation:
      "type() returns the class of the object. For text, that's <class 'str'>.",
  },
  {
    question: "After x = 5, then x = 10 — what happened to the object 5?",
    options: [
      "It was modified to 10",
      "It was deleted immediately",
      "It still exists; x just points elsewhere",
      "x now holds both values",
    ],
    correct: 2,
    explanation:
      "int is immutable. x = 10 makes x point to a new object. The original 5 still exists until garbage collected.",
  },
];

function getFinalEmoji(score: number): string {
  if (score === 4) return "🏆";
  if (score === 3) return "🎯";
  return "💪";
}

function getFinalMessage(score: number): string {
  if (score === 4)
    return "Perfect score! Maya would've aced that interview question if she'd known this yesterday.";
  if (score === 3)
    return "Almost perfect! One more pass and you'll have this locked in solid.";
  return "Keep going — Maya started from zero too. Review and retry!";
}

export const Scene09_Quiz1: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ];
  const isAnswered = selectedIdx !== null;

  useEffect(() => {
    if (selectedIdx === null) return;

    const explanationTimer = setTimeout(() => {
      setShowExplanation(true);
    }, 800);

    const advanceTimer = setTimeout(() => {
      if (currentQ + 1 < QUESTIONS.length) {
        setCurrentQ((q) => q + 1);
        setSelectedIdx(null);
        setShowExplanation(false);
      } else {
        setFinished(true);
      }
    }, 2500);

    return () => {
      clearTimeout(explanationTimer);
      clearTimeout(advanceTimer);
    };
  }, [selectedIdx, currentQ]);

  function handleSelect(idx: number) {
    if (isAnswered) return;
    setSelectedIdx(idx);
    if (idx === question.correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  }

  function handleReset() {
    setCurrentQ(0);
    setSelectedIdx(null);
    setScore(0);
    setStreak(0);
    setShowExplanation(false);
    setFinished(false);
  }

  function getOptionClass(idx: number): string {
    const base =
      "w-full border-2 rounded-2xl px-5 py-3 text-left font-medium transition-all duration-200 cursor-pointer ";
    if (!isAnswered) {
      return base + "bg-white border-slate-200 hover:border-amber-300 text-slate-700";
    }
    if (idx === question.correct) {
      return base + "bg-emerald-50 border-emerald-400 text-emerald-700";
    }
    if (idx === selectedIdx) {
      return base + "bg-rose-50 border-rose-300 text-rose-600";
    }
    return base + "bg-white border-slate-200 text-slate-400";
  }

  if (finished) {
    return (
      <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
            Scene 09 · Quiz 1
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Variables &amp; Types —{" "}
            <span className="text-amber-500">quick fire.</span>
          </h2>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl w-full text-center flex flex-col gap-5"
          >
            <div className="text-6xl">{getFinalEmoji(score)}</div>
            <div>
              <p className="text-5xl font-black text-slate-800">
                {score}
                <span className="text-2xl font-bold text-slate-400">/4</span>
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                {getFinalMessage(score)}
              </p>
            </div>

            <div className="flex justify-center gap-2 pt-1">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < score ? "bg-emerald-400" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleReset}
              className="bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-bold px-6 py-2.5 cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw size={16} />
              Try again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
          Scene 09 · Quiz 1
        </span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          Variables &amp; Types —{" "}
          <span className="text-amber-500">quick fire.</span>
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mt-1">
          4 questions. Maya needs these for interviews. So do you.
        </p>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between max-w-xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="bg-amber-50 border-2 border-amber-300 text-amber-700 shadow-sm rounded-xl px-3 py-1 text-sm font-bold">
            {score}/{QUESTIONS.length}
          </span>
          {streak > 0 && (
            <motion.span
              key={streak}
              initial={{ scale: 1.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-2 border-slate-200 text-slate-500 rounded-xl px-3 py-1 text-sm font-bold"
            >
              🔥 {streak}
            </motion.span>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i < currentQ
                  ? "bg-emerald-400"
                  : i === currentQ
                  ? "bg-amber-400 scale-125"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="flex-1 overflow-y-auto flex items-start justify-center">
        <div className="max-w-xl w-full mx-auto flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.125 }}
              className="bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col gap-5"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-lg font-bold text-slate-800">
                  {question.question}
                </p>
                <span className="text-xs font-mono text-slate-400 shrink-0 mt-1">
                  {currentQ + 1}/4
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {question.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={getOptionClass(idx)}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400 w-5 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                      {isAnswered && idx === question.correct && (
                        <CheckCircle2
                          size={16}
                          className="ml-auto text-emerald-500 shrink-0"
                        />
                      )}
                      {isAnswered &&
                        idx === selectedIdx &&
                        idx !== question.correct && (
                          <XCircle
                            size={16}
                            className="ml-auto text-rose-400 shrink-0"
                          />
                        )}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3"
                  >
                    <p className="text-sm text-amber-800">
                      {question.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Scene09_Quiz1;
