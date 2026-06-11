import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix, MARKER_DEFS } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

const CX = 240, CY = 240, SC = 68;

export const Scene4_7_ShearTransform: React.FC = () => {
  const [shear, setShear] = useState(0.0);
  const M: Mat2 = [[1, shear], [0, 1]];
  const animated = useAnimatedMatrix(M, 80);

  const animK = animated[0][1];
  const direction = shear > 0.05 ? 'Right lean' : shear < -0.05 ? 'Left lean' : 'No lean';
  const accent = '#D97706';

  // In the ORIGINAL space, the unit square corners and their transforms:
  // (0,0) → (0,0)   (1,0) → (1,0)
  // (0,1) → (k,1)   (1,1) → (1+k,1)
  // Original square in SVG:
  const origSquare = [
    [CX, CY], [CX + SC, CY], [CX + SC, CY - SC], [CX, CY - SC],
  ].map(([x, y]) => `${x},${y}`).join(' ');

  // Transformed unit square using animated k:
  const xfmSquare = [
    [CX, CY],
    [CX + SC, CY],
    [CX + SC + animK * SC, CY - SC],
    [CX + animK * SC, CY - SC],
  ].map(([x, y]) => `${x},${y}`).join(' ');

  const matCells = [
    { val: '1', active: false },
    { val: shear.toFixed(2), active: true },
    { val: '0', active: false },
    { val: '1', active: false },
  ];

  return (
    <SlideLayout
      title="The Italic Effect"
      text="Rows shift sideways proportionally to their height — the bottom stays fixed while the top tilts."
      sidebarContent={
        <div className="flex flex-col gap-5">
          {/* Big readout */}
          <div className="text-center pt-1">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-2xl font-black text-slate-400">k =</span>
              <span className="text-5xl font-black tabular-nums" style={{ color: accent }}>
                {shear.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest mt-1" style={{ color: accent }}>
              {direction}
            </p>
          </div>

          {/* Slider */}
          <div>
            <input
              type="range" min="-1.5" max="1.5" step="0.05" value={shear}
              onChange={e => setShear(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: accent }}
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
              <span>← −1.5</span><span>0</span><span>+1.5 →</span>
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
                    className="w-14 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold transition-all duration-100"
                    style={c.active
                      ? { backgroundColor: '#fef3c7', color: '#D97706' }
                      : { backgroundColor: '#f8fafc', color: '#94a3b8' }}>
                    {c.val}
                  </div>
                ))}
              </div>
              <span className="text-slate-300 text-3xl font-thin self-stretch flex items-center">⌋</span>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">one slot drives the tilt</p>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4 relative">
        <TransformGrid M={animated} />

        {/* In-graph SVG overlay */}
        <svg viewBox="0 0 480 480" className="absolute inset-0 w-full h-full pointer-events-none">
          {MARKER_DEFS}

          {/* Original unit square — dashed ghost */}
          <polygon points={origSquare}
            fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="5 4" />

          {/* Transformed unit square — highlighted */}
          {Math.abs(animK) > 0.02 && (
            <polygon points={xfmSquare}
              fill={`${accent}12`} stroke={accent} strokeWidth="2" strokeOpacity="0.7" />
          )}

          {/* "x-axis stays flat" label */}
          <text x={CX - 72} y={CY - 10} fill="#94a3b8" fontSize="10" fontWeight="600">
            x-axis: stays flat
          </text>

          {/* Shift amount labels at y=1 and y=2 */}
          {Math.abs(animK) > 0.08 && (
            <>
              {/* y=1 shift */}
              <line
                x1={CX} y1={CY - SC}
                x2={CX + animK * SC} y2={CY - SC}
                stroke={accent} strokeWidth="1.8" strokeDasharray="4 3"
              />
              <text
                x={CX + animK * SC / 2} y={CY - SC - 7}
                fill={accent} fontSize="10" fontWeight="700" textAnchor="middle"
              >
                {animK > 0 ? '+' : ''}{animK.toFixed(2)}
              </text>

              {/* y=2 shift */}
              <line
                x1={CX} y1={CY - 2 * SC}
                x2={CX + 2 * animK * SC} y2={CY - 2 * SC}
                stroke={accent} strokeWidth="1.8" strokeDasharray="4 3"
              />
              <text
                x={CX + animK * SC} y={CY - 2 * SC - 7}
                fill={accent} fontSize="10" fontWeight="700" textAnchor="middle"
              >
                {(2 * animK) > 0 ? '+' : ''}{(2 * animK).toFixed(2)}
              </text>
            </>
          )}
        </svg>

        {/* k value badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-black text-white shadow-sm tabular-nums"
          style={{ backgroundColor: accent }}
        >
          k = {shear.toFixed(2)}
        </div>
      </div>
    </SlideLayout>
  );
};
export default Scene4_7_ShearTransform;
