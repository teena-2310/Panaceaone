import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage({ cartItems }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD"
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill all details");
      return;
    }

    alert("Order placed successfully!");

    localStorage.removeItem("cart");
    navigate("/");
    window.location.reload(); // refresh to clear state
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cartItems.map(item => (
          <p key={item.id}>
            {item.title} × {item.quantity}
          </p>
        ))}
        <h3>Total: ₹{total}</h3>
      </div>

      <div className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <select name="payment" onChange={handleChange}>
          <option value="UPI">UPI</option>
          <option value="Bank">Bank Transfer</option>
        </select>

        <button onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}