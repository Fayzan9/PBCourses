import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Mode = 'immutable' | 'mutable';

export const Scene05_MutableVsImmutable: React.FC = () => {
  const [mode, setMode] = useState<Mode>('immutable');

  const isImmutable = mode === 'immutable';

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 2.5 · Python Memory Model
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Mutable vs{' '}
          <span className="text-indigo-600 font-serif italic">
            Immutable
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Some objects can change after creation. Others cannot.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Choose Example
            </div>

            <div className="mt-3 flex flex-col gap-2">

              <button
                onClick={() => setMode('immutable')}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  isImmutable
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200'
                }`}
              >
                <div className="font-bold text-slate-800">
                  Immutable (int)
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  New object created
                </div>
              </button>

              <button
                onClick={() => setMode('mutable')}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  !isImmutable
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200'
                }`}
              >
                <div className="font-bold text-slate-800">
                  Mutable (list)
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  Existing object changes
                </div>
              </button>

            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Key Concept
            </div>

            <div className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <div>• int, str, bool are immutable.</div>
              <div>• list, dict, set are mutable.</div>
              <div>• Immutable = new object.</div>
              <div>• Mutable = same object changes.</div>
            </div>
          </div>

          <div
            className={`rounded-2xl p-4 border ${
              isImmutable
                ? 'bg-indigo-50 border-indigo-100'
                : 'bg-emerald-50 border-emerald-100'
            }`}
          >
            <div
              className={`text-xs font-mono font-bold uppercase ${
                isImmutable
                  ? 'text-indigo-600'
                  : 'text-emerald-600'
              }`}
            >
              Takeaway
            </div>

            <div className="mt-2 text-sm font-semibold text-slate-800">
              {isImmutable
                ? 'Changing an integer creates a new object.'
                : 'Appending to a list changes the existing object.'}
            </div>
          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Memory Visualization
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center"
            >
              {isImmutable ? (
                <div className="flex items-center gap-12">

                  {/* Before */}
                  <div className="flex flex-col items-center gap-4">

                    <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                      Before
                    </div>

                    <div className="w-44 h-28 rounded-2xl border-2 border-indigo-500 bg-white flex flex-col items-center justify-center">
                      <div className="text-sm text-slate-400">
                        x
                      </div>

                      <div className="text-4xl font-black text-indigo-600">
                        10
                      </div>
                    </div>
                  </div>

                  <div className="text-5xl text-slate-300">
                    →
                  </div>

                  {/* After */}
                  <div className="flex flex-col items-center gap-4">

                    <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                      After
                    </div>

                    <div className="w-44 h-28 rounded-2xl border-2 border-orange-500 bg-white flex flex-col items-center justify-center">
                      <div className="text-sm text-slate-400">
                        x
                      </div>

                      <div className="text-4xl font-black text-orange-600">
                        20
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex items-center gap-12">

                  {/* Before */}
                  <div className="flex flex-col items-center gap-4">

                    <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                      Before
                    </div>

                    <div className="w-52 h-28 rounded-2xl border-2 border-emerald-500 bg-white flex items-center justify-center">
                      <div className="text-3xl font-black text-emerald-600">
                        [1, 2]
                      </div>
                    </div>
                  </div>

                  <div className="text-5xl text-slate-300">
                    →
                  </div>

                  {/* After */}
                  <div className="flex flex-col items-center gap-4">

                    <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                      After
                    </div>

                    <div className="w-52 h-28 rounded-2xl border-2 border-emerald-500 bg-white flex items-center justify-center">
                      <div className="text-3xl font-black text-emerald-600">
                        [1, 2, 3]
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Code Comparison */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Immutable
              </div>

              <pre className="mt-2 text-xs font-mono text-slate-700">
{`x = 10
x = 20`}
              </pre>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Mutable
              </div>

              <pre className="mt-2 text-xs font-mono text-slate-700">
{`nums = [1,2]
nums.append(3)`}
              </pre>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Scene05_MutableVsImmutable;