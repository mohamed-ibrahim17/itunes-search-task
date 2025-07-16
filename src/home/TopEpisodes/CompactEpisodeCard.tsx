import { EpisodeCardProps } from "@/types/components";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

// CompactEpisodeCard for ITunesSearchResult
export const CompactEpisodeCard = ({
  episode,
  onMenuOpen,
  menuOpen,
}: EpisodeCardProps) => {
  return (
    <div className="bg-[color:var(--color-secondary)] shadow flex items-center w-full my-1 pb-1 border-b-[0.5px] border-[color:var(--color-border)] hover:bg-[color:var(--color-background)]">
      <div className="rounded-md overflow-hidden flex items-center justify-center mr-3 flex-shrink-0">
        <Image
          src={episode.artworkUrl100 || "/logo.svg"}
          alt={episode.trackName || episode.collectionName || "artwork"}
          width={70}
          height={70}
          className="object-cover"
        />
      </div>
      <div className="flex-1 max-w-[170px]">
        <h6
          className="text-[color:var(--color-primary)] text-sm font-medium mb-1 truncate  block"
          title={episode.trackName}
        >
          {episode.trackName}
        </h6>
        <span
          className="text-[color:var(--color-foreground)] text-xs truncate block"
          title={episode.collectionName}
        >
          {episode.collectionName}
        </span>
        <div
          className="text-xs text-[color:var(--color-primary)] truncate max-w-[100px] block"
          title={episode.artistName}
        >
          {episode.artistName}
        </div>
      </div>
      <div className="relative flex-shrink-0 ml-2">
        <button
          className={`p-1 rounded-full hover:bg-[color:var(--color-border)] focus:outline-none${
            menuOpen ? " bg-[color:var(--color-border)]" : ""
          }`}
          onClick={(e) => onMenuOpen(episode, e)}
          aria-label="Open menu"
        >
          <EllipsisVertical strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
