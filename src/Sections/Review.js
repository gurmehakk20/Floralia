import React from 'react'
import '../Styles/Review.css'
import { FaStar } from "react-icons/fa";

// Illustrative reviews for this portfolio project (fictional customers).
const REVIEWS = [
  {
    name: 'Ananya S.',
    detail: 'Birthday bouquet',
    text: 'The bouquet looked even better than the pictures. It arrived fresh and beautifully arranged.',
  },
  {
    name: 'Rohan M.',
    detail: 'Anniversary roses',
    text: 'I ordered peach roses the day before our anniversary. They arrived right on time and still looked lovely a week later.',
  },
  {
    name: 'Meera K.',
    detail: 'Just because',
    text: 'Beautiful packaging and a handwritten note that made my mum smile. Ordering was simple — I will definitely be back.',
  },
];

const initials = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2);

const Review = () => {
  return (
    <section className="review" id="review" aria-labelledby="review-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Kind words</p>
          <h2 id="review-title" className="section-title">Customer Reviews</h2>
          <p className="section-sub">A few notes from people who sent a little happiness.</p>
        </div>

        <div className="review-grid">
          {REVIEWS.map((review) => (
            <figure className="review-card" key={review.name}>
              <div className="stars" role="img" aria-label="Rated 5 out of 5">
                {[0, 1, 2, 3, 4].map((i) => <FaStar key={i} aria-hidden="true" />)}
              </div>
              <blockquote>
                <p>{review.text}</p>
              </blockquote>
              <figcaption className="review-author">
                <span className="review-avatar" aria-hidden="true">{initials(review.name)}</span>
                <span>
                  <span className="review-name">{review.name}</span>
                  <span className="review-detail">{review.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Review
