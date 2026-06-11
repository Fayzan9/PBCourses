import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

const ROWS   = [[2, 1], [0, 3], [1, 2]];
const INPUT  = [3, 2];
const ACCENT = ['#E11D48', '#7C3AED', '#D97706'];
const LIGHT  = ['#fff1f2', '#f5f3ff', '#fffbeb'];
const BORDER = ['#fecdd3', '#ddd6fe', '#fde68a'];

export const Scene4_15_DotProductBridge: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  const outputs = ROWS.map(r => r[0] * INPUT[0] + r[1] * INPUT[1]);

  const row = active !== null ? ROWS[active] : null;
  const accent = active !== null ? ACCENT[active] : '#64748b';

  return (
    <SlideLayout
      title="Each Row = One Dot Product"
      text="Click any row. It runs a dot product against the input and produces one output number."
      sidebarContent={
        <div className="flex flex-col gap-3 h-full justify-center">
          <AnimatePresence mode="wait">
            {active === null ? (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-3 py-8 text-center"
              >
                <div className="text-4xl">👆</div>
                <p className="text-sm font-bold text-slate-500">Click any row in the matrix to see its dot product</p>
                <p className="text-xs text-slate-400 font-medium">Each row asks one question about the input</p>
              </motion.div>
            ) : row && (
              <motion.div
                key={`row-${active}`}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Row label */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>
                    Row {active + 1} · Dot Product
                  </span>
                </div>

                {/* Pair-by-pair multiplication */}
                <div className="rounded-2xl border p-4 flex flex-col gap-3"
                  style={{ backgroundColor: LIGHT[active!], borderColor: BORDER[active!] }}>

                  {/* Pairs */}
                  <div className="flex items-center justify-center gap-3">
                    {row.map((rv, i) => (
                      <React.Fragment key={i}>
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-1.5">
                            {/* Row value */}
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-lg font-black text-white"
                              style={{ backgroundColor: accent }}>
                              {rv}
                            </div>
                            <span className="text-slate-400 font-bold">×</span>
                            {/* Input value */}
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-lg font-black text-white bg-sky-500">
                              {INPUT[i]}
                            </div>
                          </div>
                          <span className="font-mono text-sm font-black" style={{ color: accent }}>
                            {rv * INPUT[i]}
                          </span>
                        </div>
                        {i < row.length - 1 && (
                          <span className="text-slate-400 font-bold text-lg self-start mt-2">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Divider + result */}
                  <div className="border-t pt-3 flex items-center justify-center gap-3"
                    style={{ borderColor: BORDER[active!] }}>
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      {row.map((rv, i) => `${rv}×${INPUT[i]}`).join(' + ')}
                    </span>
                    <span className="text-slate-400">=</span>
                    <span className="font-mono text-xl font-black" style={{ color: accent }}>
                      {outputs[active!]}
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex gap-3 text-[11px] font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded" style={{ backgroundColor: accent, display: 'inline-block' }} />
                    from row {active! + 1}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-sky-500 inline-block" />
                    from input
                  </span>
                </div>

                {/* Navigate rows */}
                <div className="flex gap-2">
                  {ROWS.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)}
                      className="flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wide border transition-all cursor-pointer"
                      style={
                        i === active
                          ? { backgroundColor: ACCENT[i], color: '#fff', borderColor: ACCENT[i] }
                          : { backgroundColor: '#fff', color: '#94a3b8', borderColor: '#e2e8f0' }
                      }>
                      Row {i + 1}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      }
    >
      {/* Matrix equation: M × input = output */}
      <div className="flex items-center justify-center gap-4 w-full h-full select-none">

        {/* Matrix — clickable rows */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold text-center mb-1">Matrix</span>
          {ROWS.map((row, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex gap-2 px-5 py-3 rounded-2xl border-2 transition-all cursor-pointer"
              style={
                active === i
                  ? { backgroundColor: LIGHT[i], borderColor: ACCENT[i] }
                  : { backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }
              }
            >
              {row.map((v, j) => (
                <span key={j}
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xl font-black transition-all"
                  style={
                    active === i
                      ? { backgroundColor: ACCENT[i], color: '#fff' }
                      : { backgroundColor: '#fff', color: '#334155', border: '1.5px solid #e2e8f0' }
                  }>
                  {v}
                </span>
              ))}
            </motion.button>
          ))}
        </div>

        {/* × */}
        <span className="text-3xl font-thin text-slate-300 mt-6">×</span>

        {/* Input vector */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold text-center mb-1">Input</span>
          {INPUT.map((v, i) => (
            <div key={i}
              className="w-14 h-[52px] rounded-2xl border-2 border-sky-200 bg-sky-50 flex items-center justify-center font-mono text-xl font-black text-sky-600">
              {v}
            </div>
          ))}
        </div>

        {/* = */}
        <span className="text-3xl font-thin text-slate-300 mt-6">=</span>

        {/* Output vector */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold text-center mb-1">Output</span>
          {outputs.map((v, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: active === i ? LIGHT[i] : '#f8fafc',
                borderColor:     active === i ? ACCENT[i] : '#e2e8f0',
                scale:           active === i ? 1.08 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="w-14 h-[52px] rounded-2xl border-2 flex items-center justify-center font-mono text-xl font-black"
              style={{ color: active === i ? ACCENT[i] : '#94a3b8' }}
            >
              {v}
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};
export default Scene4_15_DotProductBridge;
