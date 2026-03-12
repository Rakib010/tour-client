// Category-specific image mapping for the Categories page.
// Keys should match the tour type / division `name` coming from the backend.
// This avoids using the same image for different categories.
export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  // Tour types
  Adventure: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80",
  Food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
  "Luxury Escapes": "https://images.unsplash.com/photo-1501117716987-c8e1ecb2108a?w=900&q=80",

  // Divisions / locations
  Chittagong: "https://images.unsplash.com/photo-1579781492707-7073c3f58e88?w=900&q=80",
  Barisal: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&q=80",
};

