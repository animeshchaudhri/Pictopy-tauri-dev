import React from "react";
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

interface EditAlbumDialogProps {
  album: { name: string; description: string } | null;
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

  const handleEditAlbum = async () => {
    if (album) {
      try {
        await editDescription(album.name, album.description);
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
          <DialogTitle>Edit Album</DialogTitle>
        </DialogHeader>
        <Textarea
          value={album?.description || ""}
          onChange={(e) => album && { ...album, description: e.target.value }}
          placeholder="Album description"
          className="my-4"
        />
        <DialogFooter>
          <Button onClick={handleEditAlbum} disabled={isEditing}>
            Save
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
