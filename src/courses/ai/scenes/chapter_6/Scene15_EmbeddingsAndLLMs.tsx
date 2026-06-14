import React from 'react';
import { motion } from 'framer-motion';

export const Scene6_15_EmbeddingsAndLLMs: React.FC = () => {
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
              Chapter 6 · Scene 15
            </p>

            <h2 className="text-4xl font-black text-slate-800 mt-2">
              Why Modern AI
              <span className="text-emerald-600"> Uses SVD</span>
            </h2>

            <p className="text-lg text-slate-500 mt-3">
              The same idea behind Netflix recommendations appears inside embeddings and language models.
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
                  Start With A Huge Matrix
                </p>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">

                  <div className="text-center">
                    <div className="font-black text-3xl text-slate-800">
                      Words × Contexts
                    </div>

                    <div className="text-5xl my-4">
                      ↓
                    </div>

                    <div className="font-black text-3xl text-slate-800">
                      Millions of Numbers
                    </div>
                  </div>

                </div>
              </div>

              {/* STEP 2 */}
              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Example
                </p>

                <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6">

                  <table className="w-full text-center">

                    <thead>
                      <tr className="text-violet-700 font-black">
                        <th>Word</th>
                        <th>King</th>
                        <th>Queen</th>
                        <th>Dog</th>
                      </tr>
                    </thead>

                    <tbody className="font-bold text-slate-800">

                      <tr>
                        <td>Royal</td>
                        <td>8</td>
                        <td>7</td>
                        <td>0</td>
                      </tr>

                      <tr>
                        <td>Animal</td>
                        <td>0</td>
                        <td>0</td>
                        <td>9</td>
                      </tr>

                      <tr>
                        <td>Male</td>
                        <td>6</td>
                        <td>1</td>
                        <td>2</td>
                      </tr>

                      <tr>
                        <td>Female</td>
                        <td>1</td>
                        <td>6</td>
                        <td>1</td>
                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

              {/* STEP 3 */}

              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  The Problem
                </p>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">

                  <p className="text-xl font-bold text-amber-900">
                    Most dimensions are redundant.
                  </p>

                  <p className="text-lg text-amber-800 mt-4">
                    Thousands of columns often describe the same underlying concept.
                  </p>

                </div>

              </div>

              {/* STEP 4 */}

              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  What SVD Finds
                </p>

                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6">

                  <p className="text-xl font-bold text-emerald-900">
                    Hidden Semantic Directions
                  </p>

                  <div className="mt-5 space-y-3 text-lg text-emerald-800">

                    <p>• Royal ↔ Common</p>

                    <p>• Male ↔ Female</p>

                    <p>• Human ↔ Animal</p>

                    <p>• Formal ↔ Informal</p>

                  </div>

                </div>

              </div>

              {/* STEP 5 */}

              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Keep Only Important Directions
                </p>

                <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6">

                  <div className="text-center">

                    <div className="font-black text-2xl text-slate-500 line-through">
                      10,000 dimensions
                    </div>

                    <div className="text-5xl my-3">
                      ↓
                    </div>

                    <div className="font-black text-4xl text-sky-700">
                      300 dimensions
                    </div>

                  </div>

                  <p className="text-lg text-sky-800 mt-5 text-center">
                    Most meaning survives.
                  </p>

                </div>

              </div>

              {/* STEP 6 */}

              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Embeddings Are Just Coordinates
                </p>

                <div className="rounded-2xl bg-violet-50 border border-violet-200 p-6">

                  <p className="text-xl font-bold text-violet-900">
                    After dimensionality reduction:
                  </p>

                  <div className="font-mono text-2xl font-black text-violet-700 mt-5">
                    King → [2.1, 0.8, -1.3, ...]
                  </div>

                  <div className="font-mono text-2xl font-black text-violet-700 mt-3">
                    Queen → [2.0, -0.9, -1.2, ...]
                  </div>

                  <div className="font-mono text-2xl font-black text-violet-700 mt-3">
                    Dog → [-1.8, 0.1, 2.4, ...]
                  </div>

                </div>

              </div>

              {/* STEP 7 */}

              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Connection To Chapter 1
                </p>

                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6">

                  <p className="text-2xl font-black text-rose-900">
                    Everything became a point.
                  </p>

                  <p className="text-lg text-rose-800 mt-4">
                    SVD helps decide which dimensions matter most.
                  </p>

                </div>

              </div>

              {/* FINAL DISCOVERY */}

              <div className="border-t pt-8">

                <p className="text-sm uppercase tracking-widest font-black text-slate-400 mb-4">
                  Final Discovery
                </p>

                <div className="rounded-2xl bg-slate-900 p-6 text-white">

                  <p className="text-3xl font-black mb-5">
                    SVD Discovers The Hidden Concepts Inside Data
                  </p>

                  <div className="space-y-3 text-xl">

                    <p>
                      • Find important directions
                    </p>

                    <p>
                      • Remove redundancy
                    </p>

                    <p>
                      • Compress information
                    </p>

                    <p>
                      • Preserve meaning
                    </p>

                  </div>

                  <p className="text-2xl font-black text-emerald-400 mt-6">
                    This is the foundation of embeddings.
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
            Input
          </p>

          <p className="text-lg font-bold text-violet-900">
            Massive sparse matrices.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-3">
            Output
          </p>

          <p className="text-lg font-bold text-emerald-900">
            Compact semantic vectors.
          </p>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider font-black text-sky-600 mb-3">
            SVD's Job
          </p>

          <p className="text-base text-sky-800 leading-relaxed">
            Discover the few dimensions that explain most of the meaning.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm text-slate-300 font-bold mb-2">
            Connection
          </p>

          <p className="text-xl font-black">
            Chapter 1 created points.
          </p>

          <p className="text-xl font-black mt-2">
            SVD finds the dimensions that matter.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_15_EmbeddingsAndLLMs;
