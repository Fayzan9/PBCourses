import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

// ── Data points ────────────────────────────────────────────────────────────
// Easy: two clusters a straight line can separate
const LINEAR_A = [[1.6,1.2],[2.1,2.0],[1.4,2.3],[2.4,1.5],[1.9,2.6],[2.7,2.1],[1.2,1.8],[2.2,1.1]];
const LINEAR_B = [[-1.6,-1.2],[-2.1,-2.0],[-1.4,-2.3],[-2.4,-1.5],[-1.9,-2.6],[-2.7,-2.1],[-1.2,-1.8],[-2.2,-1.1]];

// Hard: concentric rings — no straight line can separate these
const ring = (r: number, offsets: number[], jitter: number[]) =>
  offsets.map((deg, i) => {
    const rad = deg * Math.PI / 180;
    return [r * Math.cos(rad) + jitter[i*2], r * Math.sin(rad) + jitter[i*2+1]];
  });
const J = [0.15,-0.1,0.05,0.2,-0.15,0.1,-0.05,-0.2,0.1,-0.15,0.2,0.05,-0.1,0.15,0.0,0.1];
const RING_A = ring(1.15, [0,45,90,135,180,225,270,315], J);
const RING_B = ring(2.4,  [22,67,112,157,202,247,292,337], J.map(v => v * 1.2));

// ── SVG coordinate helpers ─────────────────────────────────────────────────
const W = 380, H = 380, CX = 190, CY = 190, SC = 58;
const sx = (x: number) => CX + x * SC;
const sy = (y: number) => CY - y * SC;

type Dataset = 'linear' | 'ring';
type Boundary = 'none' | 'line' | 'curve';

const DATASETS: { id: Dataset; label: string; sub: string }[] = [
  { id: 'linear', label: 'Easy — two clusters',   sub: 'A straight line can separate these' },
  { id: 'ring',   label: 'Hard — concentric rings', sub: 'No straight line works here' },
];

