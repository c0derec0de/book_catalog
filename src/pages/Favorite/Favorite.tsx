import { Header } from "../../shared/organisms/Header/Header";
import { BookCard } from "../../shared/organisms/BookCard/BookCard";
import { BookGrid } from "../../shared/organisms/BookGrid/BookGrid";
import { useFavorite } from "../../features/favorite/hooks/useFavorite";
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
        showSearch={true}
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
