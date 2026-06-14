import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math } from '../../components/Math';

const TABS = [
  {
    title: 'Any Matrix',
    matrix: [
      [3, 1],
      [2, 4],
    ],
    color: 'rose',
    description:
      'A can be messy. Directions rotate. Geometry becomes difficult.',
  },
  {
    title: 'AᵀA',
    matrix: [
      [13, 11],
      [11, 17],
    ],
    color: 'emerald',
    description:
      'AᵀA is always symmetric. Geometry suddenly becomes clean.',
  },
];

export const Scene6_6_SymmetricGift: React.FC = () => {
  const [tab, setTab] = useState(0);

  const active = TABS[tab];

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* LEFT */}
      <div
        className="flex flex-col items-center justify-center px-6"
        style={{ flex: '0 0 72%' }}
      >
        <div className="text-center mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            Chapter 6 · Scene 6
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-2">
            Why symmetry
            <span className="text-emerald-600"> saves us</span>
          </h2>

          <p className="text-lg text-slate-500 mt-3">
            The secret advantage of AᵀA.
          </p>
        </div>

        <div className="flex gap-3 mb-8">
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className={`px-5 py-3 rounded-xl font-bold transition-all ${
                tab === i
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-5xl"
          >
            <div
              className={`rounded-3xl border p-12 ${
                tab === 0
                  ? 'bg-rose-50 border-rose-200'
                  : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div className="flex flex-col items-center">

                <div className="mb-10">
                  {tab === 0 ? (
                    <Math tex="A = \begin{bmatrix} 3 & 1 \\ 2 & 4 \end{bmatrix}" className="text-5xl font-bold" />
                  ) : (
                    <Math tex="A^T A = \begin{bmatrix} 13 & 11 \\ 11 & 17 \end{bmatrix}" className="text-5xl font-bold" />
                  )}
                </div>

                <p
                  className={`text-2xl font-black text-center ${
                    tab === 0
                      ? 'text-rose-700'
                      : 'text-emerald-700'
                  }`}
                >
                  {active.description}
                </p>

                {tab === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-10 grid grid-cols-2 gap-5 w-full"
                  >
                    <div className="rounded-2xl bg-white p-5 border border-rose-200">
                      <p className="font-black text-rose-700 text-lg">
                        Eigenvectors may be messy
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 border border-rose-200">
                      <p className="font-black text-rose-700 text-lg">
                        Directions may not be orthogonal
                      </p>
                    </div>
                  </motion.div>
                )}

                {tab === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-10 grid grid-cols-3 gap-5 w-full"
                  >
                    <div className="rounded-2xl bg-white p-5 border border-emerald-200">
                      <p className="font-black text-emerald-700 text-lg">
                        Real eigenvalues
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 border border-emerald-200">
                      <p className="font-black text-emerald-700 text-lg">
                        Orthogonal directions
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 border border-emerald-200">
                      <p className="font-black text-emerald-700 text-lg">
                        Clean geometry
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT */}
      <div
        className="flex flex-col justify-center gap-5 pr-6"
        style={{ flex: '0 0 28%' }}
      >
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
            Problem
          </p>

          <p className="text-lg font-bold text-slate-800 leading-relaxed">
            Directly analyzing A can be difficult.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-3">
            Miracle
          </p>

          <p className="text-lg font-black text-emerald-900 leading-snug">
            AᵀA is always symmetric.
          </p>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-xs font-black text-violet-600 uppercase tracking-wider mb-3">
            Why We Care
          </p>

          <p className="text-base text-violet-800 leading-relaxed">
            Symmetric matrices have beautiful geometric properties.
          </p>

          <p className="text-base font-bold text-violet-900 mt-3">
            That's why SVD studies AᵀA.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-sm font-bold text-slate-300 mb-2">
            Key Takeaway
          </p>

          <p className="text-xl font-black">
            We borrow the nice behavior of symmetric matrices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene6_6_SymmetricGift;