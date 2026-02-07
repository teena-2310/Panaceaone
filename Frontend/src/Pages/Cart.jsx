import React from "react";
import Navbar from "../components/Navbar";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart({ cartItems = [], removeFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1 style={{ marginBottom: "20px" }}>Your Cart</h1>

        {cartItems.length === 0 ? (
          <div style={{ color: "#555" }}>
            <FaShoppingCart size={80} style={{ marginBottom: "20px", color: "#888" }} />
            <h2>Oops! Your cart is empty.</h2>
            <p>Add some products to get started.</p>
          </div>
        ) : (
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
            <ul>
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{item.name} - ₹{item.price}</span>
                  <button
                    onClick={() => removeFromCart(index)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <h3>Total: ₹{total}</h3>

            <button
              style={{
                padding: "10px 20px",
                background: "#1e88e5",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
