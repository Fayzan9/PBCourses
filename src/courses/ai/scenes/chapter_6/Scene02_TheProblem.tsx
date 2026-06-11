import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene6_2_TheProblem: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-6 gap-7">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-black text-slate-800"
      >
        Eigenvectors require:
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="px-10 py-5 bg-cyan-50 border-2 border-cyan-200 rounded-2xl"
      >
        <p className="font-mono text-3xl font-black text-cyan-700">Mv = λv</p>
        <p className="text-slate-500 text-base mt-2">Vector goes in → <strong>same-sized</strong> vector comes out</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="flex items-center gap-8 text-xl font-black text-slate-700"
      >
        <div className="flex flex-col items-center gap-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="text-4xl">3</span>
          <span className="text-sm font-semibold text-slate-400">numbers in</span>
        </div>
        <div className="text-3xl text-slate-400">→</div>
        <div className="flex flex-col items-center gap-1 px-6 py-4 bg-rose-50 border border-rose-200 rounded-2xl">
          <span className="text-4xl text-rose-500">2</span>
          <span className="text-sm font-semibold text-rose-400">numbers out</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-slate-500 text-xl font-medium"
      >
        A 3D vector becomes a 2D vector.<br />
        The output doesn't live in the same world.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => setRevealed(true)}
        className="px-6 py-3 bg-rose-500 text-white font-black rounded-2xl text-lg cursor-pointer hover:bg-rose-600 active:scale-95 transition-all"
      >
        So what happens?
      </motion.button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-8 py-5 bg-rose-50 border-2 border-rose-300 rounded-2xl max-w-lg"
          >
            <p className="text-rose-700 text-2xl font-black">You can't find eigenvectors.</p>
            <p className="text-rose-500 text-base font-medium mt-2">
              Asking "did the direction stay the same?" makes no sense<br />
              when the vector <em>changed dimensions.</em>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
