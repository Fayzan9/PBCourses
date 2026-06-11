import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene5_13_NegativeLambda: React.FC = () => (
  <QuestionSlide
    emoji="🪞"
    question="If λ = −2, what happens to the eigenvector?"
    hint="It gets 2× longer AND flips to the opposite direction. Like a mirror that also zooms in."
    subHint="In PCA, a negative eigenvalue would mean that feature combination anti-correlates with the direction of greatest spread. Usually we only keep positive eigenvalues."
  />
);
