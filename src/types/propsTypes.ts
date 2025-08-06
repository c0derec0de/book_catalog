export type MetaItemProps = {
  label: string;
  value: string;
};

export type Book = {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
};

export type BookCardProps = {
  book: Book;
  isFavorite: boolean;
  onRemove: (id: string) => void;
};
