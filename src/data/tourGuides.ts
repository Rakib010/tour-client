import tourGuidesData from "@/data/tourGuides.json";
import type { TourGuide } from "@/types/tourGuide";

export const tourGuides = tourGuidesData as TourGuide[];

export function getTourGuideBySlug(slug: string): TourGuide | undefined {
  return tourGuides.find((guide) => guide.slug === slug);
}
