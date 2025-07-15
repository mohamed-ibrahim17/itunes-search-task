import type { ITunesSearchResult } from "./itunes-search";
import type { RefObject, MouseEvent } from "react";

export type EpisodeCardProps = {
  episode: ITunesSearchResult;
  onMenuOpen: (episode: ITunesSearchResult, e: MouseEvent) => void;
  menuOpen: boolean;
};

export type CompactEpisodeCardProps = {
  episode: ITunesSearchResult;
  onMenuOpen: (episode: ITunesSearchResult, e: MouseEvent) => void;
  menuOpen: boolean;
};

export type MenuPortalProps = {
  menuState: {
    episodeId?: number | null;
    podcastId?: number | null;
    x: number;
    y: number;
  };
  onClose: () => void;
  sectionRef: RefObject<HTMLDivElement | null>;
};

export type EpisodeListProps = {
  episodes: ITunesSearchResult[];
  layout: "scroll" | "grid" | "compact";
  menuState: { episodeId: number | null; x: number; y: number };
  onMenuOpen: (episode: ITunesSearchResult, e: MouseEvent) => void;
  onMenuClose: () => void;
  sectionRef: RefObject<HTMLDivElement | null>;
  scrollRef: RefObject<HTMLDivElement | null>;
};

export type PodcastCardProps = {
  podcast: ITunesSearchResult;
  onMenuOpen: (podcast: ITunesSearchResult, e: MouseEvent) => void;
  menuOpen: boolean;
};

export type PodcastMenuPortalProps = {
  menuState: { podcastId: number | null; x: number; y: number };
  onClose: () => void;
  sectionRef: RefObject<HTMLDivElement | null>;
};

export type PodcastListProps = {
  podcasts: ITunesSearchResult[];
  layout: "scroll" | "grid";
  menuState: { podcastId: number | null; x: number; y: number };
  onMenuOpen: (podcast: ITunesSearchResult, e: MouseEvent) => void;
  onMenuClose: () => void;
  sectionRef: RefObject<HTMLDivElement | null>;
  scrollRef: RefObject<HTMLDivElement | null>;
};
