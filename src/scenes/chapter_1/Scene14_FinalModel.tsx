import React from 'react';
import { motion } from 'framer-motion';

export const Scene14_FinalModel: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-2 px-6 text-center max-w-3xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-vector/5 filter blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex flex-col gap-6 z-10 animate-fade-in"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-vector font-extrabold">Intuition Mastered</span>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-800 mb-1 leading-tight">
          Everything can become a point.
        </h1>

        <div className="w-20 h-1.5 bg-gradient-to-r from-vector to-transformations mx-auto rounded-full my-1 shadow-sm" />

        <p className="text-slate-600 text-xl md:text-2xl font-bold leading-relaxed max-w-xl mx-auto">
          Once things become points, machines can compare, search, and learn from them.
        </p>

        <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed border-t border-slate-200 pt-6 font-medium">
          This single geometric insight forms the foundation of all modern AI.
        </p>
      </motion.div>
    </div>
  );
};
