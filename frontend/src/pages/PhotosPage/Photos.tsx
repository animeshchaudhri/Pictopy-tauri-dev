import React from "react";
import { useImages } from "../../hooks/useImages";

import MediaGallery from "@/components/Media/MediaGallery";
import { LoadingScreen } from "@/components/ui/LoadingScreen/LoadingScreen";

const Photos: React.FC = () => {
  const localPath = localStorage.getItem("folderPath") || "";
  const { images, loading } = useImages(localPath);
  console.log(images);
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <MediaGallery mediaItems={images} title="Image Gallery" type="image" />
    </div>
  );
};

export default Photos;
