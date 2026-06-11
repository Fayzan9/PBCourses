import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene5_7_WhatIsLambda: React.FC = () => (
  <QuestionSlide
    emoji="🔢"
    question="You found that v = [1, 0] is an eigenvector with λ = 3. What does that mean visually, numerically, and physically?"
    hint="Visually: the arrow just gets 3× longer, never tilts. Numerically: M·v = 3·v = [3,0]. The whole matrix collapsed to one multiplication."
    subHint="Now think: what if λ = −1? The vector flips direction but stays the same length — like a mirror. What if λ = 0? The vector shrinks to the origin — that direction is destroyed forever."
  />
);
