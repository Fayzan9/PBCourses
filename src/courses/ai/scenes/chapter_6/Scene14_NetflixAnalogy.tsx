import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_14_NetflixAnalogy: React.FC = () => {
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
              Chapter 6 · Scene 14
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              Why Netflix
              <span className="text-emerald-600"> Cares About SVD</span>
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              A recommendation system is really a giant matrix waiting to be decomposed.
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
                  Imagine A Rating Matrix
                </p>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">

                  <div className="overflow-hidden rounded-xl border border-slate-200">

                    <table className="w-full text-center">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-3">User</th>
                          <th>Action</th>
                          <th>Comedy</th>
                          <th>Romance</th>
                          <th>Horror</th>
                        </tr>
                      </thead>

                      <tbody className="font-bold">
                        <tr>
                          <td className="p-3">Alice</td>
                          <td>5</td>
                          <td>4</td>
                          <td>1</td>
                          <td>1</td>
                        </tr>

                        <tr>
                          <td className="p-3">Bob</td>
                          <td>4</td>
                          <td>5</td>
                          <td>1</td>
                          <td>2</td>
                        </tr>

                        <tr>
                          <td className="p-3">Carol</td>
                          <td>1</td>
                          <td>1</td>
                          <td>5</td>
                          <td>4</td>
                        </tr>

                        <tr>
                          <td className="p-3">David</td>
                          <td>2</td>
                          <td>1</td>
                          <td>4</td>
                          <td>5</td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  What SVD Discovers
                </p>

                <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6">

                  <p className="text-xl font-bold text-violet-900">
                    The matrix contains hidden directions.
                  </p>

                  <p className="text-lg text-violet-800 mt-4">
                    Not movie genres.
                  </p>

                  <p className="text-lg text-violet-800 mt-2">
                    Deeper preference patterns.
                  </p>

                </div>

              </div>

              {/* STEP 3 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Hidden Direction #1
                </p>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6">

                  <p className="text-2xl font-black text-emerald-900">
                    Action Lovers ↔ Romance Lovers
                  </p>

                  <p className="text-lg text-emerald-800 mt-4">
                    This direction explains a huge amount of user behavior.
                  </p>

                  <div className="mt-5 font-mono text-4xl font-black text-emerald-700">
                    σ₁ = Very Large
                  </div>

                </div>

              </div>

              {/* STEP 4 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Hidden Direction #2
                </p>

                <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6">

                  <p className="text-2xl font-black text-sky-900">
                    Comedy Lovers ↔ Horror Lovers
                  </p>

                  <p className="text-lg text-sky-800 mt-4">
                    Another meaningful pattern.
                  </p>

                  <div className="mt-5 font-mono text-4xl font-black text-sky-700">
                    σ₂ = Large
                  </div>

                </div>

              </div>

              {/* STEP 5 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Most Directions Are Weak
                </p>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">

                  <p className="text-lg text-amber-800">
                    Some directions represent:
                  </p>

                  <div className="mt-4 space-y-2 text-lg text-amber-900 font-semibold">
                    <p>• Random preferences</p>
                    <p>• Noise</p>
                    <p>• One-off ratings</p>
                    <p>• Weak patterns</p>
                  </div>

                  <div className="mt-6 font-mono text-4xl font-black text-amber-700">
                    σ ≈ 0
                  </div>

                </div>

              </div>

              {/* STEP 6 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  The Trick
                </p>

                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6">

                  <p className="text-xl font-bold text-rose-900">
                    Keep only the strongest singular values.
                  </p>

                  <div className="mt-5 font-mono text-4xl font-black text-rose-700">
                    σ₁, σ₂
                  </div>

                  <p className="text-lg text-rose-800 mt-5">
                    Ignore hundreds of tiny directions.
                  </p>

                </div>

              </div>

              {/* STEP 7 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  What Netflix Gains
                </p>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6">

                  <div className="space-y-3 text-xl text-emerald-900">

                    <p>• Smaller storage</p>
                    <p>• Faster computation</p>
                    <p>• Better recommendations</p>
                    <p>• Hidden taste discovery</p>

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
                    SVD Finds The Few Patterns That Explain Most Of The Data
                  </p>

                  <div className="space-y-3 text-xl">

                    <p>
                      • Data may have thousands of dimensions
                    </p>

                    <p>
                      • Only a few matter
                    </p>

                    <p>
                      • Singular values measure importance
                    </p>

                    <p>
                      • Keep the strongest patterns
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

        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-violet-600 mb-3">
            Matrix
          </p>

          <p className="text-lg font-bold text-violet-900">
            Users × Movies
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            Singular Values
          </p>

          <p className="text-lg font-bold text-emerald-900">
            Measure importance of hidden preference patterns.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-amber-600 mb-3">
            Compression
          </p>

          <p className="text-base text-amber-800 leading-relaxed">
            Keep the strongest patterns. Ignore weak ones.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Key Insight
          </p>

          <p className="text-xl font-black">
            SVD turns massive data into a few meaningful latent factors.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_14_NetflixAnalogy;