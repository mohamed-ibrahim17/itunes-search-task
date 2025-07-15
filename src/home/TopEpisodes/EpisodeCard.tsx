import { EpisodeCardProps } from "@/types/components";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

// EpisodeCard component for ITunesSearchResult
export const EpisodeCard = ({
  episode,
  onMenuOpen,
  menuOpen,
}: EpisodeCardProps) => {
  return (
    <div className="flex flex-row bg-gradient-to-r from-[#23243a] to-[#2d223a] min-w-[290px] rounded-md shadow-md h-[110px] relative overflow-hidden border border-[#a78bfa]/10">
      {/* Image on the left */}
      <div className="flex-shrink-0 h-full w-[90px] flex items-center justify-center">
        <Image
          src={episode.artworkUrl100 || "/logo.svg"}
          alt={episode.trackName || episode.collectionName || "artwork"}
          width={150}
          height={150}
          className="object-cover h-full w-full rounded-none"
        />
      </div>
      {/* Info on the right */}
      <div className="flex flex-col grow justify-between p-3">
        <div className="flex flex-col gap-1">
          <span
            className="text-[#a78bfa] text-sm font-medium mb-1 truncate max-w-[150px] block"
            title={episode.artistName}
          >
            {episode.artistName}
          </span>
          <span
            className="text-[#b3b3b3] text-base truncate"
            title={episode.collectionName || episode.trackName}
          >
            {episode.collectionName || episode.trackName}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-4">
          {/* No date/duration in API, so skip */}
        </div>
      </div>
      {/* Menu button in top right */}
      <div className="flex items-start pt-1">
        <button
          className={`p-1 rounded-full hover:bg-[#393a4d] focus:outline-none${
            menuOpen ? " bg-[#393a4d]" : ""
          }`}
          onClick={(e) => onMenuOpen(episode, e)}
          aria-label="Open menu"
        >
          <EllipsisVertical
            strokeWidth={2}
            className="text-[#b3b3b3] w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
};
