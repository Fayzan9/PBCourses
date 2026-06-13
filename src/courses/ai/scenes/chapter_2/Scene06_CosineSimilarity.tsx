import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';

const AnnotatedCosineCanvas: React.FC<{
  ax: number; ay: number;
  bx: number; by: number;
  lenA: number; lenB: number;
  cosSim: number; thetaDeg: number;
}> = ({ ax, ay, bx, by, lenA, lenB, cosSim, thetaDeg }) => {
  const W = 460, H = 460, CX = W / 2, CY = H / 2, SC = 68;

  const tipAx = CX + ax * SC, tipAy = CY - ay * SC;
  const tipBx = CX + bx * SC, tipBy = CY - by * SC;

  const arcR = SC * 1.4;
  const angA = Math.atan2(-ay, ax);
  const angB = Math.atan2(-by, bx);
  let startAng = angA, endAng = angB;
  let diff = endAng - startAng;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  const arcX1 = CX + arcR * Math.cos(startAng);
  const arcY1 = CY + arcR * Math.sin(startAng);
  const arcX2 = CX + arcR * Math.cos(startAng + diff);
  const arcY2 = CY + arcR * Math.sin(startAng + diff);
  const largeArc = Math.abs(diff) > Math.PI ? 1 : 0;
  const sweep = diff > 0 ? 1 : 0;

  const midAng = startAng + diff / 2;
  const lblR = arcR + 16;
  const lblX = CX + lblR * Math.cos(midAng);
  const lblY = CY + lblR * Math.sin(midAng);

  const badgeColor = cosSim > 0.5 ? '#059669' : cosSim > 0.1 ? '#D97706' : cosSim > -0.1 ? '#64748B' : '#E11D48';

  const gridTicks = [-2, -1, 0, 1, 2];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
      <defs>
        <marker id="cos-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#E11D48" />
        </marker>
        <marker id="cos-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
        </marker>
      </defs>
      <rect width={W} height={H} fill="white" rx="16" />

      {gridTicks.map(t => {
        const xi = CX + t * SC, yi = CY - t * SC;
        return (
          <g key={t}>
            <line x1={xi} y1={28} x2={xi} y2={H - 28} stroke={t === 0 ? '#cbd5e1' : '#f1f5f9'} strokeWidth={t === 0 ? 1.5 : 1} />
            <line x1={28} y1={yi} x2={W - 28} y2={yi} stroke={t === 0 ? '#cbd5e1' : '#f1f5f9'} strokeWidth={t === 0 ? 1.5 : 1} />
            {t !== 0 && <text x={xi} y={CY + 16} textAnchor="middle" fill="#94a3b8" fontSize="10">{t}</text>}
            {t !== 0 && <text x={CX + 10} y={yi + 4} fill="#94a3b8" fontSize="10">{t}</text>}
          </g>
        );
      })}

      {Math.abs(diff) > 0.02 && (
        <path
          d={`M ${arcX1} ${arcY1} A ${arcR} ${arcR} 0 ${largeArc} ${sweep} ${arcX2} ${arcY2}`}
          fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 2"
        />
      )}

      <rect x={lblX - 22} y={lblY - 10} width="44" height="18" fill="#7C3AED" rx="9" opacity="0.9" />
      <text x={lblX} y={lblY + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">θ={thetaDeg.toFixed(0)}°</text>

      <line x1={CX} y1={CY} x2={tipAx} y2={tipAy} stroke="#E11D48" strokeWidth="3" markerEnd="url(#cos-red)" />
      <rect x={tipAx - 48} y={tipAy - 28} width="96" height="20" fill="white" rx="5" opacity="0.95" stroke="#E11D48" strokeWidth="1.2" />
      <text x={tipAx} y={tipAy - 13} textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="bold">A = [{(ax * lenA / 10).toFixed(1)}, {(ay * lenA / 10).toFixed(1)}]</text>

      <line x1={CX} y1={CY} x2={tipBx} y2={tipBy} stroke="#0284C7" strokeWidth="3" markerEnd="url(#cos-blue)" />
      <rect x={tipBx - 48} y={tipBy - 28} width="96" height="20" fill="white" rx="5" opacity="0.95" stroke="#0284C7" strokeWidth="1.2" />
      <text x={tipBx} y={tipBy - 13} textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold">B = [{(bx * lenB / 10).toFixed(1)}, {(by * lenB / 10).toFixed(1)}]</text>

      <circle cx={CX} cy={CY} r="5" fill="#0f172a" />
      <text x={CX + 8} y={CY + 16} fill="#64748B" fontSize="10" fontWeight="bold">origin</text>

      <rect x={32} y={32} width="130" height="48" fill="white" rx="12" stroke={badgeColor} strokeWidth="2" />
      <text x={97} y={50} textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">cos similarity</text>
      <text x={97} y={72} textAnchor="middle" fill={badgeColor} fontSize="22" fontWeight="900">{cosSim.toFixed(3)}</text>

      <text x={CX + (ax * SC) / 2 + 8} y={CY - (ay * SC) / 2 + 4} fill="#E11D48" fontSize="10" fontWeight="bold" opacity="0.7">|A|={lenA}</text>
      <text x={CX + (bx * SC) / 2 - 8} y={CY - (by * SC) / 2 + 16} fill="#0284C7" fontSize="10" fontWeight="bold" opacity="0.7">|B|={lenB}</text>
    </svg>
  );
};

