import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene6_7_ThinkSecondBest: React.FC = () => (
  <QuestionSlide
    emoji="🥈"
    question="We found the strongest direction. What's the second strongest?"
    hint="It must be independent of the first one. You can't just use the same direction twice — that gives you no new information."
    subHint="Keep going and you get a complete set of directions the matrix understands best. Those are the singular vectors."
  />
);
