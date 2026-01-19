import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./PanaceaOils.css";

export default function PanaceaOils() {
  return (
    <>
      <Navbar />

      <div className="panacea-page">
        {/* Top Content */}
        <div className="panacea-top-content">
          <h1>Discover Panacea Oils</h1>
          <p>
            Explore our range of natural oils carefully crafted to enhance your
            well-being, boost energy, and promote relaxation. Each oil is
            designed to support your mind, body, and spirit.
          </p>
        </div>

        {/* Cards Container */}
        <div className="panacea-container">
          <div className="panacea-card">
            <img src="/relaxation.png" alt="Relaxation Oil" />
            <h3>Relaxation Oil</h3>
            <p>
              Calms the nervous system, reduces stress, and promotes emotional
              balance and deep relaxation.
            </p>
            <div className="card-buttons">
              <button className="btn-outline">Learn More</button>
              <button className="btn-solid">Buy Now</button>
            </div>
          </div>

          <div className="panacea-card">
            <img src="/energy-boost.png" alt="Energy Boost Oil" />
            <h3>Energy Boost Oil</h3>
            <p>
              Refreshes the mind and body, improves focus, and supports
              long-lasting energy throughout the day.
            </p>
            <div className="card-buttons">
              <button className="btn-outline">Learn More</button>
              <button className="btn-solid">Buy Now</button>
            </div>
          </div>

          <div className="panacea-card">
            <img src="/healing.png" alt="Healing Oil" />
            <h3>Healing Oil</h3>
            <p>
              Helps relieve minor aches, muscle fatigue, and supports natural
              recovery and wellness.
            </p>
            <div className="card-buttons">
              <button className="btn-outline">Learn More</button>
              <button className="btn-solid">Buy Now</button>
            </div>
          </div>

          <div className="panacea-card">
            <img src="/meditation.png" alt="Meditation Oil" />
            <h3>Meditation Oil</h3>
            <p>
              Enhances focus, mindfulness, and spiritual clarity for deeper
              meditation practices.
            </p>
            <div className="card-buttons">
              <button className="btn-outline">Learn More</button>
              <button className="btn-solid">Buy Now</button>
            </div>
          </div>

          <div className="panacea-card">
            <img src="/detox.png" alt="Detox Oil" />
            <h3>Detox Oil</h3>
            <p>
              Supports cleansing, removes negative energy, and restores balance
              to body and mind.
            </p>
            <div className="card-buttons">
              <button className="btn-outline">Learn More</button>
              <button className="btn-solid">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="panacea-extra-content">
          <h2>Our Commitment to Quality</h2>
          <p>
            All Panacea Oils are made from 100% natural ingredients, ethically
            sourced, and blended for maximum benefit. We ensure purity,
            sustainability, and environmental care in every bottle.
          </p>
        </div>

        {/* Bottom Content */}
        <div className="panacea-bottom-content">
          <h2>Why Choose Panacea Oils?</h2>
          <p>
            Our oils are made from 100% natural ingredients. Each blend is
            carefully formulated to support your health, improve focus, and
            bring harmony to your body and mind.
          </p>
          <p>
            Experience the difference with oils that nourish your senses and
            elevate your daily rituals.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
