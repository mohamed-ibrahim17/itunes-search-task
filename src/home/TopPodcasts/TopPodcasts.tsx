"use client";

import React, { useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import { EllipsisVertical } from "lucide-react";
import { useITunesSearch } from "@/hooks/useITunesSearch";
import type { ITunesSearchResult } from "@/types/itunes-search";
import { SliderScrollNavigation } from "../shared/ScrollNavigation";
import { PodcastList } from "./PodcastList";
import { NoResultFound } from "@/components/NoResult";
import { StartSearching } from "@/components/StartSearching";
import { MenuPortal } from "../shared/MenuPortal";

// Remove PodcastCard and all menu logic, and replace the rendering logic with PodcastList usage, similar to TopEpisodes.
export const TopPodcasts = () => {
  const [menuState, setMenuState] = useState<{
    podcastId: number | null;
    x: number;
    y: number;
  }>({
    podcastId: null,
    x: 0,
    y: 0,
  });
  const [layout, setLayout] = useState<"scroll" | "grid">("scroll");
  const [layoutMenuOpen, setLayoutMenuOpen] = useState(false);
  const [layoutMenuPos, setLayoutMenuPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { searchTerm, searchResults, isLoading } = useITunesSearch();

  // Filter for podcasts if possible
  const podcastResults = searchResults.filter(
    (r) => r.kind && r.kind.includes("podcast")
  );
  const showResults = searchTerm && searchResults.length > 0;
  const showNoResults = searchTerm && searchResults.length === 0;
  const podcastsToShow =
    podcastResults.length > 0 ? podcastResults : searchResults;

  // Layout menu items
  const layoutMenuItems = [
    {
      label: "Switch layout to Grid",
      onClick: () => setLayout("grid"),
      show: layout !== "grid",
    },
    {
      label: "Switch layout to Scroll",
      onClick: () => setLayout("scroll"),
      show: layout !== "scroll",
    },
  ].filter((item) => item.show);

  // Layout switcher handlers
  const handleLayoutMenuOpen = (e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    setLayoutMenuPos({
      x: rect.left - window.scrollX - 122,
      y: rect.bottom + window.scrollY + 15,
    });
    setLayoutMenuOpen((v) => !v);
  };

  // Handler to open/close menu with position
  const handleOpenMenu = (podcast: ITunesSearchResult, e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = rect.left + window.scrollX - 130;
    const y = rect.bottom + window.scrollY + 20;
    setMenuState((prev) =>
      prev.podcastId === (podcast.trackId ?? null)
        ? { podcastId: null, x: 0, y: 0 }
        : { podcastId: podcast.trackId ?? null, x, y }
    );
  };

  return (
    <section className="w-full mx-auto" ref={sectionRef}>
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4 border-b-[0.5px] py-4 px-5">
        <h2 className="text-xl font-bold text-white">
          Top podcasts for {searchTerm}
        </h2>
        <div className="flex items-center gap-2 relative">
          {layout === "scroll" && (
            <SliderScrollNavigation scrollRef={scrollRef} />
          )}
          <button
            className="p-2 rounded-full hover:bg-[#393a4d] focus:outline-none"
            onClick={handleLayoutMenuOpen}
            aria-label="Switch layout"
          >
            <EllipsisVertical
              strokeWidth={2}
              className="text-[#b3b3b3] w-6 h-6"
            />
          </button>
          {layoutMenuOpen && sectionRef.current && (
            <MenuPortal
              menuState={{
                podcastId: null,
                x: layoutMenuPos.x,
                y: layoutMenuPos.y,
              }}
              onClose={() => setLayoutMenuOpen(false)}
              sectionRef={sectionRef}
              items={layoutMenuItems}
            />
          )}
        </div>
      </div>

      {/* Podcasts List */}
      <div className="px-3">
        {isLoading ? (
          <Spinner />
        ) : showResults ? (
          <PodcastList
            podcasts={podcastsToShow}
            layout={layout}
            menuState={menuState}
            onMenuOpen={handleOpenMenu}
            onMenuClose={() => setMenuState({ podcastId: null, x: 0, y: 0 })}
            sectionRef={sectionRef}
            scrollRef={scrollRef}
          />
        ) : showNoResults ? (
          <NoResultFound />
        ) : (
          <StartSearching />
        )}
      </div>
    </section>
  );
};
