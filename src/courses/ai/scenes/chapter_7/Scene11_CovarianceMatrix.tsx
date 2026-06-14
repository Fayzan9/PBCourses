// Scene11_CovarianceMatrix.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_11_CovarianceMatrix: React.FC = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* MAIN CONTENT */}
      <div
        className="flex flex-col items-center justify-center px-4"
        style={{ flex: '0 0 78%' }}
      >
        {/* HEADER */}
        <div className="text-center mb-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            CHAPTER 7 • SCENE 11
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            Why A
            <span className="text-violet-600"> Covariance Matrix?</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            We need one place to store everything PCA learns about the data.
          </p>
        </div>

        {/* CARD */}
        <div
          className="rounded-3xl overflow-hidden flex flex-col"
          style={{
            width: 880,
            height: 520,
            maxWidth: '100%',
            background:
              'linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%)',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          }}
        >
          <div
            className="flex-1 min-h-0"
            style={{
              display: 'grid',
              gridTemplateColumns: '34% 28% 38%',
            }}
          >
            {/* LEFT */}
            <div className="border-r border-slate-200 flex flex-col justify-center min-h-0">

              <div className="border-b border-slate-200 py-3 text-center">
                <div className="text-xl font-black text-slate-800">
                  Example Dataset
                </div>

                <div className="text-xs text-slate-500 mt-0.5">
                  Height & Weight
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-center min-h-0 overflow-y-auto">

                {/* TABLE */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden text-xs">

                  <div className="grid grid-cols-2 bg-slate-100 font-black text-slate-700">
                    <div className="p-2 border-r border-slate-200">
                      Height
                    </div>

                    <div className="p-2">
                      Weight
                    </div>
                  </div>

                  {[
                    ['170', '65'],
                    ['175', '70'],
                    ['180', '75'],
                    ['185', '80'],
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-2 border-t border-slate-200"
                    >
                      <div className="p-2 border-r border-slate-200">
                        {row[0]}
                      </div>

                      <div className="p-2">
                        {row[1]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* QUESTIONS */}
                <div className="mt-3 space-y-2">

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-xs">
                      <div className="font-black text-slate-800">
                        How much does Height vary?
                      </div>

                      <div className="mt-0.5 text-violet-600 font-bold">
                        → Variance(H)
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-xs">
                      <div className="font-black text-slate-800">
                        How much does Weight vary?
                      </div>

                      <div className="mt-0.5 text-violet-600 font-bold">
                        → Variance(W)
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="bg-violet-50 border border-violet-200 rounded-xl p-2.5 text-xs">
                      <div className="font-black text-violet-700">
                        Do Height & Weight move together?
                      </div>

                      <div className="mt-0.5 text-violet-600 font-bold">
                        → Cov(H,W)
                      </div>
                    </div>
                  </motion.div>

                </div>

              </div>

            </div>

            {/* CENTER */}
            <div className="border-r border-slate-200 flex flex-col items-center justify-center px-4">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center w-full"
              >
                <div className="text-lg font-black text-slate-800">
                  We now have
                </div>

                <div className="mt-3 space-y-2 text-xs">

                  <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 font-semibold">
                    Variance(H)
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 font-semibold">
                    Variance(W)
                  </div>

                  <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-2 font-semibold text-violet-700">
                    Cov(H,W)
                  </div>

                </div>

                <div className="text-3xl font-black text-violet-500 mt-4">
                  →
                </div>

                <div className="mt-2 text-base font-black text-violet-700">
                  Where do we store
                  <br />
                  all of these?
                </div>
              </motion.div>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center justify-center px-5">

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 1.4,
                }}
                className="w-full"
              >
                <div className="text-center mb-4">
                  <div className="text-2xl leading-tight font-black text-violet-700">
                    Covariance Matrix
                  </div>
                </div>

                {/* MATRIX */}
                <div className="relative">

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[70px] leading-none text-slate-300 font-thin">
                    [
                  </div>

                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[70px] leading-none text-slate-300 font-thin">
                    ]
                  </div>

                  <div className="px-8">

                    <div className="grid grid-cols-2 gap-2 text-xs">

                      <div className="bg-violet-100 rounded-xl p-2.5 text-center">
                        <div className="font-black text-violet-700">
                          Var(H)
                        </div>
                      </div>

                      <div className="bg-violet-50 rounded-xl p-2.5 text-center">
                        <div className="font-black text-violet-700">
                          Cov(H,W)
                        </div>
                      </div>

                      <div className="bg-violet-50 rounded-xl p-2.5 text-center">
                        <div className="font-black text-violet-700">
                          Cov(H,W)
                        </div>
                      </div>

                      <div className="bg-violet-100 rounded-xl p-2.5 text-center">
                        <div className="font-black text-violet-700">
                          Var(W)
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                <div className="mt-4 bg-slate-900 rounded-xl p-3 text-center">
                  <div className="text-white font-black text-sm">
                    Summary of all variation
                    <br />
                    and relationships
                  </div>
                </div>

              </motion.div>

            </div>

          </div>

          {/* FOOTER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="border-t border-slate-200 bg-violet-50 py-3 px-5 flex-shrink-0"
          >
            <div className="text-center">

              <div className="text-base font-black text-violet-700">
                PCA never studies raw points directly.
              </div>

              <div className="text-xs text-slate-500 mt-0.5">
                It studies the covariance matrix built from those points.
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className="border-l border-slate-200 px-8 py-10 flex flex-col justify-center"
        style={{ flex: '0 0 22%' }}
      >
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-5">
            REMEMBER
          </p>

          <div className="space-y-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="font-black text-slate-800">
                Diagonal Entries
              </div>

              <div className="text-slate-500 mt-2">
                Variances
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="font-black text-violet-700">
                Off-Diagonal Entries
              </div>

              <div className="text-violet-600 mt-2">
                Covariances
              </div>
            </div>

          </div>

          <div className="mt-8 text-slate-500 leading-relaxed">
            The covariance matrix stores everything PCA needs before eigenvectors enter the story.
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_11_CovarianceMatrix;