import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene03_ComparisonOperators: React.FC = () => {
  const [left, setLeft] = useState(10);
  const [right, setRight] = useState(5);
  const [operator, setOperator] = useState<
    '==' | '!=' | '>' | '<' | '>=' | '<='
  >('>');

  const evaluate = () => {
    switch (operator) {
      case '==':
        return left === right;
      case '!=':
        return left !== right;
      case '>':
        return left > right;
      case '<':
        return left < right;
      case '>=':
        return left >= right;
      case '<=':
        return left <= right;
    }
  };

  const result = evaluate();

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 4.3 · Making Programs Think
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Comparison{' '}
          <span className="text-indigo-600 font-serif italic">
            Operators
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Comparison operators compare two values and produce either
          True or False.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Operators
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">

              {[
                '==',
                '!=',
                '>',
                '<',
                '>=',
                '<='
              ].map((op) => (
                <button
                  key={op}
                  onClick={() =>
                    setOperator(
                      op as
                        | '=='
                        | '!='
                        | '>'
                        | '<'
                        | '>='
                        | '<='
                    )
                  }
                  className={`py-3 rounded-xl border-2 font-black transition-all ${
                    operator === op
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {op}
                </button>
              ))}

            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Compare Values
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

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Remember
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              Comparisons always produce a boolean value.
            </div>

          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Comparison Playground
          </div>

          <motion.div
            key={`${left}${operator}${right}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex items-center gap-8">

              <div className="w-32 h-32 bg-white border-2 border-slate-300 rounded-3xl flex items-center justify-center">
                <span className="text-5xl font-black text-slate-800">
                  {left}
                </span>
              </div>

              <div className="text-5xl font-black text-indigo-600">
                {operator}
              </div>

              <div className="w-32 h-32 bg-white border-2 border-slate-300 rounded-3xl flex items-center justify-center">
                <span className="text-5xl font-black text-slate-800">
                  {right}
                </span>
              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              <div
                className={`w-56 h-40 bg-white border-2 rounded-3xl flex flex-col items-center justify-center ${
                  result
                    ? 'border-emerald-500'
                    : 'border-red-500'
                }`}
              >
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Result
                </div>

                <div
                  className={`text-5xl font-black mt-3 ${
                    result
                      ? 'text-emerald-600'
                      : 'text-red-600'
                  }`}
                >
                  {result ? 'True' : 'False'}
                </div>

              </div>

            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Expression
              </div>

              <div className="mt-3 text-xl font-black text-slate-800 font-mono">
                {left} {operator} {right}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Type
              </div>

              <div className="mt-3 text-xl font-black text-indigo-600">
                bool
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Value
              </div>

              <div
                className={`mt-3 text-xl font-black ${
                  result
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {String(result)}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Scene03_ComparisonOperators;