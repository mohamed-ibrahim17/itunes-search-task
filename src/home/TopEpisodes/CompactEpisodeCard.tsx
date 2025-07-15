import { CompactEpisodeCardProps } from "@/types/components";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

// CompactEpisodeCard for ITunesSearchResult
export const CompactEpisodeCard = ({
  episode,
  onMenuOpen,
  menuOpen,
}: CompactEpisodeCardProps) => {
  return (
    <div className="bg-[#161624] shadow flex items-center w-full my-1 pb-1 border-b-[0.5px] border-gray-400 hover:bg-[#23243a]">
      <div className="rounded-md overflow-hidden flex items-center justify-center mr-3 flex-shrink-0">
        <Image
          src={episode.artworkUrl100 || "/logo.svg"}
          alt={episode.trackName || episode.collectionName || "artwork"}
          width={70}
          height={70}
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h6
          className="text-white text-base font-semibold truncate"
          title={episode.trackName}
        >
          {episode.trackName}
        </h6>
        <span
          className="text-[#b3b3b3] text-xs truncate block"
          title={episode.collectionName}
        >
          {episode.collectionName}
        </span>
        <div
          className="text-xs text-[#a78bfa] truncate max-w-[100px] block"
          title={episode.artistName}
        >
          {episode.artistName}
        </div>
      </div>
      <div className="relative flex-shrink-0 ml-2">
        <button
          className={`p-1 rounded-full hover:bg-[#393a4d] focus:outline-none${
            menuOpen ? " bg-[#393a4d]" : ""
          }`}
          onClick={(e) => onMenuOpen(episode, e)}
          aria-label="Open menu"
        >
          <EllipsisVertical
            strokeWidth={2}
            className="text-[#b3b3b3] w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
};
