import { type Book } from "./index";
import { FILTER_OPTIONS } from "../constants/constantsFilter";

export type ComponentState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export type MetaItemProps = {
  label: string;
  value: string;
};

export type BookCardProps = {
  book: Book;
  isFavorite?: boolean;
  onRemove?: (id: string) => void;
};

export type BookGridProps = {
  books: Book[];
  loading: boolean;
  emptyMessage: string;
  renderBook?: (book: Book) => React.ReactNode;
};

export type ShortTitleResult = {
  fullTitle: string;
  shortTitle: string;
  isTruncated: boolean;
};

// использую typeguards (typeof)
export type BookFilter = (typeof FILTER_OPTIONS)[number]["value"];

export type FilterOption = {
  value: BookFilter;
  label: string;
};

// пытаюсь использовать подход Discriminated Unions
export type CommonSearchProps = {
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearch: () => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  filterValue?: BookFilter;
  onFilterChange?: (value: BookFilter) => void;
};

type HeaderWithoutSearchProps = {
  showSearch?: false;
};
type HeaderWithSearchProps = CommonSearchProps & {
  showSearch: true;
};

export type HeaderProps = HeaderWithSearchProps | HeaderWithoutSearchProps;
