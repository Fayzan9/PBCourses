// Scene09_MeanCenteringDemo.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const Scene7_9_MeanCenteringDemo: React.FC = () => {
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
            CHAPTER 7 • SCENE 9
          </p>

          <h2 className="text-4xl font-black text-slate-800 mt-1">
            Location vs
            <span className="text-violet-600"> Distribution</span>
          </h2>

          <p className="text-lg text-slate-500 mt-2 font-medium">
            Centering moves the cloud. It does not change the cloud.
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
          <div className="grid grid-cols-3 h-full">

            {/* LEFT */}
            <div className="border-r border-slate-200 flex flex-col">

              <div className="border-b border-slate-200 py-5 text-center">
                <div className="text-xl font-black text-slate-800">
                  Before Centering
                </div>

                <div className="text-slate-500 mt-1">
                  Same shape, far from origin
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 320 480"
                >
                  {/* axes */}
                  <line
                    x1={40}
                    y1={420}
                    x2={280}
                    y2={420}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  <line
                    x1={40}
                    y1={80}
                    x2={40}
                    y2={420}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  <text
                    x="55"
                    y="405"
                    fill="#64748B"
                    fontWeight="700"
                    fontSize="16"
                  >
                    Origin
                  </text>

                  {/* cloud */}
                  <motion.circle
                    cx={220}
                    cy={290}
                    r={11}
                    fill="#7C3AED"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />

                  <motion.circle
                    cx={270}
                    cy={240}
                    r={11}
                    fill="#7C3AED"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  />

                  <motion.circle
                    cx={170}
                    cy={340}
                    r={11}
                    fill="#7C3AED"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  />

                  {/* mean */}
                  <motion.circle
                    cx={220}
                    cy={290}
                    r={16}
                    fill="#F59E0B"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  />

                  <text
                    x="220"
                    y="255"
                    textAnchor="middle"
                    fill="#F59E0B"
                    fontWeight="900"
                    fontSize="20"
                  >
                    Mean
                  </text>
                </svg>

              </div>
            </div>

            {/* CENTER */}
            <div className="border-r border-slate-200 flex flex-col items-center justify-center">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <div className="text-7xl font-black text-violet-500">
                  ←
                </div>

                <div className="mt-6 text-3xl font-black text-violet-700">
                  Slide The Cloud
                </div>

                <div className="text-slate-500 mt-4 max-w-[220px]">
                  Subtract the mean from every point
                </div>

                <div className="mt-8 bg-violet-50 border border-violet-200 rounded-2xl px-8 py-5">
                  <div className="text-4xl font-black text-violet-700">
                    x → x − μ
                  </div>
                </div>

                <div className="mt-8 text-lg text-slate-500">
                  Distances stay identical
                </div>

                <div className="mt-2 text-lg text-slate-500">
                  Angles stay identical
                </div>

                <div className="mt-2 text-lg text-slate-500">
                  Variance stays identical
                </div>
              </motion.div>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col">

              <div className="border-b border-slate-200 py-5 text-center">
                <div className="text-xl font-black text-violet-700">
                  After Centering
                </div>

                <div className="text-slate-500 mt-1">
                  Same shape, mean at origin
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 320 480"
                >
                  {/* centered axes */}
                  <line
                    x1={40}
                    y1={260}
                    x2={280}
                    y2={260}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  <line
                    x1={160}
                    y1={80}
                    x2={160}
                    y2={420}
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />

                  {/* EXACT SAME TRIANGLE SHAPE */}
                  <motion.circle
                    cx={160}
                    cy={260}
                    r={11}
                    fill="#7C3AED"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />

                  <motion.circle
                    cx={210}
                    cy={210}
                    r={11}
                    fill="#7C3AED"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.15 }}
                  />

                  <motion.circle
                    cx={110}
                    cy={310}
                    r={11}
                    fill="#7C3AED"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  />

                  {/* mean */}
                  <motion.circle
                    cx={160}
                    cy={260}
                    r={16}
                    fill="#10B981"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 }}
                  />

                  <text
                    x="160"
                    y="225"
                    textAnchor="middle"
                    fill="#10B981"
                    fontWeight="900"
                    fontSize="20"
                  >
                    Mean = 0
                  </text>

                  <text
                    x="172"
                    y="285"
                    fill="#10B981"
                    fontWeight="700"
                    fontSize="18"
                  >
                    Origin
                  </text>
                </svg>

              </div>
            </div>

          </div>

          {/* REVEAL */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="border-t border-slate-200 bg-slate-900 p-6"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-white">
                Nothing about the shape changed.
              </div>

              <div className="text-xl text-slate-300 mt-2">
                The cloud simply slid until its mean reached the origin.
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
            PCA CARES ABOUT
          </p>

          <div className="space-y-5">

            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="font-black text-red-700 text-lg">
                ❌ Location
              </div>

              <div className="text-red-600 mt-2">
                Where the cloud sits
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <div className="font-black text-violet-700 text-lg">
                ✓ Distribution
              </div>

              <div className="text-violet-600 mt-2">
                Shape and spread
              </div>
            </div>

          </div>

          <div className="mt-8 text-slate-500 leading-relaxed">
            Centering guarantees PCA measures
            <span className="font-bold text-slate-800">
              {' '}variation
            </span>
            rather than
            <span className="font-bold text-slate-800">
              {' '}absolute position.
            </span>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_9_MeanCenteringDemo;