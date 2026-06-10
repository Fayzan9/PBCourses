import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene4_18_StackLinearQuestion: React.FC = () => (
  <QuestionSlide
    emoji="📏"
    question="If you stack 100 matrix layers one after another, what do you get?"
    hint="Each layer is a linear stretch, rotate, or shear. But what does combining 100 of them equal?"
    subHint="Spoiler: Stacking linear transforms is still just one linear transformation. Stacking straight lines always gives a straight line."
  />
);
