export type MetaItemProps = {
  label: string;
  value: string;
};

export type Book = {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    averageRating?: number;
    ratingsCount?: number;
    subtitle?: string;
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    language?: string;
    categories?: string[];
  };
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
  renderBook?: (book: Book) => React.ReactNode; // необязательный т.к. используется для добавления кнопки в фейворитах
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
  showSearch: boolean;
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
