import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExecutionStep {
  name: string;
  instruction: string;
  description: string;
  stack: string[];
  result?: string;
}

export const Scene04_ProgramExecution: React.FC = () => {
  const steps: ExecutionStep[] = [
    {
      name: 'LOAD_FAST',
      instruction: 'LOAD_FAST a',
      description: 'Load variable a (10) onto the stack.',
      stack: ['10']
    },
    {
      name: 'LOAD_FAST',
      instruction: 'LOAD_FAST b',
      description: 'Load variable b (20) onto the stack.',
      stack: ['10', '20']
    },
    {
      name: 'BINARY_OP',
      instruction: 'BINARY_OP +',
      description: 'Pop two values, add them, push result.',
      stack: ['30']
    },
    {
      name: 'RETURN_VALUE',
      instruction: 'RETURN_VALUE',
      description: 'Return the final value from the stack.',
      stack: [],
      result: '30'
    }
  ];

  const [currentStep, setCurrentStep] = useState(-1);

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      setCurrentStep(-1);
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const activeData =
    currentStep >= 0 ? steps[currentStep] : null;

  const currentStack =
    activeData?.stack ?? [];

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.4 · Computer Fundamentals
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Program{' '}
          <span className="text-indigo-600 font-serif italic">
            Execution
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Watch how Python bytecode instructions manipulate a stack inside
          the Python Virtual Machine (PVM).
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Side */}
        <div className="w-[380px] shrink-0 flex flex-col gap-4">

          {/* Python Source */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Python Source
            </span>

            <pre className="mt-3 bg-slate-50 rounded-xl p-3 text-sm font-mono text-slate-700 overflow-hidden">
{`def add(a, b):
    return a + b`}
            </pre>
          </div>

          {/* Bytecode */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Bytecode Instructions
            </span>

            <div className="mt-3 flex flex-col gap-2">
              {steps.map((step, index) => {
                const active = index === currentStep;

                return (
                  <div
                    key={index}
                    className={`rounded-xl border-2 p-3 transition-all ${
                      active
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-100 bg-white'
                    }`}
                  >
                    <div className="font-mono text-xs font-black">
                      {step.instruction}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={nextStep}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {currentStep === steps.length - 1
              ? '🔄 Restart'
              : '➡ Next Instruction'}
          </button>
        </div>

        {/* Right Side */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          {/* Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Current Operation
            </span>

            <p className="mt-2 text-sm font-semibold text-slate-700">
              {activeData
                ? activeData.description
                : 'Press "Next Instruction" to begin execution.'}
            </p>
          </div>

          {/* Stack */}
          <div className="flex-1 flex flex-col justify-center items-center">

            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
              Python VM Stack
            </span>

            <div className="flex flex-col-reverse gap-2 items-center min-h-[220px] justify-end">

              <AnimatePresence>
                {currentStack.map((value) => (
                  <motion.div
                    key={value}
                    initial={{
                      opacity: 0,
                      y: -20,
                      scale: 0.9
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      y: 20,
                      scale: 0.9
                    }}
                    className="w-36 py-3 rounded-xl bg-white border-2 border-indigo-500 shadow-sm flex items-center justify-center font-mono font-black text-lg text-slate-800"
                  >
                    {value}
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="w-40 h-[3px] bg-slate-300 rounded-full" />

              <span className="text-xs font-mono font-bold text-slate-400">
                Stack Base
              </span>
            </div>
          </div>

          {/* Result */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Current Instruction
              </span>

              <div className="mt-2 text-sm font-black text-indigo-600 font-mono">
                {activeData?.name ?? 'READY'}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Returned Value
              </span>

              <div className="mt-2 text-2xl font-black text-emerald-600 font-mono">
                {activeData?.result ?? '-'}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene04_ProgramExecution;