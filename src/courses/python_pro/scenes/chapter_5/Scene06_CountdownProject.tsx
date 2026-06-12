import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene06_CountdownProject: React.FC = () => {
  const [start, setStart] = useState(10);

  const numbers = Array.from(
    { length: start },
    (_, index) => start - index
  );

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 5.6 · Mini Project
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Countdown{' '}
          <span className="text-indigo-600 font-serif italic">
            Project
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Build a complete program using loops, range(), and loop
          variables to create a countdown.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}
        <div className="w-[360px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Program Code
            </div>

            <pre className="mt-3 text-xs font-mono font-bold text-slate-800 whitespace-pre-wrap">
{`for i in range(${start}, 0, -1):
    print(i)

print("Blast Off!")`}
            </pre>

          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Starting Number
            </div>

            <input
              type="range"
              min={3}
              max={20}
              value={start}
              onChange={(e) =>
                setStart(Number(e.target.value))
              }
              className="w-full mt-4"
            />

            <div className="mt-4 text-center text-5xl font-black text-indigo-600">
              {start}
            </div>

          </div>

          <div className="rounded-2xl p-4 border bg-indigo-50 border-indigo-100">

            <div className="text-xs font-mono font-bold uppercase text-indigo-600">
              Final Result
            </div>

            <div className="mt-3 text-3xl font-black text-indigo-700">
              Blast Off! 🚀
            </div>

          </div>

        </div>

        {/* Right */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Program Execution
          </div>

          <div className="flex-1 flex items-center justify-center">

            <div className="flex items-center gap-4 flex-wrap justify-center max-w-5xl">

              {numbers.map((number) => (
                <motion.div
                  key={number}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-24 h-24 rounded-3xl bg-white border-2 border-indigo-500 flex items-center justify-center"
                >
                  <span className="text-4xl font-black text-indigo-600">
                    {number}
                  </span>
                </motion.div>
              ))}

              <div className="w-40 h-24 rounded-3xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center">
                <span className="text-xl font-black text-emerald-600">
                  🚀 Blast Off!
                </span>
              </div>

            </div>

          </div>

          {/* Chapter Recap */}
          <div className="grid grid-cols-4 gap-3">

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Loops
              </div>

              <div className="mt-1 font-black text-slate-700">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                range()
              </div>

              <div className="mt-1 font-black text-slate-700">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Variable
              </div>

              <div className="mt-1 font-black text-slate-700">
                ✓
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Project
              </div>

              <div className="mt-1 font-black text-slate-700">
                ✓
              </div>
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene06_CountdownProject;