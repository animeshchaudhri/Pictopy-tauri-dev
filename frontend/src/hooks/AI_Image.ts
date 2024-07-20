import { useState, useEffect } from "react";
import { convertFileSrc } from "@tauri-apps/api/core";

interface Image {
  title: string;
  src: string;
  tags: string[];
}

interface APIResponse {
  data: {
    [key: string]: string[];
  };
}

const useAIImage = (folderPath: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/images/all-image-objects"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allImageObjects: APIResponse = await response.json();

        const parsedAndSortedImages = parseAndSortImageData(
          allImageObjects.data
        );
        setImages(parsedAndSortedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folderPath]);

  const parseAndSortImageData = (data: APIResponse["data"]): Image[] => {
    const parsedImages: Image[] = Object.entries(data).map(([src, tags]) => {
      const srcc = convertFileSrc(src);
      return {
        title: src.substring(src.lastIndexOf("\\") + 1),

        src: srcc,
        tags: tags,
      };
    });

    return parsedImages;
  };

  return { images, loading };
};

export default useAIImage;
