import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';

const M = [[2.2, 0.8], [0.3, 1.5]] as [[number,number],[number,number]];

const ARROW_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

function vecLen(x: number, y: number) {
  return Math.sqrt(x * x + y * y);
}

export const Scene6_5_StretchingContest: React.FC = () => {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [showWinner, setShowWinner] = useState(false);

  const W = 480, H = 480, CX = W / 2, CY = H / 2, SC = 80;

  const arrows = ARROW_ANGLES.map(deg => {
    const rad = (deg * Math.PI) / 180;
    const ix = Math.cos(rad), iy = Math.sin(rad);
    const ox = M[0][0] * ix + M[0][1] * iy;
    const oy = M[1][0] * ix + M[1][1] * iy;
    const inLen = 1;
    const outLen = vecLen(ox, oy);
    return { deg, ix, iy, ox, oy, inLen, outLen };
  });

  // Find the winner (max output length)
  const winnerIdx = arrows.reduce((best, a, i) => a.outLen > arrows[best].outLen ? i : best, 0);

  const handleReveal = (i: number) => {
    if (!revealed.includes(i)) setRevealed(prev => [...prev, i]);
  };

  const handleRevealAll = () => {
    setRevealed(ARROW_ANGLES.map((_, i) => i));
    setTimeout(() => setShowWinner(true), 600);
  };

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          <rect width={W} height={H} fill="white" rx="16" />
          {/* Grid */}
          {[-3,-2,-1,0,1,2,3].map(i => (
            <g key={i}>
              <line x1={CX + i*SC} y1={18} x2={CX + i*SC} y2={H-18} stroke={i===0?'#94a3b8':'#f1f5f9'} strokeWidth={i===0?1.5:0.8}/>
              <line x1={18} y1={CY-i*SC} x2={W-18} y2={CY-i*SC} stroke={i===0?'#94a3b8':'#f1f5f9'} strokeWidth={i===0?1.5:0.8}/>
            </g>
          ))}

          {/* Input arrows (unit length) */}
          {arrows.map((a, i) => {
            const isWinner = i === winnerIdx;
            const isRevealed = revealed.includes(i);
            const color = showWinner && isWinner ? '#0891B2' : isRevealed ? '#e2e8f0' : '#cbd5e1';
            const ex = CX + a.ix * SC, ey = CY - a.iy * SC;
            return (
              <g key={i}>
                <line x1={CX} y1={CY} x2={ex} y2={ey}
                  stroke={color} strokeWidth={showWinner && isWinner ? 3 : 1.5}
                  markerEnd={`url(#svd-arr-${i})`} />
                <defs>
                  <marker id={`svd-arr-${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 Z" fill={color} />
                  </marker>
                </defs>
              </g>
            );
          })}

          {/* Output arrows */}
          {revealed.map(i => {
            const a = arrows[i];
            const isWinner = i === winnerIdx && showWinner;
            const color = isWinner ? '#0891B2' : '#94a3b8';
            const ex = CX + a.ox * SC, ey = CY - a.oy * SC;
            return (
              <motion.g key={`out-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <defs>
                  <marker id={`svd-out-arr-${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 Z" fill={color} />
                  </marker>
                </defs>
                <line x1={CX} y1={CY} x2={ex} y2={ey}
                  stroke={color} strokeWidth={isWinner ? 4 : 2}
                  strokeOpacity={isWinner ? 1 : 0.5}
                  markerEnd={`url(#svd-out-arr-${i})`} />
                {isWinner && (
                  <text x={ex + 8} y={ey - 8} fill="#0891B2" fontSize="11" fontWeight="bold">
                    LONGEST ✓
                  </text>
                )}
              </motion.g>
            );
          })}

          {/* Winner highlight */}
          <AnimatePresence>
            {showWinner && (
              <motion.circle
                cx={CX + arrows[winnerIdx].ox * SC}
                cy={CY - arrows[winnerIdx].oy * SC}
                r={10}
                fill="none" stroke="#0891B2" strokeWidth="3"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              />
            )}
          </AnimatePresence>
        </svg>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
            The Stretching Contest
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Feed arrows pointing in every direction through the matrix. Some come out huge. Some tiny.
          </p>
        </div>

        <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
          <p className="text-cyan-800 font-black text-base">The Big Question:</p>
          <p className="text-cyan-700 text-base font-medium mt-1">
            Which input direction gets stretched the <strong>most</strong>?
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {arrows.map((a, i) => (
            <button
              key={i}
              onClick={() => handleReveal(i)}
              className={`px-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border
                ${revealed.includes(i)
                  ? 'bg-slate-100 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-400 hover:text-cyan-700 hover:bg-cyan-50'
                }`}
            >
              {a.deg}°
            </button>
          ))}
        </div>

        {revealed.length > 0 && !showWinner && (
          <div className="bg-white border border-slate-200 rounded-2xl p-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Output lengths</p>
            {revealed.map(i => (
              <div key={i} className="flex items-center gap-2 text-sm mb-1">
                <span className="font-mono text-slate-500 w-10">{arrows[i].deg}°</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${(arrows[i].outLen / 3) * 100}%` }}
                  />
                </div>
                <span className="font-mono font-bold text-slate-600 w-10 text-right">{arrows[i].outLen.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        {!showWinner && (
          <button
            onClick={handleRevealAll}
            className="w-full py-4 bg-cyan-600 text-white font-black rounded-2xl text-lg cursor-pointer hover:bg-cyan-700 active:scale-95 transition-all"
          >
            Reveal Champion Direction →
          </button>
        )}

        <AnimatePresence>
          {showWinner && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 text-white rounded-2xl p-4 text-center"
            >
              <p className="font-black text-lg text-cyan-400">Champion Found!</p>
              <p className="text-slate-300 text-sm mt-1">
                The direction at ~{arrows[winnerIdx].deg}° stretches longest.<br />
                Mathematicians call this the <strong className="text-white">First Right Singular Vector.</strong>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
