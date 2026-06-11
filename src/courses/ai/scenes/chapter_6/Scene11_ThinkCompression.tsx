import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene6_11_ThinkCompression: React.FC = () => (
  <QuestionSlide
    emoji="🗜️"
    question="What if one direction stretches 100× but another stretches 0.01×?"
    hint="The tiny direction contributes almost nothing to the final result. What if we just… ignored it?"
    subHint="Students discover compression themselves: keep the big singular values, throw away the small ones. You lose almost nothing but gain enormous efficiency."
  />
);
