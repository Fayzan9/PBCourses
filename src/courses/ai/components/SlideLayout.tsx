import React from 'react';
import { LAYOUT_CONFIG } from './layoutConfig';

export const SlideLayout: React.FC<{
  title: string;
  text: string;
  sidebarContent?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, text, sidebarContent, children }) => (
  <div className={LAYOUT_CONFIG.containerClass}>
    <div className={LAYOUT_CONFIG.leftSideClass}>
      {children}
    </div>
    <div className={LAYOUT_CONFIG.rightSideClass}>
      <div>
        <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">{title}</h2>
        <p className="text-slate-600 text-lg leading-relaxed">{text}</p>
      </div>
      {sidebarContent}
    </div>
  </div>
);
