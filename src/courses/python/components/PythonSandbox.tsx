import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, X, Terminal, Loader2, Code2, AlertTriangle, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOrLoadPyodide, runPythonCode } from '../utils/pyodideRunner';

interface PythonSandboxProps {
  onClose: () => void;
}

const TEMPLATES = [
  {
    name: 'Hello World',
    code: `# The classic greeting
print("Hello, Python World!")
name = "Pyodide WebAssembly"
print(f"Running on: {name}")
`,
  },
  {
    name: 'Variables & Memory',
    code: `# Variables point to the same object (aliasing)
a = [1, 2, 3]
b = a
b.append(4)

print("List 'a':", a)
print("List 'b':", b)
print("Are they the same object in memory?", a is b)
`,
  },
  {
    name: 'Looping & Range',
    code: `# Summing numbers with a loop
total = 0
for i in range(1, 11):
    total += i
    print(f"Step {i}: running total = {total}")

print("\\nFinal sum of 1 to 10 is:", total)
`,
  },
  {
    name: 'String Indexing & Slicing',
    code: `# Explore indexing and slicing
word = "Pythonic"
print("Original:", word)
print("First char [0]:", word[0])
print("Last char [-1]:", word[-1])
print("Slice [2:6]:", word[2:6])
print("Reverse [::-1]:", word[::-1])
`,
  },
];

export const PythonSandbox: React.FC<PythonSandboxProps> = ({ onClose }) => {
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [output, setOutput] = useState<string>('Write some Python code and press Run...');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load Pyodide from CDN
  useEffect(() => {
    getOrLoadPyodide()
      .then(() => setPyodideLoaded(true))
      .catch((err) => setLoadError(err.message || String(err)));
  }, []);

  const runCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput('Running code...');

    // Short timeout to let the UI update
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      const result = await runPythonCode(code);

      if (result.error) {
        setOutput(result.error);
        return;
      }

      let display = result.stdout;
      if (result.stderr) {
        display += '\n--- Standard Error ---\n' + result.stderr;
      }

      if (!display.trim()) {
        display = '(Execution finished successfully, but produced no output. Did you print() anything?)';
      }

      setOutput(display);
    } catch (err: any) {
      setOutput(err.message || String(err));
    } finally {
      setIsRunning(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);

      // Reset cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="absolute inset-0 bg-[#0F172A] z-50 flex flex-col font-sans text-slate-100 overflow-hidden">
      
      {/* Top Header */}
      <header className="px-6 py-4 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 glow-amber">
            <Terminal size={20} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold tracking-tight">Python Sandbox</h2>
            <p className="text-xs text-slate-400 font-bold hidden sm:block">
              Wasm Runtime. Runs completely in browser.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Templates dropdown */}
          <div className="flex items-center gap-1.5 bg-[#0F172A] border border-slate-700/80 rounded-xl px-3 py-1.5">
            <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest mr-1.5">Examples:</span>
            {TEMPLATES.map((t) => (
              <button
                key={t.name}
                onClick={() => {
                  setCode(t.code);
                  setOutput('Template loaded. Click Run Code to execute.');
                }}
                className="text-[10px] font-bold text-slate-300 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {t.name}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer active:scale-95"
            title="Close Sandbox"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        
        {/* Loading overlay */}
        <AnimatePresence>
          {!pyodideLoaded && !loadError && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0F172A] z-40 flex flex-col items-center justify-center gap-4"
            >
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
              <div className="text-center">
                <p className="font-extrabold text-lg">Initializing Python Wasm Environment</p>
                <p className="text-slate-400 text-xs mt-1">Downloading WebAssembly runtime from CDN (approx. 6MB)...</p>
              </div>
            </motion.div>
          )}

          {loadError && (
            <motion.div
              initial={{ opacity: 1 }}
              className="absolute inset-0 bg-[#0F172A] z-40 flex flex-col items-center justify-center gap-4 px-6 text-center"
            >
              <AlertTriangle className="w-16 h-16 text-rose-500" />
              <div>
                <p className="font-extrabold text-xl text-rose-400">Failed to Load Python</p>
                <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">{loadError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Reload Page
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Pane: Editor */}
        <div className="flex-1 flex flex-col min-h-0 border-r border-slate-800">
          <div className="px-5 py-2.5 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Code2 size={14} className="text-slate-400" />
              <span className="font-mono text-xs font-bold text-slate-400">main.py</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy code"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
              <button
                onClick={() => setCode('# Write your code here\n')}
                className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset editor"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 min-h-0 bg-[#0F172A] text-slate-300 font-mono text-sm px-6 py-5 resize-none outline-none leading-7 w-full overflow-y-auto scrollbar-thin"
            placeholder="# Write Python code here..."
          />
        </div>

        {/* Right Pane: Terminal Output */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#020617]">
          <div className="px-5 py-2.5 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-slate-400" />
              <span className="font-mono text-xs font-bold text-slate-400">Console Output</span>
            </div>
            <button
              onClick={() => setOutput('')}
              className="text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 px-2 py-0.5 rounded transition-all cursor-pointer"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 min-h-0 p-6 font-mono text-sm overflow-y-auto select-text selection:bg-amber-500/30 selection:text-amber-200 leading-6 text-emerald-400 whitespace-pre-wrap scrollbar-thin">
            {output}
          </div>
        </div>

      </div>

      {/* Footer / Run Button */}
      <footer className="px-6 py-4 bg-[#1E293B] border-t border-slate-800 flex justify-end shrink-0 gap-3">
        <button
          onClick={runCode}
          disabled={!pyodideLoaded || isRunning}
          className="flex items-center gap-2.5 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-xl text-sm font-extrabold shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {isRunning ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>Run Code</span>
            </>
          )}
        </button>
      </footer>

    </div>
  );
};

export default PythonSandbox;
