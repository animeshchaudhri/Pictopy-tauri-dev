import React, { useState } from "react";
import { useCreateAlbum } from "../../hooks/AlbumService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CreateAlbumFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  onError: (title: string, error: unknown) => void;
}

const CreateAlbumForm: React.FC<CreateAlbumFormProps> = ({
  onCancel,
  onSuccess,
  onError,
}) => {
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");
  const { createAlbum, isLoading: isCreating } = useCreateAlbum();

  const handleCreateAlbum = async () => {
    if (newAlbumName) {
      try {
        await createAlbum({
          name: newAlbumName,
          description: newAlbumDescription,
        });
        onSuccess();
      } catch (err) {
        onError("Error Creating Album", err);
      }
    }
  };

  return (
    <div className="mb-4 space-y-2">
      <Input
        type="text"
        value={newAlbumName}
        onChange={(e) => setNewAlbumName(e.target.value)}
        placeholder="New album name"
      />
      <Textarea
        value={newAlbumDescription}
        onChange={(e) => setNewAlbumDescription(e.target.value)}
        placeholder="Album description"
      />
      <div className="space-x-2">
        <Button onClick={handleCreateAlbum} disabled={isCreating}>
          Create Album
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateAlbumForm;
