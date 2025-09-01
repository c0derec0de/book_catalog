import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { fetchBooks } from "../../../services/api/api";
import { type Book, type BookFilter } from "../../../types/index";
import { useInfiniteScroll } from "../../loading/hooks/useInfiniteScroll";

const DEFAULT_QUERY = "javascript";

type UseBookSearchReturn = {
  books: Book[];
  loading: boolean;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  filter: BookFilter;
  handleSearch: () => void;
  handleFilterChange: (newFilter: BookFilter) => void;
  loaderRef: React.RefObject<HTMLDivElement | null>;
};

export const useBookSearch = (
  initialQuery: string = DEFAULT_QUERY
): UseBookSearchReturn => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(initialQuery);
  const [filter, setFilter] = useState<BookFilter>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>(initialQuery);

  const startIndexRef = useRef<number>(0);

  const filterUniqueBooks = (
    newBooks: Book[],
    currentBooks: Book[]
  ): Book[] => {
    const bookIds = new Set(currentBooks.map((book) => book.id));
    return newBooks.filter((book) => !bookIds.has(book.id));
  };

  const loadBooks = useCallback(
    async (isNewSearch: boolean = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const newStartIndex = isNewSearch ? 0 : startIndexRef.current;
        const searchQuery = query.trim() || "books";

        const data = await fetchBooks(searchQuery, newStartIndex, filter);
        const newBooks = data?.items || [];

        if (isNewSearch && newBooks.length === 0) {
          toast.info("Ничего не найдено по вашему запросу");
        }

        setBooks((prevBooks) => {
          const uniqueNewBooks = isNewSearch
            ? newBooks
            : filterUniqueBooks(newBooks, prevBooks);
          return isNewSearch
            ? uniqueNewBooks
            : [...prevBooks, ...uniqueNewBooks];
        });

        startIndexRef.current = newStartIndex + newBooks.length;
        setHasMore(newBooks.length > 0);
      } catch (err) {
        console.error("Book loading error:", err);
        toast.error("Ошибка загрузки книг. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    },
    [loading, query, filter]
  );

  useEffect(() => {
    loadBooks(true);
  }, [query, filter]);

  const handleSearch = () => setQuery(searchInput);
  const handleFilterChange = (newFilter: BookFilter) => setFilter(newFilter);

  const loaderRef = useInfiniteScroll<HTMLDivElement>({
    hasMore,
    onLoadMore: () => loadBooks(false),
    rootMargin: "0px 0px 200px 0px",
    threshold: 0,
  });

  return {
    books,
    loading,
    searchInput,
    setSearchInput,
    filter,
    handleSearch,
    handleFilterChange,
    loaderRef,
  };
};