export const Scene4_18b_WhyNonLinear: React.FC = () => {
  const [dataset, setDataset] = useState<Dataset>('linear');
  const [boundary, setBoundary] = useState<Boundary>('none');

  const isLinear = dataset === 'linear';
  const ptsA = isLinear ? LINEAR_A : RING_A;
  const ptsB = isLinear ? LINEAR_B : RING_B;

  const boundaryWorks =
    (isLinear  && boundary === 'line')  ||
    (!isLinear && boundary === 'curve');

  const boundaryFails =
    (!isLinear && boundary === 'line');

  return (
    <SlideLayout
      title="A Line Can't Solve Everything"
      text="A matrix transformation always produces a straight decision boundary. But most real data doesn't cooperate."
      sidebarContent={
        <div className="flex flex-col gap-4">

          {/* Dataset selector */}
          <div className="flex flex-col gap-2">
            {DATASETS.map(d => (
              <button key={d.id} onClick={() => { setDataset(d.id); setBoundary('none'); }}
                className="text-left px-3 py-2.5 rounded-xl border text-xs transition-all cursor-pointer"
                style={dataset === d.id
                  ? { backgroundColor: '#0f172a', borderColor: '#0f172a', color: '#fff' }
                  : { backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#64748b' }}>
                <span className="font-black block">{d.label}</span>
                <span className="opacity-60 text-[10px]">{d.sub}</span>
              </button>
            ))}
          </div>

          {/* Boundary toggle */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Try a decision boundary</p>
            <button onClick={() => setBoundary(b => b === 'line' ? 'none' : 'line')}
              className="py-2.5 px-3 rounded-xl border text-xs font-black transition-all cursor-pointer"
              style={boundary === 'line'
                ? { backgroundColor: boundaryFails ? '#fff1f2' : '#f0fdf4', borderColor: boundaryFails ? '#E11D48' : '#10B981', color: boundaryFails ? '#E11D48' : '#10B981' }
                : { backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#64748b' }}>
              {boundary === 'line'
                ? (boundaryFails ? '✗  Straight line — fails' : '✓  Straight line — works!')
                : '↔  Try a straight line'}
            </button>
            {!isLinear && (
              <button onClick={() => setBoundary(b => b === 'curve' ? 'none' : 'curve')}
                className="py-2.5 px-3 rounded-xl border text-xs font-black transition-all cursor-pointer"
                style={boundary === 'curve'
                  ? { backgroundColor: '#f0fdf4', borderColor: '#10B981', color: '#10B981' }
                  : { backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#64748b' }}>
                {boundary === 'curve' ? '✓  Curved boundary — works!' : '○  Try a curved boundary'}
              </button>
            )}
          </div>

          {/* Key insight */}
          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">The takeaway</p>
            <p className="text-xs font-bold text-slate-700 leading-relaxed">
              {isLinear
                ? 'A single matrix can handle linearly separable data. But this is the easy case.'
                : 'Real data is often like the rings — a straight line will never work. You need a curve.'
              }
            </p>
          </div>

          <AnimatePresence>
            {boundaryFails && (
              <motion.div key="fail"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3">
                <p className="text-xs font-bold text-rose-700 leading-relaxed">
                  No matter how you tilt a straight line, red and blue will always mix on both sides.
                  <br /><span className="font-black">This is why we need nonlinearity.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          {/* Grid */}
          {[-3,-2,-1,0,1,2,3].map(i => (
            <g key={i}>
              <line x1={sx(i)} y1={14} x2={sx(i)} y2={H-14} stroke={i===0 ? '#cbd5e1' : '#f1f5f9'} strokeWidth={i===0 ? 1.5 : 1} />
              <line x1={14} y1={sy(i)} x2={W-14} y2={sy(i)} stroke={i===0 ? '#cbd5e1' : '#f1f5f9'} strokeWidth={i===0 ? 1.5 : 1} />
            </g>
          ))}

          {/* ── Decision boundaries ────────────────────────────────── */}
          <AnimatePresence>
            {boundary === 'line' && (
              <motion.line key="lineboundary"
                x1={sx(-3.2)} y1={sy(isLinear ? 0 : 0.5)}
                x2={sx(3.2)}  y2={sy(isLinear ? 0 : -0.5)}
                stroke={boundaryFails ? '#E11D48' : '#10B981'}
                strokeWidth="3" strokeDasharray={boundaryFails ? '8 5' : '0'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}
            {boundary === 'curve' && !isLinear && (
              <motion.circle key="curveboundary"
                cx={CX} cy={CY} r={1.8 * SC}
                fill="none" stroke="#10B981" strokeWidth="3"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
            )}

            {/* Failure lines: show 3 tilted attempts when line fails */}
            {boundaryFails && [30, 80, 140].map((deg, i) => {
              const rad = deg * Math.PI / 180;
              const ex = 3.0 * Math.cos(rad), ey = 3.0 * Math.sin(rad);
              return (
                <motion.line key={`fail${i}`}
                  x1={sx(-ex)} y1={sy(-ey)} x2={sx(ex)} y2={sy(ey)}
                  stroke="#E11D48" strokeWidth="1.5" opacity={0.25} strokeDasharray="6 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  transition={{ delay: i * 0.12 }}
                />
              );
            })}
          </AnimatePresence>

          {/* ── Data points ────────────────────────────────────────── */}
          {ptsA.map(([x, y], i) => (
            <motion.circle
              key={`a${i}-${dataset}`}
              cx={sx(x)} cy={sy(y)} r={7}
              fill="#E11D48" stroke="#fff" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 300 }}
            />
          ))}
          {ptsB.map(([x, y], i) => (
            <motion.circle
              key={`b${i}-${dataset}`}
              cx={sx(x)} cy={sy(y)} r={7}
              fill="#0284C7" stroke="#fff" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04 + 0.15, type: 'spring', stiffness: 300 }}
            />
          ))}

          {/* Legend */}
          <circle cx={18} cy={H-18} r={6} fill="#E11D48" />
          <text x={28} y={H-14} fontSize="10" fontWeight="700" fill="#94a3b8">Class A</text>
          <circle cx={80} cy={H-18} r={6} fill="#0284C7" />
          <text x={90} y={H-14} fontSize="10" fontWeight="700" fill="#94a3b8">Class B</text>

          {/* Boundary result label */}
          <AnimatePresence>
            {boundaryWorks && (
              <motion.g key="works"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <rect x={W/2-48} y={12} width={96} height={22} rx={8} fill="#f0fdf4" stroke="#86efac" />
                <text x={W/2} y={27} textAnchor="middle" fontSize="11" fontWeight="800" fill="#16a34a">✓ Separates!</text>
              </motion.g>
            )}
            {boundaryFails && (
              <motion.g key="fails"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <rect x={W/2-52} y={12} width={104} height={22} rx={8} fill="#fff1f2" stroke="#fca5a5" />
                <text x={W/2} y={27} textAnchor="middle" fontSize="11" fontWeight="800" fill="#E11D48">✗ Fails to separate</text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>
    </SlideLayout>
  );
};
export default Scene4_18b_WhyNonLinear;
