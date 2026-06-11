import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, AlertTriangle, ChevronRight } from 'lucide-react';

type ExperimentId = 'immutable' | 'mutable' | 'gotcha';

interface MemObj { id: string; type: string; value: string; addr: string }
interface DiagramState {
  vars: { name: string; target: string }[];
  objects: MemObj[];
  flash?: string;
  warning?: string;
}

const EXPERIMENTS: {
  id: ExperimentId;
  icon: string;
  label: string;
  subtitle: string;
  steps: { code: string; note: string; diagram: DiagramState }[];
  insight: string;
  insightColor: string;
}[] = [
  {
    id: 'immutable',
    icon: '🔒',
    label: 'Immutable',
    subtitle: 'Reassign = brand new object',
    steps: [
      {
        code: 'x = 5',
        note: 'Python creates the int 5 in memory, then attaches the label "x" to it.',
        diagram: {
          vars: [{ name: 'x', target: 'o1' }],
          objects: [{ id: 'o1', type: 'int', value: '5', addr: '0xa3f1b2' }],
        },
      },
      {
        code: 'x = 10',
        note: 'A brand new object (10) is created at a different address. x moves to it. The old 5 is still in memory — just unlabelled.',
        diagram: {
          vars: [{ name: 'x', target: 'o2' }],
          objects: [
            { id: 'o1', type: 'int', value: '5', addr: '0xa3f1b2' },
            { id: 'o2', type: 'int', value: '10', addr: '0xa3f2c4' },
          ],
          flash: 'o2',
        },
      },
    ],
    insight: 'int, float, str, bool, tuple are all immutable. You can never modify them in place — you can only point to a new object.',
    insightColor: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  {
    id: 'mutable',
    icon: '✏️',
    label: 'Mutable',
    subtitle: 'Modify = same object, same addr',
    steps: [
      {
        code: 'a = [1, 2, 3]',
        note: 'Python creates a list in memory and labels it "a".',
        diagram: {
          vars: [{ name: 'a', target: 'l1' }],
          objects: [{ id: 'l1', type: 'list', value: '[1, 2, 3]', addr: '0x4f91a2' }],
        },
      },
      {
        code: 'a.append(4)',
        note: 'The SAME list object is modified in place. Notice — the address stays identical. No new object was created.',
        diagram: {
          vars: [{ name: 'a', target: 'l1' }],
          objects: [{ id: 'l1', type: 'list', value: '[1, 2, 3, 4]', addr: '0x4f91a2' }],
          flash: 'l1',
        },
      },
    ],
    insight: 'list, dict, set are mutable. You can change their contents without creating a new object. The address (id) stays the same.',
    insightColor: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  {
    id: 'gotcha',
    icon: '⚠️',
    label: 'The Gotcha',
    subtitle: 'Two names. One object.',
    steps: [
      {
        code: 'a = [1, 2, 3]',
        note: 'a is created, pointing to a list.',
        diagram: {
          vars: [{ name: 'a', target: 'g1' }],
          objects: [{ id: 'g1', type: 'list', value: '[1, 2, 3]', addr: '0x7c3d9e' }],
        },
      },
      {
        code: 'b = a',
        note: 'b = a does NOT copy the list. It just creates a second label pointing to the exact same object. Look — same address!',
        diagram: {
          vars: [{ name: 'a', target: 'g1' }, { name: 'b', target: 'g1' }],
          objects: [{ id: 'g1', type: 'list', value: '[1, 2, 3]', addr: '0x7c3d9e' }],
        },
      },
      {
        code: 'b.append(4)',
        note: 'b mutates the shared list. Both a and b point to it — so a also changes.',
        diagram: {
          vars: [{ name: 'a', target: 'g1' }, { name: 'b', target: 'g1' }],
          objects: [{ id: 'g1', type: 'list', value: '[1, 2, 3, 4]', addr: '0x7c3d9e' }],
          flash: 'g1',
          warning: '⚠️ a also changed — even though we never touched a directly!',
        },
      },
      {
        code: 'print(a)  # [1, 2, 3, 4]',
        note: 'Fix: use b = a.copy() to create an independent list.',
        diagram: {
          vars: [{ name: 'a', target: 'g1' }, { name: 'b', target: 'g1' }],
          objects: [{ id: 'g1', type: 'list', value: '[1, 2, 3, 4]', addr: '0x7c3d9e' }],
          warning: 'Fix: b = a.copy() creates a true independent copy.',
        },
      },
    ],
    insight: 'b = a never copies. For a true copy of a list use b = a.copy(). This trips up everyone at some point.',
    insightColor: 'bg-rose-50 border-rose-200 text-rose-800',
  },
];

function MemoryDiagram({ diagram }: { diagram: DiagramState }) {
  const { vars, objects, flash, warning } = diagram;

  return (
    <div className="flex flex-col gap-3 h-full">
      <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Memory Diagram</p>

      <div className="flex-1 flex flex-col justify-center gap-3">
        <div className="flex items-center gap-0">

          {/* Variable labels */}
          <div className="flex flex-col gap-3 shrink-0 w-16">
            {vars.map((v, i) => (
              <motion.div
                key={v.name + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.075 }}
                className="bg-amber-50 border-2 border-amber-300 rounded-xl px-3 py-2 font-mono font-black text-amber-800 text-sm text-center shadow-sm"
              >
                {v.name}
              </motion.div>
            ))}
          </div>

          {/* Arrow zone */}
          <div className="flex flex-col gap-3 items-center px-2 shrink-0 w-14">
            {vars.map((v, i) => {
              const isShared = vars.filter(x => x.target === v.target).length > 1;

              return (
                <motion.div
                  key={v.name + i}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: i * 0.06 + 0.07, duration: 0.075 }}
                  className="flex items-center w-full"
                >
                  <div className={`h-0.5 flex-1 ${isShared ? 'bg-amber-400' : 'bg-slate-300'}`} />
                  <div className={`w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent ${isShared ? 'border-l-amber-400' : 'border-l-slate-300'}`}
                    style={{ borderLeftWidth: 8, borderLeftColor: isShared ? '#fbbf24' : '#cbd5e1' }} />
                </motion.div>
              );
            })}
          </div>

          {/* Object boxes */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {objects.map(obj => {
                const isPointed = vars.some(v => v.target === obj.id);
                const isFlashing = flash === obj.id;
                const isSharedTarget = vars.filter(v => v.target === obj.id).length > 1;

                return (
                  <motion.div
                    key={obj.id + obj.value}
                    layout
                    initial={{ opacity: isPointed ? 0 : 0.3, scale: 0.95 }}
                    animate={{
                      opacity: isPointed ? 1 : 0.25,
                      scale: 1,
                    }}
                    transition={{ duration: 0.09 }}
                    className={`border-2 rounded-2xl px-4 py-3 transition-all relative ${
                      isFlashing
                        ? isSharedTarget
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-emerald-400 bg-emerald-50'
                        : isSharedTarget && isPointed
                        ? 'border-amber-300 bg-amber-50'
                        : isPointed
                        ? 'border-sky-200 bg-sky-50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    {isFlashing && (
                      <motion.div
                        className={`absolute inset-0 rounded-2xl ${isSharedTarget ? 'bg-rose-400' : 'bg-emerald-400'} opacity-10`}
                        animate={{ opacity: [0.12, 0, 0.12, 0] }}
                        transition={{ duration: 0.175, times: [0, 0.33, 0.66, 1] }}
                      />
                    )}
                    <div className="flex items-start justify-between gap-3 relative">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{obj.type}</span>
                        <p className={`font-mono font-black text-xl leading-tight mt-0.5 ${
                          isFlashing ? (isSharedTarget ? 'text-rose-700' : 'text-emerald-700') : 'text-slate-800'
                        }`}>{obj.value}</p>
                      </div>
                      <div className={`text-right shrink-0 px-2 py-1 rounded-lg border ${
                        isFlashing
                          ? isSharedTarget ? 'bg-rose-100 border-rose-300' : 'bg-emerald-100 border-emerald-300'
                          : isSharedTarget && isPointed ? 'bg-amber-100 border-amber-200' : 'bg-slate-100 border-slate-200'
                      }`}>
                        <span className="text-[10px] font-mono text-slate-400 block leading-none mb-0.5">id()</span>
                        <span className={`text-xs font-mono font-black tracking-tight ${
                          isFlashing ? (isSharedTarget ? 'text-rose-600' : 'text-emerald-700') : 'text-slate-600'
                        }`}>{obj.addr}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Warning */}
        <AnimatePresence>
          {warning && (
            <motion.div
              key={warning}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.075 }}
              className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <p className="text-rose-700 text-xs font-semibold leading-relaxed">{warning}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const Scene06b_MutableImmutable: React.FC = () => {
  const [activeExp, setActiveExp] = useState<ExperimentId>('immutable');
  const [stepIdx, setStepIdx] = useState(0);

  const exp = EXPERIMENTS.find(e => e.id === activeExp)!;
  const step = exp.steps[stepIdx];
  const isLast = stepIdx === exp.steps.length - 1;

  const switchExp = (id: ExperimentId) => {
    setActiveExp(id);
    setStepIdx(0);
  };

  const next = () => { if (!isLast) setStepIdx(i => i + 1); };
  const reset = () => setStepIdx(0);

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-4 overflow-hidden">

      {/* Header */}
      <div className="shrink-0">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 06b · Mutable vs Immutable</span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          Some objects can change. <span className="text-emerald-500">Some can't.</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">Step through each experiment and watch what happens in memory.</p>
      </div>

      {/* Experiment tabs */}
      <div className="flex gap-2 shrink-0 relative z-10">
        {EXPERIMENTS.map(e => (
          <button
            key={e.id}
            type="button"
            onClick={() => switchExp(e.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${
              activeExp === e.id
                ? e.id === 'immutable'
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : e.id === 'mutable'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            <span>{e.icon}</span>
            <span>{e.label}</span>
          </button>
        ))}
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">

        {/* Left: step list + controls */}
        <div className="lg:w-72 shrink-0 flex flex-col gap-3">
          <div>
            <p className="text-sm font-black text-slate-700">{exp.icon} {exp.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{exp.subtitle}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            {exp.steps.map((s, i) => (
              <motion.div
                key={i}
                animate={{ opacity: i <= stepIdx ? 1 : 0.35 }}
                className={`rounded-xl border px-3 py-2.5 transition-all ${
                  i === stepIdx
                    ? 'bg-slate-50 border-slate-300'
                    : i < stepIdx
                    ? 'bg-white border-slate-200'
                    : 'bg-white border-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center shrink-0 ${
                    i < stepIdx ? 'bg-emerald-400 text-white' : i === stepIdx ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>{i < stepIdx ? '✓' : i + 1}</span>
                  <code className={`font-mono text-xs font-semibold ${
                    i === stepIdx ? 'text-slate-800' : i < stepIdx ? 'text-slate-500' : 'text-slate-400'
                  }`}>{s.code}</code>
                </div>
                <AnimatePresence>
                  {i === stepIdx && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.06 }}
                      className="text-[11px] text-slate-500 leading-relaxed pl-6 overflow-hidden"
                    >
                      {s.note}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-2 mt-auto">
            {!isLast ? (
              <button
                onClick={next}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors flex-1 justify-center"
              >
                Next step <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-center">
                <span className="text-xs font-bold text-emerald-700">✓ Experiment complete</span>
              </div>
            )}
            {stepIdx > 0 && (
              <button
                onClick={reset}
                className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-xl cursor-pointer transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Insight */}
          <div className={`border rounded-xl px-3 py-2.5 text-xs leading-relaxed ${exp.insightColor}`}>
            {exp.insight}
          </div>
        </div>

        {/* Right: memory diagram */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 min-h-0 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp + stepIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.06 }}
              className="h-full"
            >
              <MemoryDiagram diagram={step.diagram} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Scene06b_MutableImmutable;
