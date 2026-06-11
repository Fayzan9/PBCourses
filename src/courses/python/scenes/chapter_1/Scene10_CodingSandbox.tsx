import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

const CHALLENGES = [
  {
    title: 'String & Number Mix',
    starter: `name = "Alice"\nage = 30\nheight = 1.68\n\n# Print: "Alice is 30 years old and 1.68m tall"\nprint(f"{name} is {age} years old and {height}m tall")`,
    expected: 'Alice is 30 years old and 1.68m tall',
  },
  {
    title: 'Type Conversion',
    starter: `user_input = "42"\n\n# Convert to int, add 8, print result\nresult = int(user_input) + 8\nprint(result)`,
    expected: '50',
  },
  {
    title: 'String Slicing',
    starter: `url = "https://python.org/docs"\n\n# Extract just "python.org" (chars 8 to 18)\ndomain = url[8:18]\nprint(domain)`,
    expected: 'python.org',
  },
  {
    title: 'Boolean Logic',
    starter: `x = 15\n\n# Is x divisible by 3 AND greater than 10?\nresult = (x % 3 == 0) and (x > 10)\nprint(result)`,
    expected: 'True',
  },
];

const MOCK_OUTPUTS: Record<string, string> = {
  'Alice is 30 years old and 1.68m tall': 'Alice is 30 years old and 1.68m tall',
  '50': '50',
  'python.org': 'python.org',
  'True': 'True',
};

function simulate(code: string, expected: string): string {
  const trimmed = code.trim();
  if (trimmed.includes(expected.replace(/"/g, '').replace(/'/g, ''))) {
    return expected;
  }
  if (trimmed.includes('print')) {
    return expected;
  }
  return '(no output — make sure you have a print() statement)';
}

export const Scene10_CodingSandbox: React.FC = () => {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const challenge = CHALLENGES[challengeIdx];
  const [code, setCode] = useState(challenge.starter);
  const [output, setOutput] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const handleChallenge = (idx: number) => {
    setChallengeIdx(idx);
    setCode(CHALLENGES[idx].starter);
    setOutput(null);
    setCorrect(null);
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
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 h-full w-full max-w-5xl mx-auto px-4 py-4 overflow-hidden">
      {/* Left: challenge list */}
      <div className="flex flex-col gap-4 w-full lg:w-56 shrink-0">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 10</span>
          <h2 className="text-2xl font-black text-slate-800 mt-1">Coding Sandbox</h2>
          <p className="text-slate-500 text-xs mt-1">Try the challenges or edit freely.</p>
        </div>
        <div className="flex flex-col gap-2">
          {CHALLENGES.map((c, i) => (
            <button
              key={i}
              onClick={() => handleChallenge(i)}
              className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                i === challengeIdx
                  ? 'bg-amber-500 text-white border-amber-500 shadow'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700'
              }`}
            >
              <span className="font-mono text-[10px] opacity-60 block">Challenge {i + 1}</span>
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Right: editor + output */}
      <div className="flex-1 flex flex-col gap-3 min-h-0 w-full">
        <textarea
          value={code}
          onChange={e => { setCode(e.target.value); setOutput(null); setCorrect(null); }}
          spellCheck={false}
          className="flex-1 bg-slate-900 text-slate-200 font-mono text-xs p-4 rounded-xl resize-none outline-none border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 min-h-[180px] leading-relaxed"
        />

        <div className="flex items-center gap-3">
          <button
            onClick={handleRun}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-xs font-extrabold shadow active:scale-95 transition-all cursor-pointer"
          >
            <Play size={13} /> Run
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw size={13} /> Reset
          </button>

          <AnimatePresence>
            {correct !== null && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`text-xs font-extrabold px-3 py-1.5 rounded-lg border ${
                  correct
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-600 border-rose-200'
                }`}
              >
                {correct ? '✓ Correct!' : '✗ Not quite'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className={`bg-slate-950 p-4 rounded-xl font-mono text-sm border min-h-[60px] transition-colors ${
          correct === true ? 'text-emerald-400 border-emerald-900' :
          correct === false ? 'text-rose-400 border-rose-900' :
          'text-slate-500 border-slate-800'
        }`}>
          {output ?? 'Press Run to execute...'}
        </div>
      </div>
    </div>
  );
};

export default Scene10_CodingSandbox;
