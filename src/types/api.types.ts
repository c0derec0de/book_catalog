import { type Book } from "./index";

export type BooksApiResponse = {
  kind: string;
  totalItems: number;
  items?: Book[];
};
