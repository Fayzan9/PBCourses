import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

export const Scene4_8_FourNumbers: React.FC = () => {
  const [revealed, setRevealed] = useState(0);

  const insights = [
    {
      label: 'Scaling used: [s, 0, 0, s]',
      desc: 'Two equal numbers on the diagonal. The off-diagonal slots stay zero.',
    },
    {
      label: 'Rotation used: [cos θ, −sin θ, sin θ, cos θ]',
      desc: 'All four slots work together to create the circular sweep.',
    },
    {
      label: 'Shear used: [1, k, 0, 1]',
      desc: 'One off-diagonal slot controls the tilt. The rest stay at identity values.',
    },
  ];

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
              className={`px-3 py-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                revealed > i
                  ? 'bg-violet-50 border-violet-300 text-violet-800'
                  : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
            >
              <span className="block font-bold mb-0.5">{s.label}</span>
              {revealed > i && <span className="text-slate-500 font-medium">{s.desc}</span>}
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
