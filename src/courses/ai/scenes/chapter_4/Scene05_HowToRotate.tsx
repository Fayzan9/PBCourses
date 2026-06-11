import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene4_5_HowToRotate: React.FC = () => (
  <QuestionSlide
    emoji="🔄"
    question="Scaling just multiplied both coordinates by the same number. How do you think rotation would work?"
    hint="You'd need to sweep each point in a circle around the center, without changing how far it is from the origin."
    subHint="Hint: to create circular motion, the new x and new y both need to use a mix of the old x and old y."
  />
);
