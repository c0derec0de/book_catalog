import React, {useState, useEffect} from "react";
import Header from "../../components/Header/Header";
import BookCard from "../../components/BookCard/BookCard";
import "./FavoriteScreen.css";

const FavoriteScreen = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadFavorites = () => {
            try {
                const favorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
                setBooks(favorites);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        loadFavorites();
    }, []);

    return (
        <div className="favoritescreen">
                <Header></Header>
                <div className="favoritescreen__container">
                {books.map((book) =>  (
                    <BookCard key={book.id}
                    book={book}
                    isFavorite={true}
                    ></BookCard>))}
            </div>
        </div>
    );
}

export default FavoriteScreen;