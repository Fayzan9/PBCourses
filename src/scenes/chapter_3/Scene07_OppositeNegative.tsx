import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { VectorCanvas, DotMeter } from '../../components/VectorCanvas';
import { dot2, fmt } from '../../components/mathHelpers';

type Vec2 = [number, number];

export const Scene3_7_OppositeNegative: React.FC = () => {
  const [lenB, setLenB] = useState(3.5);
  const vecA: Vec2 = [4, 0];
  const vecB: Vec2 = [-lenB, 0];
  const dotVal = dot2(vecA, vecB);

  return (
    <SlideLayout
      title="Opposition is Negative"
      text="When vectors point in opposite directions, the dot product goes negative. The more they oppose, the more negative the result."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Length of B</span>
              <span className="text-loss">{lenB.toFixed(1)}</span>
            </div>
            <input
              type="range" min="1" max="4.5" step="0.1" value={lenB}
              onChange={e => setLenB(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Calculation</div>
            <div className="flex flex-col gap-1 text-slate-700">
              <span>A = [4, 0],  B = [{fmt(-lenB)}, 0]</span>
              <span className="text-slate-500 text-xs">4 × {fmt(-lenB)} + 0 × 0</span>
              <span className="text-2xl font-black text-rose-500">= {fmt(dotVal)}</span>
            </div>
          </div>

          <DotMeter value={dotVal} max={20} />
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'A', vec: vecA,  color: '#E11D48', marker: 'red',  label: 'A [4, 0]' },
            { id: 'B', vec: vecB, color: '#0284C7', marker: 'blue', label: `B [${fmt(-lenB)}, 0]` },
          ]}
        />
      </div>
    </SlideLayout>
  );
};
