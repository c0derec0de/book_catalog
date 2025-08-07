import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { SearchBar } from "../../molecules/SearchBar/SearchBar";
import { type HeaderProps } from "../../../types/index";

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="navigate">
          <Link to="/" className="navigate__home">
            Home
          </Link>
          <Link to="/favourites" className="navigate__favourites">
            Favorites
          </Link>
        </div>

        {props.showSearch ? (
          <SearchBar
            searchInput={props.searchInput}
            setSearchInput={props.setSearchInput}
            onSearch={props.onSearch}
            onSearchFocus={props.onSearchFocus}
            onSearchBlur={props.onSearchBlur}
            filterValue={props.filterValue}
            onFilterChange={props.onFilterChange}
          />
        ) : null}
      </div>
    </header>
  );
};
