import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "../pages/Home/Home";
import { Favorite } from "../pages/Favorite/Favorite";
import { BookDetails } from "../pages/BookDetails/BookDetails";
import "./index.css";
import React from "react";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favorite />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}
