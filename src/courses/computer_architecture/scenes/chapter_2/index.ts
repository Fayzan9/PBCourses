import type { Chapter } from '../../../CourseViewer';

import { Scene01_WhatIsInformation } from './Scene01_WhatIsInformation';
import { Scene02_WhatIsData } from './Scene02_WhatIsData';
import { Scene03_HowTextIsRepresented } from './Scene03_HowTextIsRepresented';
import { Scene04_HowImagesAreRepresented } from './Scene04_HowImagesAreRepresented';
import { Scene05_HowAudioIsRepresented } from './Scene05_HowAudioIsRepresented';
import { Scene06_HowVideoIsRepresented } from './Scene06_HowVideoIsRepresented';
import { Scene07_EverythingIsNumbers } from './Scene07_EverythingIsNumbers';

export const chapter2: Chapter = {
  id: 2,
  title: 'Information And Data',
  subtitle: 'Chapter 2: How Computers Represent The World',
  scenes: [
    {
      component: Scene01_WhatIsInformation,
      title: 'What Is Information?'
    },
    {
      component: Scene02_WhatIsData,
      title: 'What Is Data?'
    },
    {
      component: Scene03_HowTextIsRepresented,
      title: 'How Text Is Represented'
    },
    {
      component: Scene04_HowImagesAreRepresented,
      title: 'How Images Are Represented'
    },
    {
      component: Scene05_HowAudioIsRepresented,
      title: 'How Audio Is Represented'
    },
    {
      component: Scene06_HowVideoIsRepresented,
      title: 'How Video Is Represented'
    },
    {
      component: Scene07_EverythingIsNumbers,
      title: 'Everything Is Numbers'
    }
  ]
};

export default chapter2;
