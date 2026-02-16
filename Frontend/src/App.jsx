import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/HomePage";
import About from "./Pages/About";
import HealingSolutions from "./Pages/HealingSolutions";
import PanaceaOils from "./Pages/PanaceaOils";
import ContactPage from "./Pages/Contactpage";
import Cart from "./Pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <Router>
        {/* Navbar should be outside Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/healingsolutions" element={<HealingSolutions />} />
        <Route path="/panaceaoils" element={<PanaceaOils />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
