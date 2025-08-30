import React from "react";
import "../Styles/Home.css";

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="content">
        <h3>Fresh Flowers</h3>
        <span>Natural & Beautiful Blooms</span>
        <p>
          Discover our curated selection of fresh, vibrant flowers designed to
          bring joy and elegance to every moment. Hand-picked and delivered with
          love.
        </p>
        <a href="#shop" className="btn">
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Home;
