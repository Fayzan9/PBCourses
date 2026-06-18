import React from 'react';
import { motion } from 'framer-motion';
import { Math } from '../../components/Math';

const STEPS = [
  {
    id: 'cov-def',
    color: 'sky',
    label: 'Step 1 · What is Covariance?',
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-base font-medium leading-relaxed">
          <strong>Variance</strong> measures how much a single feature spreads around its mean.
          <strong> Covariance</strong> measures how much two features <em>move together</em>.
        </p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Positive', sub: 'Both increase together', color: 'bg-emerald-50 border-emerald-200 text-emerald-700', arrow: '↗↗' },
            { label: 'Negative', sub: 'One up, one down', color: 'bg-rose-50 border-rose-200 text-rose-700', arrow: '↗↘' },
            { label: 'Zero', sub: 'No relationship', color: 'bg-slate-50 border-slate-200 text-slate-600', arrow: '↗?' },
          ].map(({ label, sub, color, arrow }) => (
            <div key={label} className={`border rounded-xl p-3 text-xs font-bold ${color}`}>
              <div className="text-2xl mb-1">{arrow}</div>
              <div className="font-black">{label}</div>
              <div className="opacity-70 font-medium mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center bg-sky-50 border border-sky-200 rounded-2xl p-4">
          <Math tex="\operatorname{Cov}(x, y) = \frac{1}{n{-}1}\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})" />
        </div>
      </div>
    ),
  },
  {
    id: 'cov-matrix',
    color: 'indigo',
    label: 'Step 2 · The Covariance Matrix',
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-base font-medium leading-relaxed">
          For <em>d</em> features, we arrange all pairwise covariances in a <strong>d×d symmetric matrix</strong>.
          The diagonal holds each feature's own variance.
        </p>
        <div className="flex flex-col items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
          <Math tex="\mathbf{C} = \frac{1}{n{-}1}\mathbf{X}_c^\top \mathbf{X}_c" />
          <Math tex="\mathbf{C} = \begin{bmatrix} \operatorname{Var}(x_1) & \operatorname{Cov}(x_1,x_2) \\ \operatorname{Cov}(x_2,x_1) & \operatorname{Var}(x_2) \end{bmatrix}" />
          <p className="text-indigo-700 text-xs font-semibold text-center">
            where <strong>X_c</strong> is the data matrix after subtracting the mean of each column.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-semibold text-emerald-700">
            <div className="font-black mb-1">Diagonal</div>
            Var(x₁), Var(x₂) … — how much each feature spreads on its own
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 text-xs font-semibold text-violet-700">
            <div className="font-black mb-1">Off-diagonal</div>
            Cov(xᵢ, xⱼ) — how much features move together. Always symmetric: C = Cᵀ
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'cov-example',
    color: 'violet',
    label: 'Step 3 · Concrete Numbers',
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-base font-medium leading-relaxed">
          For our 25-point correlated dataset (Feature 1 ≈ Feature 2), the covariance matrix is:
        </p>
        <div className="flex justify-center bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <Math tex="\mathbf{C} \approx \begin{bmatrix} 574 & 552 \\ 552 & 544 \end{bmatrix}" />
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-sm font-semibold text-emerald-800">
            <span className="text-lg shrink-0">↔</span>
            <span>Var(F1) = 574 — Feature 1 alone spans a wide range</span>
          </div>
          <div className="flex items-start gap-2 bg-sky-50 border border-sky-100 rounded-xl p-3 text-sm font-semibold text-sky-800">
            <span className="text-lg shrink-0">↕</span>
            <span>Var(F2) = 544 — Feature 2 spans nearly the same range</span>
          </div>
          <div className="flex items-start gap-2 bg-violet-50 border border-violet-100 rounded-xl p-3 text-sm font-semibold text-violet-800">
            <span className="text-lg shrink-0">↗</span>
            <span>Cov(F1, F2) = 552 — extremely high: they almost always move together</span>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs font-semibold text-amber-800">
          Correlation coefficient ≈ 552 / √(574 × 544) ≈ <strong>0.99</strong> — almost perfect linear relationship!
        </div>
      </div>
    ),
  },
  {
    id: 'cov-eigen',
    color: 'amber',
    label: 'Step 4 · The Key Connection',
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-base font-medium leading-relaxed">
          The covariance matrix <strong>C</strong> is a real symmetric matrix.
          From Chapter 5, we know real symmetric matrices have orthogonal eigenvectors.
        </p>
        <div className="flex flex-col items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <Math tex="\mathbf{C}\mathbf{v} = \lambda \mathbf{v}" />
          <p className="text-amber-800 text-sm font-black text-center">The eigenvectors of C ARE the principal components.</p>
          <p className="text-amber-700 text-xs font-semibold text-center">
            And the eigenvalues λ tell us <em>how much variance</em> each PC captures.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs font-semibold text-indigo-700">
            <div className="font-black mb-1">λ₁ = largest eigenvalue</div>
            Variance along PC1 — the most important direction
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-semibold text-emerald-700">
            <div className="font-black mb-1">λ₂ = second eigenvalue</div>
            Variance along PC2 — the next best direction
          </div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            <strong className="text-slate-700">Total variance preserved:</strong>{' '}
            <Math tex="\sum \lambda_i = \operatorname{trace}(\mathbf{C}) = \sum \operatorname{Var}(x_i)" />
          </p>
        </div>
      </div>
    ),
  },
];

const colorMap: Record<string, string> = {
  sky: 'bg-sky-50 border-sky-200 text-sky-600',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600',
  violet: 'bg-violet-50 border-violet-200 text-violet-600',
  amber: 'bg-amber-50 border-amber-200 text-amber-600',
};

export const Scene7_6_CovarianceMatrix: React.FC = () => (
  <div className="flex h-full w-full overflow-hidden">
    <div className="h-full px-6 py-4 overflow-y-auto w-full">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            Chapter 7 · Scene 6
          </p>
          <h2 className="text-4xl font-black text-slate-800 mt-2">
            The <span className="text-indigo-500">Covariance Matrix</span>
          </h2>
          <p className="text-lg text-slate-500 mt-2 font-medium">
            Where do the principal directions come from?
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 space-y-10"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.5 }}
              className={i > 0 ? 'border-t pt-8' : ''}
            >
              <div className={`inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-4 ${colorMap[step.color]}`}>
                {step.label}
              </div>
              {step.content}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  </div>
);

export default Scene7_6_CovarianceMatrix;
