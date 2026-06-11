import React from 'react';
import { GalaxyPlot } from '../../components/GalaxyPlot';

export const Scene9_SemanticGalaxy: React.FC = () => {
  return (
    <div className="flex flex-col h-full py-2 px-4 max-w-6xl mx-auto gap-3">
      <div className="text-center shrink-0">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">The Semantic Galaxy</h2>
        <p className="text-slate-500 text-sm font-semibold">
          An immersive playground mapping hundreds of words. Click or search to explore.
        </p>
      </div>

      <div className="flex-1 min-h-0 w-full">
        <GalaxyPlot />
      </div>
    </div>
  );
};
