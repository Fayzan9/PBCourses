import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene5_3b_Bridge: React.FC = () => {
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const cards = [
    {
      icon: '🔍',
      q: 'We know matrices transform vectors. So what makes a vector "special"?',
      a: 'A vector is special if the matrix doesn\'t change its direction — only its length. Most vectors wobble and tilt. We\'re hunting for the ones that stay true.',
    },
    {
      icon: '📐',
      q: 'How would you test if a vector keeps its direction?',
      a: 'Apply the matrix to the vector. Then check: did the resulting vector point the same way? If M·v = k·v for some number k, direction is preserved — k just scales it.',
    },
    {
      icon: '🎯',
      q: 'Why does this matter — what\'s the payoff?',
      a: 'If M·v = λ·v, then applying the entire matrix is the same as multiplying by one number λ. That\'s extraordinary — a huge simplification. This is the whole point of eigenvectors.',
    },
  ];

  return (
    <SlideLayout
      title="Before We Test — What Are We Looking For?"
      text="We've seen the intuition. Before we run experiments, let's sharpen the question. Tap each card when you're ready."
    >
      <div className="flex flex-col gap-4 w-full max-w-xl mx-auto py-4">
        {cards.map((c, i) => {
          const open = unlocked.includes(i);
          return (
            <motion.button key={i} onClick={() => setUnlocked(u => open ? u.filter(x => x !== i) : [...u, i])}
              className="w-full text-left rounded-2xl border overflow-hidden transition-all cursor-pointer"
              style={{ borderColor: open ? '#7C3AED' : '#e2e8f0' }}>
              <div className={`px-5 py-4 flex items-center gap-3 ${open ? 'bg-violet-50' : 'bg-white'}`}>
                <span className="text-2xl">{c.icon}</span>
                <div className="flex-1 text-sm font-bold text-slate-700 leading-snug">{c.q}</div>
                <span className="text-slate-400 text-lg">{open ? '▲' : '▼'}</span>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 py-4 bg-violet-50 border-t border-violet-200 text-sm text-slate-600 leading-relaxed">
                      {c.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
        {unlocked.length === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 text-white rounded-2xl px-5 py-4 text-sm font-semibold text-center">
            ✓ Now we know exactly what to look for. Let's run the test.
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};
