import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronRight, Terminal } from 'lucide-react';

const CHALLENGES = [
  {
    id: 1,
    emoji: '🏷️',
    title: 'String & Number Mix',
    prompt: 'Print "Alex is 28 years old and 1.75m tall" using an f-string.',
    starter: `name = "Alex"\nage = 28\nheight = 1.75\n\n# Combine them in one f-string\nprint(f"{name} is {age} years old and {height}m tall")`,
    expected: 'Alex is 28 years old and 1.75m tall',
    hint: 'f-strings: print(f"{variable} some text {other_variable}")',
  },
  {
    id: 2,
    emoji: '🔄',
    title: 'Type Conversion',
    prompt: 'The user typed "42" as text. Add 8 to it and print 50.',
    starter: `user_input = "42"\n\n# Convert to int, add 8, print the result\nresult = int(user_input) + 8\nprint(result)`,
    expected: '50',
    hint: 'int() converts a string to a number: int("42") → 42',
  },
  {
    id: 3,
    emoji: '✂️',
    title: 'String Slicing',
    prompt: 'Extract just "python.org" from the full URL.',
    starter: `url = "https://python.org/docs/tutorial"\n\n# Characters 8 to 18 are the domain\ndomain = url[8:18]\nprint(domain)`,
    expected: 'python.org',
    hint: 'url[8:18] grabs characters at index 8 up to (not including) 18.',
  },
  {
    id: 4,
    emoji: '⚖️',
    title: 'Boolean Logic',
    prompt: 'Is 15 divisible by 3 AND greater than 10? Print True or False.',
    starter: `x = 15\n\n# % gives the remainder — 0 means divisible\nresult = (x % 3 == 0) and (x > 10)\nprint(result)`,
    expected: 'True',
    hint: 'x % 3 == 0 checks divisibility. "and" requires both sides to be True.',
  },
];

function simulate(code: string, expected: string): string {
  if (code.includes('print')) return expected;
  return '(no output — add a print() statement)';
}

export const Scene10_CodingSandbox: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const challenge = CHALLENGES[idx];
  const [code, setCode] = useState(challenge.starter);
  const [output, setOutput] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (i: number) => {
    setIdx(i);
    setCode(CHALLENGES[i].starter);
    setOutput(null);
    setCorrect(null);
    setShowHint(false);
  };

  const handleRun = () => {
    const result = simulate(code, challenge.expected);
    setOutput(result);
    setCorrect(result.trim() === challenge.expected.trim());
  };

  const handleReset = () => {
    setCode(challenge.starter);
    setOutput(null);
    setCorrect(null);
    setShowHint(false);
  };

  return (
    <div className="h-full w-full flex flex-row gap-6 px-8 py-5 overflow-hidden">

      {/* ── Left panel: title + challenge list ── */}
      <div className="flex flex-col gap-5 w-60 shrink-0">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 10</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            Your Turn.<br />
            <span className="text-amber-500">Write code.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">Four challenges. Apply everything from this chapter.</p>
        </div>

        <div className="flex flex-col gap-2">
          {CHALLENGES.map((c, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                i === idx
                  ? 'bg-amber-500 text-white border-amber-500 shadow-lg'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700'
              }`}
            >
              <span className="text-xl shrink-0">{c.emoji}</span>
              <div className="flex-1 min-w-0">
                <span className={`text-[10px] font-mono font-extrabold block ${i === idx ? 'text-white/60' : 'text-slate-400'}`}>Challenge {c.id}</span>
                <span className="text-xs font-extrabold truncate block">{c.title}</span>
              </div>
              {i === idx && <ChevronRight size={14} className="shrink-0" />}
            </button>
          ))}
        </div>

        {/* Progress dots */}
        <div className="mt-auto flex items-center gap-1.5">
          {CHALLENGES.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-amber-500' : 'w-1.5 bg-slate-200'}`} />
          ))}
        </div>
      </div>

      {/* ── Right panel: prompt + editor + output ── */}
      <div className="flex-1 flex flex-col gap-3 min-h-0 min-w-0">

        {/* Prompt bar */}
        <div className="flex items-start gap-3 bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 shrink-0">
          <span className="text-2xl">{challenge.emoji}</span>
          <p className="text-sm font-semibold text-slate-700 leading-relaxed">{challenge.prompt}</p>
        </div>

        {/* Editor — fills remaining space */}
        <div className="flex-1 flex flex-col min-h-0 bg-slate-900 rounded-2xl border-2 border-slate-800 overflow-hidden">
          {/* Editor chrome */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <span className="font-mono text-xs text-slate-500 ml-2">solution.py</span>
            </div>
            <AnimatePresence>
              {correct !== null && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-xs font-extrabold px-3 py-1 rounded-lg ${
                    correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {correct ? '✓ Correct!' : '✗ Not quite'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Textarea */}
          <textarea
            value={code}
            onChange={e => { setCode(e.target.value); setOutput(null); setCorrect(null); }}
            spellCheck={false}
            className="flex-1 min-h-0 bg-slate-900 text-slate-200 font-mono text-sm px-6 py-5 resize-none outline-none leading-7 w-full"
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={handleRun}
            className="flex items-center gap-2.5 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-sm font-extrabold shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <Play size={14} /> Run Code
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-600 border-2 border-slate-200 rounded-xl text-sm font-bold transition-all cursor-pointer"
          >
            <RotateCcw size={13} /> Reset
          </button>
          <button
            onClick={() => setShowHint(h => !h)}
            className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              showHint ? 'bg-amber-50 text-amber-700 border-amber-400' : 'bg-white text-amber-600 border-amber-200 hover:bg-amber-50'
            }`}
          >
            💡 {showHint ? 'Hide hint' : 'Show hint'}
          </button>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-3 shrink-0 overflow-hidden"
            >
              <p className="text-amber-800 text-sm font-semibold">💡 {challenge.hint}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminal output */}
        <div className={`shrink-0 rounded-2xl border-2 overflow-hidden transition-colors duration-300 ${
          correct === true  ? 'border-emerald-800' :
          correct === false ? 'border-rose-900' :
          'border-slate-800'
        }`}>
          <div className="flex items-center gap-2 bg-slate-800 px-5 py-2.5">
            <Terminal size={13} className="text-slate-500" />
            <span className="font-mono text-xs text-slate-500">output</span>
          </div>
          <div className={`bg-slate-950 px-6 py-4 font-mono text-sm min-h-[52px] transition-colors ${
            correct === true  ? 'text-emerald-400' :
            correct === false ? 'text-rose-400' :
            'text-slate-500'
          }`}>
            {output ?? 'Press Run Code to execute...'}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scene10_CodingSandbox;
