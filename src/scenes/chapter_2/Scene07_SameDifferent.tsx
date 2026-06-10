import React from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { PlotCanvas } from '../../components/PlotCanvas';

export const Scene2_7_SameDifferent: React.FC = () => {
  const indieX = 18, indieY = 24;
  const blockX = 72, blockY = 96;
  const eucDist = Math.sqrt(Math.pow(blockX - indieX, 2) + Math.pow(blockY - indieY, 2));

  return (
    <SlideLayout
      title="Same Direction, Different Scale"
      text="Both movies point in the same direction from the origin — same genre ratio. But Euclidean distance says they're far apart, just because one is bigger."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider font-black text-rose-700">The Problem</span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Euclidean distance between them is <span className="font-black text-rose-600">{eucDist.toFixed(0)}</span> — suggesting they're very different. But they have the exact same genre ratio!
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2 font-mono text-xs text-slate-700">
            <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-1">Genre Ratio</div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span>Indie: [{indieX}, {indieY}] → ratio 3:4</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-violet-500 inline-block" />
              <span>Block: [{blockX}, {blockY}] → ratio 3:4</span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-emerald-700 block mb-1">The Fix</span>
            We need a metric that measures the <em>angle</em> between vectors, ignoring their length. That's cosine similarity.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <PlotCanvas
          points={[
            { id: 'o',  x: 0,       y: 0,       color: '#0f172a', radius: 5, label: 'Origin' },
            { id: 'in', x: indieX,  y: indieY,  color: '#E11D48', label: 'Indie (10 reviews)', radius: 7 },
            { id: 'bl', x: blockX,  y: blockY,  color: '#7C3AED', label: 'Blockbuster (10k)', radius: 7 },
          ]}
          lines={[
            { x1: 0, y1: 0, x2: blockX + 5, y2: (blockX + 5) * (blockY / blockX), color: '#94a3b8', dashed: true, width: 1 },
            { x1: 0, y1: 0, x2: indieX, y2: indieY, color: '#E11D48', width: 2, marker: true },
            { x1: 0, y1: 0, x2: blockX, y2: blockY, color: '#7C3AED', width: 2, marker: true },
            { x1: indieX, y1: indieY, x2: blockX, y2: blockY, color: '#059669', dashed: true, width: 1.5 },
          ]}
          xLabel="Action Score"
          yLabel="Comedy Score"
        />
      </div>
    </SlideLayout>
  );
};
