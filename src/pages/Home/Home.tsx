import { useState } from "react";
import "./Home.css";
import { Header } from "../../shared/organisms/Header/Header";
import { BookGrid } from "../../shared/organisms/BookGrid/BookGrid";
import { useBookSearch } from "../../features/search/hooks/useBookSearch";

export const Home = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const {
    books,
    loading,
    searchInput,
    setSearchInput,
    filter,
    handleSearch,
    handleFilterChange,
    loaderRef,
  } = useBookSearch("javascript");

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => setIsSearchFocused(false);

  return (
    <div className={`home ${isSearchFocused ? "search-focused" : ""}`}>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
        filterValue={filter}
        onFilterChange={handleFilterChange}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
        showSearch={true}
      />
      <BookGrid books={books} loading={loading} emptyMessage="No books found" />
      <div ref={loaderRef} style={{ height: "20px" }} />
    </div>
  );
};
