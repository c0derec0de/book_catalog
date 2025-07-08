import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { 
  getFavorites, 
  isBookFavorite, 
  addFavorite, 
  removeFavorite 
} from "../../services/favourite";
import { 
  getShortTitle, 
  getAuthors, 
  getDescription 
} from "../../utils/bookUtils";
import coverImage from '../../assets/cover.jpg';
import './BookCard.css';

const BookCard = ({ book, isFavorite = false, onRemove }) => {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLiked(isBookFavorite(book.id));
    }, [book.id]);

    const handleAddToFavorite = () => {
        if (isLiked) {
            removeFavorite(book.id);
            toast.info("Book deleted from favorites");
            if (isFavorite && typeof onRemove === 'function') {
                onRemove(book.id);
            }
        } else {
            addFavorite(book);
            toast.success("Book added to favorites");
        }
        setIsLiked(prev => !prev);
    };
    
    const handleCardClick = () => {
        navigate(`/book/${book.id}`);
    };

    const { fullTitle, shortTitle, isTruncated } = getShortTitle(book.volumeInfo?.title);
    const authors = getAuthors(book.volumeInfo?.authors);
    const description = getDescription(book.volumeInfo?.description);
    const cover = book.volumeInfo?.imageLinks?.thumbnail || coverImage;

    return (
        <div className="bookcard">
            <div className="bookcard__container" onClick={handleCardClick}>
                <div className="cover">
                    <img 
                      className="cover__image" 
                      src={cover} 
                      alt={`Cover of ${fullTitle}`} 
                    />
                </div>
                <div className="description">
                    <p className="description__title" title={fullTitle}>
                        {shortTitle}
                        {isTruncated && "..."}
                    </p>
                    <p className="description__actors">{authors}</p>
                    <p className="description__text">{description}</p>
                </div>
            </div>
            <div className="bookcard__favourite">
                <button 
                    className={`favourite__button ${isLiked ? 'favourite__button-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorite();
                    }}
                >
                    {isLiked ? 'Saved' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default BookCard;