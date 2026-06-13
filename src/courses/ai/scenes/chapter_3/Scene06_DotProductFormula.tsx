import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene3_6_DotProductFormula: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const components = [
    {
      label: 'A · B',
      desc: 'The Dot Product notation. A single number representing similarity.',
      color: '#7C3AED',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
    },
    {
      label: 'A_x B_x + A_y B_y',
      desc: 'Multiply corresponding dimensions and sum them up.',
      color: '#0284C7',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
    },
    {
      label: '\\sum_{i=1}^n A_i B_i',
      desc: 'General formula: works for any number of dimensions.',
      color: '#059669',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
  ];

  return (
    <SlideLayout
      title="The Mathematical Formula"
      text="Simple multiplication, summed across all dimensions."
      sidebarContent={
        <div className="flex flex-col gap-4 justify-between h-full">
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-800 leading-tight">
              One Formula, Infinite Dimensions
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No matter how many features (dimensions) your vectors have, the formula remains the same: multiply matching elements and sum them.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-1">
              Notation
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">
              The dot product is written with a heavy dot (·), distinct from cross product or regular multiplication.
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
        >
          The Dot Product Equation
        </motion.p>

        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-lg w-full flex flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-4 flex-wrap text-4xl font-black font-mono">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="px-6 py-4 bg-violet-50 border-2 border-violet-200 rounded-2xl text-violet-700"
            >
              <KaTeXMath tex="\mathbf{A} \cdot \mathbf{B}" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 1 ? 1 : 0 }}
              className="text-slate-400"
            >
              =
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.8 }}
              className="px-6 py-4 bg-sky-50 border-2 border-sky-200 rounded-2xl text-sky-700"
            >
              <KaTeXMath tex="A_x B_x + A_y B_y" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 2 ? 1 : 0 }}
              className="text-slate-400"
            >
              =
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.8 }}
              className="px-6 py-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-emerald-700"
            >
              <KaTeXMath tex="\sum_{i=1}^n A_i B_i" />
            </motion.div>
          </div>

          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4"
              >
                {components.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`${item.bg} border ${item.border} rounded-2xl p-5 shadow-sm flex flex-col justify-between`}
                  >
                    <div
                      className="font-mono font-black text-xl mb-2"
                      style={{ color: item.color }}
                    >
                      <KaTeXMath tex={item.label} />
                    </div>
                    <div className="text-slate-600 text-xs font-medium leading-relaxed">
                      {item.desc}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideLayout>
  );
};

export default Scene3_6_DotProductFormula;
