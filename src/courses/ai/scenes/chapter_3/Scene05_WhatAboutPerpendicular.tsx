import React from 'react';
import { QuestionSlide } from '../../components/QuestionSlide';

export const Scene3_5_WhatAboutPerpendicular: React.FC = () => (
  <QuestionSlide
    emoji="📐"
    question="If perfectly aligned arrows give a maximum positive dot product, what do you think perpendicular arrows give?"
    hint="They point in completely different directions — they share nothing in common."
    subHint="If they share zero direction, they should share... zero alignment."
  />
);
