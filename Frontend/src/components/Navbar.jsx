import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      {/* LEFT: Logo */}
      <div className="nav-left">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src="/panacea.png" alt="Panacea One Logo" />
          <span className="nav-logo">Panacea One</span>
        </Link>
      </div>

      {/* RIGHT: Navigation */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/healingsolutions" onClick={closeMenu}>Healing Solutions</Link>
        <Link to="/panaceaoils" onClick={closeMenu}>Panacea Oils</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>

        {/* MOBILE CART TEXT */}
        <Link to="/cart" className="mobile-cart" onClick={closeMenu}>Cart</Link>
      </nav>

      {/* CART ICON (DESKTOP ONLY) */}
      <div className="nav-cart">
        <Link to="/cart" onClick={closeMenu} className="cart-icon">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>

      {/* Hamburger */}
      <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
