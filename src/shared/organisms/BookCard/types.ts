import type { Book } from "../../../types/index";

export type BookCardProps = {
  book: Book;
  isFavorite?: boolean;
  onRemove?: (id: string) => void;
};
