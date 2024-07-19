export interface Image {
  date: string;
  title: string;
  src: string;
}

export interface ImageGalleryProps {
  images: Image[];
  title: string;
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
  sortBy: string;
  setSortBy: (value: string) => void;
  images: Image[];
}
