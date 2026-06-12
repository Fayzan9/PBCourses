import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene02_UserInput: React.FC = () => {
  const [userInput, setUserInput] = useState('Alice');

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 3.2 · Writing Real Python Programs
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Receiving{' '}
          <span className="text-indigo-600 font-serif italic">
            User Input
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Programs become interactive when they can receive information from users.
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
              <div>• input() waits for user input.</div>
              <div>• The user types a value.</div>
              <div>• Python stores the result in a variable.</div>
              <div>• Input always starts as text.</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Try It
            </div>

            <div className="mt-3">

              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your name..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-indigo-500"
              />

            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Flow
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-indigo-900">
              User
              <span>→</span>
              Keyboard
              <span>→</span>
              Program
              <span>→</span>
              Variable
            </div>
          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Interactive Simulation
          </div>

          <div className="flex-1 flex items-center justify-center">

            <div className="flex items-center gap-10">

              {/* Code */}
              <div className="w-72 bg-white border-2 border-indigo-500 rounded-2xl p-5">

                <div className="text-xs font-mono text-slate-400 uppercase mb-3">
                  Python Code
                </div>

                <pre className="font-mono text-sm font-bold text-slate-800 whitespace-pre-wrap">
{`name = input()

print(name)`}
                </pre>

              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Variable */}
              <motion.div
                key={userInput}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-72 bg-white border-2 border-emerald-500 rounded-2xl p-5"
              >
                <div className="text-xs font-mono text-slate-400 uppercase mb-3">
                  Variable Created
                </div>

                <div className="flex flex-col gap-3">

                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-400 font-mono">
                      Variable
                    </div>

                    <div className="text-lg font-black text-indigo-600">
                      name
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-400 font-mono">
                      Value
                    </div>

                    <div className="text-lg font-black text-emerald-600 break-all">
                      "{userInput}"
                    </div>
                  </div>

                </div>

              </motion.div>

            </div>

          </div>

          {/* Terminal */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden">

            <div className="px-4 py-2 bg-slate-800 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <div className="p-4 font-mono text-sm">
              <div className="text-cyan-400">
                Enter your name:
              </div>

              <div className="text-white">
                {userInput}
              </div>

              <div className="text-green-400 mt-2">
                {userInput}
              </div>
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene02_UserInput;