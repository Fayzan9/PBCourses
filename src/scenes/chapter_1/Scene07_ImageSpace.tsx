import React from 'react';
import { PixelGrid } from '../../components/PixelGrid';

export const Scene7_ImageSpace: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <PixelGrid />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
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
