import "./BookCardSkeleton.css";
import "../../styles/shimmer.css";

export const BookCardSkeleton = () => {
  return (
    <div className="bookcard skeleton">
      <div className="bookcard__container">
        <div className="cover skeleton__cover shimmer" />
        <div className="description">
          <div className="skeleton__title shimmer" />
          <div className="skeleton__authors shimmer" />
          <div className="skeleton__description shimmer" />
          <div className="skeleton__description shimmer" />
          <div className="skeleton__description shimmer" />
        </div>
      </div>
      <div className="bookcard__favourite">
        <div className="skeleton__button shimmer" />
      </div>
    </div>
  );
};
