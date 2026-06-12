import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene01_PrintFunction: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      code: `print("Hello World")`,
      output: 'Hello World'
    },
    {
      code: `name = "Alice"\nprint(name)`,
      output: 'Alice'
    },
    {
      code: `age = 25\nprint(age)`,
      output: '25'
    },
    {
      code: `name = "Alice"\nage = 25\nprint(name, age)`,
      output: 'Alice 25'
    }
  ];

  const current = examples[selectedExample];

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 3.1 · Writing Real Python Programs
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Output with{' '}
          <span className="text-indigo-600 font-serif italic">
            print()
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          The print() function sends information from your program to the screen.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Key Concept
            </div>

            <div className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <div>• print() displays output.</div>
              <div>• Strings appear as text.</div>
              <div>• Variables can be printed.</div>
              <div>• Multiple values can be printed.</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Examples
            </div>

            <div className="mt-3 flex flex-col gap-2">

              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`text-left p-3 rounded-xl border-2 transition-all ${
                    selectedExample === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <pre className="font-mono text-xs whitespace-pre-wrap">
                    {example.code}
                  </pre>
                </button>
              ))}

            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Program Execution
          </div>

          <motion.div
            key={selectedExample}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex items-center gap-10">

              {/* Code */}
              <div className="w-72 bg-white border-2 border-indigo-500 rounded-2xl p-5">
                <div className="text-xs font-mono text-slate-400 uppercase mb-3">
                  Python Code
                </div>

                <pre className="font-mono text-sm font-bold text-slate-800 whitespace-pre-wrap">
                  {current.code}
                </pre>
              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Terminal */}
              <div className="w-72 bg-slate-900 rounded-2xl overflow-hidden">

                <div className="px-4 py-2 bg-slate-800 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="p-5 min-h-[180px]">
                  <div className="text-xs text-slate-500 font-mono mb-3">
                    Terminal Output
                  </div>

                  <div className="text-green-400 font-mono text-xl font-bold">
                    {current.output}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
              Takeaway
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              print() is the primary way a Python program communicates with the user.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Scene01_PrintFunction;