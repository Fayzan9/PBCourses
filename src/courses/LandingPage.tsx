import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Cpu, ArrowRight, BookOpen } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  badge: string;
  chaptersInfo: string;
  accentClass: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  badge,
  chaptersInfo,
  accentClass,
  icon,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(15, 23, 42, 0.15)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className="flex flex-col justify-between h-full p-8 bg-white border border-slate-100 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_20px_rgba(0,0,0,0.015)] cursor-pointer group transition-all"
    >
      <div className="flex flex-col gap-6">
        {/* Top brand accent / Icon */}
        <div className="flex justify-between items-start">
          <div className={`p-2.5 rounded-xl border border-slate-100 bg-slate-50 transition-colors duration-300 group-hover:bg-slate-900 group-hover:text-white ${accentClass}`}>
            {icon}
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
            {badge}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight leading-snug group-hover:text-slate-900 transition-colors">
            {title}
          </h3>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            {chaptersInfo}
          </span>
          <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
            {description}
          </p>
        </div>
      </div>

      {/* Button CTA */}
      <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-600 group-hover:text-slate-900 transition-colors flex items-center gap-1.5">
          Start Course
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </div>
    </motion.div>
  );
};

interface LandingPageProps {
  onSelectCourse: (course: 'ai' | 'python' | 'javascript' | 'marathi') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectCourse }) => {
  return (
    <div className="w-full h-screen overflow-y-auto bg-[#FAFAFA] text-[#0F172A] relative font-sans space-grid-pattern-fine py-12 px-6 sm:px-12 flex flex-col justify-between">
      {/* Brand Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between mb-16 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <img src="/channel_icon.png" alt="Productive Bros" className="w-8 h-8 rounded-lg shadow-sm border border-slate-200 bg-white" />
          <span className="font-extrabold text-xs tracking-wider uppercase text-slate-600 font-mono">Productive Bros</span>
        </div>
        <div className="h-[1px] flex-1 bg-slate-200/50 mx-6 hidden sm:block" />
        <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest hidden sm:inline">
          Interactive Curriculum
        </span>
      </header>

      {/* Hero Container */}
      <main className="w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center gap-12 z-10 my-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800 leading-tight">
              Visual & Interactive <br />
              <span className="text-indigo-600 font-medium font-serif italic">Learning Pathways</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-lg">
              Explore programming languages, algorithmic mechanics, and neural networks through live sandboxes, real-time spatial transformations, and animated diagrams.
            </p>
          </div>
          <div className="flex-1 max-w-xl w-full relative shrink-0 lg:max-w-2xl">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <img 
              src="/course_hero.png" 
              alt="Course Hero Illustration" 
              className="w-full relative z-10 object-contain max-h-[460px]" 
            />
          </div>
        </div>

        {/* Card Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          <CourseCard
            title="AI & Neural Networks Intuition"
            description="Explore high-dimensional vector spaces, projections, matrices, and neural networks through interactive visual sandboxes."
            badge="Interactive Math"
            chaptersInfo="6 Chapters • Visual Sandbox"
            accentClass="text-sky-600 group-hover:border-sky-500/20"
            icon={<Cpu size={20} />}
            onClick={() => onSelectCourse('ai')}
          />

          <CourseCard
            title="Python Programming Essentials"
            description="Master variables, dynamic typing, and memory mechanics through interactive code playgrounds."
            badge="Python Foundations"
            chaptersInfo="1 Chapter • Interactive Console"
            accentClass="text-amber-600 group-hover:border-amber-500/20"
            icon={<Terminal size={20} />}
            onClick={() => onSelectCourse('python')}
          />

          <CourseCard
            title="Modern JavaScript Deep Dive"
            description="Visualize scope chains, closures, prototype mechanics, and asynchronous event loops in real time."
            badge="JavaScript Mastery"
            chaptersInfo="1 Chapter • Visualizer"
            accentClass="text-yellow-600 group-hover:border-yellow-500/20"
            icon={<Code2 size={20} />}
            onClick={() => onSelectCourse('javascript')}
          />

          <CourseCard
            title="Marathi Fundamentals"
            description="Learn Marathi from scratch — Devanagari script, grammar, vocabulary, and cultural immersion, from beginner to advanced."
            badge="Language Learning"
            chaptersInfo="1 Chapter • Script & Sounds"
            accentClass="text-orange-600 group-hover:border-orange-500/20"
            icon={<BookOpen size={20} />}
            onClick={() => onSelectCourse('marathi')}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto mt-16 pt-6 border-t border-slate-200/30 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <img src="/channel_icon.png" alt="Productive Bros" className="w-4 h-4 rounded grayscale opacity-55" />
          <span className="text-[10px] text-slate-400 font-mono font-bold">Productive Bros Interactive Hub v1.0</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400">
          Designed for visual developer intuition
        </span>
      </footer>
    </div>
  );
};
