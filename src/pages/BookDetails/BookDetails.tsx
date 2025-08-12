import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { fetchBook } from "../../services/api/api";
import "./BookDetails.css";
import { Header } from "../../shared/organisms/Header/Header";
import { BookDetailsSkeleton } from "./BookDetailsSkeleton";
import { type Book } from "../../types/index";
import { BookInfo } from "../../shared/molecules/BookInfo/BookInfo";
import { BookCover } from "../../shared/molecules/BookCover/BookCover";

export const BookDetails = () => {
  const { id } = useParams<string>();
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

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

  return (
    <div className="bookdetails">
      <Header showSearch={false} />
      <div className="bookdetails__container">
        <BookCover volumeInfo={volumeInfo} />
        <BookInfo volumeInfo={volumeInfo} />
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
