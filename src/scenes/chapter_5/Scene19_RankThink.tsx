import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene5_19_RankThink: React.FC = () => (
  <QuestionSlide
    emoji="📊"
    question="A covariance matrix has eigenvalues: 120, 85, 3, 1, 0.2. You can only keep 2. Which do you keep and why?"
    hint="Keep λ=120 and λ=85. Together they explain (120+85)/(120+85+3+1+0.2) ≈ 97% of the total variance."
    subHint="This is exactly what sklearn's PCA does when you set n_components=2. It sorts eigenvalues and picks the top k."
  />
);
