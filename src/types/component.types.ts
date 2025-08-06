import { type Book } from "./index";

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

type CommonSearchProps = {
  searchInput?: string;
  setSearchInput?: (value: string) => void;
  onSearch?: () => void;
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
};

export type SearchBarProps = CommonSearchProps;

export type HeaderProps = CommonSearchProps & {
  showSearch?: boolean;
};

export type FilterOption = {
  value: string;
  label: string;
};

export type ShortTitleResult = {
  fullTitle: string;
  shortTitle: string;
  isTruncated: boolean;
};
