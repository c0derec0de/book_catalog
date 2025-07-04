import React, { useState, useEffect, useCallback } from 'react';
import './HomeScreen.css';
import Header from '../../components/Header/Header.jsx';
import '../../../styles/index.css';
import BookCard from '../../components/BookCard/BookCard.jsx';
import { fetchBooks } from '../../services/api.js';

const HomeScreen = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('javascript');

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(query, 0);
                setBooks(data.items || []);
                setError(null);
            } catch (err) {
                setError('Failed to load books. Please try again later.');
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [query]);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
    };

    return (
        
        <div className="home">
           <Header></Header>
           {loading && <div className="loading">Loading books...</div>}
           {error && <div className="error">{error}</div>}
           <div className="books-grid">
                {books.map((book) => (
                    <BookCard 
                        key={book.id}
                        book={book}
                    />
                ))}
            </div>
        </div>
    )
}

export default HomeScreen;