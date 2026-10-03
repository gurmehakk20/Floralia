import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Footer.css'
import Logo from '../Components/Logo'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="Floralia — home">
              <Logo />
            </Link>
            <p>Thoughtfully arranged blooms for birthdays, celebrations, and everyday moments.</p>
          </div>

          <nav className="footer-col" aria-labelledby="footer-shop">
            <h3 id="footer-shop">Shop</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Flowers</Link></li>
              <li><Link to="/#products">Best Sellers</Link></li>
              <li><Link to="/products">Offers</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-labelledby="footer-care">
            <h3 id="footer-care">Customer Care</h3>
            <ul>
              <li><Link to="/profile">My Account</Link></li>
              <li><Link to="/profile">My Orders</Link></li>
              <li><Link to="/liked">Wishlist</Link></li>
              <li><Link to="/#contact">Returns</Link></li>
            </ul>
          </nav>

          <div className="footer-col">
            <h3>Locations</h3>
            <ul>
              <li>India</li>
              <li>USA</li>
              <li>France</li>
              <li>Japan</li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li><a href="tel:+1234567890">+123-456-7890</a></li>
              <li><a href="mailto:example@gmail.com">example@gmail.com</a></li>
              <li>Chandigarh, India – 160017</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Floralia. All rights reserved.</p>
          <img
            src={`${process.env.PUBLIC_URL}/assets/payment.png`}
            alt="Accepted payments: American Express, PayPal, Mastercard, Visa and Discover"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
