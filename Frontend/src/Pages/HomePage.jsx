import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./HomePage.css";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const handleBookingClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePayment = async (amount) => {
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const order = await res.json();

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "Panacea One",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch(
            "http://localhost:5000/api/payment/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const data = await verifyRes.json();

          if (data.success) {
            alert("Payment Successful!");
            setShowModal(false);
            window.location.href = "/payment-success";
          } else {
            alert("Payment verification failed!");
          }
        },
        theme: { color: "#2f8f6b" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
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

      {/* SERVICES WITH IMAGES */}
      <section className="service-section">
        <div className="service-row">
          <img src="/images/flower-healing.jpg" alt="Flower Healing" />
          <div>
            <h2>Flower Medicine Healing</h2>
            <p>
              Gentle emotional healing using natural flower vibrations to
              release stress, fear, and emotional trauma.
            </p>
          </div>
        </div>

        <div className="service-row reverse">
          <img src="/images/hypno.jpg" alt="Hypno Therapy" />
          <div>
            <h2>Hypno Therapy</h2>
            <p>
              Heal subconscious patterns, remove inner blocks, and gain clarity
              and confidence through guided hypnotherapy.
            </p>
          </div>
        </div>

        <div className="service-row">
          <img src="/images/reiki.jpg" alt="Reiki Healing" />
          <div>
            <h2>Reiki & Energy Healing</h2>
            <p>
              Balance your energy, calm the mind, and restore harmony across
              mind, body, and soul.
            </p>
          </div>
        </div>
      </section>

      {/* HEALING BENEFITS */}
      <section className="healing-benefits">
        <div>
          <h2>How Healing Helps You</h2>
          <ul>
            🌱 Reduces stress and anxiety<br></br>
            🧘 Emotional and mental balance<br></br>
            🧠 Improved clarity and focus<br></br>
            💚 Releases negative energy<br></br>
            🌟 Long-term inner peace<br></br>
            🌿 Safe and natural process
          </ul>
        </div>

        <img
          src="/images/meditation.jpg"
          alt="Meditation"
          className="benefits-image"
        />
      </section>

      {/* SPIRITUAL CONTENT */}
      <section className="spiritual-content">
        <h2>Healing Is a Journey Within</h2>
        <p>
          At Panacea One, healing is about reconnecting with your true self,
          releasing emotional burdens, and aligning your inner energy.
        </p>
        <p>
          Each session is personalised, confidential, and guided with compassion
          and spiritual awareness.
        </p>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Heal Naturally. Live Peacefully.</h2>
        <button className="secondary-btn">WhatsApp Now</button>
      </section>

      {/* BOOKING MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Book a Healing Call</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            <form className="booking-form">
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email" />
              <input type="tel" placeholder="Phone Number" />
              <select>
                <option>Select Healing Type</option>
                <option>Spiritual Healing</option>
                <option>Chakra Healing</option>
                <option>Past Life Healing</option>
                <option>Energy Cleansing</option>
              </select>
              <input type="date" />
              <input type="time" />

              <button
                type="button"
                className="btn btn-success"
                onClick={() => handlePayment(500)}
              >
                Pay ₹500 & Book
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
