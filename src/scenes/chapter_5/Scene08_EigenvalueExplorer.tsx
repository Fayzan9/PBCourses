import React, { useState } from 'react';
import { type Vec2, type Mat2, mulMV, fmt } from '../../components/mathHelpers';
import { SlideLayout } from '../../components/SlideLayout';
import { VecLabel } from '../../components/TransformGrid';

const MARKER_DEFS = (
  <defs>
    {([
      ['red', '#E11D48'], ['blue', '#0284C7'], ['green', '#059669'],
      ['slate', '#64748B'], ['violet', '#7C3AED'], ['amber', '#D97706'],
      ['emerald', '#10B981'], ['rose', '#FB7185'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`c5-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
  </defs>
);

export const Scene5_8_EigenvalueExplorer: React.FC = () => {
  const [λ, setLambda] = useState(2.0);
  const M: Mat2 = [[λ, 0], [0, 1]];
  const ev: Vec2 = [1, 0];
  const transformed = mulMV(M, ev);

  const description = λ > 1 ? 'stretched' : λ > 0 ? 'squished' : λ === 0 ? 'collapsed to zero' : 'flipped & scaled';
  const descColor = λ > 1 ? 'text-emerald-700' : λ > 0 ? 'text-amber-700' : λ === 0 ? 'text-rose-700' : 'text-violet-700';
  const pct = ((λ + 3) / 6) * 100;

  const W = 440, H = 440, CX = W / 2, CY = H / 2, SC = 80;
  const beforeTip: [number, number] = [CX + ev[0] * SC, CY - ev[1] * SC];
  const afterTip: [number, number] = [CX + transformed[0] * SC, CY - transformed[1] * SC];
  const badgeColor = λ > 1 ? '#059669' : λ > 0 ? '#D97706' : λ === 0 ? '#E11D48' : '#7C3AED';

  return (
    <SlideLayout
      title="Feel the Eigenvalue"
      text="Drag λ and watch what happens to v = [1,0]. The dashed arrow is the 'before'. The solid arrow is 'after' M is applied. Same direction — just scaled by λ."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Eigenvalue λ</span>
              <span className="text-2xl font-black font-mono text-emerald-600">{λ.toFixed(1)}</span>
            </div>
            <input type="range" min="-3" max="3" step="0.1" value={λ}
              onChange={e => setLambda(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2"
              style={{ background: `linear-gradient(to right, #10B981 0%, #10B981 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }} />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>−3</span><span>0</span><span>+3</span>
            </div>
          </div>

          <div className={`rounded-xl p-3 border text-sm font-bold transition-all ${descColor} ${
            λ > 1 ? 'bg-emerald-50 border-emerald-200' :
            λ > 0 ? 'bg-amber-50 border-amber-200' :
            λ === 0 ? 'bg-rose-50 border-rose-200' : 'bg-violet-50 border-violet-200'}`}>
            eigenvector is <span className="underline">{description}</span>
          </div>

          {[
            { label: 'v (before)', val: `[${ev[0]}, ${ev[1]}]`, color: '#94a3b8' },
            { label: 'M · v (after)', val: `[${fmt(transformed[0])}, ${fmt(transformed[1])}]`, color: '#059669' },
            { label: 'λ · v', val: `[${fmt(λ * ev[0])}, ${fmt(λ * ev[1])}]`, color: '#7C3AED' },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold">
              <span className="text-slate-500">{row.label}</span>
              <span style={{ color: row.color }}>{row.val}</span>
            </div>
          ))}
          <div className="text-[11px] text-slate-400 font-medium text-center">M·v and λ·v are always identical — that's the whole point!</div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          {MARKER_DEFS}
          <rect width={W} height={H} fill="white" rx="16" />
          {[-3,-2,-1,0,1,2,3].map(i => {
            const isAxis = i === 0;
            return (
              <g key={i}>
                <line x1={CX + i*SC} y1={CY - 3*SC} x2={CX + i*SC} y2={CY + 3*SC}
                  stroke={isAxis ? '#94a3b8' : '#f1f5f9'} strokeWidth={isAxis ? 1.5 : 0.8} />
                <line x1={CX - 3*SC} y1={CY - i*SC} x2={CX + 3*SC} y2={CY - i*SC}
                  stroke={isAxis ? '#94a3b8' : '#f1f5f9'} strokeWidth={isAxis ? 1.5 : 0.8} />
                {i !== 0 && <text x={CX + i*SC} y={CY + 16} textAnchor="middle" fill="#cbd5e1" fontSize="9">{i}</text>}
                {i !== 0 && <text x={CX + 6} y={CY - i*SC + 4} fill="#cbd5e1" fontSize="9">{i}</text>}
              </g>
            );
          })}
          <line x1={CX} y1={CY} x2={beforeTip[0]} y2={beforeTip[1]}
            stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#c5-slate)" />
          <VecLabel x={beforeTip[0]} y={beforeTip[1]} text={`v = [${ev[0]},${ev[1]}]`}
            color="#94a3b8" offsetX={8} offsetY={-24} />
          {λ !== 0 && (
            <>
              <line x1={CX} y1={CY} x2={afterTip[0]} y2={afterTip[1]}
                stroke={badgeColor} strokeWidth="3.5" markerEnd={`url(#c5-${λ > 0 ? 'green' : 'violet'})`} />
              <VecLabel x={afterTip[0]} y={afterTip[1]}
                text={`M·v = [${fmt(transformed[0])},${fmt(transformed[1])}]`}
                color={badgeColor} offsetX={8} offsetY={-10} />
            </>
          )}
          <rect x={8} y={8} width={165} height={38} rx="8" fill={badgeColor} opacity="0.9" />
          <text x={90} y={23} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            M·v = λ·v
          </text>
          <text x={90} y={37} textAnchor="middle" fill="white" fontSize="10" opacity="0.85">
            = {λ.toFixed(1)} × [1,0] = [{fmt(transformed[0])},{fmt(transformed[1])}]
          </text>
          <circle cx={CX} cy={CY} r="5" fill="#0f172a" />
        </svg>
      </div>
    </SlideLayout>
  );
};
