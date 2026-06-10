import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { VectorCanvas, DotMeter } from '../../components/VectorCanvas';
import { fromAngle, dot2, angleDeg } from '../../components/mathHelpers';

type Vec2 = [number, number];

export const Scene3_4_AngleExplorer: React.FC = () => {
  const [angleDegA, setAngleDegA] = useState(30);

  const vecB: Vec2 = [4, 0];
  const vecA = fromAngle(angleDegA, 4);
  const dotVal = dot2(vecA, vecB);
  const theta = angleDeg(vecA, vecB);

  return (
    <SlideLayout
      title="Rotate and Observe"
      text="Vector B stays fixed. Drag the slider to rotate Vector A. Watch how the dot product changes as the angle changes."
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
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0° (aligned)</span><span>90°</span><span>180° (opposite)</span>
            </div>
          </div>

          <DotMeter value={dotVal} max={18} />

          <div className={`p-3 rounded-xl border text-xs font-medium text-slate-600 leading-relaxed transition-all ${
            theta < 45 ? 'bg-emerald-50 border-emerald-200' :
            theta > 135 ? 'bg-rose-50 border-rose-200' :
            'bg-slate-50 border-slate-200'
          }`}>
            {theta < 10  ? '🟢 Nearly perfectly aligned — maximum positive agreement.' :
             theta < 45  ? '🟢 Mostly aligned — strong positive agreement.' :
             theta < 88  ? '🟡 Pulling apart — shrinking agreement.' :
             theta < 92  ? '⚪ Exactly perpendicular — zero agreement.' :
             theta < 135 ? '🔴 Starting to oppose — negative agreement.' :
                           '🔴 Nearly opposite — maximum disagreement.'}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'B', vec: vecB, color: '#0284C7', marker: 'blue', label: `B [4, 0]` },
            { id: 'A', vec: vecA, color: '#E11D48', marker: 'red',  label: `A` },
          ]}
        />
      </div>
    </SlideLayout>
  );
};
export default Scene3_4_AngleExplorer;
