// Scene04_VarianceAsInformation.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_4_VarianceAsInformation: React.FC = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* MAIN */}
      <div
        className="flex flex-col items-center justify-center px-4"
        style={{ flex: '0 0 78%' }}
      >
        {/* HEADER */}
        <div className="text-center mb-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            CHAPTER 7 • SCENE 4
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            Why Does
            <span className="text-violet-600"> Variance Matter?</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            PCA assumes that directions with more variation contain more information.
          </p>
        </div>

        {/* CARD */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            width: 980,
            height: 680,
            maxWidth: '100%',
            background:
              'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          }}
        >
          <div className="grid grid-cols-2 h-full">

            {/* LOW VARIANCE */}
            <div className="border-r border-slate-200 relative">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 text-center"
              >
                <div className="text-2xl font-black text-slate-700">
                  Low Variance
                </div>

                <div className="text-slate-500 mt-2">
                  Almost everyone looks the same
                </div>
              </motion.div>

              <svg
                width="100%"
                height="100%"
                viewBox="0 0 490 680"
              >
                {/* axis */}
                <line
                  x1={70}
                  y1={420}
                  x2={430}
                  y2={420}
                  stroke="#94a3b8"
                  strokeWidth="3"
                />

                {[210, 225, 240, 255, 270].map((x, i) => (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={420}
                    r={10}
                    fill="#64748b"
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: i * 0.1,
                    }}
                  />
                ))}

                <motion.text
                  x="245"
                  y="520"
                  textAnchor="middle"
                  fill="#64748b"
                  fontWeight="900"
                  fontSize="28"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Not much information
                </motion.text>
              </svg>
            </div>

            {/* HIGH VARIANCE */}
            <div className="relative">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 text-center"
              >
                <div className="text-2xl font-black text-violet-700">
                  High Variance
                </div>

                <div className="text-slate-500 mt-2">
                  People are very different
                </div>
              </motion.div>

              <svg
                width="100%"
                height="100%"
                viewBox="0 0 490 680"
              >
                {/* axis */}
                <line
                  x1={70}
                  y1={420}
                  x2={430}
                  y2={420}
                  stroke="#94a3b8"
                  strokeWidth="3"
                />

                {[90, 150, 230, 320, 400].map((x, i) => (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={420}
                    r={10}
                    fill="#7C3AED"
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 1.2 + i * 0.1,
                    }}
                  />
                ))}

                <motion.text
                  x="245"
                  y="520"
                  textAnchor="middle"
                  fill="#7C3AED"
                  fontWeight="900"
                  fontSize="28"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  More information
                </motion.text>
              </svg>
            </div>

          </div>

          {/* BOTTOM STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 }}
            className="absolute"
          />

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-4 w-[980px] max-w-full"
        >
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
            <div className="text-2xl font-black text-violet-700">
              PCA treats variation as signal.
            </div>

            <div className="text-slate-600 mt-2">
              Directions with more spread are considered more informative.
            </div>
          </div>
        </motion.div>

      </div>

      {/* RIGHT PANEL */}
      <div
        className="border-l border-slate-200 px-8 py-10 flex flex-col justify-center"
        style={{ flex: '0 0 22%' }}
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.2 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-5">
            INTUITION
          </p>

          <div className="space-y-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="font-black text-slate-800 text-lg">
                Everyone has one heart
              </div>

              <div className="text-slate-500 mt-1">
                Very low variance
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="font-black text-slate-800 text-lg">
                Height varies a lot
              </div>

              <div className="text-slate-500 mt-1">
                High variance
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="font-black text-violet-700 text-lg">
                PCA searches for directions with the largest variance.
              </div>
            </div>

          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_4_VarianceAsInformation;