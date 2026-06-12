import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BytecodeInstruction {
  index: number;
  op: string;
  arg: string;
  effect: string;
}

export const Scene04_ProgramExecution: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(-1);
  const [stack, setStack] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const instructions: BytecodeInstruction[] = [
    { index: 0, op: 'LOAD_FAST', arg: '0 (a = 10)', effect: 'Push "10" onto stack' },
    { index: 1, op: 'LOAD_FAST', arg: '1 (b = 20)', effect: 'Push "20" onto stack' },
    { index: 2, op: 'BINARY_OP', arg: '+ (ADD)', effect: 'Pop 2 values, add, push result' },
    { index: 3, op: 'RETURN_VALUE', arg: '', effect: 'Pop top value and return' }
  ];

  const handleStep = () => {
    const nextIdx = stepIndex + 1;
    if (nextIdx >= instructions.length) {
      // Reset
      setStepIndex(-1);
      setStack([]);
      setResult(null);
      return;
    }

    setStepIndex(nextIdx);

    if (nextIdx === 0) {
      setStack(['10']);
    } else if (nextIdx === 1) {
      setStack(['10', '20']);
    } else if (nextIdx === 2) {
      setStack(['30']);
    } else if (nextIdx === 3) {
      setStack([]);
      setResult('30');
    }
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-6 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.4 · Computer Fundamentals
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          Inside the <span className="text-indigo-600 font-serif italic">Python VM (PVM)</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-2xl leading-relaxed">
          Python compiles code to bytecode, which is run on a stack-based Virtual Machine. Click "Step Instruction" to watch the VM work.
        </p>
      </div>

      {/* Simulator Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 items-stretch">
        
        {/* Left Column: Bytecode Code Panel */}
        <div className="flex-1 flex flex-col justify-between bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-0">
          <div className="flex flex-col gap-3 min-h-0">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Source & Bytecode
            </span>

            {/* Python code source */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/50 font-mono text-xs leading-relaxed font-semibold text-slate-700">
              <span className="text-indigo-600">def</span> <span className="text-slate-800 font-bold">add</span>(a, b):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-600">return</span> a + b
            </div>

            {/* Bytecode list */}
            <div className="flex flex-col gap-1.5 mt-2">
              {instructions.map((inst, idx) => {
                const isActive = idx === stepIndex;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border-2 font-mono text-[11px] font-bold transition-all ${
                      isActive
                        ? 'bg-indigo-50/50 border-indigo-500 text-indigo-700'
                        : 'bg-white border-slate-50 text-slate-400'
                    }`}
                  >
                    <span className="text-slate-300 w-3">{inst.index * 2}</span>
                    <span className={isActive ? 'text-indigo-700 font-black' : 'text-slate-600'}>{inst.op}</span>
                    <span className="opacity-60">{inst.arg}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleStep}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 rounded-xl border border-indigo-600 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            {stepIndex === instructions.length - 1 ? '🔄 Reset Program' : '➡️ Step Instruction'}
          </button>
        </div>

        {/* Right Column: Virtual Machine Stack */}
        <div className="flex-1 flex flex-col bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 relative justify-between min-h-0">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
            PVM Value Stack Simulator
          </span>

          {/* Value stack grid */}
          <div className="flex-1 flex flex-col justify-end items-center gap-2 py-8 min-h-0">
            <AnimatePresence>
              {stack.slice().reverse().map((val, idx) => (
                <motion.div
                  key={val}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="w-32 py-3 rounded-xl bg-white border-2 border-indigo-500 shadow-sm flex items-center justify-center font-mono font-black text-sm text-slate-800"
                >
                  {val}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Stack Base Indicator */}
            <div className="w-40 h-[2px] bg-slate-300 mt-2 relative">
              <span className="absolute bottom-[-16px] left-0 right-0 text-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Stack Base
              </span>
            </div>
          </div>

          {/* Execution details */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex justify-between items-center shrink-0">
            <div className="flex flex-col gap-0.5 flex-1 pr-2">
              <span className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider">Instruction Effect</span>
              <span className="text-xs font-bold text-slate-700 mt-0.5">
                {stepIndex === -1 ? 'Program loaded. Waiting to step.' : instructions[stepIndex].effect}
              </span>
            </div>
            {result !== null && (
              <div className="flex flex-col gap-0.5 items-end shrink-0 pl-2 border-l border-slate-200">
                <span className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider">Returned</span>
                <span className="text-sm font-black text-emerald-600 font-mono">{result}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scene04_ProgramExecution;
