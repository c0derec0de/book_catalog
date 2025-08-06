import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { fetchBook } from "../../services/api/api.ts";
import coverImage from "../../assets/images/cover.jpg";
import "./BookDetails.css";
import { Header } from "../../shared/organisms/Header/Header.jsx";
import { BookDetailsSkeleton } from "./BookDetailsSkeleton.jsx";
import { MetaItem } from "../../shared/atoms/MetaItem/MetaItem.tsx";
import { type Book } from "../../types/propsTypes.ts";

export const BookDetails = () => {
  const { id } = useParams<string>();
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBook(id);
        setBook(data);
      } catch (err) {
        const errorMessage = "Failed to load book details";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) return <BookDetailsSkeleton />;
  if (!book) return <div className="not-found">Book not found</div>;

  const volumeInfo = book.volumeInfo;

  const renderRatingStars = (rating: number) => {
    const fullStars = "★".repeat(Math.round(rating));
    const emptyStars = "☆".repeat(5 - Math.round(rating));
    return fullStars + emptyStars;
  };

  return (
    <div className="bookdetails">
      <Header showSearch={false} />
      <div className="bookdetails__container">
        <div className="bookdetails__book-cover-section book-cover-section">
          <img
            className="book-cover-section__cover-image"
            src={volumeInfo?.imageLinks?.thumbnail || coverImage}
            alt={
              volumeInfo?.title ? `Cover of ${volumeInfo.title}` : "Book cover"
            }
            onError={(e) => {
              e.currentTarget.src = coverImage;
              e.currentTarget.onerror = null;
            }}
          />
          {volumeInfo?.averageRating && (
            <div className="book-cover-section__rating">
              <span className="rating__stars">
                {renderRatingStars(volumeInfo.averageRating)}
              </span>
              <span>({volumeInfo?.ratingsCount || 0} ratings)</span>
            </div>
          )}
        </div>

        <div className="bookdetails__book-info-section book-info-section">
          <h1 className="book-info-section__title">{volumeInfo?.title}</h1>
          {volumeInfo?.subtitle && (
            <h2 className="title__subtitle">{volumeInfo.subtitle}</h2>
          )}

          <div className="book-info-section__meta">
            {volumeInfo?.authors && (
              <MetaItem
                label="Authors: "
                value={volumeInfo.authors.join(", ")}
              />
            )}
            {volumeInfo?.publishedDate && (
              <MetaItem label="Published: " value={volumeInfo.publishedDate} />
            )}
            {volumeInfo?.publisher && (
              <MetaItem label="Publisher: " value={volumeInfo.publisher} />
            )}
            {volumeInfo?.pageCount && (
              <MetaItem
                label="Pages: "
                value={volumeInfo.pageCount.toString()}
              />
            )}
            {volumeInfo?.language && (
              <MetaItem
                label="Language: "
                value={volumeInfo.language.toUpperCase()}
              />
            )}
            {volumeInfo?.categories && (
              <MetaItem
                label="Categories: "
                value={volumeInfo.categories.join(", ")}
              />
            )}
          </div>
        </div>
      </div>
      {volumeInfo?.description && (
        <div className="book-info-section__description">
          <h3>Description</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(volumeInfo.description),
            }}
          />
        </div>
      )}
    </div>
  );
};
