import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_11_Summary: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-6">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
    >
      Chapter 7 · Summary
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-black text-slate-800 leading-tight"
    >
      Chapter 7 Summary
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 text-left space-y-4 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="px-3 py-1 bg-rose-50 text-rose-600 font-black rounded-lg text-sm">Problem</div>
        <div className="text-slate-700 font-semibold">
          Finding the numbers (weights) for neural network matrix layers to make correct predictions.
        </div>
      </div>

      <div className="flex items-start gap-4 border-t pt-4">
        <div className="px-3 py-1 bg-sky-50 text-sky-600 font-black rounded-lg text-sm">Insight</div>
        <div className="text-slate-700 font-semibold">
          Plot error as a altitude landscape (Loss Landscape). Calculate the gradient to find which direction is uphill, and step the opposite way.
        </div>
      </div>

      <div className="flex items-start gap-4 border-t pt-4">
        <div className="px-3 py-1 bg-violet-50 text-violet-600 font-black rounded-lg text-sm">Formula</div>
        <div className="text-slate-800 font-mono font-bold text-sm bg-slate-50 px-2 py-1 rounded">
          θ_new = θ_old − η ∇L(θ)
        </div>
      </div>

      <div className="flex items-start gap-4 border-t pt-4">
        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 font-black rounded-lg text-sm">Use Case</div>
        <div className="text-slate-700 font-semibold">
          Powering all model training—backpropagation updates weight matrices across millions of parameters.
        </div>
      </div>
    </motion.div>
  </div>
);
