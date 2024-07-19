import React from "react";
import { useImages } from "../../hooks/useImages";

import ImageGallery from "@/components/Photos/ImageGallery";
import MediaGallery from "@/components/Media/MediaGallery";

const Photos: React.FC = () => {
  const localPath = localStorage.getItem("folderPath") || "";
  const { images, loading } = useImages(localPath);
  console.log(images);
  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <div>
      <MediaGallery mediaItems={images} title="Image Gallery" type="image" />
    </div>
  );
};

export default Photos;
