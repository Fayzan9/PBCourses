import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene5_2_RubberSheetThink: React.FC = () => (
  <QuestionSlide
    emoji="🪢"
    question="Imagine pulling a rubber sheet in one direction. What happens to the arrows drawn on it?"
    hint="Arrows pointing left/right get stretched along with the sheet. Arrows pointing up/down get squished."
    subHint="But there are always a few directions that just get longer or shorter — never tilted. Those are the eigenvectors."
  />
);
