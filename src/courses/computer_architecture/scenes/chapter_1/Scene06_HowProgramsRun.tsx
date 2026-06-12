import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene06_HowProgramsRun: React.FC = () => {
  const programs = [
    {
      name: 'Web Browser',
      icon: '🌐',
      output: 'Website Appears'
    },
    {
      name: 'Game',
      icon: '🎮',
      output: 'Game Starts'
    },
    {
      name: 'Music Player',
      icon: '🎵',
      output: 'Music Plays'
    },
    {
      name: 'Text Editor',
      icon: '📝',
      output: 'Editor Opens'
    }
  ];

  const stages = [
    {
      id: 0,
      title: 'Storage',
      subtitle: 'Program Stored On SSD',
      color:
        'border-orange-500 bg-orange-50 text-orange-600'
    },
    {
      id: 1,
      title: 'RAM',
      subtitle: 'Program Loaded Into Memory',
      color:
        'border-emerald-500 bg-emerald-50 text-emerald-600'
    },
    {
      id: 2,
      title: 'CPU',
      subtitle: 'Instructions Execute',
      color:
        'border-indigo-500 bg-indigo-50 text-indigo-600'
    },
    {
      id: 3,
      title: 'Output',
      subtitle: 'Result Appears',
      color:
        'border-rose-500 bg-rose-50 text-rose-600'
    }
  ];

  const [selectedProgram, setSelectedProgram] =
    useState(0);

  const [activeStage, setActiveStage] =
    useState(0);

  const currentProgram =
    programs[selectedProgram];

  const currentStage =
    stages[activeStage];

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}

      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.6 · Foundations Of Computing
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          How Programs{' '}
          <span className="text-indigo-600 font-serif italic">
            Run
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Programs do not run directly from storage.
          They are loaded into memory, executed by the CPU,
          and then produce visible results.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left */}

        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-slate-400">
              Choose Program
            </div>

            <div className="mt-3 flex flex-col gap-2">

              {programs.map((program, index) => (
                <button
                  key={program.name}
                  onClick={() =>
                    setSelectedProgram(index)
                  }
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedProgram === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {program.icon}
                    </span>

                    <span className="font-bold">
                      {program.name}
                    </span>
                  </div>
                </button>
              ))}

            </div>

          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

            <div className="text-xs font-mono uppercase font-bold text-indigo-600">
              Important
            </div>

            <div className="mt-3 space-y-2 text-xs font-semibold text-slate-700">

              <div>
                • Programs are stored on storage devices.
              </div>

              <div>
                • Storage is too slow for execution.
              </div>

              <div>
                • Programs must be loaded into RAM.
              </div>

              <div>
                • The CPU executes instructions from RAM.
              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Program Execution Pipeline
          </div>

          {/* Program */}

          <div className="flex justify-center mt-2">

            <motion.div
              key={currentProgram.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-slate-200 rounded-2xl px-6 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {currentProgram.icon}
                </span>

                <div>
                  <div className="font-black text-slate-800">
                    {currentProgram.name}
                  </div>

                  <div className="text-xs text-slate-500">
                    Selected Program
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Flow */}

          <div className="flex-1 flex items-center justify-center">

            <div className="flex items-center gap-4 flex-wrap justify-center">

              {stages.map((stage, index) => (
                <React.Fragment key={stage.id}>

                  <button
                    onClick={() =>
                      setActiveStage(index)
                    }
                    className={`w-44 h-36 rounded-3xl border-2 transition-all ${
                      activeStage === index
                        ? stage.color
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-xl font-black">
                      {stage.title}
                    </div>

                    <div className="text-xs mt-3 px-3">
                      {stage.subtitle}
                    </div>
                  </button>

                  {index < stages.length - 1 && (
                    <div className="text-4xl text-slate-300">
                      →
                    </div>
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Explanation */}

          <motion.div
            key={activeStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-2xl border-2 p-5 ${currentStage.color}`}
          >
            <div className="text-xs font-mono uppercase font-bold">
              Current Step
            </div>

            <div className="text-3xl font-black mt-2">
              {currentStage.title}
            </div>

            <div className="mt-2 font-semibold text-slate-700">

              {activeStage === 0 &&
                `The ${currentProgram.name} is stored permanently on your SSD or storage device.`}

              {activeStage === 1 &&
                `When launched, the program is copied from storage into RAM so it can run quickly.`}

              {activeStage === 2 &&
                `The CPU fetches and executes the program's instructions from RAM.`}

              {activeStage === 3 &&
                `The execution results become visible to the user: ${currentProgram.output}.`}
            </div>

          </motion.div>

        </div>

      </div>

    </SceneLayout>
  );
};

export default Scene06_HowProgramsRun;