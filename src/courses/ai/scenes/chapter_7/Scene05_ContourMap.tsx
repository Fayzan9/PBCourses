import React from 'react';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';
import { useSlideState } from '../../components/CourseStateContext';

export const Scene7_5_ContourMap: React.FC = () => {
  const [w1, setW1] = useSlideState('ch7_loss3d_w1', 25);
  const [w2, setW2] = useSlideState('ch7_loss3d_w2', 30);

  // Valley is at 70, 70
  // Build a series of circles representing contour lines of Loss
  const contours = [15, 30, 45, 60, 75];

  const W = 480, H = 480;
  const cx = 70 * (W / 100);
  const cy = H - 70 * (H / 100);

  const px = w1 * (W / 100);
  const py = H - w2 * (H / 100);

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full select-none bg-white rounded-2xl">
          <defs>
            <radialGradient id="contour-glow" cx="70%" cy="70%" r="70%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing center minimum */}
          <circle cx={cx} cy={cy} r="180" fill="url(#contour-glow)" />

          {/* Contour elevation loops */}
          {contours.map((val) => {
            // Radius scales with loss value
            const radius = Math.sqrt(val * 75) * (W / 100);
            return (
              <g key={val}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <text
                  x={cx + radius - 18}
                  y={cy - 4}
                  fill="#94a3b8"
                  fontSize="9"
                  fontWeight="bold"
                >
                  L = {val}
                </text>
              </g>
            );
          })}

          {/* Valley minimum dot */}
          <circle cx={cx} cy={cy} r="5" fill="#10B981" />
          <text x={cx + 8} y={cy + 4} fill="#10B981" fontSize="10" fontWeight="extrabold">
            MINIMUM (Valley)
          </text>

          {/* Plotted weights location */}
          <line x1={px} y1={py} x2={cx} y2={cy} stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <circle cx={px} cy={py} r="10" fill="white" stroke="#E11D48" strokeWidth="3" />
          <circle cx={px} cy={py} r="4" fill="#E11D48" />
        </svg>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">Contour Maps</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Instead of looking at the landscape in 3D, we can flatten it into a 2D **contour map**.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-slate-600">
          <p>
            Each dotted loop shows a line of **equal elevation (Loss)**. When the loops are tight and close together, the landscape is very steep.
          </p>
          <p>
            Your current model is represented by the red dot. The target valley is at the center of the green circles.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
          {/* Slider 1 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>WEIGHT 1 (w₁)</span>
              <span>{w1.toFixed(0)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={w1}
              onChange={e => setW1(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2 bg-slate-200"
              style={{
                background: `linear-gradient(to right, #0284C7 0%, #0284C7 ${((w1 - 10) / 85) * 100}%, #e2e8f0 ${((w1 - 10) / 85) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>

          {/* Slider 2 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>WEIGHT 2 (w₂)</span>
              <span>{w2.toFixed(0)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={w2}
              onChange={e => setW2(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2 bg-slate-200"
              style={{
                background: `linear-gradient(to right, #7C3AED 0%, #7C3AED ${((w2 - 10) / 85) * 100}%, #e2e8f0 ${((w2 - 10) / 85) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
