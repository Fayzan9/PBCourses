import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene06_Summary: React.FC = () => {
  const [score, setScore] = useState<number | null>(null);

  const questions = [
    {
      question: 'After y = x, what does y reference?',
      answers: [
        'A copy of x',
        'The same object as x',
        'Nothing'
      ],
      correct: 1
    },
    {
      question: 'What happens when x = 20 after y = x?',
      answers: [
        'y also becomes 20',
        'The object changes',
        'x references a new object'
      ],
      correct: 2
    },
    {
      question: 'Which object is mutable?',
      answers: [
        'int',
        'str',
        'list'
      ],
      correct: 2
    }
  ];

  const [selected, setSelected] = useState<number[]>(
    Array(questions.length).fill(-1)
  );

  const submitQuiz = () => {
    let total = 0;

    questions.forEach((q, index) => {
      if (selected[index] === q.correct) {
        total++;
      }
    });

    setScore(total);
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 2.6 · Chapter Review
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Chapter 2{' '}
          <span className="text-indigo-600 font-serif italic">
            Summary
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Let's review the most important ideas before moving on.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}
        <div className="flex-1 flex flex-col gap-3">

          {[
            'Variables are names.',
            'Objects hold data.',
            'Variables reference objects.',
            'Multiple variables can reference the same object.',
            'Assignment can rebind a variable.',
            'Some objects are mutable, others are immutable.'
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                ✓
              </div>

              <div className="font-semibold text-slate-700">
                {item}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right */}
        <div className="w-[420px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Quick Quiz
            </div>

            <div className="mt-4 space-y-4">

              {questions.map((question, qIndex) => (
                <div key={qIndex}>

                  <div className="text-sm font-bold text-slate-800 mb-2">
                    {question.question}
                  </div>

                  <div className="flex flex-col gap-2">

                    {question.answers.map((answer, aIndex) => (
                      <button
                        key={answer}
                        onClick={() => {
                          const updated = [...selected];
                          updated[qIndex] = aIndex;
                          setSelected(updated);
                        }}
                        className={`text-left p-2 rounded-lg border text-sm transition-all ${
                          selected[qIndex] === aIndex
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200'
                        }`}
                      >
                        {answer}
                      </button>
                    ))}

                  </div>
                </div>
              ))}

            </div>

            <button
              onClick={submitQuiz}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Check Answers
            </button>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex-1 flex flex-col justify-between">

            <div>
              <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Next Chapter
              </div>

              <h3 className="text-xl font-black text-slate-800 mt-2">
                Input, Output & Expressions
              </h3>

              <p className="text-sm font-semibold text-slate-600 mt-2">
                Now that you understand variables and objects,
                you'll start building real Python programs.
              </p>
            </div>

            {score !== null && (
              <div className="mt-4 bg-white rounded-xl p-4 border border-indigo-100">

                <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Quiz Score
                </div>

                <div className="text-4xl font-black text-indigo-600 mt-2">
                  {score}/{questions.length}
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Scene06_Summary;