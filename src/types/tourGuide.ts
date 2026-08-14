export type WhatToSeeItem = {
  title: string;
  description: string;
};

export type TourGuide = {
  id: string;
  slug: string;
  place: string;
  division: string;
  shortDescription: string;
  image: string;
  duration: string;
  bestTime: string;
  /** Realistic DIY budget per person in BDT */
  budgetFrom: number;
  budgetTo: number;
  difficulty: string;
  /** Intro paragraphs shown under the title */
  overview: string[];
  whatToSee: WhatToSeeItem[];
  /** Ordered travel steps — render as Step 1, Step 2, ... */
  howToGo: string[];
  whereToStay: string;
  whereToEat: string;
  foodToCarry: string[];
  tips: string[];
  safety: string;
};
