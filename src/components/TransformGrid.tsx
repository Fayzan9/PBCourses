import React, { useState, useEffect, useRef } from 'react';
import { type Vec2, type Mat2, mulMV, lerpMat, easeOutCubic, fmt, eigenvalues, eigenvector } from './mathHelpers';
import { LAYOUT_CONFIG } from './layoutConfig';

export function useAnimatedMatrix(target: Mat2, duration = 650): Mat2 {
  const [mat, setMat] = useState<Mat2>(target);
  const anim = useRef<{ from: Mat2; to: Mat2; t0: number | null; raf: number | null }>({
    from: target, to: target, t0: null, raf: null,
  });

  useEffect(() => {
    const s = anim.current;
    if (s.raf) cancelAnimationFrame(s.raf);
    s.from = mat;
    s.to = target;
    s.t0 = null;
    const tick = () => {
      const now = performance.now();
      if (!s.t0) s.t0 = now;
      const raw = Math.min((now - s.t0) / duration, 1);
      setMat(lerpMat(s.from, s.to, easeOutCubic(raw)));
      if (raw < 1) s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
    return () => { if (s.raf) cancelAnimationFrame(s.raf); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target[0][0], target[0][1], target[1][0], target[1][1]]);

  return mat;
}

export const SvgGridLines: React.FC<{
  cx: number;
  cy: number;
  scale: number;
  range: number;
  width: number;
  height: number;
  showTicks?: boolean;
  tickColor?: string;
  gridColor?: string;
  axisColor?: string;
}> = ({
  cx, cy, scale, range, width, height,
  showTicks = true,
  tickColor = '#94a3b8',
  gridColor = '#e8ecf2',
  axisColor = '#7e93a8'
}) => {
  const lines: React.ReactNode[] = [];
  const ticks: React.ReactNode[] = [];

  for (let i = -range; i <= range; i++) {
    const ax = i === 0;
    lines.push(
      <line key={`h${i}`} x1={cx + i * scale} y1={14} x2={cx + i * scale} y2={height - 14}
        stroke={ax ? axisColor : gridColor} strokeWidth={ax ? 1.8 : 1} />,
      <line key={`v${i}`} x1={14} y1={cy - i * scale} x2={width - 14} y2={cy - i * scale}
        stroke={ax ? axisColor : gridColor} strokeWidth={ax ? 1.8 : 1} />
    );

    if (i !== 0 && showTicks) {
      ticks.push(
        <g key={`t-${i}`}>
          <line x1={cx + i * scale} y1={cy - 4} x2={cx + i * scale} y2={cy + 4} stroke={tickColor} strokeWidth="1.2" />
          <text x={cx + i * scale} y={cy + 16} textAnchor="middle" fill={tickColor} fontSize="10" fontWeight="600">{i}</text>
          <line x1={cx - 4} y1={cy - i * scale} x2={cx + 4} y2={cy - i * scale} stroke={tickColor} strokeWidth="1.2" />
          <text x={cx - 9} y={cy - i * scale + 4} textAnchor="end" fill={tickColor} fontSize="10" fontWeight="600">{i}</text>
        </g>
      );
    }
  }

  // Axis labels
  const axisLabels = showTicks ? (
    <>
      <text x={width - 16} y={cy - 8} fill={axisColor} fontSize="12" fontWeight="700">x</text>
      <text x={cx + 8} y={18} fill={axisColor} fontSize="12" fontWeight="700">y</text>
    </>
  ) : null;

  return (
    <>
      {lines}
      {ticks}
      {axisLabels}
    </>
  );
};

export const MARKER_DEFS = (
  <defs>
    {([
      ['red', '#E11D48'], ['blue', '#0284C7'], ['green', '#059669'],
      ['slate', '#64748B'], ['violet', '#7C3AED'], ['amber', '#D97706'],
      ['emerald', '#10B981'], ['rose', '#FB7185'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`g4-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
  </defs>
);

export const TransformGrid: React.FC<{
  M: Mat2;
  highlightVec?: [number, number] | null;
  showOriginalVec?: boolean;
  extraVec?: { vec: [number, number]; color: string; marker: string; label?: string } | null;
  width?: number;
  height?: number;
  scale?: number;
  range?: number;
}> = ({
  M, highlightVec = null, showOriginalVec = false, extraVec = null,
  width = LAYOUT_CONFIG.graphWidth,
  height = LAYOUT_CONFIG.graphHeight,
  scale = LAYOUT_CONFIG.graphScale,
  range = LAYOUT_CONFIG.graphRange,
}) => {
  const cx = width / 2, cy = height / 2;

  const pt = (x: number, y: number): [number, number] => {
    const [tx, ty] = mulMV(M, [x, y]);
    return [cx + tx * scale, cy - ty * scale];
  };
  const rawPt = (x: number, y: number): [number, number] => [cx + x * scale, cy - y * scale];

  const origin = pt(0, 0);
  const lines: React.ReactNode[] = [];

  for (let i = -range; i <= range; i++) {
    const h0 = pt(-range, i), h1 = pt(range, i);
    const v0 = pt(i, -range), v1 = pt(i, range);
    const isAxis = i === 0;
    lines.push(
      <line key={`h${i}`} x1={h0[0]} y1={h0[1]} x2={h1[0]} y2={h1[1]}
        stroke={isAxis ? '#94a3b8' : '#e2e8f0'} strokeWidth={isAxis ? 1.5 : 0.8} />,
      <line key={`v${i}`} x1={v0[0]} y1={v0[1]} x2={v1[0]} y2={v1[1]}
        stroke={isAxis ? '#94a3b8' : '#e2e8f0'} strokeWidth={isAxis ? 1.5 : 0.8} />,
    );
  }

  const e1 = pt(1, 0);
  const e2 = pt(0, 1);
  const hv = highlightVec ? pt(highlightVec[0], highlightVec[1]) : null;
  const hvRaw = (highlightVec && showOriginalVec) ? rawPt(highlightVec[0], highlightVec[1]) : null;
  const ev = extraVec ? pt(extraVec.vec[0], extraVec.vec[1]) : null;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-full">
      {MARKER_DEFS}
      <rect width={width} height={height} fill="white" rx="16" />
      {lines}
      <line x1={origin[0]} y1={origin[1]} x2={e1[0]} y2={e1[1]}
        stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#g4-red)" />
      <line x1={origin[0]} y1={origin[1]} x2={e2[0]} y2={e2[1]}
        stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#g4-blue)" />
      {hvRaw && (
        <line x1={origin[0]} y1={origin[1]} x2={hvRaw[0]} y2={hvRaw[1]}
          stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#g4-slate)" />
      )}
      {hv && (
        <>
          <line x1={origin[0]} y1={origin[1]} x2={hv[0]} y2={hv[1]}
            stroke="#059669" strokeWidth="3" markerEnd="url(#g4-green)" />
          {highlightVec && (
            <text x={hv[0] + 8} y={hv[1] - 6} fill="#059669" fontSize="13" fontWeight="bold">
              [{fmt(highlightVec[0])}, {fmt(highlightVec[1])}]
            </text>
          )}
        </>
      )}
      {ev && extraVec && (
        <>
          <line x1={origin[0]} y1={origin[1]} x2={ev[0]} y2={ev[1]}
            stroke={extraVec.color} strokeWidth="3" markerEnd={`url(#g4-${extraVec.marker})`} />
          {extraVec.label && (
            <text x={ev[0] + 8} y={ev[1] - 6} fill={extraVec.color} fontSize="13" fontWeight="bold">
              {extraVec.label}
            </text>
          )}
        </>
      )}
      <circle cx={origin[0]} cy={origin[1]} r="4.5" fill="#0f172a" />
    </svg>
  );
};

export interface EigenGridProps {
  M: Mat2;
  showEigen?: boolean;
  showBasisOnly?: boolean;
  highlightVecs?: { vec: Vec2; color: string; marker: string; label?: string; dashed?: boolean }[];
  width?: number;
  height?: number;
  scale?: number;
  range?: number;
}

export const VecLabel: React.FC<{ x: number; y: number; text: string; color: string; offsetX?: number; offsetY?: number }> =
  ({ x, y, text, color, offsetX = 8, offsetY = -10 }) => {
    const w = text.length * 6.5 + 10;
    const lx = x + offsetX, ly = y + offsetY;
    return (
      <g>
        <rect x={lx - 2} y={ly - 12} width={w} height={16} rx="4" fill="white" opacity="0.92" stroke={color} strokeWidth="1" />
        <text x={lx + w / 2 - 2} y={ly} textAnchor="middle" fill={color} fontSize="10" fontWeight="bold">{text}</text>
      </g>
    );
  };

export const EigenGrid: React.FC<EigenGridProps> = ({
  M, showEigen = false, showBasisOnly = false,
  highlightVecs = [],
  width = LAYOUT_CONFIG.graphWidth,
  height = LAYOUT_CONFIG.graphHeight,
  scale = LAYOUT_CONFIG.graphScale,
  range = LAYOUT_CONFIG.graphRange,
}) => {
  const cx = width / 2, cy = height / 2;
  const pt = (x: number, y: number): Vec2 => {
    const [tx, ty] = mulMV(M, [x, y]);
    return [cx + tx * scale, cy - ty * scale];
  };
  const raw = (x: number, y: number): Vec2 => [cx + x * scale, cy - y * scale];

  const origin = showBasisOnly ? raw(0, 0) : pt(0, 0);
  const gridLines: React.ReactNode[] = [];

  if (!showBasisOnly) {
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
  } else {
    gridLines.push(
      <line key="hax" x1={cx - range * scale} y1={cy} x2={cx + range * scale} y2={cy} stroke="#e2e8f0" strokeWidth={1.5} />,
      <line key="vax" x1={cx} y1={cy - range * scale} x2={cx} y2={cy + range * scale} stroke="#e2e8f0" strokeWidth={1.5} />,
    );
  }

  const ticks = [-2, -1, 1, 2];
  const tickLabels = ticks.map(t => {
    const [rx] = raw(t, 0);
    const [, ry] = raw(0, t);
    return (
      <g key={`t-${t}`}>
        <line x1={rx} y1={cy - 3} x2={rx} y2={cy + 3} stroke="#cbd5e1" strokeWidth="1" />
        <text x={rx} y={cy + 14} fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="bold">{t}</text>
        <line x1={cx - 3} y1={ry} x2={cx + 3} y2={ry} stroke="#cbd5e1" strokeWidth="1" />
        <text x={cx - 8} y={ry + 3} fill="#94a3b8" fontSize="9" textAnchor="end" fontWeight="bold">{t}</text>
      </g>
    );
  });

  const e1 = pt(1, 0);
  const e2 = pt(0, 1);

  // Basis vector destination labels — show where [1,0] and [0,1] land
  const e1CoordX = fmt(M[0][0]), e1CoordY = fmt(M[1][0]);
  const e2CoordX = fmt(M[0][1]), e2CoordY = fmt(M[1][1]);

  const evals = showEigen ? eigenvalues(M) : null;
  const eigenArrows: React.ReactNode[] = [];
  if (evals && showEigen) {
    evals.forEach((λ, i) => {
      const ev = eigenvector(M, λ);
      const len = 2.2;
      const tip = pt(ev[0] * len, ev[1] * len);
      const tipN = pt(-ev[0] * len, -ev[1] * len);
      const col = i === 0 ? '#10B981' : '#D97706';
      const mk = i === 0 ? 'emerald' : 'amber';
      const evLabel = `v=[${fmt(ev[0])},${fmt(ev[1])}] λ=${fmt(λ)}`;
      eigenArrows.push(
        <line key={`ev${i}pos`} x1={origin[0]} y1={origin[1]} x2={tip[0]} y2={tip[1]}
          stroke={col} strokeWidth="2.5" markerEnd={`url(#g4-${mk})`} strokeDasharray="6 3" />,
        <line key={`ev${i}neg`} x1={origin[0]} y1={origin[1]} x2={tipN[0]} y2={tipN[1]}
          stroke={col} strokeWidth="2.5" markerEnd={`url(#g4-${mk})`} strokeDasharray="6 3" />,
        <VecLabel key={`evlbl${i}`} x={tip[0]} y={tip[1]} text={evLabel} color={col} offsetX={8} offsetY={-12} />,
      );
    });
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-full">
      {MARKER_DEFS}
      <rect width={width} height={height} fill="white" rx="16" />
      {gridLines}
      {showBasisOnly && tickLabels}

      {!showBasisOnly && (
        <>
          <line x1={origin[0]} y1={origin[1]} x2={e1[0]} y2={e1[1]}
            stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#g4-red)" />
          <VecLabel x={e1[0]} y={e1[1]} text={`ê₁→[${e1CoordX},${e1CoordY}]`} color="#E11D48" />
          <line x1={origin[0]} y1={origin[1]} x2={e2[0]} y2={e2[1]}
            stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#g4-blue)" />
          <VecLabel x={e2[0]} y={e2[1]} text={`ê₂→[${e2CoordX},${e2CoordY}]`} color="#0284C7" />
        </>
      )}

      {highlightVecs.map((hv, idx) => {
        const p = pt(hv.vec[0], hv.vec[1]);
        return (
          <g key={idx}>
            <line x1={origin[0]} y1={origin[1]} x2={p[0]} y2={p[1]}
              stroke={hv.color} strokeWidth="3" strokeDasharray={hv.dashed ? '5 3' : undefined}
              markerEnd={`url(#g4-${hv.marker})`}
            />
            {hv.label && <VecLabel x={p[0]} y={p[1]} text={hv.label} color={hv.color} />}
          </g>
        );
      })}

      {eigenArrows}

      <circle cx={origin[0]} cy={origin[1]} r="4.5" fill="#0f172a" />
    </svg>
  );
};
