import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export const Scene05_ExpressionsAndOperators: React.FC = () => {
  const [left, setLeft] = useState(10);
  const [right, setRight] = useState(5);
  const [operator, setOperator] = useState<
    '+' | '-' | '*' | '/'
  >('+');

  const result = useMemo(() => {
    switch (operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return right === 0 ? 'Error' : left / right;
    }
  }, [left, right, operator]);

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 3.5 · Writing Real Python Programs
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Expressions &{' '}
          <span className="text-indigo-600 font-serif italic">
            Operators
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Expressions combine values and operators to produce a result.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Key Concept
            </div>

            <div className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <div>• Expressions produce values.</div>
              <div>• Operators perform actions.</div>
              <div>• Python evaluates expressions.</div>
              <div>• The result can be stored in variables.</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Build An Expression
            </div>

            <div className="mt-3 flex flex-col gap-3">

              <input
                type="number"
                value={left}
                onChange={(e) =>
                  setLeft(Number(e.target.value))
                }
                className="px-3 py-2 border border-slate-200 rounded-xl font-bold"
              />

              <select
                value={operator}
                onChange={(e) =>
                  setOperator(
                    e.target.value as '+' | '-' | '*' | '/'
                  )
                }
                className="px-3 py-2 border border-slate-200 rounded-xl font-bold"
              >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
              </select>

              <input
                type="number"
                value={right}
                onChange={(e) =>
                  setRight(Number(e.target.value))
                }
                className="px-3 py-2 border border-slate-200 rounded-xl font-bold"
              />

            </div>
          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Expression Evaluation
          </div>

          <motion.div
            key={`${left}${operator}${right}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex items-center gap-8">

              <div className="w-32 h-32 rounded-3xl bg-white border-2 border-slate-300 flex items-center justify-center">
                <span className="text-4xl font-black text-slate-700">
                  {left}
                </span>
              </div>

              <div className="text-5xl font-black text-indigo-600">
                {operator}
              </div>

              <div className="w-32 h-32 rounded-3xl bg-white border-2 border-slate-300 flex items-center justify-center">
                <span className="text-4xl font-black text-slate-700">
                  {right}
                </span>
              </div>

              <div className="text-5xl text-slate-300">
                =
              </div>

              <div className="w-40 h-40 rounded-3xl bg-white border-2 border-indigo-500 flex items-center justify-center">
                <span className="text-5xl font-black text-indigo-600">
                  {result}
                </span>
              </div>

            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Python Code
              </div>

              <pre className="mt-2 text-sm font-mono font-bold text-slate-800">
{`result = ${left} ${operator} ${right}`}
              </pre>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Evaluated Result
              </div>

              <div className="mt-3 text-3xl font-black text-indigo-700">
                {result}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Scene05_ExpressionsAndOperators;