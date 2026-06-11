import React from 'react';
import { motion } from 'framer-motion';

export const Scene14_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-full w-full px-4 py-8 text-center relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-400/10 filter blur-[160px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center gap-8 z-10 max-w-3xl"
    >
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
        className="text-7xl select-none"
      >
        💬
      </motion.div>

      <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-extrabold bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full">
        Up Next · Chapter 2
      </span>

      <div className="flex flex-col gap-2">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-800 leading-[1.05]">
          You can read it.
        </h1>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-sky-500 leading-[1.05]">
          Now say something real.
        </h1>
      </div>

      <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 to-sky-500 rounded-full" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
      >
        Chapter 2 takes you straight into conversation — greetings, numbers, introductions, and the essential survival phrases you'll use from day one.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="flex items-center gap-3 flex-wrap justify-center"
      >
        {[
          ['नमस्कार', '#F59E0B'],
          ['माझं नाव…', '#0EA5E9'],
          ['एक, दोन, तीन', '#10B981'],
          ['धन्यवाद', '#8B5CF6'],
        ].map(([label, color]) => (
          <div
            key={label}
            className="px-4 py-2 rounded-full border font-bold text-sm"
            style={{ borderColor: color + '55', color, backgroundColor: color + '12', fontFamily: 'serif' }}
          >
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);

export default Scene14_NextHook;
