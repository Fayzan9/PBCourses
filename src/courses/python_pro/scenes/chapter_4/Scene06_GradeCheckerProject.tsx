import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene06_GradeCheckerProject: React.FC = () => {
  const [score, setScore] = useState(82);

  const passed = score >= 50;

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 4.6 · Mini Project
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Grade Checker{' '}
          <span className="text-indigo-600 font-serif italic">
            Project
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Build a complete program using input, comparisons, booleans,
          and if/else statements.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}
        <div className="w-[360px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Program Code
            </div>

            <pre className="mt-3 text-xs font-mono font-bold text-slate-800 whitespace-pre-wrap">
{`score = int(input())

if score >= 50:
    print("Pass")
else:
    print("Fail")`}
            </pre>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Change Score
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={score}
              onChange={(e) =>
                setScore(Number(e.target.value))
              }
              className="w-full mt-4"
            />

            <div className="mt-4 text-center text-5xl font-black text-indigo-600">
              {score}
            </div>

          </div>

          <div
            className={`rounded-2xl p-4 border ${
              passed
                ? 'bg-emerald-50 border-emerald-100'
                : 'bg-red-50 border-red-100'
            }`}
          >
            <div
              className={`text-xs font-mono font-bold uppercase ${
                passed
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}
            >
              Final Result
            </div>

            <div
              className={`mt-3 text-3xl font-black ${
                passed
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}
            >
              {passed ? 'PASS' : 'FAIL'}
            </div>

          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Program Execution
          </div>

          <div className="flex-1 flex items-center justify-center">

            <div className="flex items-center gap-8">

              {/* Input */}
              <motion.div
                key={score}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-52 h-48 bg-white border-2 border-indigo-500 rounded-3xl flex flex-col items-center justify-center"
              >
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Input
                </div>

                <div className="text-6xl font-black text-indigo-600 mt-4">
                  {score}
                </div>
              </motion.div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Condition */}
              <div className="w-56 h-48 bg-white border-2 border-orange-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Check
                </div>

                <div className="text-2xl font-black text-orange-600 mt-3">
                  score ≥ 50
                </div>

                <div
                  className={`text-4xl font-black mt-4 ${
                    passed
                      ? 'text-emerald-600'
                      : 'text-red-600'
                  }`}
                >
                  {passed ? 'True' : 'False'}
                </div>

              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Output */}
              <motion.div
                key={String(passed)}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={`w-56 h-48 bg-white border-2 rounded-3xl flex flex-col items-center justify-center ${
                  passed
                    ? 'border-emerald-500'
                    : 'border-red-500'
                }`}
              >
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Output
                </div>

                <div
                  className={`text-5xl font-black mt-4 ${
                    passed
                      ? 'text-emerald-600'
                      : 'text-red-600'
                  }`}
                >
                  {passed ? 'Pass' : 'Fail'}
                </div>

              </motion.div>

            </div>

          </div>

          {/* Chapter Recap */}
          <div className="grid grid-cols-4 gap-3">

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Boolean
              </div>

              <div className="mt-1 font-black text-slate-700">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Compare
              </div>

              <div className="mt-1 font-black text-slate-700">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                if
              </div>

              <div className="mt-1 font-black text-slate-700">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                else
              </div>

              <div className="mt-1 font-black text-slate-700">
                ✓
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Scene06_GradeCheckerProject;