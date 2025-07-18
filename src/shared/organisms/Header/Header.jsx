import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBar from '../../../shared/molecules/SearchBar/SearchBar';

const Header = ({
    searchInput,
    setSearchInput,
    onSearch,
    filterValue,
    onFilterChange,
    onSearchFocus,
    onSearchBlur,
    showSearch = true
}) => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="navigate">
                    <Link to="/" className="navigate__home">Home</Link>
                    <Link to="/favourites" className="navigate__favourites">Favorites</Link>
                </div>

                {showSearch && (
                    <SearchBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        onSearch={onSearch}
                        onSearchFocus={onSearchFocus}
                        onSearchBlur={onSearchBlur}
                        filterValue={filterValue}
                        onFilterChange={onFilterChange}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
