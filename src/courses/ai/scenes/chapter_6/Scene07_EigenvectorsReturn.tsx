import React from 'react';
import { motion } from 'framer-motion';
import { Math } from '../../components/Math';

export const Scene6_7_EigenvectorsReturn: React.FC = () => {
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
              Chapter 6 · Scene 7
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              Finding The Hidden
              <span className="text-violet-600"> Directions</span>
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              Now that we have AᵀA, we can discover the directions the transformation cares about.
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
                  Step 1 · Recall AᵀA
                </p>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex justify-center">
                  <Math tex="A^T A = \begin{bmatrix} 10 & 6 \\ 6 & 10 \end{bmatrix}" className="text-4xl font-bold" />
                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 2 · Find Eigenvalues
                </p>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 flex flex-col items-center gap-4">

                  <Math tex="\det(A^T A - \lambda I) = 0" className="text-2xl font-bold" />
                  <Math tex="(10 - \lambda)^2 - 36 = 0" className="text-2xl font-bold" />

                  <div className="grid grid-cols-2 gap-5 mt-6 w-full">

                    <div className="bg-white rounded-xl p-4 border border-emerald-200 flex flex-col items-center">
                      <p className="text-sm uppercase font-black tracking-wider text-emerald-600 mb-2 self-start">
                        Largest
                      </p>

                      <Math tex="\lambda_1 = 16" className="text-3xl font-bold text-emerald-700" />
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-emerald-200 flex flex-col items-center">
                      <p className="text-sm uppercase font-black tracking-wider text-emerald-600 mb-2 self-start">
                        Second
                      </p>

                      <Math tex="\lambda_2 = 4" className="text-3xl font-bold text-emerald-700" />
                    </div>

                  </div>

                </div>
              </div>

              {/* STEP 3 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 3 · Solve For λ₁ = 16
                </p>

                <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6 flex flex-col items-center gap-4">

                  <Math tex="(A^T A - 16I)v = 0" className="text-2xl font-bold" />
                  <Math tex="\begin{bmatrix} -6 & 6 \\ 6 & -6 \end{bmatrix} v = 0" className="text-3xl font-bold" />
                  <Math tex="-6x + 6y = 0 \implies x = y" className="text-2xl font-bold animate-pulse" />

                  <div className="mt-5 bg-white rounded-xl p-4 border border-violet-200 w-full flex flex-col items-center">
                    <p className="text-sm uppercase font-black tracking-wider text-violet-600 mb-2 self-start">
                      First Eigenvector
                    </p>

                    <Math tex="v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}" className="text-3xl font-bold text-violet-750" />
                  </div>

                </div>
              </div>

              {/* STEP 4 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 4 · Solve For λ₂ = 4
                </p>

                <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6 flex flex-col items-center gap-4">

                  <Math tex="\begin{bmatrix} 6 & 6 \\ 6 & 6 \end{bmatrix} v = 0" className="text-3xl font-bold" />
                  <Math tex="6x + 6y = 0 \implies x = -y" className="text-2xl font-bold" />

                  <div className="mt-5 bg-white rounded-xl p-4 border border-sky-200 w-full flex flex-col items-center">
                    <p className="text-sm uppercase font-black tracking-wider text-sky-600 mb-2 self-start">
                      Second Eigenvector
                    </p>

                    <Math tex="v_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}" className="text-3xl font-bold text-sky-750" />
                  </div>

                </div>
              </div>

              {/* STEP 5 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 5 · Visual Interpretation
                </p>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">

                  <div className="flex justify-center">

                    <svg
                      width="520"
                      height="360"
                      viewBox="0 0 520 360"
                    >
                      <line
                        x1="60"
                        y1="180"
                        x2="460"
                        y2="180"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      <line
                        x1="260"
                        y1="40"
                        x2="260"
                        y2="320"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      {/* v1 */}
                      <line
                        x1="260"
                        y1="180"
                        x2="380"
                        y2="60"
                        stroke="#8B5CF6"
                        strokeWidth="6"
                      />

                      <text
                        x="395"
                        y="55"
                        fill="#8B5CF6"
                        fontSize="24"
                        fontWeight="900"
                      >
                        v₁ = [1,1]
                      </text>

                      {/* v2 */}
                      <line
                        x1="260"
                        y1="180"
                        x2="380"
                        y2="300"
                        stroke="#0284C7"
                        strokeWidth="6"
                      />

                      <text
                        x="395"
                        y="315"
                        fill="#0284C7"
                        fontSize="24"
                        fontWeight="900"
                      >
                        v₂ = [1,-1]
                      </text>

                      <circle
                        cx="260"
                        cy="180"
                        r="6"
                        fill="#0f172a"
                      />
                    </svg>

                  </div>

                  <p className="text-center text-xl font-bold text-slate-700 mt-4">
                    The transformation secretly cares about the diagonals.
                  </p>

                </div>
              </div>

              {/* FINAL DISCOVERY */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Final Discovery
                </p>

                <div className="rounded-2xl bg-slate-900 p-6 text-white">

                  <p className="text-3xl font-black mb-4 text-center">
                    Hidden Directions Found
                  </p>

                  <div className="grid grid-cols-2 gap-8">

                    <div className="flex flex-col items-center">
                      <p className="text-slate-300 font-bold mb-3">
                        Strongest Direction
                      </p>

                      <Math tex="v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}" className="text-2xl font-bold text-white bg-slate-800 px-4 py-2 rounded-xl" />
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-slate-300 font-bold mb-3">
                        Second Direction
                      </p>

                      <Math tex="v_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}" className="text-2xl font-bold text-white bg-slate-800 px-4 py-2 rounded-xl" />
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

        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-violet-600 mb-3">
            Key Idea
          </p>

          <p className="text-lg font-bold text-violet-900">
            Eigenvectors of AᵀA become the special directions of SVD.
          </p>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-sky-600 mb-3">
            Interpretation
          </p>

          <p className="text-base text-sky-800 leading-relaxed">
            These are not output vectors.
          </p>

          <p className="text-base font-bold text-sky-900 mt-3">
            They are important input directions.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            Observation
          </p>

          <p className="text-base text-emerald-800 leading-relaxed">
            Neither x-axis nor y-axis won.
          </p>

          <p className="text-base font-bold text-emerald-900 mt-3">
            The diagonal directions are dominant.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Key Insight
          </p>

          <p className="text-xl font-black">
            Hidden coordinate systems exist inside every matrix.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_7_EigenvectorsReturn;