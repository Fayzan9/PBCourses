import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene7_8_ThinkStepSize: React.FC = () => (
  <QuestionSlide
    emoji="🏃"
    question="We know the direction. But how far should we step?"
    hint="If our steps are too small, it will take millions of calculations to reach the valley. But if our steps are too big, we might jump completely over the valley, landing even higher on the opposite side."
    subHint="This step-size factor is called the Learning Rate (η)."
  />
);
