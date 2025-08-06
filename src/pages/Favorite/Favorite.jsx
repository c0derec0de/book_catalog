import React from "react";
import { Header } from "../../shared/organisms/Header/Header.tsx";
import { BookCard } from "../../shared/organisms/BookCard/BookCard.tsx";
import { BookGrid } from "../../shared/organisms/BookGrid/BookGrid.tsx";
import { useFavorite } from "../../features/favorite/hooks/useFavorite.ts";
import "./Favorite.css";

export const Favorite = () => {
  const {
    displayedBooks,
    loading,
    searchInput,
    setSearchInput,
    isSearchFocused,
    removeBook,
    handleSearch,
    handleSearchFocus,
    handleSearchBlur,
  } = useFavorite();

  const emptyMessage =
    searchInput.trim() === ""
      ? "You don't have any favorite books yet"
      : "No books match your search";

  return (
    <div
      className={`favoritescreen ${isSearchFocused ? "search-focused" : ""}`}
    >
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
      />
      <BookGrid
        books={displayedBooks}
        loading={loading}
        emptyMessage={emptyMessage}
        renderBook={(book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={true}
            onRemove={removeBook}
          />
        )}
      />
    </div>
  );
};
