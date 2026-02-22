import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart({ cartItems = [], removeFromCart, updateQuantity }) {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ color: "#555" }}>
          <FaShoppingCart
            size={80}
            style={{ marginBottom: "20px", color: "#888" }}
          />
          <h2>Oops! Your cart is empty.</h2>
          <p>Add some products to get started.</p>
        </div>
      ) : (
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #eee",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <img src={item.img} alt={item.title} width="60" />
                <div>
                  <h3>{item.title}</h3>
                  <p>₹{item.price}</p>
                  <div className="quantity-controls">
                     <button onClick={() => updateQuantity(item.id, "decrease")}>−</button>
                     <span>{item.quantity}</span>
                     <button onClick={() => updateQuantity(item.id, "increase")}>+</button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2 style={{ marginTop: "20px" }}>Total: ₹{total}</h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              padding: "10px 20px",
              background: "#1e88e5",
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