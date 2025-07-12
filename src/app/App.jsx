import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../pages/Home/Home';
import Favourite from '../pages/Favorite/Favorite';
import BookDetails from '../pages/Home/Home';
import "./index.css";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/favourites' element={<Favourite/>}/>
            <Route path='/book/:id' element={<BookDetails/>}/>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App;
