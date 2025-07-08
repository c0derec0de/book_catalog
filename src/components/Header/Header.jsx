import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';

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
    const filterOptions = [
        { value: '', label: 'All books' },
        { value: 'ebooks', label: 'eBooks' },
        { value: 'free-ebooks', label: 'Free eBooks' },
        { value: 'full', label: 'Full view' },
        { value: 'paid-ebooks', label: 'Paid eBooks' },
        { value: 'partial', label: 'Partial view' }
    ];

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch?.(); 
        }
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className="navigate">
                    <Link to="/" className="navigate__home">Home</Link>
                    <Link to="/favourites" className="navigate__favourites">Favorites</Link>
                </div>
                
                {showSearch && (
                    <>
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
                            <button
                                onClick={onSearch}
                                className="search__button"
                            >
                                Search
                            </button>
                        </div>
                        <div className="filters">
                            <select 
                                value={filterValue}
                                onChange={(e) => onFilterChange?.(e.target.value)}
                                className="filter-dropdown"
                            >
                                {filterOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;