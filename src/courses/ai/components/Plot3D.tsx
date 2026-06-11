import React, { useRef, useState, useCallback, useEffect } from 'react';

export interface Point3D {
  id: string;
  label: string;
  x: number; // 0–100
  y: number; // 0–100
  z: number; // 0–100
  color: string;
}

export interface Plot3DProps {
  points: Point3D[];
  targetPoint: Point3D;
  onTargetMove?: (x: number, y: number, z: number) => void;
  xLabel?: string;
  yLabel?: string;
  zLabel?: string;
}

const W = 560;
const H = 440;
const S = 175; // ortho scale

// Rotate world coords (0-100) and project to SVG pixels
function proj(
  x: number, y: number, z: number,
  theta: number, phi: number,
): { px: number; py: number; depth: number } {
  // Normalize to -1..1
  const nx = x / 50 - 1;
  const ny = y / 50 - 1;
  const nz = z / 50 - 1;
  // Azimuth (Y-axis rotation)
  const ax = nx * Math.cos(theta) + nz * Math.sin(theta);
  const az = -nx * Math.sin(theta) + nz * Math.cos(theta);
  const ay = ny;
  // Elevation (X-axis rotation)
  const ex = ax;
  const ey = ay * Math.cos(phi) - az * Math.sin(phi);
  const ez = ay * Math.sin(phi) + az * Math.cos(phi);
  // Orthographic
  return { px: W / 2 + ex * S, py: H / 2 - ey * S, depth: ez };
}

// Cube edges: pairs of corner indices
const CORNERS: [number,number,number][] = [
  [0,0,0],[100,0,0],[100,0,100],[0,0,100],
  [0,100,0],[100,100,0],[100,100,100],[0,100,100],
];
const EDGES: [number,number][] = [
  [0,1],[1,2],[2,3],[3,0], // bottom
  [4,5],[5,6],[6,7],[7,4], // top
  [0,4],[1,5],[2,6],[3,7], // verticals
];

function dist3(a: Point3D, b: {x:number;y:number;z:number}) {
  return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2);
}

