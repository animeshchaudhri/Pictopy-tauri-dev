// imageUtils.ts
import { Image } from "@/types/image";

export function sortImages(images: Image[], sortBy: "date" | "year"): Image[] {
  // Create a copy of the images array to avoid mutating the original array
  return images.slice().sort((a, b) => {
    if (sortBy === "date") {
      // Sort by date in descending order
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "year") {
      // Sort by year in descending order
      return new Date(b.date).getFullYear() - new Date(a.date).getFullYear();
    } else {
      // Default to sorting by date if sortBy is not recognized
      console.warn(
        `Invalid sortBy option: ${sortBy}. Defaulting to sorting by date.`
      );
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
}
