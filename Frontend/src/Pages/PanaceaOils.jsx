import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./PanaceaOils.css";

const oils = [
  {
    img: "/oil-life-flow.png",
    title: "Panacea One – Life Flow Oil",
    desc: "Supports emotional release, energy flow, and life alignment.",
    price: "₹999",
    rating: 4.8,
  },
  {
    img: "/oil-pain-relief.png",
    title: "Panacea One – Pain Relief Oil",
    desc: "Helps reduce body pain, stiffness, and inflammation.",
    price: "₹899",
    rating: 4.6,
  },
  {
    img: "/oil-nerve-spine.png",
    title: "Panacea One – Nerve & Spine Care Oil",
    desc: "Supports nerve strength and spine health.",
    price: "₹1099",
    rating: 4.7,
  },
  {
    img: "/oil-skin-glow.png",
    title: "Panacea One – Skin Glow & Repair Oil",
    desc: "Improves skin glow and supports repair.",
    price: "₹799",
    rating: 4.5,
  },
  {
    img: "/oil-mind-calm.png",
    title: "Panacea One – Mind Calm & Sleep Oil",
    desc: "Calms the mind and improves sleep quality.",
    price: "₹999",
    rating: 4.9,
  },
  {
    img: "/oil-women-balance.png",
    title: "Panacea One – Women’s Balance Oil",
    desc: "Supports hormonal and emotional balance.",
    price: "₹1199",
    rating: 4.8,
  },
  {
    img: "/oil-immunity-energy.png",
    title: "Panacea One – Immunity & Energy Oil",
    desc: "Boosts immunity and energy levels.",
    price: "₹1299",
    rating: 4.9,
  },
];

export default function PanaceaOils() {
  const [cartPopup, setCartPopup] = useState(false);
  const [selectedOil, setSelectedOil] = useState(null);
  const [cartCount, setCartCount] = useState(0);


  const handleAddToCart = (oil) => {
  setSelectedOil(oil);
  setCartPopup(true);
  setCartCount((prev) => prev + 1);

  setTimeout(() => {
    setCartPopup(false);
  }, 3000);
};



  const handleBuyNow = (oil) => {
    window.open("https://your-payment-link.com/" + oil.title, "_blank");
  };

  return (
    <>
    
      <Navbar cartCount={cartCount} />

      <div className="panacea-page">
        {/* TOP */}
        <div className="panacea-top-content">
          <h1>Discover Panacea Oils</h1>
          <p>
            Explore our range of natural oils carefully crafted to enhance your
            well-being, balance energy, and promote relaxation. Our Healing Oils are thoughtfully crafted to support physical comfort,
        emotional balance, and overall well-being. Made with natural ingredients
        and mindful care, these oils help restore harmony to the body and mind.
          </p>
        </div>

        {/* GRID */}
        <div className="oils-wrapper">
          {oils.map((oil, index) => (
            <div className="oil-card" key={index}>
              <div className="oil-img-box">
                <img src={oil.img} alt={oil.title} />
              </div>

              <h3>{oil.title}</h3>
              <p>{oil.desc}</p>

              {/* PRICE + RATING */}
              <div className="price-rating">
                <span className="price">{oil.price}</span>
                <span className="rating">⭐ {oil.rating}</span>
              </div>

              {/* BUTTONS */}
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

        {/* CART POPUP */}
        {cartPopup && (
  <div className="cart-toast">
    ✅ {selectedOil?.title} added to cart
  </div>
)}

        {/* BOTTOM */}
        <div className="why-panacea">
  <h2>Why Choose Panacea Oils?</h2>

  <ul className="why-list center">
    <li>🌱 Made with natural and carefully selected ingredients</li>
    <li>🧘 Supports emotional balance and mental clarity</li>
    <li>💆 Helps relieve stress, pain, and fatigue</li>
    <li>✨ Enhances energy flow and spiritual alignment</li>
    <li>🌿 Suitable for daily self-care and healing practices</li>
  </ul>
</div>

      </div>

      <Footer />
    </>
  );
}
