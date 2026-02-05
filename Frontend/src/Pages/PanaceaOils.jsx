import React from "react";
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
  const handleBuyNow = (oil) => {
    window.open("https://your-payment-link.com/" + oil.title, "_blank");
  };

  const handleLearnMore = (oil) => {
    alert(oil.title + "\n\n" + oil.desc);
  };

  return (
    <>
      <Navbar />

      <div className="panacea-page">
        {/* Top Content */}
        <div className="panacea-top-content">
          <h1>Discover Panacea Oils</h1>
          <p>
            Naturally crafted oils to support emotional, physical, and energetic
            balance.
          </p>
        </div>

        {/* Oils Layout */}
        <div className="oils-wrapper">
          {oils.map((oil, index) => (
            <div className="oil-card" key={index}>
              <div className="oil-img-box">
                <img src={oil.img} alt={oil.title} />
              </div>

              <h3>{oil.title}</h3>
              <p>{oil.desc}</p>

              <div className="oil-buttons">
                <button
                  className="learn-more"
                  onClick={() => handleLearnMore(oil)}
                >
                  Learn More
                </button>
                <button
                  className="buy-now"
                  onClick={() => handleBuyNow(oil)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Content */}
        <div className="panacea-bottom-content">
          <h2>Why Choose Panacea Oils?</h2>
          <p>
            All Panacea Oils are made from 100% natural ingredients, ethically
            sourced, and blended to support complete well-being.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
