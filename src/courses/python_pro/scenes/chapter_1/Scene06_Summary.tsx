import React from 'react';
import { motion } from 'framer-motion';

export const Scene06_Summary: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 100 }
    }
  };

  const takeaways = [
    {
      title: 'Abstraction Layer',
      desc: 'Coding bridges the gap between human logic and hardware execution. We write code for humans first, and CPU execution second.'
    },
    {
      title: 'CPU, RAM, & Storage Roles',
      desc: 'Storage keeps files permanently. RAM holds the active execution state. The CPU reads instructions from RAM and does the hard math.'
    },
    {
      title: 'Binary is Base 2',
      desc: 'Transistors use electrical high/low states (1s and 0s). Bytes group 8 bits together to represent characters via text encoding standards like ASCII & Unicode/UTF-8.'
    },
    {
      title: 'Python Translation Pipeline',
      desc: 'Python translates source code (.py) into Bytecode (.pyc) which executes inside the Python Virtual Machine (PVM) rather than executing directly as native machine code.'
    }
  ];

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.6 · Course Overview
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          Chapter 1 <span className="text-indigo-600 font-serif italic">Summary</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-2xl leading-relaxed">
          Congratulations! You've mastered computer architecture fundamentals. Let's recap before starting variables.
        </p>
      </motion.div>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 items-center justify-between">
        
        {/* Left column - takeaways list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col gap-3 min-h-0 w-full"
        >
          {takeaways.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white border border-slate-100 rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-1"
            >
              <h3 className="text-sm font-extrabold text-slate-800 font-mono flex items-center gap-2">
                <span className="text-indigo-500 font-sans">✓</span> {item.title}
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-normal pl-4">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Right column - Next Up Teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-1 w-full h-full max-h-[340px] bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Preview: Chapter 2
            </span>
            <h3 className="text-xl font-extrabold text-slate-800 leading-snug">
              Variables and the <br />
              <span className="text-indigo-600 font-serif italic">Python Object Model</span>
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold mt-1">
              Now that you understand memory addresses and variables at a hardware level, we'll dive deep into Python's reference model, memory slots, and objects.
            </p>
          </div>

          <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-xl p-4 flex items-center justify-between mt-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-mono font-bold text-indigo-500 uppercase">Up Next</span>
              <span className="text-sm font-extrabold text-slate-800">Module 2 — Variables and Data</span>
            </div>
            <span className="text-xl">👉</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Scene06_Summary;
