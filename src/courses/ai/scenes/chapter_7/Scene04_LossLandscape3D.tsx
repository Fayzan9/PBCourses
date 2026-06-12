import React, { useState } from 'react';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';
import { useSlideState } from '../../components/CourseStateContext';

const W = 480;
const H = 480;
const S = 160;

function proj(
  x: number, y: number, z: number,
  theta: number, phi: number,
): { px: number; py: number } {
  // Normalize to -1..1
  const nx = x / 50 - 1;
  const ny = y / 50 - 1;
  const nz = z / 50 - 1;
  // Azimuth (Y-axis rotation)
  const ax = nx * Math.cos(theta) + nz * Math.sin(theta);
  const ay = ny;
  const az = -nx * Math.sin(theta) + nz * Math.cos(theta);
  // Elevation (X-axis rotation)
  const ex = ax;
  const ey = ay * Math.cos(phi) - az * Math.sin(phi);
  return { px: W / 2 + ex * S, py: H / 2 - ey * S };
}

export const Scene7_4_LossLandscape3D: React.FC = () => {
  const [w1, setW1] = useSlideState('ch7_loss3d_w1', 25);
  const [w2, setW2] = useSlideState('ch7_loss3d_w2', 30);
  const [theta, setTheta] = useState(0.65);
  const phi = -0.4;

  // Compute Loss = f(w1, w2)
  // Let's create a valley around w1=70, w2=70
  // Loss = (w1-70)^2/80 + (w2-70)^2/80 + 15
  const getLoss = (x: number, y: number) => {
    const dx = x - 70;
    const dy = y - 70;
    return (dx * dx + dy * dy) / 75 + 10;
  };

  const currentLoss = getLoss(w1, w2);

  // Build grid meshes
  const gridResolution = 10;
  const gridLines: string[] = [];

  // Grid lines along X
  for (let y = 0; y <= 100; y += gridResolution) {
    let path = '';
    for (let x = 0; x <= 100; x += 5) {
      const z = getLoss(x, y);
      const { px, py } = proj(x, z, y, theta, phi);
      path += `${x === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    }
    gridLines.push(path);
  }

  // Grid lines along Y
  for (let x = 0; x <= 100; x += gridResolution) {
    let path = '';
    for (let y = 0; y <= 100; y += 5) {
      const z = getLoss(x, y);
      const { px, py } = proj(x, z, y, theta, phi);
      path += `${y === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    }
    gridLines.push(path);
  }

  // Current parameter location projected
  const currentPos = proj(w1, currentLoss, w2, theta, phi);

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <div className="relative w-full h-full flex flex-col items-center">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full select-none cursor-pointer">
            <rect width={W} height={H} fill="white" rx="16" />

            {/* Grid surface */}
            {gridLines.map((path, idx) => (
              <path
                key={idx}
                d={path}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="0.8"
                opacity="0.65"
              />
            ))}

            {/* Valley highlight */}
            <circle
              cx={proj(70, getLoss(70, 70), 70, theta, phi).px}
              cy={proj(70, getLoss(70, 70), 70, theta, phi).py}
              r="22"
              fill="#10B981"
              fillOpacity="0.1"
              stroke="#10B981"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text
              x={proj(70, getLoss(70, 70), 70, theta, phi).px + 12}
              y={proj(70, getLoss(70, 70), 70, theta, phi).py + 4}
              fontSize="10"
              fontWeight="bold"
              fill="#10B981"
            >
              Valley (Minimum Loss)
            </text>

            {/* Current model weights pointer */}
            <circle
              cx={currentPos.px}
              cy={currentPos.py}
              r="14"
              fill="white"
              stroke="#E11D48"
              strokeWidth="3.5"
              className="drop-shadow-md"
            />
            <circle
              cx={currentPos.px}
              cy={currentPos.py}
              r="6"
              fill="#E11D48"
            />

            <text
              x={currentPos.px + 16}
              y={currentPos.py + 4}
              fontSize="12"
              fontWeight="bold"
              fill="#E11D48"
              fontFamily="monospace"
            >
              Weights: [{w1.toFixed(0)}, {w2.toFixed(0)}]
            </text>
          </svg>

          {/* View rotators */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button
              onClick={() => setTheta(t => t - 0.15)}
              className="px-2 py-1 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 border rounded-lg active:scale-95"
            >
              Rotate Left
            </button>
            <button
              onClick={() => setTheta(t => t + 0.15)}
              className="px-2 py-1 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 border rounded-lg active:scale-95"
            >
              Rotate Right
            </button>
          </div>
        </div>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">The Loss Landscape</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Every set of weights defines how "wrong" the model is. We map these values into a 3D landscape where the altitude represents the **Loss**.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-500 font-mono">CURRENT LOSS</span>
            <span className="text-2xl font-black text-rose-600 font-mono">{currentLoss.toFixed(1)}</span>
          </div>

          {/* Slider 1 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>WEIGHT 1 (<span className="text-sky-600">w₁</span>)</span>
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
              <span>WEIGHT 2 (<span className="text-violet-600">w₂</span>)</span>
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

        <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl p-4 text-sm font-medium">
          💡 **Goal:** Move weights $w_1$ and $w_2$ to decrease the loss to its absolute minimum value in the valley!
        </div>
      </div>
    </div>
  );
};
