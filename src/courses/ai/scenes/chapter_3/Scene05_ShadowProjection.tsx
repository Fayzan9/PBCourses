import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { VectorCanvas } from '../../components/VectorCanvas';
import { fromAngle, proj2, dot2 } from '../../components/mathHelpers';

type Vec2 = [number, number];

export const Scene3_5_ShadowProjection: React.FC = () => {
  const [angleA, setAngleA] = useState(45);

  // User preferences
  const vecA = fromAngle(angleA, 4);

  // Recommendation profile
  const vecB: Vec2 = [3.5, 2.5];

  const shadow = proj2(vecA, vecB);

  const xAgreement = vecA[0] * vecB[0];
  const yAgreement = vecA[1] * vecB[1];
  const totalAgreement = dot2(vecA, vecB);

  const agreementStrength =
    totalAgreement > 12
      ? 'Strong'
      : totalAgreement > 6
      ? 'Good'
      : totalAgreement > 1
      ? 'Weak'
      : 'None';

  const xProjection: Vec2 = [vecA[0], 0];
  const yProjection: Vec2 = [0, vecA[1]];

  const bX: Vec2 = [vecB[0], 0];
  const bY: Vec2 = [0, vecB[1]];

  return (
    <SlideLayout
      title="Agreement Adds Up"
      text="The dot product is simply agreement on X plus agreement on Y."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-600">
                Rotate User Vector
              </span>

              <span className="text-lg font-black text-sky-600">
                {angleA}°
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="180"
              value={angleA}
              onChange={(e) => setAngleA(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider font-black text-sky-600 mb-1">
              X Agreement
            </div>

            <div className="text-3xl font-black text-sky-700">
              {xAgreement.toFixed(1)}
            </div>

            <div className="text-xs text-slate-500 mt-1">
              Action × Action
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider font-black text-violet-600 mb-1">
              Y Agreement
            </div>

            <div className="text-3xl font-black text-violet-700">
              {yAgreement.toFixed(1)}
            </div>

            <div className="text-xs text-slate-500 mt-1">
              Comedy × Comedy
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider font-black text-emerald-600 mb-1">
              Dot Product
            </div>

            <div className="text-4xl font-black text-emerald-700">
              {totalAgreement.toFixed(1)}
            </div>

            <div className="text-sm text-slate-600 mt-1">
              {agreementStrength} alignment
            </div>
          </div>
        </div>
      }
    >
      <div className="h-full flex flex-col gap-4">
        {/* TOP GRAPH */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-800">
                Total Agreement
              </h3>
              <p className="text-xs text-slate-500">
                Green projection = final dot product
              </p>
            </div>

            <div className="text-sm font-bold text-emerald-600">
              {totalAgreement.toFixed(1)}
            </div>
          </div>

          <div className="h-[330px]">
            <VectorCanvas
              vectors={[
                {
                  id: 'A',
                  vec: vecA,
                  color: '#E11D48',
                  marker: 'red',
                  label: 'User',
                  width: 4,
                },
                {
                  id: 'B',
                  vec: vecB,
                  color: '#0284C7',
                  marker: 'blue',
                  label: 'Recommendation',
                  width: 4,
                },
                {
                  id: 'Shadow',
                  vec: shadow,
                  color: '#059669',
                  marker: 'green',
                  label: 'Total Similarity',
                  width: 5,
                },
              ]}
              lines={[
                {
                  from: vecA,
                  to: shadow,
                  color: '#7C3AED',
                  dashed: true,
                  width: 2,
                },
              ]}
            />
          </div>
        </div>

        {/* X + Y BREAKDOWN */}
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {/* X GRAPH */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="text-sm font-black text-sky-700">
                X Agreement
              </div>

              <div className="text-xs text-slate-500 mt-1">
                Action preference overlap
              </div>
            </div>

            <div className="h-[310px]">
              <VectorCanvas
                vectors={[
                  {
                    id: 'AX',
                    vec: xProjection,
                    color: '#E11D48',
                    marker: 'red',
                    label: 'User X',
                    width: 4,
                  },
                  {
                    id: 'BX',
                    vec: bX,
                    color: '#0284C7',
                    marker: 'blue',
                    label: 'Rec X',
                    width: 4,
                  },
                ]}
              />
            </div>
          </div>

          {/* Y GRAPH */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="text-sm font-black text-violet-700">
                Y Agreement
              </div>

              <div className="text-xs text-slate-500 mt-1">
                Comedy preference overlap
              </div>
            </div>

            <div className="h-[310px]">
              <VectorCanvas
                vectors={[
                  {
                    id: 'AY',
                    vec: yProjection,
                    color: '#E11D48',
                    marker: 'red',
                    label: 'User Y',
                    width: 4,
                  },
                  {
                    id: 'BY',
                    vec: bY,
                    color: '#0284C7',
                    marker: 'blue',
                    label: 'Rec Y',
                    width: 4,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default Scene3_5_ShadowProjection;