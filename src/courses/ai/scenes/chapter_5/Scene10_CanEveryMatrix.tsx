import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene5_10_CanEveryMatrix: React.FC = () => (
  <QuestionSlide
    emoji="🌀"
    question="What if you rotate everything 90°? Is there ANY direction that stays pointing the same way?"
    hint="No — a 90° rotation spins every vector. There's no real direction that survives. But there are complex eigenvectors!"
    subHint="Symmetric matrices (like covariance matrices in AI) always have real eigenvectors. That's one big reason ML loves symmetric matrices."
  />
);
