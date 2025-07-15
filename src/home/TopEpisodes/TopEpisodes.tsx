"use client";

import React, { useRef, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { useITunesSearch } from "@/hooks/useITunesSearch";
import type { ITunesSearchResult } from "@/types/itunes-search";
import Spinner from "@/components/Spinner";
import { SliderScrollNavigation } from "../shared/ScrollNavigation";
import { EpisodeList } from "./EpisodeList";
import { NoResultFound } from "@/components/NoResult";
import { StartSearching } from "@/components/StartSearching";
import { MenuPortal } from "../shared/MenuPortal";

// TopEpisodes section
export const TopEpisodes = () => {
  const [menuState, setMenuState] = useState<{
    episodeId: number | null;
    x: number;
    y: number;
  }>({
    episodeId: null,
    x: 0,
    y: 0,
  });
  const [layout, setLayout] = useState<"scroll" | "grid" | "compact">("grid");
  const [layoutMenuOpen, setLayoutMenuOpen] = useState<boolean>(false);
  const [layoutMenuPos, setLayoutMenuPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { searchTerm, searchResults, isLoading } = useITunesSearch();

  // Filter for episodes if possible
  const episodeResults = searchResults.filter(
    (r) => r.kind && r.kind.includes("episode")
  );
  const hasSearch = Boolean(searchTerm);
  const hasResults = searchResults.length > 0;
  const hasEpisodeResults = episodeResults.length > 0;
  const showResults = hasSearch && hasResults;
  const showNoResults = hasSearch && !hasResults;
  const episodesToShow = hasEpisodeResults ? episodeResults : searchResults;

  // Handler to open/close menu with position
  const handleOpenMenu = (episode: ITunesSearchResult, e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = rect.left + window.scrollX - 130;
    const y = rect.bottom + window.scrollY + 20;
    setMenuState((prev) =>
      prev.episodeId === (episode.trackId ?? null)
        ? { episodeId: null, x: 0, y: 0 }
        : { episodeId: episode.trackId ?? null, x, y }
    );
  };

  // Handler to close menu
  const handleCloseMenu = () => setMenuState({ episodeId: null, x: 0, y: 0 });

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
  const handleLayoutChange = (type: "scroll" | "grid" | "compact") => {
    setLayout(type);
    setLayoutMenuOpen(false);
  };

  // Layout menu items
  const layoutMenuItems = [
    {
      label: "Switch layout to Grid",
      onClick: () => handleLayoutChange("grid"),
      show: layout !== "grid",
    },
    {
      label: "Switch layout to Scroll",
      onClick: () => handleLayoutChange("scroll"),
      show: layout !== "scroll",
    },
    {
      label: "Switch layout to Compact",
      onClick: () => handleLayoutChange("compact"),
      show: layout !== "compact",
    },
  ].filter((item) => item.show);

  return (
    <section className="w-full mx-auto" ref={sectionRef}>
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4 border-b-[0.5px] py-4 px-5">
        <h2 className="text-xl font-bold text-white">
          Top episodes for {searchTerm}
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
                episodeId: null,
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

      {/* Episodes List */}
      <div className="px-3">
        {isLoading ? (
          <Spinner />
        ) : showResults ? (
          <EpisodeList
            episodes={episodesToShow}
            layout={layout}
            menuState={menuState}
            onMenuOpen={handleOpenMenu}
            onMenuClose={handleCloseMenu}
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
