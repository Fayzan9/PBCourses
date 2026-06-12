import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

interface VariableExample {
  id: number;
  code: string;
  variable: string;
  value: string;
}

export const Scene01_WhatIsAVariable: React.FC = () => {
  const examples: VariableExample[] = [
    {
      id: 1,
      code: 'age = 25',
      variable: 'age',
      value: '25'
    },
    {
      id: 2,
      code: 'name = "Alice"',
      variable: 'name',
      value: '"Alice"'
    },
    {
      id: 3,
      code: 'is_active = True',
      variable: 'is_active',
      value: 'True'
    }
  ];

  const [selectedExample, setSelectedExample] = useState(0);

  const current = examples[selectedExample];

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 2.1 · Python Memory Model
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          What Is A{' '}
          <span className="text-indigo-600 font-serif italic">
            Variable?
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Variables give names to data so we can use it later. A variable is
          not the data itself—it is a label that helps us find data.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[360px] shrink-0 flex flex-col gap-4">

          {/* Key Concept */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Key Idea
            </span>

            <div className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <p>
                Variables are <strong>names</strong>.
              </p>

              <p>
                Variables help us refer to data.
              </p>

              <p>
                Variables are not boxes that contain values.
              </p>

              <p>
                They act more like labels attached to data.
              </p>
            </div>
          </div>

          {/* Example Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Examples
            </span>

            <div className="mt-3 flex flex-col gap-2">
              {examples.map((example, index) => (
                <button
                  key={example.id}
                  onClick={() => setSelectedExample(index)}
                  className={`text-left rounded-xl border-2 p-3 transition-all ${
                    selectedExample === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <span className="font-mono text-sm font-bold">
                    {example.code}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Misconception */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
              Common Mistake
            </span>

            <p className="mt-2 text-xs font-semibold text-amber-900 leading-relaxed">
              Beginners often think variables store values directly.
              In Python, variables are names that refer to objects.
              We'll learn more about objects in the next lesson.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Variable Visualization
          </span>

          {/* Code */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Python Code
            </span>

            <div className="mt-4 font-mono text-2xl font-black text-slate-800">
              {current.code}
            </div>
          </div>

          {/* Visual Mapping */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-6"
            >
              {/* Variable */}
              <div className="w-44 bg-white border-2 border-indigo-500 rounded-2xl p-5 text-center">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Variable Name
                </div>

                <div className="mt-2 text-2xl font-black text-indigo-600">
                  {current.variable}
                </div>
              </div>

              <div className="text-4xl text-slate-300 font-black">
                →
              </div>

              {/* Value */}
              <div className="w-44 bg-white border-2 border-emerald-500 rounded-2xl p-5 text-center">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Data
                </div>

                <div className="mt-2 text-2xl font-black text-emerald-600">
                  {current.value}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Takeaway */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Takeaway
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              A variable is a name that lets your program refer to data.
              The name and the data are two different things.
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Next Lesson
            </div>

            <div className="mt-2 text-sm font-semibold text-slate-700">
              If variables are names, what exactly are they pointing to?
              Next, we'll learn about Python objects in memory.
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene01_WhatIsAVariable;