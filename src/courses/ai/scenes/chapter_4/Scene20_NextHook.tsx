import React from 'react';
import { motion } from 'framer-motion';

const RECAP = [
  { label: 'Matrices warp space',      color: '#0284C7', icon: '⊞' },
  { label: 'Stacking = one matrix',    color: '#7C3AED', icon: '×' },
  { label: 'Activation breaks that',   color: '#E11D48', icon: '↗' },
  { label: 'Curves unlock any shape',  color: '#10B981', icon: '∿' },
];

export const Scene4_20_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center max-w-3xl mx-auto relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-emerald-400/10 filter blur-[140px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col items-center gap-5 z-10"
    >
      {/* Chapter badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
        className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-extrabold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full"
      >
        Chapter 4 complete
      </motion.span>

      {/* Recap row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="flex items-center gap-2 flex-wrap justify-center"
      >
        {RECAP.map(({ label, color, icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold"
            style={{ borderColor: color + '55', color, backgroundColor: color + '11' }}
          >
            <span className="font-mono">{icon}</span>
            {label}
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="w-16 h-1.5 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full"
      />

      {/* Hook headline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
      >
        <p className="text-xs font-mono uppercase tracking-widest text-sky-600 font-extrabold mb-3">
          Up Next · Chapter 5
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
          You can warp space.<br />
          <span className="text-emerald-600">But which directions survive?</span>
        </h1>
      </motion.div>

      {/* Teaser */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="text-slate-500 text-base font-medium leading-relaxed max-w-md"
      >
        Every matrix has special directions that only get <em>scaled</em> — never rotated.
        These <span className="font-bold text-slate-700">eigenvectors</span> reveal what a transformation
        fundamentally does, and they power PCA, Google PageRank, and more.
      </motion.p>

      {/* Chapter 5 tags */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.6 }}
        className="flex items-center gap-3 mt-1"
      >
        {[['Eigenvectors','#059669'],['Eigenvalues','#0284C7'],['PCA','#7C3AED']].map(([label, color]) => (
          <div key={label} className="px-3 py-1.5 rounded-full border text-xs font-bold"
            style={{ borderColor: color + '55', color, backgroundColor: color + '11' }}>
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);
export default Scene4_20_NextHook;
