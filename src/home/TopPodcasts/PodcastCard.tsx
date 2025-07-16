import { PodcastCardProps } from "@/types/components";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";

export const PodcastCard = ({
  podcast,
  onMenuOpen,
  menuOpen,
}: PodcastCardProps) => {
  return (
    <div className="bg-[color:var(--color-secondary)] rounded-xl shadow-md flex flex-col items-center w-56 mx-2">
      <div className="rounded-md overflow-hidden flex items-center justify-center">
        <Image
          src={podcast.artworkUrl100 || "/logo.svg"}
          alt={podcast.collectionName || podcast.trackName || "artwork"}
          width={220}
          height={150}
        />
      </div>
      {/* Title row with menu */}
      <div className="flex items-center justify-between w-full px-2 pt-2">
        <div className="truncate">
          <h6
            className="text-[color:var(--color-primary)] text-sm font-medium mb-1 truncate max-w-[150px] block"
            title={podcast.collectionName || podcast.trackName || ""}
          >
            {podcast.collectionName || podcast.trackName}
          </h6>
          <span
            className="text-[color:var(--color-foreground)] text-sm font-medium mb-1 truncate max-w-[150px] block"
            title={podcast.artistName || ""}
          >
            {podcast.artistName}
          </span>
        </div>
        <div className="relative flex-shrink-0 ml-2">
          <button
            className={`p-1 rounded-full hover:bg-[color:var(--color-border)] focus:outline-none${
              menuOpen ? " bg-[color:var(--color-border)]" : ""
            }`}
            onClick={(e) => onMenuOpen(podcast, e)}
            aria-label="Open menu"
          >
            <EllipsisVertical strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};
