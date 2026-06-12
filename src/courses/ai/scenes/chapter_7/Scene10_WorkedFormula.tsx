import React from 'react';
import { motion } from 'framer-motion';
import { Math } from '../../components/Math';

export const Scene7_10_WorkedFormula: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-6">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
    >
      Chapter 7 · The Update Rule
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-black text-slate-800 leading-tight"
    >
      The Golden Rule of <br />
      <span className="text-violet-600">Gradient Descent</span>
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col items-center gap-4 text-slate-600 text-xl font-medium leading-relaxed"
    >
      <p>
        Every learning algorithm in modern AI—from simple linear regression to the largest GPT model—updates its parameters using this core equation:
      </p>

      <div className="my-4 px-8 py-5 bg-violet-50 border border-violet-200 rounded-3xl">
        <Math tex="\theta_{new} = \theta_{old} - \eta \nabla L(\theta)" block className="text-3xl text-violet-700 font-extrabold" />
      </div>

      <div className="grid grid-cols-2 gap-4 text-left text-sm max-w-md mt-2">
        <div className="flex items-start gap-2">
          <span className="text-xl">θ</span>
          <div>
            <strong className="text-slate-800 block">Parameters/Weights</strong>
            The configurations of the model matrices.
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xl text-rose-600">∇L</span>
          <div>
            <strong className="text-rose-600 block">Gradient</strong>
            The vector pointing directly uphill towards higher error.
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xl text-emerald-600">η</span>
          <div>
            <strong className="text-emerald-600 block">Learning Rate</strong>
            The step size scalar (how far we leap).
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xl text-violet-600">−</span>
          <div>
            <strong className="text-violet-600 block">Subtraction</strong>
            Forces us to walk downhill (the opposite direction of uphill).
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);
