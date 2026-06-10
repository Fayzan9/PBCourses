import React from 'react';

export const SlideLayout: React.FC<{
  title: string;
  text: string;
  sidebarContent?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, text, sidebarContent, children }) => (
  <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
    <div className="flex-1 min-h-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
      {children}
    </div>
    <div className="w-full lg:w-[35%] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">{title}</h2>
        <p className="text-slate-600 text-lg leading-relaxed">{text}</p>
      </div>
      {sidebarContent}
    </div>
  </div>
);
