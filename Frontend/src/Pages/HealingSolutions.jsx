import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HealingSolutions.css";

const healings = [
  {
    title: "Spiritual Healing",
    description:
      "Spiritual Healing connects your mind, body, and soul. Through meditation, energy alignment, and mindful practices, it reduces stress, improves focus, and brings inner peace.",
    benefits: [
      "Enhances inner peace and calm",
      "Improves mental clarity and focus",
      "Strengthens spiritual connection",
    ],
    icon: "🕉️",
  },
  {
    title: "Karmic Healing",
    description:
      "Karmic Healing resolves past-life and current-life patterns that block growth. It releases negative emotions and recurring challenges, helping you experience clarity and emotional freedom.",
    benefits: [
      "Releases old emotional blockages",
      "Breaks negative life patterns",
      "Promotes positive life experiences",
    ],
    icon: "✨",
  },
  {
    title: "Past Life Healing",
    description:
      "Past Life Healing uncovers influences from previous lifetimes affecting your present emotions and behaviors. It helps release hidden wounds and renew your sense of purpose.",
    benefits: [
      "Reduces fears and anxieties",
      "Provides clarity on life challenges",
      "Encourages personal growth",
    ],
    icon: "🌀",
  },
  {
    title: "Chakra Healing",
    description:
      "Chakra Healing balances the seven energy centers of your body. It restores energy flow, enhancing emotional, mental, and physical harmony.",
    benefits: [
      "Balances energy and emotions",
      "Boosts vitality and focus",
      "Promotes overall wellness",
      "Enhances mind-body-spirit harmony",
    ],
    icon: "🌈",
  },
  {
    title: "Energy Cleansing",
    description:
      "Energy Cleansing removes stagnant or negative energy from your aura and surroundings. It refreshes your mind, body, and spirit.",
    benefits: [
      "Eliminates negative energy",
      "Boosts positivity and motivation",
      "Reduces stress and tension",
      "Creates a peaceful environment",
    ],
    icon: "💫",
  },
];

export default function HealingSolutions() {
  return (
    <>
      <Navbar />

      <div className="healing-wrapper py-5">
        <div className="container">
          <h1 className="text-center mb-5">Healing Solutions</h1>

          {/* Healing Cards */}
          <div className="row justify-content-center">
            {healings.map((healing, index) => (
              <div className="col-lg-4 col-md-6 col-sm-10 mb-4" key={index}>
                <div className="card h-100 shadow-sm healing-card">
                  <div className="card-body text-center">
                    <div className="icon mb-3">{healing.icon}</div>
                    <h5 className="card-title mb-2">{healing.title}</h5>
                    <p className="card-text">{healing.description}</p>
                    <h6 className="mt-3">Benefits:</h6>
                    <ul className="text-start">
                      {healing.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          

          {/* Unique Healing Points */}
          <div className="row text-center mt-5">
            <h2 className="mb-4">What Makes Our Healing Unique</h2>
            <p className="mb-5">
              Our healing approach brings deep, lasting transformation by addressing emotional, energetic, and spiritual wellbeing.
            </p>

            <div className="col-lg-3 col-md-6 col-sm-10 mb-4">
              <h5>🧠 Root-Cause Focus</h5>
              <p>We heal the emotional and energetic root causes behind challenges, not just symptoms.</p>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-10 mb-4">
              <h5>⚖️ Mind-Body Harmony</h5>
              <p>Our sessions restore balance between thoughts, emotions, and the physical body for long-term stability.</p>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-10 mb-4">
              <h5>🌱 Gentle & Sustainable</h5>
              <p>Healing unfolds naturally and progressively, allowing the body and mind to adjust without pressure.</p>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-10 mb-4">
              <h5>🔒 Confidential & Compassionate Care</h5>
              <p>Every session is handled with complete privacy, empathy, and respect for your personal journey.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-5">
            <h2>Begin Your Healing Journey Today</h2>
            <p>Experience gentle, natural healing that restores balance and inner peace.</p>
            {/*<button className="btn btn-success btn-lg">Book a Healing Session</button>*/}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
