import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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
      {/* Logo on Left */}
      <div className="nav-brand">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src="/panacea.png" alt="Panacea One Logo" />
          <span className="nav-logo">Panacea One</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>

        {/* ABOUT DROPDOWN */}
        <div
          className="mega-wrapper"
          onMouseEnter={() => toggleDropdown("about")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <span className="mega-trigger">About Panacea One ▾</span>
          {openDropdown === "about" && (
            <div className="mega-menu">
              <div className="mega-column">
                <div className="mega-item">
                  <div className="icon green">🌿</div>
                  <div>
                    <Link to="/vision-mission" onClick={closeMenu}>
                      <h4>Vision & Mission</h4>
                    </Link>
                    <p>Balance mind, body & soul</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* HEALING SOLUTIONS DROPDOWN */}
        <div
          className="mega-wrapper"
          onMouseEnter={() => toggleDropdown("healing")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <span className="mega-trigger">Healing Solutions ▾</span>
          {openDropdown === "healing" && (
            <div className="mega-menu">
              <div className="mega-column">
                <div className="mega-item">
                  <Link to="/spiritual-healing" onClick={closeMenu}>
                    <h4>Spiritual Healing</h4>
                  </Link>
                  <Link to="/karmic-healing" onClick={closeMenu}>
                    <h4>Karmic Healing</h4>
                  </Link>
                  <Link to="/past-life-healing" onClick={closeMenu}>
                    <h4>Past Life Healing</h4>
                  </Link>
                  <Link to="/energy-cleansing" onClick={closeMenu}>
                    <h4>Energy Cleansing</h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PANACEA OILS DROPDOWN */}
        <div
          className="mega-wrapper"
          onMouseEnter={() => toggleDropdown("oils")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <span className="mega-trigger">Panacea Oils ▾</span>
          {openDropdown === "oils" && (
            <div className="mega-menu">
              <div className="mega-column">
                <div className="mega-item">
                  <Link to="/Relaxation-Oil" onClick={closeMenu}>
                    <h4>Relaxation Oil</h4>
                  </Link>
                  <Link to="/Energy-Boost-Oil" onClick={closeMenu}>
                    <h4>Energy Boost Oil</h4>
                  </Link>
                  <Link to="/Healing-Oil" onClick={closeMenu}>
                    <h4>Healing Oil</h4>
                  </Link>
                  <Link to="/Meditation-Oil" onClick={closeMenu}>
                    <h4>Meditation Oil</h4>
                  </Link>
                  <Link to="/Detox-Oil" onClick={closeMenu}>
                    <h4>Detox Oil</h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        // TEMP: forcing Git to detect change


        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </nav>

      {/* Hamburger menu on RIGHT for mobile */}
      <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
