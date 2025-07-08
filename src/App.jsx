import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import FavouriteScreen from './screens/FavoriteScreen/FavoriteScreen';
import BookDetailsScreen from './screens/BookDetailsScreen/BookDetailsScreen';
import "../styles/index.css";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/favourites' element={<FavouriteScreen/>}/>
            <Route path='/book/:id' element={<BookDetailsScreen/>}/>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App;
