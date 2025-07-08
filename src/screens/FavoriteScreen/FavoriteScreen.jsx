import React from "react";
import Header from "../../components/Header/Header";
import BookCard from "../../components/BookCard/BookCard";
import BookGrid from "../../components/BookGrid/BookGrid";
import { useFavorite } from "../../hooks/useFavorite";
import "./FavoriteScreen.css";

const FavoriteScreen = () => {
    const {
        displayedBooks,
        loading,
        searchInput,
        setSearchInput,
        isSearchFocused,
        removeBook,
        handleSearch,
        handleKeyPress,
        handleSearchFocus,
        handleSearchBlur,
    } = useFavorite();

    const emptyMessage =
        searchInput.trim() === ""
            ? "You don't have any favorite books yet"
            : "No books match your search";

    return (
        <div className={`favoritescreen ${isSearchFocused ? "search-focused" : ""}`}>
            <Header
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onSearch={handleSearch}
                onKeyPress={handleKeyPress}
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

export default FavoriteScreen;
