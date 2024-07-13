export interface Image {
  id: string;
  date: string;
  title: string;
  popularity: number;
  src: string;
}

export interface ImageGalleryProps {
  images: Image[];
  title: string | null;
}
export interface ImageData {
  src: string;
  original: string;
  caption: string;
  title: string;
  date: string;
  popularity: number;
  tags: string[];
}
export interface ResponseData {
  [year: string]: {
    [month: string]: string[];
  };
}
export type SortingType = "date";

export interface SortingControlsProps {
  sortBy: "date"; // Currently only supports sorting by date
  setSortBy: (sortBy: "date") => void; // Function to set the sorting type
  imagesPerRow: number;
  setImagesPerRow: (imagesPerRow: number) => void;
}
