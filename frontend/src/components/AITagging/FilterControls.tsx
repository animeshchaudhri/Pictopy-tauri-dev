import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ListOrderedIcon } from "../ui/Navigation/Icons/Icons";
import { Button } from "../ui/button";
import { MediaItem } from "@/types/Media";

interface FilterControlsProps {
  filterTag: string;
  setFilterTag: (tag: string) => void;
  mediaItems: MediaItem[];
}

export default function FilterControls({
  filterTag,
  setFilterTag,
  mediaItems,
}: FilterControlsProps) {
  const uniqueTags = useMemo(() => {
    const allTags = mediaItems.flatMap((item) => item.tags);
    return Array.from(new Set(allTags))
      .filter((tag): tag is string => typeof tag === "string")
      .sort();
  }, [mediaItems]);

  return (
    <div className="flex items-center gap-4 overflow-auto">
      <Button variant="outline">Add folder</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <ListOrderedIcon className="w-4 h-4" />
            Filter by {filterTag || "tags"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[200px] bg-white dark:text-foreground"
          align="end"
        >
          <DropdownMenuRadioGroup
            value={filterTag}
            onValueChange={setFilterTag}
          >
            <DropdownMenuRadioItem value="">All tags</DropdownMenuRadioItem>
            {uniqueTags.map((tag) => (
              <DropdownMenuRadioItem key={tag} value={tag}>
                {tag}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
