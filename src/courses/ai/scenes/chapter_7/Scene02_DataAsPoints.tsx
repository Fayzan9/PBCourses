// Scene02_DataAsPoints.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_2_DataAsPoints: React.FC = () => {
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
            CHAPTER 7 • SCENE 2
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            Data As
            <span className="text-violet-600"> Points In Space</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            PCA begins when rows become geometry.
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
          <div className="flex h-full">

            {/* LEFT SIDE */}
            <div className="w-[380px] border-r border-slate-200 flex flex-col justify-center px-8">

              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                  <div className="bg-slate-100 px-5 py-3 border-b border-slate-200">
                    <div className="font-black text-slate-700">
                      Customer Dataset
                    </div>
                  </div>

                  <table className="w-full">
                    <thead>
                      <tr className="text-slate-500">
                        <th className="py-3 px-5 text-left">
                          Height
                        </th>

                        <th className="py-3 px-5 text-left">
                          Weight
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {[
                        [170, 70],
                        [175, 75],
                        [180, 80],
                        [185, 85],
                        [190, 90],
                      ].map((row, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            delay: 0.4 + i * 0.15,
                          }}
                          className="border-t border-slate-100"
                        >
                          <td className="py-3 px-5 font-medium">
                            {row[0]}
                          </td>

                          <td className="py-3 px-5 font-medium">
                            {row[1]}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>

                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.5,
                }}
                className="flex justify-center py-8"
              >
                <div className="text-5xl font-black text-violet-500">
                  ↓
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.8,
                }}
                className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center"
              >
                <div className="text-sm uppercase tracking-wider text-violet-500 font-bold">
                  One Row
                </div>

                <div className="text-3xl font-black text-violet-700 mt-2">
                  (180, 80)
                </div>

                <div className="text-slate-500 mt-2">
                  becomes a point
                </div>
              </motion.div>

            </div>

            {/* RIGHT SIDE VISUAL */}
            <div className="flex-1 relative">

              <svg
                width="100%"
                height="100%"
                viewBox="0 0 600 680"
              >
                {/* axes */}
                <line
                  x1={80}
                  y1={610}
                  x2={540}
                  y2={610}
                  stroke="#94a3b8"
                  strokeWidth="3"
                />

                <line
                  x1={80}
                  y1={70}
                  x2={80}
                  y2={610}
                  stroke="#94a3b8"
                  strokeWidth="3"
                />

                {/* labels */}
                <text
                  x="470"
                  y="645"
                  fill="#64748b"
                  fontWeight="700"
                  fontSize="20"
                >
                  Height
                </text>

                <text
                  x="15"
                  y="120"
                  fill="#64748b"
                  fontWeight="700"
                  fontSize="20"
                >
                  Weight
                </text>

                {/* points */}
                {[
                  [150, 500],
                  [220, 430],
                  [290, 360],
                  [360, 290],
                  [430, 220],
                ].map(([x, y], i) => (
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
                      delay: 2.2 + i * 0.2,
                    }}
                  />
                ))}

                {/* highlighted point */}
                <motion.circle
                  cx={290}
                  cy={360}
                  r={18}
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 3.2,
                  }}
                />

                <motion.text
                  x="330"
                  y="350"
                  fill="#7C3AED"
                  fontSize="22"
                  fontWeight="900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 3.5,
                  }}
                >
                  (180, 80)
                </motion.text>
              </svg>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 4,
                }}
                className="absolute bottom-5 left-5 right-5"
              >
                <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
                  <div className="text-2xl font-black text-slate-800">
                    Rows → Vectors → Points
                  </div>

                  <div className="text-slate-500 mt-2">
                    A dataset becomes a cloud in space.
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className="border-l border-slate-200 px-8 py-10 flex flex-col justify-center"
        style={{ flex: '0 0 22%' }}
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 4.2,
          }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-5">
            RECALL
          </p>

          <div className="space-y-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="text-lg font-black text-slate-800">
                Person
              </div>

              <div className="text-slate-500">
                becomes a point
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="text-lg font-black text-slate-800">
                Product
              </div>

              <div className="text-slate-500">
                becomes a point
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="text-lg font-black text-slate-800">
                Embedding
              </div>

              <div className="text-slate-500">
                becomes a point
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="font-black text-violet-700 text-lg">
                PCA sees geometry,
                not spreadsheets.
              </div>
            </div>

          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_2_DataAsPoints;