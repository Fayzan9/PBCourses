import React, { useRef } from 'react';
import { Math as KaTeXMath } from '../../components/Math';

// ─── Points — same world from Scene03 ────────────────────────────────────────
const YOUR_SONG  = { x: 48, y: 45, label: 'Your Song' };

const SONGS = [
  { id: 'lofi',  label: 'Lo-fi Chill', x: 32, y: 58, good: true  },
  { id: 'indie', label: 'Indie Rock',  x: 62, y: 60, good: true  },
  { id: 'metal', label: 'Heavy Metal', x: 92, y: 88, good: false },
  { id: 'pop',   label: 'Pop Hit',     x: 88, y: 12, good: false },
];

const GOOD_COLOR = '#10B981';
const BAD_COLOR  = '#E11D48';

function euclidean(ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax, dy = by - ay;
  return { dx, dy, dist: Math.sqrt(dx * dx + dy * dy) };
}

// ─── Annotated Canvas ─────────────────────────────────────────────────────────
const EuclidCanvas: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 500, H = 420, PAD = 52;
  const pw = W - PAD * 2, ph = H - PAD * 2;

  const toSvg = (x: number, y: number): [number, number] => [
    PAD + (x / 100) * pw,
    PAD + ph - (y / 100) * ph,
  ];

  const [oX, oY] = toSvg(YOUR_SONG.x, YOUR_SONG.y);
  const ticks = [0, 25, 50, 75, 100];

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
      {/* Grid */}
      {ticks.map(t => {
        const [xi] = toSvg(t, 0);
        const [, yi] = toSvg(0, t);
        return (
          <g key={t}>
            <line x1={xi} y1={PAD} x2={xi} y2={PAD + ph} stroke="#f1f5f9" strokeWidth="1" />
            <line x1={PAD} y1={yi} x2={PAD + pw} y2={yi} stroke="#f1f5f9" strokeWidth="1" />
            <text x={xi} y={PAD + ph + 14} textAnchor="middle" fill="#cbd5e1" fontSize="9">{t}</text>
            <text x={PAD - 5} y={yi + 3} textAnchor="end" fill="#cbd5e1" fontSize="9">{t}</text>
          </g>
        );
      })}

      {/* Axes */}
      <line x1={PAD} y1={PAD} x2={PAD} y2={PAD + ph} stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1={PAD} y1={PAD + ph} x2={PAD + pw} y2={PAD + ph} stroke="#e2e8f0" strokeWidth="1.5" />
      <text x={PAD + pw / 2} y={H - 4} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Tempo / Energy →</text>
      <text x={10} y={PAD + ph / 2} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold"
        transform={`rotate(-90,10,${PAD + ph / 2})`}>Genre Score →</text>

      {/* Distance lines + labels for each song */}
      {SONGS.map(s => {
        const [px, py] = toSvg(s.x, s.y);
        const { dist } = euclidean(YOUR_SONG.x, YOUR_SONG.y, s.x, s.y);
        const color = s.good ? GOOD_COLOR : BAD_COLOR;
        const mx = (oX + px) / 2, my = (oY + py) / 2;
        // perpendicular offset for label
        const lineLen = Math.sqrt((px - oX) ** 2 + (py - oY) ** 2);
        const nx = -(py - oY) / lineLen * 12, ny = (px - oX) / lineLen * 12;
        return (
          <g key={s.id}>
            <line x1={oX} y1={oY} x2={px} y2={py}
              stroke={color} strokeWidth={s.good ? 2.5 : 1.5}
              strokeDasharray={s.good ? 'none' : '5,4'}
              opacity={s.good ? 0.9 : 0.45} />
            {/* distance label perpendicular to line */}
            <text x={mx + nx} y={my + ny} textAnchor="middle" fill={color}
              fontSize="9" fontWeight="bold"
              stroke="white" strokeWidth="2.5"
              style={{ paintOrder: 'stroke' } as React.CSSProperties}>
              {dist.toFixed(0)}
            </text>
          </g>
        );
      })}

      {/* Candidate dots + labels */}
      {SONGS.map(s => {
        const [px, py] = toSvg(s.x, s.y);
        const color = s.good ? GOOD_COLOR : BAD_COLOR;
        const labelX = px + (s.x > 50 ? -12 : 12);
        const anchor = s.x > 50 ? 'end' : 'start';
        return (
          <g key={s.id}>
            <circle cx={px} cy={py} r={s.good ? 7 : 6}
              fill={color} opacity={s.good ? 1 : 0.5}
              stroke="white" strokeWidth="1.5" />
            <text x={labelX} y={py - 10} textAnchor={anchor} fill={color}
              fontSize="9" fontWeight="bold"
              stroke="white" strokeWidth="2.5"
              style={{ paintOrder: 'stroke' } as React.CSSProperties}>
              {s.label}
            </text>
          </g>
        );
      })}

      {/* Your Song dot */}
      <circle cx={oX} cy={oY} r={10} fill="white" stroke="#1e293b" strokeWidth="2.5" />
      <circle cx={oX} cy={oY} r={5}  fill="#1e293b" />
      <text x={oX} y={oY + 20} textAnchor="middle" fill="#1e293b"
        fontSize="9" fontWeight="bold"
        stroke="white" strokeWidth="2.5"
        style={{ paintOrder: 'stroke' } as React.CSSProperties}>
        Your Song
      </text>

      {/* Legend */}
      <g transform={`translate(${PAD + 8}, ${PAD + 8})`}>
        <line x1="0" y1="6" x2="18" y2="6" stroke={GOOD_COLOR} strokeWidth="2.5" />
        <text x="22" y="10" fill="#475569" fontSize="9" fontWeight="600">Close match</text>
        <line x1="0" y1="22" x2="18" y2="22" stroke={BAD_COLOR} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />
        <text x="22" y="26" fill="#475569" fontSize="9" fontWeight="600">Poor match</text>
      </g>
    </svg>
  );
};

