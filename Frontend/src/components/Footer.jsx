import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Logo Section */}
        <div className="footer-logo">
          <img
            src="/panacea.png"
            alt="Panacea One Logo"
            className="footer-logo-img"
          />
          <div className="footer-logo-text">
            <h2>PANACEA ONE</h2>
            <p>Heal from within , Glow from outside</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Panacea One</a></li>
              <li><a href="/healingsolutions">Healing Solutions</a></li>
              <li><a href="/Panaceaoils">Panacea Oils</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h4>Connect</h4>
            <ul>
              <li>
                📍 62, M3 Black, Police Quarters, S.M. Nagar,<br />
                Avadi, Chennai 600062
              </li>

              <li>
                📞{" "}
                <a href="tel:+919498103668" className="footer-link">
                  +91 94981 03668
                </a>
              </li>

              <li>
                ✉️{" "}
                <a
                  href="mailto:dhana@panacea-one.com"
                  className="footer-link"
                >
                  dhana@panacea-one.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>

        <p>
          © {new Date().getFullYear()} Panacea One — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;