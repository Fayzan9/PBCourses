import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene4_17_NeuralLayer: React.FC = () => {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const weights = [[0.5, 0.8], [0.2, -0.6], [0.9, 0.1]];
  const input   = [3, 2];
  const bias    = [0.5, -0.3, 0.1];
  const outputs = weights.map((row, i) => row[0] * input[0] + row[1] * input[1] + bias[i]);

  return (
    <SlideLayout
      title="Scale It Up: A Full Layer"
      text="A neural network layer is just many neurons running at once. Each neuron uses its own row of weights — that's exactly a matrix multiplication."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-black block mb-2">Layer formula</span>
            <KaTeXMath tex="y = Wx + b" block />
          </div>

          {[['W', 'Weight matrix (one row per neuron)', 'bg-rose-50   border-rose-100'],
            ['x', 'Input vector [3, 2]',                'bg-sky-50    border-sky-100'],
            ['b', 'Bias vector',                        'bg-violet-50 border-violet-100'],
            ['y', 'Output (one value per neuron)',      'bg-emerald-50 border-emerald-100'],
          ].map(([sym, desc, cls]) => (
            <div key={sym} className={`flex gap-2 items-center ${cls} border rounded-lg px-3 py-2 text-xs font-mono font-bold`}>
              <span className="font-black text-base text-slate-700">{sym}</span>
              <span className="font-medium text-slate-500">{desc}</span>
            </div>
          ))}

          <p className="text-xs text-slate-400 font-medium px-1">Hover the rows to see each neuron compute.</p>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-400">x =</span>
          <div className="flex gap-2">
            {input.map((v, i) => (
              <div key={i} className="bg-sky-50 border border-sky-200 rounded-xl px-5 py-2.5 text-sky-700 font-black text-xl font-mono">{v}</div>
            ))}
          </div>
        </div>

        <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
            Weight matrix W — each row = one neuron
          </div>
          <div className="flex flex-col gap-2">
            {weights.map((row, ri) => (
              <div
                key={ri}
                onMouseEnter={() => setActiveRow(ri)}
                onMouseLeave={() => setActiveRow(null)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 border cursor-default transition-all ${
                  activeRow === ri ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex gap-4">
                  {row.map((w, ci) => (
                    <span key={ci} className={`font-mono font-black text-sm ${activeRow === ri ? 'text-rose-600' : 'text-slate-600'}`}>
                      {w}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-bold">neuron {ri + 1}</span>
                <AnimatePresence>
                  {activeRow === ri && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="text-emerald-600 font-black font-mono text-sm"
                    >
                      → {outputs[ri].toFixed(1)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-400">y =</span>
          <div className="flex gap-2">
            {outputs.map((v, i) => (
              <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-emerald-700 font-black text-lg font-mono">
                {v.toFixed(1)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
export default Scene4_17_NeuralLayer;
