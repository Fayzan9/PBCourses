import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene3_2_HowToMeasure: React.FC = () => (
  <QuestionSlide
    emoji="🏹"
    question="If two arrows point in different directions, how would you measure how much they agree?"
    hint="Think geometrically. What if one arrow cast a shadow onto the other?"
    subHint="The length of that shadow would tell you exactly how much they point in the same direction."
  />
);
