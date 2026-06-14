// Scene08_WhyCentering.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_8_WhyCentering: React.FC = () => {
  const leftPoints = [
    [180, 350],
    [250, 290],
    [320, 230],
  ];

  const rightPoints = [
    [180, 350],
    [250, 290],
    [320, 230],
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
            CHAPTER 7 • SCENE 8
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            Why Do We
            <span className="text-violet-600"> Center Data?</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            PCA wants to measure variation, not location.
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

            {/* DATASET A */}
            <div className="border-r border-slate-200 flex flex-col">

              <div className="py-5 text-center border-b border-slate-200">
                <div className="text-2xl font-black text-slate-800">
                  Dataset A
                </div>

                <div className="text-slate-500 mt-1">
                  Near the origin
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 480 500"
                >
                  {/* axes */}
                  <line
                    x1={70}
                    y1={430}
                    x2={420}
                    y2={430}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  <line
                    x1={70}
                    y1={80}
                    x2={70}
                    y2={430}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  {leftPoints.map(([x, y], i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={11}
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
                        delay: i * 0.15,
                      }}
                    />
                  ))}

                  <motion.text
                    x="240"
                    y="470"
                    textAnchor="middle"
                    fill="#7C3AED"
                    fontWeight="900"
                    fontSize="22"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Spread = Same
                  </motion.text>
                </svg>

              </div>

            </div>

            {/* DATASET B */}
            <div className="flex flex-col">

              <div className="py-5 text-center border-b border-slate-200">
                <div className="text-2xl font-black text-violet-700">
                  Dataset B
                </div>

                <div className="text-slate-500 mt-1">
                  Shifted far away
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 480 500"
                >
                  {/* axes */}
                  <line
                    x1={70}
                    y1={430}
                    x2={420}
                    y2={430}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  <line
                    x1={70}
                    y1={80}
                    x2={70}
                    y2={430}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  {/* shifted cloud */}
                  {rightPoints.map(([x, y], i) => (
                    <motion.circle
                      key={i}
                      cx={x + 70}
                      cy={y - 120}
                      r={11}
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
                        delay: 0.8 + i * 0.15,
                      }}
                    />
                  ))}

                  <motion.text
                    x="270"
                    y="470"
                    textAnchor="middle"
                    fill="#7C3AED"
                    fontWeight="900"
                    fontSize="22"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    Same Spread
                  </motion.text>
                </svg>

              </div>

            </div>

          </div>
        </div>

        {/* BOTTOM INSIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-4 w-[980px] max-w-full"
        >
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
            <div className="text-2xl font-black text-amber-700">
              These datasets have identical structure.
            </div>

            <div className="text-slate-600 mt-2">
              Only their location changed.
            </div>
          </div>
        </motion.div>

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
            PROBLEM
          </p>

          <div className="space-y-5">

            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="font-black text-red-700">
                Without Centering
              </div>

              <div className="text-red-600 mt-2">
                PCA notices location
              </div>
            </div>

            <div className="text-center text-4xl font-black text-slate-400">
              ↓
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="font-black text-violet-700">
                With Centering
              </div>

              <div className="text-violet-600 mt-2">
                PCA notices variation
              </div>
            </div>

          </div>

          <div className="mt-8 text-slate-500 leading-relaxed">
            Before PCA starts,
            we move the cloud so its
            <span className="font-bold text-slate-800">
              {' '}mean sits at the origin.
            </span>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_8_WhyCentering;