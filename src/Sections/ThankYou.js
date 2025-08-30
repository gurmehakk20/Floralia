import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Checkout.css';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="thank-you">
      <div className="confetti">
        {[...Array(30)].map((_, i) => (
          <div className="confetti-piece" key={i}></div>
        ))}
      </div>
      <h1>🎉 Thank you for your order!</h1>
      <p>We’ll process it and deliver it soon.</p>
    </section>
  );
};

export default ThankYou;