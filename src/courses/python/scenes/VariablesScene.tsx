import React from 'react';
import { motion } from 'framer-motion';

export const VariablesScene: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl p-6 glass-panel rounded-2xl">
      <h2 className="text-2xl font-extrabold text-slate-800">Dynamic Typing</h2>
      <p className="text-slate-600 text-sm">
        In Python, variables are dynamically typed. This means you don't need to declare their type explicitly, and they can change types dynamically.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3 bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs">
          <span className="text-yellow-400"># Assign integer</span>
          <span>x = <span className="text-amber-400">42</span></span>
          <span>print(type(x))</span>
          <span className="text-yellow-400"># Reassign string</span>
          <span>x = <span className="text-emerald-400">"Now I am a string"</span></span>
          <span>print(type(x))</span>
        </div>
        <div className="border border-slate-200/80 bg-white/50 rounded-xl p-4 flex flex-col justify-center gap-2">
          <h4 className="text-xs font-bold text-slate-700">Memory Allocation Visualizer</h4>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">x</span>
            <span className="text-slate-400">→</span>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-xs font-mono bg-amber-100 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200"
            >
              int: 42
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VariablesScene;
