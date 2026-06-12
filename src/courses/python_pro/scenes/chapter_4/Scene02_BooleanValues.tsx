import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene02_BooleanValues: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      expression: '5 > 2',
      result: true
    },
    {
      expression: '10 < 3',
      result: false
    },
    {
      expression: '7 == 7',
      result: true
    },
    {
      expression: '4 != 4',
      result: false
    }
  ];

  const current = examples[selectedExample];

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 4.2 · Making Programs Think
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Boolean{' '}
          <span className="text-indigo-600 font-serif italic">
            Values
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Every decision in Python eventually becomes either True or False.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Key Concept
            </div>

            <div className="mt-3 flex flex-col gap-2 text-xs font-semibold text-slate-600">
              <div>• Boolean means True or False.</div>
              <div>• Conditions produce booleans.</div>
              <div>• if statements use booleans.</div>
              <div>• Decisions start with booleans.</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Try Examples
            </div>

            <div className="mt-3 flex flex-col gap-2">

              {examples.map((example, index) => (
                <button
                  key={example.expression}
                  onClick={() => setSelectedExample(index)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedExample === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <span className="font-mono font-bold">
                    {example.expression}
                  </span>
                </button>
              ))}

            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Python Has Only Two Boolean Values
            </div>

            <div className="mt-3 flex gap-3">
              <div className="flex-1 rounded-xl bg-white p-3 text-center border border-indigo-100">
                <div className="text-emerald-600 font-black text-xl">
                  True
                </div>
              </div>

              <div className="flex-1 rounded-xl bg-white p-3 text-center border border-indigo-100">
                <div className="text-red-600 font-black text-xl">
                  False
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Boolean Evaluation
          </div>

          <motion.div
            key={selectedExample}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex items-center gap-10">

              {/* Expression */}
              <div className="w-72 h-56 rounded-3xl bg-white border-2 border-orange-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Expression
                </div>

                <div className="text-5xl font-black text-orange-600 mt-5">
                  {current.expression}
                </div>

              </div>

              <div className="text-6xl text-slate-300">
                →
              </div>

              {/* Result */}
              <div
                className={`w-72 h-56 rounded-3xl bg-white border-2 flex flex-col items-center justify-center ${
                  current.result
                    ? 'border-emerald-500'
                    : 'border-red-500'
                }`}
              >
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Boolean Result
                </div>

                <div
                  className={`text-6xl font-black mt-5 ${
                    current.result
                      ? 'text-emerald-600'
                      : 'text-red-600'
                  }`}
                >
                  {current.result ? 'True' : 'False'}
                </div>

              </div>

            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Python Code
              </div>

              <pre className="mt-2 text-sm font-mono font-bold text-slate-800">
{current.expression}
              </pre>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Evaluates To
              </div>

              <div
                className={`mt-3 text-3xl font-black ${
                  current.result
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {current.result ? 'True' : 'False'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Scene02_BooleanValues;