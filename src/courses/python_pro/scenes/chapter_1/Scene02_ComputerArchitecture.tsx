import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene02_ComputerArchitecture: React.FC = () => {
  const [pipelineState, setPipelineState] = useState<'idle' | 'loading' | 'loaded' | 'executing' | 'done'>('idle');

  const triggerPipelineCycle = async () => {
    setPipelineState('loading');
    
    // Simulate Storage -> RAM
    setTimeout(() => {
      setPipelineState('loaded');
      
      // Simulate RAM -> CPU
      setTimeout(() => {
        setPipelineState('executing');
        
        // Done
        setTimeout(() => {
          setPipelineState('done');
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const getStatusText = () => {
    switch (pipelineState) {
      case 'idle': return 'Click "Run Pipeline Cycle" to watch code execute.';
      case 'loading': return '1. OS copies code from permanent Storage to RAM...';
      case 'loaded': return '2. Code is ready in RAM. CPU fetches instruction...';
      case 'executing': return '3. CPU executes instruction inside ALU registers...';
      case 'done': return 'Success! Instruction complete. Click to reset.';
    }
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-6 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.2 · Computer Fundamentals
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          Computer <span className="text-indigo-600 font-serif italic">Architecture Basics</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-2xl leading-relaxed">
          The CPU, RAM, and Storage form the core pipeline. Watch how data streams between them during execution.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 items-stretch">
        
        {/* Left column - Live Controller */}
        <div className="flex-1 flex flex-col justify-center bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] gap-4">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Pipeline Controller
          </span>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Status Log</span>
            <p className="text-sm font-bold text-slate-800 mt-1.5 transition-all">
              {getStatusText()}
            </p>
          </div>

          <button
            onClick={() => {
              if (pipelineState === 'done' || pipelineState === 'idle') {
                triggerPipelineCycle();
              }
            }}
            disabled={pipelineState !== 'idle' && pipelineState !== 'done'}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3.5 rounded-xl border border-indigo-600 transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            {pipelineState === 'done' ? '🔄 Reset & Run Again' : '⚡ Run Pipeline Cycle'}
          </button>
        </div>

        {/* Right column - Physical Vector Animation */}
        <div className="flex-1 flex flex-col bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 relative justify-center items-center min-h-0">
          <span className="absolute top-4 left-5 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            System Data Flow
          </span>

          <div className="flex flex-col gap-6 w-full max-w-xs relative py-4">
            
            {/* CPU Component */}
            <div className={`p-4 rounded-xl border bg-white transition-all duration-300 flex items-center gap-3 ${
              pipelineState === 'executing' ? 'border-indigo-500 scale-105 shadow-sm ring-2 ring-indigo-500/10' : 'border-slate-200/80'
            }`}>
              <span className="text-2xl">🧠</span>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-extrabold text-slate-800">CPU</h4>
                  {pipelineState === 'executing' && <span className="text-[10px] font-mono text-indigo-600 font-bold animate-pulse">EXECUTING...</span>}
                </div>
                <p className="text-xs font-semibold text-slate-400">Registers & Arithmetic Logic</p>
              </div>
            </div>

            {/* RAM to CPU connection */}
            <div className="h-6 w-[2px] bg-slate-200 mx-auto relative">
              {pipelineState === 'loaded' && (
                <motion.div
                  initial={{ y: 24 }}
                  animate={{ y: 0 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  className="absolute left-[-3px] w-2 h-2 rounded-full bg-indigo-500"
                />
              )}
            </div>

            {/* RAM Component */}
            <div className={`p-4 rounded-xl border bg-white transition-all duration-300 flex items-center gap-3 ${
              pipelineState === 'loaded' ? 'border-indigo-500 scale-105 shadow-sm ring-2 ring-indigo-500/10' : 'border-slate-200/80'
            }`}>
              <span className="text-2xl">💾</span>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-extrabold text-slate-800">RAM</h4>
                  {(pipelineState === 'loaded' || pipelineState === 'loading') && <span className="text-[10px] font-mono text-indigo-600 font-bold animate-pulse">ACTIVE</span>}
                </div>
                <p className="text-xs font-semibold text-slate-400">Temporary Volatile Memory</p>
              </div>
            </div>

            {/* Storage to RAM connection */}
            <div className="h-6 w-[2px] bg-slate-200 mx-auto relative">
              {pipelineState === 'loading' && (
                <motion.div
                  initial={{ y: 24 }}
                  animate={{ y: 0 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  className="absolute left-[-3px] w-2 h-2 rounded-full bg-indigo-500"
                />
              )}
            </div>

            {/* Storage Component */}
            <div className={`p-4 rounded-xl border bg-white transition-all duration-300 flex items-center gap-3 ${
              pipelineState === 'loading' ? 'border-indigo-500 scale-105 shadow-sm ring-2 ring-indigo-500/10' : 'border-slate-200/80'
            }`}>
              <span className="text-2xl">💽</span>
              <div className="flex-1">
                <h4 className="text-sm font-extrabold text-slate-800">Storage (SSD)</h4>
                <p className="text-xs font-semibold text-slate-400">Persistent Disk Drive</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Scene02_ComputerArchitecture;
