import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, ArrowRight, BookOpen, Sparkles, Binary, Layers } from 'lucide-react';

interface InteractiveConstellationProps {
  accentColor?: string;
}

const InteractiveConstellation: React.FC<InteractiveConstellationProps> = ({ accentColor = 'rgba(99, 102, 241, 0.3)' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const particleCount = Math.min(60, Math.floor((width * height) / 20000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid background (light mode)
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles (light mode)
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.05;
            ctx.strokeStyle = `rgba(15, 23, 42, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouseRef.current.active) {
          const mouseDist = Math.hypot(p.x - mouseRef.current.x, p.y - mouseRef.current.y);
          if (mouseDist < 160) {
            const alpha = (1 - mouseDist / 160) * 0.25;
            ctx.strokeStyle = accentColor.replace('0.3', alpha.toString());
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [accentColor]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />;
};

interface CourseCardProps {
  title: string;
  description: string;
  badge: string;
  chaptersInfo: string;
  glowColor: string;
  textColor: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  badge,
  chaptersInfo,
  glowColor,
  textColor,
  icon,
  onClick,
}) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="relative flex flex-col justify-between h-full p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200/80 hover:border-slate-300/80 cursor-pointer group transition-colors overflow-hidden"
      style={{
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
      }}
    >
      {/* Glow Hover background effect */}
      <div
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}10, transparent 80%)`,
        }}
      />

      {/* Decorative corner glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-2xl opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex justify-between items-start">
          <div 
            className="p-3 rounded-xl border border-slate-100 bg-slate-50 transition-all duration-300 group-hover:scale-110"
            style={{ color: textColor }}
          >
            {icon}
          </div>
          <span 
            className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border"
            style={{ 
              color: textColor,
              borderColor: `${textColor}30`,
              backgroundColor: `${textColor}08`
            }}
          >
            {badge}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-snug group-hover:text-slate-900 transition-colors">
            {title}
          </h3>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Layers size={10} style={{ color: textColor }} />
            {chaptersInfo}
          </span>
          <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
        <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors flex items-center gap-2">
          Start Exploring
          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" style={{ color: textColor }} />
        </span>
      </div>
    </motion.div>
  );
};

interface LandingPageProps {
  onSelectCourse: (course: 'ai' | 'python_pro' | 'marathi' | 'computer_architecture') => void;
}

type Category = 'all' | 'ai_systems' | 'programming' | 'languages';

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectCourse }) => {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const pageRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate tracking for card spot-glow effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.group');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const courses = [
    {
      id: 'ai',
      category: 'ai_systems',
      title: 'AI & Neural Networks Intuition',
      description: 'Explore high-dimensional vector spaces, projections, matrices, and neural networks through interactive visual sandboxes.',
      badge: 'Interactive Math',
      chaptersInfo: '6 Chapters • Visual Sandbox',
      glowColor: '#38bdf8', // sky-400
      textColor: '#0284c7', // sky-600
      icon: <Cpu size={20} />,
    },
    {
      id: 'python_pro',
      category: 'programming',
      title: 'Python Pro Curriculum',
      description: 'Go deep into computer architecture, memory maps, reference models, and implementation details.',
      badge: 'Advanced Python',
      chaptersInfo: '1 Chapter • Professional',
      glowColor: '#818cf8', // indigo-400
      textColor: '#6366f1', // indigo-600
      icon: <Terminal size={20} />,
    },
    {
      id: 'marathi',
      category: 'languages',
      title: 'Marathi Fundamentals',
      description: 'Learn Marathi from scratch — Devanagari script, grammar, vocabulary, and cultural immersion, from beginner to advanced.',
      badge: 'Language Learning',
      chaptersInfo: '1 Chapter • Script & Sounds',
      glowColor: '#fb923c', // orange-400
      textColor: '#f97316', // orange-600
      icon: <BookOpen size={20} />,
    },
    {
      id: 'computer_architecture',
      category: 'ai_systems',
      title: 'Computer Architecture Fundamentals',
      description: 'Learn how computer systems work, how programs run on CPU, memory hierarchy, and basic systems architecture.',
      badge: 'Computer Systems',
      chaptersInfo: '1 Chapter • Foundations',
      glowColor: '#22d3ee', // cyan-400
      textColor: '#06b6d4', // cyan-600
      icon: <Binary size={20} />,
    },
  ];

  const filteredCourses = activeTab === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  return (
    <div 
      ref={pageRef}
      className="w-full h-screen overflow-y-auto bg-[#F8FAFC] text-slate-900 relative font-sans py-12 px-6 sm:px-12 flex flex-col justify-between"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.06),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Interactive Background */}
      <div className="absolute inset-0 opacity-60 z-0 pointer-events-none">
        <InteractiveConstellation accentColor="rgba(99, 102, 241, 0.3)" />
      </div>

      {/* Brand Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between mb-16 z-10 shrink-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative p-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <img src="/channel_icon.png" alt="Productive Bros" className="w-8 h-8 rounded-lg" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse" />
          </div>
          <span className="font-extrabold text-xs tracking-wider uppercase text-slate-700 font-mono flex items-center gap-1.5">
            Productive Bros
          </span>
        </motion.div>
        <div className="h-[1px] flex-1 bg-slate-200/60 mx-6 hidden sm:block" />
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-[10px] font-mono font-extrabold text-indigo-600 bg-indigo-50/50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
            <Sparkles size={10} className="animate-spin-slow" />
            Interactive Core v2.0
          </span>
        </motion.div>
      </header>

      {/* Hero Container */}
      <main className="w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center gap-12 z-10 my-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-5 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Master Intuition. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  Interactive Learning.
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-lg"
            >
              Explore programming languages, algorithmic mechanics, and neural networks through live sandboxes, real-time spatial transformations, and animated diagrams.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-xl w-full relative shrink-0 lg:max-w-2xl hidden lg:block"
          >
            {/* Visualizer Art piece */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-white/40 border border-slate-200/80 backdrop-blur-md relative overflow-hidden flex items-center justify-center p-8 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-cyan-500/5" />
              <div className="w-48 h-48 rounded-full border border-indigo-500/10 absolute animate-[pulse_6s_infinite] flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-cyan-500/10 absolute animate-[pulse_4s_infinite] flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 blur-lg opacity-20" />
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center gap-3">
                <div className="p-4 rounded-full bg-white border border-slate-200 shadow-md group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase">Visual Sandbox Playground</span>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs">Drag nodes, run sandboxes, and inspect live memory maps dynamically.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-200/60 no-scrollbar">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'ai_systems', label: 'Systems & AI' },
              { id: 'programming', label: 'Programming' },
              { id: 'languages', label: 'Languages' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Category)}
                className={`relative px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id 
                    ? 'text-slate-900 bg-white border border-slate-200 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-indigo-500"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <CourseCard
                    title={course.title}
                    description={course.description}
                    badge={course.badge}
                    chaptersInfo={course.chaptersInfo}
                    glowColor={course.glowColor}
                    textColor={course.textColor}
                    icon={course.icon}
                    onClick={() => onSelectCourse(course.id as any)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto mt-16 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <img src="/channel_icon.png" alt="Productive Bros" className="w-4 h-4 rounded grayscale opacity-50" />
          <span className="text-[10px] text-slate-400 font-mono font-bold">Productive Bros Interactive Hub v2.0</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400">
          Designed for visual developer intuition
        </span>
      </footer>
    </div>
  );
};
