import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene6_9_SingularValuesVsEigenvalues: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1500),
      setTimeout(() => setStep(4), 2200),
      setTimeout(() => setStep(5), 3000),
      setTimeout(() => setStep(6), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const rows = [
    {
      label: 'Matrix shape',
      eigen: 'Square only (n×n)',
      singular: 'Any shape (m×n)',
      eigenIcon: '⬛',
      singularIcon: '▬',
    },
    {
      label: 'Value sign',
      eigen: 'Can be negative or complex',
      singular: 'Always ≥ 0',
      eigenIcon: '±',
      singularIcon: '✓',
    },
    {
      label: 'What it measures',
      eigen: 'Stretch along special direction',
      singular: 'Importance of each direction',
      eigenIcon: '→',
      singularIcon: '★',
    },
    {
      label: 'Decomposition',
      eigen: 'A = PDP⁻¹',
      singular: 'A = UΣVᵀ',
      eigenIcon: '📐',
      singularIcon: '🔬',
    },
    {
      label: 'Guaranteed for',
      eigen: 'Symmetric matrices only',
      singular: 'Every single matrix',
      eigenIcon: '⚠',
      singularIcon: '🌍',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: Comparison Table */}
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -16 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-[1.2fr_1fr_1fr] gap-0 rounded-xl overflow-hidden border border-slate-200 shadow-lg"
        >
          {/* Header row */}
          <div className="bg-slate-700 px-4 py-3 text-xs font-bold text-slate-300 uppercase tracking-wider">
            Property
          </div>
          <div className="bg-slate-600 px-4 py-3 text-xs font-bold text-slate-200 uppercase tracking-wider text-center">
            Eigenvalues
          </div>
          <div className="bg-sky-500 px-4 py-3 text-xs font-bold text-white uppercase tracking-wider text-center">
            Singular Values
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <React.Fragment key={row.label}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: step >= i + 2 ? 1 : 0, x: step >= i + 2 ? 0 : -20 }}
                transition={{ duration: 0.4 }}
                className={`px-4 py-3 text-xs font-semibold text-slate-600 ${
                  i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                } border-t border-slate-100`}
              >
                {row.label}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= i + 2 ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`px-4 py-3 text-xs text-slate-500 text-center ${
                  i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                } border-t border-slate-100`}
              >
                <span className="mr-1">{row.eigenIcon}</span>
                {row.eigen}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= i + 2 ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`px-4 py-3 text-xs text-sky-700 font-medium text-center ${
                  i % 2 === 0 ? 'bg-sky-50' : 'bg-sky-50/60'
                } border-t border-sky-100`}
              >
                <span className="mr-1">{row.singularIcon}</span>
                {row.singular}
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Connection arrow */}
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 bg-gradient-to-r from-slate-50 to-sky-50 rounded-xl p-4 border border-sky-200"
          >
            <div className="flex items-center gap-2">
              <div className="bg-slate-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">λᵢ</div>
              <span className="text-slate-400 font-bold text-lg">→</span>
              <div className="bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">σᵢ = √λᵢ(AᵀA)</div>
            </div>
            <p className="text-slate-500 text-xs italic">Singular values are the square roots of eigenvalues of AᵀA</p>
          </motion.div>
        )}
      </div>

      {/* RIGHT: Explanation */}
      <div className="flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sky-500 text-xs font-mono uppercase tracking-widest font-bold mb-1">
            Chapter 6 · SVD
          </p>
          <h1 className="text-2xl font-black text-slate-800 leading-tight">
            Eigenvalues vs<br />
            <span className="text-sky-500">Singular Values</span>
          </h1>
        </motion.div>

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 rounded-xl p-4 border border-slate-200"
          >
            <p className="text-slate-600 text-sm leading-relaxed">
              Eigenvalues were great — but they had rules.
            </p>
            <p className="text-slate-700 text-sm font-semibold mt-2 leading-relaxed">
              Only square matrices. Might be negative. Might be complex.
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-sky-50 rounded-xl p-4 border border-sky-200"
          >
            <p className="text-sky-700 text-sm font-bold leading-relaxed">
              Singular values threw out the rulebook.
            </p>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Always non-negative. Work on every matrix. No exceptions.
            </p>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
          >
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">The Key Formula</p>
            <KaTeXMath tex="\sigma_i = \sqrt{\lambda_i(A^T A)}" block />
            <p className="text-slate-500 text-xs mt-3 italic leading-relaxed">
              They're related to eigenvalues — but always play nice.
            </p>
          </motion.div>
        )}

        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl p-4 text-white shadow-md"
          >
            <p className="text-sm font-bold leading-relaxed">
              Same idea, fewer restrictions.
            </p>
            <p className="text-sky-100 text-xs mt-1 leading-relaxed">
              SVD is the grown-up version of eigendecomposition.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
