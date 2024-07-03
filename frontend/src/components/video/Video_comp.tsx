import { useState, useMemo, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/Pagenation";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";

export default function VideoGallery() {
  const [sortBy, setSortBy] = useState("date");
  const [videosPerRow, setVideosPerRow] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(9);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const localPath = localStorage.getItem("folderPath");
        console.log("Fetching videos from folder:", localPath);
        const videoPaths: string[] = await invoke("get_all_videos_with_cache", {
          directory: localPath,
        });

        const videoUrls = await Promise.all(
          videoPaths.map(async (videoPath) => {
            const src = await convertFileSrc(videoPath);
            return {
              src,
              original: src,
              title: `Video ${videoPath}`, 
              date: new Date().toISOString(), 
              popularity: 0, 
            };
          })
        );

        setVideos(videoUrls);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const sortedVideos = useMemo(() => {
    return videos.sort((a: any, b: any) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date);
        case "title":
          return a.title.localeCompare(b.title);
        case "popularity":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
  }, [sortBy, videos]);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = sortedVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(sortedVideos.length / videosPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const maxPages = 5;
    const pages = [];

    const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="dark:bg-background dark:text-foreground max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Video Gallery</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <LayoutGridIcon className="w-4 h-4" />
                {videosPerRow} per row
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[200px] bg-white dark:text-foreground"
              align="end"
            >
              <DropdownMenuRadioGroup
                value={videosPerRow.toString()}
                onValueChange={(value) => setVideosPerRow(parseInt(value))}
              >
                <DropdownMenuRadioItem value="2">
                  2 per row
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3">
                  3 per row
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="4">
                  4 per row
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="w-4 h-4" />
                Sort by {sortBy}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[200px] bg-white dark:text-foreground"
              align="end"
            >
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="title">
                  Title
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="popularity">
                  Popularity
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        className={`grid gap-4 md:gap-6 ${
          videosPerRow === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : videosPerRow === 3
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {currentVideos.map((video: any) => (
          <div
            key={video.src}
            className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out dark:bg-card dark:text-card-foreground"
          >
            <a href="#" className="absolute inset-0 z-10">
              <span className="sr-only">View</span>
            </a>
            <video
              controls
              src={video.src}
              className="object-cover w-full h-64 transition-opacity duration-300"
            />
            <div className="p-4 dark:bg-card dark:text-card-foreground">
              <h3 className="text-xl font-bold">{video.title}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(video.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            // disabled={currentPage === 1}
          />
          <PaginationContent>
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <PaginationItem key={index}>
                  <PaginationLink >{page}</PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
          </PaginationContent>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
}

function LayoutGridIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function ListOrderedIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}
