import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ cartCount }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="nav-brand">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src="/panacea.png" alt="Panacea One Logo" />
          <span className="nav-logo">Panacea One</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>

        {/* About */}
        <div
          className="mega-wrapper"
          onMouseEnter={() => toggleDropdown("about")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <Link to="/about" className="mega-trigger" onClick={closeMenu}>
            About Panacea One ▾
          </Link>
          {openDropdown === "about" && (
            <div className="mega-menu">
              <Link to="/vision-mission" onClick={closeMenu}>Vision & Mission</Link>
              <Link to="/team" onClick={closeMenu}>Our Team</Link>
            </div>
          )}
        </div>

        {/* Healing */}
        <div
          className="mega-wrapper"
          onMouseEnter={() => toggleDropdown("healing")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <Link to="/healingsolutions" className="mega-trigger" onClick={closeMenu}>
            Healing Solutions ▾
          </Link>
          {openDropdown === "healing" && (
            <div className="mega-menu">
              <Link to="/spiritual-healing" onClick={closeMenu}>Spiritual Healing</Link>
              <Link to="/karmic-healing" onClick={closeMenu}>Karmic Healing</Link>
              <Link to="/past-life-healing" onClick={closeMenu}>Past Life Healing</Link>
              <Link to="/energy-cleansing" onClick={closeMenu}>Energy Cleansing</Link>
            </div>
          )}
        </div>

        {/* Oils */}
        <div
          className="mega-wrapper"
          onMouseEnter={() => toggleDropdown("oils")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <Link to="/panaceaoils" className="mega-trigger" onClick={closeMenu}>
            Panacea Oils ▾
          </Link>
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
      </nav>

      {/* 🛒 CART ICON */}
      <div className="nav-cart">
        <Link to="/cart" className="nav-cart" onClick={closeMenu}>
  🛒
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
