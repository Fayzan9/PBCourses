import React from 'react';
import { Music, ShoppingBag, Languages, User, Image, ArrowRight, MoreHorizontal } from 'lucide-react';

export const Scene05_CombinedSpace: React.FC = () => {
  const rows = [
    {
      icon: <User className="text-blue-500 w-10 h-10 shrink-0" />,
      label: 'Person',
      color: 'text-blue-600',
      bg: 'bg-blue-50/40 border-blue-100',
      attributes: ['Height', 'Weight', 'Age', 'Heart Rate', 'Daily Steps', 'Hours of Sleep'],
      values: [180, 75, 25, 68, 10450, 7.5],
    },
    {
      icon: <Music className="text-violet-500 w-10 h-10 shrink-0" />,
      label: 'Music',
      color: 'text-violet-600',
      bg: 'bg-violet-50/40 border-violet-100',
      attributes: ['Bass', 'Acoustic', 'Energy', 'Tempo', 'Danceability', 'Liveness'],
      values: [85, 20, 95, 128, 72, 15],
    },
    {
      icon: <ShoppingBag className="text-sky-500 w-10 h-10 shrink-0" />,
      label: 'Product',
      color: 'text-sky-600',
      bg: 'bg-sky-50/40 border-sky-100',
      attributes: ['Price', 'Rating', 'Weight', 'Durability', 'Width', 'Height'],
      values: [299, 4.8, 1.2, 90, 15, 30],
    },
    {
      icon: <Image className="text-rose-500 w-10 h-10 shrink-0" />,
      label: 'Image',
      color: 'text-rose-600',
      bg: 'bg-rose-50/40 border-rose-100',
      attributes: ['Pixel (0,0)', 'Pixel (0,1)', 'Pixel (0,2)', 'Red Value', 'Green Value', 'Blue Value'],
      values: [255, 128, 64, 240, 200, 180],
    },
    {
      icon: <Languages className="text-emerald-500 w-10 h-10 shrink-0" />,
      label: 'Language',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/40 border-emerald-100',
      attributes: ['Sentiment', 'Length', 'Complexity', 'Subjectivity', 'Tense', 'Intent'],
      values: [0.85, 14, 0.42, 0.15, 1, 8],
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-6 py-2 overflow-hidden select-none">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Everything Can Become Numbers</h2>
        <p className="text-slate-500 text-sm font-semibold mt-1">
          Whether physical features, sound, commerce, pixel colors, or semantic meaning—AI models represent the world mathematically.
        </p>
      </div>

      {/* Grid Stack showing all concurrently */}
      <div className="flex flex-col gap-3.5 w-full">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5 w-full p-4.5 rounded-2xl border ${row.bg} transition-all duration-300 shadow-sm`}
          >
            {/* 1. Category Concept Label */}
            <div className="flex items-center gap-3 min-w-[130px] md:w-1/5">
              {row.icon}
              <span className={`text-xl font-black ${row.color} tracking-tight`}>
                {row.label}
              </span>
            </div>

            {/* Transition Arrow */}
            <div className="text-slate-300 rotate-90 md:rotate-0">
              <ArrowRight size={18} strokeWidth={2.5} />
            </div>

            {/* 2. Attributes List with ellipsis indicator */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 md:w-1/2">
              {row.attributes.map((attr, aIdx) => (
                <span
                  key={aIdx}
                  className="text-xs font-bold text-slate-600 bg-white border border-slate-100 px-2.5 py-1 rounded-xl shadow-xs"
                >
                  {attr}
                </span>
              ))}
              <div className="flex items-center gap-0.5 px-2 py-0.5 bg-slate-100 rounded-lg text-slate-400" title="Many more dimensions...">
                <MoreHorizontal size={14} className="animate-pulse" />
              </div>
            </div>

            {/* Transition Arrow */}
            <div className="text-slate-300 rotate-90 md:rotate-0">
              <ArrowRight size={18} strokeWidth={2.5} />
            </div>

            {/* 3. Stored Vector Numbers with ellipsis indicator */}
            <div className="flex items-center justify-center md:w-1/4">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-sky-400 px-4 py-2 rounded-xl font-mono text-sm font-black shadow-md tracking-wider glow-vector">
                <span>[{row.values.join(', ')}</span>
                <span className="text-slate-500">, ...</span>
                <span>]</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
