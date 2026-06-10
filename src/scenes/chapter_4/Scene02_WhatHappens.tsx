import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene4_2_WhatHappens: React.FC = () => (
  <QuestionSlide
    emoji="🗺️"
    question="When you zoom into Google Maps, what happens to the coordinates?"
    hint="Every single point on the map gets pushed outward — further from where you tapped."
    subHint="The coordinates themselves change. That's a transformation: a rule that moves every point in space."
  />
);
