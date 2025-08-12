import type { Book } from "../../../types/index";

export type BookGridProps = {
  books: Book[];
  loading: boolean;
  emptyMessage: string;
  renderBook?: (book: Book) => React.ReactNode;
};
