import { useCallback, useMemo, useState } from "react";
import FilterControls from "./FilterControls";
import MediaGrid from "../Media/Mediagrid";
import PaginationControls from "../ui/PaginationControls";
import { MediaGalleryProps } from "@/types/Media";
import MediaView from "../Media/MediaView";

export default function AIGallery({
  mediaItems,
  title,
  type,
}: MediaGalleryProps) {
  const [filterTag, setFilterTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showMediaViewer, setShowMediaViewer] = useState<boolean>(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(0);
  const itemsPerPage: number = 9;
  const itemsPerRow: number = 3;

  const filteredmediaItems = useMemo(() => {
    return filterTag
      ? mediaItems.filter((mediaItems: any) =>
          mediaItems.tags.includes(filterTag)
        )
      : mediaItems;
  }, [filterTag, mediaItems]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredmediaItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredmediaItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredmediaItems.length / itemsPerPage);

  const openMediaViewer = useCallback((index: number) => {
    setSelectedMediaIndex(index);
    setShowMediaViewer(true);
  }, []);

  const closeMediaViewer = useCallback(() => {
    setShowMediaViewer(false);
  }, []);

  return (
    <div className="dark:bg-background dark:text-foreground max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>

        <FilterControls
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          mediaItems={mediaItems}
        />
      </div>
      <MediaGrid
        mediaItems={currentItems}
        itemsPerRow={itemsPerRow}
        openMediaViewer={openMediaViewer}
        type={type}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {showMediaViewer && (
        <MediaView
          initialIndex={selectedMediaIndex}
          onClose={closeMediaViewer}
          allMedia={filteredmediaItems.map((item) => item.src)}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          type={type}
        />
      )}
    </div>
  );
}
