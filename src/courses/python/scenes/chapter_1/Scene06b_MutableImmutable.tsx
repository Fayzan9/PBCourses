import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronRight, AlertTriangle } from 'lucide-react';

type Step = 'start' | 'assigned' | 'mutated';

const IMMUTABLE_TYPES = ['int', 'float', 'str', 'bool', 'tuple'];
const MUTABLE_TYPES = ['list', 'dict', 'set'];

const IMMUTABLE_CODE = ['x = 5', 'x = 10  # new object!', '# id(x) changes ✓'];
const MUTABLE_CODE = ['a = [1, 2, 3]', 'a.append(4)', '# id(a) stays same ✓'];

export const Scene06b_MutableImmutable: React.FC = () => {
  const [step, setStep] = useState<Step>('start');

  const handleAssign = () => setStep('assigned');
  const handleMutate = () => setStep('mutated');
  const handleReset = () => setStep('start');

  const aValue = step === 'start' ? null : step === 'assigned' ? '[1, 2, 3]' : '[1, 2, 3, 4]';
  const bValue = step === 'start' ? null : step === 'assigned' ? '[1, 2, 3]' : '[1, 2, 3, 4]';
  const sharedId = '0x4f91a2';

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-4 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
          Scene 06b · Mutable vs Immutable
        </span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          Some objects can change.{' '}
          <span className="text-emerald-500">Some can't.</span>
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mt-1">
          This is the most misunderstood concept in Python interviews. Let's <em>feel</em> it, not just read it.
        </p>
      </div>

      {/* Two columns */}
      <div className="flex gap-4">
        {/* IMMUTABLE */}
        <div className="flex-1 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <span className="text-amber-700 font-black text-lg">Immutable</span>
          </div>
          <p className="text-amber-700 text-sm font-medium">Cannot be changed after creation</p>

          <div className="flex flex-wrap gap-1.5">
            {IMMUTABLE_TYPES.map(t => (
              <span key={t} className="font-mono text-xs bg-amber-100 border border-amber-300 text-amber-700 px-2 py-0.5 rounded-md font-bold">{t}</span>
            ))}
          </div>

          <p className="text-amber-800 text-xs leading-relaxed font-medium bg-amber-100 border border-amber-200 rounded-xl px-3 py-2">
            Reassigning creates a <strong>brand new object</strong> — the old one is untouched.
          </p>

          {/* Code example */}
          <div className="bg-amber-100 border border-amber-200 rounded-xl px-4 py-3 font-mono text-xs leading-relaxed flex flex-col gap-0.5">
            {IMMUTABLE_CODE.map((line, i) => (
              <div key={i} className={i === 2 ? 'text-amber-400' : 'text-amber-800 font-semibold'}>{line}</div>
            ))}
          </div>
        </div>

        {/* MUTABLE */}
        <div className="flex-1 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <span className="text-emerald-700 font-black text-lg">Mutable</span>
          </div>
          <p className="text-emerald-700 text-sm font-medium">Can be changed in place</p>

          <div className="flex flex-wrap gap-1.5">
            {MUTABLE_TYPES.map(t => (
              <span key={t} className="font-mono text-xs bg-emerald-100 border border-emerald-300 text-emerald-700 px-2 py-0.5 rounded-md font-bold">{t}</span>
            ))}
          </div>

          <p className="text-emerald-800 text-xs leading-relaxed font-medium bg-emerald-100 border border-emerald-200 rounded-xl px-3 py-2">
            Modifying keeps the <strong>same object</strong> — the id never changes.
          </p>

          {/* Code example */}
          <div className="bg-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 font-mono text-xs leading-relaxed flex flex-col gap-0.5">
            {MUTABLE_CODE.map((line, i) => (
              <div key={i} className={i === 2 ? 'text-emerald-400' : 'text-emerald-800 font-semibold'}>{line}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive experiment */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-slate-700 text-sm">The Aliasing Gotcha</p>
            <p className="text-slate-500 text-xs mt-0.5">The interview trap that trips up even experienced devs.</p>
          </div>
          {step !== 'start' && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-xs font-medium cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Variable boxes */}
          <div className="flex gap-4 flex-1">
            {/* Box a */}
            <div className="flex-1 flex flex-col gap-1">
              <span className="font-mono text-xs font-bold text-slate-500">a</span>
              <motion.div
                className={`border-2 rounded-xl p-3 text-center min-h-[60px] flex flex-col items-center justify-center transition-colors ${
                  step !== 'start' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
                }`}
                animate={{ scale: step === 'assigned' ? [1, 1.04, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {step === 'start' ? (
                    <motion.span key="empty-a" className="text-slate-300 text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      —
                    </motion.span>
                  ) : (
                    <motion.div key="val-a" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-1">
                      <span className="font-mono text-sm font-bold text-emerald-700">{aValue}</span>
                      <span className="font-mono text-xs text-slate-400">{sharedId}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Connection line */}
            <div className="flex items-center justify-center w-8">
              <AnimatePresence>
                {step !== 'start' && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    className="w-full h-0.5 bg-amber-400"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Box b */}
            <div className="flex-1 flex flex-col gap-1">
              <span className="font-mono text-xs font-bold text-slate-500">b</span>
              <motion.div
                className={`border-2 rounded-xl p-3 text-center min-h-[60px] flex flex-col items-center justify-center transition-colors ${
                  step !== 'start' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
                }`}
                animate={{ scale: step === 'mutated' ? [1, 1.04, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {step === 'start' ? (
                    <motion.span key="empty-b" className="text-slate-300 text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      —
                    </motion.span>
                  ) : (
                    <motion.div key="val-b" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-1">
                      <span className="font-mono text-sm font-bold text-emerald-700">{bValue}</span>
                      <span className="font-mono text-xs text-slate-400">{sharedId}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 min-w-[200px]">
            <button
              onClick={handleAssign}
              disabled={step !== 'start'}
              className={`flex items-center gap-2 rounded-xl font-bold px-4 py-2 text-xs cursor-pointer transition-all ${
                step === 'start'
                  ? 'bg-amber-500 hover:bg-amber-400 text-white'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <code>a = [1,2,3]; b = a</code>
            </button>
            <button
              onClick={handleMutate}
              disabled={step !== 'assigned'}
              className={`flex items-center gap-2 rounded-xl font-bold px-4 py-2 text-xs cursor-pointer transition-all ${
                step === 'assigned'
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <code>b.append(4)</code>
            </button>
          </div>
        </div>

        {/* Warning */}
        <AnimatePresence>
          {step === 'mutated' && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-2 bg-rose-50 border-2 border-rose-200 rounded-xl px-4 py-3"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
              <p className="text-rose-700 text-sm font-semibold">
                a also changed! They point to the same object — both <code className="font-mono text-xs bg-rose-100 border border-rose-200 text-rose-700 px-1.5 py-0.5 rounded">a</code> and <code className="font-mono text-xs bg-rose-100 border border-rose-200 text-rose-700 px-1.5 py-0.5 rounded">b</code> are aliases for <span className="font-mono">{sharedId}</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom callout */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl px-5 py-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
        <p className="text-rose-700 text-sm leading-relaxed">
          <strong>Interview trap:</strong> Never assume two variables are independent if one was assigned from the other (<code className="font-mono text-xs bg-rose-100 border border-rose-200 text-rose-700 px-1.5 py-0.5 rounded">b = a</code>). Use <code className="font-mono text-xs bg-rose-100 border border-rose-200 text-rose-700 px-1.5 py-0.5 rounded">b = a.copy()</code> to be safe.
        </p>
      </div>
    </div>
  );
};

export default Scene06b_MutableImmutable;
