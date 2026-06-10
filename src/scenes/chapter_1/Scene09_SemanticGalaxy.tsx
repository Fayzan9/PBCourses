import React from 'react';
import { GalaxyPlot } from '../../components/GalaxyPlot';

export const Scene9_SemanticGalaxy: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-2 px-4 max-w-6xl mx-auto gap-5 text-center">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">The Semantic Galaxy</h2>
        <p className="text-slate-500 text-sm font-semibold">
          An immersive playground mapping hundreds of words. Click or search to explore.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <GalaxyPlot />
      </div>
    </div>
  );
};
