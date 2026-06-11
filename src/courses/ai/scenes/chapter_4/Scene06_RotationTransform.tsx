import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix, MARKER_DEFS } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

const CX = 240, CY = 240, SC = 68;
const ARC_R = 44; // radius of the angle arc in SVG units

export const Scene4_6_RotationTransform: React.FC = () => {
  const [deg, setDeg] = useState(0);
  const rad = (deg * Math.PI) / 180;
  const M: Mat2 = [
    [Math.cos(rad), -Math.sin(rad)],
    [Math.sin(rad),  Math.cos(rad)],
  ];
  const animated = useAnimatedMatrix(M, 80);

  // Angle arc endpoints (SVG coords — y-axis is flipped vs math)
  const arcEndX = CX + ARC_R * Math.cos(rad);
  const arcEndY = CY - ARC_R * Math.sin(rad);
  const largeArc = Math.abs(deg) % 360 > 180 ? 1 : 0;
  // CCW in SVG (sweep=0) matches positive math rotation; CW (sweep=1) for negative
  const sweepFlag = deg >= 0 ? 0 : 1;

  // θ label at arc midpoint
  const midRad = rad / 2;
  const labelR = ARC_R + 18;
  const labelX = CX + labelR * Math.cos(midRad);
  const labelY = CY - labelR * Math.sin(midRad) + 4;

  const quadrant =
    deg === 0   ? 'No rotation' :
    deg <= 90   ? 'First quarter' :
    deg <= 180  ? 'Half turn' :
    deg <= 270  ? 'Three quarters' :
                  'Full circle';

  const matCells = [
    { val: Math.cos(rad).toFixed(2), active: true },
    { val: (-Math.sin(rad)).toFixed(2), active: true },
    { val: Math.sin(rad).toFixed(2), active: true },
    { val: Math.cos(rad).toFixed(2), active: true },
  ];

  return (
    <SlideLayout
      title="Spinning Space"
      text="Every point sweeps the same angle around the origin. Distance from the center never changes."
      sidebarContent={
        <div className="flex flex-col gap-5">
          {/* Big angle readout */}
          <div className="text-center pt-1">
            <span className="text-6xl font-black tabular-nums text-violet-600">
              {deg}
            </span>
            <span className="text-3xl font-black text-slate-300 ml-1">°</span>
            <p className="text-[11px] font-black uppercase tracking-widest text-violet-400 mt-1">
              {quadrant}
            </p>
          </div>

          {/* Slider */}
          <div>
            <input
              type="range" min="0" max="360" step="1" value={deg}
              onChange={e => setDeg(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
              <span>0°</span><span>90°</span><span>180°</span><span>270°</span><span>360°</span>
            </div>
          </div>

          {/* Live matrix */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 text-center">Matrix</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-slate-300 text-3xl font-thin self-stretch flex items-center">⌊</span>
              <div className="grid grid-cols-2 gap-1.5">
                {matCells.map((c, i) => (
                  <div key={i}
                    className="w-14 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all duration-100"
                    style={{ backgroundColor: '#ede9fe', color: '#7c3aed' }}>
                    {c.val}
                  </div>
                ))}
              </div>
              <span className="text-slate-300 text-3xl font-thin self-stretch flex items-center">⌋</span>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">all 4 slots encode the angle</p>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4 relative">
        <TransformGrid M={animated} />

        {/* In-graph SVG overlay */}
        <svg viewBox="0 0 480 480" className="absolute inset-0 w-full h-full pointer-events-none">
          {MARKER_DEFS}

          {/* Dashed unit circle — illustrates "distances preserved" */}
          <circle cx={CX} cy={CY} r={SC} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="5 4" />
          <text x={CX + SC + 5} y={CY + 14} fill="#94a3b8" fontSize="10" fontWeight="600">
            distances preserved
          </text>

          {/* Angle arc */}
          {Math.abs(deg) > 1 && deg !== 360 && (
            <>
              <path
                d={`M ${CX + ARC_R} ${CY} A ${ARC_R} ${ARC_R} 0 ${largeArc} ${sweepFlag} ${arcEndX} ${arcEndY}`}
                fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round"
              />
              {/* θ label */}
              <text x={labelX} y={labelY} fill="#7C3AED" fontSize="13" fontWeight="800" textAnchor="middle">
                θ
              </text>
            </>
          )}

          {/* Full circle indicator at 360 */}
          {deg === 360 && (
            <circle cx={CX} cy={CY} r={ARC_R} fill="none" stroke="#7C3AED" strokeWidth="2.5" />
          )}

          {/* Origin dot label — bottom-left of origin to avoid arc overlap */}
          <text x={CX - 80} y={CY + 22} fill="#94a3b8" fontSize="10" fontWeight="600">origin: fixed</text>
        </svg>

        {/* Angle badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-black text-white bg-violet-600 shadow-sm tabular-nums">
          {deg}°
        </div>
      </div>
    </SlideLayout>
  );
};
export default Scene4_6_RotationTransform;
