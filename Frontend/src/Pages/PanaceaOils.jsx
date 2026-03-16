import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./PanaceaOils.css";

const oils = [
  { id: 1, img: "/life-flow.jpeg", title: "Panacea One – Life Flow Oil", desc: "Supports emotional release, energy flow, and life alignment.", price: 599 },
  { id: 2, img: "/pain-oil.jpeg", title: "Panacea One – Pain Relief Oil", desc: "Helps reduce body pain, stiffness, and inflammation.", price: 699 },
  { id: 3, img: "/nerve-oil.jpeg", title: "Panacea One – Nerve & Spine Care Oil", desc: "Supports nerve strength and spine health.", price: 599 },
  { id: 4, img: "/glow-oil.jpeg", title: "Panacea One – Skin Glow & Repair Oil", desc: "Improves skin glow and supports repair.", price: 599 },
  { id: 5, img: "/mind-calm.jpeg", title: "Panacea One – Mind Calm & Sleep Oil", desc: "Calms the mind and improves sleep quality.", price: 699 },
  { id: 6, img: "/balance-oil.jpeg", title: "Panacea One – Women’s Balance Oil", desc: "Supports hormonal and emotional balance.", price: 699 },
  { id: 7, img: "/immunity-oil.jpeg", title: "Panacea One – Immunity & Energy Oil", desc: "Boosts immunity and energy levels.", price: 599 },
];

export default function PanaceaOils({ addToCart }) {
  const navigate = useNavigate();
  const [cartPopup, setCartPopup] = useState(false);
  const [selectedOil, setSelectedOil] = useState(null);

  const handleAddToCart = (oil) => {
    addToCart(oil); // Add to App.js state
    setSelectedOil(oil);
    setCartPopup(true);

    setTimeout(() => {
      setCartPopup(false);
      navigate("/cart"); // Navigate to Cart page
    }, 1000);
  };

  const handleBuyNow = (oil) => {
    addToCart(oil);   // Add first
    navigate("/cart"); // Then navigate
  };

  return (
    <>
      <Navbar />
      <div className="panacea-page">
        <div className="panacea-top-content">
          <h1>Discover Panacea Oils</h1>
          <p>
            Explore our range of natural oils carefully crafted to enhance your
            well-being, balance energy, and promote relaxation.
          </p>
        </div>

        <div className="oils-wrapper">
          {oils.map((oil) => (
            <div className="oil-card" key={oil.id}>
              <div className="oil-img-box">
                <img src={oil.img} alt={oil.title} />
              </div>

              <h3>{oil.title}</h3>
              <p>{oil.desc}</p>

              <div className="price-rating">
                <span className="price">₹{oil.price}</span>
              </div>

              <div className="oil-action-buttons">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(oil)}
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="buy-now-btn"
                  onClick={() => handleBuyNow(oil)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {cartPopup && (
          <div className="cart-toast">
            ✅ {selectedOil?.title} Added to cart
          </div>
        )}

        <div className="why-panacea">
          <h2>Why Choose Panacea Oils?</h2>
          <ul className="why-list center">
            <li>🌱 Made with natural ingredients</li>
            <li>🧘 Supports emotional balance</li>
            <li>💆 Helps relieve stress & pain</li>
            <li>✨ Enhances energy flow</li>
            <li>🌿 Suitable for daily self-care</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}