import React, { useState, useEffect } from "react";
import {
  useViewAlbum,
  useAddImageToAlbum,
  useRemoveImageFromAlbum,
} from "../../hooks/AlbumService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageManagementDialogProps {
  albumName: string | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (title: string, error: unknown) => void;
}

const ImageManagementDialog: React.FC<ImageManagementDialogProps> = ({
  albumName,
  onClose,
  onSuccess,
  onError,
}) => {
  const {
    album: viewedAlbum,
    viewAlbum,
    isLoading: isViewingAlbum,
  } = useViewAlbum();
  const { addImage, isLoading: isAddingImage } = useAddImageToAlbum();
  const { removeImage, isLoading: isRemovingImage } = useRemoveImageFromAlbum();
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (albumName) {
      viewAlbum(albumName);
    }
  }, [albumName, viewAlbum]);

  const handleAddImage = async () => {
    if (albumName && newImageUrl) {
      try {
        await addImage(albumName, newImageUrl);
        setNewImageUrl("");
        viewAlbum(albumName);
        onSuccess();
      } catch (err) {
        onError("Error Adding Image", err);
      }
    }
  };

  const handleRemoveImage = async (imageUrl: string) => {
    if (albumName) {
      try {
        await removeImage(albumName, imageUrl);
        viewAlbum(albumName);
        onSuccess();
      } catch (err) {
        onError("Error Removing Image", err);
      }
    }
  };

  return (
    <Dialog open={!!albumName} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Images: {albumName}</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <Input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="New image URL"
            className="mb-2"
          />
          <Button onClick={handleAddImage} disabled={isAddingImage}>
            Add Image
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {viewedAlbum?.image_paths.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Album image ${index}`}
                className="w-full h-32 object-cover"
              />
              <Button
                onClick={() => handleRemoveImage(image)}
                disabled={isRemovingImage}
                className="absolute top-0 right-0 bg-red-500 text-white p-1"
              >
                X
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageManagementDialog;
