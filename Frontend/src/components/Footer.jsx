import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img
            src="/logo.png"
            alt="Golden Eagle Logo"
            className="footer-logo-img"
          />
          <div>
            <h2>Panacea One</h2>
            <p className="footer-tagline">EXCELLENCE IN EVERY TASK</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Panacea One</a>
              </li>
              <li>
                <a href="/healingsolutions">Healing Solutions</a>
              </li>
              <li>
                <a href="/Panaceaoils">Panacea Oils</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/*<div>
            <h4>Support</h4>
            <ul>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/feedback">Feedback</a>
              </li>
              <li>
                <a href="/terms">Terms</a>
              </li>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
            </ul>
          </div>*/}

          <div className="footer-contact">
            <h4>Connect</h4>
            <ul>
              <li>📍62, M3 Black, Police Quarters,  S.M. Nagar, <br></br>    Avadi, Chennai 600062</li>
              <li>📞 +91 94981 03668</li>
              <li>✉️ dhana@panaceaone.com</li>
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
