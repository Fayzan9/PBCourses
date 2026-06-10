import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { VectorCanvas, DotMeter } from '../../components/VectorCanvas';
import { fromAngle, dot2, mag2, fmt } from '../../components/mathHelpers';

type Vec2 = [number, number];

export const Scene3_11_GrandEquivalence: React.FC = () => {
  const [angleDegA, setAngleDegA] = useState(40);

  const vecA = fromAngle(angleDegA, 4);
  const vecB: Vec2 = [3.5, 1.5];

  const coordResult = dot2(vecA, vecB);
  const magA = mag2(vecA), magB = mag2(vecB);
  const cosVal = coordResult / (magA * magB || 1);
  const trigResult = magA * magB * cosVal;

  return (
    <SlideLayout
      title="Two Paths, One Answer"
      text="Drag the slider and watch both formulas update live. They always give the same result — the coordinate shortcut is just a faster way to compute the same thing."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Angle of Vector A</span>
              <span className="text-similarity text-base">{angleDegA}°</span>
            </div>
            <input
              type="range" min="0" max="180" step="1" value={angleDegA}
              onChange={e => setAngleDegA(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-black">Method 1: Coordinates</span>
              <div className="font-mono text-xs text-slate-700 bg-emerald-50 border border-emerald-100 p-2 rounded-lg">
                {fmt(vecA[0])}×{fmt(vecB[0])} + {fmt(vecA[1])}×{fmt(vecB[1])} = <span className="font-black text-emerald-700">{coordResult.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-600 font-black">Method 2: Shadow</span>
              <div className="font-mono text-xs text-slate-700 bg-violet-50 border border-violet-100 p-2 rounded-lg">
                {fmt(magA)} × {fmt(magB)} × {fmt(cosVal)} = <span className="font-black text-violet-700">{trigResult.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-lg py-2">
              <span className="text-emerald-600 font-black font-mono">{coordResult.toFixed(1)}</span>
              <span className="text-slate-400 font-mono">=</span>
              <span className="text-violet-600 font-black font-mono">{trigResult.toFixed(1)}</span>
              <span className="text-slate-400 text-lg">✓</span>
            </div>
          </div>

          <DotMeter value={coordResult} max={20} />
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'B', vec: vecB, color: '#0284C7', marker: 'blue', label: `B [${fmt(vecB[0])}, ${fmt(vecB[1])}]` },
            { id: 'A', vec: vecA, color: '#E11D48', marker: 'red',  label: `A [${fmt(vecA[0])}, ${fmt(vecA[1])}]` },
          ]}
        />
      </div>
    </SlideLayout>
  );
};
export default Scene3_11_GrandEquivalence;
