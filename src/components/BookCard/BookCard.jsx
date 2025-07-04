import React, { useState, useEffect } from "react";
import coverImage from '../../assets/cover.jpg';
import './BookCard.css';

const BookCard = ({ book, isFavorite = false }) => {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
        setIsLiked(favorites.some(fav => fav.id === book.id));
    }, [book.id]);

    const addToFavourite = () => {
        const favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
        
        if (isLiked) {
            const updatedFavorites = favoriteBooks.filter(fav => fav.id !== book.id);
            localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
        } else {
            const bookToAdd = {
                id: book.id,
                volumeInfo: {
                    title: book.volumeInfo?.title,
                    authors: book.volumeInfo?.authors,
                    description: book.volumeInfo?.description,
                    imageLinks: book.volumeInfo?.imageLinks
                }
            };
            localStorage.setItem(
                'favoriteBooks', 
                JSON.stringify([...favoriteBooks, bookToAdd])
            );
        }
        
        setIsLiked(!isLiked);
    };

    const fullTitle = book.volumeInfo?.title || "No title";
    const shortTitle = fullTitle.split('.')[0].substring(0, 50);
    const authors = book.volumeInfo?.authors?.join(', ') || "Without author";
    const description = book.volumeInfo?.description?.substring(0, 100) + '...' || "No description available";
    const cover = book.volumeInfo?.imageLinks?.thumbnail || coverImage;

    return (
        <div className="bookcard">
            <div className="bookcard__container">
                <div className="cover">
                    <img className="cover__image" src={cover} alt={`Cover of ${fullTitle}`} />
                </div>
                <div className="description">
                    <p className="description__title" title={fullTitle}>
                        {shortTitle}
                        {fullTitle !== shortTitle && "..."}
                    </p>
                    <p className="description__actors">{authors}</p>
                    <p className="description__text">{description}</p>
                </div>
                <div className="favourite">
                    <button 
                        className={`favourite__button${isLiked ? 'active' : ''}`}
                        onClick={addToFavourite}
                    >
                        {isLiked ? 'Saved' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;