export const Scene2_6_CosineSimilarity: React.FC = () => {
  const [angleA, setAngleA] = useState(55);
  const [angleB, setAngleB] = useState(25);
  const [lenA, setLenA] = useState(25);
  const [lenB, setLenB] = useState(30);

  const toUnitVec = (angleDeg: number) => ({
    x: Math.cos((angleDeg * Math.PI) / 180),
    y: Math.sin((angleDeg * Math.PI) / 180),
  });

  const uA = toUnitVec(angleA);
  const uB = toUnitVec(angleB);

  const dot = uA.x * uB.x + uA.y * uB.y;
  const cosSim = Math.min(1, Math.max(-1, dot));
  const thetaDeg = (Math.acos(cosSim) * 180) / Math.PI;

  const scA = lenA / 10, scB = lenB / 10;

  const presets = [
    { label: '🟢 Same direction', aA: 40, aB: 40, lA: 45, lB: 80 },
    { label: '⬜ Perpendicular', aA: 90, aB: 0, lA: 65, lB: 65 },
    { label: '🔴 Opposite', aA: 0, aB: 180, lA: 65, lB: 65 },
    { label: '🔵 Small angle (similar)', aA: 50, aB: 35, lA: 55, lB: 70 },
  ];

  const cosLabel =
    cosSim > 0.95 ? 'Identical direction' :
    cosSim > 0.7  ? 'Very similar' :
    cosSim > 0.3  ? 'Somewhat similar' :
    cosSim > -0.1 ? 'Unrelated (perpendicular)' :
    cosSim > -0.7 ? 'Somewhat opposing' : 'Opposite direction';

  const pctA = ((angleA + 0) / 360) * 100;
  const pctB = ((angleB + 0) / 360) * 100;

  return (
    <SlideLayout
      title="Cosine Similarity"
      text="Only the angle between vectors matters — length is ignored. Change the angles and watch the score. Try Same Direction vs Opposite."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className={`rounded-2xl p-4 border flex items-center justify-between transition-all ${
            cosSim > 0.5 ? 'bg-emerald-50 border-emerald-200' :
            cosSim > 0.1 ? 'bg-amber-50 border-amber-200' :
            cosSim > -0.1 ? 'bg-slate-50 border-slate-200' : 'bg-rose-50 border-rose-200'
          }`}>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold opacity-50 mb-1">Cosine Score</div>
              <div className={`text-3xl font-black font-mono ${cosSim > 0.5 ? 'text-emerald-600' : cosSim > -0.1 ? 'text-amber-600' : 'text-rose-600'}`}>
                {cosSim.toFixed(3)}
              </div>
              <div className="text-xs font-semibold mt-1 opacity-70">{cosLabel}</div>
            </div>
            <div className="text-4xl">{cosSim > 0.7 ? '🎯' : cosSim > 0.1 ? '↗' : cosSim > -0.1 ? '↔' : '↙'}</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col gap-3">
            {[
              { label: 'Angle A', val: angleA, set: setAngleA, max: 360, color: '#E11D48', pct: pctA },
              { label: 'Angle B', val: angleB, set: setAngleB, max: 360, color: '#0284C7', pct: pctB },
            ].map(sl => (
              <div key={sl.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold" style={{ color: sl.color }}>{sl.label}</span>
                  <span className="text-sm font-black font-mono" style={{ color: sl.color }}>{sl.val}°</span>
                </div>
                <input type="range" min="0" max="360" step="1" value={sl.val}
                  onChange={e => sl.set(Number(e.target.value))}
                  className="w-full appearance-none cursor-pointer rounded-full h-2"
                  style={{ background: `linear-gradient(to right, ${sl.color} 0%, ${sl.color} ${(sl.val/360)*100}%, #e2e8f0 ${(sl.val/360)*100}%, #e2e8f0 100%)` }}
                />
              </div>
            ))}
            <div className="border-t border-slate-100 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lengths (don't affect score!)</span>
              </div>
              {[
                { label: '|A|', val: lenA, set: setLenA, color: '#E11D48' },
                { label: '|B|', val: lenB, set: setLenB, color: '#0284C7' },
              ].map(sl => (
                <div key={sl.label} className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold" style={{ color: sl.color }}>{sl.label}</span>
                    <span className="text-xs font-black font-mono" style={{ color: sl.color }}>{sl.val}</span>
                  </div>
                  <input type="range" min="20" max="100" step="2" value={sl.val}
                    onChange={e => sl.set(Number(e.target.value))}
                    className="w-full appearance-none cursor-pointer rounded-full h-1.5"
                    style={{ background: `linear-gradient(to right, ${sl.color} 0%, ${sl.color} ${((sl.val-20)/80)*100}%, #e2e8f0 ${((sl.val-20)/80)*100}%, #e2e8f0 100%)` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {presets.map((p, i) => (
              <button key={i}
                onClick={() => { setAngleA(p.aA); setAngleB(p.aB); setLenA(p.lA); setLenB(p.lB); }}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-600 text-left cursor-pointer transition-all active:scale-95">
                {p.label}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-2">
        <AnnotatedCosineCanvas
          ax={uA.x * scA} ay={uA.y * scA}
          bx={uB.x * scB} by={uB.y * scB}
          lenA={lenA} lenB={lenB}
          cosSim={cosSim} thetaDeg={thetaDeg}
        />
      </div>
    </SlideLayout>
  );
};
