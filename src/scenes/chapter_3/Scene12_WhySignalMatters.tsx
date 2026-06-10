import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene3_12_WhySignalMatters: React.FC = () => (
  <QuestionSlide
    emoji="📡"
    question="Two movies both score 60% action. One has 10 reviews, the other has 10,000. Should they rank the same?"
    hint="The direction (genre ratio) is the same. But the magnitude (number of reviews, confidence) is very different."
    subHint="The dot product naturally rewards both — direction AND strength. Cosine similarity only cares about direction."
  />
);
