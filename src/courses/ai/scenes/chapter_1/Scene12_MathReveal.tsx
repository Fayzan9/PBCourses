import React from 'react';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene12_MathReveal: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <div className="text-xs font-black uppercase tracking-[0.25em] text-violet-500 mb-4">
          The Missing Piece
        </div>

        <h2 className="text-5xl md:text-6xl font-black text-slate-800 leading-tight">
          All Those Lists Of Numbers
          <br />
          <span className="text-violet-500">
            Have A Name
          </span>
        </h2>

        <div className="mt-12 bg-white border border-slate-200 rounded-3xl px-10 py-8 shadow-lg">
          <KaTeXMath tex="\vec{v} = [v_1, v_2, v_3, \dots, v_n]" block />
        </div>

        <div className="mt-8 text-3xl font-black text-slate-800">
          It's called a vector.
        </div>

        <p className="mt-6 max-w-2xl text-lg text-slate-500 leading-relaxed">
          A vector is simply an ordered list of numbers.
          Every movie, image, word, song, or person can be represented as one.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            '[95,15,10,90,...]',
            '[234,181,92,...]',
            '[82,70,45,75,...]'
          ].map((item) => (
            <div
              key={item}
              className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 font-mono text-sm font-bold text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-10 text-slate-400 font-medium">
          A vector is the mathematical representation of a point in space.
        </div>
      </div>
    </div>
  );
};

export default Scene12_MathReveal;