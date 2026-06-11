import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene4_13_WhatIfStack: React.FC = () => (
  <QuestionSlide
    emoji="🧱"
    question="What if you scale space by 2, then rotate it 45°?"
    hint="Would the result be the same as rotating first, then scaling?"
    subHint="Try to picture it. The order might matter more than you think..."
  />
);
