import { useState, useMemo } from "react";
import ImageGrid from "./PhotoGallery/ImageGrid";
import PaginationControls from "./PhotoGallery/PaginationControls";
import ImageView from "./PhotoGallery/PhotosView";
import FilterControls from "./FilterControls";
import { ImageGalleryProps } from "@/types/image";
import { Button } from "../ui/button";

export default function AIGallery({ images, title }: ImageGalleryProps) {
  const [filterTag, setFilterTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showImageViewer, setShowImageViewer] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const imagesPerPage: number = 9;
  const imagesPerRow: number = 3;

  const filteredImages = useMemo(() => {
    return filterTag
      ? images.filter((image) => image.tags.includes(filterTag))
      : images;
  }, [filterTag, images]);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
  };

  return (
    <div className="dark:bg-background dark:text-foreground max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        
        <FilterControls
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          images={images}
        />
      </div>
      <ImageGrid
        images={currentImages}
        imagesPerRow={imagesPerRow}
        openImageViewer={openImageViewer}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {showImageViewer && (
        <ImageView
          initialIndex={selectedImageIndex}
          onClose={closeImageViewer}
          allImages={images.map((img: any) => img.src)}
          currentPage={currentPage}
          imagesPerPage={imagesPerPage}
        />
      )}
    </div>
  );
}
