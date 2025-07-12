import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { fetchBooks } from "../../../services/api/api";

const DEFAULT_QUERY = "javascript";
const SCROLL_THROTTLE_DELAY = 200;
const SCROLL_LOAD_OFFSET = 500;

export const useBookSearch = (initialQuery = DEFAULT_QUERY) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [searchInput, setSearchInput] = useState(initialQuery);

  const loadingRef = useRef(false);
  const startIndexRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  const filterUniqueBooks = (newBooks, currentBooks) => {
    const bookIds = new Set(currentBooks.map((book) => book.id));
    return newBooks.filter((book) => !bookIds.has(book.id));
  };

  const loadBooks = useCallback(
    async (reset = false) => {
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

  const handleSearch = useCallback(() => {
    if (searchInput.trim() === "") {
      toast.info("All available books are shown");
    }
    setQuery(searchInput.trim());
    startIndexRef.current = 0;
    loadBooks(true);
  }, [loadBooks, searchInput]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") handleSearch();
    },
    [handleSearch]
  );

  const handleFilterChange = useCallback(
    (newFilter) => {
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
    handleKeyPress,
    handleFilterChange,
  };
};
