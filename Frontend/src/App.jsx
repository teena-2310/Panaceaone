import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // Import Navbar
import Home from "./Pages/HomePage";
import About from "./Pages/About";
import HealingSolutions  from "./Pages/HealingSolutions";
import PanaceaOils from "./Pages/PanaceaOils";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/healingsolutions" element={<HealingSolutions />} /> 
        <Route path="/panaceaoils" element={<PanaceaOils />} />
      </Routes>
    </Router>
  );
}

export default App;
