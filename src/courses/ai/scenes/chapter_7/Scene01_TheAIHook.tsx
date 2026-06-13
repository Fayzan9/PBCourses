import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_1_TheAIHook: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-6 gap-8">
      {/* Chapter Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
      >
        Chapter 7 · The Neural Network Layer
      </motion.p>

      {/* Main Hook */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-6xl font-black text-slate-800 leading-tight"
      >
        How does an AI actually <br />
        <span className="text-indigo-600">look at the world?</span>
      </motion.h1>

      {/* Visual Transformation: Text -> Vector -> Matrix */}
      <div className="flex flex-col md:flex-row items-center gap-6 mt-4 w-full justify-center">
        
        {/* Step 1: Human Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-3 px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl w-48"
        >
          <span className="text-4xl">👋</span>
          <p className="text-slate-600 font-bold">"Hello"</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="text-3xl text-slate-300 font-black"
        >
          →
        </motion.div>

        {/* Step 2: Vector Representation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex flex-col items-center gap-2 px-6 py-4 bg-cyan-50 border border-cyan-200 rounded-2xl w-48"
        >
          <div className="font-mono text-xl font-black text-cyan-800 flex flex-col items-center border-l-2 border-r-2 border-cyan-400 px-3 py-1">
            <span>0.82</span>
            <span>-0.14</span>
            <span>0.55</span>
          </div>
          <p className="text-cyan-700 text-sm font-semibold mt-1">Vector (x)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.3 }}
          className="text-3xl text-slate-300 font-black"
        >
          →
        </motion.div>

        {/* Step 3: Matrix Processing */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="flex flex-col items-center gap-2 px-6 py-4 bg-indigo-50 border border-indigo-200 rounded-2xl w-48"
        >
          <div className="font-mono text-xl font-black text-indigo-800 flex flex-col items-center border-l-2 border-r-2 border-indigo-400 px-3 py-1">
            <span>w₁₁ w₁₂ w₁₃</span>
            <span>w₂₁ w₂₂ w₂₃</span>
            <span>w₃₁ w₃₂ w₃₃</span>
          </div>
          <p className="text-indigo-700 text-sm font-semibold mt-1">Matrix (W)</p>
        </motion.div>
      </div>

      {/* Conclusion Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="mt-6 px-10 py-5 bg-slate-800 rounded-2xl max-w-2xl shadow-xl"
      >
        <p className="text-white text-lg font-medium leading-relaxed">
          It doesn't see images. It doesn't read words. <br/>
          Every piece of data is converted into a <strong className="text-cyan-400">vector</strong>, and every thought the AI has is just a <strong className="text-indigo-400">sequence of matrices</strong> transforming that space.
        </p>
      </motion.div>

    </div>
  );
};