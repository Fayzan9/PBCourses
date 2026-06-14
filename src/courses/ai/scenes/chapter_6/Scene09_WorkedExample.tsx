import React from 'react';
import { motion } from 'framer-motion';
import { Math } from '../../components/Math';

export const Scene6_9_WorkedExample: React.FC = () => {
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
              Chapter 6 · Scene 9
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              Complete
              <span className="text-emerald-600"> Worked Example</span>
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              Let's discover the hidden directions step by step.
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
                  Step 1 · Start With A Matrix
                </p>

                <div className="flex justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <Math tex="A = \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix}" className="text-4xl font-bold" />
                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 2 · Build AᵀA
                </p>

                <div className="flex flex-col items-center gap-4 bg-emerald-50 border border-emerald-150 p-6 rounded-2xl">
                  <Math tex="A^T A = \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix} \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix} = \begin{bmatrix} 10 & 6 \\ 6 & 10 \end{bmatrix}" className="text-2xl font-bold" />
                  <p className="text-emerald-800 text-center text-lg font-medium">
                    This matrix contains all stretching information.
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 3 · Find Eigenvalues
                </p>

                <div className="flex flex-col items-center gap-3 bg-violet-50 border border-violet-150 p-6 rounded-2xl">
                  <Math tex="\det(A^T A - \lambda I) = 0" className="text-2xl font-bold" />
                  <Math tex="(10 - \lambda)^2 - 36 = 0" className="text-2xl font-bold" />
                  <div className="flex gap-8 mt-2">
                    <Math tex="\lambda_1 = 16" className="text-3xl font-bold text-violet-750" />
                    <Math tex="\lambda_2 = 4" className="text-3xl font-bold text-violet-750" />
                  </div>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 4 · Find Eigenvectors
                </p>

                <div className="space-y-5">

                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex flex-col items-center gap-2">
                    <p className="font-black text-emerald-700 mb-2 self-start">
                      For <Math tex="\lambda = 16" />
                    </p>

                    <Math tex="(A^T A - 16I)v = 0" className="text-xl font-bold text-slate-800" />
                    <Math tex="\begin{bmatrix} -6 & 6 \\ 6 & -6 \end{bmatrix} v = 0 \implies x = y" className="text-xl font-bold text-slate-800" />
                    <Math tex="v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}" className="text-2xl font-bold text-emerald-700 mt-2" />
                  </div>

                  <div className="rounded-2xl bg-violet-50 border border-violet-200 p-5 flex flex-col items-center gap-2">
                    <p className="font-black text-violet-700 mb-2 self-start">
                      For <Math tex="\lambda = 4" />
                    </p>

                    <Math tex="(A^T A - 4I)v = 0" className="text-xl font-bold text-slate-800" />
                    <Math tex="\begin{bmatrix} 6 & 6 \\ 6 & 6 \end{bmatrix} v = 0 \implies x = -y" className="text-xl font-bold text-slate-800" />
                    <Math tex="v_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}" className="text-2xl font-bold text-violet-700 mt-2" />
                  </div>

                </div>
              </div>

              {/* STEP 5 */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 5 · Compute Singular Values
                </p>

                <div className="flex flex-col items-center gap-3 bg-sky-50 border border-sky-150 p-6 rounded-2xl">
                  <Math tex="\sigma = \sqrt{\lambda}" className="text-3xl font-bold text-slate-800" />
                  <div className="flex gap-8 mt-2">
                    <Math tex="\sigma_1 = \sqrt{16} = 4" className="text-2xl font-bold text-sky-700" />
                    <Math tex="\sigma_2 = \sqrt{4} = 2" className="text-2xl font-bold text-sky-700" />
                  </div>
                </div>
              </div>

              {/* FINAL RESULT */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Final Discovery
                </p>

                <div className="rounded-2xl bg-slate-900 p-6 text-white">
                  <div className="grid grid-cols-2 gap-8">

                    <div className="flex flex-col items-center">
                      <p className="text-slate-300 font-bold mb-3">
                        Important Directions
                      </p>

                      <Math tex="v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}" className="text-2xl font-bold mb-2 text-white bg-slate-800 px-3 py-1 rounded-lg" />
                      <Math tex="v_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}" className="text-2xl font-bold text-white bg-slate-800 px-3 py-1 rounded-lg" />
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-slate-300 font-bold mb-3">
                        Stretch Amounts
                      </p>

                      <Math tex="\sigma_1 = 4" className="text-2xl font-bold mb-2 text-white" />
                      <Math tex="\sigma_2 = 2" className="text-2xl font-bold text-white" />
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

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            Interpretation
          </p>

          <p className="text-lg font-bold text-emerald-900">
            [1,1] is the dominant direction.
          </p>

          <p className="text-base text-emerald-800 mt-3">
            Any vector pointing roughly this way receives the most amplification.
          </p>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-violet-600 mb-3">
            Interpretation
          </p>

          <p className="text-lg font-bold text-violet-900">
            [1,-1] is the weaker direction.
          </p>

          <p className="text-base text-violet-800 mt-3">
            It still matters, but receives less stretching.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Key Insight
          </p>

          <p className="text-xl font-black">
            SVD is really about finding:
          </p>

          <ul className="mt-4 space-y-2 text-lg font-bold">
            <li>• Important directions</li>
            <li>• Stretch amounts</li>
            <li>• Hidden structure</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Scene6_9_WorkedExample;