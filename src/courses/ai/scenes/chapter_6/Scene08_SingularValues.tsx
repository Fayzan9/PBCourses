import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_8_SingularValues: React.FC = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* LEFT */}
      <div
        className="h-full px-6 py-4 overflow-y-auto"
        style={{ flex: '0 0 72%' }}
      >
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-8">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
              Chapter 6 · Scene 8
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              From Eigenvalues To
              <span className="text-emerald-600"> Singular Values</span>
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              We found the directions. Now let's measure the stretching.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-slate-200 bg-white p-8"
          >
            <div className="space-y-8">

              {/* STEP 1 */}
              <div>
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 1 · Recall The Eigenvalues
                </p>

                <div className="grid grid-cols-2 gap-5">

                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6">
                    <p className="text-sm font-black uppercase tracking-wider text-emerald-600 mb-3">
                      Largest Eigenvalue
                    </p>

                    <p className="text-5xl font-black text-emerald-700">
                      λ₁ = 16
                    </p>
                  </div>

                  <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6">
                    <p className="text-sm font-black uppercase tracking-wider text-violet-600 mb-3">
                      Second Eigenvalue
                    </p>

                    <p className="text-5xl font-black text-violet-700">
                      λ₂ = 4
                    </p>
                  </div>

                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 2 · Singular Value Formula
                </p>

                <div className="rounded-2xl bg-sky-50 border border-sky-200 p-8 text-center">
                  <p className="text-6xl font-black text-sky-700 font-mono">
                    σ = √λ
                  </p>

                  <p className="text-xl text-sky-800 font-semibold mt-4">
                    Singular values are the square roots of the eigenvalues of AᵀA
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 3 · Compute The Singular Values
                </p>

                <div className="space-y-5">

                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6">
                    <p className="text-lg font-black text-emerald-700 mb-3">
                      First Direction
                    </p>

                    <div className="font-mono text-3xl font-black text-slate-800">
                      σ₁ = √16
                    </div>

                    <div className="font-mono text-4xl font-black text-emerald-700 mt-2">
                      σ₁ = 4
                    </div>
                  </div>

                  <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6">
                    <p className="text-lg font-black text-violet-700 mb-3">
                      Second Direction
                    </p>

                    <div className="font-mono text-3xl font-black text-slate-800">
                      σ₂ = √4
                    </div>

                    <div className="font-mono text-4xl font-black text-violet-700 mt-2">
                      σ₂ = 2
                    </div>
                  </div>

                </div>
              </div>

              {/* STEP 4 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 4 · Compare Stretching Strength
                </p>

                <div className="space-y-6">

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-black text-emerald-700 text-lg">
                        σ₁ = 4
                      </span>

                      <span className="font-bold text-slate-500">
                        Strongest Direction
                      </span>
                    </div>

                    <div className="h-12 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1 }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-black text-violet-700 text-lg">
                        σ₂ = 2
                      </span>

                      <span className="font-bold text-slate-500">
                        Weaker Direction
                      </span>
                    </div>

                    <div className="h-12 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '50%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-violet-500"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* FINAL RESULT */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Final Interpretation
                </p>

                <div className="rounded-2xl bg-slate-900 p-6 text-white">
                  <div className="grid grid-cols-2 gap-8">

                    <div>
                      <p className="text-slate-300 font-bold mb-3">
                        Direction
                      </p>

                      <p className="text-3xl font-black">
                        [1,1]
                      </p>

                      <p className="text-lg text-slate-400 mt-2">
                        receives 4× stretch
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-300 font-bold mb-3">
                        Direction
                      </p>

                      <p className="text-3xl font-black">
                        [1,-1]
                      </p>

                      <p className="text-lg text-slate-400 mt-2">
                        receives 2× stretch
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* RIGHT */}
      <div
        className="flex flex-col justify-center gap-5 pr-6"
        style={{ flex: '0 0 28%' }}
      >

        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-sky-600 mb-3">
            Definition
          </p>

          <p className="text-2xl font-black text-sky-900">
            σ = √λ
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            Meaning
          </p>

          <p className="text-lg font-bold text-emerald-900">
            Singular values measure stretching.
          </p>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-violet-600 mb-3">
            Interpretation
          </p>

          <p className="text-base text-violet-800 leading-relaxed">
            Bigger singular value means a more important direction.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Key Insight
          </p>

          <p className="text-xl font-black">
            Eigenvectors tell us where.
          </p>

          <p className="text-xl font-black mt-2">
            Singular values tell us how much.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_8_SingularValues;