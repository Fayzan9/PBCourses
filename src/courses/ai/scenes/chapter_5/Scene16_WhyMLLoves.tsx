import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene5_16_WhyMLLoves: React.FC = () => (
  <QuestionSlide
    emoji="🧠"
    question="A dataset has 1000 features. Why would you want to find its eigenvectors before training a model?"
    hint="Most features are correlated — they move together. Eigenvectors find the independent directions of variation. You can drop the small ones and keep only the big ones."
    subHint="This is dimensionality reduction. Instead of 1000 numbers per sample, maybe 20 eigenvector coordinates explain 95% of the data. Faster training, less overfitting."
  />
);
