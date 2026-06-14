import React from 'react';
import { motion } from 'framer-motion';
import { Math } from '../../components/Math';

export const Scene6_5_WhyATA: React.FC = () => {
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
              Chapter 6 · Scene 5
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              Why Does
              <span className="text-emerald-600"> AᵀA </span>
              Appear?
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              We never asked for AᵀA. It appears automatically.
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
                  Step 1 · Start With The Real Goal
                </p>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex justify-center">

                  <div className="flex flex-col items-center">
                    <p className="text-xl font-semibold text-slate-600 mb-4 text-center">
                      We want the direction that gets stretched the most.
                    </p>

                    <Math tex="\max \|Av\|" className="text-4xl font-bold" />
                  </div>

                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 2 · Square The Length
                </p>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 flex flex-col items-center">

                  <p className="text-lg text-emerald-800 mb-4 text-center font-medium">
                    Same winner. Easier mathematics.
                  </p>

                  <Math tex="\|Av\|^2" className="text-4xl font-bold" />

                </div>
              </div>

              {/* STEP 3 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 3 · Expand The Definition Of Length
                </p>

                <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6 flex justify-center">

                  <Math tex="\|Av\|^2 = (Av)^T(Av)" className="text-3xl font-bold" />

                </div>
              </div>

              {/* STEP 4 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 4 · Move The Transpose
                </p>

                <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6 flex flex-col items-center">

                  <Math tex="(Av)^T (Av) = v^T A^T A v" className="text-3xl font-bold mb-4" />

                  <p className="text-lg text-sky-800 mt-3 text-center">
                    Using the transpose rule:
                  </p>

                  <Math tex="(AB)^T = B^T A^T" className="text-xl font-bold mt-2" />

                </div>
              </div>

              {/* STEP 5 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 5 · Something Interesting Appears
                </p>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 flex flex-col items-center">

                  <Math tex="v^T (A^T A) v" className="text-4xl font-bold" />

                  <p className="text-xl font-bold text-amber-900 mt-6 text-center">
                    Suddenly <Math tex="A^T A" /> appears.
                  </p>

                  <p className="text-lg text-amber-800 mt-3 text-center">
                    Nobody invented it.
                  </p>

                  <p className="text-lg text-amber-800 mt-2 text-center">
                    It falls out naturally from measuring stretch.
                  </p>

                </div>
              </div>

              {/* STEP 6 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 6 · Why Focus On AᵀA?
                </p>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 flex flex-col items-center">

                  <p className="text-xl font-bold text-emerald-900 mb-4 text-center">
                    Because <Math tex="v" /> is still the thing we're choosing.
                  </p>

                  <Math tex="v^T (A^T A) v" className="text-3xl font-bold" />

                  <p className="text-lg text-emerald-800 mt-5 text-center">
                    The matrix <Math tex="A^T A" /> controls how much stretching occurs.
                  </p>

                  <p className="text-lg text-emerald-800 mt-2 text-center">
                    It contains the information we care about.
                  </p>

                </div>
              </div>

              {/* STEP 7 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Final Discovery
                </p>

                <div className="rounded-2xl bg-slate-900 p-6 text-white flex flex-col items-center">

                  <p className="text-3xl font-black mb-5 text-center">
                    Stretch Information Lives Inside <Math tex="A^T A" />
                  </p>

                  <div className="space-y-3 text-xl w-full max-w-md">

                    <p>
                      • We started with a stretching problem
                    </p>

                    <p>
                      • We expanded the vector length
                    </p>

                    <p>
                      • <Math tex="A^T A" /> appeared automatically
                    </p>

                    <p>
                      • <Math tex="A^T A" /> contains all stretch information
                    </p>

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

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-slate-500 mb-3">
            Question
          </p>

          <p className="text-lg font-bold text-slate-800">
            Which direction gets stretched the most?
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-amber-600 mb-3">
            Important
          </p>

          <p className="text-base text-amber-800 leading-relaxed">
            AᵀA is not a trick.
          </p>

          <p className="text-base font-bold text-amber-900 mt-3">
            It emerges naturally from the math.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            Interpretation
          </p>

          <p className="text-base text-emerald-800 leading-relaxed">
            AᵀA ignores final orientation and focuses only on stretch.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Key Insight
          </p>

          <p className="text-xl font-black">
            To find important directions,
            first understand stretching.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_5_WhyATA;