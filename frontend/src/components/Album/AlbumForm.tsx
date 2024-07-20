import React, { useState } from "react";
import { useCreateAlbum } from "../../hooks/AlbumService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateAlbumFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (title: string, error: unknown) => void;
}

const CreateAlbumForm: React.FC<CreateAlbumFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
}) => {
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");
  const { createAlbum, isLoading: isCreating } = useCreateAlbum();

  const handleCreateAlbum = async () => {
    if (newAlbumName.trim()) {
      try {
        await createAlbum({
          name: newAlbumName.trim(),
          description: newAlbumDescription.trim(),
        });
        setNewAlbumName("");
        setNewAlbumDescription("");
        onSuccess();
        onClose();
      } catch (err) {
        onError("Error Creating Album", err);
      }
    } else {
      onError("Invalid Album Name", new Error("Album name cannot be empty"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
            placeholder="New album name"
            required
          />
          <Textarea
            value={newAlbumDescription}
            onChange={(e) => setNewAlbumDescription(e.target.value)}
            placeholder="Album description (optional)"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreateAlbum}
            disabled={isCreating || !newAlbumName.trim()}
          >
            {isCreating ? "Creating..." : "Create Album"}
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAlbumForm;
