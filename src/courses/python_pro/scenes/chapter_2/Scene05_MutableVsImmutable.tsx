import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

type ExampleKey =
  | 'int'
  | 'string'
  | 'tuple'
  | 'list'
  | 'dict';

export const Scene05_MutableVsImmutable: React.FC = () => {
  const [selected, setSelected] = useState<ExampleKey>('int');

  const examples = {
    int: {
      title: 'Integer',
      mutable: false,
      variable: 'x',
      before: '10',
      after: '20',
      beforeAddress: '0x7A12',
      afterAddress: '0x9F81',
      code: `x = 10

print(id(x))

x = 20

print(id(x))`,
      explanation:
        'Integers are immutable. Changing the value creates an entirely new object.'
    },

    string: {
      title: 'String',
      mutable: false,
      variable: 'name',
      before: '"Ali"',
      after: '"Ali Khan"',
      beforeAddress: '0x43A1',
      afterAddress: '0xB820',
      code: `name = "Ali"

print(id(name))

name = "Ali Khan"

print(id(name))`,
      explanation:
        'Strings cannot be modified in-place. Python creates a new string object.'
    },

    tuple: {
      title: 'Tuple',
      mutable: false,
      variable: 'point',
      before: '(2, 3)',
      after: '(5, 7)',
      beforeAddress: '0x1C72',
      afterAddress: '0x5D90',
      code: `point = (2, 3)

print(id(point))

point = (5, 7)

print(id(point))`,
      explanation:
        'Tuples are immutable collections. Any change requires a new tuple object.'
    },

    list: {
      title: 'List',
      mutable: true,
      variable: 'nums',
      before: '[1, 2]',
      after: '[1, 2, 3]',
      beforeAddress: '0xA552',
      afterAddress: '0xA552',
      code: `nums = [1, 2]

print(id(nums))

nums.append(3)

print(id(nums))`,
      explanation:
        'Lists are mutable. The object itself changes while keeping the same memory address.'
    },

    dict: {
      title: 'Dictionary',
      mutable: true,
      variable: 'user',
      before: '{"name":"Ali"}',
      after: '{"name":"Ali","age":20}',
      beforeAddress: '0xC341',
      afterAddress: '0xC341',
      code: `user = {"name":"Ali"}

print(id(user))

user["age"] = 20

print(id(user))`,
      explanation:
        'Dictionaries can be updated without creating a new object.'
    }
  };

  const current = examples[selected];

  const isMutable = current.mutable;

  const memoryChanged =
    current.beforeAddress !== current.afterAddress;

  return (
    <SceneLayout gap="gap-5">
      {/* HEADER */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 2.5 · Python Memory Model
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Mutable vs{' '}
          <span className="text-indigo-600 font-serif italic">
            Immutable
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          Memory addresses reveal what Python is really doing behind
          the scenes.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">
        {/* LEFT PANEL */}
        <div className="w-[380px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Select Example
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                ['int', 'Integer'],
                ['string', 'String'],
                ['tuple', 'Tuple'],
                ['list', 'List'],
                ['dict', 'Dictionary']
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() =>
                    setSelected(key as ExampleKey)
                  }
                  className={`rounded-xl border-2 p-3 text-left transition-all ${
                    selected === key
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="font-bold text-slate-800">
                    {label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`rounded-2xl border p-4 ${
              isMutable
                ? 'bg-emerald-50 border-emerald-100'
                : 'bg-indigo-50 border-indigo-100'
            }`}
          >
            <div
              className={`text-xs font-mono font-bold uppercase ${
                isMutable
                  ? 'text-emerald-600'
                  : 'text-indigo-600'
              }`}
            >
              Object Type
            </div>

            <div className="mt-3 text-3xl font-black text-slate-800">
              {isMutable
                ? 'Mutable'
                : 'Immutable'}
            </div>

            <div className="mt-3 text-sm text-slate-700 leading-relaxed">
              {current.explanation}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Quick Rule
            </div>

            <div className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
              <div>
                ✅ Same Address = Same Object
              </div>

              <div>
                🔄 New Address = New Object
              </div>

              <div>
                📦 id() returns an object's memory identity
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-4 ${
              memoryChanged
                ? 'bg-orange-50 border-orange-100'
                : 'bg-emerald-50 border-emerald-100'
            }`}
          >
            <div
              className={`text-xs font-mono font-bold uppercase ${
                memoryChanged
                  ? 'text-orange-600'
                  : 'text-emerald-600'
              }`}
            >
              Final Verdict
            </div>

            <div className="mt-2 text-lg font-black text-slate-800">
              {memoryChanged
                ? 'New Object Created'
                : 'Same Object Modified'}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col min-h-0">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Memory Address Visualizer
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="flex items-center justify-center gap-10">
                {/* BEFORE */}
                <div className="flex flex-col items-center">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase mb-3">
                    Before
                  </div>

                  <div
                    className={`w-72 h-64 rounded-3xl bg-white border-2 flex flex-col items-center justify-center ${
                      isMutable
                        ? 'border-emerald-500'
                        : 'border-indigo-500'
                    }`}
                  >
                    <div className="text-xs uppercase text-slate-400">
                      Variable
                    </div>

                    <div className="text-xl font-black text-slate-700 mt-2">
                      {current.variable}
                    </div>

                    <div
                      className={`text-2xl font-black mt-4 text-center break-all px-3 leading-snug ${
                        isMutable
                          ? 'text-emerald-600'
                          : 'text-indigo-600'
                      }`}
                    >
                      {current.before}
                    </div>

                    <div className="mt-6 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200">
                      <div className="text-[10px] uppercase text-slate-400 font-mono">
                        Memory Address
                      </div>

                      <div className="font-mono font-black text-slate-700 mt-1">
                        {current.beforeAddress}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-6xl text-slate-300">
                  →
                </div>

                {/* AFTER */}
                <div className="flex flex-col items-center">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase mb-3">
                    After
                  </div>

                  <div
                    className={`w-72 h-64 rounded-3xl bg-white border-2 flex flex-col items-center justify-center ${
                      memoryChanged
                        ? 'border-orange-500'
                        : 'border-emerald-500'
                    }`}
                  >
                    <div className="text-xs uppercase text-slate-400">
                      Variable
                    </div>

                    <div className="text-xl font-black text-slate-700 mt-2">
                      {current.variable}
                    </div>

                    <div
                      className={`text-2xl font-black mt-4 text-center break-all px-3 leading-snug ${
                        memoryChanged
                          ? 'text-orange-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {current.after}
                    </div>

                    <div
                      className={`mt-6 px-4 py-2 rounded-xl border ${
                        memoryChanged
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-emerald-50 border-emerald-200'
                      }`}
                    >
                      <div className="text-[10px] uppercase text-slate-400 font-mono">
                        Memory Address
                      </div>

                      <div className="font-mono font-black mt-1">
                        {current.afterAddress}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MEMORY COMPARISON */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="text-xs uppercase font-mono text-slate-400">
                    Address Before
                  </div>

                  <div className="mt-3 font-black font-mono text-lg">
                    {current.beforeAddress}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="text-xs uppercase font-mono text-slate-400">
                    Address After
                  </div>

                  <div className="mt-3 font-black font-mono text-lg">
                    {current.afterAddress}
                  </div>
                </div>

                <div
                  className={`rounded-2xl p-4 border ${
                    memoryChanged
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <div className="text-xs uppercase font-mono text-slate-400">
                    Result
                  </div>

                  <div
                    className={`mt-3 font-black text-lg ${
                      memoryChanged
                        ? 'text-orange-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {memoryChanged
                      ? 'Address Changed'
                      : 'Address Same'}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CODE */}
          <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Python Code
            </div>

            <div className="mt-3 max-h-[180px] overflow-auto">
              <pre className="text-sm font-mono font-bold text-slate-800 whitespace-pre-wrap">
                {current.code}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene05_MutableVsImmutable;