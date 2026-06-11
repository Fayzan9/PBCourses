import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene2_8_CosineIdea: React.FC = () => (
  <QuestionSlide
    emoji="📐"
    question="What if we stopped caring about the length of the arrows and only measured the angle between them?"
    hint="Two arrows pointing in the same direction would score 1.0 — perfectly similar. Perpendicular would score 0. Opposite would score −1."
    subHint="This is cosine similarity. It measures direction, not magnitude."
  />
);
