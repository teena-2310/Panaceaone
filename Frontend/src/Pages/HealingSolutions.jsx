import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./HealingSolutions.css";
import Footer from "../components/Footer";
const healings = [
  {
    title: "Spiritual Healing",
    description: "Align your mind, body, and soul to achieve inner peace and clarity.",
    icon: "🕉️",
  },
  {
    title: "Karmic Healing",
    description: "Resolve past karmic patterns to release blockages and negativity.",
    icon: "✨",
  },
  {
    title: "Past Life Healing",
    description: "Explore past life influences and heal lingering emotional wounds.",
    icon: "🌀",
  },
  {
    title: "Chakra Healing",
    description: "Balance your energy centers to enhance health, vitality, and focus.",
    icon: "🌈",
  },
  {
    title: "Energy Cleansing",
    description: "Remove negative energy from your aura for a refreshed and positive state.",
    icon: "💫",
  },
];

export default function HealingSolutions() {
  return (
    <>
      <Navbar />
      <div className="healing-page">
        <div className="healing-container">
          {healings.map((healing) => (
            <div key={healing.title} className="healing-item">
              <div className="icon">{healing.icon}</div>
              <div className="healing-content">
                <h4>{healing.title}</h4>
                <p>{healing.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
       <Footer/>
    </>
  );
}
