import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

type Phase = 'idle' | 'fetch' | 'decode' | 'execute' | 'done';

export const Scene02_HowProgramsExecute: React.FC = () => {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [register, setRegister] = useState<number | null>(null);
  const [memoryData, setMemoryData] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // The simplified program we are executing
  const instructions = [
    { code: 'LOAD 5', desc: 'Load the number 5 into the CPU.', type: 'read' },
    { code: 'ADD 3', desc: 'Add 3 to the current value in the CPU.', type: 'math' },
    { code: 'STORE', desc: 'Save the result (8) back into memory.', type: 'write' },
  ];

  const handleNextPhase = async () => {
    if (isAnimating || phase === 'done') return;
    setIsAnimating(true);

    if (phase === 'idle') {
      setPhase('fetch');
    } else if (phase === 'fetch') {
      setPhase('decode');
    } else if (phase === 'decode') {
      setPhase('execute');
      
      // Apply execution logic visually after a short delay
      setTimeout(() => {
        if (step === 0) setRegister(5);
        if (step === 1) setRegister(8);
        if (step === 2) setMemoryData(8);
      }, 400);

    } else if (phase === 'execute') {
      if (step < instructions.length - 1) {
        setStep(step + 1);
        setPhase('fetch');
      } else {
        setPhase('done');
      }
    }
    
    setTimeout(() => setIsAnimating(false), 800);
  };

  const reset = () => {
    setStep(0);
    setPhase('idle');
    setRegister(null);
    setMemoryData(null);
  };

  return (
    <SceneLayout gap="gap-6">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-yellow-600 font-extrabold">
          Lesson 1.2 · Introduction to Programming
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          How Programs{' '}
          <span className="text-yellow-600 font-serif italic">Execute</span>
        </h2>
        <p className="text-slate-500 text-sm mt-2 max-w-3xl leading-relaxed">
          At the core of every computer is the CPU. It executes instructions using a continuous loop called the <strong className="text-slate-700 font-bold">Fetch-Decode-Execute</strong> cycle. Step through the cycle below to see how a computer adds two numbers.
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left Column - Explanation & Controls */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-3 text-lg">The Execution Cycle</h3>
            
            {/* Cycle Status */}
            <div className="flex flex-col gap-2 mb-6">
              <div className={`p-3 rounded-lg border-2 transition-colors ${phase === 'fetch' ? 'bg-yellow-50 border-yellow-400 shadow-sm' : 'bg-slate-50 border-transparent text-slate-500'}`}>
                <div className="text-xs font-mono font-bold uppercase tracking-wider mb-1">Step 1: Fetch</div>
                <div className="text-sm">Get the next instruction from memory.</div>
              </div>
              <div className={`p-3 rounded-lg border-2 transition-colors ${phase === 'decode' ? 'bg-blue-50 border-blue-400 shadow-sm' : 'bg-slate-50 border-transparent text-slate-500'}`}>
                <div className="text-xs font-mono font-bold uppercase tracking-wider mb-1">Step 2: Decode</div>
                <div className="text-sm">Figure out what the instruction means.</div>
              </div>
              <div className={`p-3 rounded-lg border-2 transition-colors ${phase === 'execute' ? 'bg-green-50 border-green-500 shadow-sm' : 'bg-slate-50 border-transparent text-slate-500'}`}>
                <div className="text-xs font-mono font-bold uppercase tracking-wider mb-1">Step 3: Execute</div>
                <div className="text-sm">Perform the action or calculation.</div>
              </div>
            </div>

            {/* Dynamic Explanation Box */}
            <div className="bg-slate-800 rounded-xl p-4 text-white min-h-[100px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase + step}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm leading-relaxed"
                >
                  {phase === 'idle' && "Click 'Next Phase' to start the CPU cycle."}
                  {phase === 'fetch' && `The CPU fetches instruction ${step + 1} ("${instructions[step].code}") from Memory.`}
                  {phase === 'decode' && `The Control Unit decodes the instruction: ${instructions[step].desc}`}
                  {phase === 'execute' && instructions[step].type === 'math' && "The ALU performs the math and updates the register."}
                  {phase === 'execute' && instructions[step].type === 'read' && "The CPU loads the value into its internal Register."}
                  {phase === 'execute' && instructions[step].type === 'write' && "The CPU sends the final result back to Memory."}
                  {phase === 'done' && "Program complete! The result was successfully calculated and stored."}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={reset}
              className="px-4 py-3 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleNextPhase}
              disabled={phase === 'done' || isAnimating}
              className="flex-1 py-3 rounded-xl text-sm font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {phase === 'done' ? 'Finished 🎉' : 'Next Phase ⏭️'}
            </button>
          </div>
        </div>

        {/* Right Column - Visualizer */}
        <div className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl p-6 flex flex-col justify-center items-center relative overflow-hidden">
          
          <div className="w-full max-w-2xl flex items-stretch gap-2 lg:gap-6">
            
            {/* CPU Component */}
            <div className="flex-1 bg-white border-2 border-blue-200 rounded-2xl p-4 shadow-sm relative">
              <div className="absolute -top-3 left-4 bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2 py-1 rounded uppercase tracking-widest">
                CPU
              </div>
              <div className="flex flex-col gap-3 mt-4 h-full">
                {/* Control Unit */}
                <div className={`p-3 rounded-xl border-2 transition-colors flex-1 flex flex-col justify-center items-center text-center ${phase === 'decode' ? 'bg-blue-50 border-blue-400' : 'bg-slate-50 border-slate-100'}`}>
                  <span className="font-bold text-slate-700 text-sm">Control Unit</span>
                  <span className="text-[10px] text-slate-500 uppercase mt-1">Decodes Instructions</span>
                </div>
                
                {/* ALU */}
                <div className={`p-3 rounded-xl border-2 transition-colors flex-1 flex flex-col justify-center items-center text-center ${phase === 'execute' && instructions[step].type === 'math' ? 'bg-green-50 border-green-400' : 'bg-slate-50 border-slate-100'}`}>
                  <span className="font-bold text-slate-700 text-sm">ALU</span>
                  <span className="text-[10px] text-slate-500 uppercase mt-1">Does Math (Math & Logic)</span>
                </div>

                {/* Register */}
                <div className={`p-3 rounded-xl border-2 transition-colors flex justify-between items-center ${phase === 'execute' && instructions[step].type !== 'write' ? 'bg-yellow-50 border-yellow-400' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-600 text-xs uppercase">Register A</span>
                  <span className="font-mono text-xl font-black text-slate-800">
                    {register !== null ? register : '--'}
                  </span>
                </div>
              </div>
            </div>

            {/* Data Bus */}
            <div className="w-16 lg:w-24 flex items-center relative">
              <div className="w-full h-8 border-y-2 border-slate-300 border-dashed flex items-center justify-center relative overflow-hidden bg-slate-50">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest absolute -top-5">Data Bus</span>
                <AnimatePresence>
                  {phase === 'fetch' && (
                    <motion.div
                      initial={{ left: '100%', opacity: 1 }}
                      animate={{ left: '-20%' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "linear" }}
                      className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-sm"
                    />
                  )}
                  {phase === 'execute' && instructions[step].type === 'write' && (
                    <motion.div
                      initial={{ left: '-20%', opacity: 1 }}
                      animate={{ left: '100%' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "linear" }}
                      className="absolute w-3 h-3 bg-green-500 rounded-full shadow-sm"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RAM Component */}
            <div className="flex-1 bg-white border-2 border-emerald-200 rounded-2xl p-4 shadow-sm relative">
              <div className="absolute -top-3 left-4 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-1 rounded uppercase tracking-widest">
                Memory (RAM)
              </div>
              <div className="flex flex-col gap-2 mt-4 font-mono text-sm">
                
                {/* Instructions in Memory */}
                <div className="text-[10px] text-slate-400 uppercase font-bold mt-1 mb-1">Instructions</div>
                {instructions.map((inst, i) => (
                  <div key={i} className={`px-3 py-2 rounded-lg border-2 flex justify-between items-center transition-colors ${phase === 'fetch' && step === i ? 'bg-yellow-50 border-yellow-400' : 'bg-slate-50 border-slate-100'}`}>
                    <span className="text-slate-400 text-xs">0x0{i}</span>
                    <span className={`font-bold ${phase === 'fetch' && step === i ? 'text-yellow-700' : 'text-slate-700'}`}>{inst.code}</span>
                  </div>
                ))}
                
                <div className="text-center text-slate-300 py-1">⋮</div>
                
                {/* Data in Memory */}
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Variables / Data</div>
                <div className={`px-3 py-2 rounded-lg border-2 flex justify-between items-center transition-colors ${phase === 'execute' && instructions[step].type === 'write' ? 'bg-green-50 border-green-500 shadow-inner' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 text-xs">0x10</span>
                  <span className="font-bold text-slate-800 text-lg">
                    {memoryData !== null ? memoryData : '0'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene02_HowProgramsExecute;