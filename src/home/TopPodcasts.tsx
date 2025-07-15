"use client";

import React, { useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import ReactDOM from "react-dom";
import { useITunesSearch } from "@/hooks/useITunesSearch";
import type { ITunesSearchResult } from "@/types/itunes-search";
import { CardMenu } from "./shared/card-menu";
import { SliderScrollNavigation } from "./shared/scroll-navigation";

type PodcastCardProps = {
  podcast: ITunesSearchResult;
  onMenuOpen: (podcast: ITunesSearchResult, e: React.MouseEvent) => void;
  menuOpen: boolean;
};

type MenuState = {
  podcastId: number | null;
  x: number;
  y: number;
};

type LayoutType = "scroll" | "grid";

// PodcastCard component
const PodcastCard = ({ podcast, onMenuOpen, menuOpen }: PodcastCardProps) => {
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

// TopPodcasts section
export const TopPodcasts = () => {
  const [menuState, setMenuState] = useState<MenuState>({
    podcastId: null,
    x: 0,
    y: 0,
  });
  const [layout, setLayout] = useState<LayoutType>("scroll");
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

  // Handler to open/close menu with position
  const handleOpenMenu = (podcast: ITunesSearchResult, e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    const x = rect.left + window.scrollX - 130;
    const y = rect.bottom + window.scrollY + 20;

    setMenuState((prev) =>
      prev.podcastId === podcast.trackId
        ? { podcastId: null, x: 0, y: 0 }
        : { podcastId: podcast.trackId ?? null, x, y }
    );
  };

  // Handler to close menu
  const handleCloseMenu = () => setMenuState({ podcastId: null, x: 0, y: 0 });

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
  const handleLayoutChange = (type: LayoutType) => {
    setLayout(type);
    setLayoutMenuOpen(false);
  };

  return (
    <section className="w-full mx-auto" ref={sectionRef}>
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
          {layoutMenuOpen &&
            sectionRef.current &&
            ReactDOM.createPortal(
              <CardMenu
                x={layoutMenuPos.x}
                y={layoutMenuPos.y}
                onClose={() => setLayoutMenuOpen(false)}
                items={[
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
                ].filter((item) => item.show)}
              />,
              sectionRef.current
            )}
        </div>
      </div>
      <div className="px-3">
        {isLoading ? (
          <Spinner />
        ) : showResults ? (
          layout === "scroll" ? (
            <div
              ref={scrollRef}
              className="flex overflow-x-scroll py-3 custom-scrollbar min-h-[330px]"
              style={{ scrollBehavior: "smooth" }}
            >
              {(podcastResults.length > 0 ? podcastResults : searchResults).map(
                (podcast, idx) => {
                  const id =
                    typeof podcast.trackId === "number"
                      ? podcast.trackId
                      : idx + 1;
                  return (
                    <div key={id} className="snap-start">
                      <PodcastCard
                        podcast={podcast}
                        onMenuOpen={handleOpenMenu}
                        menuOpen={menuState.podcastId === id}
                      />
                    </div>
                  );
                }
              )}
              {/* Portal menu rendering for search results */}
              {menuState.podcastId !== null &&
                sectionRef.current &&
                ReactDOM.createPortal(
                  <CardMenu
                    x={menuState.x}
                    y={menuState.y}
                    onClose={handleCloseMenu}
                  />,
                  sectionRef.current
                )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 py-3 min-h-[330px]">
              {(podcastResults.length > 0 ? podcastResults : searchResults).map(
                (podcast, idx) => {
                  const id =
                    typeof podcast.trackId === "number"
                      ? podcast.trackId
                      : idx + 1;
                  return (
                    <PodcastCard
                      key={id}
                      podcast={podcast}
                      onMenuOpen={handleOpenMenu}
                      menuOpen={menuState.podcastId === id}
                    />
                  );
                }
              )}
              {/* Portal menu rendering for search results */}
              {menuState.podcastId !== null &&
                sectionRef.current &&
                ReactDOM.createPortal(
                  <CardMenu
                    x={menuState.x}
                    y={menuState.y}
                    onClose={handleCloseMenu}
                  />,
                  sectionRef.current
                )}
            </div>
          )
        ) : showNoResults ? (
          <div className="text-center text-gray-400 py-10">
            لا توجد نتائج بودكاست لهذا البحث.
          </div>
        ) : (
          <div className="text-center text-gray-400 py-10">
            ابدأ بالبحث عن بودكاست باستخدام شريط البحث أعلاه.
          </div>
        )}
      </div>
    </section>
  );
};
