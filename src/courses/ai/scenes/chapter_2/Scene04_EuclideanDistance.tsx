import React, { useState, useRef, useMemo } from 'react';
import { Math as KaTeXMath } from '../../components/Math';
import { Activity, Radio, Music, Award } from 'lucide-react';

type SongPoint = {
  id: string;
  label: string;
  artist: string;
  x: number; // Energy (0-100)
  y: number; // Acousticness (0-100)
  color: string;
};

const SONGS: SongPoint[] = [
  { id: 'billie', label: 'Bad Guy', artist: 'Billie Eilish', x: 55, y: 50, color: '#7C3AED' },
  { id: 'daft', label: 'One More Time', artist: 'Daft Punk', x: 85, y: 15, color: '#0284C7' },
  { id: 'adele', label: 'Someone Like You', artist: 'Adele', x: 25, y: 75, color: '#059669' },
];

export const Scene2_4_EuclideanDistance: React.FC = () => {
  const [target, setTarget] = useState({ x: 50, y: 45 });
  const [selectedSongId, setSelectedSongId] = useState<string>('billie');

  const containerRef = useRef<HTMLDivElement>(null);
  const W = 480;
  const H = 480;
  const PAD = 40;
  const pw = W - PAD * 2;
  const ph = H - PAD * 2;

  const toSvg = (x: number, y: number): [number, number] => [
    PAD + (x / 100) * pw,
    PAD + ph - (y / 100) * ph,
  ];

  const fromSvg = (svgX: number, svgY: number): [number, number] => {
    const rawX = ((svgX - PAD) / pw) * 100;
    const rawY = (1 - (svgY - PAD) / ph) * 100;
    return [
      Math.max(0, Math.min(100, Math.round(rawX))),
      Math.max(0, Math.min(100, Math.round(rawY))),
    ];
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const [dataX, dataY] = fromSvg(x * scaleX, y * scaleY);
    setTarget({ x: dataX, y: dataY });
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.buttons !== 1 || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const [dataX, dataY] = fromSvg(x * scaleX, y * scaleY);
    setTarget({ x: dataX, y: dataY });
  };

  const selectedSong = useMemo(() => {
    return SONGS.find(s => s.id === selectedSongId) || SONGS[0];
  }, [selectedSongId]);

  // Calculations
  const dx = selectedSong.x - target.x;
  const dy = selectedSong.y - target.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // SVG coordinates
  const [tx, ty] = toSvg(target.x, target.y);
  const [sx, sy] = toSvg(selectedSong.x, selectedSong.y);

  // Grid Ticks
  const ticks = [0, 20, 40, 60, 80, 100];

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      {/* Left side: Interactive Canvas */}
      <div ref={containerRef} className="flex-[60] min-w-0 bg-slate-50 border border-slate-200/80 rounded-3xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between select-none">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-mono flex items-center gap-1.5 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-violet-600" />
            Energy (x): {target.x}
          </span>
          <span className="text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-mono flex items-center gap-1.5 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-emerald-600" />
            Acousticness (y): {target.y}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto cursor-crosshair grow"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
        >
          {/* Grid lines */}
          {ticks.map(t => {
            const [gx] = toSvg(t, 0);
            const [, gy] = toSvg(0, t);
            return (
              <g key={t} opacity="0.4">
                <line x1={gx} y1={PAD} x2={gx} y2={PAD + ph} stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1={PAD} y1={gy} x2={PAD + pw} y2={gy} stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
                <text x={gx} y={PAD + ph + 16} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">{t}</text>
                <text x={PAD - 8} y={gy + 3} textAnchor="end" fill="#64748b" fontSize="10" fontWeight="bold">{t}</text>
              </g>
            );
          })}

          {/* Axes */}
          <line x1={PAD} y1={PAD} x2={PAD} y2={PAD + ph} stroke="#475569" strokeWidth="1.5" />
          <line x1={PAD} y1={PAD + ph} x2={PAD + pw} y2={PAD + ph} stroke="#475569" strokeWidth="1.5" />

          {/* Helper Right-Triangle Visualization (Pythagorean) */}
          <g>
            {/* Base leg dx (horizontal) */}
            <line x1={tx} y1={ty} x2={sx} y2={ty} stroke="#E11D48" strokeWidth="1.8" strokeDasharray="4 4" opacity="0.85" />
            {/* Height leg dy (vertical) */}
            <line x1={sx} y1={ty} x2={sx} y2={sy} stroke="#0284C7" strokeWidth="1.8" strokeDasharray="4 4" opacity="0.85" />
            {/* Hypotenuse (Euclidean path) */}
            <line x1={tx} y1={ty} x2={sx} y2={sy} stroke="#10B981" strokeWidth="2.5" opacity="0.95" />

            {/* Label delta x */}
            <text x={(tx + sx) / 2} y={ty + (ty > sy ? 16 : -8)} textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="bold" className="font-mono"
              style={{ paintOrder: 'stroke', stroke: '#f8fafc', strokeWidth: 3.5 } as React.CSSProperties}>
              Δx = {Math.abs(dx)}
            </text>
            {/* Label delta y */}
            <text x={sx + (sx > tx ? 10 : -10)} y={(ty + sy) / 2 + 4} textAnchor={sx > tx ? 'start' : 'end'} fill="#0284C7" fontSize="11" fontWeight="bold" className="font-mono"
              style={{ paintOrder: 'stroke', stroke: '#f8fafc', strokeWidth: 3.5 } as React.CSSProperties}>
              Δy = {Math.abs(dy)}
            </text>
          </g>

          {/* Target points */}
          {SONGS.map(s => {
            const [px, py] = toSvg(s.x, s.y);
            const isSel = s.id === selectedSongId;
            return (
              <g key={s.id} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedSongId(s.id); }}>
                {isSel && (
                  <circle cx={px} cy={py} r={12} fill="none" stroke={s.color} strokeWidth="1.5" opacity="0.6" />
                )}
                <circle cx={px} cy={py} r={5} fill={s.color} stroke="#f8fafc" strokeWidth="1.5" />
                <text x={px} y={py - 12} textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold" style={{ paintOrder: 'stroke', stroke: '#f8fafc', strokeWidth: 3.5 } as React.CSSProperties}>
                  {s.label} ({s.x}, {s.y})
                </text>
              </g>
            );
          })}

          {/* Custom Track Target point */}
          <g>
            <circle cx={tx} cy={ty} r={8} fill="white" stroke="#10B981" strokeWidth="2.5" className="shadow-sm" />
            <circle cx={tx} cy={ty} r={3.5} fill="#10B981" />
            <text x={tx} y={ty - 14} textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="extrabold" style={{ paintOrder: 'stroke', stroke: '#f8fafc', strokeWidth: 3.5 } as React.CSSProperties}>
              Custom Track ({target.x}, {target.y})
            </text>
          </g>
        </svg>

        <div className="text-center text-xs text-slate-400 font-semibold mt-2">
          Drag anywhere on the grid to position the Custom Track. Click on songs to switch target distance.
        </div>
      </div>

      {/* Right side: Modern interactive stats & formulas */}
      <div className="flex-[40] flex flex-col justify-between gap-4 shrink-0 pt-1 pb-1 overflow-y-auto">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-3xl font-black text-slate-800 leading-tight">Euclidean Distance</h2>
            <p className="text-slate-500 text-sm font-semibold leading-relaxed mt-1">
              Geometrical straight-line distance, mapped exactly like the Pythagorean theorem in coordinate space.
            </p>
          </div>

          {/* Target Song Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Select Target Song</span>
            <div className="grid grid-cols-3 gap-2">
              {SONGS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSongId(s.id)}
                  className={`px-2 py-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    selectedSongId === s.id
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md scale-[1.02]'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Music className="w-4 h-4" style={{ color: selectedSongId === s.id ? '#ffffff' : s.color }} />
                  <span className="font-extrabold text-[10px] truncate w-full">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic math visualizer */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-inner">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-3">
              Pythagorean Calculation
            </span>
            <div className="flex flex-col gap-2.5 font-mono text-sm text-slate-600">
              <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-extrabold text-slate-700">Δx (Energy diff)</span>
                </div>
                <span className="font-black text-slate-900 text-base">
                  |{selectedSong.x} - {target.x}| = {Math.abs(dx)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-sky-500 animate-pulse" />
                  <span className="font-extrabold text-slate-700">Δy (Acousticness diff)</span>
                </div>
                <span className="font-black text-slate-900 text-base">
                  |{selectedSong.y} - {target.y}| = {Math.abs(dy)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-550/10 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                  <span className="font-black">Distance (d)</span>
                </div>
                <span className="font-black text-lg text-emerald-700">
                  √({Math.abs(dx)}² + {Math.abs(dy)}²) = {dist.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Formula representation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-2 right-2 opacity-10">
            <Award className="w-20 h-20 text-white" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-black">
            The Euclidean Formula
          </span>
          <div className="py-2 text-center text-lg">
            <KaTeXMath tex={`d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`} />
          </div>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed text-center">
            This simple relationship scales perfectly to 3D, 10D, or even 1,536D spaces by extending the sum under the square root.
          </p>
        </div>
      </div>
    </div>
  );
};
