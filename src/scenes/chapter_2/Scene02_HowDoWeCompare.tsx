import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene2_2_HowDoWeCompare: React.FC = () => (
  <QuestionSlide
    emoji="🗺️"
    question="If everything in AI is a point in space, how does the AI find things that are similar?"
    hint="Think about how you'd find a nearby location on a map. You measure the distance."
    subHint="But what if the 'map' has hundreds of dimensions? We need a formula."
  />
);
