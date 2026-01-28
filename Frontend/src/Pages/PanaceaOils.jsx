import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./PanaceaOils.css";

const oils = [
  {
    img: "oil-life-flow.png",
    title: "Panacea One – Life Flow Oil",
    desc: "Supports emotional release, energy flow, and life alignment. Helps remove stagnation and promotes positivity and clarity.",
  },
  {
    img: "oil-pain-relief.png",
    title: "Panacea One – Pain Relief Oil",
    desc: "Helps reduce body pain, stiffness, and inflammation by calming nerves and improving energy circulation.",
  },
  {
    img: "oil-nerve-spine.png",
    title: "Panacea One – Nerve & Spine Care Oil",
    desc: "Designed to support nerve strength, spine health, and chronic discomfort through gentle energetic balance.",
  },
  {
    img: "oil-skin-glow.png",
    title: "Panacea One – Skin Glow & Repair Oil",
    desc: "Nourishes skin, improves glow, supports repair, and helps release emotional stress stored in the skin.",
  },
  {
    img: "oil-mind-calm.png",
    title: "Panacea One – Mind Calm & Sleep Oil",
    desc: "Helps calm the mind, reduce anxiety, improve sleep quality, and support deep relaxation.",
  },
  {
    img: "oil-women-balance.png",
    title: "Panacea One – Women’s Balance Oil",
    desc: "Supports hormonal balance, emotional well-being, and inner stability for women.",
  },
  {
    img: "oil-immunity-energy.png",
    title: "Panacea One – Immunity & Energy Oil",
    desc: "Boosts energy levels, strengthens immunity, and supports overall vitality and resilience.",
  },
];

export default function PanaceaOils() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOil, setSelectedOil] = useState(null);

  const handleLearnMore = (oil) => {
    setSelectedOil(oil);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOil(null);
  };

  const handleBuyNow = (oil) => {
    // Replace with your real payment link
    window.open("https://your-payment-link.com/" + oil.title, "_blank");
  };

  return (
    <>
      <Navbar />

      <div className="panacea-page">
        <div className="panacea-top-content">
          <h1>Discover Panacea Oils</h1>
          <p>
            Explore our range of natural oils carefully crafted to enhance your
            well-being, boost energy, and promote relaxation. Each oil is
            designed to support your mind, body, and spirit.<br></br>
            Naturally crafted oils to support emotional, physical, and energetic balance
          </p>
        </div>
       

        {/* Oils Section */}
        
          

      <div className="oils-grid">
  {oils.map((oil, index) => (
    <div className="oil-card" key={index}>
      <img src={oil.img} alt={oil.title} className="oil-img" />

      <div className="oil-content">
        <h3>{oil.title}</h3>
        <p>{oil.desc}</p>

        <div className="oil-buttons">
          <button className="buy-now" onClick={() => handleBuyNow(oil)}>
            Buy Now
          </button>
          <button className="learn-more" onClick={() => handleLearnMore(oil)}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        
        {/* Modal */}
        {modalOpen && selectedOil && (
          <div className="modal-backdrop" onClick={handleCloseModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{selectedOil.title}</h2>
              <img
                src={selectedOil.img}
                alt={selectedOil.title}
                className="modal-img"
              />
              <p>{selectedOil.desc}</p>
              <button className="close-modal" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}

        <div className="panacea-extra-content">
          <h2>Our Commitment to Quality</h2>
          <p>
            All Panacea Oils are made from 100% natural ingredients, ethically
            sourced, and blended for maximum benefit. We ensure purity,
            sustainability, and environmental care in every bottle.
          </p>
        </div>

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
