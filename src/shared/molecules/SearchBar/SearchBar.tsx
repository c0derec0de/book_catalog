import React from "react";
import "./SearchBar.css";
import { type CommonSearchProps, type BookFilter } from "../../../types/index";
import { FILTER_OPTIONS } from "../../../constants/constantsFilter";

export const SearchBar: React.FC<CommonSearchProps> = ({
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
          onChange={(e) => onFilterChange?.(e.target.value as BookFilter)}
          className="filter-dropdown"
        >
          {FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
