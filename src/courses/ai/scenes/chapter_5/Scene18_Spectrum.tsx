import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene5_18_Spectrum: React.FC = () => {
  const [active, setActive] = useState(0);

  const examples = [
    {
      title: 'Large λ → Important direction',
      body: 'In image compression (PCA on pixels), eigenvectors with large λ capture the most visual information. Keep the top 50 and you can reconstruct the image with ~90% accuracy.',
      icon: '🖼️',
      eigenvals: [8.2, 3.1, 0.9, 0.3, 0.05],
      color: '#059669',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      title: 'Small λ → Noise direction',
      body: 'Small eigenvalues capture noise, not signal. Dropping them is like denoising — you lose almost no real information but shed random variation.',
      icon: '🔇',
      eigenvals: [8.2, 3.1, 0.9, 0.3, 0.05],
      color: '#D97706',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      title: 'λ = 0 → Collapsed direction',
      body: 'Zero eigenvalue means the transformation collapses that entire dimension — all vectors in that direction get squished to the origin. Information is permanently lost.',
      icon: '💀',
      eigenvals: [5.0, 2.0, 0.0, 0.0, 0.0],
      color: '#E11D48',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
    },
  ];

  const ex = examples[active];
  const maxVal = Math.max(...ex.eigenvals);

  return (
    <SlideLayout
      title="The Eigenvalue Spectrum"
      text="Eigenvalues have magnitudes. Big ones = important directions. Small ones = noise. Zero = destruction. This is how PCA picks what to keep."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {examples.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                i === active ? `${e.bg} ${e.border}` : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              style={i === active ? { color: e.color } : {}}
            >
              {e.icon} {e.title}
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
          className="flex flex-col gap-6 w-full max-w-lg mx-auto p-6"
        >
          <div className="text-5xl text-center">{ex.icon}</div>
          <p className="text-slate-600 text-base font-medium text-center leading-relaxed">{ex.body}</p>
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Eigenvalue magnitudes</div>
            {ex.eigenvals.map((val, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 w-12">λ{i + 1} = {val}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(val / maxVal) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: val === 0 ? '#fca5a5' : ex.color }}
                  />
                </div>
                {val === 0 && <span className="text-[10px] text-rose-500 font-bold">💀 lost</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </SlideLayout>
  );
};
