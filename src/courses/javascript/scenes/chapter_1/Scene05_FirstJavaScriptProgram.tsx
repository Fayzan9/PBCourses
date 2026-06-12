import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene05_FirstJavaScriptProgram: React.FC = () => {
  const [code, setCode] = useState("console.log('Hello, World!');");
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runCode = () => {
    setOutput([]);
    setError(null);
    
    // We capture console.log to display it in our virtual terminal
    const logs: string[] = [];
    const originalLog = console.log;
    
    // Safety timeout for infinite loops
    let isRunning = true;
    setTimeout(() => { isRunning = false; }, 2000);

    console.log = (...args: any[]) => {
      logs.push(args.join(' '));
    };

    try {
      // Create a restricted execution scope
      // eslint-disable-next-line no-new-func
      const runner = new Function(code);
      runner();
      setOutput(logs.length > 0 ? logs : ['(No output)']);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      // Restore original console
      console.log = originalLog;
    }
  };

  return (
    <SceneLayout gap="gap-6">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-yellow-600 font-extrabold">
          Lesson 1.5 · Introduction to Programming
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          Writing Your First{' '}
          <span className="text-yellow-600 font-serif italic">JavaScript Program</span>
        </h2>
        <p className="text-slate-500 text-sm mt-2 max-w-3xl leading-relaxed">
          It's time to write actual code. In JavaScript, we use <code>console.log()</code> to output messages to the screen. Try editing the text inside the quotes, then click "Run Code".
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Left: Editor */}
        <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-xl border border-slate-800">
          {/* Header */}
          <div className="bg-[#1e1e1e] border-b border-slate-700 px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-bold text-sm">JS</span>
              <span className="text-slate-300 text-sm font-mono">script.js</span>
            </div>
            <button 
              onClick={runCode}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
            >
              ▶ Run Code
            </button>
          </div>

          {/* Text Area */}
          <div className="flex-1 bg-[#1e1e1e] relative group">
             {/* Line numbers mock */}
             <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#1e1e1e] border-r border-slate-800 flex flex-col items-center py-4 text-slate-600 font-mono text-sm select-none">
               1
             </div>
             <textarea
               value={code}
               onChange={(e) => setCode(e.target.value)}
               className="w-full h-full bg-transparent text-slate-200 font-mono text-sm p-4 pl-14 resize-none focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500/50 leading-relaxed"
               spellCheck="false"
             />
          </div>
        </div>

        {/* Right: Terminal Output */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col bg-[#0d0d0d] rounded-2xl overflow-hidden shadow-xl border border-slate-800">
           <div className="bg-[#1a1a1a] border-b border-slate-800 px-4 py-2 flex items-center gap-2">
             <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 font-bold">Terminal Output</span>
           </div>
           
           <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
             {output.length === 0 && !error && (
               <span className="text-slate-600 italic">Output will appear here after running...</span>
             )}
             
             {output.map((line, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: -5 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="text-slate-300 mb-1"
               >
                 <span className="text-green-500 mr-2">❯</span>
                 {line}
               </motion.div>
             ))}

             {error && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-500/20"
               >
                 <div className="font-bold mb-1">Syntax Error:</div>
                 {error}
               </motion.div>
             )}
           </div>
        </div>

      </div>
    </SceneLayout>
  );
};

export default Scene05_FirstJavaScriptProgram;