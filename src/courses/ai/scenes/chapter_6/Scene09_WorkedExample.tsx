import React from 'react';
import { motion } from 'framer-motion';

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

                <div className="text-4xl font-black text-slate-800 font-mono">
                  A =
                  <span className="ml-4">
                    [3 1]
                  </span>
                  <br />
                  <span className="ml-[78px]">
                    [1 3]
                  </span>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 2 · Build AᵀA
                </p>

                <div className="text-3xl font-mono font-black text-slate-800">
                  AᵀA =
                  <span className="ml-4">
                    [10 6]
                  </span>
                  <br />
                  <span className="ml-[95px]">
                    [6 10]
                  </span>
                </div>

                <p className="text-slate-500 mt-3 text-lg">
                  This matrix contains all stretching information.
                </p>
              </div>

              {/* STEP 3 */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 3 · Find Eigenvalues
                </p>

                <div className="space-y-3 font-mono text-2xl font-black text-slate-800">
                  <div>det(AᵀA - λI) = 0</div>
                  <div>(10 - λ)² - 36 = 0</div>
                  <div>λ₁ = 16</div>
                  <div>λ₂ = 4</div>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 4 · Find Eigenvectors
                </p>

                <div className="space-y-5">

                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
                    <p className="font-black text-emerald-700 mb-2">
                      For λ = 16
                    </p>

                    <div className="font-mono text-xl font-bold text-slate-800">
                      (AᵀA - 16I)v = 0
                    </div>

                    <div className="font-mono text-xl font-bold text-slate-800 mt-2">
                      [-6 6]
                      <br />
                      [ 6 -6]
                    </div>

                    <div className="font-mono text-xl font-bold text-slate-800 mt-2">
                      x = y
                    </div>

                    <div className="font-mono text-2xl font-black text-emerald-700 mt-2">
                      v₁ = [1,1]
                    </div>
                  </div>

                  <div className="rounded-2xl bg-violet-50 border border-violet-200 p-5">
                    <p className="font-black text-violet-700 mb-2">
                      For λ = 4
                    </p>

                    <div className="font-mono text-xl font-bold text-slate-800">
                      [6 6]
                      <br />
                      [6 6]
                    </div>

                    <div className="font-mono text-xl font-bold text-slate-800 mt-2">
                      x = -y
                    </div>

                    <div className="font-mono text-2xl font-black text-violet-700 mt-2">
                      v₂ = [1,-1]
                    </div>
                  </div>

                </div>
              </div>

              {/* STEP 5 */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 5 · Compute Singular Values
                </p>

                <div className="space-y-3 font-mono text-2xl font-black text-slate-800">
                  <div>σ = √λ</div>
                  <div>σ₁ = √16 = 4</div>
                  <div>σ₂ = √4 = 2</div>
                </div>
              </div>

              {/* FINAL RESULT */}
              <div className="border-t pt-6">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Final Discovery
                </p>

                <div className="rounded-2xl bg-slate-900 p-6 text-white">
                  <div className="grid grid-cols-2 gap-8">

                    <div>
                      <p className="text-slate-300 font-bold mb-3">
                        Important Directions
                      </p>

                      <p className="text-3xl font-black">
                        [1,1]
                      </p>

                      <p className="text-3xl font-black mt-2">
                        [1,-1]
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-300 font-bold mb-3">
                        Stretch Amounts
                      </p>

                      <p className="text-3xl font-black">
                        σ₁ = 4
                      </p>

                      <p className="text-3xl font-black mt-2">
                        σ₂ = 2
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