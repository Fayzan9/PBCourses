import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene01_WhyProgramsNeedLoops: React.FC = () => {
  const [message, setMessage] = useState('Hello');
  const [count, setCount] = useState(5);

  const outputs = Array.from(
    { length: count },
    (_, index) => `${message} #${index + 1}`
  );

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 5.1 · Repeating Work Automatically
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Why Programs Need{' '}
          <span className="text-indigo-600 font-serif italic">
            Loops
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Imagine needing to print the same message many times. Loops
          let programs repeat work automatically.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[360px] shrink-0 flex flex-col gap-4">

          {/* Message Input */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Message To Print
            </div>

            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value || 'Hello')
              }
              className="w-full mt-3 px-3 py-2 border border-slate-200 rounded-xl font-bold"
            />

          </div>

          {/* Repeat Count */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Number Of Repetitions
            </div>

            <input
              type="range"
              min={1}
              max={20}
              value={count}
              onChange={(e) =>
                setCount(Number(e.target.value))
              }
              className="w-full mt-4"
            />

            <div className="mt-4 text-center text-5xl font-black text-indigo-600">
              {count}
            </div>

          </div>

          {/* Code */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Python Solution
            </div>

            <pre className="mt-3 text-sm font-mono font-bold text-slate-800 whitespace-pre-wrap">
{`for i in range(${count}):
    print("${message}")`}
            </pre>

          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            What The Loop Does
          </div>

          {/* Visual Flow */}
          <div className="flex-1 flex items-center justify-center">

            <div className="flex items-center gap-10">

              {/* Loop */}
              <div className="w-64 h-48 bg-white border-2 border-indigo-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Loop
                </div>

                <div className="mt-4 text-6xl font-black text-indigo-600">
                  {count}
                </div>

                <div className="mt-2 text-sm font-bold text-slate-500">
                  Repetitions
                </div>

              </div>

              <div className="text-6xl text-slate-300">
                →
              </div>

              {/* Output */}
              <div className="w-[420px] h-[340px] bg-white border-2 border-emerald-500 rounded-3xl p-4 overflow-y-auto">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Program Output
                </div>

                <div className="mt-4 flex flex-col gap-2">

                  {outputs.map((output, index) => (
                    <motion.div
                      key={`${output}-${index}`}
                      initial={{
                        opacity: 0,
                        x: -20
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-2 font-black text-emerald-700"
                    >
                      {output}
                    </motion.div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Message
              </div>

              <div className="mt-3 text-xl font-black text-slate-800 truncate">
                {message}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Repetitions
              </div>

              <div className="mt-3 text-xl font-black text-indigo-600">
                {count}
              </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">

              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Output Lines
              </div>

              <div className="mt-3 text-xl font-black text-emerald-600">
                {outputs.length}
              </div>

            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene01_WhyProgramsNeedLoops;