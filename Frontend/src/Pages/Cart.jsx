import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Cart.css";

export default function Cart({
  cartItems = [],
  removeFromCart,
  updateQuantity,
}) {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-page">
      <h1 style={{ marginBottom: "20px" }}>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ color: "#084d10" }}>
          <FaShoppingCart
            size={80}
            style={{ marginBottom: "20px", color: "#084d10" }}
          />
          <h2>Oops! Your cart is empty.</h2>
          <p>Add some products to get started.</p>
        </div>
      ) : (
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-left">
                <img src={item.img} alt={item.title} />

                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>₹{item.price}</p>

                  <div className="cart-actions">
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, "decrease")}
                      >
                        −
                      </button>

                      <span className="qty-value">{item.quantity}</span>

                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, "increase")}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <h2 style={{ marginTop: "20px" }}>Total: ₹{total}</h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              padding: "10px 20px",
              background: "#0a6e19",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
