import { EpisodeListProps } from "@/types/components";
import { ITunesSearchResult } from "@/types/itunes-search";
import { JSX } from "react";
import { MenuPortal } from "../shared/MenuPortal";
import { CompactEpisodeCard } from "./CompactEpisodeCard";
import { EpisodeCard } from "./EpisodeCard";
import { ListEpisodeCard } from "./ListEpisodeCard";

// EpisodeList component for rendering episodes in different layouts
export const EpisodeList = ({
  episodes,
  layout,
  menuState,
  onMenuOpen,
  onMenuClose,
  sectionRef,
  scrollRef,
}: EpisodeListProps) => {
  // Render card function
  const renderCard = (
    episode: ITunesSearchResult,
    idx: number
  ): JSX.Element => {
    const id = typeof episode.trackId === "number" ? episode.trackId : idx + 1;
    const menuOpen = menuState.episodeId === id;

    if (layout === "compact") {
      return (
        <CompactEpisodeCard
          key={id}
          episode={episode}
          onMenuOpen={onMenuOpen}
          menuOpen={menuOpen}
        />
      );
    }

    if (layout === "list") {
      return (
        <ListEpisodeCard
          key={id}
          episode={episode}
          onMenuOpen={onMenuOpen}
          menuOpen={menuOpen}
        />
      );
    }

    return (
      <EpisodeCard
        key={id}
        episode={episode}
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
        {episodes.map((episode, idx) => (
          <div
            key={
              typeof episode.trackId === "number" ? episode.trackId : idx + 1
            }
            className="snap-start"
          >
            {renderCard(episode, idx)}
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
  if (layout === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-3">
        {episodes.map(renderCard)}
        <MenuPortal
          menuState={menuState}
          onClose={onMenuClose}
          sectionRef={sectionRef}
        />
      </div>
    );
  }

  // compact layout
  if (layout === "list") {
    return (
      <div className="flex flex-col gap-4">
        {episodes.map(renderCard)}
        <MenuPortal
          menuState={menuState}
          onClose={onMenuClose}
          sectionRef={sectionRef}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 py-3">
      {episodes.map(renderCard)}
      <MenuPortal
        menuState={menuState}
        onClose={onMenuClose}
        sectionRef={sectionRef}
      />
    </div>
  );
};
