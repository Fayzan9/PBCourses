import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';

type Phase = 'none' | 'rotate1' | 'stretch' | 'rotate2' | 'done';

const PHASES: Phase[] = ['none', 'rotate1', 'stretch', 'rotate2', 'done'];

const phaseInfo: Record<Phase, { label: string; color: string; desc: string; svgNote: string }> = {
  none:    { label: 'Start', color: '#94a3b8', desc: 'A unit circle sits in input space.', svgNote: 'Input space' },
  rotate1: { label: 'Step 1: Rotate', color: '#7C3AED', desc: "Align with the matrix's favorite directions. No stretching yet — just rotation.", svgNote: 'Rotate to align' },
  stretch: { label: 'Step 2: Stretch', color: '#D97706', desc: 'Stretch some directions a lot. Others a little. This is where singular values appear.', svgNote: 'Stretch' },
  rotate2: { label: 'Step 3: Rotate', color: '#059669', desc: 'One final rotation to land in output space.', svgNote: 'Rotate to output' },
  done:    { label: 'A = U Σ Vᵀ', color: '#0891B2', desc: 'Three simple operations. Every matrix. No exceptions.', svgNote: 'Output space' },
};

function drawEllipse(cx: number, cy: number, rx: number, ry: number, angle: number) {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  const N = 80;
  const pts = Array.from({ length: N }, (_, i) => {
    const t = (i / N) * 2 * Math.PI;
    const x = rx * Math.cos(t), y = ry * Math.sin(t);
    return [cx + cos * x - sin * y, cy + sin * x + cos * y];
  });
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';
}

export const Scene6_8_ThreeSteps: React.FC = () => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const phase = PHASES[phaseIdx];
  const info = phaseInfo[phase];

  const W = 480, H = 480, CX = W / 2, CY = H / 2, SC = 80;

  // Animated shape parameters per phase
  const shapeParams: Record<Phase, { rx: number; ry: number; angle: number; fill: string }> = {
    none:    { rx: SC,        ry: SC,        angle: 0,              fill: '#0891B2' },
    rotate1: { rx: SC,        ry: SC,        angle: Math.PI / 6,    fill: '#7C3AED' },
    stretch: { rx: SC * 2.4,  ry: SC * 0.55, angle: Math.PI / 6,    fill: '#D97706' },
    rotate2: { rx: SC * 2.4,  ry: SC * 0.55, angle: -Math.PI / 8,   fill: '#059669' },
    done:    { rx: SC * 2.4,  ry: SC * 0.55, angle: -Math.PI / 8,   fill: '#0891B2' },
  };

  const sp = shapeParams[phase];
  const pathD = drawEllipse(CX, CY, sp.rx, sp.ry, sp.angle);

  const prev = () => setPhaseIdx(i => Math.max(0, i - 1));
  const next = () => setPhaseIdx(i => Math.min(PHASES.length - 1, i + 1));

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          <rect width={W} height={H} fill="white" rx="16" />
          {[-3,-2,-1,0,1,2,3].map(i => (
            <g key={i}>
              <line x1={CX+i*SC} y1={18} x2={CX+i*SC} y2={H-18} stroke={i===0?'#94a3b8':'#f1f5f9'} strokeWidth={i===0?1.5:0.8}/>
              <line x1={18} y1={CY-i*SC} x2={W-18} y2={CY-i*SC} stroke={i===0?'#94a3b8':'#f1f5f9'} strokeWidth={i===0?1.5:0.8}/>
            </g>
          ))}

          {/* Ghost of circle */}
          {phase !== 'none' && (
            <circle cx={CX} cy={CY} r={SC} fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5 4" />
          )}

          <motion.path
            d={pathD}
            fill={sp.fill}
            fillOpacity={0.18}
            stroke={sp.fill}
            strokeWidth="2.5"
            animate={{ d: pathD, stroke: sp.fill, fill: sp.fill }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />

          {/* Step label */}
          <text x={CX} y={H - 28} textAnchor="middle" fill={info.color} fontSize="13" fontWeight="bold">
            {info.svgNote}
          </text>

          {/* Rotation indicator for rotate phases */}
          {(phase === 'rotate1' || phase === 'rotate2') && (
            <g>
              <path
                d={`M ${CX + 30} ${CY} A 30 30 0 0 ${phase === 'rotate1' ? 1 : 0} ${CX + 30 * Math.cos(sp.angle)} ${CY + 30 * Math.sin(sp.angle)}`}
                fill="none" stroke={sp.fill} strokeWidth="2" strokeDasharray="5 3"
              />
              <text x={CX + 40} y={CY - 28} fill={sp.fill} fontSize="11" fontWeight="bold">↻</text>
            </g>
          )}
        </svg>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
            The Three‑Step Magic
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Every matrix — no matter how ugly — is secretly doing only <strong>three things.</strong>
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2">
          {PHASES.filter(p => p !== 'none' && p !== 'done').map((p, i) => (
            <div key={p} className={`flex-1 h-2 rounded-full transition-all duration-500 ${
              phaseIdx > i + 1 ? 'opacity-100' : phaseIdx === i + 1 ? 'opacity-100' : 'opacity-20'
            }`} style={{ backgroundColor: phaseInfo[p].color }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-5 border-2"
            style={{ borderColor: info.color + '44', backgroundColor: info.color + '0D' }}
          >
            <p className="font-black text-xl mb-1" style={{ color: info.color }}>{info.label}</p>
            <p className="text-slate-600 text-base font-medium leading-relaxed">{info.desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* All three steps summary */}
        {phaseIdx >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 text-white rounded-2xl p-4"
          >
            <p className="font-black text-base text-cyan-400 mb-2">Every matrix. Every time.</p>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-violet-300 font-bold">Rotate</span>
              <span className="text-slate-400">→</span>
              <span className="text-amber-300 font-bold">Stretch</span>
              <span className="text-slate-400">→</span>
              <span className="text-emerald-300 font-bold">Rotate</span>
            </div>
          </motion.div>
        )}

        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={phaseIdx === 0}
            className="flex-1 py-3 border border-slate-200 text-slate-500 font-bold rounded-2xl text-base cursor-pointer hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <button
            onClick={next}
            disabled={phaseIdx === PHASES.length - 1}
            className="flex-1 py-3 bg-cyan-600 text-white font-black rounded-2xl text-base cursor-pointer hover:bg-cyan-700 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};
