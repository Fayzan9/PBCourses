// Scene03_PointCloudProblem.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_3_PointCloudProblem: React.FC = () => {
  const points = [
    [140, 500],
    [220, 445],
    [290, 395],
    [370, 340],
    [450, 280],
    [520, 225],
    [600, 170],
  ];

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
            CHAPTER 7 • SCENE 3
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            The
            <span className="text-violet-600"> Point Cloud Problem</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            We can see structure. How do we measure it?
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

            {/* LARGE VISUAL */}
            <div className="flex-1 relative">

              <svg
                width="100%"
                height="100%"
                viewBox="0 0 760 680"
              >
                {/* AXES */}
                <line
                  x1={90}
                  y1={610}
                  x2={700}
                  y2={610}
                  stroke="#94a3b8"
                  strokeWidth="3"
                />

                <line
                  x1={90}
                  y1={70}
                  x2={90}
                  y2={610}
                  stroke="#94a3b8"
                  strokeWidth="3"
                />

                {/* ELLIPSE */}
                <motion.ellipse
                  cx="380"
                  cy="340"
                  rx="270"
                  ry="75"
                  fill="rgba(124,58,237,0.08)"
                  stroke="#A78BFA"
                  strokeWidth="5"
                  transform="rotate(-35 380 340)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 1,
                  }}
                />

                {/* POINTS */}
                {points.map(([x, y], i) => (
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

                {/* TEXT */}
                <motion.text
                  x="380"
                  y="130"
                  textAnchor="middle"
                  fill="#7C3AED"
                  fontWeight="900"
                  fontSize="34"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 1.8,
                  }}
                >
                  There is clearly structure here...
                </motion.text>
              </svg>

              {/* BOTTOM STRIP */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2.3,
                }}
                className="absolute bottom-5 left-5 right-5"
              >
                <div className="grid grid-cols-3 gap-4">

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                    <div className="text-green-600 font-black text-xl">
                      ✓
                    </div>
                    <div className="font-bold text-slate-700 mt-1">
                      Points form a shape
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                    <div className="text-green-600 font-black text-xl">
                      ✓
                    </div>
                    <div className="font-bold text-slate-700 mt-1">
                      Some directions look important
                    </div>
                  </div>

                  <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 text-center">
                    <div className="text-violet-600 font-black text-xl">
                      ?
                    </div>
                    <div className="font-black text-violet-700 mt-1">
                      Which direction matters most?
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>

      {/* RIGHT STORY PANEL */}
      <div
        className="border-l border-slate-200 px-8 py-10 flex flex-col justify-center"
        style={{ flex: '0 0 22%' }}
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.8 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-5">
            KEY TRANSITION
          </p>

          <div className="space-y-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="text-xl font-black text-slate-800">
                Matrix
              </div>

              <div className="text-slate-500 mt-1">
                Transformation
              </div>
            </div>

            <div className="text-center text-4xl text-slate-400 font-black">
              ↓
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="text-xl font-black text-violet-700">
                Dataset
              </div>

              <div className="text-violet-500 mt-1">
                Point Cloud
              </div>
            </div>

            <div className="text-center text-4xl text-slate-400 font-black">
              ↓
            </div>

            <div className="bg-slate-900 rounded-2xl p-5">
              <div className="text-lg font-black text-white leading-relaxed">
                Find the most important direction inside the data
              </div>
            </div>

          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_3_PointCloudProblem;