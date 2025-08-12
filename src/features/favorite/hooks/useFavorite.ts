import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { type Book } from "../../../types/book.types";

type UseFavoriteReturn = {
  displayedBooks: Book[];
  loading: boolean;
  searchInput: string;
  setSearchInput: (value: string) => void;
  isSearchFocused: boolean;
  removeBook: (bookId: string) => void;
  handleSearch: () => void;
  handleSearchFocus: () => void;
  handleSearchBlur: () => void;
};

export const useFavorite = (initialSearch: string = ""): UseFavoriteReturn => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const favorites = JSON.parse(
          localStorage.getItem("favoriteBooks") || "[]"
        );
        setAllBooks(favorites);
        setDisplayedBooks(favorites);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  const removeBook = (bookId: string) => {
    const favorites = JSON.parse(localStorage.getItem("favoriteBooks") || "[]");
    const updatedFavorites = favorites.filter(
      (book: Book): boolean => book.id !== bookId
    );
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
    setAllBooks(updatedFavorites);
    handleSearch(searchInput, updatedFavorites);
  };

  const handleSearch = (
    searchValue: string = searchInput,
    booksToSearch: Book[] = allBooks
  ): void => {
    if (searchValue.trim() === "") {
      setDisplayedBooks(booksToSearch);
      return;
    }

    const searchTerm = searchValue.toLowerCase();
    const filtered = booksToSearch.filter(
      (book) =>
        book.volumeInfo?.title?.toLowerCase().includes(searchTerm) ||
        book.volumeInfo?.authors?.join(", ").toLowerCase().includes(searchTerm)
    );

    setDisplayedBooks(filtered);

    if (filtered.length === 0) {
      toast.info("No favorites match your search");
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return {
    displayedBooks,
    loading,
    searchInput,
    setSearchInput,
    isSearchFocused,
    removeBook,
    handleSearch,
    handleSearchFocus,
    handleSearchBlur,
  };
};
