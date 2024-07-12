import ImageCard from "../Photos/PhotoGallery/ImageCard";
import { useState } from "react";
import { PlusCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AlbumList = ({ albums, onAlbumClick, onCreateAlbum }) => {
  const [newAlbumTitle, setNewAlbumTitle] = useState("");

  const handleCreateAlbum = () => {
    if (newAlbumTitle.trim()) {
      onCreateAlbum(newAlbumTitle.trim());
      setNewAlbumTitle("");
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {albums.map((album) => (
        <div
          key={album.id}
          className="cursor-pointer"
          onClick={() => onAlbumClick(album.id)}
        >
          <ImageCard
            image={{
              id: album.id,
              src: album.coverImage || "/api/placeholder/500/400",
              title: album.title,
            }}
          />
          <div className="mt-2">
            <h3 className="text-lg font-semibold">{album.title}</h3>
            <p>{album.imageCount} images</p>
          </div>
        </div>
      ))}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Create New Album</h3>
        <Input
          type="text"
          placeholder="Album Title"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleCreateAlbum}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Album
        </Button>
      </div>
    </div>
  );
};
export default AlbumList;
