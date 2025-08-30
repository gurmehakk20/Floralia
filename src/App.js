import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './Sections/Header';
import MainContent from './Sections/MainContent';
import Liked from './Sections/Liked';
import Cart from './Sections/Cart';
import Login from './Sections/Login';
import Signup from './Sections/Signup';
import Profile from './Sections/Profile';
import { auth, db, doc, getDoc, onAuthStateChanged, signOut } from './Components/firebase'; // Import Firebase
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Components/test'; // Test Firestore connection


function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); // User authentication state
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in, fetch profile data from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          // Should ideally not happen if signup/login creates the doc
          setUser({ uid: currentUser.uid, email: currentUser.email, name: currentUser.displayName || currentUser.email.split('@')[0] });
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

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

  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const handleSignup = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out.");
    }
  };

  if (loadingUser) {
    return <div>Loading user...</div>; // Or a spinner
  }

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route 
          path="/*" 
          element={
            <MainContent onLike={handleLike} likedProducts={likedProducts} onAddToCart={handleAddToCart} />
          }
        />
        <Route path="/liked" element={<Liked likedProducts={likedProducts} onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route 
          path="/profile" 
          element={user ? <Profile user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} 
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
