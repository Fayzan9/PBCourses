import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

type Example =
  | 'even'
  | 'greaterThan'
  | 'multipleOf3'
  | 'lastDigit';

export const Scene05_LoopsWithConditions: React.FC = () => {
  const [example, setExample] =
    useState<Example>('even');

  const numbers = Array.from(
    { length: 15 },
    (_, index) => index
  );

  const getConfig = () => {
    switch (example) {
      case 'even':
        return {
          title: 'Even Numbers',
          code: `for i in range(15):
    if i % 2 == 0:
        print(i)`,
          description:
            'Only numbers divisible by 2 are printed.',
          check: (n: number) => n % 2 === 0,
          result: 'Even'
        };

      case 'greaterThan':
        return {
          title: 'Greater Than 7',
          code: `for i in range(15):
    if i > 7:
        print(i)`,
          description:
            'Only numbers larger than 7 are printed.',
          check: (n: number) => n > 7,
          result: '> 7'
        };

      case 'multipleOf3':
        return {
          title: 'Multiples of 3',
          code: `for i in range(15):
    if i % 3 == 0:
        print(i)`,
          description:
            'Only numbers divisible by 3 are printed.',
          check: (n: number) => n % 3 === 0,
          result: '×3'
        };

      case 'lastDigit':
        return {
          title: 'Numbers Ending In 5',
          code: `for i in range(15):
    if i % 10 == 5:
        print(i)`,
          description:
            'Only numbers whose last digit is 5 are printed.',
          check: (n: number) => n % 10 === 5,
          result: 'Ends 5'
        };
    }
  };

  const config = getConfig();

  const matches = numbers.filter(config.check);

  return (
    <SceneLayout gap="gap-4">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 5.5 · Repeating Work Automatically
        </span>

        <h2 className="text-3xl font-extrabold text-slate-800 mt-1">
          Loops with{' '}
          <span className="text-indigo-600 font-serif italic">
            Conditions
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          A loop can examine every value. An if statement decides
          which values should produce output.
        </p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">

        {/* Left */}
        <div className="w-[350px] shrink-0 flex flex-col gap-3">

          {/* Example Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Choose Example
            </div>

            <div className="mt-3 flex flex-col gap-2">

              {[
                {
                  id: 'even',
                  label: 'Even Numbers'
                },
                {
                  id: 'greaterThan',
                  label: 'Greater Than 7'
                },
                {
                  id: 'multipleOf3',
                  label: 'Multiples Of 3'
                },
                {
                  id: 'lastDigit',
                  label: 'Ending In 5'
                }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setExample(
                      item.id as Example
                    )
                  }
                  className={`p-3 rounded-xl border-2 text-left font-bold transition-all ${
                    example === item.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}

            </div>

          </div>

          {/* Code */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Python Code
            </div>

            <pre className="mt-3 text-xs font-mono font-bold text-slate-800 whitespace-pre-wrap">
{config.code}
            </pre>

          </div>

          {/* Explanation */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold uppercase text-indigo-600">
              What Is Happening?
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              {config.description}
            </div>

          </div>

        </div>

        {/* Right */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">

          {/* Main Visualizer */}
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-5">

            <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Loop Execution
            </div>

            <div className="mt-5 grid grid-cols-5 gap-3">

              {numbers.map((number) => {
                const passed =
                  config.check(number);

                return (
                  <motion.div
                    key={number}
                    initial={{
                      opacity: 0,
                      scale: 0.9
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    className={`rounded-2xl border-2 p-3 text-center ${
                      passed
                        ? 'bg-emerald-50 border-emerald-500'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    <div className="text-3xl font-black text-slate-800">
                      {number}
                    </div>

                    <div
                      className={`mt-2 text-xs font-black uppercase ${
                        passed
                          ? 'text-emerald-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {passed
                        ? 'PRINT'
                        : 'SKIP'}
                    </div>
                  </motion.div>
                );
              })}

            </div>

          </div>

          {/* Output */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5">

            <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Program Output
            </div>

            <div className="mt-4 flex flex-wrap gap-3">

              {matches.map((value) => (
                <motion.div
                  key={value}
                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  className="px-5 py-3 rounded-2xl bg-emerald-50 border border-emerald-200"
                >
                  <span className="text-xl font-black text-emerald-600">
                    {value}
                  </span>
                </motion.div>
              ))}

            </div>

          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">

              <div className="text-[10px] font-mono uppercase text-slate-400">
                Checked
              </div>

              <div className="mt-1 text-2xl font-black text-slate-800">
                {numbers.length}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">

              <div className="text-[10px] font-mono uppercase text-slate-400">
                Printed
              </div>

              <div className="mt-1 text-2xl font-black text-emerald-600">
                {matches.length}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">

              <div className="text-[10px] font-mono uppercase text-slate-400">
                Rule
              </div>

              <div className="mt-1 text-lg font-black text-indigo-600">
                {config.result}
              </div>

            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene05_LoopsWithConditions;