import React, { useEffect, useState } from 'react';
import '../Styles/Header.css';
import { LuHeart, LuShoppingBag, LuUser, LuMenu, LuX } from "react-icons/lu";
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Components/Logo';

const NAV_LINKS = [
  { label: 'Home', to: { pathname: '/' }, isActive: (loc) => loc.pathname === '/' && !loc.hash },
  { label: 'Shop', to: { pathname: '/products' }, isActive: (loc) => loc.pathname.startsWith('/product') },
  { label: 'About', to: { pathname: '/', hash: '#about' }, isActive: (loc) => loc.pathname === '/' && loc.hash === '#about' },
  { label: 'Reviews', to: { pathname: '/', hash: '#review' }, isActive: (loc) => loc.pathname === '/' && loc.hash === '#review' },
  { label: 'Contact', to: { pathname: '/', hash: '#contact' }, isActive: (loc) => loc.pathname === '/' && loc.hash === '#contact' },
];

const Header = ({ user, cartCount = 0, likedCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the mobile menu is open: Escape closes it and the page behind doesn't scroll.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const skipToContent = (e) => {
    e.preventDefault();
    const main = document.getElementById('main');
    if (main) main.focus();
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a href="#main" className="skip-link" onClick={skipToContent}>Skip to content</a>

      <div className="header-inner">
        <Link to="/" className="logo" aria-label="Floralia — home">
          <Logo />
        </Link>

        <nav id="primary-nav" className={`navbar ${menuOpen ? 'active' : ''}`} aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = link.isActive(location);
            return (
              <Link
                key={link.label}
                to={link.to}
                className={active ? 'active' : ''}
                aria-current={active ? 'page' : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="icons">
          <Link to="/liked" className="icon-btn" aria-label={`Wishlist${likedCount ? `, ${likedCount} saved` : ''}`}>
            <LuHeart aria-hidden="true" />
            {likedCount > 0 && <span className="icon-count" aria-hidden="true">{likedCount}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" aria-label={`Cart${cartCount ? `, ${cartCount} items` : ''}`}>
            <LuShoppingBag aria-hidden="true" />
            {cartCount > 0 && <span className="icon-count" aria-hidden="true">{cartCount}</span>}
          </Link>
          <Link to={user ? '/profile' : '/login'} className="icon-btn" aria-label={user ? 'Your profile' : 'Log in'}>
            <LuUser aria-hidden="true" />
          </Link>
          <button
            type="button"
            id="toggler"
            className="icon-btn menu-toggle"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="nav-backdrop" onClick={closeMenu} aria-hidden="true" />
    </header>
  )
}

export default Header;
