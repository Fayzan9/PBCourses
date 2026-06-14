import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_11_BuildingU: React.FC = () => {
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
              Chapter 6 · Scene 11
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              Building
              <span className="text-emerald-600"> U</span>
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              We found the important input directions. Now let's find the output directions.
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
                  What We Already Know
                </p>

                <div className="grid grid-cols-2 gap-5">

                  <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6">
                    <p className="text-sm uppercase tracking-wider font-black text-violet-600 mb-3">
                      Input Direction
                    </p>

                    <div className="font-mono text-4xl font-black text-violet-700">
                      v₁
                    </div>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6">
                    <p className="text-sm uppercase tracking-wider font-black text-emerald-600 mb-3">
                      Stretch Amount
                    </p>

                    <div className="font-mono text-4xl font-black text-emerald-700">
                      σ₁ = 4
                    </div>
                  </div>

                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 1 · Apply The Matrix
                </p>

                <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6">

                  <div className="font-mono text-4xl font-black text-sky-700">
                    Av₁
                  </div>

                  <p className="text-lg text-sky-800 mt-4">
                    This gives the actual transformed vector.
                  </p>

                  <p className="text-lg text-sky-800 mt-2">
                    But it still contains the stretching.
                  </p>

                </div>
              </div>

              {/* STEP 3 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Step 2 · Remove The Stretch
                </p>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">

                  <div className="font-mono text-5xl font-black text-amber-700">
                    u₁ = Av₁ / σ₁
                  </div>

                  <p className="text-lg text-amber-800 mt-5">
                    Divide by the singular value.
                  </p>

                  <p className="text-lg text-amber-800 mt-2">
                    Remove the stretching.
                  </p>

                </div>
              </div>

              {/* STEP 4 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Why Divide By σ?
                </p>

                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6">

                  <p className="text-xl font-bold text-rose-900 mb-4">
                    Av₁ contains two things:
                  </p>

                  <div className="space-y-3 text-lg text-rose-800">

                    <p>
                      • Direction
                    </p>

                    <p>
                      • Stretching
                    </p>

                  </div>

                  <p className="text-lg text-rose-800 mt-5">
                    Dividing by σ removes the stretching part.
                  </p>

                  <p className="text-lg text-rose-800 mt-2">
                    What's left is a pure direction.
                  </p>

                </div>
              </div>

              {/* STEP 5 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Example Using Our Matrix
                </p>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6">

                  <div className="space-y-4 font-mono">

                    <div className="text-3xl font-black text-slate-800">
                      Av₁ = 4v₁
                    </div>

                    <div className="text-3xl font-black text-slate-500">
                      ↓
                    </div>

                    <div className="text-3xl font-black text-slate-800">
                      u₁ = (4v₁)/4
                    </div>

                    <div className="text-3xl font-black text-slate-500">
                      ↓
                    </div>

                    <div className="text-4xl font-black text-emerald-700">
                      u₁ = v₁
                    </div>

                  </div>

                  <p className="text-lg text-emerald-800 mt-5">
                    In this special example they happen to be identical.
                  </p>

                </div>
              </div>

              {/* STEP 6 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  General Case
                </p>

                <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6">

                  <p className="text-xl font-bold text-violet-900">
                    Usually:
                  </p>

                  <div className="font-mono text-5xl font-black text-violet-700 mt-4">
                    uᵢ ≠ vᵢ
                  </div>

                  <p className="text-lg text-violet-800 mt-5">
                    Input directions and output directions are different.
                  </p>

                  <p className="text-lg text-violet-800 mt-2">
                    That's why SVD needs both U and V.
                  </p>

                </div>
              </div>

              {/* FINAL DISCOVERY */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Final Discovery
                </p>

                <div className="rounded-2xl bg-slate-900 p-6 text-white">

                  <div className="space-y-4 text-xl">

                    <p>
                      • V contains important input directions
                    </p>

                    <p>
                      • Σ contains stretch amounts
                    </p>

                    <p>
                      • U contains output directions
                    </p>

                  </div>

                  <div className="font-mono text-4xl font-black text-emerald-400 mt-6">
                    uᵢ = Avᵢ / σᵢ
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
            V Matrix
          </p>

          <p className="text-lg font-bold text-violet-900">
            Important input directions.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            U Matrix
          </p>

          <p className="text-lg font-bold text-emerald-900">
            Important output directions.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-amber-600 mb-3">
            Formula
          </p>

          <p className="text-2xl font-black text-amber-900 font-mono">
            uᵢ = Avᵢ/σᵢ
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Key Insight
          </p>

          <p className="text-xl font-black">
            U tells us where the important directions end up.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_11_BuildingU;