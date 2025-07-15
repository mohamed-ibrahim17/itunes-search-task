"use client";

import {
  ITunesSearchContextType,
  ITunesSearchResult,
} from "@/types/itunes-search";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const ITunesSearchContext = createContext<ITunesSearchContextType | undefined>(
  undefined
);

export function ITunesSearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      return url.searchParams.get("q") || "";
    }
    return "";
  });
  const [searchResults, setSearchResults] = useState<ITunesSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (searchTerm) {
        url.searchParams.set("q", searchTerm);
      } else {
        url.searchParams.delete("q");
      }
      window.history.replaceState({}, "", url.toString());
    }

    if (!searchTerm) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const handler = setTimeout(() => {
      fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.results || []);
          setIsLoading(false);
        })
        .catch(() => {
          setSearchResults([]);
          setIsLoading(false);
        });
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <ITunesSearchContext.Provider
      value={{ searchTerm, setSearchTerm, searchResults, isLoading }}
    >
      {children}
    </ITunesSearchContext.Provider>
  );
}

export function useITunesSearch() {
  const context = useContext(ITunesSearchContext);
  if (!context) {
    throw new Error(
      "useITunesSearch must be used within an ITunesSearchProvider"
    );
  }
  return context;
}
