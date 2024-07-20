import React, { useState, useEffect } from "react";
import { useEditAlbumDescription } from "../../hooks/AlbumService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Album {
  album_name: string;
  image_paths: string[];
  description?: string;
}

interface EditAlbumDialogProps {
  album: Album | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (title: string, error: unknown) => void;
}

const EditAlbumDialog: React.FC<EditAlbumDialogProps> = ({
  album,
  onClose,
  onSuccess,
  onError,
}) => {
  const { editDescription, isLoading: isEditing } = useEditAlbumDescription();
  const [description, setDescription] = useState(album?.description || "");

  useEffect(() => {
    setDescription(album?.description || "");
  }, [album]);

  const handleEditAlbum = async () => {
    if (album) {
      try {
        await editDescription(album.album_name, description);
        onSuccess();
      } catch (err) {
        onError("Error Editing Album", err);
      }
    }
  };

  return (
    <Dialog open={!!album} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Album: {album?.album_name}</DialogTitle>
        </DialogHeader>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Album description"
          className="my-4"
        />
        <DialogFooter>
          <Button onClick={handleEditAlbum} disabled={isEditing}>
            {isEditing ? "Saving..." : "Save"}
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAlbumDialog;