// ─── Scene ────────────────────────────────────────────────────────────────────
const containerClass = "flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden";
const leftSideClass  = "flex-[65] min-w-0 bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden";
const rightSideClass = "flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto";

export const Scene2_4_EuclideanDistance: React.FC = () => {
  const ax = YOUR_SONG.x, ay = YOUR_SONG.y;

  const goodSongs = SONGS.filter(s => s.good);
  const badSongs  = SONGS.filter(s => !s.good);

  return (
    <div className={containerClass}>
      {/* Left — graph */}
      <div className={leftSideClass}>
        <EuclidCanvas />
      </div>

      {/* Right — sidebar */}
      <div className={rightSideClass}>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold mb-1">Building on Scene 3 ↑</p>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-1">Euclidean Distance</h2>
          <p className="text-slate-500 text-sm font-medium leading-snug">
            The proximity sandbox used this formula the whole time. Smaller distance = better match. Here's why.
          </p>
        </div>

        {/* Good vs Bad side-by-side */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600 mb-2">✓ Close matches</div>
            {goodSongs.map(s => {
              const { dx, dy, dist } = euclidean(ax, ay, s.x, s.y);
              return (
                <div key={s.id} className="mb-2 last:mb-0">
                  <div className="font-bold text-xs text-emerald-700">{s.label}</div>
                  <div className="font-mono text-[10px] text-emerald-600">
                    Δ({Math.abs(dx)}, {Math.abs(dy)}) → d = <span className="font-black">{dist.toFixed(0)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-500 mb-2">✗ Poor matches</div>
            {badSongs.map(s => {
              const { dx, dy, dist } = euclidean(ax, ay, s.x, s.y);
              return (
                <div key={s.id} className="mb-2 last:mb-0">
                  <div className="font-bold text-xs text-rose-600">{s.label}</div>
                  <div className="font-mono text-[10px] text-rose-500">
                    Δ({Math.abs(dx)}, {Math.abs(dy)}) → d = <span className="font-black">{dist.toFixed(0)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-step for Lo-fi (best match) */}
        {(() => {
          const s = SONGS[0]; // Lo-fi Chill
          const { dx, dy } = euclidean(ax, ay, s.x, s.y);
          return (
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">
                How it's computed — Your Song → {s.label}
              </div>
              <div className="flex flex-col gap-1.5 text-xs font-mono">
                <div className="flex justify-between px-2 py-1 bg-rose-50 border border-rose-100 rounded-lg">
                  <span className="text-rose-600">Δx = {s.x}−{ax}</span>
                  <span className="font-black text-rose-700">{dx}</span>
                </div>
                <div className="flex justify-between px-2 py-1 bg-sky-50 border border-sky-100 rounded-lg">
                  <span className="text-sky-600">Δy = {s.y}−{ay}</span>
                  <span className="font-black text-sky-700">{dy}</span>
                </div>
                <div className="flex justify-between px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500">√({dx}²+{dy}²)</span>
                  <span className="font-black text-emerald-600">{Math.sqrt(dx*dx+dy*dy).toFixed(1)}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* General formula */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center">
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Scales to n dimensions</div>
          <KaTeXMath tex={`d = \\sqrt{\\sum_{i=1}^{n}(B_i - A_i)^2}`} />
        </div>
      </div>
    </div>
  );
};
