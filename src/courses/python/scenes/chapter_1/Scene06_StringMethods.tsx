import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const METHODS = [
  { name: '.upper()',    fn: (s: string) => s.toUpperCase(),             desc: 'Converts all characters to uppercase' },
  { name: '.lower()',    fn: (s: string) => s.toLowerCase(),             desc: 'Converts all characters to lowercase' },
  { name: '.strip()',    fn: (s: string) => s.trim(),                    desc: 'Removes leading and trailing whitespace' },
  { name: '.replace()',  fn: (s: string) => s.replace(/o/gi, '0'),       desc: 'Replaces all occurrences: .replace("o","0")' },
  { name: '.split()',    fn: (s: string) => JSON.stringify(s.split(' ')),desc: 'Splits into a list on spaces' },
  { name: '.startswith()',fn: (s: string) => String(s.startsWith('P') || s.startsWith('p')), desc: 'Returns True if string starts with "P"' },
  { name: 'f-string',   fn: (s: string) => `Hello, ${s}! (length: ${s.length})`, desc: 'f"Hello, {name}! (length: {len(name)})"' },
  { name: 'len()',       fn: (s: string) => String(s.length),            desc: 'Returns the number of characters' },
];

export const Scene06_StringMethods: React.FC = () => {
  const [input, setInput] = useState('Python World');
  const [activeIdx, setActiveIdx] = useState(0);
  const [ran, setRan] = useState(false);

  const active = METHODS[activeIdx];
  const output = active.fn(input);

  const handleRun = () => {
    setRan(true);
    setTimeout(() => setRan(false), 100);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 h-full w-full max-w-5xl mx-auto px-4 py-4">
      {/* Left */}
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 06</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            String Methods
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Strings come with built-in methods — functions called with a dot. Try them live below.
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Your string</label>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type anything..."
            className="border border-slate-300 rounded-xl px-4 py-2.5 font-mono text-sm text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
        </div>

        {/* Method grid */}
        <div className="flex flex-wrap gap-2">
          {METHODS.map((m, i) => (
            <button
              key={m.name}
              onClick={() => { setActiveIdx(i); setRan(false); }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-extrabold border transition-all cursor-pointer ${
                i === activeIdx
                  ? 'bg-amber-500 text-white border-amber-500 shadow'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-600'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400">{active.desc}</p>
      </div>

      {/* Right: live demo */}
      <div className="flex-1 flex flex-col gap-4 w-full max-w-sm">
        {/* Code preview */}
        <div className="bg-slate-900 rounded-xl px-5 py-4 font-mono text-sm text-slate-200">
          <span className="text-slate-500">&gt;&gt;&gt; </span>
          {activeIdx === 6 ? (
            <>
              <span className="text-slate-300">name = </span>
              <span className="text-emerald-400">"{input}"</span>
              <br />
              <span className="text-slate-500">&gt;&gt;&gt; </span>
              <span className="text-amber-300">f"Hello, </span>
              <span className="text-amber-400">{'{'}</span>
              <span className="text-white">name</span>
              <span className="text-amber-400">{'}'}</span>
              <span className="text-amber-300">! (length: </span>
              <span className="text-amber-400">{'{'}</span>
              <span className="text-white">len(name)</span>
              <span className="text-amber-400">{'}'}</span>
              <span className="text-amber-300">)"</span>
            </>
          ) : activeIdx === 7 ? (
            <>
              <span className="text-sky-400">len</span>
              <span className="text-amber-400">(</span>
              <span className="text-emerald-400">"{input}"</span>
              <span className="text-amber-400">)</span>
            </>
          ) : (
            <>
              <span className="text-emerald-400">"{input}"</span>
              <span className="text-amber-300">{active.name.split('(')[0]}</span>
              <span className="text-amber-400">(</span>
              {active.name.includes('replace') && <span className="text-emerald-400">"o", "0"</span>}
              {active.name.includes('startswith') && <span className="text-emerald-400">"P"</span>}
              <span className="text-amber-400">)</span>
            </>
          )}
        </div>

        <button
          onClick={handleRun}
          className="flex items-center gap-2 self-start px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-xs font-extrabold shadow active:scale-95 transition-all cursor-pointer"
        >
          <Play size={13} /> Run
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx + input + (ran ? 'ran' : '')}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-sm border border-slate-800 min-h-[60px] break-all"
          >
            {output}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene06_StringMethods;
