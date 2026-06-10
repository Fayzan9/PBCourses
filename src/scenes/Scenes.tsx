import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Film, Music, Sparkles, Smartphone, Laptop, 
  Camera, Headphones, Brain
} from 'lucide-react';
import { Math } from '../components/Math';
import { VisualizationSpace, type VisualPoint } from '../components/VisualizationSpace';
import { PixelGrid } from '../components/PixelGrid';
import { GalaxyPlot } from '../components/GalaxyPlot';

// ==========================================
// SCENE 1: Curiosity Question
// ==========================================
export const Scene1_Curiosity: React.FC = () => {
  const items = [
    { text: 'A movie.', color: 'text-transformations' },
    { text: 'A song.', color: 'text-similarity' },
    { text: 'A person.', color: 'text-vector' },
    { text: 'A sentence.', color: 'text-probability' }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] px-4 text-center max-w-4xl mx-auto">
      <div className="flex flex-col gap-5 md:gap-7 mb-10">
        {items.map((item, idx) => (
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.4, duration: 0.8, ease: "easeOut" }}
            className={`text-4xl md:text-6xl font-extrabold tracking-tight ${item.color}`}
          >
            {item.text}
          </motion.h1>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="mt-6 border-t border-slate-200 pt-8"
      >
        <p className="text-xl md:text-2xl font-bold text-slate-500 tracking-wide">
          What do they have in common?
        </p>
      </motion.div>
    </div>
  );
};

