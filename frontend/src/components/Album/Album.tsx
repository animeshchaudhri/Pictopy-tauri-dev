import React, { useState } from "react";
import {
  useAllAlbums,
  useCreateAlbum,
  useDeleteAlbum,
} from "../../hooks/AlbumService";

const AlbumsView = () => {
  const { albums, isLoading, error, refetch } = useAllAlbums();
  const {
    createAlbum,
    isLoading: isCreating,
    error: createError,
  } = useCreateAlbum();
  const {
    deleteAlbum,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteAlbum();
  const [newAlbumName, setNewAlbumName] = useState("");

  if (isLoading) return <div>Loading albums...</div>;
  if (error) return <div>Error loading albums: {error.message}</div>;

  const handleCreateAlbum = async () => {
    if (newAlbumName) {
      await createAlbum({ name: newAlbumName });
      setNewAlbumName("");
      refetch(); // Refresh the album list
    }
  };

  const handleDeleteAlbum = async (albumId: any) => {
    await deleteAlbum(albumId);
    refetch(); // Refresh the album list
  };

  return (
    <div>
      <h1>Albums</h1>
      {Array.isArray(albums) ? (
        albums.map((album) => (
          <div key={album.album_name}>
            {album.album_name}
            <button
              onClick={() => handleDeleteAlbum(album.album_name)}
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div>Error: Albums data is not an array.</div>
      )}
      <div>
        <input
          type="text"
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
          placeholder="New album name"
        />
        <button onClick={handleCreateAlbum} disabled={isCreating}>
          Create Album
        </button>
      </div>
      {createError && <div>Error creating album: {createError.message}</div>}
      {deleteError && <div>Error deleting album: {deleteError.message}</div>}
    </div>
  );
};

export default AlbumsView;
