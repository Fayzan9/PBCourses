import React from 'react';
import { motion } from 'framer-motion';
import { Math } from '../../components/Math';

export const Scene6_10_InputVsOutput: React.FC = () => {
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
              Chapter 6 · Scene 10
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              Input Direction ≠
              <span className="text-emerald-600"> Output Vector</span>
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              We found the important direction. But where does it actually go?
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
                  Step 1 · Recall The Dominant Direction
                </p>

                <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6 flex flex-col items-center">

                  <p className="text-lg font-bold text-violet-850 mb-4 self-start">
                    From <Math tex="A^T A" /> we discovered:
                  </p>

                  <Math tex="v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}" className="text-4xl font-bold text-violet-700" />

                  <p className="text-lg text-violet-800 mt-4 text-center">
                    This is the direction that gets stretched the most.
                  </p>

                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 2 · Normalize The Direction
                </p>

                <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6 flex flex-col items-center">

                  <Math tex="v_1 = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 \\ 1 \end{bmatrix}" className="text-3xl font-bold text-sky-700" />

                  <p className="text-lg text-sky-800 mt-4 text-center">
                    We want a unit vector so we only measure stretching.
                  </p>

                </div>
              </div>

              {/* STEP 3 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 3 · Apply The Original Matrix
                </p>

                <div className="rounded-2xl bg-emerald-55 border border-emerald-200 p-6 flex flex-col items-center">

                  <Math tex="Av_1 = \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix} \left( \frac{1}{\sqrt{2}} \begin{bmatrix} 1 \\ 1 \end{bmatrix} \right)" className="text-2xl font-bold text-emerald-800" />

                </div>
              </div>

              {/* STEP 4 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 4 · Compute The Result
                </p>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 flex flex-col items-center gap-4">

                  <Math tex="Av_1 = \frac{1}{\sqrt{2}} \begin{bmatrix} 4 \\ 4 \end{bmatrix}" className="text-2xl font-bold text-slate-800" />
                  <Math tex="Av_1 = 4 \left( \frac{1}{\sqrt{2}} \begin{bmatrix} 1 \\ 1 \end{bmatrix} \right)" className="text-2xl font-bold text-amber-700" />

                </div>
              </div>

              {/* STEP 5 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 5 · Something Interesting Happens
                </p>

                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6 flex flex-col items-center">

                  <p className="text-xl font-bold text-rose-900 text-center mb-4">
                    The output vector is longer.
                  </p>

                  <p className="text-lg text-rose-800 text-center">
                    But it points in the same direction.
                  </p>

                  <Math tex="Av_1 = 4v_1" className="text-4xl font-bold text-rose-700 mt-4" />

                </div>
              </div>

              {/* STEP 6 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Important Warning
                </p>

                <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6 flex flex-col items-center">

                  <p className="text-xl font-bold text-violet-900 text-center mb-4">
                    This happens only because our matrix is symmetric.
                  </p>

                  <p className="text-lg text-violet-800 text-center mb-4">
                    Most matrices rotate vectors into completely different directions.
                  </p>

                  <p className="text-lg text-violet-800 text-center">
                    In general:
                  </p>

                  <Math tex="Av_i \neq v_i" className="text-4xl font-bold text-violet-700 mt-4" />

                </div>
              </div>

              {/* FINAL DISCOVERY */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Final Discovery
                </p>

                <div className="rounded-2xl bg-slate-900 p-6 text-white">

                  <p className="text-3xl font-black mb-5">
                    We Still Need One More Thing
                  </p>

                  <div className="space-y-3 text-xl">

                    <p>
                      • We know the important input direction
                    </p>

                    <p>
                      • We know how much it stretches
                    </p>

                    <p>
                      • But we don't know the final output direction
                    </p>

                  </div>

                  <p className="text-2xl font-black text-emerald-400 mt-6">
                    That's where U comes from.
                  </p>

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
            Important
          </p>

          <p className="text-lg font-bold text-violet-900">
            v₁ is an input direction.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            Output
          </p>

          <p className="text-lg font-bold text-emerald-900">
            Av₁ is the actual transformed vector.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-amber-600 mb-3">
            Our Example
          </p>

          <p className="text-base text-amber-800 leading-relaxed">
            Input and output happen to align because the matrix is symmetric.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Next Question
          </p>

          <p className="text-xl font-black">
            How do we systematically find the output directions?
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_10_InputVsOutput;