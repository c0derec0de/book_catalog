import React from "react";
import "./BookDetailsSkeleton.css";
import "../../shared/styles/shimmer.css";

export const BookDetailsSkeleton = () => {
  return (
    <div className="bookdetails">
      <div className="bookdetails__container">
        <div className="bookdetails__book-cover-section">
          <div className="bookdetails-skeleton__cover shimmer" />
          <div className="bookdetails-skeleton__rating shimmer" />
        </div>
        <div className="bookdetails__book-info-section">
          <div className="bookdetails-skeleton__title shimmer" />
          <div className="bookdetails-skeleton__subtitle shimmer" />
          <div className="bookdetails-skeleton__meta shimmer" />
          <div className="bookdetails-skeleton__meta shimmer" />
          <div className="bookdetails-skeleton__meta shimmer" />
          <div className="bookdetails-skeleton__meta shimmer" />
          <div className="bookdetails-skeleton__meta shimmer" />
        </div>
      </div>
      <div className="book-info-section__description">
        <div className="bookdetails-skeleton__desc-title shimmer" />
        <div className="bookdetails-skeleton__desc-line shimmer" />
        <div className="bookdetails-skeleton__desc-line shimmer" />
        <div className="bookdetails-skeleton__desc-line shimmer" />
      </div>
    </div>
  );
};
