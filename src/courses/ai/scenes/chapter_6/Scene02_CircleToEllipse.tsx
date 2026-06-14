import React from 'react';
import { motion } from 'framer-motion';

const W = 920;
const H = 680;
const CX = W / 2;
const CY = H / 2;
const R = 170;

export const Scene6_2_CircleToEllipse: React.FC = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* LEFT */}
      <div
        className="flex flex-col items-center justify-center gap-4 px-4"
        style={{ flex: '0 0 75%' }}
      >
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            Chapter 6 · Scene 2
          </p>

          <h2 className="text-3xl font-black text-slate-800 mt-1">
            A transformation turns a
            <span className="text-sky-600"> circle into an ellipse</span>
          </h2>

          <p className="text-base text-slate-500 mt-2 font-medium">
            Every point on the circle represents a unit direction.
          </p>
        </div>

        <div
          className="relative rounded-3xl overflow-hidden flex-shrink-0"
          style={{
            width: W,
            height: H,
            maxWidth: '100%',
            background:
              'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          }}
        >
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>

            {/* Grid */}
            {[...Array(13)].map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 76}
                y1={0}
                x2={i * 76}
                y2={H}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            ))}

            {[...Array(10)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * 76}
                x2={W}
                y2={i * 76}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            <line
              x1={0}
              y1={CY}
              x2={W}
              y2={CY}
              stroke="#94a3b8"
              strokeWidth="2"
            />

            <line
              x1={CX}
              y1={0}
              x2={CX}
              y2={H}
              stroke="#94a3b8"
              strokeWidth="2"
            />

            {/* Original Circle */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke="#64748b"
              strokeWidth="5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Ellipse */}
            <motion.ellipse
              cx={CX}
              cy={CY}
              rx={300}
              ry={150}
              fill="none"
              stroke="#10B981"
              strokeWidth="6"
              initial={{
                rx: R,
                ry: R,
                opacity: 0.3,
              }}
              animate={{
                rx: 300,
                ry: 150,
                opacity: 1,
              }}
              transition={{
                duration: 2,
                delay: 1,
                ease: 'easeInOut',
              }}
            />

            {/* Major Axis */}
            <motion.line
              x1={CX - 300}
              y1={CY}
              x2={CX + 300}
              y2={CY}
              stroke="#10B981"
              strokeWidth="4"
              strokeDasharray="8 5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 2.3 }}
            />

            {/* Minor Axis */}
            <motion.line
              x1={CX}
              y1={CY - 150}
              x2={CX}
              y2={CY + 150}
              stroke="#8B5CF6"
              strokeWidth="4"
              strokeDasharray="8 5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 2.7 }}
            />

            {/* Labels */}
            <motion.text
              x={CX + 320}
              y={CY - 10}
              fill="#10B981"
              fontSize="24"
              fontWeight="900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              Longest Axis
            </motion.text>

            <motion.text
              x={CX + 20}
              y={CY - 175}
              fill="#8B5CF6"
              fontSize="24"
              fontWeight="900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.3 }}
            >
              Shortest Axis
            </motion.text>

            {/* Circle Label */}
            <motion.text
              x={CX - 120}
              y={CY + 220}
              fill="#64748b"
              fontSize="22"
              fontWeight="800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Unit Circle
            </motion.text>

            {/* Ellipse Label */}
            <motion.text
              x={CX + 130}
              y={CY + 220}
              fill="#10B981"
              fontSize="22"
              fontWeight="900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
            >
              Transformed Ellipse
            </motion.text>

            {/* Center */}
            <circle
              cx={CX}
              cy={CY}
              r={7}
              fill="#0f172a"
            />
          </svg>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="flex flex-col justify-center gap-6 pr-6"
        style={{ flex: '0 0 25%' }}
      >

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
            Start Here
          </p>

          <p className="text-base text-slate-700 leading-relaxed">
            Every unit vector lives somewhere on the circle.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-3">
            After Applying A
          </p>

          <p className="text-base text-emerald-800 leading-relaxed">
            Different directions get stretched by different amounts.
          </p>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <p className="text-xs font-black text-violet-600 uppercase tracking-wider mb-3">
            The Key Observation
          </p>

          <p className="text-lg font-black text-violet-900 leading-snug">
            Some directions matter more than others.
          </p>

          <p className="text-base text-violet-700 mt-3 leading-relaxed">
            SVD is the tool that finds them.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Scene6_2_CircleToEllipse;