import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

type FnKey = 'greet' | 'farewell' | 'divider';

const functions: Record<
  FnKey,
  {
    label: string;
    color: string;
    borderColor: string;
    bgColor: string;
    textColor: string;
    code: string;
    output: string[];
    description: string;
  }
> = {
  greet: {
    label: 'greet()',
    color: 'indigo',
    borderColor: 'border-indigo-500',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    code: `def greet():
    print("Hello!")
    print("Welcome back.")`,
    output: ['Hello!', 'Welcome back.'],
    description: 'Prints a friendly greeting to the user.',
  },
  farewell: {
    label: 'farewell()',
    color: 'emerald',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    code: `def farewell():
    print("Goodbye!")
    print("See you soon.")`,
    output: ['Goodbye!', 'See you soon.'],
    description: 'Prints a polite goodbye message.',
  },
  divider: {
    label: 'divider()',
    color: 'orange',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    code: `def divider():
    print("----------")
    print("~~~~~~~~~~")`,
    output: ['----------', '~~~~~~~~~~'],
    description: 'Prints a visual separator line.',
  },
};

const FN_KEYS: FnKey[] = ['greet', 'farewell', 'divider'];

export const Scene06_MultipleFunctions: React.FC = () => {
  const [active, setActive] = useState<FnKey>('greet');
  const [called, setCalled] = useState<FnKey[]>([]);

  const current = functions[active];

  const handleCall = () => {
    setCalled((prev) => [...prev, active]);
  };

  const reset = () => setCalled([]);

  return (
    <SceneLayout gap="gap-4">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 6.6 · Organising Code
        </span>

        <h2 className="text-3xl font-extrabold text-slate-800 mt-1">
          Multiple{' '}
          <span className="text-indigo-600 font-serif italic">
            Functions
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          A program can have as many functions as it needs — each one
          handles a specific job.
        </p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold uppercase text-slate-400">
              Select Function
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {FN_KEYS.map((key) => {
                const fn = functions[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    className={`rounded-xl border-2 p-3 text-left transition-all ${
                      active === key
                        ? `${fn.borderColor} ${fn.bgColor}`
                        : 'border-slate-200'
                    }`}
                  >
                    <div className={`font-black text-sm ${active === key ? fn.textColor : 'text-slate-700'}`}>
                      {fn.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {fn.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleCall}
            className={`w-full py-3 rounded-xl font-black text-white transition-all ${
              active === 'greet'
                ? 'bg-indigo-600'
                : active === 'farewell'
                ? 'bg-emerald-600'
                : 'bg-orange-500'
            }`}
          >
            Call {current.label}
          </button>

          <button
            onClick={reset}
            className="w-full py-2 rounded-xl font-black text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-sm"
          >
            Clear Output
          </button>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* All function definitions */}
          <div className="grid grid-cols-3 gap-3">
            {FN_KEYS.map((key) => {
              const fn = functions[key];
              const isActive = active === key;
              return (
                <motion.div
                  key={key}
                  animate={{ scale: isActive ? 1.02 : 1 }}
                  onClick={() => setActive(key)}
                  className={`rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                    isActive
                      ? `${fn.borderColor} ${fn.bgColor}`
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className={`text-xs font-mono font-bold uppercase ${isActive ? fn.textColor : 'text-slate-400'}`}>
                    Function
                  </div>
                  <div className={`text-lg font-black mt-1 ${isActive ? fn.textColor : 'text-slate-700'}`}>
                    {fn.label}
                  </div>
                  <pre className="mt-2 text-xs font-mono text-slate-600 whitespace-pre-wrap leading-relaxed">
                    {fn.code}
                  </pre>
                </motion.div>
              );
            })}
          </div>

          {/* Active function detail + output */}
          <div className="flex gap-3 flex-1 min-h-0">
            {/* Active detail */}
            <div className={`w-64 shrink-0 rounded-2xl border-2 p-4 ${current.borderColor} ${current.bgColor}`}>
              <div className={`text-xs font-mono font-bold uppercase ${current.textColor}`}>
                Active Function
              </div>

              <div className={`text-2xl font-black mt-2 ${current.textColor}`}>
                {current.label}
              </div>

              <div className="mt-3 text-sm font-semibold text-slate-700">
                {current.description}
              </div>

              <div className="mt-4">
                <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  Produces
                </div>
                {current.output.map((line, i) => (
                  <div key={i} className={`font-mono font-black text-sm ${current.textColor}`}>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Output terminal */}
            <div className="flex-1 bg-slate-900 rounded-2xl overflow-hidden flex flex-col">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="text-xs font-mono font-bold uppercase text-slate-400">
                  Program Output
                </div>
                <div className="text-xs font-mono text-slate-500">
                  {called.length} call{called.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {called.length === 0 ? (
                  <div className="text-slate-500 font-mono text-sm">
                    # select a function and call it
                  </div>
                ) : (
                  called.map((key, i) => {
                    const fn = functions[key];
                    const colors: Record<FnKey, string> = {
                      greet: 'text-indigo-400',
                      farewell: 'text-emerald-400',
                      divider: 'text-orange-400',
                    };
                    return (
                      <AnimatePresence key={i}>
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="mb-3"
                        >
                          <div className="text-[10px] font-mono text-slate-500 mb-1">
                            {fn.label} — call #{i + 1}
                          </div>
                          {fn.output.map((line, j) => (
                            <div
                              key={j}
                              className={`font-mono text-sm font-bold ${colors[key]}`}
                            >
                              {line}
                            </div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Key idea strip */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-8">
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400">
                  Functions Defined
                </div>
                <div className="mt-1 text-2xl font-black text-indigo-600">3</div>
              </div>

              <div className="text-3xl text-slate-300">·</div>

              <div className="flex-1 text-sm font-semibold text-slate-600">
                Each function has one job. You decide when to call each one — in
                any order, as many times as needed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene06_MultipleFunctions;
