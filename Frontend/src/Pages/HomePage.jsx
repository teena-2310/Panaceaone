// HomePage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import "./HomePage.css";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleBookingClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // ✅ Proper Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload

    // If all fields are valid (browser checks because of "required")
    setShowModal(false);
    navigate("/healing-booking");
  };

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Panacea One
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          மனம் • உடல் • ஆன்மா ஒரே அலைவரிசையில்
        </motion.p>
        <button className="primary-btn" onClick={handleBookingClick}>
          Book Healing Call
        </button>
      </section>

      {/* SERVICES */}
      <section className="service-section">
        <div className="service-row">
          <img src="/images/flower-essence.png" alt="Flower Healing" />
          <div>
            <h2>Flower Medicine Healing</h2>
            <h4>
              Gentle emotional healing using natural flower vibrations to
              release stress, fear, and emotional trauma.
            </h4>
            <p>
              Flower Medicine Healing restores emotional balance using natural
              flower vibrations.
            </p>
          </div>
        </div>

        <div className="service-row reverse">
          <img src="/images/hypno-therapy.png" alt="Hypno Therapy" />
          <div>
            <h2>Hypno Therapy</h2>
            <h4>
              Heal subconscious patterns and remove inner blocks through guided
              hypnotherapy.
            </h4>
            <p>
              Hypno Therapy works with the subconscious mind to overcome
              limiting beliefs.
            </p>
          </div>
        </div>

        <div className="service-row">
          <img src="/images/reiki.png" alt="Reiki Healing" />
          <div>
            <h2>Reiki & Energy Healing</h2>
            <h4>
              Balance your energy and restore harmony across mind, body, and
              soul.
            </h4>
            <p>
              Reiki enhances overall well-being by restoring energetic harmony.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Heal Naturally. Live Peacefully.</h2>
        <button className="secondary-btn">WhatsApp Now</button>
      </section>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>

              {/* ✅ FORM WITH PROPER SUBMIT */}
              <form className="booking-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                />

                <select required>
                  <option value="">Select Healing Type</option>
                  <option>Flower Medicine Healing</option>
                  <option>Hypno Therapy</option>
                  <option>Reiki & Energy Healing</option>
                </select>

                <input type="date" required />
                <input type="time" required />

                <button type="submit">
                  Pay ₹500 & Book
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
