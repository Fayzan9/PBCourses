import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type Vec2, type Mat2, mulMV, norm, fmt } from '../../components/mathHelpers';
import { useAnimatedMatrix, MARKER_DEFS, SvgGridLines } from '../../components/TransformGrid';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';



export const Scene5_9_GeometricPicture: React.FC = () => {
  const presets: {
    name: string; desc: string; M: Mat2;
    evecs: { vec: Vec2; label: string; color: string; marker: string; λ: number }[];
    hasReal: boolean; noEigenNote?: string;
  }[] = [
    {
      name: 'Stretch X',
      desc: 'Stretches rightward by 3×, leaves upward unchanged.',
      M: [[3, 0], [0, 1]],
      hasReal: true,
      evecs: [
        { vec: [1, 0], label: '→ [1,0]', color: '#E11D48', marker: 'red',   λ: 3 },
        { vec: [0, 1], label: '↑ [0,1]', color: '#0284C7', marker: 'blue',  λ: 1 },
      ],
    },
    {
      name: 'Scale Both',
      desc: 'Scales every direction equally by 2×. Every vector is an eigenvector!',
      M: [[2, 0], [0, 2]],
      hasReal: true,
      evecs: [
        { vec: [1, 0], label: '→',        color: '#E11D48', marker: 'red',    λ: 2 },
        { vec: [0, 1], label: '↑',        color: '#0284C7', marker: 'blue',   λ: 2 },
        { vec: [1, 1], label: '↗',        color: '#7C3AED', marker: 'violet', λ: 2 },
      ],
    },
    {
      name: 'Shear',
      desc: 'Shoves everything rightward. Only the horizontal direction survives unchanged.',
      M: [[1, 1], [0, 1]],
      hasReal: true,
      evecs: [
        { vec: [1, 0], label: '→ [1,0]', color: '#E11D48', marker: 'red', λ: 1 },
      ],
    },
    {
      name: 'Rotation 45°',
      desc: 'Spins everything 45°. No real direction survives — every vector tilts.',
      M: [[0.71, -0.71], [0.71, 0.71]],
      hasReal: false,
      noEigenNote: 'Pure rotation spins all vectors. No real eigenvectors exist.',
      evecs: [],
    },
  ];

  const [active, setActive]     = useState(0);
  const [shown, setShown]       = useState<number[]>([]);
  const [showOutput, setShowOutput] = useState(false);

  const p = presets[active];
  const animated = useAnimatedMatrix(p.M, 600);

  const switchPreset = (i: number) => { setActive(i); setShown([]); setShowOutput(false); };
  const toggleVec = (i: number) => {
    setShown(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
    setShowOutput(false);
  };

  const W = 500, H = 500, CX = W / 2, CY = H / 2, SC = 82;
  const tp  = (v: Vec2): [number, number] => [CX + v[0] * SC, CY - v[1] * SC];
  const tpM = (v: Vec2): [number, number] => {
    const out = mulMV(animated, v);
    return [CX + out[0] * SC, CY - out[1] * SC];
  };

  const testVec: Vec2 = [0.6, 0.8];
  const testOut  = mulMV(p.M, testVec);
  const testNI   = norm(testVec), testNO = norm(testOut);
  const testDot  = Math.min(1, Math.max(-1, testNI[0]*testNO[0] + testNI[1]*testNO[1]));
  const testRot  = Math.acos(testDot) * 180 / Math.PI;

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          {MARKER_DEFS}
          <defs>
            <radialGradient id="c5g9-bg" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#f5f3ff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#c5g9-bg)" rx="18" />
          {/* Unit circle reference */}
          <circle cx={CX} cy={CY} r={SC}
            fill="none" stroke="#c4b5fd" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.6" />
          <SvgGridLines cx={CX} cy={CY} scale={SC} range={3} width={W} height={H} showTicks={true} />

          {p.evecs.map((ev, i) => {
            if (!shown.includes(i)) return null;
            const beforeTip = tp(ev.vec);
            const afterTip  = showOutput ? tpM(ev.vec) : beforeTip;
            const scaled    = mulMV(p.M, ev.vec);
            const nx = CX + ev.vec[0] * SC * 3.2, ny = CY - ev.vec[1] * SC * 3.2;

            return (
              <g key={i}>
                {/* Direction ray */}
                <line x1={CX} y1={CY} x2={nx} y2={ny}
                  stroke={ev.color} strokeWidth="1" strokeDasharray="5 4" opacity="0.18" />
                {/* Glow halo on before vector */}
                <line x1={CX} y1={CY} x2={beforeTip[0]} y2={beforeTip[1]}
                  stroke={ev.color} strokeWidth="10" strokeLinecap="round" opacity="0.14" />
                <line x1={CX} y1={CY} x2={beforeTip[0]} y2={beforeTip[1]}
                  stroke={ev.color} strokeWidth="3" strokeDasharray="8 4"
                  markerEnd={`url(#g4-${ev.marker})`} />
                {/* Label badge */}
                {(() => {
                  const ox = ev.vec[0] >= 0 ? 8 : -8;
                  const lx = beforeTip[0] + ox;
                  const ly = beforeTip[1] - 16;
                  const txt = `[${fmt(ev.vec[0])},${fmt(ev.vec[1])}]`;
                  const w = txt.length * 5.8 + 10;
                  return (
                    <g>
                      <rect x={lx - 2} y={ly - 12} width={w} height={16} rx="4"
                        fill={ev.color} opacity="0.9" />
                      <text x={lx + w/2 - 2} y={ly} textAnchor="middle"
                        fill="white" fontSize="10" fontWeight="bold">{txt}</text>
                    </g>
                  );
                })()}
                {showOutput && (
                  <motion.g key={`after-${i}-${active}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Glow halo on after vector */}
                    <line x1={CX} y1={CY} x2={afterTip[0]} y2={afterTip[1]}
                      stroke={ev.color} strokeWidth="14" strokeLinecap="round" opacity="0.18" />
                    <line x1={CX} y1={CY} x2={afterTip[0]} y2={afterTip[1]}
                      stroke={ev.color} strokeWidth="5"
                      markerEnd={`url(#g4-${ev.marker})`} />
                    <circle cx={afterTip[0]} cy={afterTip[1]} r="5" fill={ev.color} />
                    <circle cx={afterTip[0]} cy={afterTip[1]} r="9" fill="none" stroke={ev.color} strokeWidth="1.5" opacity="0.3" />
                    {(() => {
                      const bx = afterTip[0] + (scaled[0] >= 0 ? 10 : -10);
                      const by = afterTip[1] + (scaled[1] <= 0 ? -16 : 10);
                      const txt = `×${fmt(ev.λ)} = [${fmt(scaled[0])},${fmt(scaled[1])}]`;
                      const w = txt.length * 5.8 + 10;
                      return (
                        <g>
                          <rect x={bx - 2} y={by - 13} width={w} height={17} rx="4"
                            fill={ev.color} opacity="0.9" />
                          <text x={bx + w/2 - 2} y={by + 1} textAnchor="middle"
                            fill="white" fontSize="10" fontWeight="bold">{txt}</text>
                        </g>
                      );
                    })()}
                    <text x={CX + ev.vec[0] * SC * 1.5 + 6}
                          y={CY - ev.vec[1] * SC * 1.5 + 4}
                      fill={ev.color} fontSize="9" opacity="0.6" fontWeight="bold">✓ same dir</text>
                  </motion.g>
                )}
              </g>
            );
          })}

          {!p.hasReal && shown.includes(99) && (
            <g>
              {(() => {
                const bTip = tp(testVec);
                const aTip = showOutput ? tpM(testVec) : bTip;
                const outV = mulMV(p.M, testVec);

                const arcR = 55;
                const aS = Math.atan2(-testVec[1], testVec[0]);
                const aE = Math.atan2(-outV[1], outV[0]);
                let sw = aE - aS; if (sw > Math.PI) sw -= 2*Math.PI; if (sw < -Math.PI) sw += 2*Math.PI;
                const ax1r = CX + arcR * Math.cos(aS), ay1r = CY + arcR * Math.sin(aS);
                const ax2r = CX + arcR * Math.cos(aE), ay2r = CY + arcR * Math.sin(aE);
                const midA = aS + sw / 2;
                const arcLX2 = CX + (arcR + 22) * Math.cos(midA);
                const arcLY2 = CY + (arcR + 22) * Math.sin(midA);

                return (
                  <>
                    <line x1={CX} y1={CY} x2={bTip[0]} y2={bTip[1]}
                      stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" opacity="0.14" />
                    <line x1={CX} y1={CY} x2={bTip[0]} y2={bTip[1]}
                      stroke="#94a3b8" strokeWidth="3" strokeDasharray="8 4" markerEnd="url(#g4-slate)" />
                    {(() => {
                      const txt = `[${fmt(testVec[0])},${fmt(testVec[1])}]`;
                      const w = txt.length * 5.8 + 10;
                      return (
                        <g>
                          <rect x={bTip[0] + 6} y={bTip[1] - 28} width={w} height={16} rx="4" fill="#64748B" opacity="0.9" />
                          <text x={bTip[0] + 6 + w/2} y={bTip[1] - 16} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{txt}</text>
                        </g>
                      );
                    })()}
                    {showOutput && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <line x1={CX} y1={CY} x2={aTip[0]} y2={aTip[1]}
                          stroke="#E11D48" strokeWidth="12" strokeLinecap="round" opacity="0.18" />
                        <line x1={CX} y1={CY} x2={aTip[0]} y2={aTip[1]}
                          stroke="#E11D48" strokeWidth="5" markerEnd="url(#g4-red)" />
                        <text x={aTip[0] + 8} y={aTip[1] - 14} fill="#E11D48" fontSize="10" fontWeight="bold">
                          [{fmt(outV[0])},{fmt(outV[1])}]
                        </text>
                        <path d={`M ${ax1r} ${ay1r} A ${arcR} ${arcR} 0 0 ${sw > 0 ? 1 : 0} ${ax2r} ${ay2r}`}
                          fill="none" stroke="#E11D48" strokeWidth="2.5" />
                        <circle cx={ax2r} cy={ay2r} r="4" fill="#E11D48" />
                        <rect x={arcLX2 - 26} y={arcLY2 - 12} width="52" height="17" rx="5" fill="#E11D48" />
                        <text x={arcLX2} y={arcLY2 + 1} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                          {testRot.toFixed(0)}° tilt
                        </text>
                      </motion.g>
                    )}
                  </>
                );
              })()}
            </g>
          )}

          {!p.hasReal && shown.length === 0 && (
            <g>
              <rect x={CX - 130} y={CY - 26} width={260} height={52} rx="12" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5" />
              <text x={CX} y={CY - 7} textAnchor="middle" fill="#D97706" fontSize="12" fontWeight="800">
                Every vector rotates 45°
              </text>
              <text x={CX} y={CY + 12} textAnchor="middle" fill="#D97706" fontSize="11">
                No direction survives — no real eigenvectors
              </text>
            </g>
          )}
          {/* Origin */}
          <circle cx={CX} cy={CY} r="5.5" fill="#0f172a" />
          <circle cx={CX} cy={CY} r="10" fill="none" stroke="#0f172a" strokeWidth="1.2" opacity="0.15" />
        </svg>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-xl font-black text-slate-800 leading-tight mb-1">Seeing Eigenvectors</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Pick a matrix, select a direction to test, then apply M to see if it keeps pointing the same way.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Choose a matrix</div>
          {presets.map((pr, i) => (
            <button key={i} onClick={() => switchPreset(i)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                i === active
                  ? 'bg-slate-800 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}>
              <div className="font-black text-sm">{pr.name}</div>
              <div className={`text-[10px] font-normal mt-0.5 ${i === active ? 'text-slate-300' : 'text-slate-400'}`}>{pr.desc}</div>
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
            {p.hasReal ? 'Select a direction to test' : 'Test any direction'}
          </div>

          {p.hasReal ? (
            <div className="flex flex-col gap-1.5">
              {p.evecs.map((ev, i) => (
                <button key={i} onClick={() => toggleVec(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    shown.includes(i) ? 'bg-white border-slate-300 shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}>
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ev.color }} />
                  <span style={{ color: ev.color }}>{ev.label}</span>
                  <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">eigen  λ={fmt(ev.λ)}</span>
                </button>
              ))}
            </div>
          ) : (
            <button onClick={() => { setShown([99]); setShowOutput(false); }}
              className="w-full px-3 py-2 rounded-xl border bg-slate-50 border-slate-200 hover:bg-white text-xs font-bold text-slate-600 cursor-pointer transition-all">
              Show a test vector →
            </button>
          )}
        </div>

        {shown.length > 0 && (
          <div className="flex gap-2">
            <button onClick={() => setShowOutput(true)}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs cursor-pointer transition-all">
              Apply M →
            </button>
            <button onClick={() => { setShown([]); setShowOutput(false); }}
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs cursor-pointer transition-all">
              Reset
            </button>
          </div>
        )}

        {showOutput && shown.length > 0 && (
          <motion.div key={`result-${active}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {p.hasReal ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3">
                <div className="font-black text-sm text-emerald-700 mb-1.5">✓ Direction preserved!</div>
                <div className="text-[11px] text-slate-600 flex flex-col gap-1">
                  {shown.map(i => {
                    const ev = p.evecs[i];
                    const out = mulMV(p.M, ev.vec);
                    return (
                      <div key={i} className="font-mono">
                        <span style={{ color: ev.color }}>[{fmt(ev.vec[0])},{fmt(ev.vec[1])}]</span>
                        <span className="text-slate-400"> → </span>
                        <span className="font-bold">[{fmt(out[0])},{fmt(out[1])}]</span>
                        <span className="text-emerald-600 font-bold"> = {fmt(ev.λ)}×</span>
                      </div>
                    );
                  })}
                  <div className="text-emerald-700 font-bold mt-1 text-[10px]">
                    Same direction, just scaled by λ. That's the definition of an eigenvector.
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3">
                <div className="font-black text-sm text-rose-700 mb-1.5">✗ Direction changed by {testRot.toFixed(0)}°</div>
                <div className="text-[11px] text-slate-600">
                  For a pure rotation, every vector gets spun. There's no real direction that can survive — no real eigenvectors.
                </div>
                <div className="text-rose-600 font-bold text-[11px] mt-1.5">
                  Eigenvectors exist only in the complex numbers for rotations.
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
