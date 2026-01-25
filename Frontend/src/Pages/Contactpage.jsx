import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contactpage.css";

export default function Contactpage() {
  return (
    <>
      <Navbar />

      <div className="contact-page">
        <div className="contact-container">
          {/* LEFT INFO */}
          <div className="contact-info">
            <h1>Healing Begins Here</h1>
            <p>
              Reach out to us and take the first step toward balance,
              wellness, and inner peace.
            </p>

            <div className="info-item">📍62, M3 Black, Police Quarters, S.M. Nagar,<br></br> Avadi, Chennai 600062</div>
            <div className="info-item">📞 +91 94981 03668</div>
            <div className="info-item">✉️ support@panaceaone.com</div>
          </div>

          {/* RIGHT FORM */}
          <form className="contact-form">
            <h2>Connect With Us</h2>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" />
            <select defaultValue="">
              <option value="" disabled>
                Select Healing Interest
              </option>
              <option>Spiritual Healing</option>
              <option>Karmic Healing</option>
              <option>Past Life Healing</option>
              <option>Energy Cleansing</option>
            </select>
            <textarea rows="4" placeholder="Your Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* GOOGLE MAP */}
        <div className="map-container">
          <iframe
            title="Panacea One Location"
            src="https://www.google.com/maps?q=62, M3 Black, Police Quarters, S.M. Nagar, Avadi, Chennai 600062&output=embed"
            loading="lazy"
          ></iframe>
        </div>

        {/* WHATSAPP FLOAT */}
        <a
          href="https://wa.me/+91 94981 03668"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬
        </a>
      </div>

      <Footer />
    </>
  );
}
