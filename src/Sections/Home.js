import React from "react";
import "../Styles/Home.css";
import { Link } from "react-router-dom";
import { FlowerMark } from "../Components/Logo";

const Home = () => {
  return (
    <section className="home" id="home" aria-labelledby="home-title">
      <div className="container home-grid">
        <div className="home-copy">
          <p className="eyebrow">Fresh flowers, hand-tied daily</p>
          <h1 id="home-title" className="home-title">
            Flowers that say <em>what words can&rsquo;t.</em>
          </h1>
          <p className="home-lead">
            Thoughtfully arranged blooms for birthdays, celebrations, and
            everyday moments.
          </p>
          <div className="home-actions">
            <Link to="/products" className="btn btn-lg">
              Explore Flowers <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link to={{ pathname: "/", hash: "#products" }} className="link-arrow">
              New arrivals
            </Link>
          </div>
        </div>

        <div className="home-visual">
          <div className="home-frame">
            <img
              src={`${process.env.PUBLIC_URL}/assets/bg5.jpeg`}
              alt="A bouquet of blush-pink tulips tied with satin ribbon beside a wrapped gift"
            />
          </div>
          <svg className="home-seal" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <defs>
              <path id="home-seal-path" d="M60 60 m-43 0 a43 43 0 1 1 86 0 a43 43 0 1 1 -86 0" />
            </defs>
            <circle cx="60" cy="60" r="58" className="home-seal-bg" />
            <text className="home-seal-text">
              <textPath href="#home-seal-path" textLength="268" lengthAdjust="spacing">
                FLOWERS FOR EVERY FEELING · FLORALIA ·
              </textPath>
            </text>
            <FlowerMark className="home-seal-mark" x="45" y="45" width="30" height="30" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Home;
