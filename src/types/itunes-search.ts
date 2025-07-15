export interface ITunesSearchResult {
  trackId?: number;
  artistName?: string;
  trackName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  kind?: string;
}

export interface ITunesSearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: ITunesSearchResult[];
  isLoading: boolean;
}
