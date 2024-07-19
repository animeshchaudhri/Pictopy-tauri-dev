import React, { useEffect, useState } from "react";

interface ImageViewProps {
  initialIndex: number;
  onClose: () => void;
  allImages: string[];
  currentPage: number;
  imagesPerPage: number;
}

const ImageView: React.FC<ImageViewProps> = ({
  initialIndex,
  onClose,
  allImages,
  currentPage,
  imagesPerPage,
}) => {
  const [globalIndex, setGlobalIndex] = useState<number>(
    (currentPage - 1) * imagesPerPage + initialIndex
  );

  useEffect(() => {
    setGlobalIndex((currentPage - 1) * imagesPerPage + initialIndex);
  }, [initialIndex, currentPage, imagesPerPage]);

  function handlePrevImage() {
    if (globalIndex > 0) {
      setGlobalIndex(globalIndex - 1);
    } else {
      setGlobalIndex(allImages.length - 1);
    }
  }

  function handleNextImage() {
    if (globalIndex < allImages.length - 1) {
      setGlobalIndex(globalIndex + 1);
    } else {
      setGlobalIndex(0);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-50">
      <button
        onClick={onClose}
        className="absolute top-4 left-4 px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
      >
        Back
      </button>
      <img
        src={allImages[globalIndex]}
        alt={`image-${globalIndex}`}
        className="max-h-full"
      />
      <button
        onClick={handlePrevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-20"
      >
        {"<"}
      </button>
      <button
        onClick={handleNextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
      >
        {">"}
      </button>
    </div>
  );
};

export default ImageView;
