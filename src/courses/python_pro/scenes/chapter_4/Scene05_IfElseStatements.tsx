import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene05_IfElseStatements: React.FC = () => {
  const [age, setAge] = useState(15);

  const isAdult = age >= 18;

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 4.5 · Making Programs Think
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          if / else{' '}
          <span className="text-indigo-600 font-serif italic">
            Statements
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          When one path is True, the other path automatically becomes False.
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
              <div>• if handles True.</div>
              <div>• else handles False.</div>
              <div>• Exactly one branch runs.</div>
              <div>• Programs can choose between paths.</div>
            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Change Age
            </div>

            <input
              type="range"
              min={0}
              max={40}
              value={age}
              onChange={(e) =>
                setAge(Number(e.target.value))
              }
              className="w-full mt-4"
            />

            <div className="mt-4 text-center text-5xl font-black text-indigo-600">
              {age}
            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Current Result
            </div>

            <div
              className={`mt-3 text-3xl font-black ${
                isAdult
                  ? 'text-emerald-600'
                  : 'text-orange-600'
              }`}
            >
              {isAdult ? 'Adult' : 'Minor'}
            </div>

          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Branching Logic
          </div>

          <div className="flex-1 flex items-center justify-center">

            <div className="flex flex-col items-center">

              {/* Condition */}
              <div className="w-72 h-32 rounded-3xl bg-white border-2 border-orange-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Condition
                </div>

                <div className="text-3xl font-black text-orange-600 mt-2">
                  age ≥ 18
                </div>

              </div>

              <div className="text-5xl text-slate-300 my-2">
                ↓
              </div>

              {/* Branches */}
              <div className="flex gap-12">

                <motion.div
                  animate={{
                    scale: isAdult ? 1.05 : 1,
                    opacity: isAdult ? 1 : 0.35
                  }}
                  className={`w-64 h-40 rounded-3xl bg-white border-2 flex flex-col items-center justify-center ${
                    isAdult
                      ? 'border-emerald-500'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    if Branch
                  </div>

                  <div className="text-2xl font-black text-emerald-600 mt-3">
                    Adult
                  </div>

                  <div className="mt-2 text-sm font-bold text-slate-500">
                    Runs when True
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    scale: !isAdult ? 1.05 : 1,
                    opacity: !isAdult ? 1 : 0.35
                  }}
                  className={`w-64 h-40 rounded-3xl bg-white border-2 flex flex-col items-center justify-center ${
                    !isAdult
                      ? 'border-orange-500'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    else Branch
                  </div>

                  <div className="text-2xl font-black text-orange-600 mt-3">
                    Minor
                  </div>

                  <div className="mt-2 text-sm font-bold text-slate-500">
                    Runs when False
                  </div>
                </motion.div>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Python Code
              </div>

              <pre className="mt-3 text-sm font-mono font-bold text-slate-800 whitespace-pre-wrap">
{`age = ${age}

if age >= 18:
    print("Adult")
else:
    print("Minor")`}
              </pre>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Output
              </div>

              <div
                className={`mt-4 text-4xl font-black ${
                  isAdult
                    ? 'text-emerald-600'
                    : 'text-orange-600'
                }`}
              >
                {isAdult ? 'Adult' : 'Minor'}
              </div>

            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene05_IfElseStatements;