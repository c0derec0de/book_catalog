import { type Book } from "../../../types";
import { MetaItem } from "../../atoms/MetaItem/MetaItem";
import "./BookInfo.css";

// в Book["volumeInfo"] обращаюсь только к полям volumeInfo в типе Book
export const BookInfo: React.FC<{ volumeInfo: Book["volumeInfo"] }> = ({
  volumeInfo,
}) => {
  const metaItems = [
    {
      label: "Authors:",
      value: volumeInfo?.authors?.join(", "),
      condition: !!volumeInfo?.authors && volumeInfo.authors.length > 0,
    },
    {
      label: "Published:",
      value: volumeInfo?.publishedDate,
      condition: !!volumeInfo?.publishedDate,
    },
    {
      label: "Publisher:",
      value: volumeInfo?.publisher,
      condition: !!volumeInfo?.publisher,
    },
    {
      label: "Pages:",
      value: volumeInfo?.pageCount?.toString(),
      condition: !!volumeInfo?.pageCount && volumeInfo.pageCount > 0,
    },
    {
      label: "Language:",
      value: volumeInfo?.language?.toUpperCase(),
      condition: !!volumeInfo?.language,
    },
    {
      label: "Categories:",
      value: volumeInfo?.categories?.join(", "),
      condition: !!volumeInfo?.categories && volumeInfo.categories.length > 0,
    },
  ];
  return (
    <div className="bookdetails__book-info-section book-info-section">
      <h1 className="book-info-section__title">{volumeInfo?.title}</h1>
      {volumeInfo?.subtitle && (
        <h2 className="title__subtitle">{volumeInfo.subtitle}</h2>
      )}

      <div className="book-info-section__meta">
        {metaItems.map(
          (item) =>
            item.condition && (
              <MetaItem
                key={item.label}
                label={item.label}
                value={String(item.value)}
              />
            )
        )}
      </div>
    </div>
  );
};
