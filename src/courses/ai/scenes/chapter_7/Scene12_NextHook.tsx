import React from 'react';
import { motion } from 'framer-motion';

// Mini SVG showing a Swiss roll (curved manifold) that PCA can't "unroll"
const SWISS_POINTS = Array.from({ length: 48 }, (_, i) => {
  const t = 1.5 * Math.PI + i * (2 * Math.PI) / 48;
  const noise = (Math.sin(i * 1.7) * 4);
  return {
    x: 50 + t * Math.cos(t) * 4.5 + noise,
    y: 50 + t * Math.sin(t) * 4.5 + noise * 0.5,
    hue: Math.round((i / 48) * 280), // colour by position on manifold
  };
});

export const Scene7_12_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center max-w-3xl mx-auto relative">

    {/* Background glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-400/10 filter blur-[100px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center gap-5 z-10 w-full"
    >
      {/* Chapter badge */}
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
        className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-black px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full"
      >
        Chapter 7 · Scene 12 · The Limit
      </motion.span>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
        PCA finds <span className="text-indigo-500">flat</span> directions.<br />
        <span className="bg-gradient-to-r from-violet-600 to-rose-500 bg-clip-text text-transparent">
          What about curves?
        </span>
      </h1>

      <div className="w-14 h-1.5 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full" />

      {/* Swiss roll SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="relative"
      >
        <svg viewBox="0 0 100 100" width="200" height="200" className="rounded-2xl border border-slate-200 bg-slate-50 shadow-md">
          {/* Swiss-roll curve */}
          {SWISS_POINTS.map((p, i) => (
            i > 0 ? (
              <line
                key={i}
                x1={SWISS_POINTS[i - 1].x} y1={SWISS_POINTS[i - 1].y}
                x2={p.x} y2={p.y}
                stroke={`hsl(${p.hue},70%,55%)`}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ) : null
          ))}

          {/* PCA "wrong" flat axis */}
          <line x1={10} y1={50} x2={90} y2={50} stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
          <text x={50} y={47} textAnchor="middle" fill="#4f46e5" fontSize="7" fontWeight="700">PCA axis</text>
          <text x={50} y={57} textAnchor="middle" fill="#f43f5e" fontSize="6" fontWeight="700">(misses the curve)</text>
        </svg>

        {/* Labels */}
        <div className="absolute -bottom-6 left-0 right-0 text-center">
          <span className="text-xs font-bold text-slate-400">Curved manifold PCA cannot unroll</span>
        </div>
      </motion.div>

      {/* Explanation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="text-slate-500 text-base font-medium leading-relaxed max-w-md mt-2"
      >
        PCA is a <strong>linear</strong> method. It finds flat hyperplanes. Real data often lives on
        curved surfaces — spirals, clusters, manifolds. A straight projection loses the structure.
      </motion.p>

      {/* What's next pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="flex flex-col items-center gap-3 mt-1 w-full max-w-md"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">⚡ Up Next: Nonlinear Methods</span>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            ['t-SNE', '#7c3aed'],
            ['UMAP', '#0891b2'],
            ['Autoencoders', '#059669'],
            ['Kernel PCA', '#dc2626'],
          ].map(([label, color]) => (
            <div key={label}
              className="px-3 py-1.5 rounded-full border text-xs font-bold"
              style={{ borderColor: color + '55', color, backgroundColor: color + '11' }}>
              {label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Closer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
        className="text-slate-800 text-xl md:text-2xl font-black leading-tight mt-1"
      >
        PCA masters the line.{' '}
        <span className="text-violet-600">Next we master the curve.</span>
      </motion.p>
    </motion.div>
  </div>
);

export default Scene7_12_NextHook;
