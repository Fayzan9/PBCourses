import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_13_LowRankIntuition: React.FC = () => {
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
              Chapter 6 · Scene 13
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              Keeping Only What
              <span className="text-emerald-600"> Matters</span>
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              The real power of SVD appears when some singular values are much larger than others.
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
                  Imagine A Larger Matrix
                </p>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">

                  <div className="font-mono text-4xl font-black text-slate-800 text-center">
                    σ₁ = 100
                    <br />
                    σ₂ = 50
                    <br />
                    σ₃ = 10
                    <br />
                    σ₄ = 1
                    <br />
                    σ₅ = 0.1
                  </div>

                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Notice Something Strange
                </p>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">

                  <p className="text-xl font-bold text-amber-900">
                    The first few singular values dominate everything.
                  </p>

                  <p className="text-lg text-amber-800 mt-4">
                    100 and 50 are huge.
                  </p>

                  <p className="text-lg text-amber-800 mt-2">
                    1 and 0.1 barely contribute anything.
                  </p>

                </div>

              </div>

              {/* STEP 3 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Visualizing Importance
                </p>

                <div className="space-y-5">

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-black text-emerald-700">
                        σ₁ = 100
                      </span>

                      <span className="font-bold text-slate-500">
                        Very Important
                      </span>
                    </div>

                    <div className="h-12 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full w-full bg-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-black text-sky-700">
                        σ₂ = 50
                      </span>

                      <span className="font-bold text-slate-500">
                        Important
                      </span>
                    </div>

                    <div className="h-12 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-sky-500"
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-black text-violet-700">
                        σ₃ = 10
                      </span>

                      <span className="font-bold text-slate-500">
                        Small
                      </span>
                    </div>

                    <div className="h-12 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-violet-500"
                        style={{ width: '10%' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-black text-rose-700">
                        σ₄ = 1
                      </span>

                      <span className="font-bold text-slate-500">
                        Tiny
                      </span>
                    </div>

                    <div className="h-12 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-rose-500"
                        style={{ width: '1%' }}
                      />
                    </div>
                  </div>

                </div>

              </div>

              {/* STEP 4 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  The Key Question
                </p>

                <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6">

                  <p className="text-2xl font-black text-violet-900">
                    Do we really need all of them?
                  </p>

                  <p className="text-lg text-violet-800 mt-4">
                    What happens if we keep only the biggest singular values?
                  </p>

                </div>

              </div>

              {/* STEP 5 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Low-Rank Approximation
                </p>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6">

                  <p className="text-lg text-emerald-800">
                    Keep:
                  </p>

                  <div className="font-mono text-4xl font-black text-emerald-700 mt-4">
                    σ₁, σ₂
                  </div>

                  <p className="text-lg text-emerald-800 mt-5">
                    Discard:
                  </p>

                  <div className="font-mono text-4xl font-black text-slate-400 mt-4">
                    σ₃, σ₄, σ₅
                  </div>

                  <p className="text-xl font-bold text-emerald-900 mt-6">
                    Most of the structure remains.
                  </p>

                </div>

              </div>

              {/* STEP 6 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Why This Works
                </p>

                <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6">

                  <p className="text-xl font-bold text-sky-900">
                    The largest singular values capture the most important patterns.
                  </p>

                  <p className="text-lg text-sky-800 mt-4">
                    The tiny singular values often represent:
                  </p>

                  <div className="mt-4 space-y-2 text-lg text-sky-800">
                    <p>• Noise</p>
                    <p>• Small details</p>
                    <p>• Weak structure</p>
                  </div>

                </div>

              </div>

              {/* FINAL DISCOVERY */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Final Discovery
                </p>

                <div className="rounded-2xl bg-slate-900 p-6 text-white">

                  <p className="text-3xl font-black mb-5">
                    Compression Is Just Throwing Away Weak Directions
                  </p>

                  <div className="space-y-3 text-xl">

                    <p>
                      • Keep important singular values
                    </p>

                    <p>
                      • Remove unimportant singular values
                    </p>

                    <p>
                      • Preserve most information
                    </p>

                    <p>
                      • Use far less storage
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

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            Big Singular Values
          </p>

          <p className="text-lg font-bold text-emerald-900">
            Important structure.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-slate-500 mb-3">
            Small Singular Values
          </p>

          <p className="text-lg font-bold text-slate-800">
            Less important structure.
          </p>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-violet-600 mb-3">
            Core Idea
          </p>

          <p className="text-base text-violet-800 leading-relaxed">
            Most real-world data contains hidden redundancy.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Key Insight
          </p>

          <p className="text-xl font-black">
            Compression is keeping the strongest directions and ignoring the weakest ones.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_13_LowRankIntuition;