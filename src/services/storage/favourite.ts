import { type Book } from "../../types/index";

export const getFavorites = (): Book[] => {
  const favoritesJson = localStorage.getItem("favoriteBooks");
  return favoritesJson ? (JSON.parse(favoritesJson) as Book[]) : [];
};

export const saveFavorites = (favorites: Book[]) => {
  localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
};

export const isBookFavorite = (bookId: string): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === bookId);
};

export const addFavorite = (book: Book) => {
  const favorites = getFavorites();
  const bookToAdd = {
    id: book.id,
    volumeInfo: {
      title: book.volumeInfo?.title,
      authors: book.volumeInfo?.authors,
      description: book.volumeInfo?.description,
      imageLinks: book.volumeInfo?.imageLinks,
    },
  };
  saveFavorites([...favorites, bookToAdd]);
};

export const removeFavorite = (bookId: string): Book[] => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav.id !== bookId);
  saveFavorites(updatedFavorites);
  return updatedFavorites;
};
