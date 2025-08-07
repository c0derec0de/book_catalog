import { type BooksApiResponse } from "../../types/index";
import { type Book } from "../../types/book.types";

const API_URL = "https://www.googleapis.com/books/v1/volumes";
const MAX_ITEMS = 14;
// промисы обещают вернуть заданные типы
export const fetchBooks = async (
  query: string,
  startIndex: number = 0,
  additionalFilters: string = ""
): Promise<BooksApiResponse> => {
  try {
    // применяю Utility Types
    const params: Record<string, string> = {
      q: query,
      startIndex: startIndex.toString(),
      maxResults: MAX_ITEMS.toString(),
    };
    if (additionalFilters) {
      params.filter = additionalFilters;
    }
    const response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
    // конструкция as
    return (await response.json()) as BooksApiResponse;
  } catch (error) {
    console.log("Error fetching books:", error);
    throw error;
  }
};

export const fetchBook = async (id: string): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    return (await response.json()) as Book;
  } catch (error) {
    console.log("Error fetching book:", error);
    throw error;
  }
};
