import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Vec2, type Mat2, mulMV, fmt } from '../../components/mathHelpers';
import { SlideLayout } from '../../components/SlideLayout';
import { VecLabel } from '../../components/TransformGrid';

const W = 460, H = 460, CX = W / 2, CY = H / 2, SC = 82;

type Region = 'stretch' | 'squish' | 'zero' | 'flip';
function classify(λ: number): { region: Region; label: string; hex: string; markerName: string } {
  if (λ > 1)   return { region: 'stretch', label: 'stretched',         hex: '#059669', markerName: 'emerald' };
  if (λ > 0)   return { region: 'squish',  label: 'squished',          hex: '#D97706', markerName: 'amber'   };
  if (λ === 0) return { region: 'zero',    label: 'collapsed to zero', hex: '#E11D48', markerName: 'red'     };
  return             { region: 'flip',     label: 'flipped & scaled',  hex: '#7C3AED', markerName: 'violet'  };
}

const DEFS = (
  <defs>
    {([
      ['emerald', '#10B981'], ['amber', '#D97706'], ['red', '#E11D48'],
      ['violet', '#7C3AED'], ['slate', '#64748B'], ['blue', '#0284C7'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`c5ev-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
    <radialGradient id="c5ev-bg" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stopColor="#f0f9ff" />
      <stop offset="100%" stopColor="#f1f5f9" />
    </radialGradient>
  </defs>
);

export const Scene5_8_EigenvalueExplorer: React.FC = () => {
  const [λ, setLambda] = useState(2.0);
  const M: Mat2 = [[λ, 0], [0, 1]];
  const ev: Vec2 = [1, 0];
  const transformed = mulMV(M, ev);
  const { label, hex: color, markerName } = classify(λ);
  const pct = ((λ + 3) / 6) * 100;

  const beforeTip: [number, number] = [CX + SC, CY];                          // [1,0]
  const afterTip:  [number, number] = [CX + transformed[0] * SC, CY];         // [λ,0]
  const unitX = CX + SC;                                                        // pixel x of unit length

  // Stretch band: from unit tip to after-tip
  const bandLeft  = Math.min(unitX, afterTip[0]);
  const bandRight = Math.max(unitX, afterTip[0]);
  const bandWidth = bandRight - bandLeft;

  return (
    <SlideLayout
      title="Feel the Eigenvalue"
      text="Drag λ and watch what happens to v = [1, 0]. The dashed arrow is 'before'. The solid arrow is 'after' M is applied. Same direction — just scaled by λ."
      sidebarContent={
        <div className="flex flex-col gap-4">
          {/* λ slider */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Eigenvalue λ</span>
              <motion.span key={λ.toFixed(1)}
                initial={{ scale: 1.3, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-black font-mono" style={{ color }}>
                {λ.toFixed(1)}
              </motion.span>
            </div>
            <input type="range" min="-3" max="3" step="0.1" value={λ}
              onChange={e => setLambda(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2.5"
              style={{ background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }} />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
              <span>−3 (flip)</span><span>0</span><span>+3 (stretch)</span>
            </div>
          </div>

          {/* Region indicator */}
          <AnimatePresence mode="wait">
            <motion.div key={label}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              className="rounded-xl p-3 border text-sm font-bold"
              style={{ background: `${color}18`, borderColor: `${color}50`, color }}>
              eigenvector is <span className="underline decoration-2">{label}</span>
            </motion.div>
          </AnimatePresence>

          {/* Value table */}
          {[
            { label: 'v (before)',  val: `[1, 0]`,                                  clr: '#64748B' },
            { label: 'M · v',      val: `[${fmt(transformed[0])}, 0]`,             clr: color    },
            { label: 'λ · v',      val: `[${fmt(λ)}, 0]`,                          clr: '#7C3AED' },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold">
              <span className="text-slate-500">{row.label}</span>
              <span style={{ color: row.clr }}>{row.val}</span>
            </div>
          ))}

          <div className="bg-slate-800 rounded-xl px-3 py-2.5 text-center">
            <span className="text-white font-mono font-black text-sm">M·v = λ·v</span>
            <span className="text-slate-400 font-mono text-xs ml-2">always equal</span>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          {DEFS}

          {/* Background */}
          <rect width={W} height={H} fill="url(#c5ev-bg)" rx="18" />

          {/* Grid */}
          {[-3,-2,-1,0,1,2,3].map(i => {
            const isAxis = i === 0;
            return (
              <g key={i}>
                <line x1={CX + i*SC} y1={16} x2={CX + i*SC} y2={H-16}
                  stroke={isAxis ? '#7e93a8' : '#dde3ec'} strokeWidth={isAxis ? 1.8 : 1} />
                <line x1={16} y1={CY - i*SC} x2={W-16} y2={CY - i*SC}
                  stroke={isAxis ? '#7e93a8' : '#dde3ec'} strokeWidth={isAxis ? 1.8 : 1} />
                {i !== 0 && (
                  <>
                    <line x1={CX + i*SC} y1={CY-4} x2={CX + i*SC} y2={CY+4} stroke="#94a3b8" strokeWidth="1.2" />
                    <text x={CX + i*SC} y={CY+18} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">{i}</text>
                    <line x1={CX-4} y1={CY - i*SC} x2={CX+4} y2={CY - i*SC} stroke="#94a3b8" strokeWidth="1.2" />
                    <text x={CX-10} y={CY - i*SC + 4} textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="600">{i}</text>
                  </>
                )}
              </g>
            );
          })}
          {/* Axis labels */}
          <text x={W-18} y={CY-8} fill="#7e93a8" fontSize="13" fontWeight="700">x</text>
          <text x={CX+9} y={20}   fill="#7e93a8" fontSize="13" fontWeight="700">y</text>

          {/* Unit circle — reference ring */}
          <circle cx={CX} cy={CY} r={SC}
            fill="none" stroke="#b8c4d0" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.8" />
          <text x={unitX + 5} y={CY - 8} fill="#94a3b8" fontSize="9" fontWeight="600">|v|=1</text>

          {/* Stretch / squish band between unit tip and after-tip */}
          {λ !== 0 && λ !== 1 && bandWidth > 2 && (
            <rect x={bandLeft} y={CY - 10} width={bandWidth} height={20}
              fill={color} opacity="0.14" rx="4" />
          )}

          {/* Before vector — dashed slate */}
          <line x1={CX} y1={CY} x2={beforeTip[0]} y2={beforeTip[1]}
            stroke="#64748B" strokeWidth="2.5" strokeDasharray="8 5"
            markerEnd="url(#c5ev-slate)" />
          <VecLabel x={beforeTip[0]} y={beforeTip[1]} text="v = [1, 0]"
            color="#64748B" offsetX={10} offsetY={-28} />
          <text x={beforeTip[0] + 12} y={beforeTip[1] + 8} fill="#94a3b8" fontSize="9" fontWeight="600">BEFORE</text>

          {/* After vector */}
          {λ !== 0 && (
            <motion.g key={`vec-${λ.toFixed(1)}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
              {/* Glow halo */}
              <line x1={CX} y1={CY} x2={afterTip[0]} y2={afterTip[1]}
                stroke={color} strokeWidth={14} strokeLinecap="round" opacity={0.18} />
              {/* Main vector */}
              <line x1={CX} y1={CY} x2={afterTip[0]} y2={afterTip[1]}
                stroke={color} strokeWidth={4}
                markerEnd={`url(#c5ev-${markerName})`} />
              {/* Tip dot */}
              <circle cx={afterTip[0]} cy={afterTip[1]} r={5.5} fill={color} />
              <circle cx={afterTip[0]} cy={afterTip[1]} r={9} fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
              <VecLabel x={afterTip[0]} y={afterTip[1]}
                text={`M·v = [${fmt(transformed[0])}, 0]`}
                color={color} offsetX={10} offsetY={14} />
              <text x={afterTip[0] + 12} y={afterTip[1] + 26} fill={color} fontSize="9" fontWeight="600">AFTER</text>
            </motion.g>
          )}

          {/* Collapsed dot when λ = 0 */}
          {λ === 0 && (
            <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <circle cx={CX} cy={CY} r={18} fill="#FEE2E2" stroke="#E11D48" strokeWidth="2" />
              <text x={CX} y={CY + 4} textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="900">0</text>
            </motion.g>
          )}

          {/* Scale factor badge — top left */}
          <rect x={10} y={10} width={194} height={44} rx="10" fill="#0f172a" opacity="0.9" />
          <text x={105} y={28} textAnchor="middle" fill="white" fontSize="12" fontWeight="800">M·v = λ·v</text>
          <text x={105} y={44} textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
            {`= ${λ.toFixed(1)} × [1,0] = [${fmt(transformed[0])}, 0]`}
          </text>

          {/* λ scale ruler at bottom */}
          {(() => {
            const rulerY = H - 28, rulerLeft = CX - 3 * SC, rulerRight = CX + 3 * SC;
            const thumbX = CX + Math.max(-3, Math.min(3, λ)) * SC;
            return (
              <g opacity="0.6">
                <line x1={rulerLeft} y1={rulerY} x2={rulerRight} y2={rulerY}
                  stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1={CX} y1={rulerY - 5} x2={CX} y2={rulerY + 5} stroke="#94a3b8" strokeWidth="1.5" />
                <text x={CX} y={rulerY + 16} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">λ=0</text>
                <circle cx={thumbX} cy={rulerY} r="5" fill={color} />
              </g>
            );
          })()}

          {/* Origin */}
          <circle cx={CX} cy={CY} r={5.5} fill="#0f172a" />
          <circle cx={CX} cy={CY} r={10} fill="none" stroke="#0f172a" strokeWidth="1.2" opacity="0.15" />
        </svg>
      </div>
    </SlideLayout>
  );
};
