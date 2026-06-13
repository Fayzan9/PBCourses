import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_14_ChapterSummary: React.FC = () => {
  const cards = [
    {
      step: '01',
      title: 'Linear Stretch',
      math: 'W · x',
      desc: 'Weights stretch, shear, and rotate our data. But the origin (0,0) remains permanently anchored.'
    },
    {
      step: '02',
      title: 'Bias Translate',
      math: '+ b',
      desc: 'Adding the bias shifts the origin, allowing coordinate spaces and decision boundaries to move freely.'
    },
    {
      step: '03',
      title: 'Non-Linear Squish',
      math: 'σ(z)',
      desc: 'Activation functions like ReLU fold and bend the coordinate plane, breaking straight lines.'
    },
    {
      step: '04',
      title: 'Deep Stacking',
      math: 'f(g(x))',
      desc: 'Layering multiple warped spaces lets the network untangle highly complex, curved boundaries.'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-6 gap-6">
      
      <div className="text-center">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Chapter 7 Summary</span>
        <h2 className="text-3xl font-black text-slate-800 leading-tight mt-1">Everything You Now Know</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex gap-4"
          >
            <div className="flex flex-col items-center justify-start">
              <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                {card.step}
              </span>
              <span className="text-sm font-mono font-black text-slate-700 mt-2 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                {card.math}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-sm">{card.title}</h3>
              <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full text-center py-3.5 bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-xl text-xs font-mono font-black">
        Next Question: How does the network automatically search for W and b?
      </div>

    </div>
  );
};
