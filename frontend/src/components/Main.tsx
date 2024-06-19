import React, { useEffect, useState } from "react";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import ImageGalleryxd from "./gallery/Imagegal";

interface Test2Props {
  folderPath: string;
}

const Test2: React.FC<Test2Props> = ({ folderPath }) => {
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const imagesPerPage = 9;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchFolders() {
      try {
        if (!folderPath) return;
        setLoading(true);
        const result: string[] = await invoke("get_folders_with_images", {
          directory: folderPath,
        });
        setFolders(result);
      } catch (error) {
        console.error("Error fetching folders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFolders();
  }, [folderPath]);

  async function handleFolderClick(folder: string) {
    try {
      setLoading(true);
      const result: string[] = await invoke("get_images_in_folder", {
        folderPath: folder,
      });

      const imageUrls = await Promise.all(
        result.map(async (file) => {
          const src = await convertFileSrc(file);
          return {
            src,
            // height: 320,
            // width: 420,
            thumbnail: src,

            caption: `Image ${file}`,
          };
        })
      );

      setImages(imageUrls);
      setSelectedFolder(folder);
      setCurrentPage(1); // Reset current page to 1 when selecting a new folder
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setLoading(false);
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < Math.ceil(images.length / imagesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  // Calculate the current page images based on currentPage and imagesPerPage
  const startIndex = (currentPage - 1) * imagesPerPage;
  const paginatedImages = images.slice(startIndex, startIndex + imagesPerPage);

  return (
    <div className="p-4 flex-1 flex flex-col">
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      ) : !selectedFolder ? (
        <div>
          <h2 className="text-2xl text-white font-semibold mb-2">
            Folders with Images
          </h2>
          <ul className="list-disc pl-5">
            {folders.map((folder, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => handleFolderClick(folder)}
              >
                📁 {folder}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <ImageGalleryxd images={paginatedImages} />
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
              disabled={
                currentPage === Math.ceil(images.length / imagesPerPage)
              }
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test2;
