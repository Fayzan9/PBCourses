import React from 'react';
import { motion } from 'framer-motion';
import { type Vec2 } from '../../components/mathHelpers';
import { SlideLayout } from '../../components/SlideLayout';
import { useSlideState } from '../../components/CourseStateContext';

const makeCloudPoints = (n: number, θ: number): Vec2[] => {
  const cos = Math.cos(θ), sin = Math.sin(θ);
  return Array.from({ length: n }, (_, i) => {
    const u = (Math.sin(i * 2.399) * 2.0);
    const v = (Math.cos(i * 1.618) * 0.55);
    return [u * cos - v * sin, u * sin + v * cos] as Vec2;
  });
};

const PC1_MARKER = (
  <defs>
    {([
      ['pc1', '#10B981'], ['pc2', '#0284C7'], ['slate', '#64748B'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`c5p-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
    <radialGradient id="c5p-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stopColor="#f0fdf4" />
      <stop offset="100%" stopColor="#f1f5f9" />
    </radialGradient>
  </defs>
);

export const Scene5_15_PCAIntuition: React.FC = () => {
  const [angle, setAngle] = useSlideState('ch5_pca_angle', 30);
  const [showProj, setShowProj] = useSlideState('ch5_pca_showproj', true);
  const [pts] = useSlideState<Vec2[]>('ch5_pca_pts', () => makeCloudPoints(55, (30 * Math.PI) / 180));

  const θ = (angle * Math.PI) / 180;
  const eigDir: Vec2 = [Math.cos(θ), Math.sin(θ)];
  const perpDir: Vec2 = [-Math.sin(θ), Math.cos(θ)];

  const WIDTH = 500, HEIGHT = 400;
  const cx = WIDTH / 2, cy = HEIGHT / 2;
  const sc = 62;

  const projData = pts.map(p => {
    const d = p[0] * eigDir[0] + p[1] * eigDir[1];
    return { d, proj: [d * eigDir[0], d * eigDir[1]] as Vec2, pt: p };
  });

  // Spread metric (std dev of projection distances)
  const mean = projData.reduce((a, p) => a + p.d, 0) / projData.length;
  const variance = projData.reduce((a, p) => a + (p.d - mean) ** 2, 0) / projData.length;
  const stdDev = Math.sqrt(variance);
  const maxSpread = 1.55; // approximate max for this cloud
  const spreadPct = Math.min(100, (stdDev / maxSpread) * 100);

  // Whether we're close to the optimal angle (~30°)
  const isNearOptimal = Math.abs(angle - 30) < 8 || Math.abs(angle - 210) < 8;

  const pc1Extend = sc * 4.2;

  return (
    <SlideLayout
      title="PCA: Finding the Spread"
      text="Rotate the principal direction. The projection lines show how each point maps onto the axis. Maximize the spread — that's the eigenvector of the covariance matrix."
      sidebarContent={
        <div className="flex flex-col gap-4">
          {/* Angle slider */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Direction angle</span>
              <motion.span key={Math.round(angle)}
                initial={{ scale: 1.2, opacity: 0.7 }} animate={{ scale: 1, opacity: 1 }}
                className="text-xl font-black font-mono text-emerald-600">
                {angle}°
              </motion.span>
            </div>
            <input
              type="range" min="0" max="180" step="1" value={angle}
              onChange={e => setAngle(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2.5"
              style={{ background: `linear-gradient(to right, #10B981 0%, #10B981 ${(angle / 180) * 100}%, #e2e8f0 ${(angle / 180) * 100}%, #e2e8f0 100%)` }}
            />
          </div>

          {/* Spread meter */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Variance Captured</span>
              <span className="text-sm font-black font-mono text-emerald-600">{stdDev.toFixed(2)}</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <motion.div
                className={`h-full rounded-full transition-colors ${isNearOptimal ? 'bg-emerald-500' : 'bg-sky-400'}`}
                animate={{ width: `${spreadPct}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
              <span>low</span><span>high</span>
            </div>
          </div>

          {/* Projection lines toggle */}
          <button
            onClick={() => setShowProj(!showProj)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              showProj
                ? 'bg-sky-50 border-sky-300 text-sky-700'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white'
            }`}>
            <span className={`w-3 h-3 rounded-full border-2 ${showProj ? 'bg-sky-500 border-sky-500' : 'border-slate-300'}`} />
            Projection lines
          </button>

          {/* Stats */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold">
              <span className="text-slate-500">PC1 direction</span>
              <span className="text-emerald-600">[{eigDir[0].toFixed(2)}, {eigDir[1].toFixed(2)}]</span>
            </div>
            <div className="flex justify-between px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold">
              <span className="text-slate-500">PC2 direction</span>
              <span className="text-sky-600">[{perpDir[0].toFixed(2)}, {perpDir[1].toFixed(2)}]</span>
            </div>
          </div>

          {isNearOptimal && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs font-bold text-emerald-700">
              ✓ Near optimal! This is the principal component — the eigenvector with largest eigenvalue.
            </motion.div>
          )}
        </div>
      }
    >
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full max-h-full">
        {PC1_MARKER}

        {/* Background */}
        <rect width={WIDTH} height={HEIGHT} fill="url(#c5p-bg)" rx="18" />

        {/* Grid lines */}
        {[-3,-2,-1,0,1,2,3].map(i => {
          const isAxis = i === 0;
          return (
            <g key={i}>
              <line x1={cx + i*sc} y1={14} x2={cx + i*sc} y2={HEIGHT-14}
                stroke={isAxis ? '#7e93a8' : '#dde3ec'} strokeWidth={isAxis ? 1.8 : 1} />
              <line x1={14} y1={cy - i*sc} x2={WIDTH-14} y2={cy - i*sc}
                stroke={isAxis ? '#7e93a8' : '#dde3ec'} strokeWidth={isAxis ? 1.8 : 1} />
              {i !== 0 && (
                <>
                  <line x1={cx + i*sc} y1={cy-3} x2={cx + i*sc} y2={cy+3} stroke="#94a3b8" strokeWidth="1" />
                  <text x={cx + i*sc} y={cy+15} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">{i}</text>
                  <line x1={cx-3} y1={cy - i*sc} x2={cx+3} y2={cy - i*sc} stroke="#94a3b8" strokeWidth="1" />
                </>
              )}
            </g>
          );
        })}
        <text x={WIDTH-16} y={cy-7} fill="#7e93a8" fontSize="12" fontWeight="700">x</text>
        <text x={cx+8}    y={18}   fill="#7e93a8" fontSize="12" fontWeight="700">y</text>

        {/* PC1 axis line (extended, dashed) */}
        <line
          x1={cx - eigDir[0] * pc1Extend} y1={cy + eigDir[1] * pc1Extend}
          x2={cx + eigDir[0] * pc1Extend} y2={cy - eigDir[1] * pc1Extend}
          stroke="#10B981" strokeWidth="1.5" strokeDasharray="9 5" opacity="0.35" />

        {/* Projection lines */}
        {showProj && projData.map(({ proj, pt }, i) => (
          <line key={`pl${i}`}
            x1={cx + pt[0] * sc}   y1={cy - pt[1] * sc}
            x2={cx + proj[0] * sc} y2={cy - proj[1] * sc}
            stroke="#0284C7" strokeWidth="1.1" opacity="0.28" strokeDasharray="3 3" />
        ))}

        {/* Data points (blue) */}
        {pts.map((p, i) => (
          <circle key={i}
            cx={cx + p[0] * sc} cy={cy - p[1] * sc}
            r="5.5" fill="#0284C7" opacity="0.6"
            stroke="white" strokeWidth="1.2" />
        ))}

        {/* Projected dots (green) on PC1 axis */}
        {projData.map(({ proj }, i) => (
          <circle key={`pj${i}`}
            cx={cx + proj[0] * sc} cy={cy - proj[1] * sc}
            r="3.5" fill="#10B981" opacity="0.85"
            stroke="white" strokeWidth="0.8" />
        ))}

        {/* PC1 arrow — with glow */}
        <line
          x1={cx} y1={cy}
          x2={cx + eigDir[0] * sc * 3.4} y2={cy - eigDir[1] * sc * 3.4}
          stroke="#10B981" strokeWidth={12} strokeLinecap="round" opacity={0.16} />
        <line
          x1={cx} y1={cy}
          x2={cx + eigDir[0] * sc * 3.4} y2={cy - eigDir[1] * sc * 3.4}
          stroke="#10B981" strokeWidth="3.5" markerEnd="url(#c5p-pc1)" />

        {/* PC1 label badge */}
        {(() => {
          const lx = cx + eigDir[0] * sc * 3.5 + (eigDir[0] >= 0 ? 6 : -44);
          const ly = cy - eigDir[1] * sc * 3.5 + (eigDir[1] >= 0 ? -4 : 20);
          return (
            <g>
              <rect x={lx} y={ly - 14} width={38} height={18} rx="5" fill="#10B981" />
              <text x={lx + 19} y={ly + 1} textAnchor="middle" fill="white" fontSize="11" fontWeight="800">PC1</text>
            </g>
          );
        })()}

        {/* PC2 arrow (perpendicular, shorter) */}
        <line
          x1={cx} y1={cy}
          x2={cx + perpDir[0] * sc * 1.6} y2={cy - perpDir[1] * sc * 1.6}
          stroke="#0284C7" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6"
          markerEnd="url(#c5p-pc2)" />
        {(() => {
          const lx = cx + perpDir[0] * sc * 1.7 + (perpDir[0] >= 0 ? 5 : -38);
          const ly = cy - perpDir[1] * sc * 1.7 + (perpDir[1] >= 0 ? -4 : 18);
          return (
            <text x={lx} y={ly} fill="#0284C7" fontSize="10" fontWeight="700" opacity="0.75">PC2</text>
          );
        })()}

        {/* Legend */}
        <rect x={8} y={8} width={148} height={66} rx="9" fill="white" opacity="0.92" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx={26} cy={26} r="5.5" fill="#0284C7" opacity="0.65" stroke="white" strokeWidth="1" />
        <text x={37} y={30} fill="#0284C7" fontSize="10" fontWeight="700">Data points</text>
        <circle cx={26} cy={44} r="3.5" fill="#10B981" opacity="0.9" stroke="white" strokeWidth="0.8" />
        <text x={37} y={48} fill="#10B981" fontSize="10" fontWeight="700">Projected (on PC1)</text>
        <line x1={17} y1={62} x2={35} y2={62} stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.5" />
        <text x={40} y={65} fill="#64748B" fontSize="9" fontWeight="600">Projection lines</text>

        {/* Origin */}
        <circle cx={cx} cy={cy} r={5} fill="#0f172a" />
        <circle cx={cx} cy={cy} r={9} fill="none" stroke="#0f172a" strokeWidth="1.2" opacity="0.15" />
      </svg>
    </SlideLayout>
  );
};
