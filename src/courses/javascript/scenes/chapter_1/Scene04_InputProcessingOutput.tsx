import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

type Stage = 'idle' | 'input' | 'processing' | 'output';

export const Scene04_InputProcessingOutput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('5');
  const [stage, setStage] = useState<Stage>('idle');
  const [outputValue, setOutputValue] = useState<string | null>(null);

  const handleProcess = () => {
    if (stage !== 'idle' && stage !== 'output') return;
    
    setStage('input');
    setOutputValue(null);

    // Simulate moving to processor
    setTimeout(() => {
      setStage('processing');
      
      // Simulate processing time
      setTimeout(() => {
        const num = parseFloat(inputValue);
        if (isNaN(num)) {
          setOutputValue('Error: Not a number');
        } else {
          setOutputValue((num * 2).toString());
        }
        setStage('output');
      }, 1500);

    }, 800);
  };

  const handleReset = () => {
    setStage('idle');
    setOutputValue(null);
    setInputValue('5');
  };

  return (
    <SceneLayout gap="gap-6">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-yellow-600 font-extrabold">
          Lesson 1.4 · Introduction to Programming
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          Input → Processing →{' '}
          <span className="text-yellow-600 font-serif italic">Output</span>
        </h2>
        <p className="text-slate-500 text-sm mt-2 max-w-3xl leading-relaxed">
          Almost all software follows the <strong>IPO (Input, Processing, Output)</strong> model. A program takes data in, does something to it, and gives a result back. Let's see it in action with a simple "Doubling Machine".
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Left: Concept Explanation */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4 text-lg">The IPO Model</h3>
             
             <div className="space-y-4">
               <div className={`p-3 rounded-xl border-2 transition-all ${stage === 'input' ? 'border-blue-400 bg-blue-50 scale-105' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
                 <div className="flex items-center gap-2 mb-1">
                   <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">1</span>
                   <h4 className="font-bold text-slate-700">Input</h4>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed">Data given to the computer (e.g., typing a number, clicking a mouse).</p>
               </div>

               <div className={`p-3 rounded-xl border-2 transition-all ${stage === 'processing' ? 'border-yellow-400 bg-yellow-50 scale-105' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
                 <div className="flex items-center gap-2 mb-1">
                   <span className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-xs">2</span>
                   <h4 className="font-bold text-slate-700">Processing</h4>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed">The computer performs calculations or manipulates the data.</p>
               </div>

               <div className={`p-3 rounded-xl border-2 transition-all ${stage === 'output' ? 'border-green-400 bg-green-50 scale-105' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
                 <div className="flex items-center gap-2 mb-1">
                   <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">3</span>
                   <h4 className="font-bold text-slate-700">Output</h4>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed">The final result is shown to the user or sent to another system.</p>
               </div>
             </div>
          </div>
          <button
              onClick={handleReset}
              className="px-4 py-3 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset Machine
          </button>
        </div>

        {/* Right: Interactive Machine */}
        <div className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden shadow-inner">
          <div className="absolute top-6 left-6 text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
             Simulation
          </div>

          <div className="max-w-2xl w-full mx-auto relative flex items-center justify-between gap-4 mt-8">
            
            {/* 1. Input Station */}
            <div className="w-1/3 flex flex-col items-center z-10">
              <div className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-sm w-full flex flex-col items-center">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-3">Input</span>
                <input 
                  type="number" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={stage !== 'idle' && stage !== 'output'}
                  className="w-full text-center text-3xl font-black text-slate-700 bg-slate-50 border-2 border-slate-200 rounded-lg py-2 focus:border-blue-400 focus:outline-none disabled:opacity-50"
                />
                <button 
                  onClick={handleProcess}
                  disabled={stage === 'processing' || stage === 'input'}
                  className="mt-3 w-full py-2 bg-blue-500 text-white rounded-lg text-sm font-bold shadow hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Data
                </button>
              </div>
            </div>

            {/* Connecting Pipe 1 */}
            <div className="flex-1 h-4 bg-slate-200 rounded-full relative overflow-hidden border-y border-slate-300">
               <AnimatePresence>
                 {stage === 'input' && (
                   <motion.div 
                     initial={{ left: '-20%' }}
                     animate={{ left: '120%' }}
                     transition={{ duration: 0.8, ease: "linear" }}
                     className="absolute top-0 bottom-0 w-8 bg-blue-400 blur-sm rounded-full"
                   />
                 )}
               </AnimatePresence>
            </div>

            {/* 2. Processing Station */}
            <div className="w-1/3 flex flex-col items-center z-10">
              <div className={`w-full rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 ${stage === 'processing' ? 'bg-yellow-400 border-4 border-yellow-500 shadow-xl shadow-yellow-200/50 scale-110' : 'bg-slate-700 border-4 border-slate-800 shadow-lg scale-100'}`}>
                 <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${stage === 'processing' ? 'text-yellow-900' : 'text-slate-400'}`}>Processor</span>
                 
                 <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Gears */}
                    <motion.div 
                      animate={{ rotate: stage === 'processing' ? 360 : 0 }}
                      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="text-4xl opacity-80">⚙️</span>
                    </motion.div>
                 </div>
                 <span className={`mt-2 font-mono text-sm font-bold ${stage === 'processing' ? 'text-yellow-900' : 'text-slate-300'}`}>
                   x 2
                 </span>
              </div>
            </div>

            {/* Connecting Pipe 2 */}
            <div className="flex-1 h-4 bg-slate-200 rounded-full relative overflow-hidden border-y border-slate-300">
               <AnimatePresence>
                 {stage === 'processing' && (
                   <motion.div 
                     initial={{ left: '-20%' }}
                     animate={{ left: '120%' }}
                     transition={{ delay: 1.2, duration: 0.8, ease: "linear" }}
                     className="absolute top-0 bottom-0 w-8 bg-green-400 blur-sm rounded-full"
                   />
                 )}
               </AnimatePresence>
            </div>

            {/* 3. Output Station */}
            <div className="w-1/3 flex flex-col items-center z-10">
              <div className="bg-white border-2 border-green-200 rounded-xl p-4 shadow-sm w-full flex flex-col items-center justify-center h-[142px]">
                <span className="text-xs font-bold text-green-500 uppercase tracking-wider mb-2">Output</span>
                <div className="flex-1 flex items-center justify-center w-full">
                  <AnimatePresence mode="wait">
                    {outputValue !== null ? (
                      <motion.span 
                        key="result"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl font-black text-slate-800"
                      >
                        {outputValue}
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="waiting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-slate-300 text-sm font-mono"
                      >
                        Waiting...
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene04_InputProcessingOutput;