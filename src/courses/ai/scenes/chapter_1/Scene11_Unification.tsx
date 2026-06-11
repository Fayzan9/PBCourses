import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Film, Music, Smartphone, Sparkles } from 'lucide-react';

export const Scene11_Unification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'person' | 'movie' | 'song' | 'image' | 'sentence'>('person');

  const tabs = [
    { id: 'person', label: 'Person', icon: <User size={14} />, coords: '[180, 75, 25]', desc: 'Height, Weight, Age measurements' },
    { id: 'movie', label: 'Movie', icon: <Film size={14} />, coords: '[90, 10, 60]', desc: 'Action, Comedy, Romance scores' },
    { id: 'song', label: 'Song', icon: <Music size={14} />, coords: '[95, 10, 85]', desc: 'Energy, Danceability, Acousticness' },
    { id: 'image', label: 'Image', icon: <Smartphone size={14} />, coords: '[0.1, 0.9, 0.2, ...]', desc: 'Flattened raw grid of pixel intensities' },
    { id: 'sentence', label: 'Sentence', icon: <Sparkles size={14} />, coords: '[0.81, -0.4, 0.52, ...]', desc: 'Calculated semantics embeddings' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((curr) => {
        const idx = tabs.findIndex((t) => t.id === curr);
        return tabs[(idx + 1) % tabs.length].id as any;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-[65] min-h-0 min-w-0 bg-white/40 border border-slate-200/50 rounded-3xl p-8 flex flex-col gap-6 relative justify-center items-center shadow-inner overflow-hidden">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => {
            if (tab.id !== activeTab) return null;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center gap-4 w-full"
              >
                <div className="p-4 bg-slate-50 rounded-full text-vector glow-vector border border-slate-200">
                  {tab.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 capitalize">{tab.label}</h3>
                <p className="text-slate-500 text-xs max-w-xs font-semibold">{tab.desc}</p>
                <div className="text-center font-mono text-[#7C3AED] bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-xl font-extrabold shadow-inner">
                  {tab.coords}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">The Great Unification</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Images, audio, words, and objects all translate into numbers.
        </p>
        <p className="text-vector text-lg md:text-xl font-extrabold leading-relaxed">
          AI speaks a single language: coordinates in space.
        </p>
      </div>
    </div>
  );
};
