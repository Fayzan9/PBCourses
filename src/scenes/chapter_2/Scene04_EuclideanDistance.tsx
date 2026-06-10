import React, { useState, useRef, useCallback } from 'react';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';
import { DEFS_MARKERS } from '../../components/PlotCanvas';

const AnnotatedEuclidCanvas: React.FC<{
  ax: number; ay: number;
  bx: number; by: number;
  onDrag: (x: number, y: number) => void;
}> = ({ ax, ay, bx, by, onDrag }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const W = 480, H = 480, PAD = 52;
  const pw = W - PAD * 2, ph = H - PAD * 2;

  const toSvg = (x: number, y: number): [number, number] => [
    PAD + (x / 100) * pw,
    PAD + ph - (y / 100) * ph,
  ];

  const svgToData = useCallback((clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = W / rect.width, scaleY = H / rect.height;
    const sx = (clientX - rect.left) * scaleX, sy = (clientY - rect.top) * scaleY;
    onDrag(
      Math.max(2, Math.min(98, ((sx - PAD) / pw) * 100)),
      Math.max(2, Math.min(98, (1 - (sy - PAD) / ph) * 100)),
    );
  }, [onDrag]);

  const [sAx, sAy] = toSvg(ax, ay);
  const [sBx, sBy] = toSvg(bx, by);
  const [sCx, sCy] = toSvg(bx, ay);

  const dx = bx - ax, dy = by - ay;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const mHx = (sAx + sCx) / 2, mHy = sCy;
  const mVx = sCx,              mVy = (sCy + sBy) / 2;
  const mDx = (sAx + sBx) / 2, mDy = (sAy + sBy) / 2;

  const boxSize = 10;
  const signX = dx >= 0 ? 1 : -1;
  const signY = dy >= 0 ? -1 : 1;

  const ticks = [0, 25, 50, 75, 100];

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full cursor-crosshair"
      onMouseDown={e => { dragging.current = true; svgToData(e.clientX, e.clientY); }}
      onMouseMove={e => { if (dragging.current) svgToData(e.clientX, e.clientY); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={e => { dragging.current = true; svgToData(e.touches[0].clientX, e.touches[0].clientY); }}
      onTouchMove={e => { if (dragging.current) svgToData(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {DEFS_MARKERS}
      <rect width={W} height={H} fill="white" rx="16" />

      {ticks.map(t => {
        const [xi] = toSvg(t, 0);
        const [, yi] = toSvg(0, t);
        return (
          <g key={t}>
            <line x1={xi} y1={PAD} x2={xi} y2={PAD + ph} stroke="#f1f5f9" strokeWidth="1" />
            <line x1={PAD} y1={yi} x2={PAD + pw} y2={yi} stroke="#f1f5f9" strokeWidth="1" />
            <text x={xi} y={PAD + ph + 16} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">{t}</text>
            <text x={PAD - 6} y={yi + 4} textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="bold">{t}</text>
          </g>
        );
      })}

      <line x1={PAD} y1={PAD} x2={PAD} y2={PAD + ph} stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={PAD} y1={PAD + ph} x2={PAD + pw} y2={PAD + ph} stroke="#cbd5e1" strokeWidth="1.5" />
      <text x={PAD + pw / 2} y={H - 4} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Action Rating</text>
      <text x={12} y={PAD + ph / 2} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" transform={`rotate(-90,12,${PAD + ph / 2})`}>Comedy Rating</text>

      <line x1={sAx} y1={sAy} x2={sCx} y2={sCy} stroke="#E11D48" strokeWidth="2" strokeDasharray="6 3" />
      <line x1={sCx} y1={sCy} x2={sBx} y2={sBy} stroke="#0284C7" strokeWidth="2" strokeDasharray="6 3" />

      <polyline
        points={`${sCx},${sCy - signY * boxSize} ${sCx + signX * boxSize},${sCy - signY * boxSize} ${sCx + signX * boxSize},${sCy}`}
        fill="none" stroke="#94a3b8" strokeWidth="1.5"
      />

      <line x1={sAx} y1={sAy} x2={sBx} y2={sBy} stroke="#059669" strokeWidth="3" />

      <rect x={mHx - 26} y={mHy + (dy >= 0 ? 6 : -22)} width="52" height="16" fill="white" rx="5" opacity="0.92" stroke="#E11D48" strokeWidth="1" />
      <text x={mHx} y={mHy + (dy >= 0 ? 18 : -10)} textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="bold">Δx = {Math.abs(dx).toFixed(0)}</text>

      <rect x={mVx + (dx >= 0 ? 6 : -58)} y={mVy - 8} width="52" height="16" fill="white" rx="5" opacity="0.92" stroke="#0284C7" strokeWidth="1" />
      <text x={mVx + (dx >= 0 ? 32 : -32)} y={mVy + 4} textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold">Δy = {Math.abs(dy).toFixed(0)}</text>

      <rect x={mDx - 32} y={mDy - 12} width="64" height="22" fill="#059669" rx="11" />
      <text x={mDx} y={mDy + 4} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">d = {dist.toFixed(1)}</text>

      <circle cx={sAx} cy={sAy} r="7" fill="#E11D48" />
      <rect x={sAx - 42} y={sAy - 32} width="84" height="20" fill="white" rx="5" opacity="0.95" stroke="#E11D48" strokeWidth="1.2" />
      <text x={sAx} y={sAy - 17} textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="bold">A [{ax}, {ay}]</text>

      <circle cx={sBx} cy={sBy} r="12" fill="none" stroke="#0284C7" strokeWidth="2" opacity="0.35" />
      <circle cx={sBx} cy={sBy} r="7" fill="#0284C7" />
      <rect x={sBx - 48} y={sBy - 32} width="96" height="20" fill="white" rx="5" opacity="0.95" stroke="#0284C7" strokeWidth="1.2" />
      <text x={sBx} y={sBy - 17} textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold">B [{bx.toFixed(0)}, {by.toFixed(0)}] ← drag</text>
    </svg>
  );
};

export const Scene2_4_EuclideanDistance: React.FC = () => {
  const ax = 25, ay = 30;
  const [bx, setBx] = useState(72);
  const [by, setBy] = useState(70);

  const dx = bx - ax, dy = by - ay;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const handleDrag = useCallback((x: number, y: number) => {
    setBx(parseFloat(x.toFixed(1)));
    setBy(parseFloat(y.toFixed(1)));
  }, []);

  return (
    <SlideLayout
      title="Euclidean Distance"
      text="The straight-line distance between two points — Pythagoras in disguise. Drag Movie B. Every label on the graph updates live."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">Step-by-step</div>
            <div className="flex flex-col gap-2 text-sm font-mono">
              <div className="flex items-center justify-between px-2 py-1.5 bg-rose-50 border border-rose-100 rounded-lg">
                <span className="text-rose-600 font-bold text-xs">Δx (horizontal gap)</span>
                <span className="font-black text-rose-700">{dx.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 bg-sky-50 border border-sky-100 rounded-lg">
                <span className="text-sky-600 font-bold text-xs">Δy (vertical gap)</span>
                <span className="font-black text-sky-700">{dy.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 text-xs">Δx² + Δy²</span>
                <span className="font-black text-slate-700">{(dx*dx + dy*dy).toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="text-emerald-700 font-bold text-xs">d = √( Δx² + Δy² )</span>
                <span className="text-2xl font-black text-emerald-600">{dist.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium leading-relaxed">
            <span className="font-bold block mb-1">💡 What the colors mean</span>
            <span className="flex items-center gap-2 mb-1"><span className="w-3 h-0.5 bg-rose-500 inline-block" /> Red dashes = horizontal gap (Δx)</span>
            <span className="flex items-center gap-2 mb-1"><span className="w-3 h-0.5 bg-sky-500 inline-block" /> Blue dashes = vertical gap (Δy)</span>
            <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-emerald-500 inline-block" /> Green = straight-line distance</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
            <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">Scales to n dimensions</div>
            <div className="flex justify-center">
              <KaTeXMath tex={`d = \\sqrt{\\sum_{i=1}^{n}(B_i - A_i)^2}`} />
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-2">
        <AnnotatedEuclidCanvas ax={ax} ay={ay} bx={bx} by={by} onDrag={handleDrag} />
      </div>
    </SlideLayout>
  );
};
