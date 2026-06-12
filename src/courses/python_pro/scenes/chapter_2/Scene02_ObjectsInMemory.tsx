import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

interface MemoryObject {
  id: number;
  value: string;
  type: string;
}

export const Scene02_ObjectsInMemory: React.FC = () => {
  const objects: MemoryObject[] = [
    {
      id: 1,
      value: '42',
      type: 'int'
    },
    {
      id: 2,
      value: '"Hello"',
      type: 'str'
    },
    {
      id: 3,
      value: 'True',
      type: 'bool'
    }
  ];

  const [selectedObject, setSelectedObject] = useState(0);

  const current = objects[selectedObject];

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 2.2 · Python Memory Model
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Objects In{' '}
          <span className="text-indigo-600 font-serif italic">
            Memory
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Everything in Python is an object. Numbers, strings, booleans,
          lists, and functions all exist as objects in memory.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[360px] shrink-0 flex flex-col gap-4">

          {/* Core Idea */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Core Idea
            </span>

            <ul className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <li>• Every value is an object.</li>
              <li>• Objects live in memory.</li>
              <li>• Objects have a type.</li>
              <li>• Objects contain data.</li>
            </ul>
          </div>

          {/* Object Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Explore Objects
            </span>

            <div className="mt-3 flex flex-col gap-2">
              {objects.map((object, index) => (
                <button
                  key={object.id}
                  onClick={() => setSelectedObject(index)}
                  className={`text-left rounded-xl border-2 p-3 transition-all ${
                    selectedObject === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="font-mono font-bold">
                    {object.value}
                  </div>

                  <div className="text-xs text-slate-500 mt-1">
                    Type: {object.type}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
              Important
            </span>

            <p className="mt-2 text-xs font-semibold text-amber-900 leading-relaxed">
              Variables are not objects.
              Variables are names.
              Objects are the actual data stored in memory.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Memory Visualization
          </span>

          {/* Python Code */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Example Code
            </span>

            <div className="mt-4 font-mono text-xl font-black text-slate-800">
              value = {current.value}
            </div>
          </div>

          {/* Object Visualization */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex justify-center"
            >
              <div className="w-[320px] bg-white border-2 border-indigo-500 rounded-3xl p-6">

                <div className="text-center text-xs font-mono font-bold text-slate-400 uppercase">
                  Python Object
                </div>

                <div className="mt-6 text-center">

                  <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Value
                  </div>

                  <div className="text-4xl font-black text-indigo-600 mt-2">
                    {current.value}
                  </div>

                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 text-center">

                  <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Type
                  </div>

                  <div className="text-xl font-black text-emerald-600 mt-1">
                    {current.type}
                  </div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Object Anatomy */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Object Value
              </div>

              <div className="mt-2 text-lg font-black text-slate-800">
                {current.value}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Actual data stored by the object
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Object Type
              </div>

              <div className="mt-2 text-lg font-black text-indigo-600">
                {current.type}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Defines object behavior
              </div>
            </div>

          </div>

          {/* Takeaway */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Takeaway
            </div>

            <div className="mt-2 text-sm font-semibold text-indigo-900">
              Python variables point to objects. Objects contain the
              actual data and type information.
            </div>
          </div>

        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene02_ObjectsInMemory;