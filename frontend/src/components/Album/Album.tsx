// AlbumsView.tsx
import React, { useState } from "react";
import { useAllAlbums } from "../../hooks/AlbumService";
import AlbumList from "./AlbumList";

import ImageManagementDialog from "./ImageManagementDialog";

import { Button } from "@/components/ui/button";
import CreateAlbumForm from "./AlbumForm";
import EditAlbumDialog from "./AlbumDialog";
import ErrorDialog from "./Error";

const AlbumsView: React.FC = () => {
  const { albums, isLoading, refetch } = useAllAlbums();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<{
    name: string;
    description: string;
  } | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<string | null>(null);
  const [errorDialogContent, setErrorDialogContent] = useState<{
    title: string;
    description: string;
  } | null>(null);

  if (isLoading) return <div>Loading albums...</div>;

  const showErrorDialog = (title: string, err: unknown) => {
    setErrorDialogContent({
      title,
      description:
        err instanceof Error ? err.message : "An unknown error occurred",
    });
  };

  const transformedAlbums = albums.map((album) => ({
    id: album.album_name,
    title: album.album_name,
    coverImage: album.image_paths[0] || "/placeholder-image.jpg",
    imageCount: album.image_paths.length,
  }));

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Albums</h1>

        {!showCreateForm ? (
          <Button onClick={() => setShowCreateForm(true)} className="mb-4">
            Create New Album
          </Button>
        ) : (
          <CreateAlbumForm
            onCancel={() => setShowCreateForm(false)}
            onSuccess={() => {
              setShowCreateForm(false);
              refetch();
            }}
            onError={showErrorDialog}
          />
        )}
      </div>
      <AlbumList
        albums={transformedAlbums}
        albumsPerRow={3}
        onAlbumClick={(albumId) => setCurrentAlbum(albumId)}
        onEditAlbum={(albumId) => {
          const album = albums.find((a) => a.album_name === albumId);
          if (album) {
            setEditingAlbum({
              name: album.album_name,
              description: album.description || "",
            });
          }
        }}
        onDeleteAlbum={(albumId) => {
          // Implement delete functionality
          refetch();
        }}
      />

      <EditAlbumDialog
        album={editingAlbum}
        onClose={() => setEditingAlbum(null)}
        onSuccess={() => {
          setEditingAlbum(null);
          refetch();
        }}
        onError={showErrorDialog}
      />

      <ImageManagementDialog
        albumName={currentAlbum}
        onClose={() => setCurrentAlbum(null)}
        onSuccess={() => refetch()}
        onError={showErrorDialog}
      />

      <ErrorDialog
        content={errorDialogContent}
        onClose={() => setErrorDialogContent(null)}
      />
    </div>
  );
};

export default AlbumsView;
