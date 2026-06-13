import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene2_7_CosineMath: React.FC = () => {
  const [step, setStep] = useState(0);

  // Netflix Example
  const [ax, setAx] = useState(8);
  const [ay, setAy] = useState(4);
  const [bx, setBx] = useState(16);
  const [by, setBy] = useState(8);

  const values = useMemo(() => {
    const dot = ax * bx + ay * by;

    const magA = Math.sqrt(ax * ax + ay * ay);
    const magB = Math.sqrt(bx * bx + by * by);

    const cosine =
      magA === 0 || magB === 0
        ? 0
        : Math.max(-1, Math.min(1, dot / (magA * magB)));

    const angle = Math.acos(cosine) * (180 / Math.PI);

    return {
      dot,
      magA,
      magB,
      cosine,
      angle,
    };
  }, [ax, ay, bx, by]);

  const steps = [
    {
      label: 'Vectors',
      detail: 'Represent each user as [Action Hours, Comedy Hours].',
    },
    {
      label: 'Dot Product',
      detail: 'Multiply matching values and add them.',
    },
    {
      label: 'Magnitudes',
      detail: 'Find the length of each vector.',
    },
    {
      label: 'Normalize',
      detail: 'Remove scale by dividing by both lengths.',
    },
    {
      label: 'Similarity',
      detail: 'Only the viewing pattern remains.',
    },
  ];

  const maxStep = steps.length - 1;

  return (
    <SlideLayout
      title="Cosine Similarity"
      text="Direction matters. Magnitude doesn't."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {steps.map((item, index) => (
            <button
              key={index}
              onClick={() => setStep(index)}
              className={`text-left px-3 py-2.5 rounded-xl border transition-all ${
                step === index
                  ? 'bg-white border-slate-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider font-black text-slate-400">
                Step {index + 1}
              </div>

              <div className="text-sm font-semibold text-slate-700">
                {item.label}
              </div>
            </button>
          ))}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              {steps[step].detail}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm font-bold disabled:opacity-30"
            >
              Back
            </button>

            <button
              onClick={() => setStep((s) => Math.min(maxStep, s + 1))}
              disabled={step === maxStep}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
        {/* Custom Values */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900">
              Try Your Own Values
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Compare two Netflix users. Enter Action and Comedy watch hours.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
              <div className="text-sm font-black text-rose-700 mb-3">
                User A
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Action Hours
                  </label>

                  <input
                    type="number"
                    value={ax}
                    onChange={(e) => setAx(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-base font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Comedy Hours
                  </label>

                  <input
                    type="number"
                    value={ay}
                    onChange={(e) => setAy(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-base font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-violet-50 border border-violet-100 p-4">
              <div className="text-sm font-black text-violet-700 mb-3">
                User B
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Action Hours
                  </label>

                  <input
                    type="number"
                    value={bx}
                    onChange={(e) => setBx(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-base font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Comedy Hours
                  </label>

                  <input
                    type="number"
                    value={by}
                    onChange={(e) => setBy(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-base font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formula */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <KaTeXMath
            tex={`\\text{cos}(\\theta)=\\frac{A\\cdot B}{\\|A\\|\\|B\\|}`}
            block
          />
        </div>

        {/* Calculation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            {step === 0 && (
              <div className="text-center">
                <div className="text-lg font-bold text-slate-800">
                  A = [{ax}, {ay}]
                </div>

                <div className="text-lg font-bold text-slate-800 mt-2">
                  B = [{bx}, {by}]
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="text-center">
                <div className="text-sm font-black uppercase tracking-wider text-rose-600 mb-3">
                  Dot Product
                </div>

                <KaTeXMath
                  tex={`${ax}\\times${bx}+${ay}\\times${by}=${values.dot}`}
                  block
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 text-center">
                <KaTeXMath
                  tex={`|A|=${values.magA.toFixed(2)}`}
                  block
                />

                <KaTeXMath
                  tex={`|B|=${values.magB.toFixed(2)}`}
                  block
                />
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <div className="text-sm font-black uppercase tracking-wider text-sky-600 mb-3">
                  Normalize
                </div>

                <KaTeXMath
                  tex={`\\frac{${values.dot}}{${values.magA.toFixed(
                    2
                  )}\\times${values.magB.toFixed(
                    2
                  )}}=${values.cosine.toFixed(3)}`}
                  block
                />
              </div>
            )}

            {step === 4 && (
              <div className="text-center">
                <div className="text-6xl font-black text-emerald-600">
                  {values.cosine.toFixed(3)}
                </div>

                <div className="mt-3 text-lg font-bold text-slate-700">
                  {values.angle.toFixed(0)}°
                </div>

                <div className="mt-3 text-sm text-slate-500">
                  {values.cosine > 0.95
                    ? 'Almost identical'
                    : values.cosine > 0.8
                    ? 'Very similar'
                    : values.cosine > 0.5
                    ? 'Moderately similar'
                    : 'Different preferences'}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Summary */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-sm font-black text-emerald-700 mb-1">
            Key Insight
          </div>

          <div className="text-sm text-slate-700 leading-relaxed">
            Try A = [8, 4] and B = [80, 40]. One user watches 10× more Netflix,
            but cosine similarity remains 1.0 because the viewing pattern is
            identical.
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default Scene2_7_CosineMath;