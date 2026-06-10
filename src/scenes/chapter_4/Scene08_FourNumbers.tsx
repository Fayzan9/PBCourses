import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

type Cell = { val: string; active: boolean };

const MiniMatrix: React.FC<{ cells: Cell[]; accent: string }> = ({ cells, accent }) => (
  <div className="grid grid-cols-2 gap-2">
    {cells.map((c, i) => (
      <div
        key={i}
        className="w-16 h-12 rounded-xl flex items-center justify-center font-mono text-xs font-bold"
        style={
          c.active
            ? { backgroundColor: accent, color: '#fff' }
            : { backgroundColor: '#f1f5f9', color: '#94a3b8' }
        }
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
      { val: 's', active: true  },
      { val: '0', active: false },
      { val: '0', active: false },
      { val: 's', active: true  },
    ],
  },
  {
    name: 'Rotation',
    accent: '#7C3AED',
    cells: [
      { val: 'cos θ',  active: true },
      { val: '−sin θ', active: true },
      { val: 'sin θ',  active: true },
      { val: 'cos θ',  active: true },
    ],
  },
  {
    name: 'Shear',
    accent: '#D97706',
    cells: [
      { val: '1', active: false },
      { val: 'k', active: true  },
      { val: '0', active: false },
      { val: '1', active: false },
    ],
  },
];

export const Scene4_8_FourNumbers: React.FC = () => (
  <SlideLayout
    title="Just 4 Numbers"
    text="Scale, rotate, shear — every transformation reduces to 4 numbers in a 2×2 grid."
  >
    <div className="flex flex-col items-center justify-center gap-8 w-full h-full">

      {/* Big abstract matrix */}
      <div className="flex items-center gap-3">
        <div className="text-6xl text-slate-300 font-thin select-none" style={{ lineHeight: 1.1 }}>[</div>
        <div className="grid grid-cols-2 gap-4 px-2">
          {[
            { val: 'a', color: 'text-rose-500',   bg: 'bg-rose-50   border-rose-200',   pos: 'top-left'     },
            { val: 'b', color: 'text-amber-500',  bg: 'bg-amber-50  border-amber-200',  pos: 'top-right'    },
            { val: 'c', color: 'text-violet-500', bg: 'bg-violet-50 border-violet-200', pos: 'bottom-left'  },
            { val: 'd', color: 'text-sky-500',    bg: 'bg-sky-50    border-sky-200',    pos: 'bottom-right' },
          ].map(cell => (
            <div key={cell.val}
              className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center ${cell.bg}`}>
              <span className={`text-3xl font-black ${cell.color}`}>{cell.val}</span>
              <span className="text-[9px] text-slate-400 font-mono uppercase mt-1">{cell.pos}</span>
            </div>
          ))}
        </div>
        <div className="text-6xl text-slate-300 font-thin select-none" style={{ lineHeight: 1.1 }}>]</div>
      </div>

      {/* Concrete example cards — horizontal row */}
      <motion.div
        className="flex gap-4 w-full justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {insights.map(s => (
          <div
            key={s.name}
            className="flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm"
          >
            <span
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: s.accent }}
            >
              {s.name}
            </span>
            <MiniMatrix cells={s.cells} accent={s.accent} />
          </div>
        ))}
      </motion.div>

    </div>
  </SlideLayout>
);
export default Scene4_8_FourNumbers;
