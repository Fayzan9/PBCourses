import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene01_WhyProgramsNeedDecisions: React.FC = () => {
  const [age, setAge] = useState(20);

  const isAdult = age >= 18;

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 4.1 · Making Programs Think
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Why Programs Need{' '}
          <span className="text-indigo-600 font-serif italic">
            Decisions
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Real programs don't always do the same thing. They make decisions based on data.
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
              <div>• Programs examine data.</div>
              <div>• Conditions are checked.</div>
              <div>• Different paths can run.</div>
              <div>• This is called decision making.</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Change The Age
            </div>

            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={100}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full"
              />

              <div className="mt-3 text-center text-4xl font-black text-indigo-600">
                {age}
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Current Result
            </div>

            <div className="mt-3 text-2xl font-black text-indigo-900">
              {isAdult ? 'Adult' : 'Minor'}
            </div>
          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Decision Flow
          </div>

          <div className="flex-1 flex items-center justify-center">

            <div className="flex items-center gap-8">

              {/* Input */}
              <div className="w-44 h-32 bg-white border-2 border-indigo-500 rounded-3xl flex flex-col items-center justify-center">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Variable
                </div>

                <div className="text-5xl font-black text-indigo-600 mt-2">
                  {age}
                </div>
              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Condition */}
              <div className="w-56 h-40 bg-white border-2 border-orange-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Condition
                </div>

                <div className="text-2xl font-black text-orange-600 mt-3">
                  age ≥ 18
                </div>

                <div className="mt-4 text-3xl font-black">
                  {isAdult ? (
                    <span className="text-emerald-600">
                      True
                    </span>
                  ) : (
                    <span className="text-red-600">
                      False
                    </span>
                  )}
                </div>

              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Result */}
              <motion.div
                key={String(isAdult)}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`w-52 h-40 rounded-3xl border-2 bg-white flex flex-col items-center justify-center ${
                  isAdult
                    ? 'border-emerald-500'
                    : 'border-red-500'
                }`}
              >
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Output
                </div>

                <div
                  className={`text-4xl font-black mt-3 ${
                    isAdult
                      ? 'text-emerald-600'
                      : 'text-red-600'
                  }`}
                >
                  {isAdult ? 'Adult' : 'Minor'}
                </div>
              </motion.div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Python Code
              </div>

              <pre className="mt-2 text-sm font-mono font-bold text-slate-800">
{`age = ${age}

if age >= 18:
    print("Adult")`}
              </pre>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Decision
              </div>

              <div className="mt-3 text-3xl font-black">
                {isAdult ? (
                  <span className="text-emerald-600">
                    True
                  </span>
                ) : (
                  <span className="text-red-600">
                    False
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene01_WhyProgramsNeedDecisions;