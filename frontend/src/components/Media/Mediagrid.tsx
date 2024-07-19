// components/MediaGallery/MediaGrid.tsx

import MediaCard from "./MediaCard";
export interface MediaItem {
  src: string;
  date: string;
  title?: string;
}
interface MediaGridProps {
  mediaItems: MediaItem[];
  itemsPerRow: number;
  openMediaViewer: (index: number) => void;
  type: "image" | "video";
}

export default function MediaGrid({
  mediaItems,
  itemsPerRow,
  openMediaViewer,
  type,
}: MediaGridProps) {
  return (
    <div
      className={`grid gap-4 md:gap-6 ${
        itemsPerRow === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : itemsPerRow === 3
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {mediaItems.map((item, index) => (
        <div
          key={index}
          onClick={() => openMediaViewer(index)}
          className="cursor-pointer"
        >
          <MediaCard item={item} type={type} />
        </div>
      ))}
    </div>
  );
}
