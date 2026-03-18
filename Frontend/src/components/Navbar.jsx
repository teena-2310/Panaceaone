import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // 👈 change here
import "./Navbar.css";

export default function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // 👇 function to apply active class
  const navClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header className="navbar">
      {/* LEFT: Logo */}
      <div className="nav-left">
        <NavLink to="/" className="logo-link" onClick={closeMenu}>
          <img src="/panacea.png" alt="Panacea One Logo" />
          <div className="Navbar-logo-text">
            <h2>PANACEA ONE</h2>
            <p>Heal from within , Glow from outside</p>
          </div>
        </NavLink>
      </div>

      {/* RIGHT: Navigation */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" className={navClass} onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/about" className={navClass} onClick={closeMenu}>
          About
        </NavLink>
        <NavLink
          to="/healingsolutions"
          className={navClass}
          onClick={closeMenu}
        >
          Healing Solutions
        </NavLink>
        <NavLink to="/panaceaoils" className={navClass} onClick={closeMenu}>
          Panacea Oils
        </NavLink>
        <NavLink to="/contact" className={navClass} onClick={closeMenu}>
          Contact
        </NavLink>

        {/* MOBILE CART TEXT */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `mobile-cart ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          Cart
        </NavLink>
      </nav>

      {/* CART ICON (DESKTOP ONLY) */}
      <div className="nav-cart">
        <NavLink
          to="/cart"
          onClick={closeMenu}
          className={({ isActive }) => `cart-icon ${isActive ? "active" : ""}`}
        >
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
        </NavLink>
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
