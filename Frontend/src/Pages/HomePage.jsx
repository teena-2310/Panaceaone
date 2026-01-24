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
    // 1️⃣ Create order from backend
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const order = await res.json();

    // 2️⃣ Razorpay options
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your key
      amount: order.amount,
      currency: "INR",
      name: "Panacea One",
      order_id: order.id,
      handler: async function (response) {
        // 3️⃣ Send payment details to backend for verification
        const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const data = await verifyRes.json();

        if (data.success) {
          alert("Payment Successful!");
          setShowModal(false); // close modal
          window.location.href = "/payment-success"; // redirect
        } else {
          alert("Payment verification failed!");
        }
      },
      theme: { color: "#3399cc" },
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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Panacea One
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          மனம் • உடல் • ஆன்மா ஒரே அலைவரிசையில்
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="primary-btn"
          onClick={handleBookingClick}
        >
          Book Healing Call
        </motion.button>
      </section>

      {/* VIDEO CAROUSEL */}
      <section className="video-section">
        <div id="videoCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {["healing1.mp4", "healing2.mp4", "healing3.mp4"].map(
              (video, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <video
                    className="carousel-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  >
                    <source src={`/${video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        {[
          ["Flower Medicine", "Emotional healing through natural remedies"],
          ["Hypno Therapy", "Subconscious mind reprogramming"],
          ["Reiki Healing", "Energy balance & stress release"],
          ["Phone Healing", "Distance healing anywhere"],
        ].map(([title, desc], i) => (
          <motion.div
            key={i}
            className="service-card"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3>{title}</h3>
            <p>{desc}</p>
          </motion.div>
        ))}
      </section>

      {/* HEALING POINTS */}
      <section className="healing-points">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How Healing Helps You
        </motion.h2>

        <div className="points-grid">
          {[
            { icon: "🌱", text: "Reduces stress, anxiety, and emotional overload" },
            { icon: "🧘", text: "Balances mind, body, and soul naturally" },
            { icon: "🧠", text: "Improves focus, clarity, and inner peace" },
            { icon: "💚", text: "Releases negative energy and emotional blocks" },
            { icon: "✨", text: "Supports long-term mental and emotional wellness" },
            { icon: "🌿", text: "Safe, gentle, and non-invasive healing approach" },
          ].map((point, i) => (
            <motion.div
              key={i}
              className="point-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="point-icon">{point.icon}</div>
              <p>{point.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us">
        <h2>Why Panacea One?</h2>
        <div className="why-grid">
          <div>🌿 Root Cause Healing</div>
          <div>🧠 Mind–Body–Soul Balance</div>
          <div>📞 Distance Healing</div>
          <div>💚 Natural & Safe</div>
          <div>✨ Personalised Care</div>
          <div>🙏 Confidential & Trusted</div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2>Heal Naturally. Live Peacefully.</h2>
        <button className="secondary-btn">WhatsApp Now</button>
      </motion.section>

      {/* Booking Modal */}
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
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your full name" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
              </div>

              <div className="mb-3">
                <label htmlFor="healingType" className="form-label">Healing Type</label>
                <select className="form-select" id="healingType">
                  <option selected>Select Healing Type</option>
                  <option>Spiritual Healing</option>
                  <option>Karmic Healing</option>
                  <option>Past Life Healing</option>
                  <option>Chakra Healing</option>
                  <option>Energy Cleansing</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">Preferred Date</label>
                <input type="date" className="form-control" id="date" />
              </div>

              <div className="mb-3">
                <label htmlFor="time" className="form-label">Preferred Time</label>
                <input type="time" className="form-control" id="time" />
              </div>

              <div className="text-center">
                <div className="text-center">
  <button
    type="button" // IMPORTANT: not "submit"
    className="btn btn-success"
    onClick={() => handlePayment(500)} // Replace 500 with your session price
  >
    Book Healing Call
  </button>
</div>

                
              </div>
            </form>
          </div>
        </div>
      )}
      

      <Footer />
    </div>
  );
}
