//src\hooks\AI_Image.ts
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

interface AddFolderResult {
  data: any | null;
  error: string | null;
  isLoading: boolean;
}

export function useAddFolder() {
  const [result, setResult] = useState<AddFolderResult>({
    data: null,
    error: null,
    isLoading: false,
  });

  const addFolder = async (folderPath: string): Promise<void> => {
    setResult({ data: null, error: null, isLoading: true });

    try {
      const response = await fetch("http://127.0.0.1:8000/images/add-folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder_path: folderPath }),
      });

      if (!response.ok) {
        throw new Error("Failed to add folder");
      }

      const data = await response.json();
      setResult({ data, error: null, isLoading: false });
    } catch (error) {
      setResult({
        data: null,
        error: (error as Error).message,
        isLoading: false,
      });
    }
  };

  return { addFolder, ...result };
}
