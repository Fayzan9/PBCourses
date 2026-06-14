// Scene06_ProjectionAndShadows.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_6_ProjectionAndShadows: React.FC = () => {
  const points = [
    [150, 420],
    [220, 370],
    [290, 320],
    [360, 270],
    [430, 220],
    [500, 170],
  ];

  const projections = [
    [180, 450],
    [250, 450],
    [320, 450],
    [390, 450],
    [460, 450],
    [530, 450],
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
            CHAPTER 7 • SCENE 6
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            Projection And
            <span className="text-violet-600"> Shadows</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            How do we measure variance along a direction?
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
          <div className="flex h-full">

            {/* VISUAL */}
            <div className="flex-1 border-r border-slate-200 flex flex-col">

              {/* GRAPH */}
              <div className="flex-1 relative">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 720 500"
                >
                  {/* original cloud */}
                  {points.map(([x, y], i) => (
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

                  {/* direction */}
                  <motion.line
                    x1={120}
                    y1={460}
                    x2={600}
                    y2={120}
                    stroke="#7C3AED"
                    strokeWidth="6"
                    strokeDasharray="10 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.2,
                    }}
                  />

                  {/* shadow lines */}
                  {points.map(([x, y], i) => (
                    <motion.line
                      key={`line-${i}`}
                      x1={x}
                      y1={y}
                      x2={projections[i][0]}
                      y2={projections[i][1]}
                      stroke="#CBD5E1"
                      strokeWidth="3"
                      strokeDasharray="8 6"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 1 + i * 0.1,
                      }}
                    />
                  ))}

                  {/* projected points */}
                  {projections.map(([x, y], i) => (
                    <motion.circle
                      key={`proj-${i}`}
                      cx={x}
                      cy={y}
                      r={8}
                      fill="#0F172A"
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay: 1.6 + i * 0.1,
                      }}
                    />
                  ))}

                  <motion.text
                    x="520"
                    y="100"
                    fill="#7C3AED"
                    fontWeight="900"
                    fontSize="24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Candidate Direction
                  </motion.text>

                  <motion.text
                    x="320"
                    y="485"
                    textAnchor="middle"
                    fill="#0F172A"
                    fontWeight="900"
                    fontSize="24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                  >
                    Measure the spread of these shadows
                  </motion.text>
                </svg>
              </div>

              {/* BOTTOM EXPLANATION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 }}
                className="border-t border-slate-200 bg-white p-5"
              >
                <div className="grid grid-cols-3 gap-4">

                  <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                    <div className="font-black text-slate-800">
                      Pick A Direction
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                    <div className="font-black text-slate-800">
                      Project Every Point
                    </div>
                  </div>

                  <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center">
                    <div className="font-black text-violet-700">
                      Measure Spread
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
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
          transition={{ delay: 3 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-5">
            RECALL
          </p>

          <div className="space-y-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="font-black text-slate-800">
                Chapter 3
              </div>

              <div className="text-slate-500 mt-1">
                Dot Product = Projection
              </div>
            </div>

            <div className="text-center text-4xl font-black text-slate-400">
              ↓
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="font-black text-violet-700">
                PCA Uses Projections
              </div>

              <div className="text-violet-500 mt-1">
                to measure variance
              </div>
            </div>

          </div>

          <div className="mt-8 text-slate-500 leading-relaxed">
            PCA asks:
            <br />
            <br />
            <span className="font-bold text-slate-800">
              If I shine the entire cloud onto a line,
              how spread out are the shadows?
            </span>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_6_ProjectionAndShadows;