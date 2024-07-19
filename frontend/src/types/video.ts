export interface Video {
  date: string;
  title: string;
  src: string;
}

export interface VideoGridProps {
  videos: Video[];
  videosPerRow: number;
  openVideoViewer: (index: number) => void;
}

export interface VideoGalleryProps {
  videos: Video[];
  title: string | null;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface SortingControlsProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  videos: Video[];
}
