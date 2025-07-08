export const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
};
  
export const saveFavorites = (favorites) => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favorites));
};
  
export const isBookFavorite = (bookId) => {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === bookId);
};
  
export const addFavorite = (book) => {
    const favorites = getFavorites();
    const bookToAdd = {
      id: book.id,
      volumeInfo: {
        title: book.volumeInfo?.title,
        authors: book.volumeInfo?.authors,
        description: book.volumeInfo?.description,
        imageLinks: book.volumeInfo?.imageLinks
      }
    };
    saveFavorites([...favorites, bookToAdd]);
};
  
export const removeFavorite = (bookId) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== bookId);
    saveFavorites(updatedFavorites);
    return updatedFavorites;
};