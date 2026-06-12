import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene02_WhatIsAFunction: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<
    'def' | 'name' | 'brackets' | 'colon'
  >('def');

  const parts = {
    def: {
      label: 'def',
      color: 'text-red-500',
      explanation:
        'def tells Python that we are creating a new function.'
    },
    name: {
      label: 'show_banner',
      color: 'text-indigo-600',
      explanation:
        'This is the function name. We use it later to run the function.'
    },
    brackets: {
      label: '()',
      color: 'text-emerald-600',
      explanation:
        'Parentheses hold inputs (parameters). For now they are empty.'
    },
    colon: {
      label: ':',
      color: 'text-orange-500',
      explanation:
        'The colon starts the function body.'
    }
  };

  const current = parts[selectedPart];

  return (
    <SceneLayout gap="gap-4">

      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 6.2 · Creating Your Own Commands
        </span>

        <h2 className="text-3xl font-extrabold text-slate-800 mt-1">
          What Is A{' '}
          <span className="text-indigo-600 font-serif italic">
            Function
          </span>
          ?
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          A function is a reusable block of code. Before using one,
          let's understand every piece of a function definition.
        </p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Explore The Parts
            </div>

            <div className="mt-3 flex flex-col gap-2">

              <button
                onClick={() => setSelectedPart('def')}
                className={`p-3 rounded-xl border-2 text-left font-black ${
                  selectedPart === 'def'
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-slate-200'
                }`}
              >
                def
              </button>

              <button
                onClick={() => setSelectedPart('name')}
                className={`p-3 rounded-xl border-2 text-left font-black ${
                  selectedPart === 'name'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                    : 'border-slate-200'
                }`}
              >
                Function Name
              </button>

              <button
                onClick={() =>
                  setSelectedPart('brackets')
                }
                className={`p-3 rounded-xl border-2 text-left font-black ${
                  selectedPart === 'brackets'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                    : 'border-slate-200'
                }`}
              >
                Parentheses ()
              </button>

              <button
                onClick={() => setSelectedPart('colon')}
                className={`p-3 rounded-xl border-2 text-left font-black ${
                  selectedPart === 'colon'
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-slate-200'
                }`}
              >
                Colon :
              </button>

            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-indigo-600">
              Selected Part
            </div>

            <div
              className={`mt-3 text-3xl font-black ${current.color}`}
            >
              {current.label}
            </div>

            <div className="mt-3 text-sm font-semibold text-indigo-900">
              {current.explanation}
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Function Anatomy */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">

            <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
              Function Anatomy
            </div>

            <div className="mt-8 flex justify-center">

              <div className="bg-white border border-slate-200 rounded-3xl px-8 py-8">

                <div className="font-mono text-4xl font-black">

                  <span
                    className={`cursor-pointer ${
                      selectedPart === 'def'
                        ? 'text-red-500'
                        : 'text-slate-400'
                    }`}
                    onClick={() =>
                      setSelectedPart('def')
                    }
                  >
                    def
                  </span>

                  <span> </span>

                  <span
                    className={`cursor-pointer ${
                      selectedPart === 'name'
                        ? 'text-indigo-600'
                        : 'text-slate-400'
                    }`}
                    onClick={() =>
                      setSelectedPart('name')
                    }
                  >
                    show_banner
                  </span>

                  <span
                    className={`cursor-pointer ${
                      selectedPart === 'brackets'
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    }`}
                    onClick={() =>
                      setSelectedPart('brackets')
                    }
                  >
                    ()
                  </span>

                  <span
                    className={`cursor-pointer ${
                      selectedPart === 'colon'
                        ? 'text-orange-500'
                        : 'text-slate-400'
                    }`}
                    onClick={() =>
                      setSelectedPart('colon')
                    }
                  >
                    :
                  </span>

                </div>

                <pre className="mt-6 text-lg font-mono font-bold text-slate-700">
{`    print("Welcome")`}
                </pre>

              </div>

            </div>

          </div>

          {/* Flow */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5">

            <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
              Mental Model
            </div>

            <div className="mt-5 flex items-center justify-center gap-6">

              <div className="w-52 h-28 rounded-3xl bg-white border-2 border-indigo-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono uppercase text-slate-400">
                  Function
                </div>

                <div className="mt-2 text-2xl font-black text-indigo-600">
                  show_banner
                </div>

              </div>

              <div className="text-5xl text-slate-300">
                =
              </div>

              <div className="w-64 h-28 rounded-3xl bg-white border-2 border-emerald-500 flex flex-col items-center justify-center">

                <div className="text-xs font-mono uppercase text-slate-400">
                  Reusable Command
                </div>

                <div className="mt-2 text-xl font-black text-emerald-600">
                  Do Something Later
                </div>

              </div>

            </div>

          </div>

          {/* Summary */}
          <div className="grid grid-cols-4 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Keyword
              </div>

              <div className="mt-1 text-2xl font-black text-red-500">
                def
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Name
              </div>

              <div className="mt-1 text-xl font-black text-indigo-600">
                show_banner
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Inputs
              </div>

              <div className="mt-1 text-2xl font-black text-emerald-600">
                ()
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Body
              </div>

              <div className="mt-1 text-2xl font-black text-orange-500">
                :
              </div>
            </div>

          </div>

        </div>

      </div>

    </SceneLayout>
  );
};

export default Scene02_WhatIsAFunction;