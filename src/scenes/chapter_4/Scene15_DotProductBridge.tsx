import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene4_15_DotProductBridge: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  const rows = [[2, 1], [0, 3], [1, 2]];
  const input = [3, 2];
  const outputs = rows.map(row => row[0] * input[0] + row[1] * input[1]);

  return (
    <SlideLayout
      title="Wait — You Already Know This"
      text="Matrix multiplication isn't new math. It's just the dot product from Chapter 3, run once per row. Each row of the matrix is a 'question' asked about the input."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-600 font-black block mb-2">From Chapter 3</span>
            A dot product multiplies matching pairs of numbers and sums them up. It measures how much two vectors align.
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
            <span className="text-[10px] font-mono uppercase tracking-wider text-violet-600 font-black block mb-2">What a matrix adds</span>
            A matrix runs that dot product once per row. 3 rows = 3 questions = 3 output values.
          </div>

          <button
            onClick={() => setRevealed(true)}
            className={`px-4 py-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
              revealed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-700'
            }`}
          >
            {revealed ? '✓ Connection made!' : 'Show me the connection →'}
          </button>
        </div>
      }
    >
      <div className="flex items-center justify-center gap-8 w-full max-w-2xl px-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Input</span>
          <div className="flex flex-col gap-1">
            {input.map((v, i) => (
              <div key={i} className="bg-sky-50 border border-sky-200 rounded-xl px-5 py-3 text-sky-700 font-black text-xl font-mono">
                {v}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {revealed ? (
            rows.map((row, ri) => (
              <motion.div
                key={ri}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ri * 0.2 }}
                className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              >
                <span className="font-mono text-sm font-bold text-rose-600">[{row.join(', ')}]</span>
                <span className="text-slate-400 text-sm font-mono">·</span>
                <span className="font-mono text-sm font-bold text-sky-600">[{input.join(', ')}]</span>
                <span className="text-slate-400 text-xs">=</span>
                <span className="font-mono text-sm font-black text-emerald-600">{outputs[ri]}</span>
              </motion.div>
            ))
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-400 text-sm font-medium">
              Each row of the matrix does one dot product with the input
            </div>
          )}
        </div>

        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Output</span>
            <div className="flex flex-col gap-1">
              {outputs.map((v, i) => (
                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 text-emerald-700 font-black text-xl font-mono">
                  {v}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};
export default Scene4_15_DotProductBridge;
