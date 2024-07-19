// imageUtils.ts

import { MediaItem } from "@/types/Media";

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
