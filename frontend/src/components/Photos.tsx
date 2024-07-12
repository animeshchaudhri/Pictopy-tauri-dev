import React, { useEffect, useState } from "react";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";

import Gallerynav from "./Navbar/Gallerynav";

const Photos: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const localPath = localStorage.getItem("folderPath");
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const localPath = localStorage.getItem("folderPath");
        console.log("Fetching images from folder:", localPath);
        const imagePaths: string[] = await invoke("get_all_images_with_cache", {
          directory: localPath,
        });

        const imageUrls = await Promise.all(
          imagePaths.map(async (imagePath) => {
            const src = await convertFileSrc(imagePath);
            return {
              src,
              original: src,
              // width: 420,
              // height: 212,
              caption: `Image ${imagePath}`,
              title: `Video ${imagePath}`,
              date: new Date().toISOString(),
              popularity: 0,
            };
          })
        );

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDeleteCache = async () => {
    try {
      const result = await invoke("delete_cache");
      if (result) {
        setImages([]);
      }
    } catch (error) {
      console.error("Error deleting cache:", error);
    }
  };

  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <div>
      <Gallerynav images={images} title={localPath} />
      <button onClick={handleDeleteCache}>Delete Cache</button>
    </div>
  );
};

export default Photos;
