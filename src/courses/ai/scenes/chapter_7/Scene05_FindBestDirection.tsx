// Scene05_FindBestDirection.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_5_FindBestDirection: React.FC = () => {
  const points = [
    [140, 500],
    [210, 450],
    [280, 390],
    [350, 330],
    [420, 270],
    [490, 210],
    [560, 150],
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
            CHAPTER 7 • SCENE 5
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            Finding The
            <span className="text-violet-600"> Best Direction</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            If variance means information, which direction contains the most?
          </p>
        </div>

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

            {/* VISUAL */}
            <div className="flex-1 border-r border-slate-200 flex flex-col">

              {/* GRAPH AREA */}
              <div className="flex-1 relative">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 720 500"
                >
                  {/* axes */}
                  <line
                    x1={80}
                    y1={430}
                    x2={650}
                    y2={430}
                    stroke="#94a3b8"
                    strokeWidth="3"
                  />

                  <line
                    x1={80}
                    y1={70}
                    x2={80}
                    y2={430}
                    stroke="#94a3b8"
                    strokeWidth="3"
                  />

                  {/* points */}
                  {points.map(([x, y], i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y - 80}
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

                  {/* bad direction */}
                  <motion.line
                    x1={330}
                    y1={390}
                    x2={330}
                    y2={90}
                    stroke="#EF4444"
                    strokeWidth="5"
                    strokeDasharray="12 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 0.8,
                      duration: 1,
                    }}
                  />

                  {/* good direction */}
                  <motion.line
                    x1={120}
                    y1={360}
                    x2={610}
                    y2={90}
                    stroke="#7C3AED"
                    strokeWidth="6"
                    strokeDasharray="12 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 1.8,
                      duration: 1,
                    }}
                  />

                  <motion.text
                    x="360"
                    y="80"
                    textAnchor="middle"
                    fill="#EF4444"
                    fontWeight="900"
                    fontSize="22"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Small Spread
                  </motion.text>

                  <motion.text
                    x="560"
                    y="60"
                    textAnchor="middle"
                    fill="#7C3AED"
                    fontWeight="900"
                    fontSize="22"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8 }}
                  >
                    Large Spread
                  </motion.text>
                </svg>

              </div>

              {/* EXPLANATION STRIP */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5 }}
                className="border-t border-slate-200 bg-white px-6 py-5"
              >
                <div className="grid grid-cols-3 gap-4">

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <div className="font-black text-red-700">
                      Direction A
                    </div>

                    <div className="text-sm text-slate-600 mt-2">
                      Points look compressed
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-3xl font-black text-slate-400">
                      VS
                    </div>
                  </div>

                  <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center">
                    <div className="font-black text-violet-700">
                      Direction B
                    </div>

                    <div className="text-sm text-slate-600 mt-2">
                      Points spread far apart
                    </div>
                  </div>

                </div>

                <div className="mt-5 bg-slate-900 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-white">
                    PCA chooses the direction with maximum variance
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
          transition={{ delay: 4 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-5">
            PCA GOAL
          </p>

          <div className="space-y-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="font-black text-slate-800">
                Many possible directions
              </div>
            </div>

            <div className="text-center text-4xl font-black text-slate-400">
              ↓
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="font-black text-slate-800">
                Measure variance
              </div>
            </div>

            <div className="text-center text-4xl font-black text-slate-400">
              ↓
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="font-black text-violet-700">
                Keep the largest one
              </div>
            </div>

          </div>

          <div className="mt-8 text-slate-500 leading-relaxed">
            The winning direction becomes
            <span className="font-bold text-slate-800">
              {' '}Principal Component 1 (PC1)
            </span>.
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_5_FindBestDirection;