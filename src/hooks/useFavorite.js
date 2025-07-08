import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useFavorite = (initialSearch = "") => {
    const [allBooks, setAllBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(initialSearch);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        const loadFavorites = () => {
            try {
                const favorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
                setAllBooks(favorites);
                setDisplayedBooks(favorites);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load favorites");
            } finally {
                setLoading(false);
            }
        };
        loadFavorites();
    }, []);

    const removeBook = (bookId) => {
        const favorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
        const updatedFavorites = favorites.filter(book => book.id !== bookId);
        localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
        setAllBooks(updatedFavorites);
        handleSearch(searchInput, updatedFavorites); 
    };

    const handleSearch = (searchValue = searchInput, booksToSearch = allBooks) => {
        if (searchValue.trim() === "") {
            setDisplayedBooks(booksToSearch);
            return;
        }

        const searchTerm = searchValue.toLowerCase();
        const filtered = booksToSearch.filter(book => 
            book.title?.toLowerCase().includes(searchTerm) ||
            book.authors?.join(", ").toLowerCase().includes(searchTerm)
        );

        setDisplayedBooks(filtered);
        
        if (filtered.length === 0) {
            toast.info("No favorites match your search");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setIsSearchFocused(false);
    };

    return {
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
    };
};