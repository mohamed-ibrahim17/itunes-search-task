import { PodcastListProps } from "@/types/components";
import { ITunesSearchResult } from "@/types/itunes-search";
import { JSX } from "react";
import { MenuPortal } from "../shared/MenuPortal";
import { PodcastCard } from "./PodcastCard";

export const PodcastList = ({
  podcasts,
  layout,
  menuState,
  onMenuOpen,
  onMenuClose,
  sectionRef,
  scrollRef,
}: PodcastListProps) => {
  // Render card function
  const renderCard = (
    podcast: ITunesSearchResult,
    idx: number
  ): JSX.Element => {
    const id = typeof podcast.trackId === "number" ? podcast.trackId : idx + 1;
    const menuOpen = menuState.podcastId === id;
    return (
      <PodcastCard
        key={id}
        podcast={podcast}
        onMenuOpen={onMenuOpen}
        menuOpen={menuOpen}
      />
    );
  };

  // Scroll Layout
  if (layout === "scroll") {
    return (
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll py-3 custom-scrollbar gap-3 min-h-[180px]"
        style={{ scrollBehavior: "smooth" }}
      >
        {podcasts.map((podcast, idx) => (
          <div
            key={
              typeof podcast.trackId === "number" ? podcast.trackId : idx + 1
            }
            className="snap-start"
          >
            {renderCard(podcast, idx)}
          </div>
        ))}
        <MenuPortal
          menuState={menuState}
          onClose={onMenuClose}
          sectionRef={sectionRef}
        />
      </div>
    );
  }

  // Grid layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-3">
      {podcasts.map(renderCard)}
      <MenuPortal
        menuState={menuState}
        onClose={onMenuClose}
        sectionRef={sectionRef}
      />
    </div>
  );
};
