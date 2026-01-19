import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-brand">
  <img src="/panacea.png" alt="Panacea One Logo" />
  <span className="nav-logo">Panacea One</span>
</div>

      
      <nav className="nav-links">
        <Link to="/">Home</Link>

        {/* ABOUT DROPDOWN */}
        <div className="mega-wrapper">
          <Link to="/about" className="mega-trigger">
            About Panacea One ▾
          </Link>

          <div className="mega-menu">
  <div className="mega-column">
    <div className="mega-item">
      <div className="icon green">🌿</div>
      <div>
        <Link to="/vision-mission">
          <h4>Vision & Mission</h4>
        </Link>
        <p>Balance mind, body & soul</p>
      </div>
    </div>

  </div>
</div>

        </div>
           <div className="mega-wrapper">
          <Link to="/healingsolutions" className="mega-trigger">
            Healing Solutions ▾
          </Link>
          <div className="mega-menu">
    <div className="mega-column">
    <div className="mega-item">
      <div>
            <Link to="/spiritual-healing"><h4>Spiritual Healing</h4></Link>
            <Link to="/karmic-healing"><h4>Karmic Healing</h4></Link>
            <Link to="/past-life-healing"><h4>Past Life Healing</h4></Link>
            <Link to="/energy-cleansing"><h4>Energy Cleansing</h4></Link>
            </div>
          </div>
          </div>
          </div>
          </div>

        {/*<span>Healing Solutions ▾</span>*/}
        <div className="mega-wrapper">
          <Link to="/panaceaoils" className="mega-trigger">
            Panacea Oils ▾
          </Link>
          <div className="mega-menu">
            <div className="mega-column">
              <div className="mega-item">
                <div>
                   <Link to="/Relaxation-Oil"><h4>Relaxation Oil</h4></Link>
                   <Link to="/Energy-Boost-Oil"><h4>Energy Boost Oil</h4></Link>
                   <Link to="/Healing-Oil"><h4>Healing Oil</h4></Link>
                   <Link to="/Meditation-Oil"><h4>Meditation Oil</h4></Link>
                   <Link to="/Detox-Oil"><h4>Detox Oil</h4></Link>
                                  </div>
              </div>
              </div>         
               </div>
          </div>
        <span>Contact ▾</span>
 <div className="mega-wrapper">
          <Link to="/cart" className="mega-trigger">
            Cart
          </Link>
          </div>
      </nav>
    </header>
  );
}
