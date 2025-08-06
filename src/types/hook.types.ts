import { type Book } from "./index";

export type UseBookSearchReturn = {
  books: Book[];
  loading: boolean;
  searchInput: string;
  setSearchInput: React.Dispatch<string | ((prevState: string) => string)>;
  filter: string;
  handleSearch: () => void;
  handleFilterChange: (newFilter: string) => void;
};

export type UseFavoriteReturn = {
  displayedBooks: Book[];
  loading: boolean;
  searchInput: string;
  setSearchInput: React.Dispatch<string | ((prevState: string) => string)>;
  isSearchFocused: boolean;
  removeBook: (bookId: string) => void;
  handleSearch: () => void;
  handleSearchFocus: () => void;
  handleSearchBlur: () => void;
};
