import React from "react";
import type { EpisodeCardProps } from "@/types/components";
import { EllipsisVertical, PlayCircle, PlayCircleIcon } from "lucide-react";
import Image from "next/image";
import { Play } from "next/font/google";

export const ListEpisodeCard = ({
  episode,
  onMenuOpen,
  menuOpen,
}: EpisodeCardProps) => {
  return (
    <div className="group flex items-center bg-[color:var(--color-secondary)] rounded-lg p-4 shadow-md w-full">
      <div className="relative">
        <Image
          src={episode.artworkUrl100 || "/logo.svg"}
          alt={episode.trackName || episode.collectionName || "artwork"}
          width={90}
          height={90}
          className="w-20 h-20 rounded-lg object-cover mr-4"
        />
        <div className="absolute w-20 cursor-pointer inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircleIcon strokeWidth={2} className="text-white w-10 h-10" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-[color:var(--color-primary)] truncate dark:text-[color:var(--color-foreground)]">
          {episode.trackName}
        </h3>
        <p className="text-sm text-[color:var(--color-secondary)] truncate">
          {episode.collectionName}
        </p>
        {/* No description, releaseDate, or trackTimeMillis in ITunesSearchResult */}
        <div className="flex gap-4 text-xs text-[color:var(--color-secondary)] mt-2">
          <span>-</span>
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        <button
          className={`p-1 rounded-full hover:bg-[color:var(--color-border)] focus:outline-none cursor-pointer`}
          aria-label="Play audio"
        >
          <PlayCircleIcon
            strokeWidth={2}
            className="text-[color:var(--color-secondary)] w-5 h-5"
          />
        </button>
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
