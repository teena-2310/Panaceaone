import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./HomePage.css";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleBookingClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePayment = async (amount) => {
    try {
      setShowProcessing(true);

      const res = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      const order = await res.json();

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "Panacea One",
        order_id: order.id,
        handler: async function (response) {
          setShowProcessing(false);
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
            setShowSuccess(true);
            setShowModal(false);
            setTimeout(() => setShowSuccess(false), 3000);
          } else {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
          }
        },
        theme: { color: "#2f8f6b" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setShowProcessing(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
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

      {/* SERVICES */}
     <section className="service-section">
  {/* Flower Medicine Healing */}
  <div className="service-row">
    <img src="/images/flower-essence.png" alt="Flower Healing" />
    <div>
      <h2>Flower Medicine Healing</h2>
      <h4>Gentle emotional healing using natural flower vibrations to release stress, fear, and emotional trauma.</h4>
      <p>
        Flower Medicine Healing is a gentle, natural therapy that uses the vibrational energy of flowers to restore emotional balance.
        It helps release stress, fear, and emotional trauma, allowing your mind and heart to feel lighter and more peaceful.
      </p>
    </div>
  </div>

  {/* Hypno Therapy */}
  <div className="service-row reverse">
    <img src="/images/hypno-therapy.png" alt="Hypno Therapy" />
    <div>
      <h2>Hypno Therapy</h2>
      <h4>Heal subconscious patterns, remove inner blocks, and gain clarity and confidence through guided hypnotherapy.</h4>
      <p>
        Hypno Therapy is a guided therapy that works with the subconscious mind to heal limiting beliefs and overcome inner obstacles.
        It helps remove mental blocks, reduce anxiety, and improve clarity and focus.
        Each session is tailored to your personal challenges, ensuring a safe and supportive environment.
      </p>
    </div>
  </div>

  {/* Reiki & Energy Healing */}
  <div className="service-row">
    <img src="/images/reiki.png" alt="Reiki Healing" />
    <div>
      <h2>Reiki & Energy Healing</h2>
      <h4>Balance your energy, calm the mind, and restore harmony across mind, body, and soul.</h4>
      <p>
        Reiki & Energy Healing is a holistic therapy that restores harmony between mind, body, and spirit.
        It balances energy flow, reduces stress, and enhances overall well-being.
        It is safe, natural, and can be combined with other healing practices for enhanced benefits.
        Experience deep relaxation, spiritual alignment, and a renewed sense of harmony in everyday life.
      </p>
    </div>
  </div>
</section>

      {/* HEALING BENEFITS */}
      <section className="healing-benefits">
        <div>
          <h2>How Healing Helps You</h2>
          <ul>
            🌱 Reduces stress and anxiety<br />
            🧘 Emotional and mental balance<br />
            🧠 Improved clarity and focus<br />
            💚 Releases negative energy<br />
            🌟 Long-term inner peace<br />
            🌿 Safe and natural process
          </ul>
        </div>
        <img src="/meditation.png" alt="Meditation" className="benefits-image" />
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
        onClick={(e) => e.stopPropagation()} // ✅ prevents closing when clicking inside
      >
        <div className="modal-header">
          <h2>Book Healing Call</h2>
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
            <option>Flower Medicine Healing</option>
            <option>Hypno Therapy</option>
            <option>Reiki & Energy Healing</option>
          </select>

          <input type="date" />
          <input type="time" />

          <button type="button" onClick={() => handlePayment(500)}>
            Pay ₹500 & Book
          </button>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* TOASTS */}
      <AnimatePresence>
        {showProcessing && (
          <motion.div
            className="processing-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            ⏳ Processing Payment...
          </motion.div>
        )}
        {showSuccess && (
          <motion.div
            className="success-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            ✅ Healing session booked successfully!
          </motion.div>
        )}
        {showError && (
          <motion.div
            className="error-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            ❌ Payment failed. Please try again.
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
