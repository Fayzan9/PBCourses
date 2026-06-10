import React from 'react';
import { type Vec2 } from '../../components/mathHelpers';
import { SlideLayout } from '../../components/SlideLayout';
import { useSlideState } from '../../components/CourseStateContext';

const makeCloudPoints = (n: number, θ: number): Vec2[] => {
  const cos = Math.cos(θ), sin = Math.sin(θ);
  return Array.from({ length: n }, () => {
    const u = (Math.random() - 0.5) * 4;
    const v = (Math.random() - 0.5) * 1.2;
    return [u * cos - v * sin, u * sin + v * cos] as Vec2;
  });
};

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

export const Scene5_15_PCAIntuition: React.FC = () => {
  const [angle, setAngle] = useSlideState('ch5_pca_angle', 30);
  const [pts] = useSlideState<Vec2[]>('ch5_pca_pts', () => makeCloudPoints(60, (30 * Math.PI) / 180));
  const θ = (angle * Math.PI) / 180;
  const eigDir: Vec2 = [Math.cos(θ), Math.sin(θ)];

  const WIDTH = 480, HEIGHT = 380;
  const cx = WIDTH / 2, cy = HEIGHT / 2;
  const sc = 60;

  const projections = pts.map(p => {
    const d = p[0] * eigDir[0] + p[1] * eigDir[1];
    return [d * eigDir[0], d * eigDir[1]] as Vec2;
  });

  return (
    <SlideLayout
      title="PCA: Finding the Spread"
      text="Rotate the principal direction (green arrow). Watch the projections — the direction that spreads them out the most is the first eigenvector of the covariance matrix."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Direction angle</span>
              <span className="text-xl font-black font-mono text-emerald-600">{angle}°</span>
            </div>
            <input
              type="range" min="0" max="180" step="1" value={angle}
              onChange={e => setAngle(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2"
              style={{ background: `linear-gradient(to right, #10B981 0%, #10B981 ${(angle / 180) * 100}%, #e2e8f0 ${(angle / 180) * 100}%, #e2e8f0 100%)` }}
            />
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-semibold text-emerald-700">
            🎯 Try ~30° — that's where this cloud has the most spread. That's the eigenvector!
          </div>
          <div className="flex flex-col gap-2 text-xs font-mono font-bold">
            <div className="flex justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500">direction</span>
              <span className="text-emerald-600">[{eigDir[0].toFixed(2)}, {eigDir[1].toFixed(2)}]</span>
            </div>
          </div>
        </div>
      }
    >
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full max-h-full">
        {MARKER_DEFS}
        <rect width={WIDTH} height={HEIGHT} fill="white" rx="16" />
        <line x1={0} y1={cy} x2={WIDTH} y2={cy} stroke="#e2e8f0" strokeWidth={1} />
        <line x1={cx} y1={0} x2={cx} y2={HEIGHT} stroke="#e2e8f0" strokeWidth={1} />
        {pts.map((p, i) => (
          <circle key={i} cx={cx + p[0] * sc} cy={cy - p[1] * sc} r="4" fill="#0284C7" opacity="0.35" />
        ))}
        {projections.map((p, i) => (
          <circle key={`proj${i}`} cx={cx + p[0] * sc} cy={cy - p[1] * sc} r="3" fill="#10B981" opacity="0.6" />
        ))}
        <line
          x1={cx - eigDir[0] * sc * 3.5} y1={cy + eigDir[1] * sc * 3.5}
          x2={cx + eigDir[0] * sc * 3.5} y2={cy - eigDir[1] * sc * 3.5}
          stroke="#10B981" strokeWidth="2.5" markerEnd="url(#c5-emerald)" />
        <text x={cx + eigDir[0] * sc * 3.5 + 8} y={cy - eigDir[1] * sc * 3.5 - 6} fill="#10B981" fontSize="12" fontWeight="bold">PC1</text>
      </svg>
    </SlideLayout>
  );
};
