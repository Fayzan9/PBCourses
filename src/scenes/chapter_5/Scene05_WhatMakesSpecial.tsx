import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene5_5_WhatMakesSpecial: React.FC = () => (
  <QuestionSlide
    emoji="🔭"
    question="If applying a matrix to a vector only stretches it (not rotates it), what does that tell us about those two things?"
    hint="The matrix and the vector are somehow 'aligned'. The transformation doesn't surprise the vector — it just makes it bigger or smaller."
    subHint="We call the scale factor the eigenvalue. Big λ = strong stretch. Small λ = squish. Negative λ = flip and scale."
  />
);
