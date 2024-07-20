import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { convertFileSrc } from "@tauri-apps/api/core";

interface Album {
  id: string;
  title: string;
  coverImage: string;
  imageCount: number;
}

interface AlbumListProps {
  albums: Album[];
  albumsPerRow: number;
  onAlbumClick: (albumId: string) => void;
  onEditAlbum: (albumId: string) => void;
  onDeleteAlbum: (albumId: string) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({
  albums,
  albumsPerRow,
  onAlbumClick,
  onEditAlbum,
  onDeleteAlbum,
}) => {
  return (
    <div
      className={`grid gap-4 md:gap-6 ${
        albumsPerRow === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : albumsPerRow === 3
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onClick={() => onAlbumClick(album.id)}
          onEdit={() => onEditAlbum(album.id)}
          onDelete={() => onDeleteAlbum(album.id)}
        />
      ))}
    </div>
  );
};

interface AlbumCardProps {
  album: Album;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  onClick,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out dark:bg-card dark:text-card-foreground">
      <div onClick={onClick} className="cursor-pointer">
        <img
          src={convertFileSrc(album.coverImage)}
          alt={`Cover for ${album.title}`}
          width={500}
          height={400}
          className="object-cover w-full h-64 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="text-white">
            <h3 className="text-lg font-semibold">{album.title}</h3>
            <p className="text-sm">
              {album.imageCount} image{album.imageCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AlbumList;

// Remove the duplicate CreateAlbumForm component at the end of the file
