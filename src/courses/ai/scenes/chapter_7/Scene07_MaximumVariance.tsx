// Scene07_MaximumVariance.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_7_MaximumVariance: React.FC = () => {
  const projectedA = [285, 300, 315, 330, 345, 360];
  const projectedB = [120, 190, 260, 330, 400, 470];

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
            CHAPTER 7 • SCENE 7
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            The
            <span className="text-violet-600"> Variance Contest</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            Compare the spread of shadows and find the winner.
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

            {/* DIRECTION A */}
            <div className="border-r border-slate-200 flex flex-col">

              <div className="py-6 text-center">
                <h3 className="text-2xl font-black text-red-600">
                  Direction A
                </h3>

                <p className="text-slate-500 mt-2">
                  Shadows stay close together
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 480 420"
                >
                  {/* line */}
                  <line
                    x1={80}
                    y1={210}
                    x2={400}
                    y2={210}
                    stroke="#94A3B8"
                    strokeWidth="4"
                  />

                  {projectedA.map((x, i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={210}
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
                        delay: i * 0.1,
                      }}
                    />
                  ))}

                  <motion.line
                    x1={285}
                    y1={140}
                    x2={360}
                    y2={140}
                    stroke="#EF4444"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 0.8,
                    }}
                  />

                  <motion.text
                    x="323"
                    y="110"
                    textAnchor="middle"
                    fill="#EF4444"
                    fontWeight="900"
                    fontSize="26"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Small Spread
                  </motion.text>
                </svg>

              </div>

              <div className="p-5">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <div className="font-black text-red-700">
                    Low Variance
                  </div>
                </div>
              </div>

            </div>

            {/* DIRECTION B */}
            <div className="flex flex-col">

              <div className="py-6 text-center">
                <h3 className="text-2xl font-black text-violet-700">
                  Direction B
                </h3>

                <p className="text-slate-500 mt-2">
                  Shadows spread far apart
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 480 420"
                >
                  {/* line */}
                  <line
                    x1={80}
                    y1={210}
                    x2={400}
                    y2={210}
                    stroke="#94A3B8"
                    strokeWidth="4"
                  />

                  {projectedB.map((x, i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={210}
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
                        delay: 1 + i * 0.1,
                      }}
                    />
                  ))}

                  <motion.line
                    x1={120}
                    y1={140}
                    x2={470}
                    y2={140}
                    stroke="#7C3AED"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 1.8,
                    }}
                  />

                  <motion.text
                    x="295"
                    y="110"
                    textAnchor="middle"
                    fill="#7C3AED"
                    fontWeight="900"
                    fontSize="26"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                  >
                    Large Spread
                  </motion.text>
                </svg>

              </div>

              <div className="p-5">
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center">
                  <div className="font-black text-violet-700">
                    High Variance
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* WINNER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
          className="mt-4 w-[980px] max-w-full"
        >
          <div className="bg-slate-900 rounded-2xl p-5 text-center">
            <div className="text-3xl font-black text-white">
              PCA chooses Direction B
            </div>

            <div className="text-slate-300 mt-2">
              because it captures the maximum variance.
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
          transition={{ delay: 3.2 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-5">
            BIG IDEA
          </p>

          <div className="space-y-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="font-black text-slate-800">
                Pick a direction
              </div>
            </div>

            <div className="text-center text-4xl text-slate-400 font-black">
              ↓
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="font-black text-slate-800">
                Project all points
              </div>
            </div>

            <div className="text-center text-4xl text-slate-400 font-black">
              ↓
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="font-black text-violet-700">
                Measure variance
              </div>
            </div>

            <div className="text-center text-4xl text-slate-400 font-black">
              ↓
            </div>

            <div className="bg-slate-900 rounded-2xl p-5">
              <div className="font-black text-white">
                Keep the largest
              </div>
            </div>

          </div>

          <div className="mt-8 text-slate-500 leading-relaxed">
            We now have a precise goal:
            <br />
            <br />
            <span className="font-bold text-slate-800">
              Find the direction whose projections have maximum variance.
            </span>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_7_MaximumVariance;