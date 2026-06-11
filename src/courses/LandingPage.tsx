import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Code2, Cpu, ArrowRight, GraduationCap } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  badge: string;
  chaptersInfo: string;
  gradient: string;
  glowColor: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  badge,
  chaptersInfo,
  gradient,
  glowColor,
  icon,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="relative flex flex-col justify-between h-full p-6 bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-100/50 cursor-pointer overflow-hidden group"
    >
      {/* Background glow on hover */}
      <div className={`absolute -right-16 -top-16 w-36 h-36 rounded-full filter blur-3xl opacity-0 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none ${glowColor}`} />

      <div className="flex flex-col gap-4">
        {/* Badge and Icon */}
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/5 text-slate-700 rounded-full border border-slate-900/5">
            {badge}
          </span>
          <div className={`p-3 rounded-2xl text-white ${gradient} shadow-lg`}>
            {icon}
          </div>
        </div>

        {/* Title & Desc */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-snug group-hover:text-slate-900 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-500 font-bold mt-1">
            {chaptersInfo}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-3">
            {description}
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-700 group-hover:text-slate-900 transition-colors flex items-center gap-1.5">
          Start Learning
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </motion.div>
  );
};

interface LandingPageProps {
  onSelectCourse: (course: 'ai' | 'python' | 'javascript') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectCourse }) => {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-[#0F172A] relative overflow-x-hidden font-sans space-grid-pattern py-16 px-6 sm:px-12 flex flex-col items-center justify-center">
      {/* Atmospheric dynamic glows */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-4xl text-center flex flex-col items-center gap-4 mb-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-sky-500/10 to-violet-500/10 text-sky-800 rounded-full border border-sky-500/10 text-xs font-extrabold shadow-sm"
        >
          <Sparkles size={14} className="text-sky-600" />
          <span>Next-Generation Interactive Courses</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 leading-tight"
        >
          Visual & Interactive <br />
          <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Learning Pathways
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-500 font-bold max-w-2xl"
        >
          Explore programming languages, algorithmic fundamentals, and artificial intelligence through live sandboxes, real-time spatial transformations, and animated visuals.
        </motion.p>
      </div>

      {/* Card Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10"
      >
        <CourseCard
          title="AI & Neural Networks Intuition"
          description="Build spatial models of high-dimensional vectors, projection math, matrix warping, eigenvectors, and SVD in real time."
          badge="Interactive Math"
          chaptersInfo="6 Chapters • Visual Sandboxes"
          gradient="bg-gradient-to-br from-sky-500 to-indigo-600"
          glowColor="bg-sky-500"
          icon={<Cpu size={24} />}
          onClick={() => onSelectCourse('ai')}
        />

        <CourseCard
          title="Python Foundations"
          description="Master clean coding syntax, dynamic types, memory reference mechanics, and data structures through responsive coding interfaces."
          badge="Code Playground"
          chaptersInfo="Intro Chapters • Runtime Console"
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
          glowColor="bg-amber-500"
          icon={<Terminal size={24} />}
          onClick={() => onSelectCourse('python')}
        />

        <CourseCard
          title="JavaScript Mastery"
          description="Deep-dive into engine architectures, variable scoping, closures, prototype chaining, and async callback loop visualization."
          badge="Engine Visualizer"
          chaptersInfo="Animated Engine • Closures & Scopes"
          gradient="bg-gradient-to-br from-yellow-500 to-amber-600"
          glowColor="bg-yellow-500"
          icon={<Code2 size={24} />}
          onClick={() => onSelectCourse('javascript')}
        />
      </motion.div>

      {/* Footer */}
      <div className="mt-20 text-xs text-slate-400 font-mono font-bold z-10 flex items-center gap-1">
        <GraduationCap size={16} />
        Interactive Learning Hub v1.0.0
      </div>
    </div>
  );
};
