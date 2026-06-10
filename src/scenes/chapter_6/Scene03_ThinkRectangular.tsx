import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene6_3_ThinkRectangular: React.FC = () => (
  <QuestionSlide
    emoji="📊"
    question="Most real data isn't square. Did we just lose our best tool?"
    hint="User × Movie ratings: 10 million users × 50,000 movies. Images. Documents. Embedding tables. Almost everything in ML is rectangular."
    subHint="Eigenvectors only work for square matrices. But the entire world of data is non-square. We need something more general."
  />
);
