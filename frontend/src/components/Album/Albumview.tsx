import React, { useState, useEffect } from "react";
import {
  useViewAlbum,
  useRemoveImageFromAlbum,
} from "../../hooks/AlbumService";
import { Button } from "@/components/ui/button";
import { convertFileSrc } from "@tauri-apps/api/core";
import ImageSelectionPage from "./ImageSelection";

interface AlbumViewProps {
  albumName: string;
  onBack: () => void;
  onError: (title: string, error: unknown) => void;
}

interface AlbumData {
  album_name: string;
  photos: string[];
  description?: string;
}

const AlbumView: React.FC<AlbumViewProps> = ({
  albumName,
  onBack,
  onError,
}) => {
  const { album, viewAlbum, isLoading, error } = useViewAlbum();
  const { removeImage, isLoading: isRemovingImage } = useRemoveImageFromAlbum();
  const [showImageSelection, setShowImageSelection] = useState(false);

  useEffect(() => {
    viewAlbum(albumName).catch((err) => onError("Error loading album", err));
  }, [albumName, viewAlbum, onError]);

  const handleRemoveImage = async (imageUrl: string) => {
    try {
      await removeImage(albumName, imageUrl);
      await viewAlbum(albumName);
    } catch (err) {
      onError("Error Removing Image", err);
    }
  };

  if (isLoading) return <div>Loading album...</div>;
  if (error) return <div>Error loading album: {error.message}</div>;
  if (!album) return <div>No album data available.</div>;

  if (showImageSelection) {
    return (
      <ImageSelectionPage
        albumName={albumName}
        onClose={() => setShowImageSelection(false)}
        onSuccess={() => {
          setShowImageSelection(false);
          viewAlbum(albumName);
        }}
        onError={onError}
      />
    );
  }

  const albumData = album as unknown as AlbumData;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={onBack}>Back to Albums</Button>
        <Button onClick={() => setShowImageSelection(true)}>Add Images</Button>
      </div>

      {albumData.photos && albumData.photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {albumData.photos.map((imagePath, index) => {
            const srcc = convertFileSrc(imagePath);
            return (
              <div key={index} className="relative">
                <img
                  src={srcc}
                  alt={`Album image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <Button
                  onClick={() => handleRemoveImage(imagePath)}
                  disabled={isRemovingImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  X
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>This album is empty. Add some images to get started!</div>
      )}
    </div>
  );
};

export default AlbumView;
