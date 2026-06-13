import React, { useState, useRef } from 'react';
import { DotMeter } from '../../components/VectorCanvas';
import { Activity, Zap, Info } from 'lucide-react';

export const Scene3_3_AngleExplorer: React.FC = () => {
  const vecB: [number, number] = [4, 0];
  const [vecA, setVecA] = useState<[number, number]>([3, 2]);

  const svgRef = useRef<SVGSVGElement>(null);

  const W = 480;
  const H = 480;
  const range = 5;

  const cx = W / 2;
  const cy = H / 2;
  const scale = (W / 2 - 28) / range;

  const toSvg = (x: number, y: number): [number, number] => [
    cx + x * scale,
    cy - y * scale,
  ];

  const fromSvg = (svgX: number, svgY: number): [number, number] => {
    const x = (svgX - cx) / scale;
    const y = (cy - svgY) / scale;

    return [
      Math.max(-range, Math.min(range, Math.round(x * 10) / 10)),
      Math.max(-range, Math.min(range, Math.round(y * 10) / 10)),
    ];
  };

  const updateVector = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scaleX = W / rect.width;
    const scaleY = H / rect.height;

    setVecA(fromSvg(x * scaleX, y * scaleY));
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    updateVector(e);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.buttons !== 1) return;
    updateVector(e);
  };

  const dotVal = vecA[0] * vecB[0] + vecA[1] * vecB[1];

  const magA = Math.sqrt(vecA[0] ** 2 + vecA[1] ** 2);
  const magB = Math.sqrt(vecB[0] ** 2 + vecB[1] ** 2);

  const cosTheta =
    magA === 0 || magB === 0 ? 0 : dotVal / (magA * magB);

  const angleRad = Math.acos(
    Math.max(-1, Math.min(1, cosTheta))
  );

  const angleDeg = Math.round((angleRad * 180) / Math.PI);

  const [bx, by] = toSvg(vecB[0], vecB[1]);
  const [ax, ay] = toSvg(vecA[0], vecA[1]);
  const [ox, oy] = toSvg(0, 0);

  const gridLines = [];

  for (let i = -range; i <= range; i++) {
    const h0 = toSvg(-range, i);
    const h1 = toSvg(range, i);

    const v0 = toSvg(i, -range);
    const v1 = toSvg(i, range);

    const isAxis = i === 0;

    gridLines.push(
      <line
        key={`h${i}`}
        x1={h0[0]}
        y1={h0[1]}
        x2={h1[0]}
        y2={h1[1]}
        stroke={isAxis ? '#64748b' : '#e2e8f0'}
        strokeWidth={isAxis ? 1.5 : 0.8}
      />,
      <line
        key={`v${i}`}
        x1={v0[0]}
        y1={v0[1]}
        x2={v1[0]}
        y2={v1[1]}
        stroke={isAxis ? '#64748b' : '#e2e8f0'}
        strokeWidth={isAxis ? 1.5 : 0.8}
      />
    );
  }

  const alignment =
    angleDeg < 80
      ? {
          title: 'Aligned',
          text: 'Positive dot product. Both vectors point in a similar direction.',
          className:
            'bg-emerald-50 border-emerald-200 text-emerald-900',
        }
      : angleDeg > 100
      ? {
          title: 'Opposite',
          text: 'Negative dot product. The vectors point against each other.',
          className:
            'bg-rose-50 border-rose-200 text-rose-900',
        }
      : {
          title: 'Perpendicular',
          text: 'Dot product is near zero because there is no alignment.',
          className:
            'bg-amber-50 border-amber-200 text-amber-900',
        };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full w-full max-w-7xl mx-auto px-4 py-2 overflow-hidden">
      <div className="flex-[62] min-w-0 bg-slate-50 border border-slate-200 rounded-3xl shadow-sm p-4 relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          <div className="px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-mono flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-rose-500" />
            A [{vecA[0]}, {vecA[1]}]
          </div>

          <div className="px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-mono flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-sky-500" />
            B [4, 0]
          </div>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
        >
          <defs>
            <marker
              id="arrow-red"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 1.5 L8 5 L0 8.5 z" fill="#E11D48" />
            </marker>

            <marker
              id="arrow-blue"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 1.5 L8 5 L0 8.5 z" fill="#0284C7" />
            </marker>
          </defs>

          {gridLines}

          <line
            x1={ox}
            y1={oy}
            x2={bx}
            y2={by}
            stroke="#0284C7"
            strokeWidth="4"
            markerEnd="url(#arrow-blue)"
          />

          <line
            x1={ox}
            y1={oy}
            x2={ax}
            y2={ay}
            stroke="#E11D48"
            strokeWidth="4"
            markerEnd="url(#arrow-red)"
          />

          <circle
            cx={ax}
            cy={ay}
            r="8"
            fill="#E11D48"
            stroke="white"
            strokeWidth="2"
          />

          <text
            x={ax + 12}
            y={ay - 10}
            fill="#E11D48"
            fontSize="13"
            fontWeight="bold"
            style={{ paintOrder: 'stroke', stroke: '#f8fafc', strokeWidth: 3 } as React.CSSProperties}
          >
            A ({vecA[0].toFixed(1)}, {vecA[1].toFixed(1)})
          </text>

          <text
            x={bx}
            y={by - 14}
            textAnchor="middle"
            fill="#0284C7"
            fontSize="13"
            fontWeight="bold"
            style={{ paintOrder: 'stroke', stroke: '#f8fafc', strokeWidth: 3 } as React.CSSProperties}
          >
            B ({vecB[0]}, {vecB[1]})
          </text>

          <circle cx={ox} cy={oy} r="5" fill="#0f172a" />
        </svg>

        <div className="text-center text-sm text-slate-500 font-medium mt-2">
          Drag Vector A and watch the dot product change in real time.
        </div>
      </div>

      <div className="flex-[38] flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            Dot Product = Alignment
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Vector B stays fixed. Rotate Vector A and observe how alignment affects the result.
          </p>
        </div>

        <DotMeter value={dotVal} max={20} />

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-xs uppercase tracking-wider font-black text-slate-400 mb-3">
            Live Calculation
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-semibold text-slate-600">
                A
              </span>

              <span className="font-mono font-bold text-slate-800">
                [{vecA[0]}, {vecA[1]}]
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-semibold text-slate-600">
                B
              </span>

              <span className="font-mono font-bold text-slate-800">
                [4, 0]
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-semibold text-slate-600">
                Formula
              </span>

              <span className="font-mono font-bold text-slate-800">
                ({vecA[0]}×4)+({vecA[1]}×0)
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <span className="font-bold text-emerald-700">
                A · B
              </span>

              <span className="text-xl font-black text-emerald-700 font-mono">
                {dotVal.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wider font-black text-slate-400">
              Cosine
            </div>

            <div className="mt-1 text-2xl font-black text-slate-900">
              {cosTheta.toFixed(3)}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wider font-black text-slate-400">
              Angle
            </div>

            <div className="mt-1 text-2xl font-black text-slate-900">
              {angleDeg}°
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl border p-4 transition-all ${alignment.className}`}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-black mb-2">
            <Info className="w-4 h-4" />
            {alignment.title}
          </div>

          <p className="text-sm font-medium leading-relaxed">
            {alignment.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene3_3_AngleExplorer;