import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene03_DataTypes: React.FC = () => {
  const [selectedType, setSelectedType] = useState(0);

  const types = [
    {
      name: 'int',
      value: '42',
      color: 'text-blue-600',
      bg: 'border-blue-500',
      description: 'Whole numbers'
    },
    {
      name: 'float',
      value: '3.14',
      color: 'text-emerald-600',
      bg: 'border-emerald-500',
      description: 'Decimal numbers'
    },
    {
      name: 'str',
      value: '"Hello"',
      color: 'text-orange-600',
      bg: 'border-orange-500',
      description: 'Text values'
    },
    {
      name: 'bool',
      value: 'True',
      color: 'text-purple-600',
      bg: 'border-purple-500',
      description: 'True or False'
    }
  ];

  const current = types[selectedType];

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 3.3 · Writing Real Python Programs
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Python{' '}
          <span className="text-indigo-600 font-serif italic">
            Data Types
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Every Python object has a type. The type determines what operations
          can be performed on that value.
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
              <div>• Every value has a type.</div>
              <div>• Types define behavior.</div>
              <div>• Python stores type information with objects.</div>
              <div>• Different types support different operations.</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Select A Type
            </div>

            <div className="mt-3 flex flex-col gap-2">

              {types.map((type, index) => (
                <button
                  key={type.name}
                  onClick={() => setSelectedType(index)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedType === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="font-black text-slate-800">
                    {type.name}
                  </div>

                  <div className="text-xs text-slate-500 mt-1">
                    {type.description}
                  </div>
                </button>
              ))}

            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Type Inspector
          </div>

          <motion.div
            key={selectedType}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex items-center gap-12">

              {/* Object */}
              <div
                className={`w-64 h-64 bg-white border-2 rounded-3xl flex flex-col items-center justify-center ${current.bg}`}
              >
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Python Object
                </div>

                <div
                  className={`text-5xl font-black mt-4 ${current.color}`}
                >
                  {current.value}
                </div>
              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Type */}
              <div className="w-56 bg-white border-2 border-indigo-500 rounded-3xl p-6">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Type Information
                </div>

                <div className="mt-5">

                  <div className="text-xs font-mono text-slate-400 uppercase">
                    type()
                  </div>

                  <div className="text-3xl font-black text-indigo-600 mt-2">
                    {current.name}
                  </div>

                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">

                  <div className="text-xs font-mono text-slate-400 uppercase">
                    Meaning
                  </div>

                  <div className="text-sm font-bold text-slate-700 mt-2">
                    {current.description}
                  </div>

                </div>

              </div>

            </div>
          </motion.div>

          {/* Live Example */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Python Code
              </div>

              <pre className="mt-2 text-sm font-mono font-bold text-slate-800">
{`value = ${current.value}

type(value)`}
              </pre>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Result
              </div>

              <div className="mt-4 text-2xl font-black text-indigo-700">
                {current.name}
              </div>
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene03_DataTypes;