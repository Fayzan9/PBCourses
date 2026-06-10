import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

type Cell = { val: string; active: boolean };

const MatrixGrid: React.FC<{ cells: Cell[]; accent: string }> = ({ cells, accent }) => (
  <div className="grid grid-cols-2 gap-1.5">
    {cells.map((c, i) => (
      <div
        key={i}
        className={`w-14 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
          c.active
            ? `border-current text-white`
            : 'border-slate-200 bg-slate-50 text-slate-400'
        }`}
        style={c.active ? { backgroundColor: accent, borderColor: accent } : undefined}
      >
        {c.val}
      </div>
    ))}
  </div>
);

const insights = [
  {
    name: 'Scaling',
    accent: '#E11D48',
    cells: [
      { val: 's', active: true },
      { val: '0', active: false },
      { val: '0', active: false },
      { val: 's', active: true },
    ],
    tagline: 'Diagonal carries the scale factor',
  },
  {
    name: 'Rotation',
    accent: '#7C3AED',
    cells: [
      { val: 'cos θ', active: true },
      { val: '−sin θ', active: true },
      { val: 'sin θ',  active: true },
      { val: 'cos θ',  active: true },
    ],
    tagline: 'All four slots drive the circular sweep',
  },
  {
    name: 'Shear',
    accent: '#D97706',
    cells: [
      { val: '1', active: false },
      { val: 'k', active: true },
      { val: '0', active: false },
      { val: '1', active: false },
    ],
    tagline: 'One off-diagonal slot tilts the grid',
  },
];

export const Scene4_8_FourNumbers: React.FC = () => {
  const [revealed, setRevealed] = useState(0);

  return (
    <SlideLayout
      title="Just 4 Numbers"
      text="Every transformation we've seen — scale, rotate, shear — is fully described by arranging just 4 numbers in a 2×2 grid. This grid is called a matrix."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {insights.map((s, i) => (
            <button
              key={i}
              onClick={() => setRevealed(Math.max(revealed, i + 1))}
              className={`px-3 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                revealed > i
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-white border-slate-100 text-slate-300 hover:border-slate-200'
              }`}
            >
              <span
                className="block text-xs font-black mb-2 uppercase tracking-wide"
                style={{ color: revealed > i ? s.accent : '#cbd5e1' }}
              >
                {s.name}
              </span>
              <div className={`transition-opacity ${revealed > i ? 'opacity-100' : 'opacity-30'}`}>
                <MatrixGrid cells={s.cells} accent={s.accent} />
              </div>
              {revealed > i && (
                <p className="text-[11px] text-slate-500 font-medium mt-2">{s.tagline}</p>
              )}
            </button>
          ))}
          {revealed === 0 && (
            <p className="text-xs text-slate-400 font-medium px-1">Click each to reveal the pattern →</p>
          )}
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full">
        <div className="flex items-center gap-3">
          <div className="text-6xl text-slate-300 font-thin select-none" style={{ lineHeight: 1.1 }}>
            [
          </div>
          <div className="grid grid-cols-2 gap-4 px-2">
            {[
              { val: 'a', color: 'text-rose-500',   bg: 'bg-rose-50   border-rose-200',   pos: 'top-left' },
              { val: 'b', color: 'text-amber-500',  bg: 'bg-amber-50  border-amber-200',  pos: 'top-right' },
              { val: 'c', color: 'text-violet-500', bg: 'bg-violet-50 border-violet-200', pos: 'bottom-left' },
              { val: 'd', color: 'text-sky-500',    bg: 'bg-sky-50    border-sky-200',    pos: 'bottom-right' },
            ].map(cell => (
              <div
                key={cell.val}
                className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center ${cell.bg}`}
              >
                <span className={`text-4xl font-black ${cell.color}`}>{cell.val}</span>
                <span className="text-[9px] text-slate-400 font-mono uppercase mt-1">{cell.pos}</span>
              </div>
            ))}
          </div>
          <div className="text-6xl text-slate-300 font-thin select-none" style={{ lineHeight: 1.1 }}>
            ]
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-500 text-center text-base font-medium max-w-md"
        >
          Change these 4 numbers → the entire transformation changes.
        </motion.p>
      </div>
    </SlideLayout>
  );
};
export default Scene4_8_FourNumbers;
