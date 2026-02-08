import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setOpenDropdown(null);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
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

        <div
          className="mega-wrapper"
          onMouseEnter={() => setOpenDropdown("about")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <span className="mega-trigger">About Panacea One ▾</span>
          {openDropdown === "about" && (
            <div className="mega-menu">
              <Link to="/vision-mission" onClick={closeMenu}>Vision & Mission</Link>
              <Link to="/team" onClick={closeMenu}>Our Team</Link>
            </div>
          )}
        </div>

        <div
          className="mega-wrapper"
          onMouseEnter={() => setOpenDropdown("healing")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <span className="mega-trigger">Healing Solutions ▾</span>
          {openDropdown === "healing" && (
            <div className="mega-menu">
              <Link to="/spiritual-healing" onClick={closeMenu}>Spiritual Healing</Link>
              <Link to="/karmic-healing" onClick={closeMenu}>Karmic Healing</Link>
              <Link to="/past-life-healing" onClick={closeMenu}>Past Life Healing</Link>
              <Link to="/energy-cleansing" onClick={closeMenu}>Energy Cleansing</Link>
            </div>
          )}
        </div>

        <div
          className="mega-wrapper"
          onMouseEnter={() => setOpenDropdown("oils")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <span className="mega-trigger">Panacea Oils ▾</span>
          {openDropdown === "oils" && (
            <div className="mega-menu">
              <Link to="/relaxation-oil" onClick={closeMenu}>Relaxation Oil</Link>
              <Link to="/energy-boost-oil" onClick={closeMenu}>Energy Boost Oil</Link>
              <Link to="/healing-oil" onClick={closeMenu}>Healing Oil</Link>
              <Link to="/meditation-oil" onClick={closeMenu}>Meditation Oil</Link>
              <Link to="/detox-oil" onClick={closeMenu}>Detox Oil</Link>
            </div>
          )}
        </div>

        <Link to="/contact" onClick={closeMenu}>Contact</Link>

        {/* ✅ MOBILE CART TEXT */}
        <Link to="/cart" className="mobile-cart" onClick={closeMenu}>
          Cart
        </Link>
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
