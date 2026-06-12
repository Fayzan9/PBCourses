import React from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene06_Summary: React.FC = () => {
  const concepts = [
    {
      title: 'Programming = Translation',
      description:
        'Programming converts human ideas into instructions computers can execute.'
    },
    {
      title: 'Storage → RAM → CPU',
      description:
        'Programs are loaded from storage into RAM, then executed by the CPU.'
    },
    {
      title: 'Everything Becomes Binary',
      description:
        'Text, images, videos, and programs are ultimately represented using 0s and 1s.'
    },
    {
      title: 'Python Uses a Virtual Machine',
      description:
        'Python source code is translated into bytecode which runs inside the Python Virtual Machine (PVM).'
    },
    {
      title: 'Memory Has Addresses',
      description:
        'Variables occupy locations in RAM that can be read and modified during execution.'
    }
  ];

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.6 · Chapter Review
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Chapter 1{' '}
          <span className="text-indigo-600 font-serif italic">
            Summary
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Before moving to variables and data, review the core ideas
          from this chapter.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-3">

          {concepts.map((concept, index) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white border border-slate-200 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-sm shrink-0">
                  ✓
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {concept.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                    {concept.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side */}
        <div className="w-[360px] shrink-0 flex flex-col gap-4">

          {/* Knowledge Flow */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              What You Learned
            </span>

            <div className="mt-4 flex flex-col gap-2">

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center text-sm font-bold text-indigo-700">
                Human Intent
              </div>

              <div className="text-center text-slate-300 font-bold">
                ↓
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center text-sm font-bold text-indigo-700">
                Python Code
              </div>

              <div className="text-center text-slate-300 font-bold">
                ↓
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center text-sm font-bold text-indigo-700">
                Bytecode
              </div>

              <div className="text-center text-slate-300 font-bold">
                ↓
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center text-sm font-bold text-indigo-700">
                CPU Execution
              </div>

              <div className="text-center text-slate-300 font-bold">
                ↓
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center text-sm font-bold text-indigo-700">
                Binary Signals
              </div>

            </div>
          </div>

          {/* Next Chapter */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-5 text-white flex-1 flex flex-col justify-between">

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                Next Chapter
              </span>

              <h3 className="text-2xl font-black mt-2 leading-tight">
                Variables & Data
              </h3>

              <p className="text-sm mt-3 opacity-90 leading-relaxed">
                Now you'll learn how Python stores data, manages
                objects, and handles variable references in memory.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-3 mt-4">
              <div className="text-xs font-mono uppercase tracking-wider opacity-80">
                Coming Up
              </div>

              <div className="font-bold mt-1">
                Variables • Objects • References • Types
              </div>
            </div>

          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene06_Summary;