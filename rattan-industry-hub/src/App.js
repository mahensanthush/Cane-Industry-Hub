import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';


import Shop from './pages/Shop';
import Suppliers from './pages/Suppliers';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import Checkout from './pages/Checkout'; 

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;