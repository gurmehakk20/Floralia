import React, { useState } from 'react';
import '../Styles/Auth.css';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, db, doc, setDoc, getDoc } from '../Components/firebase';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUserDoc = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // New user, create a profile
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        createdAt: new Date(),
        // Add other default profile details here
        orders: [],
        addresses: [],
        paymentMethods: []
      });
    }
    // Fetch the user data (whether newly created or existing)
    const userData = (await getDoc(userRef)).data();
    onLogin(userData);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleUserDoc(userCredential.user);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await handleUserDoc(result.user);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <section className="login" id="login">
      <h1 className="heading"><span>Login</span></h1>
      <form onSubmit={handleEmailLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          className="box" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="box" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" className="btn" />
        <button 
          type="button" 
          className="google-btn" 
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </section>
  );
};

export default Login;
