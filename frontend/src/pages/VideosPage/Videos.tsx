import MediaGallery from "@/components/Media/MediaGallery";

import { useVideos } from "@/hooks/UseVideos";

const Videos: React.FC = () => {
  const localPath = localStorage.getItem("folderPath") || "";
  const { videos, loading } = useVideos(localPath);

  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <div>
      <MediaGallery mediaItems={videos} title="Image Gallery" type="video" />
    </div>
  );
};

export default Videos;
