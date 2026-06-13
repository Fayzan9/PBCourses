import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix, MARKER_DEFS } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

const CX = 240, CY = 240, SC = 68;

export const Scene4_6_NonUniformScale: React.FC = () => {
  const [scaleX, setScaleX] = useState(1.2);
  const [scaleY, setScaleY] = useState(0.8);

  const M: Mat2 = [[scaleX, 0], [0, scaleY]];
  const animated = useAnimatedMatrix(M, 80);

  const accentX = '#E11D48'; // Red for X
  const accentY = '#0284C7'; // Blue for Y

  const matCells = [
    { val: scaleX.toFixed(1), active: true, color: accentX, bg: `${accentX}15` },
    { val: '0', active: false, color: '#94a3b8', bg: '#f8fafc' },
    { val: '0', active: false, color: '#94a3b8', bg: '#f8fafc' },
    { val: scaleY.toFixed(1), active: true, color: accentY, bg: `${accentY}15` },
  ];

  return (
    <SlideLayout
      title="Non-Uniform Scaling"
      text="Stretch or compress axes independently. The diagonal of the matrix controls the scale factor for each direction."
      sidebarContent={
        <div className="flex flex-col gap-6">
          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-rose-600">X Scale (Horizontal)</span>
                <span className="text-sm font-black text-rose-600 font-mono">{scaleX.toFixed(1)}x</span>
              </div>
              <input
                type="range" min="0.3" max="2.5" step="0.05" value={scaleX}
                onChange={e => setScaleX(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-sky-600">Y Scale (Vertical)</span>
                <span className="text-sm font-black text-sky-600 font-mono">{scaleY.toFixed(1)}x</span>
              </div>
              <input
                type="range" min="0.3" max="2.5" step="0.05" value={scaleY}
                onChange={e => setScaleY(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          </div>

          {/* Live matrix */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 text-center">Matrix</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-slate-300 text-5xl font-thin self-stretch flex items-center">⌊</span>
              <div className="grid grid-cols-2 gap-1.5">
                {matCells.map((c, i) => (
                  <div key={i}
                    className="w-20 h-14 rounded-xl flex items-center justify-center font-mono text-base font-bold transition-all duration-150"
                    style={{ backgroundColor: c.bg, color: c.color }}>
                    {c.val}
                  </div>
                ))}
              </div>
              <span className="text-slate-300 text-5xl font-thin self-stretch flex items-center">⌋</span>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-3 font-medium">diagonal entries scale respective axes</p>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4 relative">
        <TransformGrid M={animated} />

        {/* In-graph SVG overlay */}
        <svg viewBox="0 0 480 480" className="absolute inset-0 w-full h-full pointer-events-none">
          {MARKER_DEFS}

          {/* Original unit circle — dashed reference */}
          <circle cx={CX} cy={CY} r={SC} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="5 4" />
          
          {/* Ellipse representing the scaled circle */}
          <ellipse 
            cx={CX} 
            cy={CY} 
            rx={Math.max(4, Math.abs(animated[0][0]) * SC)} 
            ry={Math.max(4, Math.abs(animated[1][1]) * SC)} 
            fill="none" 
            stroke="#7C3AED" 
            strokeWidth="2.2" 
            strokeOpacity="0.6" 
          />

          <text x={CX + 7} y={CY - 8} fill="#94a3b8" fontSize="10" fontWeight="600">origin: fixed</text>
        </svg>
      </div>
    </SlideLayout>
  );
};

export default Scene4_6_NonUniformScale;
