import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ObjKey = 'alice' | 'bob' | '42' | 'true' | 'list';

const OBJECTS: { key: ObjKey; display: string; type: string; textColor: string; bg: string; border: string }[] = [
  { key: 'alice', display: '"Alice"',   type: 'str',  textColor: 'text-sky-700',     bg: 'bg-sky-50',     border: 'border-sky-300' },
  { key: 'bob',   display: '"Bob"',     type: 'str',  textColor: 'text-sky-700',     bg: 'bg-sky-50',     border: 'border-sky-300' },
  { key: '42',    display: '42',        type: 'int',  textColor: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-300' },
  { key: 'true',  display: 'True',      type: 'bool', textColor: 'text-violet-700',  bg: 'bg-violet-50',  border: 'border-violet-300' },
  { key: 'list',  display: '[1, 2, 3]', type: 'list', textColor: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300' },
];

const STEPS = [
  {
    label: 'Assign',
    code: 'name = "Alice"',
    explanation: 'The label "name" now points to the string "Alice" in memory. Python created the object first, then attached the name to it.',
  },
  {
    label: 'Reassign',
    code: 'name = "Bob"',
    explanation: 'The label moves to a new object. "Alice" is still in memory — it\'s just unlabelled now. Python\'s garbage collector cleans it up later.',
  },
  {
    label: 'Multiple labels',
    code: 'x = 42\ny = 42',
    explanation: 'Python is smart — both x and y can point to the very same object in memory. No duplication needed.',
  },
];

export const Scene03_Variables: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [nameTarget, setNameTarget] = useState<ObjKey>('alice');

  // Sync step changes to corresponding objects
  React.useEffect(() => {
    if (activeStep === 0) {
      setNameTarget('alice');
    } else if (activeStep === 1) {
      setNameTarget('bob');
    } else if (activeStep === 2) {
      setNameTarget('42');
    }
  }, [activeStep]);

  const nameObj = OBJECTS.find(o => o.key === nameTarget)!;

  return (
    <div className="h-full w-full flex flex-col lg:flex-row px-8 py-5 gap-6 overflow-hidden">

      {/* Left — concept */}
      <div className="flex-1 flex flex-col justify-center gap-5 min-w-0">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 03 · Variables</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Variables are labels,<br /><span className="text-amber-500">not boxes.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-sm">
            Most beginners think a variable <em>contains</em> a value — like pouring water into a cup.
            Python works differently: a variable is a <strong className="text-slate-700">sticky label</strong> that <em>points to</em> an object. You can move the label. The object stays.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-2">
          {STEPS.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`text-left px-4 py-3 rounded-2xl border-2 transition-all cursor-pointer ${
                activeStep === i
                  ? 'bg-amber-50 border-amber-300 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-amber-200 hover:bg-amber-50/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${
                  activeStep === i ? 'bg-amber-400 text-white' : 'bg-slate-100 text-slate-400'
                }`}>{i + 1}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${activeStep === i ? 'text-amber-600' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
              <code className="font-mono text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg block w-fit">{step.code}</code>
              <AnimatePresence>
                {activeStep === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1 }}
                    className="text-xs text-slate-500 mt-2 leading-relaxed overflow-hidden"
                  >
                    {step.explanation}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-500 leading-relaxed">
          <span className="text-amber-600 font-bold">Golden Rule:</span> In Python, everything is an object. Variables are just names that reference those objects.
        </div>
      </div>

      {/* Right — interactive memory diagram */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-w-0">
        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Memory Diagram</p>

        {/* Variable label → object */}
        <div className="flex flex-col items-center gap-2">
          {activeStep === 2 ? (
            <div className="flex gap-4">
              <div className="bg-amber-50 border-2 border-amber-300 text-amber-800 font-mono font-black text-sm px-4 py-2 rounded-xl shadow-sm">
                x
              </div>
              <div className="bg-amber-50 border-2 border-amber-300 text-amber-800 font-mono font-black text-sm px-4 py-2 rounded-xl shadow-sm">
                y
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border-2 border-amber-300 text-amber-800 font-mono font-black text-sm px-5 py-2 rounded-xl shadow-sm">
              name
            </div>
          )}
          <div className="w-px h-5 bg-slate-300" />
          <span className="text-slate-400 text-[11px] font-mono">→ points to</span>
          <div className="w-px h-4 bg-slate-300" />
          
          <div className="flex items-center gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={nameTarget}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`border-2 rounded-2xl px-6 py-4 text-center ${nameObj.bg} ${nameObj.border}`}
              >
                <div className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${nameObj.textColor} opacity-70`}>{nameObj.type}</div>
                <div className={`font-mono font-black text-2xl ${nameObj.textColor}`}>{nameObj.display}</div>
                <div className="text-slate-400 font-mono text-[10px] mt-1.5">
                  id: 0x{Math.abs(nameTarget.charCodeAt(0) * 7318).toString(16).padStart(6, '0')}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* If reassigned, show "Alice" floating unlabelled */}
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.4, x: 0 }}
                className="border-2 border-dashed border-slate-300 rounded-2xl px-5 py-3 text-center bg-slate-50 text-slate-400"
                title="Unlabelled object — soon to be garbage collected"
              >
                <div className="text-[9px] font-mono uppercase tracking-widest mb-0.5">str</div>
                <div className="font-mono font-bold text-lg">"Alice"</div>
                <div className="text-[9px] mt-1 italic">unlabelled</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Object shelf */}
        <div className="flex flex-col items-center gap-2 w-full max-w-xs">
          <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">— objects in memory —</p>
          <div className="w-full bg-white border border-slate-200 rounded-2xl p-3 flex flex-wrap gap-2 justify-center">
            {OBJECTS.map(obj => (
              <button
                key={obj.key}
                onClick={() => {
                  setNameTarget(obj.key);
                  // Reset activeStep to custom state when user plays with shelf manually
                  setActiveStep(-1);
                }}
                className={`font-mono text-sm font-bold px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${obj.bg} ${obj.border} ${obj.textColor} ${
                  nameTarget === obj.key
                    ? 'ring-2 ring-amber-400 ring-offset-2 scale-105 shadow-sm'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                {obj.display}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            Click any object to reassign manually
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene03_Variables;
