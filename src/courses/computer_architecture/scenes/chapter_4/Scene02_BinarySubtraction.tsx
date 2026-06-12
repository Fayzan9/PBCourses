import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene02_BinarySubtraction: React.FC = () => {
  const [aVal, setAVal] = useState(12);
  const [bVal, setBVal] = useState(5);

  const clamp = (n: number) => Math.max(0, Math.min(255, n));

  const a = clamp(aVal);
  const b = clamp(bVal);

  const toBin8 = (n: number) => n.toString(2).padStart(8, '0');

  const bNot = (~b & 0xff);
  const bTwos = (bNot + 1) & 0xff;
  const cpuResult = (a + bTwos) & 0xff;

  const actualResult = a - b;
  const isNegative = actualResult < 0;

  const [activeStep, setActiveStep] = useState(0);

  const presets = [
    { a: 12, b: 5 },
    { a: 15, b: 7 },
    { a: 100, b: 36 },
    { a: 8, b: 3 },
  ];

  const steps = [
    {
      title: 'Start with B',
      explanation:
        'The CPU wants to subtract B, but the hardware only knows how to add. First we look at B in its original form.',
      binary: toBin8(b),
      decimal: b,
      color: 'text-orange-600',
    },
    {
      title: 'Flip Every Bit',
      explanation:
        "Create the one's complement by changing every 0 into 1 and every 1 into 0.",
      binary: toBin8(bNot),
      decimal: bNot,
      color: 'text-violet-600',
    },
    {
      title: 'Add 1',
      explanation:
        "Adding 1 creates the two's complement. This binary pattern now represents −B.",
      binary: toBin8(bTwos),
      decimal: bTwos,
      color: 'text-rose-600',
    },
    {
      title: 'Add A + (−B)',
      explanation:
        'Now the CPU performs a normal binary addition. No subtraction hardware is needed.',
      binary: toBin8(cpuResult),
      decimal: cpuResult,
      color: 'text-emerald-600',
    },
  ];

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-rose-600 font-extrabold">
          Lesson 4.2 · Binary Arithmetic
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Binary{' '}
          <span className="text-rose-600 font-serif italic">
            Subtraction
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-4xl">
          Computers convert subtraction into addition using two&apos;s
          complement. Watch B transform step-by-step while A stays the same.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">
        {/* LEFT PANEL */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">
              Experiment
            </div>

            {[
              {
                label: 'A (Number To Keep)',
                value: aVal,
                setter: setAVal,
                color: 'border-rose-300 bg-rose-50',
              },
              {
                label: 'B (Number To Subtract)',
                value: bVal,
                setter: setBVal,
                color: 'border-orange-300 bg-orange-50',
              },
            ].map((item) => (
              <div key={item.label} className="mb-4">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                  {item.label}
                </div>

                <input
                  type="number"
                  min={0}
                  max={255}
                  value={item.value}
                  onChange={(e) =>
                    item.setter(Number(e.target.value))
                  }
                  className={`w-full text-center text-2xl font-black font-mono border-2 rounded-xl px-3 py-2 outline-none ${item.color}`}
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => (
                <button
                  key={`${p.a}-${p.b}`}
                  onClick={() => {
                    setAVal(p.a);
                    setBVal(p.b);
                    setActiveStep(0);
                  }}
                  className={`rounded-xl p-2 border-2 text-sm font-black font-mono transition-all ${
                    a === p.a && b === p.b
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {p.a} − {p.b}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">
              Original Numbers
            </div>

            <div className="space-y-3">
              <div className="rounded-xl bg-rose-50 border border-rose-100 p-3">
                <div className="text-[10px] uppercase font-bold text-rose-500">
                  A = {a}
                </div>

                <div className="font-mono font-black text-slate-700 tracking-wider mt-1">
                  {toBin8(a)}
                </div>
              </div>

              <div className="rounded-xl bg-orange-50 border border-orange-100 p-3">
                <div className="text-[10px] uppercase font-bold text-orange-500">
                  B = {b}
                </div>

                <div className="font-mono font-black text-slate-700 tracking-wider mt-1">
                  {toBin8(b)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">
          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            What The CPU Is Doing
          </div>

          {/* Step Selector */}
          <div className="grid grid-cols-4 gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`py-2 rounded-xl border-2 text-xs font-black transition-all ${
                  activeStep === index
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                Step {index + 1}
              </button>
            ))}
          </div>

          {/* Explanation */}
          <motion.div
            key={`${activeStep}-${a}-${b}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase font-bold text-slate-400">
                  {steps[activeStep].title}
                </div>

                <div className="mt-2 text-sm font-semibold text-slate-600 max-w-3xl">
                  {steps[activeStep].explanation}
                </div>
              </div>

              <div
                className={`text-4xl font-black font-mono ${steps[activeStep].color}`}
              >
                {steps[activeStep].decimal}
              </div>
            </div>

            {/* Paper-style binary work */}
            <div className="mt-5 rounded-2xl bg-slate-900 p-6">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-4">
                Binary Arithmetic
              </div>

              <div className="max-w-2xl mx-auto font-mono">
                <div className="text-center text-rose-400 text-3xl font-black tracking-[0.2em]">
                  {toBin8(a)}
                </div>

                <div
                  className={`text-center text-3xl font-black tracking-[0.2em] mt-3 ${
                    activeStep === 0
                      ? 'text-orange-400'
                      : activeStep === 1
                      ? 'text-violet-400'
                      : activeStep === 2
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {activeStep === 3 ? '+' : ''}
                  {steps[activeStep].binary}
                </div>

                <div className="text-center text-xs text-slate-500 mt-3">
                  A stays constant while B is transformed.
                </div>

                {activeStep === 3 && (
                  <>
                    <div className="border-t-4 border-slate-600 mt-5" />

                    <div className="text-center text-4xl font-black text-emerald-400 tracking-[0.2em] mt-5">
                      {toBin8(cpuResult)}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Transformation Timeline */}
          <div className="grid grid-cols-4 gap-3">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer rounded-2xl border-2 p-3 transition-all ${
                  activeStep === index
                    ? 'border-rose-400 bg-white'
                    : 'border-slate-200 bg-white opacity-70'
                }`}
              >
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Step {index + 1}
                </div>

                <div className="mt-1 text-xs font-bold text-slate-700">
                  {step.title}
                </div>

                <div
                  className={`mt-3 text-lg font-black font-mono ${step.color}`}
                >
                  {step.decimal}
                </div>
              </div>
            ))}
          </div>

          {/* Final Result */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-4">
              Final CPU Calculation
            </div>

            <div className="flex items-center justify-center gap-5 flex-wrap">
              <div className="text-center">
                <div className="text-[10px] uppercase text-slate-400">
                  A
                </div>

                <div className="text-3xl font-black text-rose-600">
                  {a}
                </div>
              </div>

              <div className="text-3xl font-black text-slate-400">
                +
              </div>

              <div className="text-center">
                <div className="text-[10px] uppercase text-slate-400">
                  −B (Two&apos;s Complement)
                </div>

                <div className="text-3xl font-black text-orange-600">
                  {bTwos}
                </div>
              </div>

              <div className="text-3xl font-black text-slate-400">
                =
              </div>

              <div className="text-center">
                <div className="text-[10px] uppercase text-slate-400">
                  Result
                </div>

                <div
                  className={`text-5xl font-black ${
                    isNegative
                      ? 'text-orange-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {actualResult}
                </div>
              </div>
            </div>

            {isNegative && (
              <div className="mt-4 text-center text-sm font-semibold text-orange-600">
                Negative result detected. CPUs interpret the final bits as a
                signed two&apos;s complement value.
              </div>
            )}
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene02_BinarySubtraction;