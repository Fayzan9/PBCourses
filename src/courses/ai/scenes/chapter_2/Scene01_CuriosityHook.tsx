import React from 'react';
import { motion } from 'framer-motion';

export const Scene2_1_CuriosityHook: React.FC = () => {
  const items = [
    { text: 'Near.',             color: 'text-similarity' },
    { text: 'Far.',              color: 'text-loss' },
    { text: 'Almost identical.', color: 'text-vector' },
    { text: 'Completely different.', color: 'text-transformations' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-8 font-bold"
      >
        Every point in space has a position. And positions have relationships.
      </motion.p>

      <div className="flex flex-col gap-4 mb-10">
        {items.map((item, idx) => (
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.15, duration: 0.35, ease: 'easeOut' }}
            className={`text-4xl md:text-6xl font-extrabold tracking-tight ${item.color}`}
          >
            {item.text}
          </motion.h1>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="border-t border-slate-200 pt-8 max-w-xl"
      >
        <p className="text-slate-400 text-lg font-medium mb-2">To find similar things in AI, we ask one question:</p>
        <p className="text-similarity text-3xl md:text-4xl font-black">How close are two points?</p>
      </motion.div>
    </div>
  );
};
