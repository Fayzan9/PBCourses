import React from 'react';
import { motion } from 'framer-motion';
import { Math } from '../../components/Math';

const STEPS = [
  {
    num: '01',
    title: 'Collect & Stack Data',
    color: 'sky',
    formula: '\\mathbf{X} \\in \\mathbb{R}^{n \\times d}',
    detail: 'n samples, d features. Each row is one observation. Common shapes: images (n=60000, d=784), embeddings (n=1M, d=1536).',
    code: 'X.shape  # (n_samples, n_features)',
    codeColor: 'text-sky-400',
  },
  {
    num: '02',
    title: 'Centre the Data',
    color: 'indigo',
    formula: '\\mathbf{X}_c = \\mathbf{X} - \\boldsymbol{\\mu}, \\quad \\boldsymbol{\\mu} = \\frac{1}{n}\\sum_{i=1}^{n}\\mathbf{x}_i',
    detail: 'Subtract the mean of each feature column. Now each feature has mean 0. This ensures PCA finds directions of spread, not directions toward the origin.',
    code: 'mu = X.mean(axis=0)\nXc = X - mu',
    codeColor: 'text-indigo-400',
  },
  {
    num: '03',
    title: 'Compute SVD (or Covariance)',
    color: 'violet',
    formula: '\\mathbf{X}_c = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top',
    detail: 'Compute the SVD of the centred data. The columns of V are the principal components, ordered by singular value (descending). Equivalently, eigendecompose C = X_cᵀX_c/(n−1).',
    code: 'U, s, Vt = np.linalg.svd(Xc, full_matrices=False)',
    codeColor: 'text-violet-400',
  },
  {
    num: '04',
    title: 'Choose Number of Components k',
    color: 'amber',
    formula: '\\text{Var explained} = \\frac{\\sum_{i=1}^{k}\\sigma_i^2}{\\sum_{i=1}^{d}\\sigma_i^2}',
    detail: 'Plot the cumulative explained variance ("scree plot"). Pick k so that ≥95% of variance is retained. Common heuristic: elbow of the scree curve.',
    code: 'cum_var = np.cumsum(s**2) / np.sum(s**2)\nk = np.searchsorted(cum_var, 0.95) + 1',
    codeColor: 'text-amber-400',
  },
  {
    num: '05',
    title: 'Project to k Dimensions',
    color: 'emerald',
    formula: '\\mathbf{Z} = \\mathbf{X}_c \\mathbf{W}, \\quad \\mathbf{W} = \\mathbf{V}_{:,\\,1:k}^\\top',
    detail: 'Multiply the centred data by the top k principal components. Z is the compressed representation: n samples × k features. Each column of Z is a PC score.',
    code: 'W = Vt[:k].T       # (d, k)\nZ = Xc @ W         # (n, k)',
    codeColor: 'text-emerald-400',
  },
  {
    num: '06',
    title: 'Reconstruct (Optional)',
    color: 'rose',
    formula: '\\hat{\\mathbf{X}} = \\mathbf{Z}\\mathbf{W}^\\top + \\boldsymbol{\\mu}',
    detail: 'Project back to the original d-dimensional space. The reconstruction error ‖X − X̂‖ measures the information lost. With k = d, reconstruction is perfect.',
    code: 'X_hat = Z @ W.T + mu  # back to (n, d)',
    codeColor: 'text-rose-400',
  },
];

const colorBg: Record<string, string> = {
  sky: 'bg-sky-50 border-sky-200',
  indigo: 'bg-indigo-50 border-indigo-200',
  violet: 'bg-violet-50 border-violet-200',
  amber: 'bg-amber-50 border-amber-200',
  emerald: 'bg-emerald-50 border-emerald-200',
  rose: 'bg-rose-50 border-rose-200',
};

const colorNum: Record<string, string> = {
  sky: 'text-sky-600', indigo: 'text-indigo-600', violet: 'text-violet-600',
  amber: 'text-amber-600', emerald: 'text-emerald-600', rose: 'text-rose-600',
};

export const Scene7_9_TheAlgorithm: React.FC = () => (
  <div className="flex h-full w-full overflow-hidden">
    <div className="h-full px-6 py-4 overflow-y-auto w-full">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            Chapter 7 · Scene 9
          </p>
          <h2 className="text-4xl font-black text-slate-800 mt-2">
            PCA: The Full <span className="text-indigo-500">Recipe</span>
          </h2>
          <p className="text-lg text-slate-500 mt-2 font-medium">
            Six steps from raw data to compressed representation.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 space-y-6"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.18, duration: 0.45 }}
              className={`flex gap-5 p-5 rounded-2xl border ${colorBg[step.color]}`}
            >
              {/* Step number */}
              <div className={`text-4xl font-black font-mono shrink-0 ${colorNum[step.color]}`}>
                {step.num}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="font-black text-slate-800 text-base mb-2">{step.title}</p>

                {/* Formula */}
                <div className="mb-2">
                  <Math tex={step.formula} />
                </div>

                {/* Description */}
                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-3">
                  {step.detail}
                </p>

                {/* Code */}
                <div className="bg-slate-900 rounded-xl px-4 py-2.5">
                  <code className={`${step.codeColor} text-xs font-mono whitespace-pre-wrap`}>
                    {step.code}
                  </code>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-indigo-600 rounded-2xl p-5 text-white text-center"
          >
            <p className="font-black text-base mb-2">The Core Shape Transformation</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="px-4 py-2 bg-white/20 rounded-xl text-sm font-black">X: (n × d)</div>
              <span className="text-indigo-200 font-black text-xl">→</span>
              <div className="px-4 py-2 bg-white/20 rounded-xl text-sm font-black">Z: (n × k)</div>
              <span className="text-indigo-200 font-black text-xl">where k ≪ d</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  </div>
);

export default Scene7_9_TheAlgorithm;
