export type Book = {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    averageRating?: number;
    ratingsCount?: number;
    subtitle?: string;
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    language?: string;
    categories?: string[];
  };
};
