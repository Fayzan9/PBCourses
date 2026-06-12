import React, { useRef } from 'react';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';
import { useSlideState } from '../../components/CourseStateContext';

const W = 480;
const H = 480;

export const Scene7_7_GradientSandbox: React.FC = () => {
  const [w1, setW1] = useSlideState('ch7_loss3d_w1', 25);
  const [w2, setW2] = useSlideState('ch7_loss3d_w2', 30);
  const isDragging = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const cx = 70 * (W / 100);
  const cy = H - 70 * (H / 100);

  const px = w1 * (W / 100);
  const py = H - w2 * (H / 100);

  // Gradient computation (uphill vector)
  const gradX = (w1 - 70) * 0.5;
  const gradY = -(w2 - 70) * 0.5; // Invert for SVG Y-axis

  // Normalize gradient for arrow sizing
  const gradLen = Math.sqrt(gradX * gradX + gradY * gradY);
  const maxArrowLen = 60;
  const scale = gradLen > 0.1 ? Math.min(maxArrowLen, gradLen) / gradLen : 0;
  
  const arrowX = gradX * scale;
  const arrowY = gradY * scale;

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    isDragging.current = true;
    updateCoords(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    updateCoords(e);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updateCoords = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = 100 - ((e.clientY - rect.top) / rect.height) * 100;
    setW1(Math.max(5, Math.min(95, mx)));
    setW2(Math.max(5, Math.min(95, my)));
  };

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full max-h-full select-none bg-white rounded-2xl cursor-crosshair touch-none"
        >
          <defs>
            <marker id="grad-arrow-red" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 Z" fill="#E11D48" />
            </marker>
            <marker id="grad-arrow-green" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 Z" fill="#10B981" />
            </marker>
            <radialGradient id="contour-glow" cx="70%" cy="70%" r="70%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glow center */}
          <circle cx={cx} cy={cy} r="180" fill="url(#contour-glow)" />

          {/* Dotted contour rings */}
          {[15, 30, 45, 60, 75].map((val) => {
            const radius = Math.sqrt(val * 75) * (W / 100);
            return (
              <circle
                key={val}
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
            );
          })}

          {/* Valley minimum dot */}
          <circle cx={cx} cy={cy} r="6" fill="#10B981" />

          {/* Gradient arrow (Uphill - Red) */}
          {gradLen > 1 && (
            <line
              x1={px}
              y1={py}
              x2={px + arrowX}
              y2={py + arrowY}
              stroke="#E11D48"
              strokeWidth="3"
              markerEnd="url(#grad-arrow-red)"
            />
          )}

          {/* Descent arrow (Downhill - Green) */}
          {gradLen > 1 && (
            <line
              x1={px}
              y1={py}
              x2={px - arrowX}
              y2={py - arrowY}
              stroke="#10B981"
              strokeWidth="3"
              markerEnd="url(#grad-arrow-green)"
            />
          )}

          {/* Position Dot */}
          <circle cx={px} cy={py} r="10" fill="white" stroke="#64748B" strokeWidth="2.5" />
          <circle cx={px} cy={py} r="4" fill="#64748B" />

          <text x={px + 14} y={py - 10} fill="#E11D48" fontSize="10" fontWeight="bold">
            Gradient (Uphill)
          </text>
          <text x={px - 14 - 90} y={py + 18} fill="#10B981" fontSize="10" fontWeight="bold">
            Descent (Downhill)
          </text>
        </svg>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">Gradient Sandbox</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Drag the point anywhere on the map to see the gradient vector adjust in real-time.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center text-sm font-bold text-slate-500 font-mono">
            <span>COORDINATES [w₁, w₂]</span>
            <span className="text-slate-800">[{w1.toFixed(0)}, {w2.toFixed(0)}]</span>
          </div>

          <div className="flex flex-col gap-2 text-slate-600 text-sm">
            <p>
              🔴 The <strong className="text-rose-600">Red Arrow</strong> points in the direction of the steepest ascent (directly uphill).
            </p>
            <p>
              🟢 The <strong className="text-emerald-600">Green Arrow</strong> points in the direction of the steepest descent (directly downhill).
            </p>
            <p className="italic text-xs text-slate-400">
              Notice that the arrows are always perpendicular to the dotted contour loops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
