// Scene10_CovarianceIntuition.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_10_CovarianceIntuition: React.FC = () => {
  const positive = [
    [120, 340],
    [170, 300],
    [220, 260],
    [270, 220],
    [320, 180],
    [370, 140],
  ];

  const negative = [
    [120, 140],
    [170, 180],
    [220, 220],
    [270, 260],
    [320, 300],
    [370, 340],
  ];

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
            CHAPTER 7 • SCENE 10
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            When Features
            <span className="text-violet-600"> Move Together</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            PCA is not just about variance. It is about relationships.
          </p>
        </div>

        {/* MAIN CARD */}
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

            {/* POSITIVE */}
            <div className="border-r border-slate-200 flex flex-col">

              <div className="border-b border-slate-200 py-5 text-center">
                <div className="text-2xl font-black text-violet-700">
                  Positive Relationship
                </div>

                <div className="text-slate-500 mt-1">
                  Height ↑ → Weight ↑
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 460 500"
                >
                  {/* axes */}
                  <line
                    x1={70}
                    y1={420}
                    x2={410}
                    y2={420}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  <line
                    x1={70}
                    y1={80}
                    x2={70}
                    y2={420}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  <text
                    x="320"
                    y="455"
                    fill="#64748B"
                    fontSize="18"
                    fontWeight="700"
                  >
                    Height
                  </text>

                  <text
                    x="15"
                    y="120"
                    fill="#64748B"
                    fontSize="18"
                    fontWeight="700"
                  >
                    Weight
                  </text>

                  {positive.map(([x, y], i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
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
                        delay: i * 0.1,
                      }}
                    />
                  ))}

                  <motion.line
                    x1={100}
                    y1={360}
                    x2={390}
                    y2={120}
                    stroke="#A78BFA"
                    strokeWidth="5"
                    strokeDasharray="12 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 0.8,
                    }}
                  />
                </svg>

              </div>

            </div>

            {/* NEGATIVE */}
            <div className="flex flex-col">

              <div className="border-b border-slate-200 py-5 text-center">
                <div className="text-2xl font-black text-red-600">
                  Negative Relationship
                </div>

                <div className="text-slate-500 mt-1">
                  One rises, one falls
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 460 500"
                >
                  {/* axes */}
                  <line
                    x1={70}
                    y1={420}
                    x2={410}
                    y2={420}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  <line
                    x1={70}
                    y1={80}
                    x2={70}
                    y2={420}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  {negative.map(([x, y], i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={10}
                      fill="#EF4444"
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay: 1 + i * 0.1,
                      }}
                    />
                  ))}

                  <motion.line
                    x1={100}
                    y1={120}
                    x2={390}
                    y2={360}
                    stroke="#FCA5A5"
                    strokeWidth="5"
                    strokeDasharray="12 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 1.8,
                    }}
                  />
                </svg>

              </div>

            </div>

          </div>

          {/* BOTTOM REVEAL */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="border-t border-slate-200 bg-slate-900 p-6"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-white">
                Covariance measures whether features move together.
              </div>

              <div className="text-xl text-slate-300 mt-2">
                PCA needs this because structure comes from relationships.
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
          transition={{ delay: 2.8 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-5">
            NEW IDEA
          </p>

          <div className="space-y-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="font-black text-slate-800">
                Variance
              </div>

              <div className="text-slate-500 mt-2">
                How much one feature varies
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="font-black text-violet-700">
                Covariance
              </div>

              <div className="text-violet-600 mt-2">
                How two features vary together
              </div>
            </div>

          </div>

          <div className="mt-8 text-slate-500 leading-relaxed">
            Variance looks at a single feature.
            <br />
            <br />
            <span className="font-bold text-slate-800">
              Covariance looks at the relationship between features.
            </span>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_10_CovarianceIntuition;