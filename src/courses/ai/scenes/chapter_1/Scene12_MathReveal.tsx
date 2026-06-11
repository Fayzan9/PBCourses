import React from 'react';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene12_MathReveal: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-2 px-4 max-w-4xl mx-auto text-center gap-8">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest font-bold">Formal Definition</span>
        <h2 className="text-4xl font-extrabold text-slate-800">Meet the Vector</h2>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-lg w-full flex flex-col gap-5">
        <KaTeXMath tex="\vec{v} = [v_1, v_2, v_3, \dots, v_n]" block />
        
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
