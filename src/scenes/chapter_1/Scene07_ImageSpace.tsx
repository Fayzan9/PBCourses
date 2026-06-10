import React from 'react';
import { PixelGrid } from '../../components/PixelGrid';

export const Scene7_ImageSpace: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
        <PixelGrid />
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Images are Points</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          An image is a grid of numbers representing pixel colors.
        </p>
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-mono leading-relaxed font-semibold">
          Flattening this grid maps the entire image to a single point in a higher-dimensional space.
        </div>
      </div>
    </div>
  );
};
