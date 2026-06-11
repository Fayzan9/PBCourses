import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene2_11_WhenToUseWhich: React.FC = () => (
  <QuestionSlide
    emoji="⚖️"
    question="Euclidean measures how far apart. Cosine measures how similar in direction. When would you choose one over the other?"
    hint="If a bigger number simply means 'more of the same thing', does size matter? Or only the ratio?"
    subHint="Document length, review count, purchase volume — these might not reflect quality. Cosine handles that by normalizing."
  />
);
