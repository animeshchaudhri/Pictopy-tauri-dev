import React, { useEffect, useState } from "react";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import ImageGalleryxd from "./gallery/Imagegal";
import { Gallery } from "react-grid-gallery";
import Gallerynav from "./Navbar/Gallerynav";

const Photos: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;

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

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(images.length / imagesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * imagesPerPage;
  const paginatedImages = images.slice(startIndex, startIndex + imagesPerPage);

  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <div>
      <Gallerynav images={images} />
      <button onClick={handleDeleteCache}>Delete Cache</button>
      {/* <ImageGalleryxd images={paginatedImages} />
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(images.length / imagesPerPage)}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Photos;
