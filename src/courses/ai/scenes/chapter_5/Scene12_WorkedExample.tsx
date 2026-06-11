import React, { useState } from 'react';
import { type Mat2 } from '../../components/mathHelpers';
import { Math as KaTeXMath } from '../../components/Math';
import { SlideLayout } from '../../components/SlideLayout';
import { EigenGrid, useAnimatedMatrix } from '../../components/TransformGrid';

export const Scene5_12_WorkedExample: React.FC = () => {
  const [reveal, setReveal] = useState(0);
  const M: Mat2 = [[4, 1], [2, 3]];

  const steps = [
    {
      title: 'The matrix M',
      content: <KaTeXMath tex="M = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}" />,
    },
    {
      title: 'Characteristic equation',
      content: <KaTeXMath tex="\det(M - \lambda I) = (4-\lambda)(3-\lambda) - (1)(2) = 0" />,
    },
    {
      title: 'Expand',
      content: <KaTeXMath tex="\lambda^2 - 7\lambda + 10 = 0" />,
    },
    {
      title: 'Factor',
      content: <KaTeXMath tex="(\lambda - 5)(\lambda - 2) = 0" />,
    },
    {
      title: 'Eigenvalues',
      content: (
        <div className="flex gap-4">
          <span className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-mono font-black text-xl">λ₁ = 5</span>
          <span className="px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl font-mono font-black text-xl">λ₂ = 2</span>
        </div>
      ),
    },
    {
      title: 'Eigenvector for λ₁ = 5: solve (M − 5I)v = 0',
      content: (
        <div className="flex flex-col gap-2">
          <KaTeXMath tex="\begin{pmatrix} -1 & 1 \\ 2 & -2 \end{pmatrix} \mathbf{v} = 0" />
          <div className="text-emerald-700 font-bold font-mono text-lg">→ v₁ = [1, 1]</div>
        </div>
      ),
    },
    {
      title: 'Eigenvector for λ₂ = 2: solve (M − 2I)v = 0',
      content: (
        <div className="flex flex-col gap-2">
          <KaTeXMath tex="\begin{pmatrix} 2 & 1 \\ 2 & 1 \end{pmatrix} \mathbf{v} = 0" />
          <div className="text-amber-700 font-bold font-mono text-lg">→ v₂ = [1, −2]</div>
        </div>
      ),
    },
  ];

  const animated = useAnimatedMatrix(M);

  return (
    <SlideLayout
      title="Worked Example"
      text="Let's find eigenvectors for a concrete matrix. Click through each step, then verify on the grid."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                i <= reveal ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-50 border-slate-100 text-slate-300'
              }`}
            >
              <div className="font-bold mb-1 text-slate-500">{i + 1}. {s.title}</div>
              {i <= reveal && <div className="text-sm">{s.content}</div>}
            </div>
          ))}
          <div className="flex gap-2 mt-1">
            {reveal < steps.length - 1 && (
              <button onClick={() => setReveal(r => r + 1)} className="flex-1 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all cursor-pointer active:scale-95">
                Reveal →
              </button>
            )}
            {reveal > 0 && (
              <button onClick={() => setReveal(0)} className="px-3 py-2 bg-slate-100 text-slate-500 rounded-xl font-bold text-xs cursor-pointer">
                Reset
              </button>
            )}
          </div>
        </div>
      }
    >
      <EigenGrid
        M={animated}
        showEigen={reveal >= 4}
        highlightVecs={reveal >= 5 ? [{ vec: [1, 1], color: '#10B981', marker: 'emerald', label: 'v₁=[1,1]' }] : []}
      />
    </SlideLayout>
  );
};
