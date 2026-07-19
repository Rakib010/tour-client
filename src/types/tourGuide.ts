export type TourGuideItineraryDay = {
  day: string;
  title: string;
  activities: string[];
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
  budget: string;
  difficulty: string;
  howToGo: string[];
  whereToStay: string[];
  itinerary: TourGuideItineraryDay[];
  attractions: string[];
  food: string[];
  tips: string[];
  transport: string;
  safety: string;
};
