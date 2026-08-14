import tourGuidesData from "@/data/tourGuides.json";
import type { TourGuide } from "@/types/tourGuide";

export const tourGuides = tourGuidesData as TourGuide[];

export function getTourGuideBySlug(slug: string): TourGuide | undefined {
  return tourGuides.find((guide) => guide.slug === slug);
}

export function getRelatedTourGuides(slug: string, limit = 5): TourGuide[] {
  const current = getTourGuideBySlug(slug);
  if (!current) return tourGuides.slice(0, limit);

  const sameDivision = tourGuides.filter(
    (g) => g.slug !== slug && g.division === current.division
  );
  const others = tourGuides.filter(
    (g) => g.slug !== slug && g.division !== current.division
  );

  return [...sameDivision, ...others].slice(0, limit);
}

export function formatGuideBudget(guide: TourGuide): string {
  const from = guide.budgetFrom.toLocaleString("en-BD");
  const to = guide.budgetTo.toLocaleString("en-BD");
  return `৳${from} – ৳${to}`;
}
