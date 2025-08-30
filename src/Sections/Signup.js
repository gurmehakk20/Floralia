import React, { useState } from 'react';
import '../Styles/Auth.css';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, db, doc, setDoc, getDoc } from '../Components/firebase';

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUserDoc = async (user, userName) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: userName || user.displayName || user.email.split('@')[0],
        createdAt: new Date(),
        orders: [],
        addresses: [],
        paymentMethods: []
      });
    }
    const userData = (await getDoc(userRef)).data();
    onSignup(userData);
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await handleUserDoc(userCredential.user, name);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await handleUserDoc(result.user, result.user.displayName);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <section className="signup" id="signup">
      <h1 className="heading"><span>Sign Up</span></h1>
      <form onSubmit={handleEmailSignup}>
        <input 
          type="text" 
          placeholder="Name" 
          className="box" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className="box" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type="submit" value="Sign Up" className="btn" />
        <button 
          type="button" 
          className="google-btn" 
          onClick={handleGoogleSignup}
        >
          Sign up with Google
        </button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </section>
  );
};

export default Signup;
