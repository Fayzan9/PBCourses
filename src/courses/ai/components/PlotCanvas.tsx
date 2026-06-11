import React, { useRef, useCallback } from 'react';

export interface PlotPoint {
  id: string;
  x: number; // data coords 0-100
  y: number;
  color: string;
  label?: string;
  radius?: number;
  ring?: boolean;
}

export interface PlotLine {
  x1: number; y1: number;
  x2: number; y2: number;
  color: string;
  dashed?: boolean;
  width?: number;
  marker?: boolean;
}

export const DEFS_MARKERS = (
  <defs>
    {([
      ['red',    '#E11D48'], ['blue',   '#0284C7'], ['green',  '#059669'],
      ['violet', '#7C3AED'], ['slate',  '#64748B'], ['amber',  '#D97706'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`pc-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
  </defs>
);

function colorToMarkerId(color: string): string {
  const map: Record<string, string> = {
    '#E11D48': 'red', '#0284C7': 'blue', '#059669': 'green',
    '#7C3AED': 'violet', '#64748B': 'slate', '#D97706': 'amber',
  };
  return map[color] ?? 'slate';
}

export const PlotCanvas: React.FC<{
  points: PlotPoint[];
  lines?: PlotLine[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  onMouseDown?: (x: number, y: number, id: string) => void;
}> = ({ points, lines = [], width = 480, height = 480, xLabel, yLabel }) => {
  const pad = 36;
  const pw = width - pad * 2;
  const ph = height - pad * 2;

  const toSvg = (x: number, y: number): [number, number] => [
    pad + (x / 100) * pw,
    pad + ph - (y / 100) * ph,
  ];

  const gridLines = [];
  for (let i = 0; i <= 10; i++) {
    const xi = pad + (i / 10) * pw;
    const yi = pad + (i / 10) * ph;
    gridLines.push(
      <line key={`gv${i}`} x1={xi} y1={pad} x2={xi} y2={pad + ph}
        stroke="#f1f5f9" strokeWidth="1" />,
      <line key={`gh${i}`} x1={pad} y1={yi} x2={pad + pw} y2={yi}
        stroke="#f1f5f9" strokeWidth="1" />,
    );
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-full">
      {DEFS_MARKERS}
      <rect width={width} height={height} fill="white" rx="16" />
      {gridLines}
      {/* axes */}
      <line x1={pad} y1={pad} x2={pad} y2={pad + ph} stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={pad} y1={pad + ph} x2={pad + pw} y2={pad + ph} stroke="#cbd5e1" strokeWidth="1.5" />
      {/* axis labels */}
      {xLabel && <text x={pad + pw / 2} y={height - 4} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">{xLabel}</text>}
      {yLabel && <text x={8} y={pad + ph / 2} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" transform={`rotate(-90, 8, ${pad + ph / 2})`}>{yLabel}</text>}

      {lines.map((l, i) => {
        const [x1, y1] = toSvg(l.x1, l.y1);
        const [x2, y2] = toSvg(l.x2, l.y2);
        const mid = colorToMarkerId(l.color);
        return (
          <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={l.color} strokeWidth={l.width ?? 1.8}
            strokeDasharray={l.dashed ? '5 3' : undefined}
            markerEnd={l.marker ? `url(#pc-${mid})` : undefined}
          />
        );
      })}

      {points.map(p => {
        const [cx, cy] = toSvg(p.x, p.y);
        return (
          <g key={p.id}>
            {p.ring && <circle cx={cx} cy={cy} r={(p.radius ?? 6) + 5} fill="none" stroke={p.color} strokeWidth="2" opacity="0.4" />}
            <circle cx={cx} cy={cy} r={p.radius ?? 6} fill={p.color} />
            {p.label && (
              <text x={cx + 10} y={cy - 6} fill={p.color} fontSize="11" fontWeight="bold">{p.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export const DraggablePlotCanvas: React.FC<{
  points: PlotPoint[];
  lines?: PlotLine[];
  dragId: string;
  onDrag: (x: number, y: number) => void;
  xLabel?: string;
  yLabel?: string;
}> = ({ points, lines = [], dragId: _dragId, onDrag, xLabel, yLabel }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const W = 480, H = 480, PAD = 36;

  const svgToData = useCallback((clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const svgX = (clientX - rect.left) * scaleX;
    const svgY = (clientY - rect.top) * scaleY;
    const pw = W - PAD * 2, ph = H - PAD * 2;
    const dx = Math.max(0, Math.min(100, ((svgX - PAD) / pw) * 100));
    const dy = Math.max(0, Math.min(100, (1 - (svgY - PAD) / ph) * 100));
    onDrag(dx, dy);
  }, [onDrag]);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full cursor-crosshair"
      onMouseDown={e => { dragging.current = true; svgToData(e.clientX, e.clientY); }}
      onMouseMove={e => { if (dragging.current) svgToData(e.clientX, e.clientY); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
    >
      <PlotCanvas points={points} lines={lines} xLabel={xLabel} yLabel={yLabel} />
    </svg>
  );
};
