import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal } from 'lucide-react';

const STEPS = [
  { emoji: '📝', label: 'You write',    desc: 'Human-readable instructions in plain English-like syntax' },
  { emoji: '⚙️', label: 'Python reads', desc: 'Executes line by line — no compiling, no waiting' },
  { emoji: '✅', label: 'You see',       desc: 'Results appear instantly — the fastest feedback loop in coding' },
];

const CODE_LINES = [
  { code: '# Your very first Python program',  type: 'comment' },
  { code: 'print("Hello, Python World!")',       type: 'code' },
  { code: '',                                    type: 'blank' },
  { code: '# Variables need zero type declarations',  type: 'comment' },
  { code: 'name = "Pythonista"',                 type: 'code' },
  { code: 'print(f"Welcome, {name}!")',           type: 'code' },
  { code: '',                                    type: 'blank' },
  { code: '# Math works right out of the box',  type: 'comment' },
  { code: 'print(2 ** 10)',                      type: 'code' },
];

export const Scene02_Intro: React.FC = () => {
  const [output, setOutput] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 h-full w-full max-w-7xl mx-auto px-8 py-6">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 02</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 mt-2 leading-[1.05]">
            Welcome to<br />
            <span className="text-amber-500">Python.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg mt-4 leading-relaxed max-w-md">
            Think of Python like giving instructions to a very smart assistant. You write what you want done — in plain, readable language — and Python just does it.
          </p>
        </div>

        {/* 3-step flow */}
        <div className="flex flex-col gap-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex items-center gap-5 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm"
            >
              <span className="text-3xl">{s.emoji}</span>
              <div>
                <p className="font-extrabold text-slate-800 text-base">{s.label}</p>
                <p className="text-slate-500 text-sm mt-0.5">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: terminal */}
      <div className="flex-1 flex flex-col gap-3 w-full">
        {/* Window chrome */}
        <div className="flex items-center gap-2 bg-slate-800 rounded-t-2xl px-5 py-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Terminal size={13} className="text-slate-400" />
            <span className="text-xs font-mono font-bold text-slate-400">hello.py</span>
          </div>
        </div>

        {/* Code body */}
        <div className="bg-slate-900 -mt-3 px-6 py-5 rounded-b-2xl font-mono text-sm leading-7 border border-slate-800 border-t-0">
          {CODE_LINES.map((line, i) => (
            <div key={i}>
              {line.type === 'comment' && <span className="text-slate-500">{line.code}</span>}
              {line.type === 'code' && (
                <span className="text-slate-200">
                  {line.code.includes('print') && (
                    <>
                      <span className="text-amber-400">print</span>
                      <span className="text-slate-300">(</span>
                      {line.code.includes('f"') ? (
                        <span className="text-emerald-400">{line.code.slice(line.code.indexOf('(') + 1, -1)}</span>
                      ) : (
                        <span className="text-emerald-400">{line.code.slice(line.code.indexOf('(') + 1, -1)}</span>
                      )}
                      <span className="text-slate-300">)</span>
                    </>
                  )}
                  {line.code.includes('name =') && (
                    <>
                      <span className="text-sky-300">name</span>
                      <span className="text-slate-400"> = </span>
                      <span className="text-emerald-400">"Pythonista"</span>
                    </>
                  )}
                </span>
              )}
              {line.type === 'blank' && <br />}
            </div>
          ))}
        </div>

        <button
          onClick={() => setOutput('Hello, Python World!\nWelcome, Pythonista!\n1024')}
          className="self-start flex items-center gap-2.5 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-sm font-extrabold shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <Play size={15} /> Run Code
        </button>

        <AnimatePresence mode="wait">
          {output ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950 text-emerald-400 px-6 py-4 rounded-2xl font-mono text-sm border border-slate-800 whitespace-pre-line leading-7"
            >
              {output}
            </motion.div>
          ) : (
            <div className="bg-slate-950 text-slate-600 px-6 py-4 rounded-2xl font-mono text-sm border border-slate-800 h-24 flex items-center">
              Press Run to see output...
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene02_Intro;
