import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './Sections/Header';
import MainContent from './Sections/MainContent';
import Liked from './Sections/Liked';
import Cart from './Sections/Cart';
import Login from './Sections/Login';
import Signup from './Sections/Signup';
import Profile from './Sections/Profile';
import AllProductsPage from './Sections/AllProductsPage';
import { auth, db, doc, getDoc, onAuthStateChanged, signOut, setDoc } from './Components/firebase'; // Import Firebase
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Checkout from './Sections/Checkout';
import ThankYou from './Sections/ThankYou';
import ProductPage from './Components/ProductPage';
import UpdateProfile from './Components/UpdateProfile';
import UpdateAddress from './Components/UpdateAddress';
import UpdatePaymentMethods from './Components/UpdatePaymentMethods';
import UpdatePreferences from './Components/UpdatePreferences';

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

const handleUpdateQuantity = (name, newQuantity) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.name === name
        ? { ...item, quantity: Math.max(newQuantity, 1) }
        : item
    )
  );
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

  const handleUpdateProfile = async (updatedData) => {
    if (user && user.uid) {
      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(userRef, {
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
          dob: updatedData.dob,
          phone: updatedData.phone,
          address: {
            street: updatedData.street,
            city: updatedData.city,
            state: updatedData.state,
            zip: updatedData.zip,
            country: updatedData.country
          },
          // Preserve existing fields not updated by this form
          email: user.email, // Assuming email is not updated via profile form
          // ... other fields you want to preserve
        }, { merge: true }); // Use merge: true to update only specified fields
        
        setUser(prevUser => ({
          ...prevUser,
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
          dob: updatedData.dob,
          phone: updatedData.phone,
          address: {
            street: updatedData.street,
            city: updatedData.city,
            state: updatedData.state,
            zip: updatedData.zip,
            country: updatedData.country
          }
        }));
        alert("Profile updated successfully!");
        navigate('/profile'); // Navigate back to profile after update
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    } else {
      alert("No user logged in to update profile.");
    }
  };

  const handleUpdateAddresses = async (updatedAddresses) => {
    if (user && user.uid) {
      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(userRef, { addresses: updatedAddresses }, { merge: true });
        setUser(prevUser => ({ ...prevUser, addresses: updatedAddresses }));
        alert("Addresses updated successfully!");
      } catch (error) {
        console.error("Error updating addresses:", error);
        alert("Failed to update addresses.");
      }
    } else {
      alert("No user logged in to update addresses.");
    }
  };

  const handleUpdatePaymentMethods = async (updatedPaymentMethods) => {
    if (user && user.uid) {
      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(userRef, { paymentMethods: updatedPaymentMethods }, { merge: true });
        setUser(prevUser => ({ ...prevUser, paymentMethods: updatedPaymentMethods }));
        alert("Payment methods updated successfully!");
      } catch (error) {
        console.error("Error updating payment methods:", error);
        alert("Failed to update payment methods.");
      }
    } else {
      alert("No user logged in to update payment methods.");
    }
  };

  const handleUpdatePreferences = async (updatedPreferences) => {
    if (user && user.uid) {
      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(userRef, { preferences: updatedPreferences }, { merge: true });
        setUser(prevUser => ({ ...prevUser, preferences: updatedPreferences }));
        alert("Preferences updated successfully!");
        navigate('/profile'); // Navigate back to profile after update
      } catch (error) {
        console.error("Error updating preferences:", error);
        alert("Failed to update preferences.");
      }
    } else {
      alert("No user logged in to update preferences.");
    }
  };

  if (loadingUser) {
    return <div>Loading user...</div>; // Or a spinner
  }

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/*" 
          element={
            <MainContent onLike={handleLike} likedProducts={likedProducts} onAddToCart={handleAddToCart} />
          }
        />
        <Route path="/liked" element={<Liked likedProducts={likedProducts} onAddToCart={handleAddToCart} onLike={handleLike} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} /> } />
        <Route path="/products" element={<AllProductsPage onLike={handleLike} likedProducts={likedProducts} onAddToCart={handleAddToCart} />} />
        
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route 
          path="/profile" 
          element={user ? <Profile user={user} onLogout={handleLogout} onUpdate={handleUpdateProfile} /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/profile/edit" 
          element={user ? <UpdateProfile user={user} onUpdate={handleUpdateProfile} /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/profile/addresses" 
          element={user ? <UpdateAddress user={user} onUpdateAddresses={handleUpdateAddresses} navigate={navigate} /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/profile/payments" 
          element={user ? <UpdatePaymentMethods user={user} onUpdatePaymentMethods={handleUpdatePaymentMethods} navigate={navigate} /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/profile/preferences" 
          element={user ? <UpdatePreferences user={user} onUpdatePreferences={handleUpdatePreferences} navigate={navigate} /> : <Login onLogin={handleLogin} />} 
        />
        <Route path="/product/:id" element={<ProductPage onLike={handleLike} likedProducts={likedProducts} onAddToCart={handleAddToCart} />} />

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
