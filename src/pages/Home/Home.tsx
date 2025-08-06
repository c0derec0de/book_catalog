import React, { useState } from "react";
import "./Home.css";
import Header from "../../shared/organisms/Header/Header.tsx";
import BookGrid from "../../shared/organisms/BookGrid/BookGrid.tsx";
import { useBookSearch } from "../../features/search/hooks/useBookSearch.ts";

const Home = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const {
    books,
    loading,
    searchInput,
    setSearchInput,
    filter,
    handleSearch,
    handleFilterChange,
  } = useBookSearch("javascript");

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => setIsSearchFocused(false);

  return (
    <div className={`home ${isSearchFocused ? "search-focused" : ""}`}>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={() => handleSearch()}
        filterValue={filter}
        onFilterChange={(value) => handleFilterChange(value)}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
        showSearch={isSearchFocused}
      />
      <BookGrid books={books} loading={loading} emptyMessage="No books found" />
    </div>
  );
};

export default Home;
