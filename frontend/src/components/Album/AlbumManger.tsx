import { useState } from "react";
import AlbumView from "./AlbumView";
import AlbumList from "./AlbumList";

const AlbumManager = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const createAlbum = (title) => {
    const newAlbum = {
      id: Date.now(),
      title,
      images: [],
      imageCount: 0,
      coverImage: null,
    };
    setAlbums([...albums, newAlbum]);
  };

  const addImageToAlbum = (albumId, imageUrl) => {
    setAlbums(
      albums.map((album) => {
        if (album.id === albumId) {
          const updatedImages = [...album.images, imageUrl];
          return {
            ...album,
            images: updatedImages,
            imageCount: updatedImages.length,
            coverImage: album.coverImage || imageUrl,
          };
        }
        return album;
      })
    );
  };

  const selectedAlbum = albums.find((album) => album.id === selectedAlbumId);

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedAlbum ? (
        <AlbumView
          album={selectedAlbum}
          onAddImage={addImageToAlbum}
          onBack={() => setSelectedAlbumId(null)}
        />
      ) : (
        <AlbumList
          albums={albums}
          onAlbumClick={setSelectedAlbumId}
          onCreateAlbum={createAlbum}
        />
      )}
    </div>
  );
};

export default AlbumManager;
