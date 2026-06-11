import React, { useState } from 'react';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';
import { VectorCanvas, DotMeter } from '../../components/VectorCanvas';
import { fromAngle, proj2, dot2, mag2, fmt } from '../../components/mathHelpers';

type Vec2 = [number, number];

export const Scene3_8_ShadowProjection: React.FC = () => {
  const [angleA, setAngleA] = useState(65);

  const vecB: Vec2 = [4, 0.8];
  const vecA = fromAngle(angleA, 4);
  const shadow = proj2(vecA, vecB);
  const dotVal = dot2(vecA, vecB);
  const magA = mag2(vecA);
  const magB = mag2(vecB);
  const cosVal = dotVal / (magA * magB || 1);

  return (
    <SlideLayout
      title="The Shadow"
      text="Drop a perpendicular from the tip of A onto the line of B. The green segment — A's shadow — shows how much of A points in B's direction."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Angle of Vector A</span>
              <span className="text-vector text-base">{angleA}°</span>
            </div>
            <input
              type="range" min="0" max="180" step="1" value={angleA}
              onChange={e => setAngleA(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-mono font-bold text-slate-600">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-black mb-2">Shadow formula</div>
            <div className="flex justify-center py-2 border-y border-slate-100">
              <KaTeXMath tex={`\\text{shadow} = |A|\\cos\\theta = ${(magA * cosVal).toFixed(2)}`} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
              <span>|A| = {fmt(magA)}</span>
              <span>cos θ = {fmt(cosVal)}</span>
            </div>
          </div>

          <DotMeter value={dotVal} max={20} />
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'A', vec: vecA,    color: '#E11D48', marker: 'red',    label: 'A' },
            { id: 'B', vec: vecB,    color: '#0284C7', marker: 'blue',   label: 'B (fixed)' },
            { id: 'S', vec: shadow,  color: '#059669', marker: 'green',  label: 'shadow', width: 4 },
          ]}
          lines={[
            { from: vecA, to: shadow, color: '#7C3AED', dashed: true, width: 1.5 },
          ]}
        />
      </div>
    </SlideLayout>
  );
};
