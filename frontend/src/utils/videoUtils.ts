// File: utils/videoUtils.ts

import { Video } from "@/types/video";

export function sortVideos(Videos: Video[], sortBy: string): Video[] {
  return Videos.slice().sort((a, b) => {
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
