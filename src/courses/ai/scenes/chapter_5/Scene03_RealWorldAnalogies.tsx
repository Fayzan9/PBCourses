import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene5_3_RealWorldAnalogies: React.FC = () => {
  const [active, setActive] = useState(0);

  const analogies = [
    {
      emoji: '🌊',
      title: 'Ocean Current',
      short: 'Water flows mostly east. Any debris dropped in will drift east regardless of starting angle — east is the eigenvector.',
      color: '#0284C7',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      textColor: 'text-sky-700',
    },
    {
      emoji: '📸',
      title: 'Camera Zoom',
      short: 'Zooming in doubles every coordinate. The vector pointing at the Eiffel Tower still points at the Eiffel Tower — it just gets twice as long.',
      color: '#7C3AED',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      textColor: 'text-violet-700',
    },
    {
      emoji: '🏋️',
      title: 'PCA in Machine Learning',
      short: 'Thousands of features in a dataset. PCA finds the directions of maximum spread — those are the eigenvectors of the covariance matrix.',
      color: '#059669',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      textColor: 'text-emerald-700',
    },
    {
      emoji: '🌐',
      title: 'Google PageRank',
      short: "The web is a giant link matrix. The most important page is the eigenvector of that matrix — the direction the internet 'points to' most.",
      color: '#E11D48',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      textColor: 'text-rose-700',
    },
  ];

  const a = analogies[active];

  return (
    <SlideLayout
      title="Eigenvectors Are Everywhere"
      text="Before the equations, let's see why anyone cares. These show up at the heart of Google, Instagram filters, and modern AI."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {analogies.map((an, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                i === active
                  ? `${an.bg} ${an.border}`
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              style={i === active ? { color: an.color } : {}}
            >
              {an.emoji} {an.title}
            </button>
          ))}
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className={`flex flex-col items-center justify-center gap-6 p-8 rounded-3xl ${a.bg} border ${a.border} w-full h-full max-w-lg mx-auto`}
        >
          <div className="text-7xl">{a.emoji}</div>
          <h3 className="text-2xl font-black" style={{ color: a.color }}>{a.title}</h3>
          <p className="text-slate-600 text-lg font-medium text-center leading-relaxed">{a.short}</p>
          <div className={`px-4 py-2 rounded-full text-xs font-bold border ${a.bg} ${a.border} ${a.textColor}`}>
            eigenvector in the wild
          </div>
        </motion.div>
      </AnimatePresence>
    </SlideLayout>
  );
};
