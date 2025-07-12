import React, { useState } from "react";
import "./Home.css";
import Header from "../../shared/organisms/Header/Header.jsx";
import BookGrid from "../../shared/organisms/BookGrid/BookGrid.jsx";
import { useBookSearch } from "../../features/search/hooks/useBookSearch.js";

const Home = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const {
    books,
    loading,
    searchInput,
    setSearchInput,
    filter,
    handleSearch,
    handleKeyPress,
    handleFilterChange,
  } = useBookSearch("javascript");

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => setIsSearchFocused(false);

  return (
    <div className={`home ${isSearchFocused ? "search-focused" : ""}`}>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
        filterValue={filter}
        onFilterChange={handleFilterChange}
        onSearchFocus={handleSearchFocus}
        onSearchBlur={handleSearchBlur}
      />
      <BookGrid books={books} loading={loading} emptyMessage="No books found" />
    </div>
  );
};

export default Home;
