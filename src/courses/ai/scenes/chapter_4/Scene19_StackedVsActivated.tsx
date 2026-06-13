import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

// ── Math ───────────────────────────────────────────────────────────────────
type M2x2 = [[number,number],[number,number]];
type V2   = [number,number];

const mulM = (M: M2x2, x: number, y: number): V2 =>
  [M[0][0]*x + M[0][1]*y, M[1][0]*x + M[1][1]*y];
const sig = (v: number) => 1 / (1 + Math.exp(-v));

const M1: M2x2    = [[0.8, 0.6], [-0.5, 0.7]];
const M2mat: M2x2 = [[1.0, -0.6], [0.5, 0.9]];

// ── Activation catalogue ───────────────────────────────────────────────────
type ActKey = 'none' | 'relu' | 'sigmoid' | 'tanh';

const ACT_FN: Record<ActKey, (x: number, y: number) => V2> = {
  none:    (x, y) => [x, y],
  relu:    (x, y) => [Math.max(0, x), Math.max(0, y)],
  sigmoid: (x, y) => [sig(x),         sig(y)],
  tanh:    (x, y) => [Math.tanh(x),   Math.tanh(y)],
};

type ActMeta = { label: string; formula: string; color: string; light: string; border: string; range: string; effect: string; fold: string };
const ACT_META: Record<ActKey, ActMeta> = {
  none: {
    label:'None (linear)', formula:'f(x) = x',    color:'#64748b', light:'#f8fafc', border:'#e2e8f0',
    range:'−∞ to +∞', effect:'No change — right panel stays identical to left. This is why activation is needed.',
    fold: 'no fold',
  },
  relu: {
    label:'ReLU',          formula:'max(0, x)',    color:'#E11D48', light:'#fff1f2', border:'#fecdd3',
    range:'0 to ∞',   effect:'Clamps all negatives to zero — the grid folds into a corner shape.',
    fold: 'negatives → 0',
  },
  sigmoid: {
    label:'Sigmoid',       formula:'1/(1+e⁻ˣ)',   color:'#0284C7', light:'#e0f2fe', border:'#7dd3fc',
    range:'0 to 1',   effect:'Squashes every value into (0, 1) — dots compress toward the top-right.',
    fold: 'squashed to (0,1)²',
  },
  tanh: {
    label:'Tanh',          formula:'tanh(x)',      color:'#7C3AED', light:'#f5f3ff', border:'#ddd6fe',
    range:'−1 to +1', effect:'Squashes symmetrically into (−1, 1) — like Sigmoid but centred at zero.',
    fold: 'squashed to (−1,1)²',
  },
};

const ACT_KEYS: ActKey[] = ['none', 'relu', 'sigmoid', 'tanh'];

// ── 5×5 dot grid (precompute all activation variants) ─────────────────────
const VALS = [-1, -0.5, 0, 0.5, 1];
type Dot = {
  orig: V2;
  h1:   V2;
  ha:   Record<ActKey, V2>;
  finL: V2;
  finA: Record<ActKey, V2>;
  fill: string;
};
const DOTS: Dot[] = VALS.flatMap(x => VALS.map(y => {
  const h1 = mulM(M1, x, y);
  const ha = {} as Record<ActKey, V2>;
  const finA = {} as Record<ActKey, V2>;
  ACT_KEYS.forEach(k => {
    ha[k]   = ACT_FN[k](h1[0], h1[1]);
    finA[k] = mulM(M2mat, ha[k][0], ha[k][1]);
  });
  const finL = mulM(M2mat, h1[0], h1[1]);
  const fill = x>=0&&y>=0 ? '#E11D48' : x<0&&y>=0 ? '#0284C7' : x<0&&y<0 ? '#7C3AED' : '#D97706';
  return { orig:[x,y], h1, ha, finL, finA, fill };
}));

