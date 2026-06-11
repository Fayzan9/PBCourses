import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Terminal } from 'lucide-react';

const steps = [
  {
    label: 'Write',
    desc: 'Type Python instructions in a file or the REPL',
    icon: '📝',
  },
  {
    label: 'Interpret',
    desc: 'Python reads and executes line by line — no compiling',
    icon: '⚙️',
  },
  {
    label: 'Output',
    desc: 'Results appear immediately — fast feedback loop',
    icon: '✅',
  },
];

export const Scene02_Intro: React.FC = () => {
  const [output, setOutput] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 h-full w-full max-w-5xl mx-auto px-4 py-4">
      {/* Left: concept */}
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 02</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            Welcome to Python
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Python is a high-level, interpreted language built for readability. You write instructions; Python executes them instantly.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="text-sm font-extrabold text-slate-800">{s.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: code editor */}
      <div className="flex-1 flex flex-col gap-3 w-full">
        <div className="flex items-center gap-2 bg-slate-800 rounded-t-xl px-4 py-2.5">
          <Terminal size={14} className="text-slate-400" />
          <span className="text-xs font-mono font-bold text-slate-400">hello.py</span>
        </div>
        <div className="flex flex-col gap-1.5 bg-slate-900 text-slate-200 px-5 py-4 font-mono text-sm leading-relaxed -mt-3 rounded-b-xl">
          <span className="text-slate-500"># Your first Python program</span>
          <span>print<span className="text-amber-400">(</span><span className="text-emerald-400">"Hello, Python World!"</span><span className="text-amber-400">)</span></span>
          <span className="mt-1 text-slate-500"># Variables need no type declaration</span>
          <span>name <span className="text-slate-400">=</span> <span className="text-emerald-400">"Pythonista"</span></span>
          <span>print<span className="text-amber-400">(</span><span className="text-emerald-400">f"Welcome, <span className="text-amber-300">{'{'}</span>name<span className="text-amber-300">{'}'}</span>!"</span><span className="text-amber-400">)</span></span>
          <span className="mt-1 text-slate-500"># Math works out of the box</span>
          <span>print<span className="text-amber-400">(</span><span className="text-sky-400">2 ** 10</span><span className="text-amber-400">)</span></span>
        </div>

        <button
          onClick={() => setOutput("Hello, Python World!\nWelcome, Pythonista!\n1024")}
          className="self-start flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-xs font-extrabold shadow active:scale-95 transition-all cursor-pointer"
        >
          <Play size={13} /> Run Code
        </button>

        {output ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs border border-slate-800 whitespace-pre-line leading-relaxed"
          >
            {output}
          </motion.div>
        ) : (
          <div className="bg-slate-950 text-slate-600 p-4 rounded-xl font-mono text-xs border border-slate-800 h-20 flex items-center">
            Press Run to see output...
          </div>
        )}
      </div>
    </div>
  );
};

export default Scene02_Intro;
