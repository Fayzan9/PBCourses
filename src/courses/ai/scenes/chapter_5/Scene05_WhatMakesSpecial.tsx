import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseData {
  id: number;
  label: string;
  defaultλ: number;
  minλ: number;
  maxλ: number;
  stepλ: number;
  color: string;
  bg: string;
  border: string;
  idea: string;
  why: string;
  mathExplanation: string;
}

const CASES: CaseData[] = [
  {
    id: 0,
    label: 'Stretch',
    defaultλ: 3,
    minλ: 1.1,
    maxλ: 5,
    stepλ: 0.1,
    color: '#10B981',
    bg: '#f0fdf4',
    border: '#86efac',
    idea: 'The vector keeps its exact direction but grows longer.',
    why: 'M amplifies the vector along this axis. The larger the value of λ, the more dominant this direction is in the transformation.',
    mathExplanation: 'λ > 1: Amplifies the magnitude without changing the direction.'
  },
  {
    id: 1,
    label: 'Shrink',
    defaultλ: 0.4,
    minλ: 0.1,
    maxλ: 0.9,
    stepλ: 0.05,
    color: '#0284C7',
    bg: '#eff6ff',
    border: '#93c5fd',
    idea: 'The vector keeps its direction but gets compressed.',
    why: 'M dampens movement in this direction. Over time, repeated applications of this matrix will collapse data toward the origin along this axis.',
    mathExplanation: '0 < λ < 1: Compresses the magnitude while keeping the same direction.'
  },
  {
    id: 2,
    label: 'Flip',
    defaultλ: -1.5,
    minλ: -3.5,
    maxλ: -0.5,
    stepλ: 0.1,
    color: '#E11D48',
    bg: '#fff1f2',
    border: '#fda4af',
    idea: 'The vector points in the opposite direction along the same line.',
    why: 'Even when pointing backwards, it is still an eigenvector! The direction flips 180°, but the underlying axis/span remains unchanged.',
    mathExplanation: 'λ < 0: Reverses the direction (180° flip) and scales the magnitude by |λ|.'
  },
  {
    id: 3,
    label: 'Erase',
    defaultλ: 0,
    minλ: -0.8,
    maxλ: 0.8,
    stepλ: 0.1,
    color: '#7C3AED',
    bg: '#faf5ff',
    border: '#c4b5fd',
    idea: 'The vector collapses down to a single point at the origin.',
    why: 'λ = 0 means this direction is completely flattened. Any vector along this axis is sent to the null space, losing a dimension.',
    mathExplanation: 'λ = 0: Destroys the vector, projecting it directly to the origin.'
  }
];

