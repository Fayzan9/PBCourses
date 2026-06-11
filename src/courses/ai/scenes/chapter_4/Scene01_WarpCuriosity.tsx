import React from 'react';
import { motion } from 'framer-motion';

export const Scene4_1_WarpCuriosity: React.FC = () => {
  const items = [
    { text: 'Stretch.', color: 'text-transformations' },
    { text: 'Rotate.', color: 'text-vector' },
    { text: 'Squish.', color: 'text-similarity' },
    { text: 'Bend.', color: 'text-loss' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-8 font-bold"
      >
        What can you do to space itself?
      </motion.p>

      <div className="flex flex-col gap-4 mb-10">
        {items.map((item, idx) => (
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.5, duration: 0.7, ease: 'easeOut' }}
            className={`text-5xl md:text-7xl font-extrabold tracking-tight ${item.color}`}
          >
            {item.text}
          </motion.h1>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="border-t border-slate-200 pt-8 max-w-xl"
      >
        <p className="text-slate-400 text-lg font-medium mb-2">All of these are controlled by</p>
        <p className="text-transformations text-3xl md:text-4xl font-black">a single mathematical object.</p>
      </motion.div>
    </div>
  );
};
