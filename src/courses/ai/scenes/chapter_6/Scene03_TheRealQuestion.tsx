import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MATRIX = [
  [3, 1],
  [1, 3],
];

const DIRECTIONS = [
  { x: 1, y: 0, label: '0°' },
  { x: 0.7, y: 0.7, label: '45°' },
  { x: 0, y: 1, label: '90°' },
  { x: -0.7, y: 0.7, label: '135°' },
  { x: -1, y: 0, label: '180°' },
  { x: -0.7, y: -0.7, label: '225°' },
  { x: 0, y: -1, label: '270°' },
  { x: 0.7, y: -0.7, label: '315°' },
];

function apply(v: { x: number; y: number }) {
  return {
    x: MATRIX[0][0] * v.x + MATRIX[0][1] * v.y,
    y: MATRIX[1][0] * v.x + MATRIX[1][1] * v.y,
  };
}

function mag(v: { x: number; y: number }) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

const W = 860;
const H = 620;
const CX = W / 2;
const CY = H / 2;
const SCALE = 135;

export const Scene6_3_TheRealQuestion: React.FC = () => {
  const [selected, setSelected] = useState(1);

  const v = DIRECTIONS[selected];
  const out = apply(v);

  const stretch = mag(out);

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* LEFT */}
      <div
        className="flex flex-col items-center justify-center gap-4 px-4"
        style={{ flex: '0 0 72%' }}
      >
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            Chapter 6 · Scene 3
          </p>

          <h2 className="text-3xl font-black text-slate-800 mt-1">
            Which direction gets
            <span className="text-emerald-600"> stretched the most?</span>
          </h2>

          <p className="text-base text-slate-500 mt-2">
            Try different directions. Compare the output lengths.
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
            {[...Array(13)].map((_, i) => (
              <line
                key={i}
                x1={i * 72}
                y1={0}
                x2={i * 72}
                y2={H}
                stroke="#e2e8f0"
              />
            ))}

            {[...Array(9)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * 72}
                x2={W}
                y2={i * 72}
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

            {/* All directions */}
            {DIRECTIONS.map((d, i) => (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={CX + d.x * 120}
                y2={CY - d.y * 120}
                stroke={i === selected ? '#7C3AED' : '#CBD5E1'}
                strokeWidth={i === selected ? 4 : 2}
              />
            ))}

            {/* Input */}
            <motion.line
              key={`input-${selected}`}
              x1={CX}
              y1={CY}
              x2={CX + v.x * SCALE}
              y2={CY - v.y * SCALE}
              stroke="#7C3AED"
              strokeWidth="5"
            />

            {/* Output */}
            <motion.line
              key={`output-${selected}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              x1={CX}
              y1={CY}
              x2={CX + out.x * 60}
              y2={CY - out.y * 60}
              stroke="#10B981"
              strokeWidth="6"
            />

            {/* Center */}
            <circle cx={CX} cy={CY} r={7} fill="#0f172a" />

            <text
              x={CX + out.x * 60 + 15}
              y={CY - out.y * 60}
              fill="#10B981"
              fontSize="24"
              fontWeight="900"
            >
              Av
            </text>

            <text
              x={CX + v.x * SCALE + 15}
              y={CY - v.y * SCALE}
              fill="#7C3AED"
              fontSize="22"
              fontWeight="900"
            >
              v
            </text>
          </svg>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="flex flex-col justify-center gap-5 pr-6"
        style={{ flex: '0 0 28%' }}
      >

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
            Matrix
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xl font-thin">A =</span>

            <div className="border-l-2 border-r-2 border-slate-700 px-3 py-1">
              <div className="flex gap-5">
                <span className="text-2xl font-black">3</span>
                <span className="text-2xl font-black">1</span>
              </div>

              <div className="flex gap-5">
                <span className="text-2xl font-black">1</span>
                <span className="text-2xl font-black">3</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
            Choose Direction
          </p>

          <div className="grid grid-cols-2 gap-2">
            {DIRECTIONS.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`rounded-xl px-3 py-2 text-sm font-bold border transition-all ${
                  i === selected
                    ? 'bg-violet-50 border-violet-400 text-violet-700'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-3">
            Stretch Amount
          </p>

          <p className="text-4xl font-black text-emerald-700">
            {stretch.toFixed(2)}
          </p>

          <p className="text-sm text-emerald-800 mt-3 leading-relaxed">
            Different directions produce different output lengths.
          </p>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-lg font-black text-violet-900 leading-snug">
            The real goal:
          </p>

          <p className="text-base text-violet-700 mt-2">
            Find the direction that produces the largest possible output.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene6_3_TheRealQuestion;