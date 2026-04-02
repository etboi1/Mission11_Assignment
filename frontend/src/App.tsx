import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<BooksPage />} />
            <Route path='/cart' element={<CartPage />}/>
            <Route path='/adminbooks' element={<AdminBooksPage />}/>
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App;
