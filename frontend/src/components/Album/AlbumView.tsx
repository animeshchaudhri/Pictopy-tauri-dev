import { useState } from "react";

const AlbumView = ({ album, onAddImage, onBack }) => {
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      onAddImage(album.id, newImageUrl.trim());
      setNewImageUrl("");
    }
  };

  return (
    <div>
      <Button onClick={onBack} className="mb-4">
        Back to Albums
      </Button>
      <h2 className="text-2xl font-bold mb-4">{album.title}</h2>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {album.images.map((image, index) => (
          <div key={index} className="aspect-square bg-gray-200">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
        <div className="aspect-square bg-gray-100 p-4 flex flex-col items-center justify-center">
          <Input
            type="text"
            placeholder="Image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleAddImage}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AlbumView;
