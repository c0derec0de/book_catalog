import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { fetchBooks } from "../../../services/api/api.ts";
import { type Book, type UseBookSearchReturn } from "../../../types/propsTypes";

const DEFAULT_QUERY = "javascript";
const SCROLL_THROTTLE_DELAY = 200;
const SCROLL_LOAD_OFFSET = 500;

export const useBookSearch = (
  initialQuery: string = DEFAULT_QUERY
): UseBookSearchReturn => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>(initialQuery);

  const loadingRef = useRef<boolean>(false);
  const startIndexRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);

  const filterUniqueBooks = (
    newBooks: Book[],
    currentBooks: Book[]
  ): Book[] => {
    const bookIds = new Set(currentBooks.map((book) => book.id));
    return newBooks.filter((book) => !bookIds.has(book.id));
  };

  const loadBooks = useCallback(
    async (reset: boolean = false) => {
      if (loadingRef.current) return;

      loadingRef.current = true;
      setLoading(true);

      try {
        const newStartIndex = reset ? 0 : startIndexRef.current;
        const searchQuery = searchInput.trim() || "books";

        const data = await fetchBooks(searchQuery, newStartIndex, filter);
        const newBooks = data.items || [];
        const uniqueNewBooks = filterUniqueBooks(newBooks, books);

        if (reset && uniqueNewBooks.length === 0 && searchQuery !== "books") {
          toast.info("Nothing was found for your query");
        }

        setBooks((prev) =>
          reset ? uniqueNewBooks : [...prev, ...uniqueNewBooks]
        );
        startIndexRef.current = newStartIndex + uniqueNewBooks.length;
        setHasMore(uniqueNewBooks.length > 0);
      } catch (err) {
        toast.error("Book loading error. Please try again later.");
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [books, filter, searchInput]
  );

  const handleSearch = useCallback((): void => {
    if (searchInput.trim() === "") {
      toast.info("All available books are shown");
    }
    setQuery(searchInput.trim());
    startIndexRef.current = 0;
    loadBooks(true);
  }, [loadBooks, searchInput]);

  const handleFilterChange = useCallback(
    (newFilter: string): void => {
      setFilter(newFilter);
      startIndexRef.current = 0;
      loadBooks(true);
    },
    [loadBooks]
  );

  useEffect(() => {
    const controller = new AbortController();
    loadBooks(true);
    return () => controller.abort();
  }, [query, filter]);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();

      // троттлинг
      if (now - lastScrollTimeRef.current < SCROLL_THROTTLE_DELAY) return;
      lastScrollTimeRef.current = now;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const isNearBottom =
        scrollTop + clientHeight >= scrollHeight - SCROLL_LOAD_OFFSET;

      if (isNearBottom && !loadingRef.current && hasMore) {
        loadBooks();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadBooks]);

  return {
    books,
    loading,
    searchInput,
    setSearchInput,
    filter,
    handleSearch,
    handleFilterChange,
  };
};
