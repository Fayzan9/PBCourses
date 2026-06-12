import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene06_MiniCalculatorProject: React.FC = () => {
  const [firstNumber, setFirstNumber] = useState('10');
  const [secondNumber, setSecondNumber] = useState('5');

  const result = useMemo(() => {
    const a = Number(firstNumber);
    const b = Number(secondNumber);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      return 'Invalid Input';
    }

    return a + b;
  }, [firstNumber, secondNumber]);

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 3.6 · Mini Project
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Build A{' '}
          <span className="text-indigo-600 font-serif italic">
            Calculator
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          This project combines input, variables, type conversion,
          expressions, and output into one complete program.
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
{`first = input()
second = input()

first = int(first)
second = int(second)

result = first + second

print(result)`}
            </pre>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Try It
            </div>

            <div className="mt-3 flex flex-col gap-3">

              <input
                value={firstNumber}
                onChange={(e) =>
                  setFirstNumber(e.target.value)
                }
                placeholder="First number"
                className="px-3 py-2 rounded-xl border border-slate-200 font-bold"
              />

              <input
                value={secondNumber}
                onChange={(e) =>
                  setSecondNumber(e.target.value)
                }
                placeholder="Second number"
                className="px-3 py-2 rounded-xl border border-slate-200 font-bold"
              />

            </div>
          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Program Flow
          </div>

          <div className="flex-1 flex items-center justify-center">

            <div className="flex items-center gap-8">

              {/* Input */}
              <motion.div
                key={`${firstNumber}-${secondNumber}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-52 bg-white border-2 border-orange-500 rounded-3xl p-5"
              >
                <div className="text-xs font-mono text-slate-400 uppercase">
                  User Input
                </div>

                <div className="mt-4 text-center">

                  <div className="text-3xl font-black text-orange-600">
                    "{firstNumber}"
                  </div>

                  <div className="mt-2 text-3xl font-black text-orange-600">
                    "{secondNumber}"
                  </div>

                </div>
              </motion.div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Conversion */}
              <div className="w-52 bg-white border-2 border-indigo-500 rounded-3xl p-5">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  int()
                </div>

                <div className="mt-4 text-center">

                  <div className="text-3xl font-black text-indigo-600">
                    {Number(firstNumber) || 0}
                  </div>

                  <div className="mt-2 text-3xl font-black text-indigo-600">
                    {Number(secondNumber) || 0}
                  </div>

                </div>
              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Result */}
              <div className="w-56 bg-white border-2 border-emerald-500 rounded-3xl p-5">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Output
                </div>

                <div className="mt-6 text-center">
                  <div className="text-5xl font-black text-emerald-600">
                    {result}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Chapter Review */}
          <div className="grid grid-cols-5 gap-3">

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Input
              </div>

              <div className="font-black text-slate-700 mt-1">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Variables
              </div>

              <div className="font-black text-slate-700 mt-1">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Types
              </div>

              <div className="font-black text-slate-700 mt-1">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Expressions
              </div>

              <div className="font-black text-slate-700 mt-1">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Output
              </div>

              <div className="font-black text-slate-700 mt-1">
                ✓
              </div>
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene06_MiniCalculatorProject;