import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal } from 'lucide-react';

const STEPS = [
  { emoji: '📝', label: 'You write',    desc: 'Human-readable instructions in plain English-like syntax' },
  { emoji: '⚙️', label: 'Python reads', desc: 'Executes line by line — no compiling, no waiting' },
  { emoji: '✅', label: 'You see',       desc: 'Results appear instantly — the fastest feedback loop in coding' },
];

export const Scene02_Intro: React.FC = () => {
  const [output, setOutput] = useState<string | null>(null);

  return (
    <div className="h-full w-full flex flex-row items-stretch gap-8 px-8 py-5 overflow-hidden">

      {/* Left */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 02</span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-800 mt-1 leading-[1.05]">
            Welcome to<br /><span className="text-amber-500">Python.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
            Think of Python like giving instructions to a very smart assistant. You write what you want — in plain, readable language — and Python just does it.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm"
            >
              <span className="text-2xl shrink-0">{s.emoji}</span>
              <div className="min-w-0">
                <p className="font-extrabold text-slate-800 text-sm">{s.label}</p>
                <p className="text-slate-500 text-xs mt-0.5 leading-snug">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: terminal */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-3">
        <div className="flex items-center gap-2 bg-slate-800 rounded-t-2xl px-5 py-2.5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <Terminal size={12} className="text-slate-400 ml-1.5" />
          <span className="text-xs font-mono font-bold text-slate-400">hello.py</span>
        </div>

        <div className="bg-slate-900 -mt-3 px-5 py-4 rounded-b-2xl font-mono text-xs leading-6 border border-slate-800 border-t-0">
          <span className="text-slate-500"># Your very first Python program</span><br />
          <span className="text-amber-400">print</span><span className="text-slate-300">(</span><span className="text-emerald-400">"Hello, Python World!"</span><span className="text-slate-300">)</span><br />
          <br />
          <span className="text-slate-500"># Variables need zero type declarations</span><br />
          <span className="text-sky-300">name</span><span className="text-slate-400"> = </span><span className="text-emerald-400">"Pythonista"</span><br />
          <span className="text-amber-400">print</span><span className="text-slate-300">(</span><span className="text-emerald-400">f"Welcome, </span><span className="text-amber-300">{'{'}</span><span className="text-sky-300">name</span><span className="text-amber-300">{'}'}</span><span className="text-emerald-400">!"</span><span className="text-slate-300">)</span><br />
          <br />
          <span className="text-slate-500"># Math works right out of the box</span><br />
          <span className="text-amber-400">print</span><span className="text-slate-300">(</span><span className="text-sky-400">2 ** 10</span><span className="text-slate-300">)</span>
        </div>

        <button
          onClick={() => setOutput('Hello, Python World!\nWelcome, Pythonista!\n1024')}
          className="self-start flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-xs font-extrabold shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <Play size={13} /> Run Code
        </button>

        <AnimatePresence mode="wait">
          {output ? (
            <motion.div
              key="out"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950 text-emerald-400 px-5 py-3.5 rounded-2xl font-mono text-xs border border-slate-800 whitespace-pre-line leading-6"
            >
              {output}
            </motion.div>
          ) : (
            <div className="bg-slate-950 text-slate-600 px-5 py-3.5 rounded-2xl font-mono text-xs border border-slate-800 h-16 flex items-center">
              Press Run to see output...
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene02_Intro;
