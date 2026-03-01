// HomePage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    healingType: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();

  const handleBookingClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="home-wrapper">
      

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

              <form
                className="booking-form"
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const response = await fetch(
                      "http://localhost:5000/api/bookings/create",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          ...formData,
                          amount: 500,
                        }),
                      }
                    );

                    const data = await response.json();

                    if (data.success) {
                      setShowModal(false);

                      // Reset form
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        healingType: "",
                        date: "",
                        time: "",
                      });

                      navigate(`/healing-booking/${data.bookingId}`);
                    } else {
                      alert("Booking failed");
                    }
                  } catch (error) {
                    alert("Server error. Please try again.");
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />

                <select
                  required
                  value={formData.healingType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      healingType: e.target.value,
                    })
                  }
                >
                  <option value="">Select Healing Type</option>
                  <option>Flower Medicine Healing</option>
                  <option>Hypno Therapy</option>
                  <option>Reiki & Energy Healing</option>
                </select>

                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                />

                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      time: e.target.value,
                    })
                  }
                />

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