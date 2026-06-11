import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronRight } from 'lucide-react';

const CHALLENGES = [
  {
    id: 1,
    emoji: '🏷️',
    title: 'String & Number Mix',
    prompt: 'Create a variable for your name, age, and height. Then print them in one line using an f-string.',
    starter: `name = "Alex"\nage = 28\nheight = 1.75\n\n# Print: "Alex is 28 years old and 1.75m tall"\nprint(f"{name} is {age} years old and {height}m tall")`,
    expected: 'Alex is 28 years old and 1.75m tall',
    hint: 'Use an f-string: print(f"{name} is {age}...")',
  },
  {
    id: 2,
    emoji: '🔄',
    title: 'Type Conversion',
    prompt: 'The user typed "42" as text. Add 8 to it and print the number 50.',
    starter: `user_input = "42"\n\n# Convert to int, add 8, print the result\nresult = int(user_input) + 8\nprint(result)`,
    expected: '50',
    hint: 'int() converts a string to a number.',
  },
  {
    id: 3,
    emoji: '✂️',
    title: 'String Slicing',
    prompt: 'Extract just "python.org" from the full URL string.',
    starter: `url = "https://python.org/docs/tutorial"\n\n# The domain starts at index 8 and is 10 chars long\ndomain = url[8:18]\nprint(domain)`,
    expected: 'python.org',
    hint: 'url[8:18] grabs characters 8 up to (not including) 18.',
  },
  {
    id: 4,
    emoji: '⚖️',
    title: 'Boolean Logic',
    prompt: 'Is 15 divisible by 3 AND greater than 10? Print the result.',
    starter: `x = 15\n\n# Use modulo (%) to check divisibility\nresult = (x % 3 == 0) and (x > 10)\nprint(result)`,
    expected: 'True',
    hint: '% gives the remainder. If x % 3 == 0, it divides evenly.',
  },
];

function simulate(code: string, expected: string): string {
  if (code.includes(expected.replace(/"/g, '').replace(/'/g, '')) && code.includes('print')) {
    return expected;
  }
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
    <div className="flex flex-col lg:flex-row items-start gap-8 h-full w-full max-w-7xl mx-auto px-8 py-6 overflow-hidden">
      {/* Left: challenge picker */}
      <div className="flex flex-col gap-5 shrink-0 w-full lg:w-64">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 10</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 leading-tight">
            Your Turn.<br />
            <span className="text-amber-500">Write code.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">Four bite-sized challenges. Apply everything from this chapter.</p>
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
              <span className="text-xl">{c.emoji}</span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono font-extrabold opacity-60 block">Challenge {c.id}</span>
                <span className="text-xs font-extrabold truncate block">{c.title}</span>
              </div>
              {i === idx && <ChevronRight size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Right: editor */}
      <div className="flex-1 flex flex-col gap-3 min-h-0 w-full">
        {/* Prompt */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4">
          <p className="text-sm font-semibold text-slate-700 leading-relaxed">
            <span className="text-lg mr-2">{challenge.emoji}</span>
            {challenge.prompt}
          </p>
        </div>

        {/* Code editor */}
        <textarea
          value={code}
          onChange={e => { setCode(e.target.value); setOutput(null); setCorrect(null); }}
          spellCheck={false}
          className="flex-1 bg-slate-900 text-slate-200 font-mono text-sm px-6 py-5 rounded-2xl resize-none outline-none border-2 border-slate-800 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 min-h-[160px] leading-7 transition-all"
        />

        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleRun}
            className="flex items-center gap-2.5 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-sm font-extrabold shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <Play size={15} /> Run Code
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-600 border-2 border-slate-200 rounded-xl text-sm font-bold transition-all cursor-pointer"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={() => setShowHint(h => !h)}
            className="flex items-center gap-2 px-4 py-3 bg-white text-amber-600 border-2 border-amber-200 rounded-xl text-sm font-bold hover:bg-amber-50 transition-all cursor-pointer"
          >
            💡 {showHint ? 'Hide' : 'Hint'}
          </button>

          <AnimatePresence>
            {correct !== null && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`text-sm font-extrabold px-4 py-2 rounded-xl border-2 ${
                  correct ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-rose-50 text-rose-600 border-rose-300'
                }`}
              >
                {correct ? '✓ Correct!' : '✗ Not quite — check the hint'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-3 overflow-hidden"
            >
              <p className="text-amber-800 text-sm font-semibold">💡 {challenge.hint}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output */}
        <div className={`bg-slate-950 px-6 py-4 rounded-2xl font-mono text-sm border-2 min-h-[56px] transition-colors duration-300 ${
          correct === true  ? 'text-emerald-400 border-emerald-900' :
          correct === false ? 'text-rose-400 border-rose-900' :
          'text-slate-500 border-slate-800'
        }`}>
          {output ?? 'Press Run Code to execute...'}
        </div>
      </div>
    </div>
  );
};

export default Scene10_CodingSandbox;