// ==========================================
// SCENE 2: Person Representation
// ==========================================
export const Scene2_PersonRep: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1800);
    const t2 = setTimeout(() => setStep(2), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      {/* Left Column: Visual Silhouette (Scaled Up) */}
      <div className="relative flex items-center justify-center w-80 h-[420px] bg-white border border-slate-200 rounded-2xl p-8 shadow-md">
        <svg viewBox="0 0 100 150" className="w-full h-full text-slate-400">
          <circle cx="50" cy="30" r="16" fill="currentColor" className="text-vector opacity-40" />
          <path d="M50 48 C35 48 30 75 30 110 L42 110 L45 145 L55 145 L58 110 L70 110 C70 75 65 48 50 48 Z" fill="currentColor" className="text-vector opacity-30" />
          
          {step >= 1 && (
            <g>
              {/* Height Callout */}
              <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="12" y1="14" x2="12" y2="146" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
              <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} x="18" y="80" fill="#0284C7" fontSize="8.5" className="font-bold rotate-90 origin-left">Height: 180cm</motion.text>
              
              {/* Weight Callout */}
              <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="30" y1="90" x2="70" y2="90" stroke="#7C3AED" strokeWidth="2" />
              <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} x="50" y="84" textAnchor="middle" fill="#7C3AED" fontSize="8.5" className="font-bold">Weight: 75kg</motion.text>
              
              {/* Age Callout */}
              <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} x="50" y="32" textAnchor="middle" fill="#D97706" fontSize="9.5" className="font-extrabold">Age: 25</motion.text>
            </g>
          )}
        </svg>
      </div>

      {/* Right Column: Descriptions & Morphing */}
      <div className="flex flex-col justify-center max-w-md text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Can a person become numbers?</h2>
        
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          By taking measurements like height, weight, and age, we capture their essential features.
        </p>

        <div className="h-24 flex items-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-400 font-mono text-base">
                Scanning attributes...
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-1 font-mono text-sm font-semibold text-slate-600">
                <div>Height: <span className="text-vector">180 cm</span></div>
                <div>Weight: <span className="text-transformations">75 kg</span></div>
                <div>Age: <span className="text-similarity">25 years</span></div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Vector representation</span>
                <div className="bg-slate-100 px-6 py-4 rounded-xl border border-slate-200 text-3xl font-mono text-center font-bold text-vector glow-vector">
                  [180, 75, 25]
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 3: People Become Points
// ==========================================
export const Scene3_PeoplePoints: React.FC = () => {
  const points: VisualPoint[] = [
    { id: '1', label: 'Alex', coords: [180, 75], color: '#0284C7', details: 'Alex: Tall, average weight' },
    { id: '2', label: 'Bianca', coords: [160, 50], color: '#7C3AED', details: 'Bianca: Shorter, lighter' },
    { id: '3', label: 'Charlie', coords: [175, 90], color: '#D97706', details: 'Charlie: Tall, heavier' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Height (cm)', 'Weight (kg)']}
          ranges={[[140, 200], [40, 100]]}
          showGrid
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">People Become Locations</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Plotted on axes, people become coordinates in space. 
        </p>
        <div className="border-l-4 border-vector pl-4 text-sm text-slate-500 font-medium leading-relaxed italic py-1 bg-slate-100/50 rounded-r">
          Similar people naturally cluster close to each other.
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 4: Movie Space
// ==========================================
export const Scene4_MovieSpace: React.FC = () => {
  const [action, setAction] = useState(70);
  const [comedy, setComedy] = useState(30);

  const points: VisualPoint[] = [
    { id: 'matrix', label: 'The Matrix', coords: [90, 10], color: '#E11D48', details: 'High Action, Very Low Comedy', icon: <Film size={12} /> },
    { id: 'superbad', label: 'Superbad', coords: [10, 95], color: '#0284C7', details: 'Zero Action, Maximum Comedy', icon: <Film size={12} /> },
    { id: 'toystory', label: 'Toy Story', coords: [40, 75], color: '#D97706', details: 'Balanced Action and High Comedy', icon: <Film size={12} /> },
    { id: 'yourmovie', label: 'Your Custom Movie', coords: [action, comedy], color: '#059669', details: 'Adjust sliders to move this point!', icon: <Sparkles size={12} /> }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Action Score', 'Comedy Score']}
          ranges={[[0, 100], [0, 100]]}
          showVectors
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Movie Space</h2>
          <p className="text-slate-600 text-sm">
            Drag the sliders to see your custom movie travel dynamically through coordinate space.
          </p>
        </div>

        {/* Sliders Container */}
        <div className="flex flex-col gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Action Score</span>
              <span className="text-loss">{action}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={action}
              onChange={(e) => setAction(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-loss"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Comedy Score</span>
              <span className="text-vector">{comedy}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={comedy}
              onChange={(e) => setComedy(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 5: Music Space
// ==========================================
export const Scene5_MusicSpace: React.FC = () => {
  const points: VisualPoint[] = [
    { id: 'daft', label: 'Daft Punk - One More Time', coords: [90, 15], color: '#7C3AED', details: 'Dance Club Anthem', icon: <Music size={12} /> },
    { id: 'avicii', label: 'Avicii - Levels', coords: [95, 10], color: '#7C3AED', details: 'High-energy electronic synthesizer chords', icon: <Music size={12} /> },
    { id: 'sheeran', label: 'Ed Sheeran - Thinking Out Loud', coords: [20, 85], color: '#059669', details: 'Slow acoustic guitar ballad', icon: <Music size={12} /> },
    { id: 'adele', label: 'Adele - Someone Like You', coords: [15, 90], color: '#059669', details: 'Chill acoustic piano track', icon: <Music size={12} /> },
    { id: 'billie', label: 'Billie Eilish - Bad Guy', coords: [50, 45], color: '#D97706', details: 'Subtle bass, moderate energy pop', icon: <Music size={12} /> }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Energy', 'Acousticness']}
          ranges={[[0, 100], [0, 100]]}
          highlightConnections
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Music Clustering</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Hover over the points. Notice how similar songs naturally group together in coordinate space.
        </p>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
          💡 This is how recommendation systems propose similar music.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 6: Product Space
// ==========================================
export const Scene6_ProductSpace: React.FC = () => {
  const points: VisualPoint[] = [
    { id: 'phone', label: 'Smartphone', coords: [8, 7.5], color: '#0284C7', details: 'Portable, lightweight, high daily usage', icon: <Smartphone size={12} /> },
    { id: 'laptop', label: 'Laptop', coords: [15, 9.5], color: '#7C3AED', details: 'Workhorse computer, moderate weight, top performance', icon: <Laptop size={12} /> },
    { id: 'camera', label: 'Pro Camera', coords: [18, 8.0], color: '#E11D48', details: 'Dedicated optics device', icon: <Camera size={12} /> },
    { id: 'headphones', label: 'Headphones', coords: [3, 6.0], color: '#D97706', details: 'Compact personal audio device', icon: <Headphones size={12} /> }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Price ($ x100)', 'Performance Score']}
          ranges={[[0, 25], [0, 12]]}
          showGrid
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Product Space</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          By scoring items on attributes like Price and Performance, e-commerce engines recommend alternates based on geometric proximity.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 7: Image Space
// ==========================================
export const Scene7_ImageSpace: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <PixelGrid />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Images are Points</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          An image is a grid of numbers representing pixel colors.
        </p>
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-mono leading-relaxed font-semibold">
          Flattening this grid maps the entire image to a single point in a higher-dimensional space.
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 8: Language Space
// ==========================================
export const Scene8_LanguageSpace: React.FC = () => {
  const points: VisualPoint[] = [
    { id: 'cat', label: 'Cat', coords: [2.5, 8.0], color: '#0284C7', details: 'Feline companion' },
    { id: 'dog', label: 'Dog', coords: [3.0, 7.8], color: '#0284C7', details: 'Canine companion' },
    { id: 'tiger', label: 'Tiger', coords: [2.2, 9.2], color: '#0284C7', details: 'Large wild feline' },
    { id: 'car', label: 'Car', coords: [8.5, 2.5], color: '#E11D48', details: '4-wheeled commuter vehicle' },
    { id: 'truck', label: 'Truck', coords: [9.0, 2.2], color: '#E11D48', details: 'Heavy cargo transporter' },
    { id: 'bus', label: 'Bus', coords: [8.2, 3.2], color: '#E11D48', details: 'Mass passenger transit' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Semantic Dimension A', 'Semantic Dimension B']}
          ranges={[[0, 12], [0, 12]]}
          showGrid
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Language Space</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Words with similar meanings reside close together.
        </p>
        <p className="text-slate-500 text-sm font-medium">
          Notice the animal cluster grouped on the top-left and the vehicle cluster grouped on the bottom-right.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 9: Semantic Galaxy
// ==========================================
export const Scene9_SemanticGalaxy: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 max-w-6xl mx-auto gap-5 text-center">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">The Semantic Galaxy</h2>
        <p className="text-slate-500 text-sm font-semibold">
          An immersive playground mapping hundreds of words. Click or search to explore.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <GalaxyPlot />
      </div>
    </div>
  );
};

// ==========================================
// SCENE 10: ChatGPT Reveal
// ==========================================
export const Scene10_ChatGPTReveal: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: '1. User Input', desc: 'Translating input prompt into coordinates.', code: '"cute kitten"' },
    { label: '2. Location Mapping', desc: 'Placing the query vector in semantics space.', code: '[0.23, 0.81, 0.44]' },
    { label: '3. Proximity Scan', desc: 'Locating nearby words: "meow", "purr", "whiskers".', code: 'Finding Neighbors...' },
    { label: '4. Decoded Output', desc: 'Assembling neighboring concepts into a reply.', code: '"Kitten purrs..."' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      {/* Visual representation of chat pipeline */}
      <div className="w-full max-w-[500px] bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-md">
        <div className="absolute top-2.5 right-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1 font-bold">
          <Brain size={11} className="text-vector" /> AI Inference Engine
        </div>

        <div className="flex flex-col gap-5 mt-4">
          {steps.map((s, idx) => {
            const isActive = step === idx;
            return (
              <motion.div
                key={idx}
                animate={{ 
                  scale: isActive ? 1.02 : 0.98,
                  borderColor: isActive ? 'rgba(2, 132, 199, 0.3)' : 'rgba(15, 23, 42, 0.05)',
                  backgroundColor: isActive ? 'rgba(241, 245, 249, 0.8)' : 'rgba(255, 255, 255, 0.2)'
                }}
                className="border p-3.5 rounded-xl flex items-center justify-between transition-all gap-4 shadow-sm"
              >
                <div className="text-left">
                  <h4 className={`text-xs font-extrabold ${isActive ? 'text-vector' : 'text-slate-400'}`}>{s.label}</h4>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed font-medium">{s.desc}</p>
                </div>
                <div className="font-mono text-[10px] text-similarity shrink-0 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 max-w-[150px] truncate font-bold">
                  {s.code}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">How LLMs Think</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          ChatGPT converts prompt phrases to locations, scans neighboring semantic concepts, and decodes them back to sentences.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 11: Unification
// ==========================================
export const Scene11_Unification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'person' | 'movie' | 'song' | 'image' | 'sentence'>('person');

  const tabs = [
    { id: 'person', label: 'Person', icon: <User size={14} />, coords: '[180, 75, 25]', desc: 'Height, Weight, Age measurements' },
    { id: 'movie', label: 'Movie', icon: <Film size={14} />, coords: '[90, 10, 60]', desc: 'Action, Comedy, Romance scores' },
    { id: 'song', label: 'Song', icon: <Music size={14} />, coords: '[95, 10, 85]', desc: 'Energy, Danceability, Acousticness' },
    { id: 'image', label: 'Image', icon: <Smartphone size={14} />, coords: '[0.1, 0.9, 0.2, ...]', desc: 'Flattened raw grid of pixel intensities' },
    { id: 'sentence', label: 'Sentence', icon: <Sparkles size={14} />, coords: '[0.81, -0.4, 0.52, ...]', desc: 'Calculated semantics embeddings' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((curr) => {
        const idx = tabs.findIndex((t) => t.id === curr);
        return tabs[(idx + 1) % tabs.length].id as any;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      {/* Left panel showing current active conversion */}
      <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-2xl p-8 flex flex-col gap-6 relative min-h-[300px] justify-center items-center shadow-md">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => {
            if (tab.id !== activeTab) return null;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center gap-4 w-full"
              >
                <div className="p-4 bg-slate-50 rounded-full text-vector glow-vector border border-slate-200">
                  {tab.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 capitalize">{tab.label}</h3>
                <p className="text-slate-500 text-xs max-w-xs font-semibold">{tab.desc}</p>
                <div className="text-center font-mono text-[#7C3AED] bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-xl font-extrabold shadow-inner">
                  {tab.coords}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">The Great Unification</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Images, audio, words, and objects all translate into numbers.
        </p>
        <p className="text-vector text-lg md:text-xl font-extrabold leading-relaxed">
          AI speaks a single language: coordinates in space.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 12: Mathematical Reveal
// ==========================================
export const Scene12_MathReveal: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] px-4 max-w-4xl mx-auto text-center gap-8">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest font-bold">Formal Definition</span>
        <h2 className="text-4xl font-extrabold text-slate-800">Meet the Vector</h2>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-lg w-full flex flex-col gap-5">
        <Math tex="\vec{v} = [v_1, v_2, v_3, \dots, v_n]" block />
        
        <p className="text-slate-600 text-sm font-semibold">
          In math, this ordered list of coordinates is called a Vector.
        </p>
        
        <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-100 pt-4 font-mono text-left font-medium">
          A vector is simply the geometric address of a point in space.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 13: Interactive Playground
// ==========================================
type VectorType = 'person' | 'movie' | 'song' | 'product' | 'protein';

export const Scene13_InteractivePlayground: React.FC = () => {
  const [selectedType, setSelectedType] = useState<VectorType>('person');
  
  // Custom slider coordinate values
  const [coordA, setCoordA] = useState(50);
  const [coordB, setCoordB] = useState(50);

  // Schema configs
  const configurations = {
    person: {
      title: 'Person Vector',
      dimLabels: ['Height (cm)', 'Weight (kg)'],
      dimRanges: [[100, 200], [30, 120]] as [number, number][],
      desc: 'Mapping physical features as space locations.',
      coordsMap: (a: number, b: number) => [
        100 + (a / 100) * 100,
        30 + (b / 100) * 90
      ]
    },
    movie: {
      title: 'Movie Vector',
      dimLabels: ['Action Rating', 'Romance Rating'],
      dimRanges: [[0, 100], [0, 100]] as [number, number][],
      desc: 'Plotting cinematic genres.',
      coordsMap: (a: number, b: number) => [a, b]
    },
    song: {
      title: 'Song Vector',
      dimLabels: ['Danceability', 'Acousticness'],
      dimRanges: [[0, 100], [0, 100]] as [number, number][],
      desc: 'Identifying musical traits for recommendation.',
      coordsMap: (a: number, b: number) => [a, b]
    },
    product: {
      title: 'Product Vector',
      dimLabels: ['Price ($)', 'Weight (g)'],
      dimRanges: [[0, 2000], [0, 2500]] as [number, number][],
      desc: 'Classifying hardware components.',
      coordsMap: (a: number, b: number) => [
        (a / 100) * 2000,
        (b / 100) * 2500
      ]
    },
    protein: {
      title: 'Protein Vector',
      dimLabels: ['Charge (pH)', 'Hydrophobicity'],
      dimRanges: [[-10, 10], [0, 1]] as [number, number][],
      desc: 'Mapping cellular biology into ML structures.',
      coordsMap: (a: number, b: number) => [
        -10 + (a / 100) * 20,
        (b / 100)
      ]
    }
  };

  const config = configurations[selectedType];
  const mappedCoords = config.coordsMap(coordA, coordB);

  // Generate visual point
  const currentPoints: VisualPoint[] = [
    {
      id: 'custom-playground-point',
      label: `Vector Location`,
      coords: mappedCoords,
      color: '#0284C7',
      details: `${config.title} point`
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[70vh] max-w-6xl mx-auto px-6 w-full">
      {/* Visualization Grid Panel */}
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={currentPoints}
          dimensions={config.dimLabels}
          ranges={config.dimRanges}
          showVectors
        />
      </div>

      {/* Control Panel */}
      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Vector Playground</h2>
          <p className="text-slate-500 text-sm font-semibold">
            Select a type and adjust the sliders to map properties to coordinates.
          </p>
        </div>

        {/* Tab selection grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {(Object.keys(configurations) as VectorType[]).map((type) => (
            <button
              key={type}
              onClick={() => { setSelectedType(type); setCoordA(50); setCoordB(50); }}
              className={`px-2 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedType === type 
                  ? 'bg-vector text-white shadow font-extrabold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Sliders */}
        <div className="flex flex-col gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>{config.dimLabels[0]}</span>
              <span className="text-vector font-bold">
                {mappedCoords[0].toFixed(selectedType === 'protein' ? 2 : 0)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={coordA}
              onChange={(e) => setCoordA(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>{config.dimLabels[1]}</span>
              <span className="text-transformations font-bold">
                {mappedCoords[1].toFixed(selectedType === 'protein' ? 2 : 0)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={coordB}
              onChange={(e) => setCoordB(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-transformations"
            />
          </div>
        </div>

        {/* Display Current Vector notation */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-center shadow-inner">
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-0.5 font-bold">Stored Vector Address</span>
          <span className="text-lg font-extrabold text-vector glow-vector">
            [{mappedCoords[0].toFixed(selectedType === 'protein' ? 2 : 0)}, {mappedCoords[1].toFixed(selectedType === 'protein' ? 2 : 0)}]
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 14: Final Mental Model
// ==========================================
export const Scene14_FinalModel: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center max-w-3xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-vector/5 filter blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex flex-col gap-6 z-10 animate-fade-in"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-vector font-extrabold">Intuition Mastered</span>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-800 mb-1 leading-tight">
          Everything can become a point.
        </h1>

        <div className="w-20 h-1.5 bg-gradient-to-r from-vector to-transformations mx-auto rounded-full my-1 shadow-sm" />

        <p className="text-slate-600 text-xl md:text-2xl font-bold leading-relaxed max-w-xl mx-auto">
          Once things become points, machines can compare, search, and learn from them.
        </p>

        <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed border-t border-slate-200 pt-6 font-medium">
          This single geometric insight forms the foundation of all modern AI.
        </p>
      </motion.div>
    </div>
  );
};
