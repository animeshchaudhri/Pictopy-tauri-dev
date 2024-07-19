import React, { useEffect, useState } from "react";

interface VideoViewProps {
  initialIndex: number;
  onClose: () => void;
  allVideos: string[];
  currentPage: number;
  videosPerPage: number;
}

const VideoView: React.FC<VideoViewProps> = ({
  initialIndex,
  onClose,
  allVideos,
  currentPage,
  videosPerPage,
}) => {
  const [globalIndex, setGlobalIndex] = useState<number>(
    (currentPage - 1) * videosPerPage + initialIndex
  );

  useEffect(() => {
    setGlobalIndex((currentPage - 1) * videosPerPage + initialIndex);
  }, [initialIndex, currentPage, videosPerPage]);

  function handlePrevVideo() {
    if (globalIndex > 0) {
      setGlobalIndex(globalIndex - 1);
    } else {
      setGlobalIndex(allVideos.length - 1);
    }
  }

  function handleNextVideo() {
    if (globalIndex < allVideos.length - 1) {
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
      <video
        src={allVideos[globalIndex]}
        className="max-h-full"
        controls
        autoPlay
      />
      <button
        onClick={handlePrevVideo}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-20"
      >
        {"<"}
      </button>
      <button
        onClick={handleNextVideo}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
      >
        {">"}
      </button>
    </div>
  );
};

export default VideoView;
