import { FILTER_OPTIONS } from "../constants/constantsFilter";

export type ComponentState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export type ShortTitleResult = {
  fullTitle: string;
  shortTitle: string;
  isTruncated: boolean;
};

export type BookFilter = (typeof FILTER_OPTIONS)[number]["value"];

export type FilterOption = {
  value: BookFilter;
  label: string;
};

export type CommonSearchProps = {
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearch: () => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  filterValue?: BookFilter;
  onFilterChange?: (value: BookFilter) => void;
};
