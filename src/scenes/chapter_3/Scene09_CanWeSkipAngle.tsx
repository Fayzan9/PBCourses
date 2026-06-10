import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene3_9_CanWeSkipAngle: React.FC = () => (
  <QuestionSlide
    emoji="🔢"
    question="Computing the shadow requires knowing the angle. But what if you only have the coordinates?"
    hint="You have A = [3, 2] and B = [4, 1]. No angle. Is there a direct shortcut using just these numbers?"
    subHint="What if you just multiplied the matching coordinates and summed them up?"
  />
);
