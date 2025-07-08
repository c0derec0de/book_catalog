import React, { useState } from 'react';
import './HomeScreen.css';
import Header from '../../components/Header/Header.jsx';
import BookGrid from '../../components/BookGrid/BookGrid.jsx';
import { useBookSearch } from '../../hooks/useBookSearch';

const HomeScreen = () => {
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
    } = useBookSearch('javascript');

    const handleSearchFocus = () => setIsSearchFocused(true);
    const handleSearchBlur = () => setIsSearchFocused(false);

    return (
        <div className={`home ${isSearchFocused ? 'search-focused' : ''}`}>
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
            <BookGrid
                books={books}
                loading={loading}
                emptyMessage="No books found"
            />
        </div>
    );
};

export default HomeScreen;
