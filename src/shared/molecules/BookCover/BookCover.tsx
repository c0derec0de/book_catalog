import { type Book } from "../../../types";
import coverImage from "../../../assets/images/cover.jpg";
import "./BookCover.css";

// в Book["volumeInfo"] обращаюсь только к полям volumeInfo в типе Book
export const BookCover: React.FC<{ volumeInfo: Book["volumeInfo"] }> = ({
  volumeInfo,
}) => {
  const renderRatingStars = (rating: number) => {
    const fullStars = "★".repeat(Math.round(rating));
    const emptyStars = "☆".repeat(5 - Math.round(rating));
    return fullStars + emptyStars;
  };
  return (
    <div className="bookdetails__book-cover-section book-cover-section">
      <img
        className="book-cover-section__cover-image"
        src={volumeInfo?.imageLinks?.thumbnail || coverImage}
        alt={volumeInfo?.title ? `Cover of ${volumeInfo.title}` : "Book cover"}
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
  );
};
