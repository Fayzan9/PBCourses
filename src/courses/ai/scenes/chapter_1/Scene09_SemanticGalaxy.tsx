import React from 'react';
import { GalaxyPlot } from '../../components/GalaxyPlot';


export const Scene9_SemanticGalaxy: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full w-full max-w-7xl mx-auto px-6 py-2 overflow-hidden">
      {/* Galaxy Plot - Taking maximum space */}
      <div className="flex-[75] min-h-0 min-w-0 flex items-stretch">
        <GalaxyPlot />
      </div>

      {/* Description Panel on the Side */}
      <div className="flex-[25] flex flex-col justify-between gap-5 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.25em] text-violet-500 mb-2">
              Semantic Space
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-none mb-3">
              Similar Words Live Nearby
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Words with related meanings naturally cluster together in high-dimensional space.
            </p>
          </div>

          <div className="bg-slate-100 border border-slate-200/60 p-4.5 rounded-2xl text-xs font-semibold text-slate-500 leading-relaxed shadow-sm">
            <span className="font-bold text-slate-700 block mb-1">Interactive Features</span>
            Use the search bar at the top or click on the points directly to inspect their coordinates. Grab and drag to pan the galaxy map, and scroll to zoom.
          </div>
        </div>

        <div className="text-sm text-slate-400 font-medium leading-relaxed border-l-4 border-slate-200 pl-4 py-1">
          Explore the map and notice which words become semantic neighbors.
        </div>
      </div>
    </div>
  );
};

export default Scene9_SemanticGalaxy;