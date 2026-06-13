import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, ShieldAlert, HeartPulse } from 'lucide-react';

export const Scene4c_HighDimSpace: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<'athlete' | 'developer' | 'gamer'>('athlete');

  const personVectors = {
    athlete: {
      name: 'Sarah (Athlete)',
      desc: 'Active Runner & Triathlete',
      color: 'from-sky-400 to-blue-600',
      shadow: 'shadow-blue-500/20',
      icon: <Activity className="text-blue-500" size={18} />,
      features: [
        { label: 'Height (cm)', val: 172 },
        { label: 'Weight (kg)', val: 63 },
        { label: 'Age (yrs)', val: 28 },
        { label: 'Rest Heart Rate (bpm)', val: 48 },
        { label: 'Daily Sleep (hrs)', val: 8.5 },
        { label: 'Running Pace (min/km)', val: 4.8 },
        { label: 'Hydration (L/day)', val: 3.5 },
        { label: 'Caloric Intake (kcal)', val: 2600 },
        { label: 'Screen Time (hrs)', val: 2.1 },
        { label: 'Max VO2 (ml/kg/min)', val: 54 },
        { label: 'Stress Index (%)', val: 22 },
        { label: 'Active Hours (hrs)', val: 3.5 }
      ]
    },
    developer: {
      name: 'David (Developer)',
      desc: 'Software Engineer & Reader',
      color: 'from-violet-400 to-indigo-600',
      shadow: 'shadow-indigo-500/20',
      icon: <User className="text-indigo-500" size={18} />,
      features: [
        { label: 'Height (cm)', val: 185 },
        { label: 'Weight (kg)', val: 82 },
        { label: 'Age (yrs)', val: 34 },
        { label: 'Rest Heart Rate (bpm)', val: 68 },
        { label: 'Daily Sleep (hrs)', val: 6.8 },
        { label: 'Running Pace (min/km)', val: 6.5 },
        { label: 'Hydration (L/day)', val: 1.8 },
        { label: 'Caloric Intake (kcal)', val: 2100 },
        { label: 'Screen Time (hrs)', val: 9.5 },
        { label: 'Max VO2 (ml/kg/min)', val: 41 },
        { label: 'Stress Index (%)', val: 65 },
        { label: 'Active Hours (hrs)', val: 1.0 }
      ]
    },
    gamer: {
      name: 'Grace (Gamer)',
      desc: 'Competitive Esports Player',
      color: 'from-emerald-400 to-teal-600',
      shadow: 'shadow-emerald-500/20',
      icon: <HeartPulse className="text-emerald-500" size={18} />,
      features: [
        { label: 'Height (cm)', val: 160 },
        { label: 'Weight (kg)', val: 54 },
        { label: 'Age (yrs)', val: 21 },
        { label: 'Rest Heart Rate (bpm)', val: 72 },
        { label: 'Daily Sleep (hrs)', val: 7.2 },
        { label: 'Running Pace (min/km)', val: 8.0 },
        { label: 'Hydration (L/day)', val: 2.2 },
        { label: 'Caloric Intake (kcal)', val: 1950 },
        { label: 'Screen Time (hrs)', val: 11.2 },
        { label: 'Max VO2 (ml/kg/min)', val: 37 },
        { label: 'Stress Index (%)', val: 58 },
        { label: 'Active Hours (hrs)', val: 0.5 }
      ]
    }
  };

  const person = personVectors[selectedPerson];

  // Helper to normalize values for visual representation (0-100%)
  const normalize = (label: string, val: number) => {
    if (label.includes('Height')) return ((val - 140) / 60) * 100;
    if (label.includes('Weight')) return ((val - 30) / 90) * 100;
    if (label.includes('Age')) return (val / 100) * 100;
    if (label.includes('Heart Rate')) return ((val - 40) / 60) * 100;
    if (label.includes('Sleep')) return (val / 12) * 100;
    if (label.includes('Pace')) return (12 - val) * 10; // lower pace is better
    if (label.includes('Hydration')) return (val / 5) * 100;
    if (label.includes('Caloric')) return (val / 4000) * 100;
    if (label.includes('Screen Time')) return (val / 15) * 100;
    if (label.includes('VO2')) return (val / 70) * 100;
    if (label.includes('Stress')) return val;
    if (label.includes('Active Hours')) return (val / 6) * 100;
    return val;
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      {/* 12-Dimensional Visual Card */}
      <div className="flex-[65] min-h-0 min-w-0 bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 shadow-xl flex flex-col gap-6 overflow-hidden transition-all duration-300">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl bg-gradient-to-tr ${person.color} text-white shadow-lg ${person.shadow} transition-all duration-500`}>
              {person.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-xl tracking-tight transition-all duration-300">{person.name}</h3>
              <span className="text-xs text-slate-400 font-bold tracking-wide uppercase">{person.desc}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-mono">12-Dimensional Feature Vector</span>
            <div className="font-mono text-[11px] bg-slate-800 text-slate-100 border border-slate-700 px-3.5 py-2 rounded-xl font-bold max-w-full sm:max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap shadow-inner">
              [{person.features.map(f => f.val).join(', ')}]
            </div>
          </div>
        </div>

        {/* Feature Signature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto flex-1 pr-1 py-1 animate-fadeIn">
          {person.features.map((feat, idx) => {
            const pct = Math.max(8, Math.min(100, normalize(feat.label, feat.val)));
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="bg-white/80 border border-slate-100 rounded-2xl p-3 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200/80 transition-all duration-200"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate w-full" title={feat.label}>
                    {feat.label.split(' (')[0]}
                  </span>
                  <span className="text-base font-extrabold text-slate-700 font-mono">
                    {feat.val}
                  </span>
                </div>

                {/* Progress Visualizer */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                    className={`h-full rounded-full bg-gradient-to-r ${person.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Description & Selection */}
      <div className="flex-[35] flex flex-col justify-start gap-5 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1.5">
            <ShieldAlert size={12} /> Moving Beyond 3D
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-none mb-3">Hyper-Dimensions</h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-semibold">
            While we cannot visualize a <span className="font-extrabold text-slate-800">12D coordinate system</span> on a flat screen, AI sees no difference. 
          </p>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            By collecting more biometric and behavioral metrics, we build a highly unique <span className="font-semibold text-slate-700">profile signature</span>. Every person becomes a single point in a 12-dimensional universe.
          </p>
        </div>

        {/* Selection Tabs */}
        <div className="flex flex-col gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200/50 backdrop-blur">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider px-2 pt-1">Compare Profiles</span>
          {(Object.keys(personVectors) as Array<keyof typeof personVectors>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedPerson(key)}
              className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex justify-between items-center ${
                selectedPerson === key
                  ? 'bg-white text-slate-800 shadow-md border border-slate-200/60 font-black scale-[1.02]'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              <span className="flex items-center gap-2">
                {personVectors[key].icon}
                {personVectors[key].name}
              </span>
              <span className="text-[10px] opacity-60 font-mono font-bold bg-slate-200/60 px-2 py-0.5 rounded-md">12-D Point</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
