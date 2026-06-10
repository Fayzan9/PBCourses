import React from 'react';
import { motion } from 'framer-motion';

export const Scene1_Curiosity: React.FC = () => {
  const items = [
    { text: 'A movie.', color: 'text-transformations' },
    { text: 'A song.', color: 'text-similarity' },
    { text: 'A person.', color: 'text-vector' },
    { text: 'A sentence.', color: 'text-probability' }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full py-2 px-4 text-center max-w-4xl mx-auto">
      <div className="flex flex-col gap-5 md:gap-7 mb-10">
        {items.map((item, idx) => (
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.4, duration: 0.8, ease: "easeOut" }}
            className={`text-4xl md:text-6xl font-extrabold tracking-tight ${item.color}`}
          >
            {item.text}
          </motion.h1>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="mt-6 border-t border-slate-200 pt-8"
      >
        <p className="text-xl md:text-2xl font-bold text-slate-500 tracking-wide">
          What do they have in common?
        </p>
      </motion.div>
    </div>
  );
};
