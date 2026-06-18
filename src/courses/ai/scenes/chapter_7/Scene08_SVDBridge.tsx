import React from 'react';
import { motion } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';
import { Math } from '../../components/Math';

const BRIDGE_STEPS = [
  {
    id: 'center',
    color: 'sky',
    icon: '①',
    label: 'Centre the Data',
    formula: '\\mathbf{X}_c = \\mathbf{X} - \\boldsymbol{\\mu}',
    note: 'Subtract the column means so the data is centred at the origin.',
  },
  {
    id: 'svd',
    color: 'indigo',
    icon: '②',
    label: 'Run SVD',
    formula: '\\mathbf{X}_c = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top',
    note: 'Exactly the decomposition from Chapter 6. U is n×n, Σ is n×d, V is d×d.',
  },
  {
    id: 'pcs',
    color: 'emerald',
    icon: '③',
    label: 'Extract Principal Components',
    formula: '\\text{PC}_i = \\mathbf{V}_{:,i} \\quad (\\text{columns of }\\mathbf{V})',
    note: 'The right singular vectors V are the principal components — ordered by σᵢ.',
  },
  {
    id: 'sigma',
    color: 'violet',
    icon: '④',
    label: 'Singular Values → Eigenvalues',
    formula: '\\lambda_i = \\frac{\\sigma_i^2}{n - 1}',
    note: 'Each eigenvalue of the covariance matrix is the square of the singular value, scaled by n−1.',
  },
];

const colorCls: Record<string, string> = {
  sky: 'bg-sky-50 border-sky-200 text-sky-700',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  violet: 'bg-violet-50 border-violet-200 text-violet-700',
};

export const Scene7_8_SVDBridge: React.FC = () => (
  <div className={LAYOUT_CONFIG.containerClass}>

    {/* ── LEFT: Step cards ──────────────────────────────────────────── */}
    <div className={LAYOUT_CONFIG.leftSideClass.replace('flex items-center justify-center', 'flex flex-col justify-center') + ' gap-3 overflow-y-auto'}>
      {BRIDGE_STEPS.map((step, i) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.25, duration: 0.5 }}
          className={`flex items-start gap-4 p-4 rounded-2xl border ${colorCls[step.color]}`}
        >
          <span className="text-2xl font-black shrink-0">{step.icon}</span>
          <div className="min-w-0">
            <p className="text-xs font-mono uppercase tracking-wider font-black mb-2">{step.label}</p>
            <div className="mb-2">
              <Math tex={step.formula} />
            </div>
            <p className="text-xs font-medium opacity-75 leading-relaxed">{step.note}</p>
          </div>
        </motion.div>
      ))}

      {/* Connection diagram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl"
      >
        <div className="text-center">
          <div className="text-xs font-mono text-slate-400 mb-1">Chapter 6</div>
          <div className="px-3 py-1.5 bg-cyan-50 border border-cyan-200 rounded-xl text-xs font-black text-cyan-700">SVD</div>
        </div>
        <div className="text-slate-400 text-xl font-black">→</div>
        <div className="text-center">
          <div className="text-xs font-mono text-slate-400 mb-1">Centre first</div>
          <div className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-black text-slate-600">X_c = X − μ</div>
        </div>
        <div className="text-slate-400 text-xl font-black">→</div>
        <div className="text-center">
          <div className="text-xs font-mono text-slate-400 mb-1">Chapter 7</div>
          <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-black text-indigo-700">PCA</div>
        </div>
      </motion.div>
    </div>

    {/* ── RIGHT: Explanation ────────────────────────────────────────── */}
    <div className={LAYOUT_CONFIG.rightSideClass}>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">
          Chapter 7 · Scene 8
        </p>
        <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
          PCA Is SVD<br /><span className="text-cyan-600">in Disguise</span>
        </h2>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          You already know SVD from Chapter 6. PCA is simply SVD applied to the
          <strong> centred data matrix</strong>. The right singular vectors V become the principal components.
        </p>
      </div>

      {/* Why SVD not covariance? */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 font-bold mb-2">
          Why Use SVD Instead of Eigendecomposition?
        </p>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Numerically stable', desc: 'Never form X^TX explicitly, which squares the condition number' },
            { label: 'Handles tall data', desc: 'Works when n ≫ d or d ≫ n without extra cost' },
            { label: 'Single pass', desc: 'SVD of X_c gives U, Σ, V all at once' },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-start gap-2 text-xs text-cyan-800">
              <span className="text-cyan-500 font-black shrink-0 mt-0.5">✓</span>
              <span><strong>{label}</strong> — {desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scikit-learn note */}
      <div className="bg-slate-800 rounded-2xl p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-2">
          How sklearn Does It
        </p>
        <code className="text-emerald-400 text-xs font-mono leading-relaxed block">
          {'# sklearn PCA uses truncated SVD internally\n'}
          {'from sklearn.decomposition import PCA\n'}
          {'pca = PCA(n_components=k)\n'}
          {'Z = pca.fit_transform(X)  # X_c @ V[:, :k]'}
        </code>
      </div>

      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          <strong className="text-slate-700">The takeaway:</strong> the two approaches (eigendecompose C,
          or SVD of X_c) give <span className="text-indigo-600 font-bold">identical</span> principal
          components. Use SVD in practice — it's what every production library uses.
        </p>
      </div>
    </div>
  </div>
);

export default Scene7_8_SVDBridge;
