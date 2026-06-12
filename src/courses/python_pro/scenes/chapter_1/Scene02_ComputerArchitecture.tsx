import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

type Stage =
  | 'idle'
  | 'storage'
  | 'ram'
  | 'fetch'
  | 'decode'
  | 'execute'
  | 'complete';

export const Scene02_ComputerArchitecture: React.FC = () => {
  const [stage, setStage] = useState<Stage>('idle');

  const flow: Stage[] = [
    'storage',
    'ram',
    'fetch',
    'decode',
    'execute',
    'complete'
  ];

  const nextStage = () => {
    if (stage === 'idle') {
      setStage('storage');
      return;
    }

    const currentIndex = flow.indexOf(stage);

    if (currentIndex === flow.length - 1) {
      setStage('idle');
      return;
    }

    setStage(flow[currentIndex + 1]);
  };

  const getStatus = () => {
    switch (stage) {
      case 'idle':
        return 'Ready to execute a program.';
      case 'storage':
        return 'Program located on SSD.';
      case 'ram':
        return 'OS loads program into RAM.';
      case 'fetch':
        return 'CPU fetches instruction from memory.';
      case 'decode':
        return 'CPU decodes instruction.';
      case 'execute':
        return 'CPU executes instruction.';
      case 'complete':
        return 'Instruction cycle completed.';
    }
  };

  const active = (...states: Stage[]) =>
    states.includes(stage);

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.2 · Computer Fundamentals
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Computer{' '}
          <span className="text-indigo-600 font-serif italic">
            Architecture
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Programs move from Storage → RAM → CPU before they can run.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Example Program
            </span>

            <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
              <code className="font-mono text-sm text-slate-700">
                print("Hello")
              </code>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Current Step
            </span>

            <p className="text-sm font-semibold text-indigo-900 mt-2">
              {getStatus()}
            </p>
          </div>

          <button
            onClick={nextStage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {stage === 'idle'
              ? '▶ Start Execution'
              : stage === 'complete'
              ? '🔄 Restart'
              : '➡ Next Step'}
          </button>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Fetch–Decode–Execute
            </span>

            <ul className="mt-2 space-y-1 text-xs font-semibold text-slate-600">
              <li>1. Fetch instruction from RAM</li>
              <li>2. Decode instruction</li>
              <li>3. Execute operation</li>
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Program Execution Pipeline
            </span>
          </div>

          {/* Horizontal Flow */}
          <div className="flex items-center justify-center gap-3">

            <motion.div
              animate={{ scale: stage === 'storage' ? 1.05 : 1 }}
              className={`w-44 p-4 rounded-xl border-2 bg-white ${
                stage === 'storage'
                  ? 'border-indigo-500'
                  : 'border-slate-200'
              }`}
            >
              <div className="text-3xl text-center">💽</div>
              <h3 className="text-center font-bold text-slate-800 mt-2">
                Storage
              </h3>
              <p className="text-xs text-center text-slate-500 mt-1">
                Permanent files
              </p>
            </motion.div>

            <span className="text-2xl text-slate-300">→</span>

            <motion.div
              animate={{ scale: stage === 'ram' ? 1.05 : 1 }}
              className={`w-44 p-4 rounded-xl border-2 bg-white ${
                stage === 'ram'
                  ? 'border-indigo-500'
                  : 'border-slate-200'
              }`}
            >
              <div className="text-3xl text-center">💾</div>
              <h3 className="text-center font-bold text-slate-800 mt-2">
                RAM
              </h3>
              <p className="text-xs text-center text-slate-500 mt-1">
                Active memory
              </p>
            </motion.div>

            <span className="text-2xl text-slate-300">→</span>

            <motion.div
              animate={{
                scale:
                  active('fetch', 'decode', 'execute')
                    ? 1.05
                    : 1
              }}
              className={`w-56 p-4 rounded-xl border-2 bg-white ${
                active('fetch', 'decode', 'execute')
                  ? 'border-indigo-500'
                  : 'border-slate-200'
              }`}
            >
              <div className="text-3xl text-center">🧠</div>

              <h3 className="text-center font-bold text-slate-800 mt-2">
                CPU
              </h3>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div
                  className={`text-center text-xs font-bold py-2 rounded-lg ${
                    stage === 'fetch'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  Fetch
                </div>

                <div
                  className={`text-center text-xs font-bold py-2 rounded-lg ${
                    stage === 'decode'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  Decode
                </div>

                <div
                  className={`text-center text-xs font-bold py-2 rounded-lg ${
                    stage === 'execute'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  Execute
                </div>
              </div>
            </motion.div>

          </div>

          {/* Progress */}
          <div className="flex justify-center gap-2 flex-wrap">

            {['Storage', 'RAM', 'Fetch', 'Decode', 'Execute'].map(
              (item, index) => (
                <div
                  key={item}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                    flow.indexOf(stage) >= index
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {item}
                </div>
              )
            )}

          </div>
        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene02_ComputerArchitecture;