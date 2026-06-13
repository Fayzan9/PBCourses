import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';
import { Math as KaTeXMath } from '../../components/Math';
import { type Mat2, mulMV, fmt } from '../../components/mathHelpers';

const CX = 240, CY = 240, SC = 68;

export const Scene4_8_ColumnDestinations: React.FC = () => {
  // Column 1 destination (red vector): [x1, y1]
  const [colX, setColX] = useState<[number, number]>([1.2, 0.5]);
  // Column 2 destination (blue vector): [x2, y2]
  const [colY, setColY] = useState<[number, number]>([-0.5, 1.2]);

  const containerRef = useRef<SVGSVGElement | null>(null);

  const M: Mat2 = [
    [colX[0], colY[0]],
    [colX[1], colY[1]],
  ];

  // Helper to handle dragging
  const handleDrag = (e: React.PointerEvent<SVGCircleElement>, vectorType: 'x' | 'y') => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.setPointerCapture(e.pointerId);

    const onPointerMove = (moveEvent: PointerEvent) => {
      // Calculate coordinates relative to grid center CX, CY
      const clientX = moveEvent.clientX - rect.left;
      const clientY = moveEvent.clientY - rect.top;

      // Scale to grid units
      const gridX = Math.min(2.5, Math.max(-2.5, (clientX - CX) / SC));
      // In SVG, y-axis is inverted
      const gridY = Math.min(2.5, Math.max(-2.5, -(clientY - CY) / SC));

      // Round to 1 decimal place for clean reading
      const roundedX = Math.round(gridX * 10) / 10;
      const roundedY = Math.round(gridY * 10) / 10;

      if (vectorType === 'x') {
        setColX([roundedX, roundedY]);
      } else {
        setColY([roundedX, roundedY]);
      }
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      if (containerRef.current) {
        containerRef.current.releasePointerCapture(upEvent.pointerId);
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const pt = (x: number, y: number): [number, number] => {
    const [tx, ty] = mulMV(M, [x, y]);
    return [CX + tx * SC, CY - ty * SC];
  };

  const range = 3;
  const q1Points = [pt(0,0), pt(range,0), pt(range,range), pt(0,range)].map(p => `${p[0]},${p[1]}`).join(' ');
  const q2Points = [pt(0,0), pt(0,range), pt(-range,range), pt(-range,0)].map(p => `${p[0]},${p[1]}`).join(' ');
  const q3Points = [pt(0,0), pt(-range,0), pt(-range,-range), pt(0,-range)].map(p => `${p[0]},${p[1]}`).join(' ');
  const q4Points = [pt(0,0), pt(0,-range), pt(range,-range), pt(range,0)].map(p => `${p[0]},${p[1]}`).join(' ');

  // Generate warped grid lines
  const gridLines: React.ReactNode[] = [];
  for (let i = -range; i <= range; i++) {
    const h0 = pt(-range, i), h1 = pt(range, i);
    const v0 = pt(i, -range), v1 = pt(i, range);
    const isAxis = i === 0;

    gridLines.push(
      <line
        key={`h${i}`}
        x1={h0[0]} y1={h0[1]}
        x2={h1[0]} y2={h1[1]}
        stroke={isAxis ? '#94a3b8' : '#e2e8f0'}
        strokeWidth={isAxis ? 1.8 : 0.8}
      />,
      <line
        key={`v${i}`}
        x1={v0[0]} y1={v0[1]}
        x2={v1[0]} y2={v1[1]}
        stroke={isAxis ? '#94a3b8' : '#e2e8f0'}
        strokeWidth={isAxis ? 1.8 : 0.8}
      />
    );
  }

  // Destination coordinates for UI
  const e1DestX = CX + colX[0] * SC;
  const e1DestY = CY - colX[1] * SC;
  const e2DestX = CX + colY[0] * SC;
  const e2DestY = CY - colY[1] * SC;

  return (
    <SlideLayout
      title="Columns are Destinations"
      text="Drag the vector tips on the graph. Watch how the matrix columns are literally the destination coordinates of the red and blue basis vectors."
      sidebarContent={
        <div className="flex flex-col gap-5 justify-between h-full">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 text-center">
                Interactive Matrix
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-slate-300 text-5xl font-thin self-stretch flex items-center">⌊</span>
                <div className="grid grid-cols-2 gap-2">
                  {/* Column 1 (Red) */}
                  <div className="w-20 h-14 rounded-xl flex flex-col items-center justify-center bg-rose-50 border border-rose-200 shadow-sm text-center">
                    <span className="text-[9px] uppercase tracking-wider text-rose-500 font-bold">Col 1 (i)</span>
                    <span className="text-base font-black text-rose-600 font-mono mt-0.5">{colX[0].toFixed(1)}</span>
                  </div>
                  {/* Column 2 (Blue) */}
                  <div className="w-20 h-14 rounded-xl flex flex-col items-center justify-center bg-sky-50 border border-sky-200 shadow-sm text-center">
                    <span className="text-[9px] uppercase tracking-wider text-sky-500 font-bold">Col 2 (j)</span>
                    <span className="text-base font-black text-sky-600 font-mono mt-0.5">{colY[0].toFixed(1)}</span>
                  </div>
                  {/* Column 1 (Red) */}
                  <div className="w-20 h-14 rounded-xl flex flex-col items-center justify-center bg-rose-50 border border-rose-200 shadow-sm text-center">
                    <span className="text-base font-black text-rose-600 font-mono">{colX[1].toFixed(1)}</span>
                  </div>
                  {/* Column 2 (Blue) */}
                  <div className="w-20 h-14 rounded-xl flex flex-col items-center justify-center bg-sky-50 border border-sky-200 shadow-sm text-center">
                    <span className="text-base font-black text-sky-600 font-mono">{colY[1].toFixed(1)}</span>
                  </div>
                </div>
                <span className="text-slate-300 text-5xl font-thin self-stretch flex items-center">⌋</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3.5 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  i
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800">Red Basis Vector [1, 0] lands at:</div>
                  <div className="font-mono text-sm font-bold text-rose-600 mt-0.5">[{colX[0].toFixed(1)}, {colX[1].toFixed(1)}]</div>
                </div>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3.5 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  j
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800">Blue Basis Vector [0, 1] lands at:</div>
                  <div className="font-mono text-sm font-bold text-sky-600 mt-0.5">[{colY[0].toFixed(1)}, {colY[1].toFixed(1)}]</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4">
            <h4 className="text-xs font-black text-violet-800 uppercase tracking-wide mb-1">The Rule of Columns</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every 2D linear transformation maps the original grid coordinates. Because grid lines remain parallel and evenly spaced, knowing where the two basis vectors land tells us where <em>every</em> point in space lands.
            </p>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4 relative">
        <svg 
          ref={containerRef} 
          viewBox="0 0 480 480" 
          className="w-full h-full max-h-full bg-white border border-slate-200 rounded-3xl shadow-sm cursor-crosshair select-none"
        >
          {/* Arrow markers */}
          <defs>
            <marker id="dest-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#E11D48" />
            </marker>
            <marker id="dest-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
            </marker>
          </defs>

          {/* Warped quadrant planes */}
          <polygon points={q1Points} fill="rgba(225, 29, 72, 0.05)" />
          <polygon points={q2Points} fill="rgba(2, 132, 199, 0.05)" />
          <polygon points={q3Points} fill="rgba(124, 58, 237, 0.05)" />
          <polygon points={q4Points} fill="rgba(217, 119, 6, 0.05)" />

          {/* Grid lines */}
          {gridLines}

          {/* Reference unit circle */}
          <circle cx={CX} cy={CY} r={SC} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.6" />

          {/* Red vector (i destination) */}
          <line x1={CX} y1={CY} x2={e1DestX} y2={e1DestY} stroke="#E11D48" strokeWidth="3" markerEnd="url(#dest-red)" />
          
          {/* Blue vector (j destination) */}
          <line x1={CX} y1={CY} x2={e2DestX} y2={e2DestY} stroke="#0284C7" strokeWidth="3" markerEnd="url(#dest-blue)" />

          {/* Interactive Red drag handle */}
          <circle 
            cx={e1DestX} 
            cy={e1DestY} 
            r="12" 
            fill="#E11D48" 
            fillOpacity="0.25" 
            stroke="#E11D48" 
            strokeWidth="2" 
            className="cursor-grab active:cursor-grabbing pointer-events-auto"
            onPointerDown={(e) => handleDrag(e, 'x')}
          />
          <circle cx={e1DestX} cy={e1DestY} r="4" fill="#E11D48" className="pointer-events-none" />

          {/* Interactive Blue drag handle */}
          <circle 
            cx={e2DestX} 
            cy={e2DestY} 
            r="12" 
            fill="#0284C7" 
            fillOpacity="0.25" 
            stroke="#0284C7" 
            strokeWidth="2" 
            className="cursor-grab active:cursor-grabbing pointer-events-auto"
            onPointerDown={(e) => handleDrag(e, 'y')}
          />
          <circle cx={e2DestX} cy={e2DestY} r="4" fill="#0284C7" className="pointer-events-none" />

          {/* Labels */}
          <text x={e1DestX + 12} y={e1DestY - 6} fill="#E11D48" fontSize="11" fontWeight="bold">
            [{colX[0].toFixed(1)}, {colX[1].toFixed(1)}]
          </text>
          <text x={e2DestX + 12} y={e2DestY - 6} fill="#0284C7" fontSize="11" fontWeight="bold">
            [{colY[0].toFixed(1)}, {colY[1].toFixed(1)}]
          </text>

          {/* Origin */}
          <circle cx={CX} cy={CY} r="5" fill="#0f172a" />
        </svg>

        <div className="absolute bottom-6 left-6 bg-white/95 border border-slate-200 rounded-2xl px-4 py-2 text-xs font-bold text-slate-500 shadow-sm flex items-center gap-2 pointer-events-none">
          <span className="text-base">👆</span> Drag the vector handles to define the matrix!
        </div>
      </div>
    </SlideLayout>
  );
};

export default Scene4_8_ColumnDestinations;