export const Scene5_5_WhatMakesSpecial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0); // 0, 1, 2, 3: single concepts, 4: four quadrants
  
  // Custom λ values controlled by sliders for the tabs
  const [customλ, setCustomλ] = useState<{ [key: number]: number }>({
    0: 3,
    1: 0.4,
    2: -1.5,
    3: 0
  });

  const handleSliderChange = (caseId: number, val: number) => {
    setCustomλ(prev => ({ ...prev, [caseId]: val }));
  };

  const renderSingleCase = (c: CaseData) => {
    const λ = customλ[c.id];
    const width = 640;
    const height = 480;
    const originX = 280; // Shifted horizontally to allow room for -3.5 to +5 range
    const originY = height / 2;
    const scale = 70; // 70px per unit
    const inputX = originX + scale;
    const inputY = originY;
    const outputX = originX + λ * scale;
    const outputY = originY;

    return (
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between w-full h-full max-w-7xl px-4 py-2">
        {/* Visual representation - Left Panel takes priority width */}
        <div className="flex flex-col items-center justify-center flex-shrink-0 w-full lg:w-[640px]">
          <div className="relative rounded-2xl border border-slate-200 bg-slate-50 shadow-md p-4 w-[640px] h-[480px] flex items-center justify-center overflow-hidden">
            {/* Grid layout */}
            <svg width={width} height={height} className="overflow-visible">
              <defs>
                <pattern id="grid-pattern" width="35" height="35" patternUnits="userSpaceOnUse">
                  <path d="M 35 0 L 0 0 0 35" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </pattern>
                <marker id={`m-v`} markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
                  <polygon points="0,0 7,3 0,6" fill="#64748b" />
                </marker>
                <marker id={`m-lv-${c.id}`} markerWidth="12" markerHeight="12" refX="8" refY="4" orient="auto">
                  <polygon points="0,0 8,4 0,8" fill={c.color} />
                </marker>
              </defs>

              {/* Grid Background */}
              <rect width={width} height={height} fill="url(#grid-pattern)" />

              {/* Axes */}
              <line x1="0" y1={originY} x2={width} y2={originY} stroke="#cbd5e1" strokeWidth="2" />
              <line x1={originX} y1="0" x2={originX} y2={height} stroke="#cbd5e1" strokeWidth="2" />

              {/* Span line */}
              <line x1="10" y1={originY} x2={width - 10} y2={originY} stroke={c.color} strokeWidth="2" strokeDasharray="5 5" opacity="0.35" />

              {/* Input Vector v */}
              <line x1={originX} y1={originY} x2={inputX} y2={inputY} stroke="#64748b" strokeWidth="3" markerEnd="url(#m-v)" />
              <text x={inputX} y={inputY - 16} fontSize="16" fontWeight="900" fill="#475569" textAnchor="middle">v</text>

              {/* Output Vector λ·v */}
              {Math.abs(λ) > 0.05 ? (
                <>
                  <motion.line
                    key={`line-${λ}`}
                    x1={originX} y1={originY} x2={outputX} y2={outputY}
                    stroke={c.color} strokeWidth="6" markerEnd={`url(#m-lv-${c.id})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05 }}
                  />
                  <text x={outputX + (λ > 0 ? 16 : -28)} y={outputY - 16} fontSize="18" fontWeight="950" fill={c.color} textAnchor="middle">
                    λv
                  </text>

                  {/* Magnitude Bracket/Indicator */}
                  <g>
                    <line x1={originX} y1={originY + 28} x2={outputX} y2={originY + 28} stroke={c.color} strokeWidth="2" strokeDasharray="3 3" />
                    <line x1={originX} y1={originY + 22} x2={originX} y2={originY + 34} stroke={c.color} strokeWidth="2" />
                    <line x1={outputX} y1={originY + 22} x2={outputX} y2={originY + 34} stroke={c.color} strokeWidth="2" />
                    <text x={(originX + outputX) / 2} y={originY + 50} fontSize="14" fontWeight="900" fill={c.color} textAnchor="middle">
                      {λ > 0 ? '' : '-'}{Math.abs(λ).toFixed(2)}x
                    </text>
                  </g>
                </>
              ) : (
                /* Collapsed (λ close to 0) */
                <circle cx={originX} cy={originY} r={10} fill={c.color} />
              )}

              {/* Origin Point */}
              <circle cx={originX} cy={originY} r={6} fill="#0f172a" />
            </svg>
          </div>

          {/* Interactive Slider */}
          <div className="w-full max-w-[640px] mt-6 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Adjust eigenvalue (λ)</span>
              <span className="text-base font-black font-mono" style={{ color: c.color }}>λ = {λ.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={c.minλ}
              max={c.maxλ}
              step={c.stepλ}
              value={λ}
              onChange={(e) => handleSliderChange(c.id, parseFloat(e.target.value))}
              className="w-full accent-slate-800 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>Min: {c.minλ}</span>
              <span>Max: {c.maxλ}</span>
            </div>
          </div>
        </div>

        {/* Conceptual details - Right Panel takes remaining free space */}
        <div className="flex-1 flex flex-col justify-center min-w-0 lg:pl-6 xl:pl-12 gap-6 w-full">
          <div className="p-2.5 inline-flex items-center gap-2.5 self-start rounded-xl font-bold text-sm uppercase font-mono" style={{ color: c.color, backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: c.color }} />
            Case {c.id + 1}: {c.label}
          </div>
          
          <h3 className="text-3xl font-black text-slate-900 leading-tight">
            {c.idea}
          </h3>

          <p className="text-base text-slate-600 leading-relaxed">
            {c.why}
          </p>

          {/* Equation Box */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 font-mono shadow-lg mt-4 w-full">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-2">Mathematical Condition</div>
            <div className="text-2xl font-bold flex items-center gap-2">
              <span className="text-sky-400">M</span>
              <span className="text-slate-400">·</span>
              <span className="text-violet-400">v</span>
              <span className="text-slate-400">=</span>
              <span style={{ color: c.color }}>{λ.toFixed(2)}</span>
              <span className="text-slate-400">·</span>
              <span className="text-violet-400">v</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-sans leading-relaxed">
              {c.mathExplanation}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderQuadrants = () => {
    // 2x2 Overview
    const W = 880;
    const H = 480;
    const QC = [
      { cx: 220, cy: 120 }, // TL
      { cx: 660, cy: 120 }, // TR
      { cx: 220, cy: 360 }, // BL
      { cx: 660, cy: 360 }, // BR
    ];
    const SC = 50; // larger scale for overview

    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-2 max-w-6xl">
        <h3 className="text-xl font-black text-slate-800 mb-4">The Spectrum of Eigenvalue Behaviors</h3>
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 w-full max-w-[880px] h-[480px] shadow-md relative flex items-center justify-center">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            <defs>
              {CASES.map(c => (
                <React.Fragment key={c.id}>
                  <marker id={`mq-v-${c.id}`} markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                    <polygon points="0,0 5,3 0,6" fill="#94a3b8" />
                  </marker>
                  <marker id={`mq-lv-${c.id}`} markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                    <polygon points="0,0 6,3 0,6" fill={c.color} />
                  </marker>
                </React.Fragment>
              ))}
            </defs>

            {/* Dividers */}
            <line x1={W/2} y1={10} x2={W/2} y2={H-10} stroke="#e2e8f0" strokeWidth="2" />
            <line x1={10} y1={H/2} x2={W-10} y2={H/2} stroke="#e2e8f0" strokeWidth="2" />

            {CASES.map((c, i) => {
              const { cx, cy } = QC[i];
              const valλ = customλ[c.id];

              const inX = cx + SC;
              const inY = cy;
              const outX = cx + valλ * SC;
              const outY = cy;

              return (
                <g key={i}>
                  {/* Quadrant Background tint */}
                  <rect
                    x={i % 2 === 0 ? 4 : W/2 + 4} y={i < 2 ? 4 : H/2 + 4}
                    width={W/2 - 8} height={H/2 - 8} rx={12}
                    fill={c.bg} opacity={0.4}
                  />

                  {/* Label */}
                  <text x={cx} y={cy - 80} textAnchor="middle" fontSize="15" fontWeight="900" fill={c.color}>
                    {c.label} (λ = {valλ.toFixed(2)})
                  </text>

                  {/* Horizontal / Vertical mini axes */}
                  <line x1={cx - 150} y1={cy} x2={cx + 150} y2={cy} stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1={cx} y1={cy - 70} x2={cx} y2={cy + 70} stroke="#cbd5e1" strokeWidth="1.5" />

                  {/* Input ghost v */}
                  <line x1={cx} y1={cy} x2={inX} y2={inY} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" markerEnd={`url(#mq-v-${c.id})`} />
                  <text x={inX} y={inY - 8} fontSize="11" fontWeight="800" fill="#94a3b8" textAnchor="middle">v</text>

                  {/* Output λ·v */}
                  {Math.abs(valλ) > 0.05 ? (
                    <>
                      <line x1={cx} y1={cy} x2={outX} y2={outY} stroke={c.color} strokeWidth="4.5" markerEnd={`url(#mq-lv-${c.id})`} />
                      <text x={outX + (valλ > 0 ? 12 : -18)} y={outY - 8} fontSize="12" fontWeight="950" fill={c.color} textAnchor="middle">
                        λv
                      </text>
                    </>
                  ) : (
                    <circle cx={cx} cy={cy} r={8} fill={c.color} />
                  )}

                  {/* Origin */}
                  <circle cx={cx} cy={cy} r={4} fill="#0f172a" />

                  {/* Summary idea */}
                  <text x={cx} y={cy + 82} textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">
                    {c.idea}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white px-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-4 flex-shrink-0">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Chapter 5 · Section 4</p>
          <h2 className="text-2xl font-black text-slate-800 mt-1">
            What happens to eigenvectors?
          </h2>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl mt-3 md:mt-0">
          {CASES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === idx
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
          <button
            onClick={() => setActiveTab(4)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 4
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Cases
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex items-center justify-center"
          >
            {activeTab < 4 ? renderSingleCase(CASES[activeTab]) : renderQuadrants()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene5_5_WhatMakesSpecial;
