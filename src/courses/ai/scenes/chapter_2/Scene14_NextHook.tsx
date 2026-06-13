import React from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene2_13_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center max-w-4xl mx-auto relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[140px]" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-10 flex flex-col items-center"
    >
      <div className="text-xs font-black uppercase tracking-[0.3em] text-violet-500 mb-5">
        Chapter 3 Preview
      </div>

      <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-none">
        The Most Important
        <br />
        Part Was Hidden.
      </h1>

      <div className="mt-10 mb-8 bg-white border border-slate-200 rounded-3xl shadow-sm px-8 py-6">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="text-slate-400 font-medium">
            cos(θ)
          </span>

          <span className="text-slate-400">=</span>

          <div className="relative">
            <KaTeXMath
              tex={`\\frac{\\color{#7C3AED}{A\\cdot B}}{\\|A\\|\\|B\\|}`}
              block
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-black">
                ← This is the star
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-slate-600 leading-relaxed max-w-2xl"
      >
        We spent this chapter talking about cosine similarity.
        <br />
        But the part that actually does the work is the
        <span className="font-black text-violet-600"> dot product.</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 grid grid-cols-3 gap-3"
      >
        {[
          'What A·B computes',
          'Why alignment matters',
          'Why AI uses it everywhere',
        ].map((item) => (
          <div
            key={item}
            className="px-4 py-3 rounded-2xl border border-violet-200 bg-violet-50 text-sm font-bold text-violet-700"
          >
            {item}
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-8 text-slate-400 text-sm font-medium"
      >
        Next: Dot Product
      </motion.div>
    </motion.div>
  </div>
);

export default Scene2_13_NextHook;