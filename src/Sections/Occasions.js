import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Occasions.css';

// Slugs match the `occasions` tags in productsData.json.
export const OCCASIONS = [
  { slug: 'birthday', label: 'Birthday' },
  { slug: 'anniversary', label: 'Anniversary' },
  { slug: 'romance', label: 'Romance' },
  { slug: 'congratulations', label: 'Congratulations' },
  { slug: 'just-because', label: 'Just Because' },
];

const Occasions = () => (
  <nav className="occasions" aria-labelledby="occasions-title">
    <div className="container occasions-inner">
      <h2 id="occasions-title" className="occasions-title">Shop by occasion</h2>
      <ul className="occasions-list">
        {OCCASIONS.map((occasion) => (
          <li key={occasion.slug}>
            <Link to={`/products?occasion=${occasion.slug}`} className="occasion-link">
              {occasion.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default Occasions;
