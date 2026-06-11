import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Loader2, Terminal, ChevronRight } from 'lucide-react';
import { getOrLoadPyodide, runPythonCode } from '../../utils/pyodideRunner';

type Challenge = {
  emoji: string;
  title: string;
  prompt: string;
  starter: string;
  expected: string;
  hint: string;
};

const CHALLENGES: Challenge[] = [
  {
    emoji: '👋',
    title: 'Greeter',
    prompt: 'Ask the user for their name and print a greeting.',
    starter: "name = 'Maya'\nprint(f'Hello, {name}! Welcome to Python.')",
    expected: 'Hello, Maya! Welcome to Python.',
    hint: "Use an f-string inside print() to embed the variable.",
  },
  {
    emoji: '🔢',
    title: 'Age Calculator',
    prompt: 'Ask for birth year, calculate age (assume current year = 2024), print it.',
    starter: 'birth_year = 2002\nage = 2024 - birth_year\nprint(f\'You are {age} years old.\')',
    expected: 'You are 22 years old.',
    hint: 'Subtract birth_year from 2024 to get age, then embed in an f-string.',
  },
  {
    emoji: '✂️',
    title: 'Name Slicer',
    prompt: 'Print the first 4 characters and the last 5 characters of a full name.',
    starter: "full_name = 'Maya Sharma'\nprint(full_name[:4])\nprint(full_name[-5:])",
    expected: 'Maya\nSharma',
    hint: 'Use slicing: name[:4] for first 4 chars, name[-5:] for last 5.',
  },
  {
    emoji: '🎯',
    title: 'Type Inspector',
    prompt: 'Print the type and length of a string value.',
    starter: "val = 'Hello Python'\nprint(type(val))\nprint(len(val))",
    expected: "<class 'str'>\n12",
    hint: 'type() shows the data type. len() counts characters in a string.',
  },
];

