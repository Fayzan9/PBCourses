import React, { useState } from 'react';
import { Play } from 'lucide-react';

export const IntroScene: React.FC = () => {
  const [codeOutput, setCodeOutput] = useState<string>('Click Run to execute code');

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl p-6 glass-panel rounded-2xl">
      <h2 className="text-2xl font-extrabold text-slate-800">Welcome to Python</h2>
      <p className="text-slate-600 text-sm">
        Python is a high-level, interpreted programming language known for its readability and simplicity. Let's start with a classic:
      </p>
      <div className="flex flex-col gap-3 bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs shadow-inner relative">
        <span className="absolute top-2 right-3 text-[10px] text-slate-500 font-bold uppercase">Python 3.x</span>
        <span className="text-yellow-400"># The classic first program</span>
        <span>print(<span className="text-emerald-400">"Hello, Python World!"</span>)</span>
        <span>name = <span className="text-emerald-400">"Antigravity"</span></span>
        <span>print(<span className="text-emerald-400">f"Welcome back, {"{name}"}!"</span>)</span>
      </div>
      <button
        onClick={() => setCodeOutput("Hello, Python World!\nWelcome back, Antigravity!")}
        className="self-start flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-500 shadow active:scale-95 transition-all cursor-pointer"
      >
        <Play size={14} /> Run Code
      </button>
      <div className="bg-slate-950 text-emerald-400 p-3 rounded-xl font-mono text-xs border border-slate-800 h-20 overflow-y-auto">
        {codeOutput}
      </div>
    </div>
  );
};
export default IntroScene;
