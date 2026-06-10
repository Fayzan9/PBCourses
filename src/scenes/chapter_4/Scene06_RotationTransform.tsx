import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

export const Scene4_6_RotationTransform: React.FC = () => {
  const [deg, setDeg] = useState(0);
  const rad = (deg * Math.PI) / 180;
  const M: Mat2 = [
    [Math.cos(rad), -Math.sin(rad)],
    [Math.sin(rad),  Math.cos(rad)],
  ];
  const animated = useAnimatedMatrix(M, 80);

  return (
    <SlideLayout
      title="Spinning Space"
      text="Rotation sweeps every point around the origin by the same angle. The distance from the center never changes — only the direction."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Rotation angle</span>
              <span className="text-vector text-base">{deg}°</span>
            </div>
            <input
              type="range" min="0" max="360" step="1" value={deg}
              onChange={e => setDeg(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0°</span><span>180°</span><span>360°</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 leading-relaxed">
            <div className="font-bold text-slate-700 mb-1">Real-world feel</div>
            {deg === 0 ? '— No rotation yet' :
             deg <= 45 ? '↻ A gentle tilt, like a slightly crooked photo' :
             deg <= 90 ? '↻ 90° — like rotating your phone sideways' :
             deg <= 180 ? '↻ Halfway around — everything is upside down' :
             '↻ More than halfway — almost back to the start'}
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-xs font-medium text-slate-600 leading-relaxed">
            <span className="font-bold text-sky-700 block mb-1">Key insight</span>
            Every point stays the same distance from the center. Only the angle changes.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};
export default Scene4_6_RotationTransform;
