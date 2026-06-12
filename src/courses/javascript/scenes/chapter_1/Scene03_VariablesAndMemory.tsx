import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene03_VariablesAndMemory: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);

  // The code script to step through
  const script = [
    {
      code: 'let playerName = "Alex";',
      desc: 'We create a new string variable. The computer finds an empty box in memory, labels it "playerName", and puts the text "Alex" inside.',
      memoryState: [{ name: 'playerName', value: '"Alex"', type: 'string', updated: true }],
    },
    {
      code: 'let score = 0;',
      desc: 'Next, we create a number variable. The computer finds another box, labels it "score", and puts the number 0 inside.',
      memoryState: [
        { name: 'playerName', value: '"Alex"', type: 'string', updated: false },
        { name: 'score', value: '0', type: 'number', updated: true }
      ],
    },
    {
      code: 'score = score + 50;',
      desc: 'We update the score. The computer looks inside the "score" box (finds 0), adds 50 to it, and overwrites the box with the new value.',
      memoryState: [
        { name: 'playerName', value: '"Alex"', type: 'string', updated: false },
        { name: 'score', value: '50', type: 'number', updated: true }
      ],
    },
    {
      code: 'let isGameOver = false;',
      desc: 'Finally, we create a boolean (true/false) variable called "isGameOver".',
      memoryState: [
        { name: 'playerName', value: '"Alex"', type: 'string', updated: false },
        { name: 'score', value: '50', type: 'number', updated: false },
        { name: 'isGameOver', value: 'false', type: 'boolean', updated: true }
      ],
    }
  ];

  const handleNext = () => {
    if (currentLine < script.length) {
      setCurrentLine(currentLine + 1);
    }
  };

  const handleReset = () => {
    setCurrentLine(0);
  };

  return (
    <SceneLayout gap="gap-6">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-yellow-600 font-extrabold">
          Lesson 1.3 · Introduction to Programming
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          Variables and{' '}
          <span className="text-yellow-600 font-serif italic">Memory</span>
        </h2>
        <p className="text-slate-500 text-sm mt-2 max-w-3xl leading-relaxed">
          A variable is like a named container for storing data. When you create a variable, the computer reserves a specific spot in its memory (RAM) to hold that information so you can use and change it later.
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Left: Code Editor Simulator */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-[#1E1E1E] rounded-2xl shadow-xl border border-slate-800 flex-1 flex flex-col overflow-hidden">
            {/* Fake Window Controls */}
            <div className="bg-[#2D2D2D] px-4 py-3 flex items-center gap-2 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs font-mono text-slate-400">game.js</span>
            </div>
            
            {/* Code Area */}
            <div className="p-4 font-mono text-sm leading-loose flex-1">
              {script.map((step, index) => {
                const isActive = index === currentLine - 1;
                const isFuture = index >= currentLine;
                
                return (
                  <div 
                    key={index} 
                    className={`flex items-center px-2 py-1 rounded transition-colors ${isActive ? 'bg-blue-500/20 border-l-2 border-blue-400' : 'border-l-2 border-transparent'} ${isFuture ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <span className="w-6 text-slate-500 select-none">{index + 1}</span>
                    <span className="text-blue-300">
                      {step.code.startsWith('let') ? 'let ' : ''}
                    </span>
                    <span className="text-slate-200">
                      {step.code.replace('let ', '')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explanation Area */}
            <div className="bg-[#252526] p-4 border-t border-slate-800 min-h-[100px]">
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest font-bold mb-2 block">
                What's happening?
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">
                {currentLine === 0 
                  ? "Click 'Run Next Line' to execute the code step by step." 
                  : script[currentLine - 1].desc}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleNext}
              disabled={currentLine === script.length}
              className="flex-1 py-3 rounded-xl text-sm font-black text-white bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {currentLine === script.length ? 'Program Finished' : 'Run Next Line ⚡'}
            </button>
          </div>
        </div>

        {/* Right: RAM Memory Visualizer */}
        <div className="w-full lg:w-1/2 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-inner flex flex-col relative">
           <div className="absolute top-6 right-6 flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
               RAM Memory
             </span>
           </div>

           <h3 className="text-lg font-bold text-slate-700 mb-6">Computer Memory</h3>

           <div className="flex-1 grid grid-cols-2 gap-4 auto-rows-max">
             {/* Memory Blocks */}
             <AnimatePresence>
               {currentLine > 0 ? (
                 script[currentLine - 1].memoryState.map((variable) => (
                   <motion.div
                     key={variable.name}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className={`border-2 rounded-xl p-4 flex flex-col relative overflow-hidden bg-white shadow-sm ${
                       variable.updated ? 'border-emerald-400' : 'border-slate-200'
                     }`}
                   >
                     {/* Update flash effect */}
                     {variable.updated && (
                       <motion.div 
                         initial={{ opacity: 1 }}
                         animate={{ opacity: 0 }}
                         transition={{ duration: 1 }}
                         className="absolute inset-0 bg-emerald-100"
                       />
                     )}

                     <div className="relative z-10 flex flex-col h-full">
                       <span className="text-[10px] font-mono font-bold text-slate-400 mb-1">
                         Type: {variable.type}
                       </span>
                       <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded w-max mb-3 border border-slate-200">
                         {variable.name}
                       </span>
                       <div className="flex-1 flex items-end">
                         <span className={`font-mono text-xl font-black ${
                           variable.type === 'string' ? 'text-orange-500' : 
                           variable.type === 'number' ? 'text-blue-500' : 'text-purple-500'
                         }`}>
                           {variable.value}
                         </span>
                       </div>
                     </div>
                   </motion.div>
                 ))
               ) : (
                 <div className="col-span-2 flex flex-col items-center justify-center h-48 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                   <span className="text-2xl mb-2">📭</span>
                   <span className="text-sm">Memory is empty</span>
                 </div>
               )}
             </AnimatePresence>
             
             {/* Empty placeholders to show RAM is a grid */}
             {currentLine > 0 && Array.from({ length: Math.max(0, 4 - script[currentLine - 1].memoryState.length) }).map((_, i) => (
               <div key={`empty-${i}`} className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex items-center justify-center bg-transparent opacity-50">
                 <span className="text-xs font-mono text-slate-300">Empty Address</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene03_VariablesAndMemory;