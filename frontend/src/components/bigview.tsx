import React, { useEffect, useState } from "react";

const BigImageView: React.FC<{ images: string[]; initialIndex: number; onClose: () => void }> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(initialIndex);

  useEffect(() => {
    setCurrentImageIndex(initialIndex); 
  }, [initialIndex]);

  function handlePrevImage() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNextImage() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-50">
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-white text-lg focus:outline-none"
      >
        Back
      </button>
      <img
        src={images[currentImageIndex]}
        alt={`image-${currentImageIndex}`}
        className="max-h-full"
      />
      <button
        onClick={handlePrevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {"<"}
      </button>
      <button
        onClick={handleNextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {">"}
      </button>
    </div>
  );
};

export default BigImageView;
