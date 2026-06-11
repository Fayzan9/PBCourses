import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

type Step = {
  id: number;
  label: string;
  description: string;
  comment: string;
  code: string;
};

const STEPS: Step[] = [
  {
    id: 0,
    label: 'Ask for name',
    description: 'name = input("Your name? ")',
    comment: '# Step 1 — ask the user for their name',
    code: 'name = input("Your name? ")',
  },
  {
    id: 1,
    label: 'Ask for age',
    description: 'age = int(input("Your age? "))',
    comment: '# Step 2 — ask for age and convert to int',
    code: 'age = int(input("Your age? "))',
  },
  {
    id: 2,
    label: 'Calculate dream year',
    description: 'dream_year = 2024 + (25 - age)',
    comment: '# Step 3 — calculate the year she reaches her dream',
    code: 'dream_year = 2024 + (25 - age)',
  },
  {
    id: 3,
    label: 'Build the greeting',
    description: 'greeting = f"Hey {name}! 🚀"',
    comment: '# Step 4 — build a greeting with an f-string',
    code: 'greeting = f"Hey {name}! 🚀"',
  },
  {
    id: 4,
    label: 'Print the card',
    description: 'print(greeting) + print(f"Dream Job by {dream_year}")',
    comment: '# Step 5 — print the final output',
    code: 'print(greeting)\nprint(f"Dream Job by {dream_year}")',
  },
];

export const Scene07_FirstProgram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [advancing, setAdvancing] = useState(false);

  const allDone = completedSteps.size === STEPS.length;

  const handleStepClick = (stepId: number) => {
    if (advancing) return;
    setActiveStep(stepId);

    if (!completedSteps.has(stepId)) {
      setAdvancing(true);
      setTimeout(() => {
        setCompletedSteps(prev => {
          const next = new Set(prev);
          next.add(stepId);
          return next;
        });
        const nextStep = stepId + 1;
        if (nextStep < STEPS.length) {
          setActiveStep(nextStep);
        }
        setAdvancing(false);
      }, 1500);
    }
  };

  const visibleLines = STEPS.filter(
    s => completedSteps.has(s.id) || s.id === activeStep
  );

  return (
    <div className="h-full w-full flex flex-col lg:flex-row px-8 py-5 gap-5 overflow-hidden">

      {/* Left panel */}
      <div className="lg:w-[300px] shrink-0 flex flex-col gap-4 overflow-y-auto">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
            Scene 07 · First Program
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Maya writes her{' '}
            <span className="text-amber-500">first real program.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Line by line, everything clicks into place. Follow each step.
          </p>
        </div>

        {/* Steps list */}
        <div className="flex flex-col gap-2">
          {STEPS.map(step => {
            const isCompleted = completedSteps.has(step.id);
            const isActive = activeStep === step.id && !isCompleted;
            const isFuture = !isCompleted && step.id > activeStep;

            return (
              <motion.button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-50 border-emerald-200'
                    : isActive
                    ? 'bg-amber-50 border-amber-300 shadow-sm'
                    : isFuture
                    ? 'bg-white border-slate-200 opacity-50'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${
                        isCompleted ? 'text-emerald-600' : isActive ? 'text-amber-600' : 'text-slate-400'
                      }`}>
                        Step {step.id + 1}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-semibold mt-0.5 ${
                      isCompleted ? 'text-emerald-700' : isActive ? 'text-amber-700' : 'text-slate-500'
                    }`}>
                      {step.label}
                    </p>
                    <code className={`text-[10px] font-mono block mt-1 truncate ${
                      isCompleted ? 'text-emerald-600' : isActive ? 'text-amber-600' : 'text-slate-400'
                    }`}>
                      {step.description}
                    </code>
                  </div>
                  {(isActive || (!isCompleted && !isFuture)) && (
                    <ChevronRight size={14} className="text-amber-400 mt-1 shrink-0" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* "What Maya learned" callout */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4"
            >
              <p className="text-xs font-bold text-amber-700 mb-1">Maya's breakthrough</p>
              <p className="text-xs text-amber-600 leading-relaxed">
                That interview question — "What is a variable?" — Maya can now not only
                answer it, she built an entire program using them. Variables, f-strings,
                int conversion, and print. All in one go.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right panel — code editor */}
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col min-h-0">

          {/* Editor header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs font-mono text-slate-500 font-medium">
              profile_card.py
            </span>
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-5 min-h-0">
            <AnimatePresence initial={false}>
              {visibleLines.map(step => {
                const isCurrentLine = activeStep === step.id && !completedSteps.has(step.id);
                const codeLines = step.code.split('\n');

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-3"
                  >
                    <p className="font-mono text-xs text-slate-400 mb-0.5 select-none">
                      {step.comment}
                    </p>
                    {codeLines.map((line, lineIdx) => (
                      <div key={lineIdx} className="flex items-center">
                        <p className={`font-mono text-sm ${
                          isCurrentLine ? 'text-amber-600' : 'text-slate-700'
                        }`}>
                          {line}
                          {isCurrentLine && lineIdx === codeLines.length - 1 && (
                            <span className="inline-block w-0.5 h-4 bg-amber-500 ml-0.5 animate-pulse align-middle" />
                          )}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {visibleLines.length === 0 && (
              <p className="font-mono text-sm text-slate-300 italic">
                {'// click Step 1 to start...'}
              </p>
            )}
          </div>
        </div>

        {/* Program output — only when all steps done */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shrink-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-semibold text-emerald-700 uppercase tracking-wider">
                  Program Output
                </span>
              </div>
              <div className="font-mono text-sm text-emerald-800 space-y-0.5">
                <p>Hey Maya! 🚀</p>
                <p>Dream Job by 2027</p>
              </div>
              <p className="text-[10px] text-emerald-500 mt-2 font-mono">
                Process finished with exit code 0
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene07_FirstProgram;
