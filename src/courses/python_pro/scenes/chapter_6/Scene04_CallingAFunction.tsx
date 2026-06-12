import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene04_CallingAFunction: React.FC = () => {
  const [called, setCalled] = useState(false);

  return (
    <SceneLayout gap="gap-4">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 6.4 · Using Functions
        </span>

        <h2 className="text-3xl font-extrabold text-slate-800 mt-1">
          Calling{' '}
          <span className="text-indigo-600 font-serif italic">
            Functions
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Creating a function does not run it. Calling it runs the code
          inside it.
        </p>
      </div>

      <div className="flex-1 flex gap-3 min-h-0">
        {/* Left */}
        <div className="w-[300px] shrink-0 flex flex-col gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Try It
            </div>

            <button
              onClick={() => setCalled((v) => !v)}
              className={`w-full mt-3 py-3 rounded-xl font-black text-white transition-all ${
                called
                  ? 'bg-emerald-600'
                  : 'bg-indigo-600'
              }`}
            >
              {called
                ? 'show_banner() Called'
                : 'Call Function'}
            </button>
          </div>

          <div
            className={`rounded-2xl border p-4 ${
              called
                ? 'bg-emerald-50 border-emerald-100'
                : 'bg-orange-50 border-orange-100'
            }`}
          >
            <div
              className={`text-xs font-mono font-bold uppercase ${
                called
                  ? 'text-emerald-600'
                  : 'text-orange-600'
              }`}
            >
              Program State
            </div>

            <div className="mt-2 text-xl font-black text-slate-800">
              {called ? 'Executing' : 'Waiting'}
            </div>

            <div className="mt-2 text-sm font-semibold text-slate-600">
              {called
                ? 'Python entered the function.'
                : 'Function exists in memory.'}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Remember
            </div>

            <div className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
              <div>• def creates a function</div>
              <div>• () calls a function</div>
              <div>• Call = execute code</div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Code + Memory */}
          <div className="grid grid-cols-2 gap-3">
            {/* Code */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                <div className="text-xs font-mono font-bold uppercase text-slate-400">
                  Python Code
                </div>
              </div>

              <div className="p-4">
                <pre className="font-mono text-sm font-bold text-slate-800 whitespace-pre-wrap">
{`def show_banner():
    print("Welcome")
    print("----------")

show_banner()`}
                </pre>
              </div>
            </div>

            {/* Function Object */}
            <motion.div
              animate={{
                scale: called ? 1.02 : 1
              }}
              className={`rounded-2xl border-2 p-4 ${
                called
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-indigo-500 bg-indigo-50'
              }`}
            >
              <div className="text-xs font-mono font-bold uppercase text-slate-500">
                Function Object
              </div>

              <div className="mt-3 text-2xl font-black text-slate-800">
                show_banner
              </div>

              <div className="mt-3 font-mono text-sm bg-white border rounded-lg px-3 py-2 inline-block">
                0xF81A
              </div>

              <div className="mt-3 text-sm font-semibold text-slate-600">
                Stored in memory waiting to be called.
              </div>
            </motion.div>
          </div>

          {/* Execution Flow */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex-1">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Execution Flow
            </div>

            <div className="mt-5 flex items-center justify-center gap-5">
              <div className="w-52 h-24 rounded-2xl bg-white border-2 border-indigo-500 flex flex-col items-center justify-center">
                <div className="text-[10px] uppercase font-mono text-slate-400">
                  Function
                </div>

                <div className="text-xl font-black text-indigo-600 mt-1">
                  show_banner
                </div>
              </div>

              <div className="text-4xl text-slate-300">
                →
              </div>

              <motion.div
                animate={{
                  scale: called ? 1.04 : 1
                }}
                className={`w-52 h-24 rounded-2xl border-2 flex flex-col items-center justify-center ${
                  called
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-300 bg-white'
                }`}
              >
                <div className="text-[10px] uppercase font-mono text-slate-400">
                  Function Call
                </div>

                <div
                  className={`text-xl font-black mt-1 ${
                    called
                      ? 'text-emerald-600'
                      : 'text-slate-400'
                  }`}
                >
                  {called
                    ? 'RUNNING'
                    : 'WAITING'}
                </div>
              </motion.div>

              <div className="text-4xl text-slate-300">
                →
              </div>

              <div className="w-60 h-24 rounded-2xl border-2 border-orange-500 bg-white flex flex-col items-center justify-center">
                <div className="text-[10px] uppercase font-mono text-slate-400">
                  Output
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={String(called)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-center"
                  >
                    {called ? (
                      <div className="text-sm font-black text-orange-600">
                        Welcome
                      </div>
                    ) : (
                      <div className="text-sm font-black text-slate-300">
                        No Output
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Define
              </div>

              <div className="mt-1 font-black text-slate-700">
                def
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Call
              </div>

              <div className="mt-1 font-black text-slate-700">
                ()
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Result
              </div>

              <div className="mt-1 font-black text-slate-700">
                Execute
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene04_CallingAFunction;