import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene2_6_MagnitudeTrapQuestion: React.FC = () => (
  <QuestionSlide
    emoji="🤔"
    question="Two movies: same genre ratio (60% action, 40% comedy). One has 10 reviews, the other has 10,000."
    hint="Euclidean distance says they're far apart. But should they really be treated as different?"
    subHint="If two people both prefer action over comedy, do we care that one person has seen more movies?"
  />
);
