import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

type Command = 'right' | 'left' | 'down' | 'up';
type Status = 'idle' | 'running' | 'success' | 'crashed' | 'incomplete';

export const Scene01_WhatIsProgramming: React.FC = () => {
  const [program, setProgram] = useState<Command[]>([]);
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [executionStep, setExecutionStep] = useState(-1);
  const [status, setStatus] = useState<Status>('idle');

  const MAX_STEPS = 8;
  const GRID_SIZE = 4;
  const TARGET_POS = { x: 3, y: 3 };

  const addCommand = (cmd: Command) => {
    if (program.length < MAX_STEPS && !isRunning) {
      setProgram([...program, cmd]);
      if (status !== 'idle') {
        setStatus('idle');
        setRobotPos({ x: 0, y: 0 });
        setExecutionStep(-1);
      }
    }
  };

  const removeCommand = (index: number) => {
    if (!isRunning) {
      setProgram(program.filter((_, i) => i !== index));
      setStatus('idle');
      setRobotPos({ x: 0, y: 0 });
      setExecutionStep(-1);
    }
  };

  const clearProgram = () => {
    if (!isRunning) {
      setProgram([]);
      setStatus('idle');
      setRobotPos({ x: 0, y: 0 });
      setExecutionStep(-1);
    }
  };

  const runProgram = async () => {
    if (program.length === 0 || isRunning) return;
    
    setIsRunning(true);
    setStatus('running');
    setRobotPos({ x: 0, y: 0 });
    setExecutionStep(-1);

    let currentX = 0;
    let currentY = 0;

    await new Promise((r) => setTimeout(r, 400));

    for (let i = 0; i < program.length; i++) {
      setExecutionStep(i);
      const cmd = program[i];

      if (cmd === 'right') currentX++;
      if (cmd === 'left') currentX--;
      if (cmd === 'down') currentY++;
      if (cmd === 'up') currentY--;

      setRobotPos({ x: currentX, y: currentY });

      if (
        currentX < 0 ||
        currentX >= GRID_SIZE ||
        currentY < 0 ||
        currentY >= GRID_SIZE
      ) {
        await new Promise((r) => setTimeout(r, 300));
        setStatus('crashed');
        setIsRunning(false);
        return;
      }

      await new Promise((r) => setTimeout(r, 600));
    }

    if (currentX === TARGET_POS.x && currentY === TARGET_POS.y) {
      setStatus('success');
    } else {
      setStatus('incomplete');
    }
    
    setExecutionStep(-1);
    setIsRunning(false);
  };

  return (
    <SceneLayout gap="gap-4">
      {/* Header - Compact */}
      <div className="shrink-0">
        <span className="text-xs font-mono uppercase tracking-widest text-yellow-600 font-extrabold">
          Lesson 1.1 · Introduction to Programming
        </span>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 mt-0.5 leading-[1.1]">
          What Is{' '}
          <span className="text-yellow-600 font-serif italic">Programming?</span>
        </h2>
        <p className="text-slate-500 text-xs mt-1 max-w-4xl leading-relaxed">
          Computers are fast but not smart. <strong className="text-slate-700 font-semibold">Programming is the act of giving a computer exact, step-by-step instructions</strong> to complete a task.
        </p>
      </div>

      {/* Main 3-Column Studio Workspace */}
      <div className="flex-1 flex gap-4 min-h-0 h-full items-stretch">
        
        {/* Column 1: Control Panel (Commands & Tips) */}
        <div className="w-[280px] shrink-0 flex flex-col gap-3 min-h-0">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between shrink-0">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400 mb-1">
                1. Instruction Toolbox
              </div>
              <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                Click instructions below to append them to your computer program.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addCommand('up')}
                disabled={isRunning || program.length >= MAX_STEPS}
                className="py-2 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>⬆️</span> Up
              </button>
              <button
                onClick={() => addCommand('down')}
                disabled={isRunning || program.length >= MAX_STEPS}
                className="py-2 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>⬇️</span> Down
              </button>
              <button
                onClick={() => addCommand('left')}
                disabled={isRunning || program.length >= MAX_STEPS}
                className="py-2 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>⬅️</span> Left
              </button>
              <button
                onClick={() => addCommand('right')}
                disabled={isRunning || program.length >= MAX_STEPS}
                className="py-2 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>➡️</span> Right
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 flex-1 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest font-bold text-yellow-700 mb-2">
                Core Concept
              </div>
              <p className="text-xs text-yellow-900/80 leading-relaxed font-medium space-y-2">
                Your computer executes instructions in a strict, linear order—starting from Step 1, all the way to the end.
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-yellow-200/50 text-[11px] font-mono text-yellow-800">
              Goal: Program the robot (🤖) to safely reach the star (🌟).
            </div>
          </div>
        </div>

        {/* Column 2: Program Editor (IDE style) */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] border border-slate-800 rounded-2xl shadow-lg min-h-0 overflow-hidden">
          {/* Editor Header */}
          <div className="h-10 bg-[#181818] border-b border-[#2d2d2d] flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </span>
              <span className="text-xs font-mono text-slate-400 ml-2">robot_navigator.py</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">
              {program.length}/{MAX_STEPS} Steps
            </span>
          </div>

          {/* Code Editor body with fixed scrollable area */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-6 text-slate-300 min-h-0">
            <div className="text-slate-500 italic text-xs mb-3"># Python instructions list</div>
            
            <AnimatePresence mode="popLayout">
              {program.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-slate-500 italic py-8 text-center"
                >
                  [Program is currently empty]
                  <br />Click commands on the left to start writing code.
                </motion.div>
              ) : (
                <div className="space-y-1.5">
                  {program.map((cmd, i) => (
                    <motion.div
                      key={`${i}-${cmd}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`group flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all ${
                        executionStep === i
                          ? 'bg-yellow-500/15 border-yellow-500/50 text-yellow-200'
                          : 'bg-[#252526] border-transparent hover:border-[#3e3e42]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-600 font-semibold select-none w-4">{i + 1}</span>
                        <span className={executionStep === i ? 'text-yellow-400 font-bold' : 'text-[#9cdcfe]'}>
                          move_{cmd}()
                        </span>
                      </div>
                      
                      <button
                        onClick={() => removeCommand(i)}
                        disabled={isRunning}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity p-0.5 disabled:opacity-0"
                        title="Delete Instruction"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Editor Action Bar - Compact */}
          <div className="p-3 bg-[#151515] border-t border-[#2d2d2d] flex gap-2 shrink-0">
            <button
              onClick={clearProgram}
              disabled={isRunning || program.length === 0}
              className="px-3 py-2 text-xs font-bold text-slate-400 bg-[#252526] rounded-lg border border-[#3e3e42] hover:bg-[#2d2d2e] disabled:opacity-40 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={runProgram}
              disabled={isRunning || program.length === 0}
              className="flex-1 py-2 rounded-lg text-xs font-black text-slate-900 bg-yellow-500 hover:bg-yellow-600 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-yellow-500/10"
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full"
                  />
                  Executing...
                </>
              ) : (
                '▶ Run Program'
              )}
            </button>
          </div>
        </div>

        {/* Column 3: Live Environment & Output Feed */}
        <div className="w-[300px] shrink-0 flex flex-col gap-3 min-h-0">
          
          {/* Grid Simulator - Fitted exactly to preserve heights */}
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            <span className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
              Live Environment
            </span>

            {/* Perfect-sized 4x4 Grid (220x220px to perfectly prevent overflows) */}
            <div 
              className="relative bg-white border-2 border-slate-200/80 rounded-xl shadow-inner grid"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                width: '200px',
                height: '200px'
              }}
            >
              {/* Cells */}
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                <div key={i} className="border border-slate-100/50" />
              ))}

              {/* Target (Star) */}
              <div 
                className="absolute flex items-center justify-center text-2xl drop-shadow-sm select-none"
                style={{
                  width: `${100 / GRID_SIZE}%`,
                  height: `${100 / GRID_SIZE}%`,
                  left: `${(TARGET_POS.x * 100) / GRID_SIZE}%`,
                  top: `${(TARGET_POS.y * 100) / GRID_SIZE}%`,
                }}
              >
                🌟
              </div>

              {/* Robot */}
              <motion.div
                className="absolute flex items-center justify-center text-3xl drop-shadow-md z-10 select-none"
                initial={false}
                animate={{
                  left: `${(robotPos.x * 100) / GRID_SIZE}%`,
                  top: `${(robotPos.y * 100) / GRID_SIZE}%`,
                  rotate: status === 'crashed' ? 90 : 0,
                  scale: status === 'crashed' ? 0.8 : 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 15,
                  mass: 0.8
                }}
                style={{
                  width: `${100 / GRID_SIZE}%`,
                  height: `${100 / GRID_SIZE}%`,
                }}
              >
                🤖
              </motion.div>
            </div>
          </div>

          {/* Micro Console Output */}
          <div className="bg-[#121212] rounded-2xl border border-slate-900 p-3.5 shadow-md shrink-0">
            <div className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${status === 'running' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
              Terminal Feed
            </div>
            
            <div className="font-mono text-xs min-h-[52px] leading-relaxed flex items-center">
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-400">
                    &gt; Build a program, then press Run to test.
                  </motion.div>
                )}
                {status === 'running' && (
                  <motion.div key="running" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-yellow-400">
                    &gt; Executing step {executionStep + 1}...
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 font-semibold">
                    &gt; SUCCESS! Destination reached! 🎉
                  </motion.div>
                )}
                {status === 'crashed' && (
                  <motion.div key="crashed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400">
                    &gt; CRASH! Instruction sequence led off grid.
                  </motion.div>
                )}
                {status === 'incomplete' && (
                  <motion.div key="incomplete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-orange-400">
                    &gt; Program ended without reaching target.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene01_WhatIsProgramming;