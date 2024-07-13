// src/hooks/useImages.ts

import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";

interface ImageData {
  src: string;
  original: string;
  caption: string;
  title: string;
  date: string;
  popularity: number;
  tags: string[];
}

interface ResponseData {
  [year: string]: {
    [month: string]: string[];
  };
}

export const useImages = (folderPath: string) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("Fetching images from folder:", folderPath);

        // Fetch image paths using invoke
        const response: ResponseData = await invoke(
          "get_all_images_with_cache",
          {
            directory: folderPath,
          }
        );

        // Ensure response is in the expected format
        if (!response || typeof response !== "object") {
          console.error("Invalid response format:", response);
          setLoading(false);
          return;
        }

        const imageUrls: ImageData[] = [];

        // Iterate through each year in the response
        for (const year in response) {
          if (
            !response.hasOwnProperty(year) ||
            typeof response[year] !== "object"
          ) {
            continue;
          }

          // Iterate through each month in the current year
          for (const month in response[year]) {
            if (
              !response[year].hasOwnProperty(month) ||
              !Array.isArray(response[year][month])
            ) {
              continue;
            }

            const imagePaths = response[year][month];

            // Map image paths to imageUrls array
            const mappedImages = await Promise.all(
              imagePaths.map(async (imagePath: string) => {
                const src = await convertFileSrc(imagePath);

                // Extracting the date from the image path
                const filename = imagePath.split("\\").pop(); // Get the filename from the full path
                const matches = filename
                  ? filename.match(/\d{4}-\d{2}-\d{2}/)
                  : null; // Add null check for filename

                let date = null;
                if (matches) {
                  date = new Date(matches[0]).toISOString(); // Convert matched date string to ISO string
                } else {
                  date = new Date().toISOString(); // Default to today's date if no valid date found in filename
                }

                return {
                  src,
                  original: src,
                  caption: `Image ${imagePath}`,
                  title: `Video ${imagePath}`,
                  date,
                  popularity: 0,
                  tags: [],
                };
              })
            );

            // Push mapped images to imageUrls array
            imageUrls.push(...mappedImages);
          }
        }

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [folderPath]);

  return { images, loading };
};
