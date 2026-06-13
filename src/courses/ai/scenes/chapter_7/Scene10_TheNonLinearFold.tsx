import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene7_10_TheNonLinearFold: React.FC = () => {
  const [folded, setFolded] = useState(false);

  // SVG grid sizing
  const W = 320, H = 320, CX = W / 2, CY = H / 2, SC = 32;

  // Grid points covering coordinates -4 to 4
  const points: [number, number][] = [];
  for (let x = -3; x <= 3; x += 1) {
    for (let y = -3; y <= 3; y += 1) {
      points.push([x, y]);
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-5xl mx-auto px-6 gap-10">
      
      {/* Left side: Folding grid visual */}
      <div className="w-full md:w-1/2 flex flex-col items-center bg-slate-50 border border-slate-200 rounded-3xl p-6 relative">
        <div className="absolute top-4 left-6 flex flex-col">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">2D Coordinate Space</span>
          <span className="text-sm font-black text-violet-600 font-mono">
            {folded ? 'Folded Space (ReLU)' : 'Linear Space'}
          </span>
        </div>

        <div className="relative w-full aspect-square max-w-[280px] bg-white border border-slate-200 rounded-2xl overflow-hidden mt-6 flex items-center justify-center shadow-sm">
          {/* Axis markers */}
          <div className="absolute w-full h-[2px] bg-slate-100" style={{ top: CY }} />
          <div className="absolute h-full w-[2px] bg-slate-100" style={{ left: CX }} />

          {points.map((pt, i) => {
            // Under ReLU, any coordinate coordinate < 0 is set to 0.
            const targetX = folded ? Math.max(0, pt[0]) : pt[0];
            const targetY = folded ? Math.max(0, pt[1]) : pt[1];

            return (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full absolute shadow-xs ${
                  pt[0] < 0 || pt[1] < 0 ? 'bg-rose-500' : 'bg-indigo-600'
                }`}
                animate={{
                  x: targetX * SC,
                  y: -targetY * SC
                }}
                transition={{ type: 'spring', stiffness: 50, damping: 12 }}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex gap-4 text-xs font-mono font-bold">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
            <span className="text-slate-500">Positive (+, +)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
            <span className="text-slate-500">Has Negatives</span>
          </div>
        </div>
      </div>

      {/* Right side: Story & Controls */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-violet-600 font-extrabold">Geometrical Warp</span>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mt-1 mb-2">The Non-Linear Fold</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            When we apply ReLU to our 2D grid, the entire bottom-left quadrant (where both values are negative) collapses into a single point at the origin (0,0).
          </p>
          <p className="text-slate-600 text-base leading-relaxed mt-2">
            The space isn't just rotated or shifted—it is literally **folded onto itself**. This collapsing action allows neural networks to "turn off" irrelevant features, creating complex boundaries out of simple segments.
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={() => setFolded(!folded)}
          className={`w-full py-4 text-white font-black rounded-2xl text-lg hover:bg-opacity-95 active:scale-95 transition-all shadow-md cursor-pointer ${
            folded ? 'bg-indigo-600' : 'bg-rose-600'
          }`}
        >
          {folded ? 'Unfold Space (Show Linear)' : 'Fold Space with ReLU →'}
        </button>
      </div>

    </div>
  );
};
