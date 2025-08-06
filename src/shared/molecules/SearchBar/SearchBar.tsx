import React from "react";
import "./SearchBar.css";
import {
  type SearchBarProps,
  type FilterOption,
} from "../../../types/propsTypes";

const FILTER_OPTION: FilterOption[] = [
  { value: "", label: "All books" },
  { value: "ebooks", label: "eBooks" },
  { value: "free-ebooks", label: "Free eBooks" },
  { value: "full", label: "Full view" },
  { value: "paid-ebooks", label: "Paid eBooks" },
  { value: "partial", label: "Partial view" },
];

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
  onSearch,
  onSearchFocus,
  onSearchBlur,
  filterValue,
  onFilterChange,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div className="searchbar-container">
      <div className="search">
        <input
          type="text"
          placeholder="🔍 Search books"
          value={searchInput}
          onChange={(e) => setSearchInput?.(e.target.value)}
          className="search__input"
          onKeyDown={handleKeyPress}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
        />
        <button onClick={() => onSearch?.()} className="search__button">
          Search
        </button>
      </div>
      <div className="filters">
        <select
          value={filterValue}
          onChange={(e) => onFilterChange?.(e.target.value)}
          className="filter-dropdown"
        >
          {FILTER_OPTION.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
