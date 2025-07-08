import React from "react";
import BookCardSkeleton from "../BookCard/BookCardSkeleton";
import BookCard from "../BookCard/BookCard";
import './BookGrid.css';

const BookGrid = ({ books, loading, emptyMessage = "No books found", renderBook }) => {
    if (!loading && books.length === 0) {
        return <div className="empty-message">{emptyMessage}</div>;
    }

    return (
        <div className="books-container">
            <div className="books-grid">
                {loading && books.length === 0
                    ? Array.from({ length: 10 }).map((_, i) => <BookCardSkeleton key={i} />)
                    : books.map(book => renderBook ? renderBook(book) : <BookCard key={book.id} book={book} />)
                }
            </div>
        </div>
    );
}

export default BookGrid;