export const Scene08_PracticeSandbox: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [code, setCode] = useState(CHALLENGES[0].starter);
  const [output, setOutput] = useState('');
  const [outputError, setOutputError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setPyodideLoading(true);
    getOrLoadPyodide()
      .then(() => {
        if (!cancelled) {
          setPyodideReady(true);
          setPyodideLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPyodideLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  const handleSelectChallenge = (idx: number) => {
    setSelectedChallenge(idx);
    setCode(CHALLENGES[idx].starter);
    setOutput('');
    setOutputError(null);
    setShowHint(false);
  };

  const handleRun = async () => {
    if (!pyodideReady || isRunning) return;
    setIsRunning(true);
    setOutput('');
    setOutputError(null);

    const result = await runPythonCode(code);

    if (result.error) {
      setOutputError(result.error);
    } else {
      setOutput(result.stdout || result.stderr || '');
      setOutputError(result.stderr && !result.stdout ? result.stderr : null);
    }

    setIsRunning(false);
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setCode(CHALLENGES[selectedChallenge].starter);
    setOutput('');
    setOutputError(null);
    setShowHint(false);
  };

  const challenge = CHALLENGES[selectedChallenge];

  const outputTrimmed = output.trim();
  const expectedTrimmed = challenge.expected.trim();
  const isCorrect = outputTrimmed !== '' && (
    outputTrimmed === expectedTrimmed ||
    outputTrimmed.includes(expectedTrimmed.split('\n')[0])
  );

  return (
    <div className="h-full w-full flex flex-col lg:flex-row px-8 py-5 gap-5 overflow-hidden">

      {/* Left panel */}
      <div className="w-56 shrink-0 flex flex-col gap-4 overflow-y-auto">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
            Scene 08 · Practice
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Your Turn.{' '}
            <span className="text-amber-500">Write code.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Maya's been practicing. Now it's your turn. Pick a challenge and run it.
          </p>
        </div>

        {/* Pyodide status */}
        <div className={`flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-xl border ${
          pyodideReady
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          {pyodideLoading ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              <span>Loading Python…</span>
            </>
          ) : pyodideReady ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Python ready</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Load failed</span>
            </>
          )}
        </div>

        {/* Challenge list */}
        <div className="flex flex-col gap-2">
          {CHALLENGES.map((ch, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectChallenge(idx)}
              className={`w-full text-left rounded-xl border-2 px-3 py-2.5 transition-all cursor-pointer flex items-center gap-3 ${
                selectedChallenge === idx
                  ? 'bg-amber-50 border-2 border-amber-300 text-amber-700 shadow-sm'
                  : 'bg-white border-2 border-slate-200 hover:border-amber-200 text-slate-500'
              }`}
            >
              <span className="text-lg shrink-0">{ch.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${
                  selectedChallenge === idx ? 'text-amber-700' : 'text-slate-700'
                }`}>
                  {ch.title}
                </p>
              </div>
              {selectedChallenge === idx && (
                <ChevronRight size={14} className="text-amber-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-hidden">

        {/* Prompt bar */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 shrink-0">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0">{challenge.emoji}</span>
            <div>
              <p className="text-sm font-bold text-amber-800">{challenge.title}</p>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">{challenge.prompt}</p>
            </div>
          </div>
        </div>

        {/* Code editor */}
        <div className="flex-1 bg-slate-900 rounded-2xl overflow-hidden flex flex-col min-h-0 border border-slate-700">
          {/* Editor header */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-2 text-xs font-mono text-slate-400">
              {challenge.title.toLowerCase().replace(' ', '_')}.py
            </span>
          </div>

          {/* Textarea */}
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full bg-slate-900 text-slate-200 font-mono text-sm px-5 py-4 resize-none outline-none leading-relaxed min-h-0"
            style={{ tabSize: 4 }}
            onKeyDown={e => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const start = e.currentTarget.selectionStart;
                const end = e.currentTarget.selectionEnd;
                const newCode = code.substring(0, start) + '    ' + code.substring(end);
                setCode(newCode);
                setTimeout(() => {
                  e.currentTarget.selectionStart = start + 4;
                  e.currentTarget.selectionEnd = start + 4;
                }, 0);
              }
            }}
          />

          {/* Action bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-t border-slate-700 shrink-0">
            <button
              onClick={handleRun}
              disabled={!pyodideReady || isRunning}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold px-5 py-2 text-sm cursor-pointer transition-colors"
            >
              {isRunning ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Play size={14} />
              )}
              {isRunning ? 'Running…' : 'Run'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl font-bold px-4 py-2 text-sm cursor-pointer transition-colors"
            >
              <RotateCcw size={13} />
              Reset
            </button>
            <button
              onClick={() => setShowHint(h => !h)}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl font-bold px-4 py-2 text-sm cursor-pointer transition-colors ml-auto"
            >
              {showHint ? 'Hide Hint' : '💡 Hint'}
            </button>
          </div>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1 }}
              className="overflow-hidden shrink-0"
            >
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 leading-relaxed">
                <span className="font-bold">Hint: </span>{challenge.hint}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output terminal */}
        <div
          ref={outputRef}
          className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shrink-0"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800">
            <Terminal size={13} className="text-slate-400" />
            <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
              Output
            </span>
            {outputTrimmed !== '' && !outputError && (
              <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isCorrect
                  ? 'bg-emerald-900 text-emerald-400'
                  : 'bg-rose-900 text-rose-400'
              }`}>
                {isCorrect ? '✓ Looks great!' : '✗ Check your code'}
              </span>
            )}
            {outputError && (
              <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-900 text-rose-400">
                ✗ Error
              </span>
            )}
          </div>
          <div className="px-4 py-3 min-h-[64px] max-h-32 overflow-y-auto">
            {outputTrimmed === '' && !outputError ? (
              <p className="font-mono text-xs text-slate-600 italic">
                {'// output will appear here after you run the code'}
              </p>
            ) : outputError ? (
              <pre className="font-mono text-xs text-rose-400 whitespace-pre-wrap leading-relaxed">
                {outputError}
              </pre>
            ) : (
              <pre className={`font-mono text-xs whitespace-pre-wrap leading-relaxed ${
                isCorrect ? 'text-emerald-400' : 'text-slate-300'
              }`}>
                {outputTrimmed}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene08_PracticeSandbox;
