import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_12_RevealSVD: React.FC = () => {
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
              Chapter 6 · Scene 12
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              The Final
              <span className="text-emerald-600"> SVD Formula</span>
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              We now have every piece needed to understand SVD.
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
                  What We Found
                </p>

                <div className="grid grid-cols-3 gap-5">

                  <div className="rounded-2xl bg-violet-50 border border-violet-200 p-5">
                    <p className="text-sm uppercase tracking-wider font-black text-violet-600 mb-3">
                      V
                    </p>

                    <p className="text-xl font-black text-violet-900">
                      Input Directions
                    </p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
                    <p className="text-sm uppercase tracking-wider font-black text-emerald-600 mb-3">
                      Σ
                    </p>

                    <p className="text-xl font-black text-emerald-900">
                      Stretch Amounts
                    </p>
                  </div>

                  <div className="rounded-2xl bg-sky-50 border border-sky-200 p-5">
                    <p className="text-sm uppercase tracking-wider font-black text-sky-600 mb-3">
                      U
                    </p>

                    <p className="text-xl font-black text-sky-900">
                      Output Directions
                    </p>
                  </div>

                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-8">
                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Assemble Everything
                </p>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">

                  <div className="font-mono text-7xl font-black text-slate-800">
                    A = UΣVᵀ
                  </div>

                </div>
              </div>

              {/* STEP 3 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Read It From Right To Left
                </p>

                <div className="space-y-5">

                  <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6">
                    <div className="flex items-center gap-5">

                      <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-black text-xl">
                        1
                      </div>

                      <div>
                        <p className="text-2xl font-black text-violet-900">
                          Vᵀ
                        </p>

                        <p className="text-lg text-violet-800 mt-1">
                          Rotate into the important input coordinate system.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6">
                    <div className="flex items-center gap-5">

                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xl">
                        2
                      </div>

                      <div>
                        <p className="text-2xl font-black text-emerald-900">
                          Σ
                        </p>

                        <p className="text-lg text-emerald-800 mt-1">
                          Stretch along those special directions.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6">
                    <div className="flex items-center gap-5">

                      <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xl">
                        3
                      </div>

                      <div>
                        <p className="text-2xl font-black text-sky-900">
                          U
                        </p>

                        <p className="text-lg text-sky-800 mt-1">
                          Rotate into the final output orientation.
                        </p>
                      </div>

                    </div>
                  </div>

                </div>

              </div>

              {/* STEP 4 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  The Hidden Story Inside Every Matrix
                </p>

                <div className="rounded-2xl bg-slate-900 p-8 text-white">

                  <div className="flex items-center justify-center gap-8 text-center">

                    <div>
                      <div className="text-5xl font-black text-violet-400">
                        Vᵀ
                      </div>

                      <div className="mt-2 text-lg text-slate-300">
                        Rotate
                      </div>
                    </div>

                    <div className="text-4xl">
                      →
                    </div>

                    <div>
                      <div className="text-5xl font-black text-emerald-400">
                        Σ
                      </div>

                      <div className="mt-2 text-lg text-slate-300">
                        Stretch
                      </div>
                    </div>

                    <div className="text-4xl">
                      →
                    </div>

                    <div>
                      <div className="text-5xl font-black text-sky-400">
                        U
                      </div>

                      <div className="mt-2 text-lg text-slate-300">
                        Rotate
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* STEP 5 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Why This Is Powerful
                </p>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">

                  <p className="text-xl font-bold text-amber-900">
                    A matrix may look complicated...
                  </p>

                  <p className="text-lg text-amber-800 mt-4">
                    but SVD reveals that every matrix is secretly just:
                  </p>

                  <div className="font-black text-4xl text-amber-700 mt-6">
                    Rotate → Stretch → Rotate
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
                    Every Matrix Has Hidden Geometry
                  </p>

                  <div className="space-y-3 text-xl">

                    <p>
                      • Find important directions
                    </p>

                    <p>
                      • Measure stretching
                    </p>

                    <p>
                      • Find output directions
                    </p>

                    <p>
                      • Rebuild the entire transformation
                    </p>

                  </div>

                  <div className="font-mono text-5xl font-black text-emerald-400 mt-8">
                    A = UΣVᵀ
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
            V
          </p>

          <p className="text-lg font-bold text-violet-900">
            Important input directions.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            Σ
          </p>

          <p className="text-lg font-bold text-emerald-900">
            Stretch amounts.
          </p>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-sky-600 mb-3">
            U
          </p>

          <p className="text-lg font-bold text-sky-900">
            Important output directions.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Key Insight
          </p>

          <p className="text-xl font-black">
            SVD is not a formula.
          </p>

          <p className="text-xl font-black mt-2">
            It's a geometric decomposition.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_12_RevealSVD;