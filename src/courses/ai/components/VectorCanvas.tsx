import React from 'react';
import { motion } from 'framer-motion';
import { type Vec2 } from './mathHelpers';

export interface VecSpec {
  id: string;
  vec: Vec2;
  color: string;
  marker: string;
  label?: string;
  dashed?: boolean;
  width?: number;
}

export interface LineSpec {
  from: Vec2;
  to: Vec2;
  color: string;
  marker?: string;
  dashed?: boolean;
  width?: number;
}

export const VC_MARKERS = (
  <defs>
    {([
      ['red',    '#E11D48'], ['blue',    '#0284C7'], ['green',   '#059669'],
      ['violet', '#7C3AED'], ['slate',   '#64748B'], ['amber',   '#D97706'],
      ['emerald','#10B981'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`vc-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
  </defs>
);

export const VectorCanvas: React.FC<{
  vectors: VecSpec[];
  lines?: LineSpec[];
  range?: number;
  width?: number;
  height?: number;
}> = ({ vectors, lines = [], range = 5, width = 480, height = 480 }) => {
  const cx = width / 2, cy = height / 2;
  const scale = (Math.min(width, height) / 2 - 28) / range;

  const pt = (x: number, y: number): [number, number] => [cx + x * scale, cy - y * scale];
  const origin = pt(0, 0);

  const gridLines: React.ReactNode[] = [];
  for (let i = -range; i <= range; i++) {
    const h0 = pt(-range, i), h1 = pt(range, i);
    const v0 = pt(i, -range), v1 = pt(i, range);
    const isAxis = i === 0;
    gridLines.push(
      <line key={`h${i}`} x1={h0[0]} y1={h0[1]} x2={h1[0]} y2={h1[1]}
        stroke={isAxis ? '#94a3b8' : '#e2e8f0'} strokeWidth={isAxis ? 1.5 : 0.8} />,
      <line key={`v${i}`} x1={v0[0]} y1={v0[1]} x2={v1[0]} y2={v1[1]}
        stroke={isAxis ? '#94a3b8' : '#e2e8f0'} strokeWidth={isAxis ? 1.5 : 0.8} />,
    );
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-full">
      {VC_MARKERS}
      <rect width={width} height={height} fill="white" rx="16" />
      {gridLines}

      {lines.map((l, i) => {
        const [x1, y1] = pt(l.from[0], l.from[1]);
        const [x2, y2] = pt(l.to[0], l.to[1]);
        return (
          <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={l.color} strokeWidth={l.width ?? 2}
            strokeDasharray={l.dashed ? '6 3' : undefined}
            markerEnd={l.marker ? `url(#vc-${l.marker})` : undefined}
          />
        );
      })}

      {vectors.map(v => {
        const [x, y] = pt(v.vec[0], v.vec[1]);
        return (
          <g key={v.id}>
            <line x1={origin[0]} y1={origin[1]} x2={x} y2={y}
              stroke={v.color} strokeWidth={v.width ?? 2.5}
              strokeDasharray={v.dashed ? '6 3' : undefined}
              markerEnd={`url(#vc-${v.marker})`}
            />
            {v.label && (
              <text x={x + 9} y={y - 7} fill={v.color} fontSize="13" fontWeight="bold">
                {v.label}
              </text>
            )}
          </g>
        );
      })}

      <circle cx={origin[0]} cy={origin[1]} r="4.5" fill="#0f172a" />
    </svg>
  );
};

export const DotMeter: React.FC<{ value: number; max?: number }> = ({ value, max = 20 }) => {
  const clamped = Math.max(-max, Math.min(max, value));
  const pct = ((clamped + max) / (2 * max)) * 100;
  const isPos = value >= 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs font-mono font-bold text-slate-500">
        <span>Dot Product</span>
        <span className={isPos ? 'text-emerald-600' : 'text-rose-500'}>{value.toFixed(1)}</span>
      </div>
      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300" />
        <motion.div
          className={`absolute top-0 h-full rounded-full ${isPos ? 'bg-emerald-400' : 'bg-rose-400'}`}
          style={{ left: `${Math.min(50, pct)}%`, width: `${Math.abs(pct - 50)}%` }}
          layout
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>
      <div className="flex justify-between text-[9px] font-mono text-slate-400 font-bold">
        <span>−{max} (opposite)</span><span>0</span><span>+{max} (aligned)</span>
      </div>
    </div>
  );
};
