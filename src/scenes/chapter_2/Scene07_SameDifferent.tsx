import React from 'react';
import { VisualizationSpace, type VisualPoint, type CustomLine } from '../../components/VisualizationSpace';

// Indie & Blockbuster share the same 3:4 genre ratio — same direction, different scale
const INDIE      = [18, 24];
const BLOCKBUSTER = [72, 96];
const SCIFI      = [85, 15];

const eucDist = (a: number[], b: number[]) =>
  Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));

export const Scene2_7_SameDifferent: React.FC = () => {
  const dBad  = eucDist(INDIE, BLOCKBUSTER);
  const dGood = eucDist(INDIE, SCIFI);

  const points: VisualPoint[] = [
    { id: 'indie',       label: 'Indie',       coords: INDIE,       color: '#E11D48', details: '10 reviews · ratio 3:4' },
    { id: 'blockbuster', label: 'Blockbuster', coords: BLOCKBUSTER, color: '#7C3AED', details: '10k reviews · ratio 3:4' },
    { id: 'scifi',       label: 'Sci-Fi',      coords: SCIFI,       color: '#D97706', details: '5k reviews · action-heavy' },
  ];

  const customLines: CustomLine[] = [
    // Shared direction guide — both Indie & Blockbuster lie on this line
    { from: [0, 0], to: [75, 100], color: '#cbd5e1', dashed: true },
    // The misleading gap: same direction, huge Euclidean distance
    { from: INDIE, to: BLOCKBUSTER, color: '#E11D48', dashed: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      {/* Visualization */}
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
        <VisualizationSpace
          points={points}
          dimensions={['Action Score', 'Comedy Score']}
          ranges={[[0, 100], [0, 100]]}
          showVectors
          customLines={customLines}
        />
      </div>

      {/* Sidebar */}
      <div className="flex-[35] flex flex-col justify-center gap-4 shrink-0 py-2">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-1">
            Same Direction,<br />Different Scale
          </h2>
          <p className="text-slate-500 text-sm">Both vectors point the same way — but Euclidean sees a huge gap.</p>
        </div>

        {/* Bad case */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-black text-rose-600">❌ Same ratio 3:4</span>
          <span className="font-mono font-black text-rose-600 text-xl">d = {dBad.toFixed(0)}</span>
        </div>

        {/* Good case */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-black text-emerald-600">✓ Different direction</span>
          <span className="font-mono font-black text-emerald-600 text-xl">d = {dGood.toFixed(0)}</span>
        </div>

        {/* Fix */}
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-slate-600">
          <span className="font-black text-violet-700">The Fix → </span>Measure the <em>angle</em>, not the gap.
        </div>
      </div>
    </div>
  );
};