// ── SVG layout ─────────────────────────────────────────────────────────────
const SC = 64, LCX = 110, RCX = 368, CY = 148;
const lx  = (v: number) => LCX + v * SC;
const rx  = (v: number) => RCX + v * SC;
const svY = (v: number) => CY  - v * SC;

const linPos = (d: Dot, s: number): V2 =>
  s === 0 ? d.orig : s <= 2 ? d.h1 : d.finL;
const nlPos = (d: Dot, s: number, act: ActKey): V2 =>
  s === 0 ? d.orig : s === 1 ? d.h1 : s === 2 ? d.ha[act] : d.finA[act];

// Mini 1D curve path for thumbnail
const miniPath = (fn: (x:number)=>number, w=60, h=28, xr=4, yr=1.5) =>
  Array.from({length:60},(_,i)=>{
    const xv = -xr + (i/59)*2*xr;
    const yv = Math.min(Math.max(fn(xv),-yr),yr);
    const px = (i/59)*w, py = h - ((yv+yr)/(2*yr))*h;
    return `${i===0?'M':'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
  }).join(' ');

const MINI_FNS: Record<ActKey,(x:number)=>number> = {
  none: x=>x, relu: x=>Math.max(0,x), sigmoid: x=>sig(x), tanh: x=>Math.tanh(x),
};

// Stage descriptions (updated per activation)
const stageDesc = (act: ActKey): string[] => [
  '25 dots, colored by starting quadrant. Both pipelines process the same input.',
  'M₁ applied — rotates and shears both grids identically. Still no divergence.',
  ACT_META[act].effect,
  `M₂ applied to both. Left = always a parallelogram. Right depends on ${ACT_META[act].label}.`,
];

export const Scene4_19_StackedVsActivated: React.FC = () => {
  const [act, setAct]       = useState<ActKey>('relu');
  const [stage, setStage]   = useState(0);
  const [playing, setPlaying] = useState(false);

  // Auto-play through stages when Play is clicked
  useEffect(() => {
    if (!playing) return;
    const timers = [1, 2, 3].map((s, i) =>
      setTimeout(() => {
        setStage(s);
        if (s === 3) setPlaying(false);
      }, (i + 1) * 950)
    );
    return () => timers.forEach(clearTimeout);
  }, [playing]);

  // Reset to stage 0 when activation changes
  const handleActChange = (k: ActKey) => { setAct(k); setStage(0); setPlaying(false); };
  const handlePlay = () => { if (playing) return; setStage(0); setPlaying(true); };

  const meta = ACT_META[act];
  const diverged = act !== 'none' && stage >= 2;

  return (
    <SlideLayout
      title="Same Matrices, Different Result"
      text="Select an activation, hit Run — watch what it does between layers."
      sidebarContent={
        <div className="flex flex-col gap-3">

          {/* Activation selector */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Choose activation
            </p>
            <div className="flex flex-col gap-1.5">
              {ACT_KEYS.map(k => {
                const m = ACT_META[k];
                return (
                  <button key={k} onClick={() => handleActChange(k)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer text-left"
                    style={act === k
                      ? { backgroundColor: m.light, borderColor: m.color }
                      : { backgroundColor: '#fff', borderColor: '#e2e8f0' }}>
                    {/* Mini curve thumbnail */}
                    <svg viewBox="0 0 60 28" className="w-10 h-6 shrink-0 rounded">
                      <line x1="0" y1="14" x2="60" y2="14" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="30" y1="0"  x2="30" y2="28" stroke="#f1f5f9" strokeWidth="1" />
                      <path d={miniPath(MINI_FNS[k])} fill="none"
                        stroke={act === k ? m.color : '#cbd5e1'} strokeWidth={act===k?2:1.5} />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <span className="font-black block" style={{ color: act === k ? m.color : '#64748b' }}>
                        {m.label}
                      </span>
                      <span className="font-mono text-[10px] opacity-60">{m.formula}</span>
                    </div>
                    {act === k && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: m.color, color: '#fff' }}>
                        {m.range}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Run / step controls */}
          <div className="flex gap-2">
            <button onClick={handlePlay} disabled={playing}
              className="flex-1 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all disabled:opacity-50"
              style={{ backgroundColor: playing ? '#f1f5f9' : meta.color, color: playing ? '#94a3b8' : '#fff', border: 'none' }}>
              {playing ? '▶ Running…' : '▶ Run'}
            </button>
            <button onClick={() => { setPlaying(false); setStage(s => Math.max(0, s-1)); }}
              disabled={playing || stage === 0}
              className="px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-30 cursor-pointer">
              ←
            </button>
            <button onClick={() => { setPlaying(false); setStage(s => Math.min(3, s+1)); }}
              disabled={playing || stage === 3}
              className="px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-30 cursor-pointer">
              →
            </button>
          </div>

          {/* Current stage insight */}
          <AnimatePresence mode="wait">
            <motion.div key={`${act}-${stage}`}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-2xl border px-4 py-3"
              style={{ backgroundColor: stage === 2 ? meta.light : '#fffbeb', borderColor: stage === 2 ? meta.border : '#fde68a' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1"
                style={{ color: stage === 2 ? meta.color : '#d97706' }}>
                {['Setup','Linear step', act === 'none' ? 'No fold' : 'The fold ←', 'The payoff'][stage]}
              </p>
              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                {stageDesc(act)[stage]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Feynman card */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Feynman take</p>
            <p className="text-xs text-slate-600 font-medium leading-snug">
              Fold paper, <em>then</em> draw a straight line —
              after unfolding, the line is curved.
            </p>
            <p className="text-xs font-black text-slate-800 mt-1.5">Activation is the fold. Matrix is the pen.</p>
          </div>

          {/* Color key */}
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white border border-slate-200 px-3 py-2.5">
            {[
              { c:'#E11D48', lbl:'x≥0, y≥0' },
              { c:'#0284C7', lbl:'x<0, y≥0' },
              { c:'#7C3AED', lbl:'x<0, y<0' },
              { c:'#D97706', lbl:'x≥0, y<0' },
            ].map(({ c, lbl }) => (
              <div key={lbl} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c }} />
                <span className="text-[10px] font-mono text-slate-500">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex flex-col gap-2 p-2 items-center justify-center">

        {/* Pipeline headers */}
        <div className="flex w-full">
          <div className="flex-1 flex items-center justify-center gap-1">
            {['Input','M₁','M₂','Out'].map((lbl, i) => (
              <React.Fragment key={lbl}>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded transition-all ${
                  (i===1&&stage>=1)||(i===2&&stage>=3) ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-400'
                }`}>{lbl}</span>
                {i < 3 && <span className="text-slate-300 text-[10px]">→</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center gap-1">
            {['Input','M₁', ACT_META[act].label.split(' ')[0], 'M₂','Out'].map((lbl, i) => (
              <React.Fragment key={`${lbl}-${i}`}>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded transition-all ${
                  (i===1&&stage>=1) ? 'bg-slate-800 text-white' :
                  (i===2&&stage>=2) ? 'text-white' :
                  (i===3&&stage>=3) ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-400'
                }`}
                style={(i===2&&stage>=2) ? { backgroundColor: meta.color } : {}}>
                  {lbl}
                </span>
                {i < 4 && <span className="text-slate-300 text-[10px]">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Panel labels */}
        <div className="flex w-full px-1">
          <div className="flex-1 text-center">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wide">Linear only</span>
            {stage===3 && <span className="ml-1.5 text-[10px] font-bold text-slate-500">always a parallelogram</span>}
          </div>
          <div className="flex-1 text-center">
            <span className="text-[11px] font-black uppercase tracking-wide" style={{ color: meta.color }}>
              With {ACT_META[act].label.split(' ')[0]}
            </span>
            {stage===3 && act!=='none' && (
              <span className="ml-1.5 text-[10px] font-bold" style={{ color: meta.color }}>
                {meta.fold}
              </span>
            )}
          </div>
        </div>

        {/* Main SVG */}
        <svg viewBox="0 0 478 296" className="w-full h-full max-h-full rounded-2xl">

          {/* Panel backgrounds */}
          <rect x={1} y={1} width={236} height={294} rx={14} fill="#fafbfc" stroke="#e2e8f0" strokeWidth="1.5" />
          <rect x={241} y={1} width={236} height={294} rx={14}
            fill={diverged ? meta.light : '#fafbfc'}
            stroke={diverged ? meta.border : '#e2e8f0'} strokeWidth="1.5" />

          {/* Divider */}
          <line x1={238} y1={0} x2={238} y2={296} stroke="#e2e8f0" strokeWidth="2" />

          {/* Grid — left */}
          {[-2,-1,0,1,2].map(v => (
            <g key={`gl${v}`}>
              <line x1={lx(v)} y1={2} x2={lx(v)} y2={294} stroke={v===0?'#94a3b8':'#f1f5f9'} strokeWidth={v===0?1.5:1} />
              <line x1={2} y1={svY(v)} x2={237} y2={svY(v)} stroke={v===0?'#94a3b8':'#f1f5f9'} strokeWidth={v===0?1.5:1} />
            </g>
          ))}

          {/* Grid — right */}
          {[-2,-1,0,1,2].map(v => (
            <g key={`gr${v}`}>
              <line x1={rx(v)} y1={2} x2={rx(v)} y2={294} stroke={v===0?'#94a3b8':'#f1f5f9'} strokeWidth={v===0?1.5:1} />
              <line x1={241} y1={svY(v)} x2={476} y2={svY(v)} stroke={v===0?'#94a3b8':'#f1f5f9'} strokeWidth={v===0?1.5:1} />
            </g>
          ))}

          {/* ReLU fold axes */}
          <AnimatePresence>
            {act === 'relu' && stage === 2 && (
              <>
                <motion.line key="fx" x1={rx(0)} y1={2} x2={rx(0)} y2={294}
                  stroke="#E11D48" strokeWidth="2" strokeDasharray="5 3"
                  initial={{opacity:0}} animate={{opacity:0.8}} exit={{opacity:0}} />
                <motion.line key="fy" x1={241} y1={svY(0)} x2={476} y2={svY(0)}
                  stroke="#E11D48" strokeWidth="2" strokeDasharray="5 3"
                  initial={{opacity:0}} animate={{opacity:0.8}} exit={{opacity:0}} />
                <motion.text key="fl" x={rx(0.08)} y={svY(0.2)} fontSize="9" fontWeight="800" fill="#E11D48"
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  fold — negatives → 0
                </motion.text>
              </>
            )}
            {act === 'sigmoid' && stage === 2 && (
              <>
                <motion.rect key="sbox"
                  x={rx(0)} y={svY(1)} width={rx(1)-rx(0)} height={svY(0)-svY(1)}
                  fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="5 3" rx={4}
                  initial={{opacity:0}} animate={{opacity:0.8}} exit={{opacity:0}} />
                <motion.text key="sl" x={rx(0.05)} y={svY(1.1)} fontSize="9" fontWeight="800" fill="#0284C7"
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  all dots in (0,1)²
                </motion.text>
              </>
            )}
            {act === 'tanh' && stage === 2 && (
              <>
                <motion.rect key="tbox"
                  x={rx(-1)} y={svY(1)} width={rx(1)-rx(-1)} height={svY(-1)-svY(1)}
                  fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray="5 3" rx={4}
                  initial={{opacity:0}} animate={{opacity:0.8}} exit={{opacity:0}} />
                <motion.text key="tl" x={rx(-0.95)} y={svY(1.1)} fontSize="9" fontWeight="800" fill="#7C3AED"
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  all dots in (−1,1)²
                </motion.text>
              </>
            )}
          </AnimatePresence>

          {/* LEFT dots (linear) */}
          {DOTS.map((d, i) => {
            const [vx, vy] = linPos(d, stage);
            return (
              <motion.circle key={`L${i}`} r={5.5} fill={d.fill} stroke="#fff" strokeWidth="1.5"
                initial={{ cx: lx(d.orig[0]), cy: svY(d.orig[1]), opacity: 0 }}
                animate={{ cx: lx(vx), cy: svY(vy), opacity: 1 }}
                transition={{
                  cx: { type:'spring', stiffness:95, damping:14, delay:(i%13)*0.022 },
                  cy: { type:'spring', stiffness:95, damping:14, delay:(i%13)*0.022 },
                  opacity: { duration:0.2 },
                }}
              />
            );
          })}

          {/* RIGHT dots (with activation) */}
          {DOTS.map((d, i) => {
            const [vx, vy] = nlPos(d, stage, act);
            return (
              <motion.circle key={`R${i}`} r={5.5} fill={d.fill} stroke="#fff" strokeWidth="1.5"
                initial={{ cx: rx(d.orig[0]), cy: svY(d.orig[1]), opacity: 0 }}
                animate={{ cx: rx(vx), cy: svY(vy), opacity: 1 }}
                transition={{
                  cx: { type:'spring', stiffness:95, damping:14, delay:(i%13)*0.022+0.08 },
                  cy: { type:'spring', stiffness:95, damping:14, delay:(i%13)*0.022+0.08 },
                  opacity: { duration:0.2, delay:0.08 },
                }}
              />
            );
          })}

          {/* Center badge */}
          <AnimatePresence mode="wait">
            {stage === 1 && (
              <motion.g key="same" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <rect x={176} y={134} width={126} height={24} rx={8} fill="#0f172a" />
                <text x={239} y={150} textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">identical here</text>
              </motion.g>
            )}
            {stage === 2 && act === 'none' && (
              <motion.g key="nonefold" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <rect x={172} y={134} width={134} height={24} rx={8} fill="#64748b" />
                <text x={239} y={150} textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">still identical</text>
              </motion.g>
            )}
            {stage === 2 && act !== 'none' && (
              <motion.g key="fold" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <rect x={180} y={134} width={118} height={24} rx={8} style={{fill: meta.color}} />
                <text x={239} y={150} textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">
                  {act === 'relu' ? 'right folds!' : act === 'sigmoid' ? 'squashed to (0,1)²' : 'squashed to (−1,1)²'}
                </text>
              </motion.g>
            )}
            {stage === 3 && act === 'none' && (
              <motion.g key="nodiff" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <rect x={162} y={134} width={154} height={24} rx={8} fill="#64748b" />
                <text x={239} y={150} textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">
                  same — activation needed!
                </text>
              </motion.g>
            )}
            {stage === 3 && act !== 'none' && (
              <motion.g key="diff" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <rect x={174} y={134} width={130} height={24} rx={8} style={{fill: meta.color}} />
                <text x={239} y={150} textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">
                  completely different
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Bottom math labels */}
          <text x={119} y={287} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">
            {['x,y','M₁·(x,y)','M₁·(x,y)','M₂·M₁·(x,y)'][stage]}
          </text>
          <text x={377} y={287} textAnchor="middle" fontSize="9" fontWeight="600"
            style={{ fill: diverged ? meta.color : '#94a3b8' }}>
            {[
              'x,y',
              'M₁·(x,y)',
              `${ACT_META[act].label.split(' ')[0]}(M₁·(x,y))`,
              `M₂·${ACT_META[act].label.split(' ')[0]}·M₁·(x,y)`,
            ][stage]}
          </text>
        </svg>
      </div>
    </SlideLayout>
  );
};
export default Scene4_19_StackedVsActivated;
