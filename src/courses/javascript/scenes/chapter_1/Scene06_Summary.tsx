import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene06_Summary: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(0);

  const summaries = [
    {
      title: 'What Is Programming?',
      icon: '🤖',
      content: 'Programming is giving a computer a sequence of exact instructions to complete a task. Computers are fast but not smart; they only do exactly what you tell them.'
    },
    {
      title: 'How Programs Execute',
      icon: '⚙️',
      content: 'The CPU runs instructions in a continuous loop: Fetch (get instruction), Decode (understand it), and Execute (perform the action, like math or moving data).'
    },
    {
      title: 'Variables and Memory',
      icon: '📦',
      content: 'A variable is a named container in the computer’s RAM used to store data (like strings, numbers, or booleans) so it can be updated and retrieved later.'
    },
    {
      title: 'The IPO Model',
      icon: '🔄',
      content: 'Software fundamentally follows the Input -> Processing -> Output model. Data comes in, the computer applies logic to modify it, and returns a result.'
    },
    {
      title: 'First JavaScript',
      icon: '💻',
      content: 'We wrote our first code using console.log("Hello, World!"). This is a built-in JavaScript function used to output messages to the terminal or console.'
    }
  ];

  return (
    <SceneLayout gap="gap-6">
      {/* Header */}
      <div className="text-center mt-4">
        <span className="text-sm font-mono uppercase tracking-widest text-yellow-600 font-extrabold">
          Chapter 1 · Conclusion
        </span>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-2 leading-[1.1]">
          Chapter{' '}
          <span className="text-yellow-600 font-serif italic">Summary</span>
        </h2>
        <p className="text-slate-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
          Congratulations! You've learned the foundational concepts of how computers process information. Review the key takeaways below before moving to Chapter 2.
        </p>
      </div>

      {/* Interactive Summary Cards */}
      <div className="flex-1 flex items-center justify-center min-h-0 mt-4">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-4 h-full md:h-80">
          {summaries.map((item, index) => {
            const isActive = activeCard === index;
            return (
              <motion.div
                key={index}
                layout
                onClick={() => setActiveCard(index)}
                className={`relative rounded-2xl cursor-pointer overflow-hidden flex flex-col border-2 transition-colors ${
                  isActive 
                    ? 'md:col-span-3 bg-yellow-50 border-yellow-400 shadow-lg' 
                    : 'md:col-span-1 bg-white border-slate-200 hover:border-yellow-300 shadow-sm'
                }`}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Icon Header */}
                <div className={`p-4 flex items-center gap-3 ${isActive ? 'border-b border-yellow-200/50 bg-white/50' : ''}`}>
                   <span className="text-3xl">{item.icon}</span>
                   {isActive && (
                     <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
                   )}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-4 flex flex-col justify-center">
                  {!isActive ? (
                    <h3 className="font-bold text-slate-600 text-sm text-center md:text-left leading-tight">
                      {item.title}
                    </h3>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-slate-700 leading-relaxed">
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Number Indicator */}
                <div className={`absolute bottom-3 right-3 text-5xl font-black opacity-10 ${isActive ? 'text-yellow-900' : 'text-slate-900'}`}>
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center pb-8 mt-6">
         <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2">
           Complete Chapter 1 <span className="text-yellow-400">★</span>
         </button>
      </div>

    </SceneLayout>
  );
};

export default Scene06_Summary;