import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Sections/Header';
import Home from './Sections/Home';
import About from './Sections/About';
import Products from './Sections/Products';
import Review from './Sections/Review';
import Contact from './Sections/Contact';
import Icon from './Sections/Icon';
import Footer from './Sections/Footer';
import Liked from './Sections/Liked';
import Cart from './Sections/Cart';
import './App.css';

function App() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleLike = (product) => {
    setLikedProducts(prevLikedProducts => {
      const isLiked = prevLikedProducts.some(item => item.name === product.name);
      if (isLiked) {
        return prevLikedProducts.filter(item => item.name !== product.name);
      } else {
        return [...prevLikedProducts, product];
      }
    });
  };

  const handleAddToCart = (product) => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(item => item.name === product.name);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productName) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.name !== productName)
    );
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <About />
            <Products onLike={handleLike} likedProducts={likedProducts} onAddToCart={handleAddToCart} />
            <Review />
            <Contact />
            <Icon />
            <Footer />
          </>
        } />
        <Route path="/liked" element={<Liked likedProducts={likedProducts} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
