import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene05_FunctionsCanRunManyTimes: React.FC = () => {
  const [callCount, setCallCount] = useState(0);

  const MAX = 6;

  const addCall = () => {
    if (callCount < MAX) setCallCount((c) => c + 1);
  };

  const reset = () => setCallCount(0);

  return (
    <SceneLayout gap="gap-4">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 6.5 · Reusing Functions
        </span>

        <h2 className="text-3xl font-extrabold text-slate-800 mt-1">
          Functions Can Run{' '}
          <span className="text-indigo-600 font-serif italic">
            Many Times
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          One definition, unlimited calls — each call runs the same code
          from scratch.
        </p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Controls
            </div>

            <button
              onClick={addCall}
              disabled={callCount >= MAX}
              className="w-full mt-3 py-3 rounded-xl font-black text-white bg-indigo-600 disabled:opacity-40 transition-all"
            >
              Call show_banner()
            </button>

            <button
              onClick={reset}
              className="w-full mt-2 py-3 rounded-xl font-black text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              Reset
            </button>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold uppercase text-indigo-600">
              Call Count
            </div>

            <div className="mt-2 text-5xl font-black text-indigo-700">
              {callCount}
            </div>

            <div className="mt-1 text-sm font-semibold text-indigo-500">
              {callCount === 0
                ? 'No calls yet'
                : callCount === 1
                ? '1 execution'
                : `${callCount} executions`}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Key Idea
            </div>

            <div className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
              <div>• Define once with <span className="font-mono text-indigo-600">def</span></div>
              <div>• Call as many times as needed</div>
              <div>• Each call starts fresh</div>
              <div>• No extra code required</div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Code + output */}
          <div className="grid grid-cols-2 gap-3">
            {/* Code */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                <div className="text-xs font-mono font-bold uppercase text-slate-400">
                  Python Code
                </div>
              </div>

              <div className="p-4">
                <pre className="font-mono text-sm font-bold text-slate-800 whitespace-pre-wrap">{`def show_banner():
    print("Welcome")
    print("----------")

${callCount === 0
  ? '# call it below ↓'
  : Array.from({ length: callCount }, () => 'show_banner()').join('\n')}`}</pre>
              </div>
            </div>

            {/* Output log */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden flex flex-col">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
                <div className="text-xs font-mono font-bold uppercase text-slate-400">
                  Output
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {callCount === 0 ? (
                  <div className="text-slate-500 font-mono text-sm">
                    # nothing printed yet
                  </div>
                ) : (
                  Array.from({ length: callCount }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-3"
                    >
                      <div className="text-[10px] font-mono text-slate-500 mb-1">
                        Call #{i + 1}
                      </div>
                      <div className="font-mono text-sm font-bold text-emerald-400">
                        Welcome
                      </div>
                      <div className="font-mono text-sm font-bold text-emerald-400">
                        ----------
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Visual call timeline */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex-1">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Execution Timeline
            </div>

            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <div className="w-36 h-16 rounded-2xl bg-white border-2 border-indigo-500 flex flex-col items-center justify-center shrink-0">
                <div className="text-[10px] uppercase font-mono text-slate-400">
                  Definition
                </div>
                <div className="text-sm font-black text-indigo-600 mt-0.5">
                  show_banner
                </div>
              </div>

              <div className="text-3xl text-slate-300 shrink-0">→</div>

              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {Array.from({ length: callCount }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-500 flex flex-col items-center justify-center"
                    >
                      <div className="text-[9px] font-mono text-slate-400 uppercase">
                        Call
                      </div>
                      <div className="text-lg font-black text-emerald-600">
                        {i + 1}
                      </div>
                    </motion.div>
                  ))}
                  {callCount === 0 && (
                    <div className="text-sm font-semibold text-slate-400 italic self-center">
                      Press "Call show_banner()" to start
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Definitions
              </div>
              <div className="mt-1 font-black text-2xl text-indigo-600">1</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Calls Made
              </div>
              <div className="mt-1 font-black text-2xl text-emerald-600">
                {callCount}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Lines Saved
              </div>
              <div className="mt-1 font-black text-2xl text-orange-500">
                {callCount > 1 ? (callCount - 1) * 2 : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene05_FunctionsCanRunManyTimes;
