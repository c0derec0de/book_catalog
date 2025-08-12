import React from "react";
import { BookCardSkeleton } from "../BookCard/BookCardSkeleton";
import { BookCard } from "../BookCard/BookCard";
import "./BookGrid.css";
import { type Book } from "../../../types/index";
import { type BookGridProps } from "./types";

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  loading,
  emptyMessage = "No books found",
  renderBook,
}) => {
  if (!loading && books.length === 0) {
    return <div className="empty-message">{emptyMessage}</div>;
  }

  const renderGridContent = () => {
    if (loading && books.length === 0) {
      return Array.from({ length: 10 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ));
    }
    return books.map((book: Book) =>
      renderBook ? (
        <React.Fragment key={book.id}>{renderBook(book)}</React.Fragment>
      ) : (
        <BookCard key={book.id} book={book} />
      )
    );
  };

  return (
    <div className="books-container">
      <div className="books-grid">{renderGridContent()}</div>
    </div>
  );
};
