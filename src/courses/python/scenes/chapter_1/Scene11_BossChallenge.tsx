import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Loader2, Terminal, CheckCircle2, Circle } from 'lucide-react';
import { getOrLoadPyodide, runPythonCode } from '../../utils/pyodideRunner';

const STARTER_CODE = `# Maya's Profile Card
# Fill this in to defeat the boss!

name = ""  # your name here
age = 0      # your age here

# Create a greeting
greeting = f""

# Print your card
print(greeting)`;

interface Requirement {
  id: number;
  label: string;
  check: (code: string, output: string) => boolean;
}

const REQUIREMENTS: Requirement[] = [
  {
    id: 1,
    label: 'Store a name in a variable (str)',
    check: (code) => /name\s*=\s*["']/.test(code) || code.includes('str('),
  },
  {
    id: 2,
    label: 'Store an age as int',
    check: (code) => /age\s*=\s*\d+/.test(code),
  },
  {
    id: 3,
    label: 'Create an f-string greeting',
    check: (code) => code.includes('f"') || code.includes("f'"),
  },
  {
    id: 4,
    label: 'Calculate something with the age',
    check: (code) => /age\s*[+\-*]/.test(code) || /\+\s*age/.test(code) || /age\s*\+/.test(code),
  },
  {
    id: 5,
    label: 'Print at least 2 lines of output',
    check: (_code, output) => (output.match(/\n/g) || []).length >= 1,
  },
];

const ConfettiPiece: React.FC<{ index: number }> = ({ index }) => {
  const colors = ['bg-amber-400', 'bg-rose-400', 'bg-emerald-400', 'bg-sky-400', 'bg-violet-400'];
  const angle = (index / 12) * 360;
  const distance = 80 + Math.random() * 60;
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full ${colors[index % colors.length]}`}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0 }}
      transition={{ duration: 1.2, delay: index * 0.04, ease: 'easeOut' }}
    />
  );
};

export const Scene11_BossChallenge: React.FC = () => {
  const [code, setCode] = useState(STARTER_CODE);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false]);
  const [hasRun, setHasRun] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  const passedCount = checks.filter(Boolean).length;
  const bossHealthPct = Math.max(0, 100 - passedCount * 20);
  const allPassed = passedCount === 5;

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    try {
      const pyodide = await getOrLoadPyodide();
      const result = await runPythonCode(pyodide, code);
      const outputText = result.output || result.error || '';
      setOutput(outputText);
      const newChecks = REQUIREMENTS.map((req) => req.check(code, outputText));
      setChecks(newChecks);
      setHasRun(true);
      if (newChecks.every(Boolean)) {
        setTimeout(() => setShowVictory(true), 400);
      }
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const reset = () => {
    setCode(STARTER_CODE);
    setOutput('');
    setChecks([false, false, false, false, false]);
    setHasRun(false);
    setShowVictory(false);
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between shrink-0">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
            Scene 11 · Boss Challenge
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            The Boss Challenge.{' '}
            <span className="text-rose-500">Can you beat it?</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mt-1 max-w-lg">
            Write ONE program that passes all 5 checks. This is Maya's final test before the interview.
          </p>
        </div>

        {/* Boss Health Bar */}
        <div className="shrink-0 flex flex-col items-end gap-1.5 min-w-[160px]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👾</span>
            <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wide">Boss HP</span>
          </div>
          <div className="w-40 h-4 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: bossHealthPct > 40 ? '#f43f5e' : bossHealthPct > 0 ? '#fb923c' : '#22c55e',
              }}
              animate={{ width: `${bossHealthPct}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <span className="text-xs font-mono text-slate-500">
            {passedCount}/5 checks passed
          </span>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-row gap-4 flex-1 min-h-0">
        {/* Checklist */}
        <div className="w-72 shrink-0 flex flex-col gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 h-full">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Requirements
            </span>
            {REQUIREMENTS.map((req, i) => (
              <motion.div
                key={req.id}
                className="flex items-start gap-2.5"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0.6 }}
              >
                <motion.div
                  animate={checks[i] ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="mt-0.5 shrink-0"
                >
                  {checks[i] ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                </motion.div>
                <span
                  className={`text-sm leading-snug transition-colors duration-300 ${
                    checks[i] ? 'text-emerald-700 font-medium line-through decoration-emerald-300' : 'text-slate-600'
                  }`}
                >
                  {req.label}
                </span>
              </motion.div>
            ))}

            {hasRun && !allPassed && (
              <div className="mt-auto pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Keep going — the boss is still standing. Every check you clear drains its HP.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Editor + Output */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* Editor */}
          <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-slate-200 min-h-0">
            {/* Chrome bar */}
            <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-mono text-slate-400">maya_profile.py</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-slate-900 text-slate-100 font-mono text-sm p-4 resize-none outline-none leading-relaxed min-h-0"
              spellCheck={false}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-bold px-6 py-2.5 cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isRunning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={reset}
              className="bg-white border-2 border-slate-200 hover:border-amber-200 text-slate-500 rounded-xl font-bold px-4 py-2.5 cursor-pointer flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Output terminal */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shrink-0">
            <div className="bg-slate-900 px-4 py-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-mono text-slate-400">output</span>
            </div>
            <div className="bg-slate-900 px-4 py-3 min-h-[64px] max-h-24 overflow-y-auto">
              {output ? (
                <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-slate-600 font-mono text-sm">
                  {isRunning ? 'Running...' : '# Click Run Code to see output'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Victory overlay */}
      <AnimatePresence>
        {showVictory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10"
          >
            <div className="relative flex flex-col items-center gap-5">
              {/* Confetti */}
              {Array.from({ length: 12 }).map((_, i) => (
                <ConfettiPiece key={i} index={i} />
              ))}

              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="bg-white border-2 border-amber-300 rounded-2xl p-8 flex flex-col items-center gap-4 max-w-sm text-center shadow-xl"
              >
                <span className="text-5xl">🏆</span>
                <h3 className="text-2xl font-black text-slate-800">Boss Defeated!</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Maya's interview-ready. All 5 checks passed — the boss HP is zero.
                </p>
                {/* Maya quote */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left w-full">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
                    Maya
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "Maya smiles at her screen. She knows what a variable is now. She knows how Python thinks.
                    Chapter 1: complete."
                  </p>
                </div>
                <button
                  onClick={() => setShowVictory(false)}
                  className="bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-bold px-6 py-2.5 cursor-pointer transition-colors"
                >
                  Continue
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scene11_BossChallenge;
