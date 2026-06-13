import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix, MARKER_DEFS } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

const CX = 240, CY = 240, SC = 68;

export const Scene4_3_ScaleTransform: React.FC = () => {
  const [scale, setScale] = useState(1.0);
  const M: Mat2 = [[scale, 0], [0, scale]];
  const animated = useAnimatedMatrix(M, 80);

  const animS = animated[0][0];
  const mode = scale < 0.99 ? 'shrink' : scale > 1.01 ? 'grow' : 'identity';
  const accent = mode === 'grow' ? '#E11D48' : mode === 'shrink' ? '#0284C7' : '#10B981';
  const modeLabel = mode === 'grow' ? 'Expanding' : mode === 'shrink' ? 'Shrinking' : 'Identity';
  const circleR = Math.max(4, Math.abs(animS) * SC);

  const matCells = [
    { val: scale.toFixed(1), active: true },
    { val: '0', active: false },
    { val: '0', active: false },
    { val: scale.toFixed(1), active: true },
  ];

  return (
    <SlideLayout
      title="Stretch & Shrink"
      text="Drag the slider — every point's distance from the origin multiplies by the same number."
      sidebarContent={
        <div className="flex flex-col gap-5">
          {/* Big readout */}
          <div className="text-center pt-1">
            <span className="text-6xl font-black tabular-nums" style={{ color: accent }}>
              {scale.toFixed(1)}
            </span>
            <span className="text-3xl font-black text-slate-300 ml-1">×</span>
            <p className="text-[11px] font-black uppercase tracking-widest mt-1" style={{ color: accent }}>
              {modeLabel}
            </p>
          </div>

          {/* Slider */}
          <div>
            <input
              type="range" min="0.3" max="2.5" step="0.05" value={scale}
              onChange={e => setScale(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: accent }}
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
              <span>0.3× shrink</span><span>1× identity</span><span>2.5× grow</span>
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
                    style={c.active
                      ? { backgroundColor: `${accent}20`, color: accent }
                      : { backgroundColor: '#f8fafc', color: '#94a3b8' }}>
                    {c.val}
                  </div>
                ))}
              </div>
              <span className="text-slate-300 text-5xl font-thin self-stretch flex items-center">⌋</span>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">diagonal = scale factor</p>
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
          <text x={CX + SC + 5} y={CY - 5} fill="#94a3b8" fontSize="10" fontWeight="600">r = 1</text>

          {/* Scaled circle — only when different */}
          {Math.abs(animS - 1) > 0.03 && (
            <>
              <circle cx={CX} cy={CY} r={circleR} fill="none" stroke={accent} strokeWidth="2.2" strokeOpacity="0.6" />
              <text x={CX + circleR + 5} y={CY - 5} fill={accent} fontSize="10" fontWeight="700">
                r = {animS.toFixed(2)}
              </text>
            </>
          )}

          {/* Origin fixed label */}
          <text x={CX + 7} y={CY - 8} fill="#94a3b8" fontSize="10" fontWeight="600">origin: fixed</text>
        </svg>

        {/* Mode badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide text-white shadow-sm transition-all"
          style={{ backgroundColor: accent }}
        >
          {modeLabel}
        </div>
      </div>
    </SlideLayout>
  );
};
export default Scene4_3_ScaleTransform;
