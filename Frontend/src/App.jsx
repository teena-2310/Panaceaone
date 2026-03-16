import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/HomePage";
import About from "./Pages/About";
import HealingSolutions from "./Pages/HealingSolutions";
import PanaceaOils from "./Pages/PanaceaOils";
import ContactPage from "./Pages/Contactpage";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import HealingBookingPage from "./Pages/HealingBookingPage";
import Footer from "./components/Footer"; // ✅ add footer

function App() {

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (type === "increase") {
            return { ...item, quantity: item.quantity + 1 };
          }
          if (type === "decrease" && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  return (
    <Router>

      <div className="app-container"> {/* ✅ layout wrapper */}

        <Navbar
          cartCount={cartItems.reduce(
            (total, item) => total + item.quantity,
            0
          )}
        />

        <main className="main-content"> {/* ✅ page content */}
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/healingsolutions" element={<HealingSolutions />} />

            <Route
              path="/panaceaoils"
              element={<PanaceaOils addToCart={addToCart} />}
            />

            <Route path="/contact" element={<ContactPage />} />

            <Route
              path="/healing-booking/:bookingId"
              element={<HealingBookingPage />}
            />

            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              }
            />

            <Route
              path="/checkout"
              element={<CheckoutPage cartItems={cartItems} />}
            />

          </Routes>
        </main>

        

      </div>

    </Router>
  );
}

export default App;