import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/About.css'

const POINTS = [
  { title: 'Seasonal stems', text: 'Fresh each morning' },
  { title: 'Hand-tied', text: 'By experienced florists' },
  { title: 'A personal note', text: 'Handwritten on request' },
]

const About = () => {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-media">
          <video
            src={`${process.env.PUBLIC_URL}/assets/about-video.mp4`}
            loop
            autoPlay
            muted
            playsInline
            aria-hidden="true"
          ></video>
        </div>

        <div className="about-copy">
          <p className="eyebrow">Our story</p>
          <h2 id="about-title" className="section-title">
            Grown with care, <em>arranged by hand.</em>
          </h2>
          <p>
            Floralia began with a simple belief: flowers should feel personal. Every
            bouquet is hand-tied by our florists using seasonal stems, then packed with
            care so it arrives looking just as it did in the studio.
          </p>
          <p>
            Whether you&rsquo;re marking a milestone or simply thinking of someone,
            we&rsquo;ll help you find the arrangement that says it best.
          </p>

          <ul className="about-points">
            {POINTS.map((point) => (
              <li key={point.title}>
                <span className="about-point-title">{point.title}</span>
                <span className="about-point-text">{point.text}</span>
              </li>
            ))}
          </ul>

          <Link to="/products" className="link-arrow">
            Explore the collection <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
