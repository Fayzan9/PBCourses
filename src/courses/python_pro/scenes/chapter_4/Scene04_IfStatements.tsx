import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene04_IfStatements: React.FC = () => {
  const [temperature, setTemperature] = useState(35);

  const condition = temperature > 30;

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 4.4 · Making Programs Think
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          if{' '}
          <span className="text-indigo-600 font-serif italic">
            Statements
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          An if statement runs code only when its condition is True.
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
              <div>• Python evaluates a condition.</div>
              <div>• If the condition is True, code runs.</div>
              <div>• If the condition is False, code is skipped.</div>
              <div>• This creates decision making.</div>
            </div>

          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Temperature
            </div>

            <input
              type="range"
              min={0}
              max={50}
              value={temperature}
              onChange={(e) =>
                setTemperature(Number(e.target.value))
              }
              className="w-full mt-4"
            />

            <div className="mt-4 text-center text-5xl font-black text-indigo-600">
              {temperature}°
            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Condition
            </div>

            <div
              className={`mt-3 text-3xl font-black ${
                condition
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}
            >
              {condition ? 'True' : 'False'}
            </div>

          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Decision Flow
          </div>

          <div className="flex-1 flex items-center justify-center">

            <div className="flex items-center gap-10">

              {/* Condition Box */}
              <div className="w-72 h-48 rounded-3xl bg-white border-2 border-orange-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Condition
                </div>

                <div className="text-3xl font-black text-orange-600 mt-4">
                  temp &gt; 30
                </div>

                <div
                  className={`text-4xl font-black mt-4 ${
                    condition
                      ? 'text-emerald-600'
                      : 'text-red-600'
                  }`}
                >
                  {condition ? 'True' : 'False'}
                </div>

              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Output */}
              <motion.div
                key={String(condition)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-72 h-48 rounded-3xl bg-white border-2 flex flex-col items-center justify-center ${
                  condition
                    ? 'border-emerald-500'
                    : 'border-slate-300'
                }`}
              >
                <div className="text-xs font-mono text-slate-400 uppercase">
                  if Block
                </div>

                {condition ? (
                  <div className="text-4xl font-black text-emerald-600 mt-4">
                    RUNS ✓
                  </div>
                ) : (
                  <div className="text-4xl font-black text-slate-300 mt-4">
                    SKIPPED
                  </div>
                )}

              </motion.div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Python Code
              </div>

              <pre className="mt-3 text-sm font-mono font-bold text-slate-800 whitespace-pre-wrap">
{`temperature = ${temperature}

if temperature > 30:
    print("Hot")`}
              </pre>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Output
              </div>

              <div className="mt-4 text-3xl font-black">

                {condition ? (
                  <span className="text-emerald-600">
                    Hot
                  </span>
                ) : (
                  <span className="text-slate-300">
                    No Output
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

export default Scene04_IfStatements;