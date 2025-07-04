import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import FavouriteScreen from './screens/FavoriteScreen/FavoriteScreen';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/favourites' element={<FavouriteScreen/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
