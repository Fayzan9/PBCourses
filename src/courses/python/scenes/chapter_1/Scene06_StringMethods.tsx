import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const METHODS = [
  { name: '.upper()',      fn: (s: string) => s.toUpperCase(),                       desc: 'Makes every letter a capital.' },
  { name: '.lower()',      fn: (s: string) => s.toLowerCase(),                       desc: 'Makes every letter lowercase.' },
  { name: '.strip()',      fn: (s: string) => s.trim(),                              desc: 'Removes spaces from both ends — great for cleaning user input.' },
  { name: '.replace()',    fn: (s: string) => s.replace(/o/gi, '0'),                 desc: 'Swaps every "o" for "0". Useful for text manipulation.' },
  { name: '.split()',      fn: (s: string) => JSON.stringify(s.split(' ')),          desc: 'Splits on spaces, returns a list of words.' },
  { name: '.startswith()',fn:  (s: string) => String(s.toLowerCase().startsWith('p') || s.startsWith('P')), desc: 'Checks if text begins with a pattern. Returns True or False.' },
  { name: 'len()',         fn: (s: string) => String(s.length),                     desc: 'Counts every character — spaces included.' },
  { name: 'f-string',      fn: (s: string) => `Hi, ${s}! That's ${s.length} characters.`, desc: 'Embeds variables directly inside a string with {}.' },
];

export const Scene06_StringMethods: React.FC = () => {
  const [input, setInput] = useState('  Python World  ');
  const [activeIdx, setActiveIdx] = useState(2);

  const active = METHODS[activeIdx];
  const output = active.fn(input);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 h-full w-full max-w-7xl mx-auto px-8 py-6">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-7">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 06</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 mt-2 leading-[1.05]">
            Strings come with<br />
            <span className="text-amber-500">superpowers.</span>
          </h2>
          <p className="text-slate-500 text-base mt-4 leading-relaxed max-w-sm">
            Strings have dozens of built-in methods — functions you call with a dot. Think of them as tools attached to the string itself. Pick one and watch it transform live.
          </p>
        </div>

        {/* Input field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Your string</label>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type anything..."
            className="border-2 border-slate-200 focus:border-amber-400 rounded-2xl px-5 py-3.5 font-mono text-base text-slate-800 outline-none focus:ring-4 focus:ring-amber-400/10 transition-all"
          />
        </div>

        {/* Method grid */}
        <div className="flex flex-wrap gap-2">
          {METHODS.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-extrabold border-2 transition-all cursor-pointer ${
                i === activeIdx
                  ? 'bg-amber-500 text-white border-amber-500 shadow-lg'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-amber-300 hover:text-amber-600'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-slate-500 text-sm leading-relaxed bg-slate-50 rounded-2xl px-5 py-3 border border-slate-200"
          >
            <span className="font-extrabold text-slate-700 font-mono">{active.name}</span> — {active.desc}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Right: before → after */}
      <div className="flex-1 flex flex-col items-center gap-6 w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx + input}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col gap-4"
          >
            {/* Before */}
            <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl px-6 py-5">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Before</p>
              <p className="font-mono text-lg font-bold text-slate-700 break-all">"{input}"</p>
            </div>

            {/* Arrow + method */}
            <div className="flex items-center gap-3 justify-center">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="font-mono text-sm font-extrabold text-amber-600 bg-amber-50 border-2 border-amber-300 px-4 py-1.5 rounded-full whitespace-nowrap">
                {active.name}
              </span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-400 to-transparent" />
            </div>

            {/* After */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl px-6 py-5">
              <p className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider mb-2">After</p>
              <p className="font-mono text-lg font-bold text-emerald-700 break-all">{output}</p>
            </div>

            {/* Code snippet */}
            <div className="bg-slate-900 rounded-2xl px-5 py-4 font-mono text-sm border border-slate-800">
              <span className="text-slate-500">&gt;&gt;&gt; </span>
              {activeIdx < 6 ? (
                <>
                  <span className="text-emerald-400">"{input.trim()}"</span>
                  <span className="text-amber-300">{active.name.split('(')[0]}</span>
                  <span className="text-amber-400">(</span>
                  {active.name === '.replace()' && <span className="text-emerald-400">"o", "0"</span>}
                  {active.name === '.startswith()' && <span className="text-emerald-400">"P"</span>}
                  <span className="text-amber-400">)</span>
                </>
              ) : activeIdx === 6 ? (
                <>
                  <span className="text-sky-400">len</span>
                  <span className="text-amber-400">(</span>
                  <span className="text-emerald-400">"{input.trim()}"</span>
                  <span className="text-amber-400">)</span>
                </>
              ) : (
                <>
                  <span className="text-amber-300">f"Hi, </span>
                  <span className="text-amber-400">{'{'}</span>
                  <span className="text-sky-300">name</span>
                  <span className="text-amber-400">{'}'}</span>
                  <span className="text-amber-300">!"</span>
                </>
              )}
              <br />
              <span className="text-emerald-400">{output}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene06_StringMethods;
