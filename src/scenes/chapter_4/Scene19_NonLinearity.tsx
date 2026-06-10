import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';

const reluFn    = (x: number) => Math.max(0, x);
const sigmoidFn = (x: number) => 1 / (1 + Math.exp(-x));
const tanhFn    = (x: number) => Math.tanh(x);

const ACTIVATIONS = [
  {
    name: 'ReLU',
    fn: reluFn,
    color: '#E11D48',
    analogy: 'Like an on/off switch: negative signals are killed, positive signals pass through unchanged.',
    desc: 'The most popular choice. Fast, effective, and simple.',
    formula: '\\max(0, x)',
  },
  {
    name: 'Sigmoid',
    fn: sigmoidFn,
    color: '#0284C7',
    analogy: 'Like a dimmer switch: squashes any number into 0–1 range. Perfect for representing probabilities.',
    desc: 'Used when the output needs to be a probability.',
    formula: '\\frac{1}{1+e^{-x}}',
  },
  {
    name: 'Tanh',
    fn: tanhFn,
    color: '#7C3AED',
    analogy: 'Like a symmetric dimmer: squashes into −1 to +1. Balanced around zero.',
    desc: "Often works better than sigmoid because it's centred at zero.",
    formula: '\\tanh(x)',
  },
];

export const Scene4_19_NonLinearity: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const act = ACTIVATIONS[selected];

  const W = 400, H = 220;
  const xMin = -4, xMax = 4, yMin = -1.4, yMax = 1.4;
  const toX = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
  const toY = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;

  const xs = Array.from({ length: 240 }, (_, i) => xMin + (i / 239) * (xMax - xMin));
  const pathD = xs.map((x, i) => {
    const y = act.fn(x);
    return `${i === 0 ? 'M' : 'L'} ${toX(x).toFixed(1)} ${toY(y).toFixed(1)}`;
  }).join(' ');

  return (
    <SlideLayout
      title="The Bend That Makes It Powerful"
      text="Without non-linearity, stacking 100 matrix layers still gives one straight-line transformation. Activation functions introduce the curves that let networks learn complex patterns."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-amber-700 block mb-1">The ruler analogy</span>
            Stacking 100 straight rulers still gives you a straight ruler. To draw a curve, you need something that bends.
          </div>

          {ACTIVATIONS.map((a, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`px-4 py-2.5 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                selected === i ? 'shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
              style={selected === i ? { backgroundColor: `${a.color}12`, borderColor: `${a.color}50`, color: a.color } : {}}
            >
              <span className="block font-black">{a.name}</span>
              <KaTeXMath tex={a.formula} />
            </button>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-snug">{act.analogy}</p>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm w-full p-5">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
            {act.name} — the bend it introduces
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {[-3, -2, -1, 0, 1, 2, 3].map(x => (
              <line key={`gx${x}`} x1={toX(x)} y1={0} x2={toX(x)} y2={H} stroke="#f1f5f9" strokeWidth="1" />
            ))}
            {[-1, -0.5, 0, 0.5, 1].map(y => (
              <line key={`gy${y}`} x1={0} y1={toY(y)} x2={W} y2={toY(y)} stroke="#f1f5f9" strokeWidth="1" />
            ))}
            <line x1={0} y1={toY(0)} x2={W} y2={toY(0)} stroke="#94a3b8" strokeWidth="1.5" />
            <line x1={toX(0)} y1={0} x2={toX(0)} y2={H} stroke="#94a3b8" strokeWidth="1.5" />
            <motion.path
              key={selected}
              d={pathD} fill="none" stroke={act.color} strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
            <text x={W - 6} y={toY(0) - 6} fill="#94a3b8" fontSize="11" textAnchor="end">x →</text>
          </svg>
        </div>
        <p className="text-sm text-slate-500 text-center font-medium max-w-md">{act.desc}</p>
      </div>
    </SlideLayout>
  );
};
export default Scene4_19_NonLinearity;
