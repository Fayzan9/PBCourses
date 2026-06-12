import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene7_3_ThinkMountain: React.FC = () => (
  <QuestionSlide
    emoji="🧗"
    question="How do we measure 'wrongness' and navigate to correctness?"
    hint="To optimize, we need two things: (1) A way to measure how bad our current weights are—which we call Loss, and (2) A compass showing us which direction to move the weights to make things better."
    subHint="Just like the hiker on a mountain, we need to feel the slope and step downhill."
  />
);
