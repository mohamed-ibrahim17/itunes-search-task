"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import ReactDOM from "react-dom";
import { useITunesSearch } from "@/hooks/useITunesSearch";
import type { ITunesSearchResult } from "@/types/itunes-search";
import Spinner from "@/components/Spinner";
import { CardMenu } from "./shared/card-menu";
import { SliderScrollNavigation } from "./shared/scroll-navigation";

// EpisodeCard component for ITunesSearchResult
const EpisodeCard = ({
  episode,
  onMenuOpen,
  menuOpen,
}: {
  episode: ITunesSearchResult;
  onMenuOpen: (episode: ITunesSearchResult, e: React.MouseEvent) => void;
  menuOpen: boolean;
}) => {
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

// CompactEpisodeCard for ITunesSearchResult
const CompactEpisodeCard = ({
  episode,
  onMenuOpen,
  menuOpen,
}: {
  episode: ITunesSearchResult;
  onMenuOpen: (episode: ITunesSearchResult, e: React.MouseEvent) => void;
  menuOpen: boolean;
}) => {
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
  const [layoutMenuOpen, setLayoutMenuOpen] = useState(false);
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
  const showResults = searchTerm && searchResults.length > 0;
  const showNoResults = searchTerm && searchResults.length === 0;

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

  return (
    <section className="w-full mx-auto" ref={sectionRef}>
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
                  {
                    label: "Switch layout to Compact",
                    onClick: () => handleLayoutChange("compact"),
                    show: layout !== "compact",
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
              className="flex overflow-x-scroll py-3 custom-scrollbar gap-3 min-h-[180px]"
              style={{ scrollBehavior: "smooth" }}
            >
              {(episodeResults.length > 0 ? episodeResults : searchResults).map(
                (episode, idx) => {
                  const id =
                    typeof episode.trackId === "number"
                      ? episode.trackId
                      : idx + 1;
                  return (
                    <div key={id} className="snap-start">
                      <EpisodeCard
                        episode={episode}
                        onMenuOpen={handleOpenMenu}
                        menuOpen={menuState.episodeId === id}
                      />
                    </div>
                  );
                }
              )}
              {/* Portal menu rendering for search results */}
              {menuState.episodeId !== null &&
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
          ) : layout === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {(episodeResults.length > 0 ? episodeResults : searchResults).map(
                (episode, idx) => {
                  const id =
                    typeof episode.trackId === "number"
                      ? episode.trackId
                      : idx + 1;
                  return (
                    <EpisodeCard
                      key={id}
                      episode={episode}
                      onMenuOpen={handleOpenMenu}
                      menuOpen={menuState.episodeId === id}
                    />
                  );
                }
              )}
              {/* Portal menu rendering for search results */}
              {menuState.episodeId !== null &&
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 py-3">
              {(episodeResults.length > 0 ? episodeResults : searchResults).map(
                (episode, idx) => {
                  const id =
                    typeof episode.trackId === "number"
                      ? episode.trackId
                      : idx + 1;
                  return (
                    <CompactEpisodeCard
                      key={id}
                      episode={episode}
                      onMenuOpen={handleOpenMenu}
                      menuOpen={menuState.episodeId === id}
                    />
                  );
                }
              )}
              {/* Portal menu rendering for search results */}
              {menuState.episodeId !== null &&
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
            لا توجد نتائج حلقات لهذا البحث.
          </div>
        ) : (
          <div className="text-center text-gray-400 py-10">
            ابدأ بالبحث عن حلقة باستخدام شريط البحث أعلاه.
          </div>
        )}
        {/* Portal menu rendering for fallback */}
        {menuState.episodeId !== null &&
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
    </section>
  );
};
