import { PodcastCardProps } from "@/types/components";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";

export const PodcastCard = ({
  podcast,
  onMenuOpen,
  menuOpen,
}: PodcastCardProps) => {
  return (
    <div className="bg-[#23243a] rounded-xl shadow-md flex flex-col items-center w-56 mx-2">
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
            className="text-white text-sm font-semibold truncate"
            title={podcast.collectionName || podcast.trackName || ""}
          >
            {podcast.collectionName || podcast.trackName}
          </h6>
          <span
            className="text-[#b3b3b3] text-xs truncate"
            title={podcast.artistName || ""}
          >
            {podcast.artistName}
          </span>
        </div>
        <div className="relative flex-shrink-0 ml-2">
          <button
            className={`p-1 rounded-full hover:bg-[#393a4d] focus:outline-none${
              menuOpen ? " bg-[#393a4d]" : ""
            }`}
            onClick={(e) => onMenuOpen(podcast, e)}
            aria-label="Open menu"
          >
            <EllipsisVertical
              strokeWidth={2}
              className="text-[#b3b3b3] w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
