import { type Book } from "../../../types";
import { MetaItem } from "../../atoms/MetaItem/MetaItem";
import "./BookInfo.css";

// в Book["volumeInfo"] обращаюсь только к полям volumeInfo в типе Book
export const BookInfo: React.FC<{ volumeInfo: Book["volumeInfo"] }> = ({
  volumeInfo,
}) => {
  return (
    <div className="bookdetails__book-info-section book-info-section">
      <h1 className="book-info-section__title">{volumeInfo?.title}</h1>
      {volumeInfo?.subtitle && (
        <h2 className="title__subtitle">{volumeInfo.subtitle}</h2>
      )}

      <div className="book-info-section__meta">
        {volumeInfo?.authors && (
          <MetaItem label="Authors: " value={volumeInfo.authors.join(", ")} />
        )}
        {volumeInfo?.publishedDate && (
          <MetaItem label="Published: " value={volumeInfo.publishedDate} />
        )}
        {volumeInfo?.publisher && (
          <MetaItem label="Publisher: " value={volumeInfo.publisher} />
        )}
        {volumeInfo?.pageCount && (
          <MetaItem label="Pages: " value={volumeInfo.pageCount.toString()} />
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
  );
};
