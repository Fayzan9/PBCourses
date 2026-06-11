import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2, XCircle } from "lucide-react";

interface Question {
  question: string;
  code: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    question: "What does this print?",
    code: "x = 'Python'\nprint(x[0])",
    options: ["Python", "P", "p", "Error"],
    correct: 1,
    explanation:
      "String indexing starts at 0. x[0] is the first character: 'P'.",
  },
  {
    question: "What does this print?",
    code: "a = 10\nb = a\na = 20\nprint(b)",
    options: ["20", "10", "None", "Error"],
    correct: 1,
    explanation:
      "int is immutable. b = a made b point to 10. When a moved to 20, b stayed at 10.",
  },
  {
    question: "What type does input() always return?",
    code: "val = input('Enter: ')",
    options: ["int", "float", "str", "depends on what you type"],
    correct: 2,
    explanation:
      "input() ALWAYS returns a string, no matter what the user types. Use int() or float() to convert.",
  },
  {
    question: "What does this print?",
    code: "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)",
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "Error"],
    correct: 1,
    explanation:
      "List is mutable. b = a makes both point to the SAME list. b.append(4) changes that list — so a also sees it.",
  },
];

function getFinalEmoji(score: number): string {
  if (score === 4) return "🏆";
  if (score === 3) return "🎯";
  return "💪";
}

function getFinalMessage(score: number): string {
  if (score === 4)
    return "Maya would get this right now. And so would you — perfect score!";
  if (score === 3)
    return "Maya would get this right now. One slip, but the foundation is solid.";
  return "Maya started from zero too. Review these patterns and retry — they come up in every interview.";
}

export const Scene10_Quiz2: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ];
  const isAnswered = selectedIdx !== null;
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / QUESTIONS.length) * 100;

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
      return base + "bg-white border-slate-200 hover:border-violet-300 text-slate-700";
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
          <span className="text-xs font-mono uppercase tracking-widest text-violet-500 font-extrabold">
            Scene 10 · Quiz 2
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            I/O &amp; Memory —{" "}
            <span className="text-violet-500">read the code.</span>
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

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full bg-violet-400 transition-all duration-700"
                style={{ width: `${(score / QUESTIONS.length) * 100}%` }}
              />
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
        <span className="text-xs font-mono uppercase tracking-widest text-violet-500 font-extrabold">
          Scene 10 · Quiz 2
        </span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          I/O &amp; Memory —{" "}
          <span className="text-violet-500">read the code.</span>
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mt-1">
          Read the code, predict the output. This is exactly what tech
          interviews test.
        </p>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between max-w-xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="bg-violet-50 border-2 border-violet-300 text-violet-700 shadow-sm rounded-xl px-3 py-1 text-sm font-bold">
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

        <span className="text-xs font-mono text-slate-400">
          {currentQ + 1} / {QUESTIONS.length}
        </span>
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
              {/* Question text */}
              <p className="text-base font-bold text-slate-700">
                {question.question}
              </p>

              {/* Code block */}
              <div className="bg-slate-100 border border-slate-200 rounded-xl px-5 py-4">
                <pre className="font-mono text-sm text-slate-700 leading-relaxed whitespace-pre">
                  {question.code}
                </pre>
              </div>

              {/* Answer options */}
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
                      <span className="font-mono">{opt}</span>
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

              {/* Explanation */}
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

      {/* Progress bar */}
      <div className="max-w-xl mx-auto w-full">
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-1.5 rounded-full bg-violet-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Scene10_Quiz2;
