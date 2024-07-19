// imageUtils.ts
import { Image } from "@/types/image";

export function sortImages(images: Image[], sortBy: string): Image[] {
  return images.slice().sort((a, b) => {
    if (sortBy === "date") {
      // Sort by date in descending order
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy.startsWith("year-")) {
      const year = sortBy.split("-")[1];
      const aYear = new Date(a.date).getFullYear().toString();
      const bYear = new Date(b.date).getFullYear().toString();

      if (aYear === bYear && aYear === year) {
        // If both images are from the selected year, sort by date
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (aYear === year) {
        return -1; // a comes first
      } else if (bYear === year) {
        return 1; // b comes first
      } else {
        // If neither image is from the selected year, maintain their relative order
        return 0;
      }
    } else {
      // Default to sorting by date if sortBy is not recognized
      console.warn(
        `Invalid sortBy option: ${sortBy}. Defaulting to sorting by date.`
      );
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
}

export interface MediaItem {
  src: string;
  date: string;
  title?: string;
}

export function sortMedia(
  mediaItems: MediaItem[],
  sortBy: string
): MediaItem[] {
  console.log(`Sorting ${mediaItems.length} items by: ${sortBy}`);

  return [...mediaItems].sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    if (sortBy === "date") {
      // Sort by date in descending order
      return 0;
    } else if (sortBy.startsWith("year-")) {
      const year = parseInt(sortBy.split("-")[1]);
      const aYear = aDate.getFullYear();
      const bYear = bDate.getFullYear();

      if (aYear === year && bYear !== year) return -1;
      if (bYear === year && aYear !== year) return 1;
      if (aYear === bYear) {
        // If both are from the same year, sort by date
        return bDate.getTime() - aDate.getTime();
      }
      // If neither or both are from the selected year, maintain original order
      return 0;
    } else {
      console.warn(
        `Invalid sortBy option: ${sortBy}. Defaulting to date sorting.`
      );
      return bDate.getTime() - aDate.getTime();
    }
  });
}
