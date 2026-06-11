import React from 'react';
import { Smartphone, Laptop, Camera, Headphones } from 'lucide-react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';

export const Scene6_ProductSpace: React.FC = () => {
  const points: VisualPoint[] = [
    { id: 'phone',      label: 'Smartphone', coords: [8,  7.5], color: '#0284C7', details: 'Portable, lightweight, high daily usage',          icon: <Smartphone size={12} /> },
    { id: 'laptop',     label: 'Laptop',     coords: [15, 9.5], color: '#7C3AED', details: 'Workhorse computer, moderate weight, top performance', icon: <Laptop     size={12} /> },
    { id: 'camera',     label: 'Pro Camera', coords: [18, 8.0], color: '#E11D48', details: 'Dedicated optics device',                              icon: <Camera     size={12} /> },
    { id: 'headphones', label: 'Headphones', coords: [3,  5.5], color: '#D97706', details: 'Compact personal audio device',                         icon: <Headphones size={12} /> }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
        <VisualizationSpace
          points={points}
          dimensions={['Price ($ x100)', 'Performance Score']}
          ranges={[[0, 22], [4, 11]]}
          showGrid
        />
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Product Space</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          By scoring items on attributes like Price and Performance, e-commerce engines recommend alternates based on geometric proximity.
        </p>
      </div>
    </div>
  );
};
