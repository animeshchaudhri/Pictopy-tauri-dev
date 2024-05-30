import React, { useEffect, useState } from "react";

import BigImageView from "./bigview";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";

const Test2: React.FC = () => {
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [directoryInput, setDirectoryInput] = useState<string>("");
  const imagesPerPage = 6;
  const [bigImageIndex, setBigImageIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [Directory, setDirectory] = useState<string>("");

  useEffect(() => {
    async function fetchFolders() {
      try {
        console.log(Directory);
        if (!Directory) return;
        setLoading(true); 
        const result: string[] = await invoke("get_folders_with_images", {
          directory: Directory,
        });
        setFolders(result);
      } catch (error) {
        console.error("Error fetching folders:", error);
      } finally {
        setLoading(false); 
      }
    }

    fetchFolders();
  }, [Directory]);

  async function handleFolderClick(folder: string) {
    try {
      setLoading(true); 
      const result: string[] = await invoke("get_images_in_folder", {
        folderPath: folder,
      });

      const imageUrls = await Promise.all(
        result.map(async (file) => {
          return await convertFileSrc(file);
        })
      );

      setImages(imageUrls);
      setSelectedFolder(folder);
      setCurrentPage(1);
      setBigImageIndex(null);
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

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pictopy</h1>
      <div className="flex gap-3">
        <input
          type="text"
          value={directoryInput}
          placeholder="Enter directory location"
          className="border border-gray-400 rounded px-2 py-1 mb-4"
          onChange={(e) => setDirectoryInput(e.target.value)}
        />
        <button
          className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setDirectory(directoryInput)}
        >
          Fetch Data
        </button>
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div></div> 
      ) : !selectedFolder ? (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Folders with Images</h2>
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
          <button
            className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => setSelectedFolder(null)}
          >
            Back to Folders
          </button>
          <div className="flex justify-between mb-10 items-center">
            <h2 className="text-2xl font-semibold align-bottom inline-block">
              Images in {selectedFolder}
            </h2>
            <div>
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
          <div className="grid grid-cols-3 gap-4">
            {images
              .slice(
                (currentPage - 1) * imagesPerPage,
                currentPage * imagesPerPage
              )
              .map((path, index) => (
                <img
                  key={index}
                  src={path}
                  alt={`image-${index}`}
                  className="w-full h-auto rounded shadow-md cursor-pointer"
                  onClick={() => setBigImageIndex(index + 1)}
                />
              ))}
          </div>
        </div>
      )}
      {bigImageIndex !== null && (
        <BigImageView
          images={images}
          initialIndex={bigImageIndex}
          onClose={() => setBigImageIndex(null)}
        />
      )}
    </div>
  );
};

export default Test2;
