import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CANDIDATES = [
  { label: '[1, 0]', x: 1, y: 0 },
  { label: '[0, 1]', x: 0, y: 1 },
  { label: '[1, 1]', x: 1, y: 1 },
  { label: '[1, -1]', x: 1, y: -1 },
  { label: '[2, 1]', x: 2, y: 1 },
  { label: '[-1, 1]', x: -1, y: 1 },
];

const A = [
  [3, 1],
  [1, 3],
];

function apply(v: { x: number; y: number }) {
  return {
    x: A[0][0] * v.x + A[0][1] * v.y,
    y: A[1][0] * v.x + A[1][1] * v.y,
  };
}

function magnitude(v: { x: number; y: number }) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function normalizedStretch(v: { x: number; y: number }) {
  return magnitude(apply(v)) / magnitude(v);
}

const W = 820;
const H = 620;
const CX = W / 2;
const CY = H / 2;
const SCALE = 70;

export const Scene6_4_FindStrongestDirection: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const ranked = [...CANDIDATES]
    .map((v, idx) => ({
      ...v,
      idx,
      stretch: normalizedStretch(v),
    }))
    .sort((a, b) => b.stretch - a.stretch);

  const winner = ranked[0];

  const chosen =
    selected !== null
      ? {
          ...CANDIDATES[selected],
          stretch: normalizedStretch(CANDIDATES[selected]),
          out: apply(CANDIDATES[selected]),
        }
      : null;

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* LEFT */}
      <div
        className="flex flex-col items-center justify-center gap-3 px-4"
        style={{ flex: '0 0 68%' }}
      >
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            Chapter 6 · Scene 4
          </p>

          <h2 className="text-3xl font-black text-slate-800 mt-1">
            The
            <span className="text-emerald-600"> stretching contest</span>
          </h2>

          <p className="text-base text-slate-500 mt-2">
            Which direction receives the most amplification?
          </p>
        </div>

        <div
          className="rounded-3xl overflow-hidden"
          style={{
            width: W,
            height: H,
            maxWidth: '100%',
            background:
              'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          }}
        >
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>

            {/* Grid */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1={i * 75}
                y1={0}
                x2={i * 75}
                y2={H}
                stroke="#e2e8f0"
              />
            ))}

            {[...Array(9)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * 75}
                x2={W}
                y2={i * 75}
                stroke="#e2e8f0"
              />
            ))}

            {/* Axes */}
            <line
              x1={0}
              y1={CY}
              x2={W}
              y2={CY}
              stroke="#94a3b8"
              strokeWidth="2"
            />

            <line
              x1={CX}
              y1={0}
              x2={CX}
              y2={H}
              stroke="#94a3b8"
              strokeWidth="2"
            />

            {/* Candidate directions */}
            {CANDIDATES.map((v, i) => (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={CX + v.x * SCALE}
                y2={CY - v.y * SCALE}
                stroke={
                  selected === i
                    ? '#7C3AED'
                    : '#CBD5E1'
                }
                strokeWidth={
                  selected === i ? 5 : 2
                }
              />
            ))}

            {/* Selected output */}
            {chosen && (
              <>
                <motion.line
                  key={`out-${selected}`}
                  x1={CX}
                  y1={CY}
                  x2={CX + chosen.out.x * 55}
                  y2={CY - chosen.out.y * 55}
                  stroke="#10B981"
                  strokeWidth="6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />

                <text
                  x={CX + chosen.out.x * 55 + 12}
                  y={CY - chosen.out.y * 55}
                  fontSize="24"
                  fill="#10B981"
                  fontWeight="900"
                >
                  Av
                </text>
              </>
            )}

            <circle
              cx={CX}
              cy={CY}
              r={7}
              fill="#0f172a"
            />
          </svg>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="flex flex-col justify-center gap-5 pr-6"
        style={{ flex: '0 0 32%' }}
      >

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
            Try Directions
          </p>

          <div className="grid grid-cols-2 gap-2">
            {CANDIDATES.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`rounded-xl px-3 py-2 text-sm font-mono font-bold border transition-all ${
                  selected === i
                    ? 'bg-violet-50 border-violet-400 text-violet-700'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {chosen && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
            <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-3">
              Amplification
            </p>

            <p className="text-5xl font-black text-emerald-700">
              {chosen.stretch.toFixed(2)}
            </p>

            <p className="text-sm text-emerald-800 mt-3">
              Output length ÷ input length
            </p>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-600 uppercase tracking-wider mb-3">
            Current Leader
          </p>

          <p className="text-2xl font-black text-amber-900">
            {winner.label}
          </p>

          <p className="text-lg font-bold text-amber-700 mt-2">
            Stretch = {winner.stretch.toFixed(2)}
          </p>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-lg font-black text-violet-900">
            New Goal
          </p>

          <p className="text-base text-violet-700 mt-2 leading-relaxed">
            Instead of testing directions one by one...
          </p>

          <p className="text-base font-black text-violet-900 mt-3">
            Can mathematics find the winner directly?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene6_4_FindStrongestDirection;