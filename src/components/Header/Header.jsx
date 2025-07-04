import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({}) => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="navigate">
                    <Link to="/" className="navigate__home">Home</Link>
                    <Link to="favourites" className="navigate__favourites">Favourites</Link>
                </div>
                <div className="search">
                    <input
                        className="search__input"
                        type="text"
                        placeholder="🔍 Search books"
                    />
                </div>
            </div>
        </header>
    )
}
export default Header;