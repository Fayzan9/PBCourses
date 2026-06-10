import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';

const GENRES = ['Action', 'Romance', 'Comedy', 'Sci-Fi', 'Drama', 'Horror', 'Mystery', 'Music', 'Adventure', 'Crime'];
const HIDDEN = ['Excitement', 'Emotional Depth'];

const GENRE_COLORS = [
  '#E11D48', '#D97706', '#059669', '#0891B2', '#7C3AED',
  '#F59E0B', '#6366F1', '#10B981', '#0284C7', '#DC2626',
];

const HIDDEN_COLORS = ['#0891B2', '#7C3AED'];

// Approximate how much of each hidden dim explains each genre
const LOADINGS: [number, number][] = [
  [0.9, 0.1],  // Action
  [0.1, 0.9],  // Romance
  [0.5, 0.5],  // Comedy
  [0.8, 0.2],  // Sci-Fi
  [0.2, 0.8],  // Drama
  [0.7, 0.2],  // Horror
  [0.4, 0.6],  // Mystery
  [0.3, 0.5],  // Music
  [0.8, 0.3],  // Adventure
  [0.5, 0.4],  // Crime
];

export const Scene6_13_NetflixAnalogy: React.FC = () => {
  const [phase, setPhase] = useState<'genres' | 'svd' | 'hidden'>('genres');

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-4 py-4">
          <AnimatePresence mode="wait">
            {phase === 'genres' && (
              <motion.div
                key="genres"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-3 w-full"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">10 Movie Dimensions</p>
                <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                  {GENRES.map((g, i) => (
                    <div key={g} className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-white" style={{ borderColor: GENRE_COLORS[i] + '44' }}>
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: GENRE_COLORS[i] }} />
                      <span className="text-xs font-bold text-slate-600">{g}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'svd' && (
              <motion.div
                key="svd"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-600 font-bold">SVD Applied</p>
                <div className="flex items-center gap-3">
                  {GENRES.map((_, i) => {
                    const [e, d] = LOADINGS[i];
                    return (
                      <div key={i} className="flex flex-col gap-1 items-center">
                        <div className="w-5 rounded-t-sm" style={{ height: `${e * 60}px`, backgroundColor: HIDDEN_COLORS[0], opacity: 0.9 }} />
                        <div className="w-5 rounded-t-sm" style={{ height: `${d * 60}px`, backgroundColor: HIDDEN_COLORS[1], opacity: 0.7 }} />
                        <p className="text-[9px] text-slate-400 font-bold w-10 text-center leading-tight">{GENRES[i].slice(0,4)}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: HIDDEN_COLORS[0] }} />Excitement</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: HIDDEN_COLORS[1] }} />Emotional Depth</span>
                </div>
              </motion.div>
            )}

            {phase === 'hidden' && (
              <motion.div
                key="hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-5 w-full max-w-sm"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-600 font-bold">2 Hidden Dimensions</p>
                {HIDDEN.map((h, i) => (
                  <div key={h} className="w-full rounded-2xl p-5 border-2 text-center" style={{ borderColor: HIDDEN_COLORS[i] + '55', backgroundColor: HIDDEN_COLORS[i] + '0D' }}>
                    <p className="font-black text-2xl" style={{ color: HIDDEN_COLORS[i] }}>{h}</p>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                      σ{i+1} = {i === 0 ? '95.3' : '72.1'}
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      Explains {i === 0 ? '~65%' : '~28%'} of all variation
                    </p>
                  </div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-800 text-white rounded-xl px-5 py-3 text-center text-sm"
                >
                  <span className="text-cyan-400 font-black">Combined: ~93% of all variation</span><br />
                  <span className="text-slate-300">The other 8 dimensions contribute almost nothing.</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
            The Netflix Insight
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            You track 10 movie genres. SVD discovers almost all variation is explained by just 2 hidden dimensions.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { phase: 'genres', label: '10 genres', icon: '🎬', desc: '10 dimensions, all measured' },
            { phase: 'svd', label: 'Apply SVD', icon: '⚡', desc: 'Decompose into singular vectors' },
            { phase: 'hidden', label: 'Hidden structure', icon: '✨', desc: 'Only 2 dimensions matter' },
          ].map(item => (
            <button
              key={item.phase}
              onClick={() => setPhase(item.phase as typeof phase)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left border transition-all cursor-pointer ${
                phase === item.phase ? 'bg-cyan-50 border-cyan-300' : 'bg-white border-slate-200 hover:border-cyan-200'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className={`font-black text-sm ${phase === item.phase ? 'text-cyan-700' : 'text-slate-700'}`}>{item.label}</p>
                <p className="text-slate-400 text-xs font-medium">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-amber-800 font-black text-base">SVD found the hidden structure.</p>
          <p className="text-amber-700 text-sm font-medium mt-1">
            Not "Action" and "Comedy" — those are surface labels.<br />
            The real axes are <strong>Excitement</strong> and <strong>Emotional Depth.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