export const Plot3D: React.FC<Plot3DProps> = ({
  points,
  targetPoint,
  onTargetMove,
  xLabel = 'X', yLabel = 'Y', zLabel = 'Z',
}) => {
  const [theta, setTheta] = useState(0.55);
  const [phi, setPhi]     = useState(-0.38);

  const dragMode   = useRef<'rotate' | 'target' | null>(null);
  const lastMouse  = useRef({ x: 0, y: 0 });
  const svgRef     = useRef<SVGSVGElement>(null);

  // Axis tips from origin (0,0,0)
  const origin = proj(0, 0, 0, theta, phi);
  const xTip   = proj(100, 0, 0, theta, phi);
  const yTip   = proj(0, 100, 0, theta, phi);
  const zTip   = proj(0, 0, 100, theta, phi);

  const tp = proj(targetPoint.x, targetPoint.y, targetPoint.z, theta, phi);

  // Ranked points by distance to target
  const ranked = [...points]
    .map(p => ({ ...p, dist: dist3(p, targetPoint) }))
    .sort((a, b) => a.dist - b.dist);
  const topIds = new Set(ranked.slice(0, 2).map(r => r.id));

  // All points projected and sorted back-to-front
  const projPoints = points
    .map(p => ({ ...p, ...proj(p.x, p.y, p.z, theta, phi) }))
    .sort((a, b) => a.depth - b.depth);

  // Cube edges projected
  const cubeEdges = EDGES.map(([a, b]) => {
    const ca = proj(...CORNERS[a], theta, phi);
    const cb = proj(...CORNERS[b], theta, phi);
    return { x1: ca.px, y1: ca.py, x2: cb.px, y2: cb.py };
  });

  const onMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    // Check if near target point
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (!svgRect) return;
    const mx = (e.clientX - svgRect.left) / svgRect.width * W;
    const my = (e.clientY - svgRect.top)  / svgRect.height * H;
    const dtx = mx - tp.px, dty = my - tp.py;
    dragMode.current = Math.sqrt(dtx*dtx + dty*dty) < 18 ? 'target' : 'rotate';
    lastMouse.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  }, [tp]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragMode.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };

    if (dragMode.current === 'rotate') {
      setTheta(t => t + dx * 0.01);
      setPhi(p => Math.max(-1.1, Math.min(0.05, p + dy * 0.007)));
    } else if (dragMode.current === 'target' && onTargetMove) {
      // Decompose dx/dy into world XZ movement based on current view
      const cosT = Math.cos(theta), sinT = Math.sin(theta);
      // Right vector in XZ plane is (cosT, 0, -sinT)
      // Screen-right corresponds to world-right; screen-up to depth
      const movX = targetPoint.x + dx * cosT * 0.4;
      const movZ = targetPoint.z + dx * (-sinT) * 0.4 + dy * 0.25;
      onTargetMove(
        Math.max(5, Math.min(95, movX)),
        targetPoint.y,
        Math.max(5, Math.min(95, movZ)),
      );
    }
  }, [theta, targetPoint, onTargetMove]);

  const onMouseUp = useCallback(() => { dragMode.current = null; }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div className="w-full h-full flex flex-col select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full flex-1 cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
      >
        {/* Cube wireframe */}
        {cubeEdges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="#cbd5e1" strokeWidth="0.8" />
        ))}

        {/* Axes */}
        {[
          { from: origin, to: xTip, color: '#E11D48', label: xLabel },
          { from: origin, to: yTip, color: '#10B981', label: yLabel },
          { from: origin, to: zTip, color: '#0284C7', label: zLabel },
        ].map(({ from, to, color, label }) => (
          <g key={label}>
            <line x1={from.px} y1={from.py} x2={to.px} y2={to.py}
              stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={to.px} cy={to.py} r={3.5} fill={color} />
            <text x={to.px + 8} y={to.py + 5}
              fontSize="14" fontWeight="800" fill={color}
              fontFamily="ui-sans-serif,system-ui,sans-serif">
              {label}
            </text>
          </g>
        ))}

        {/* Connection lines from target to all points */}
        {projPoints.map(p => {
          const isTop = topIds.has(p.id);
          const color = isTop ? p.color : '#cbd5e1';
          return (
            <line key={`line-${p.id}`}
              x1={tp.px} y1={tp.py} x2={p.px} y2={p.py}
              stroke={color}
              strokeWidth={isTop ? 2 : 1}
              strokeDasharray={isTop ? '6,3' : '3,4'}
              opacity={isTop ? 0.85 : 0.35}
            />
          );
        })}

        {/* Candidate points */}
        {projPoints.map(p => {
          const isTop = topIds.has(p.id);
          return (
            <g key={p.id}>
              <circle cx={p.px} cy={p.py} r={isTop ? 9 : 7}
                fill={isTop ? p.color : '#e2e8f0'}
                stroke={isTop ? 'white' : '#cbd5e1'}
                strokeWidth="1.5" opacity={isTop ? 1 : 0.7}
              />
              <text x={p.px + 11} y={p.py + 5}
                fontSize="12" fontWeight="700"
                fill={isTop ? p.color : '#94a3b8'}
                fontFamily="ui-sans-serif,system-ui,sans-serif"
                stroke="white" strokeWidth="2.5"
                style={{ paintOrder: 'stroke' } as React.CSSProperties}>
                {p.label}
              </text>
            </g>
          );
        })}

        {/* Target point (draggable) */}
        <circle cx={tp.px} cy={tp.py} r={11}
          fill="white" stroke="#1e293b" strokeWidth="3" />
        <circle cx={tp.px} cy={tp.py} r={6}
          fill="#1e293b" />
        <text x={tp.px + 14} y={tp.py + 5}
          fontSize="12" fontWeight="800" fill="#1e293b"
          fontFamily="ui-sans-serif,system-ui,sans-serif"
          stroke="white" strokeWidth="2.5"
          style={{ paintOrder: 'stroke' } as React.CSSProperties}>
          {targetPoint.label}
        </text>
      </svg>

      <div className="flex justify-center gap-6 pb-1">
        <p className="text-[11px] text-slate-400 font-medium">
          Drag <span className="font-bold text-slate-600">background</span> to rotate · Drag <span className="font-bold text-slate-600">●</span> to move target
        </p>
      </div>
    </div>
  );
};