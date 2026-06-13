import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene7_3_ThinkBias: React.FC = () => (
  <QuestionSlide
    emoji="⚓"
    question="A matrix stretches and rotates space, but the origin (0,0) never moves. Is that a problem?"
    hint="Imagine trying to separate two groups of data, but your dividing line is permanently forced to pass exactly through the dead center of the grid."
    subHint="Without a way to shift the origin, a neural network is anchored in place. It can only draw patterns radiating from the center. We need a mechanism to break this anchor."
  />
);